from __future__ import annotations

from pydantic import BaseModel, EmailStr

from app.schemas.user import UserOut


class AuthPayload(BaseModel):
    email: EmailStr
    password: str
    name: str | None = None


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserOut


class RefreshPayload(BaseModel):
    refresh_token: str
