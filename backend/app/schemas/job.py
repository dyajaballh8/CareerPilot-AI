from __future__ import annotations

from datetime import datetime
from typing import Any
from pydantic import BaseModel, Field


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
    source_name: str | None = None
    source_url: str | None = None
    is_remote: bool = False
    posted_at: datetime | None = None
    saved: bool = False
    skills: list[str] = Field(default_factory=list)
    match_score: int | None = None
    matching_skills: list[str] = Field(default_factory=list)
    missing_skills: list[str] = Field(default_factory=list)


class JobSearchResponse(BaseModel):
    items: list[JobOut]
    total: int
    page: int
    page_size: int


class RecommendedCourseSummary(BaseModel):
    id: int
    title: str
    provider: str
    category: str | None = None
    level: str | None = None
    price: str | None = None
    rating: float | None = None
    source_url: str | None = None
    target_skill: str | None = None


class JobMatchDetail(BaseModel):
    job: JobOut
    match_score: int
    score_breakdown: dict[str, int]
    explanation: str
    strengths: list[str] = Field(default_factory=list)
    matching_skills: list[str] = Field(default_factory=list)
    missing_skills: list[str] = Field(default_factory=list)
    recommended_courses: list[RecommendedCourseSummary] = Field(default_factory=list)
