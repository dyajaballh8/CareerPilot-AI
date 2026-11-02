from __future__ import annotations

from datetime import datetime, timezone

from sqlalchemy import Boolean, DateTime, ForeignKey, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Skill(Base):
    """Master skill vocabulary. Canonical skill names normalised to lowercase."""

    __tablename__ = "skills"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    category: Mapped[str | None] = mapped_column(String(80), nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime, default=lambda: datetime.now(timezone.utc)
    )


class ResumeSkill(Base):
    """Skills extracted from a resume (by AI in Phase 2)."""

    __tablename__ = "resume_skills"
    __table_args__ = (UniqueConstraint("resume_id", "skill_id", name="uq_resume_skill"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    resume_id: Mapped[int] = mapped_column(ForeignKey("resumes.id", ondelete="CASCADE"))
    skill_id: Mapped[int] = mapped_column(ForeignKey("skills.id", ondelete="CASCADE"))
    confidence: Mapped[float | None] = mapped_column(nullable=True)  # AI confidence 0-1

    resume: Mapped[Resume] = relationship(back_populates="skills")
    skill: Mapped[Skill] = relationship()


class UserSkill(Base):
    """Skills the user claims or that have been verified."""

    __tablename__ = "user_skills"
    __table_args__ = (UniqueConstraint("user_id", "skill_id", name="uq_user_skill"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"))
    skill_id: Mapped[int] = mapped_column(ForeignKey("skills.id", ondelete="CASCADE"))
    proficiency: Mapped[str | None] = mapped_column(
        String(40), nullable=True
    )  # beginner/intermediate/advanced
    verified: Mapped[bool] = mapped_column(Boolean, default=False)

    user: Mapped[User] = relationship(back_populates="skills")
    skill: Mapped[Skill] = relationship()
