from __future__ import annotations

from datetime import timedelta

from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app.api.deps import DB
from app.core.config import settings
from app.core.security import create_token, decode_token, hash_password, verify_password
from app.models.user import User, UserProfile
from app.schemas.auth import AuthPayload, RefreshPayload, TokenResponse
from app.schemas.user import UserOut

router = APIRouter(prefix="/auth", tags=["auth"])


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def user_response(user: User) -> UserOut:
    """Build a UserOut from a User + its profile relationship."""
    profile = user.profile
    return UserOut(
        id=user.id,
        email=user.email,
        full_name=profile.full_name if profile else "",
        career_focus=profile.career_focus if profile else None,
        bio=profile.bio if profile else None,
        location=profile.location if profile else None,
    )


def issue_tokens(user: User) -> TokenResponse:
    """Create access + refresh tokens and wrap in a TokenResponse."""
    access_token = create_token(
        subject=str(user.id),
        expires_delta=timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    )
    refresh_token = create_token(
        subject=str(user.id),
        expires_delta=timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
    )
    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        user=user_response(user),
    )


# ---------------------------------------------------------------------------
# Endpoints
# ---------------------------------------------------------------------------

@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(payload: AuthPayload, db: DB):
    email = payload.email.lower()
    if len(payload.password) < 6:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password must be at least 6 characters",
        )

    existing = db.execute(select(User).where(User.email == email)).scalar_one_or_none()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An account with this email already exists",
        )

    user = User(
        email=email,
        password_hash=hash_password(payload.password),
    )
    db.add(user)
    db.flush()  # populate user.id before creating the profile

    profile = UserProfile(
        user_id=user.id,
        full_name=payload.name or "CareerPilot member",
    )
    db.add(profile)
    db.commit()
    db.refresh(user)

    return issue_tokens(user)


@router.post("/login", response_model=TokenResponse)
def login(payload: AuthPayload, db: DB):
    email = payload.email.lower()
    user = db.execute(select(User).where(User.email == email)).scalar_one_or_none()
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )
    return issue_tokens(user)


@router.post("/refresh", response_model=TokenResponse)
def refresh(payload: RefreshPayload, db: DB):
    subject = decode_token(payload.refresh_token)
    if not subject:
        raise HTTPException(401, "Invalid or expired refresh token")
    user = db.get(User, int(subject))
    if not user or not user.is_active:
        raise HTTPException(401, "User not found or deactivated")
    return issue_tokens(user)
