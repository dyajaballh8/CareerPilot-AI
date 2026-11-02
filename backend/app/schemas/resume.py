from __future__ import annotations

from datetime import datetime

from pydantic import BaseModel


class ResumeOut(BaseModel):
    id: int
    original_filename: str
    mime_type: str
    size_bytes: int
    extracted_characters: int
    created_at: datetime
