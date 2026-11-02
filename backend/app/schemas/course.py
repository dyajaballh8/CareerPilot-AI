from __future__ import annotations

from pydantic import BaseModel


class CourseOut(BaseModel):
    id: int
    title: str
    provider: str
    category: str
    level: str
    duration: str
    price: str
    description: str
    source_url: str | None = None
    rating: float | None = None
    enrolled_count: int | None = None
    image_url: str | None = None
    language: str = "en"
    saved: bool = False


class CourseSearchResponse(BaseModel):
    items: list[CourseOut]
    total: int
    page: int
    page_size: int
