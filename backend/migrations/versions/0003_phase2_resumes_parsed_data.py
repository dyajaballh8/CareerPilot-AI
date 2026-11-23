"""phase 2 resumes parsed data

Revision ID: 0003_phase2_resumes_parsed_data
Revises: 0002_phase1_skills_and_jobs
Create Date: 2026-11-21
"""
from alembic import op
import sqlalchemy as sa

revision = "0003_phase2_resumes_parsed_data"
down_revision = "0002_phase1_skills_and_jobs"
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table("resumes") as batch_op:
        batch_op.add_column(sa.Column("parsed_json", sa.Text(), nullable=True))


def downgrade():
    with op.batch_alter_table("resumes") as batch_op:
        batch_op.drop_column("parsed_json")
