from __future__ import annotations

import io

from pathlib import Path
from uuid import uuid4
from fastapi import APIRouter, HTTPException, UploadFile, status
from sqlalchemy import select

from app.api.deps import CurrentUser, DB
from app.models.resume import Resume
from app.schemas.resume import ResumeOut
from app.services.storage import delete as storage_delete, put_bytes

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


def _resume_out(resume: Resume) -> ResumeOut:
    return ResumeOut(
        id=resume.id,
        original_filename=resume.original_filename,
        mime_type=resume.mime_type,
        size_bytes=resume.size_bytes,
        extracted_characters=len(resume.extracted_text or ""),
        created_at=resume.created_at,
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
    )
    db.add(resume)
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
