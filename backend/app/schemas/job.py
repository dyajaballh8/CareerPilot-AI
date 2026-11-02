from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel


class JobOut(BaseModel):
    id: int
    title: str
    company: str
    location: str
    description: str
    employment_type: str | None = None
    experience_level: str | None = None
    salary_min: float | None = None
    salary_max: float | None = None
    salary_currency: str | None = None
    source_url: str | None = None
    is_remote: bool = False
    posted_at: datetime | None = None
    saved: bool = False


class JobSearchResponse(BaseModel):
    items: list[JobOut]
    total: int
    page: int
    page_size: int
