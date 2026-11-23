"""Job search, aggregation, and AI matching endpoints."""
from __future__ import annotations

from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy import and_, func, not_, or_, select

from app.api.deps import CurrentUser, DB
from app.models.job import Job, JobSkill, SavedJob
from app.models.skill import Skill
from app.models.resume import Resume
from app.models.user import User
from app.schemas.job import JobMatchDetail, JobOut, JobSearchResponse
from app.services.jobs.aggregator import JobAggregatorService
from app.services.jobs.matcher import JobMatchingEngine

router = APIRouter(prefix="/jobs", tags=["jobs"])


def _to_job_out(job: Job, saved: bool = False) -> JobOut:
    skills = [js.skill.name for js in job.required_skills if js.skill and js.skill.name]
    source_name = job.source.name if job.source else "Direct"
    return JobOut(
        id=job.id,
        title=job.title,
        company=job.company,
        location=job.location,
        description=job.description,
        employment_type=job.employment_type,
        experience_level=job.experience_level,
        salary_min=job.salary_min,
        salary_max=job.salary_max,
        salary_currency=job.salary_currency,
        source_name=source_name,
        source_url=job.source_url,
        is_remote=job.is_remote,
        posted_at=job.posted_at,
        saved=saved,
        skills=skills,
    )


@router.get("", response_model=JobSearchResponse)
@router.get("/search", response_model=JobSearchResponse)
def search_jobs(
    db: DB,
    q: str | None = Query(None),
    employment_type: str | None = Query(None),
    is_remote: bool | None = Query(None),
    experience_level: str | None = Query(None),
    page: int = Query(1, ge=1),
    page_size: int = Query(60, ge=1, le=200),
    user_id: int | None = Query(None),
):
    query = select(Job)

    if q and q.strip():
        term = f"%{q.strip()}%"
        query = query.where(
            or_(
                Job.title.ilike(term),
                Job.company.ilike(term),
                Job.description.ilike(term),
                Job.location.ilike(term),
                Job.required_skills.any(JobSkill.skill.has(Skill.name.ilike(term))),
            )
        )

    if employment_type and employment_type.strip() and employment_type.lower() != "all":
        etype = employment_type.strip().lower()
        if etype in ["internship", "internships"]:
            query = query.where(
                or_(
                    Job.employment_type.ilike("%intern%"),
                    Job.title.ilike("%intern%"),
                )
            )
        elif etype in ["full-time", "full_time"]:
            query = query.where(
                and_(
                    Job.employment_type.ilike("%full%"),
                    not_(Job.employment_type.ilike("%part%")),
                    not_(Job.employment_type.ilike("%intern%")),
                )
            )
        elif etype in ["part-time", "part_time", "parttime"]:
            query = query.where(
                or_(
                    Job.employment_type.ilike("%part%"),
                    Job.title.ilike("%part-time%"),
                    Job.location.ilike("%part-time%"),
                )
            )
        elif etype == "jobs":
            query = query.where(
                and_(
                    not_(Job.employment_type.ilike("%intern%")),
                    not_(Job.title.ilike("%intern%")),
                )
            )
        elif etype == "hybrid":
            query = query.where(
                or_(
                    Job.location.ilike("%hybrid%"),
                    Job.description.ilike("%hybrid%"),
                )
            )
        elif etype in ["on-site", "onsite"]:
            query = query.where(
                and_(
                    Job.is_remote.is_(False),
                    not_(Job.location.ilike("%remote%")),
                    not_(Job.location.ilike("%hybrid%")),
                )
            )
        else:
            query = query.where(Job.employment_type.ilike(f"%{etype}%"))

    if is_remote is not None:
        query = query.where(Job.is_remote == is_remote)

    if experience_level and experience_level.strip():
        query = query.where(Job.experience_level.ilike(f"%{experience_level.strip()}%"))

    total = db.scalar(select(func.count()).select_from(query.subquery())) or 0
    offset = (page - 1) * page_size
    jobs = db.execute(query.order_by(Job.posted_at.desc().nullslast()).offset(offset).limit(page_size)).scalars().all()

    # User saved jobs lookup if user provided
    saved_job_ids: set[int] = set()
    latest_resume: Resume | None = None
    if user_id:
        saved_job_ids = set(
            db.execute(select(SavedJob.job_id).where(SavedJob.user_id == user_id)).scalars().all()
        )
        latest_resume = db.execute(
            select(Resume).where(Resume.user_id == user_id).order_by(Resume.created_at.desc())
        ).scalars().first()

    matcher = JobMatchingEngine(db) if latest_resume else None

    items: list[JobOut] = []
    for j in jobs:
        out = _to_job_out(j, saved=(j.id in saved_job_ids))
        if matcher and latest_resume:
            match_res = matcher.evaluate_match(latest_resume, j)
            out.match_score = match_res["match_score"]
            out.matching_skills = match_res["matching_skills"]
            out.missing_skills = match_res["missing_skills"]
        items.append(out)

    return JobSearchResponse(items=items, total=total, page=page, page_size=page_size)


