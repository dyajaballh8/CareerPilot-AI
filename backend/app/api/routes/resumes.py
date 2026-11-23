from __future__ import annotations

import io
import json
import logging
from pathlib import Path
from uuid import uuid4
from fastapi import APIRouter, HTTPException, UploadFile, status
from sqlalchemy import select

from app.api.deps import CurrentUser, DB
from app.models.resume import Resume
from app.models.skill import ResumeSkill, Skill
from app.schemas.resume import ParsedResumeData, ResumeOut, ResumeSkillsUpdate
from app.services.ai.gemini_service import GeminiService
from app.services.storage import delete as storage_delete, put_bytes

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/resumes", tags=["resumes"])

_ALLOWED_EXTENSIONS = {
    ".pdf": "application/pdf",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
_MAX_SIZE = 10 * 1024 * 1024  # 10 MB


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _extract_text(content: bytes, extension: str) -> str:
    """Extract plain text from a PDF or DOCX byte buffer."""
    if extension == ".pdf":
        import fitz  # PyMuPDF

        text_parts: list[str] = []
        try:
            with fitz.open(stream=content, filetype="pdf") as doc:
                for page in doc:
                    text_parts.append(page.get_text())
        except Exception:
            return ""
        return "\n".join(text_parts)

    # DOCX
    try:
        from docx import Document
        doc = Document(io.BytesIO(content))
        return "\n".join(p.text for p in doc.paragraphs)
    except Exception:
        return ""


def _save_resume_skills(db: DB, resume: Resume, skills: list[str]) -> None:
    """Synchronize extracted skills into Skill and ResumeSkill tables."""
    # Clear existing resume skills
    db.execute(
        ResumeSkill.__table__.delete().where(ResumeSkill.resume_id == resume.id)
    )

    for skill_name in skills:
        norm = skill_name.strip()
        if not norm:
            continue
        sk = db.execute(select(Skill).where(Skill.name.ilike(norm))).scalar_one_or_none()
        if not sk:
            sk = Skill(name=norm)
            db.add(sk)
            db.flush()
        
        # Link to resume
        rs = ResumeSkill(resume_id=resume.id, skill_id=sk.id, confidence=0.95)
        db.add(rs)


def _resume_out(resume: Resume) -> ResumeOut:
    parsed_obj: ParsedResumeData | None = None
    skills_list: list[str] = []

    if resume.parsed_json:
        try:
            pdata = json.loads(resume.parsed_json)
            parsed_obj = ParsedResumeData(**pdata)
            skills_list = pdata.get("skills", [])
        except Exception as e:
            logger.warning("Error parsing stored resume json: %s", e)

    # Fallback skills from relations if parsed_json did not provide
    if not skills_list and resume.skills:
        skills_list = [rs.skill.name for rs in resume.skills if rs.skill and rs.skill.name]

    return ResumeOut(
        id=resume.id,
        original_filename=resume.original_filename,
        mime_type=resume.mime_type,
        size_bytes=resume.size_bytes,
        extracted_characters=len(resume.extracted_text or ""),
        created_at=resume.created_at,
        skills=skills_list,
        parsed_data=parsed_obj,
    )


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post("/upload", response_model=ResumeOut, status_code=status.HTTP_201_CREATED)
async def upload_resume(file: UploadFile, db: DB, user: CurrentUser):
    extension = Path(file.filename or "").suffix.lower()
    if extension not in _ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF and DOCX files are supported",
        )

    content = await file.read()
    if len(content) > _MAX_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="File exceeds the 10 MB limit",
        )

    mime_type = _ALLOWED_EXTENSIONS[extension]
    stored_name = f"{user.id}/{uuid4().hex}{extension}"
    put_bytes(stored_name, content, mime_type)

    extracted = _extract_text(content, extension)

    # AI Parsing with Gemini (or resilient NLP fallback)
    gemini = GeminiService()
    parsed_dict = gemini.analyze_resume(extracted)
    parsed_json_str = json.dumps(parsed_dict)

    # Remove any previous resume for this user
    prev_resumes = db.execute(select(Resume).where(Resume.user_id == user.id)).scalars().all()
    for prev in prev_resumes:
        try:
            storage_delete(prev.stored_filename)
        except Exception:
            pass
        db.delete(prev)

    resume = Resume(
        user_id=user.id,
        original_filename=file.filename or "resume",
        stored_filename=stored_name,
        mime_type=mime_type,
        size_bytes=len(content),
        extracted_text=extracted,
        parsed_json=parsed_json_str,
    )
    db.add(resume)
    db.commit()
    db.refresh(resume)

    # Store extracted skills in resume_skills
    extracted_skills = parsed_dict.get("skills", [])
    _save_resume_skills(db, resume, extracted_skills)
    db.commit()
    db.refresh(resume)

    return _resume_out(resume)


@router.get("/latest", response_model=ResumeOut | None)
def get_latest_resume(db: DB, user: CurrentUser):
    resume = db.execute(
        select(Resume).where(Resume.user_id == user.id).order_by(Resume.created_at.desc())
    ).scalars().first()
    if not resume:
        return None
    return _resume_out(resume)


@router.post("/reanalyze", response_model=ResumeOut)
def reanalyze_latest_resume(db: DB, user: CurrentUser):
    """Re-run AI analysis on the currently uploaded resume."""
    resume = db.execute(
        select(Resume).where(Resume.user_id == user.id).order_by(Resume.created_at.desc())
    ).scalars().first()
    if not resume:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No resume uploaded yet")

    gemini = GeminiService()
    parsed_dict = gemini.analyze_resume(resume.extracted_text)
    resume.parsed_json = json.dumps(parsed_dict)
    
    _save_resume_skills(db, resume, parsed_dict.get("skills", []))
    db.commit()
    db.refresh(resume)

    return _resume_out(resume)


@router.put("/skills", response_model=ResumeOut)
def update_resume_skills(body: ResumeSkillsUpdate, db: DB, user: CurrentUser):
    """Allow user to add, edit or confirm skills extracted from their resume."""
    resume = db.execute(
        select(Resume).where(Resume.user_id == user.id).order_by(Resume.created_at.desc())
    ).scalars().first()
    if not resume:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No resume found")

    # Update parsed_json
    pdata = {}
    if resume.parsed_json:
        try:
            pdata = json.loads(resume.parsed_json)
        except Exception:
            pass
    pdata["skills"] = body.skills
    resume.parsed_json = json.dumps(pdata)

    _save_resume_skills(db, resume, body.skills)
    db.commit()
    db.refresh(resume)

    return _resume_out(resume)


@router.delete("/{resume_id}")
def delete_resume(resume_id: int, db: DB, user: CurrentUser):
    resume = db.get(Resume, resume_id)
    if not resume or resume.user_id != user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resume not found")

    try:
        storage_delete(resume.stored_filename)
    except Exception:
        pass
    db.delete(resume)
    db.commit()
    return {"deleted": True}
