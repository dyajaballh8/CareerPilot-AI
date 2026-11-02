from __future__ import annotations

from fastapi import APIRouter

from app.api.deps import CurrentUser, DB
from app.schemas.user import ProfileUpdate, UserOut

router = APIRouter(prefix="", tags=["users"])


def _user_out(user) -> UserOut:
    """Build UserOut from a User ORM instance."""
    profile = user.profile
    return UserOut(
        id=user.id,
        email=user.email,
        full_name=profile.full_name if profile else "",
        career_focus=profile.career_focus if profile else None,
        bio=profile.bio if profile else None,
        location=profile.location if profile else None,
    )


@router.get("/me", response_model=UserOut)
def get_me(user: CurrentUser):
    return _user_out(user)


@router.patch("/me", response_model=UserOut)
def update_me(body: ProfileUpdate, user: CurrentUser, db: DB):
    profile = user.profile
    update_data = body.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(profile, field, value)
    db.commit()
    db.refresh(user)
    return _user_out(user)
