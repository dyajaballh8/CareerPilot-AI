"""phase 1 skills and jobs foundation

Revision ID: 0002_phase1_skills_and_jobs
Revises: 0001_phase1_foundation
Create Date: 2026-11-02
"""
from alembic import op
import sqlalchemy as sa

revision = "0002_phase1_skills_and_jobs"
down_revision = "0001_phase1_foundation"
branch_labels = None
depends_on = None


def upgrade():
    # User Profile additions
    with op.batch_alter_table("user_profiles") as batch_op:
        batch_op.add_column(sa.Column("bio", sa.String(500), nullable=True))
        batch_op.add_column(sa.Column("location", sa.String(120), nullable=True))

    # Course additions
    with op.batch_alter_table("courses") as batch_op:
        batch_op.add_column(sa.Column("rating", sa.Float(), nullable=True))
        batch_op.add_column(sa.Column("enrolled_count", sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column("image_url", sa.String(500), nullable=True))
        batch_op.add_column(sa.Column("language", sa.String(20), server_default="en", nullable=False))
        batch_op.add_column(sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False))
        batch_op.add_column(sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now(), nullable=False))

    # Skills tables
    op.create_table(
        "skills",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(120), nullable=False),
        sa.Column("category", sa.String(80), nullable=True),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_skills_name", "skills", ["name"], unique=True)

    op.create_table(
        "resume_skills",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("resume_id", sa.Integer(), sa.ForeignKey("resumes.id", ondelete="CASCADE"), nullable=False),
        sa.Column("skill_id", sa.Integer(), sa.ForeignKey("skills.id", ondelete="CASCADE"), nullable=False),
        sa.Column("confidence", sa.Float(), nullable=True),
        sa.UniqueConstraint("resume_id", "skill_id", name="uq_resume_skill"),
    )

    op.create_table(
        "user_skills",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("skill_id", sa.Integer(), sa.ForeignKey("skills.id", ondelete="CASCADE"), nullable=False),
        sa.Column("proficiency", sa.String(40), nullable=True),
        sa.Column("verified", sa.Boolean(), server_default=sa.false(), nullable=False),
        sa.UniqueConstraint("user_id", "skill_id", name="uq_user_skill"),
    )

    # Job tables (preparation for Phase 2 aggregation)
    op.create_table(
        "job_sources",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(120), nullable=False),
        sa.Column("base_url", sa.String(500), nullable=True),
        sa.Column("is_active", sa.Boolean(), server_default=sa.true(), nullable=False),
        sa.UniqueConstraint("name"),
    )

    op.create_table(
        "jobs",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("title", sa.String(220), nullable=False),
        sa.Column("company", sa.String(160), nullable=False),
        sa.Column("location", sa.String(160), nullable=False),
        sa.Column("description", sa.Text(), server_default="", nullable=False),
        sa.Column("employment_type", sa.String(40), nullable=True),
        sa.Column("experience_level", sa.String(40), nullable=True),
        sa.Column("salary_min", sa.Float(), nullable=True),
        sa.Column("salary_max", sa.Float(), nullable=True),
        sa.Column("salary_currency", sa.String(10), nullable=True),
        sa.Column("source_id", sa.Integer(), sa.ForeignKey("job_sources.id"), nullable=True),
        sa.Column("source_url", sa.String(500), nullable=True),
        sa.Column("external_id", sa.String(255), nullable=True),
        sa.Column("is_remote", sa.Boolean(), server_default=sa.false(), nullable=False),
        sa.Column("posted_at", sa.DateTime(), nullable=True),
        sa.Column("expires_at", sa.DateTime(), nullable=True),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
    )
    op.create_index("ix_jobs_title", "jobs", ["title"])

    op.create_table(
        "job_skills",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("job_id", sa.Integer(), sa.ForeignKey("jobs.id", ondelete="CASCADE"), nullable=False),
        sa.Column("skill_id", sa.Integer(), sa.ForeignKey("skills.id", ondelete="CASCADE"), nullable=False),
        sa.Column("is_required", sa.Boolean(), server_default=sa.true(), nullable=False),
        sa.UniqueConstraint("job_id", "skill_id", name="uq_job_skill"),
    )

    op.create_table(
        "saved_jobs",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("job_id", sa.Integer(), sa.ForeignKey("jobs.id", ondelete="CASCADE"), nullable=False),
        sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
        sa.UniqueConstraint("user_id", "job_id", name="uq_saved_job"),
    )


def downgrade():
    op.drop_table("saved_jobs")
    op.drop_table("job_skills")
    op.drop_index("ix_jobs_title", table_name="jobs")
    op.drop_table("jobs")
    op.drop_table("job_sources")
    op.drop_table("user_skills")
    op.drop_table("resume_skills")
    op.drop_index("ix_skills_name", table_name="skills")
    op.drop_table("skills")

    with op.batch_alter_table("courses") as batch_op:
        batch_op.drop_column("updated_at")
        batch_op.drop_column("created_at")
        batch_op.drop_column("language")
        batch_op.drop_column("image_url")
        batch_op.drop_column("enrolled_count")
        batch_op.drop_column("rating")

    with op.batch_alter_table("user_profiles") as batch_op:
        batch_op.drop_column("location")
        batch_op.drop_column("bio")
