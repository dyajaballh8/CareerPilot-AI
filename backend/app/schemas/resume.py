from __future__ import annotations

from datetime import datetime
from typing import Any
from pydantic import BaseModel, Field


class ParsedResumeData(BaseModel):
    name: str | None = None
    title: str | None = None
    summary: str | None = None
    skills: list[str] = Field(default_factory=list)
    experience_years: float | None = None
    experience: list[dict[str, Any]] = Field(default_factory=list)
    education: list[dict[str, Any]] = Field(default_factory=list)
    suggested_roles: list[str] = Field(default_factory=list)


class ResumeOut(BaseModel):
    id: int
    original_filename: str
    mime_type: str
    size_bytes: int
    extracted_characters: int
    created_at: datetime
    skills: list[str] = Field(default_factory=list)
    parsed_data: ParsedResumeData | None = None


class ResumeSkillsUpdate(BaseModel):
    skills: list[str]