@router.get("/matched", response_model=list[JobOut])
def get_matched_jobs(db: DB, user: CurrentUser):
    """Returns all jobs ranked by match score for the authenticated user's CV."""
    resume = db.execute(
        select(Resume).where(Resume.user_id == user.id).order_by(Resume.created_at.desc())
    ).scalars().first()

    if not resume:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please upload your CV first to view personalized AI matched jobs.",
        )

    saved_job_ids = set(
        db.execute(select(SavedJob.job_id).where(SavedJob.user_id == user.id)).scalars().all()
    )

    jobs = db.execute(select(Job)).scalars().all()
    matcher = JobMatchingEngine(db)

    ranked_jobs: list[JobOut] = []
    for j in jobs:
        out = _to_job_out(j, saved=(j.id in saved_job_ids))
        match_res = matcher.evaluate_match(resume, j)
        out.match_score = match_res["match_score"]
        out.matching_skills = match_res["matching_skills"]
        out.missing_skills = match_res["missing_skills"]
        ranked_jobs.append(out)

    # Rank by match score descending
    ranked_jobs.sort(key=lambda x: (x.match_score or 0), reverse=True)
    return ranked_jobs


@router.get("/saved", response_model=list[JobOut])
def get_saved_jobs(db: DB, user: CurrentUser):
    saved = db.execute(
        select(SavedJob).where(SavedJob.user_id == user.id).order_by(SavedJob.created_at.desc())
    ).scalars().all()

    resume = db.execute(
        select(Resume).where(Resume.user_id == user.id).order_by(Resume.created_at.desc())
    ).scalars().first()
    matcher = JobMatchingEngine(db) if resume else None

    result: list[JobOut] = []
    for sj in saved:
        if sj.job:
            out = _to_job_out(sj.job, saved=True)
            if matcher and resume:
                match_res = matcher.evaluate_match(resume, sj.job)
                out.match_score = match_res["match_score"]
                out.matching_skills = match_res["matching_skills"]
                out.missing_skills = match_res["missing_skills"]
            result.append(out)
    return result


@router.get("/{job_id}", response_model=JobOut)
def get_job(job_id: int, db: DB, user_id: int | None = Query(None)):
    job = db.get(Job, job_id)
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    saved = False
    latest_resume: Resume | None = None
    if user_id:
        saved = db.scalar(
            select(func.count()).select_from(SavedJob).where(
                SavedJob.user_id == user_id, SavedJob.job_id == job_id
            )
        ) > 0
        latest_resume = db.execute(
            select(Resume).where(Resume.user_id == user_id).order_by(Resume.created_at.desc())
        ).scalars().first()

    out = _to_job_out(job, saved=saved)
    if latest_resume:
        matcher = JobMatchingEngine(db)
        match_res = matcher.evaluate_match(latest_resume, job)
        out.match_score = match_res["match_score"]
        out.matching_skills = match_res["matching_skills"]
        out.missing_skills = match_res["missing_skills"]

    return out


@router.get("/{job_id}/match", response_model=JobMatchDetail)
def get_job_match_detail(job_id: int, db: DB, user: CurrentUser):
    """Detailed AI match breakdown, explanation, and course recommendations for missing skills."""
    job = db.get(Job, job_id)
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    resume = db.execute(
        select(Resume).where(Resume.user_id == user.id).order_by(Resume.created_at.desc())
    ).scalars().first()
    if not resume:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Please upload your CV in 'My Resume' to generate AI match analysis.",
        )

    saved = db.scalar(
        select(func.count()).select_from(SavedJob).where(
            SavedJob.user_id == user.id, SavedJob.job_id == job_id
        )
    ) > 0

    job_out = _to_job_out(job, saved=saved)
    matcher = JobMatchingEngine(db)
    return matcher.build_job_match_detail(resume, job, job_out)


@router.post("/{job_id}/save", status_code=status.HTTP_201_CREATED)
def save_job(job_id: int, db: DB, user: CurrentUser):
    job = db.get(Job, job_id)
    if not job:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")

    existing = db.execute(
        select(SavedJob).where(SavedJob.user_id == user.id, SavedJob.job_id == job_id)
    ).scalar_one_or_none()
    if existing:
        return {"saved": True, "message": "Already saved"}

    saved = SavedJob(user_id=user.id, job_id=job_id)
    db.add(saved)
    db.commit()
    return {"saved": True}


@router.delete("/{job_id}/save", status_code=status.HTTP_200_OK)
def unsave_job(job_id: int, db: DB, user: CurrentUser):
    existing = db.execute(
        select(SavedJob).where(SavedJob.user_id == user.id, SavedJob.job_id == job_id)
    ).scalar_one_or_none()
    if existing:
        db.delete(existing)
        db.commit()
    return {"saved": False}


@router.post("/sync")
async def sync_jobs(db: DB):
    """Trigger aggregation sync from seed catalog and external APIs."""
    aggregator = JobAggregatorService(db)
    seed_count = aggregator.sync_curated_seed_jobs()
    external_counts = await aggregator.sync_external_jobs()
    return {
        "status": "success",
        "new_curated_jobs": seed_count,
        "external_counts": external_counts,
    }
