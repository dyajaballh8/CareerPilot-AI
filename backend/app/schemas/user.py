from __future__ import annotations

from pydantic import BaseModel, ConfigDict, EmailStr


class UserOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    email: EmailStr
    full_name: str
    career_focus: str | None = None
    bio: str | None = None
    location: str | None = None


class ProfileUpdate(BaseModel):
    full_name: str | None = None
    career_focus: str | None = None
    bio: str | None = None
    location: str | None = None
