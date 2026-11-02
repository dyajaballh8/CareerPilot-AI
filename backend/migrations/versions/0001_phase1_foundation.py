"""phase 1 foundation

Revision ID: 0001_phase1_foundation
"""
from alembic import op
import sqlalchemy as sa

revision = "0001_phase1_foundation"
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table("users", sa.Column("id", sa.Integer(), primary_key=True), sa.Column("email", sa.String(255), nullable=False), sa.Column("password_hash", sa.String(255), nullable=False), sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.true()), sa.Column("created_at", sa.DateTime(), nullable=False))
    op.create_index("ix_users_email", "users", ["email"], unique=True)
    op.create_table("user_profiles", sa.Column("id", sa.Integer(), primary_key=True), sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False), sa.Column("full_name", sa.String(160), nullable=False), sa.Column("career_focus", sa.String(120)), sa.UniqueConstraint("user_id"))
    op.create_table("course_categories", sa.Column("id", sa.Integer(), primary_key=True), sa.Column("name", sa.String(80), nullable=False), sa.UniqueConstraint("name"))
    op.create_table("courses", sa.Column("id", sa.Integer(), primary_key=True), sa.Column("title", sa.String(220), nullable=False), sa.Column("provider", sa.String(120), nullable=False), sa.Column("category_id", sa.Integer(), sa.ForeignKey("course_categories.id"), nullable=False), sa.Column("level", sa.String(40), nullable=False), sa.Column("duration", sa.String(40), nullable=False), sa.Column("price", sa.String(40), nullable=False), sa.Column("description", sa.Text(), nullable=False), sa.Column("source_url", sa.String(500)))
    op.create_index("ix_courses_title", "courses", ["title"])
    op.create_table("saved_courses", sa.Column("id", sa.Integer(), primary_key=True), sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False), sa.Column("course_id", sa.Integer(), sa.ForeignKey("courses.id", ondelete="CASCADE"), nullable=False), sa.Column("created_at", sa.DateTime(), nullable=False), sa.UniqueConstraint("user_id", "course_id", name="uq_saved_course_user_course"))
    op.create_table("resumes", sa.Column("id", sa.Integer(), primary_key=True), sa.Column("user_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False), sa.Column("original_filename", sa.String(255), nullable=False), sa.Column("stored_filename", sa.String(255), nullable=False), sa.Column("mime_type", sa.String(120), nullable=False), sa.Column("size_bytes", sa.Integer(), nullable=False), sa.Column("extracted_text", sa.Text(), nullable=False), sa.Column("created_at", sa.DateTime(), nullable=False), sa.UniqueConstraint("stored_filename"))

def downgrade():
    op.drop_table("resumes"); op.drop_table("saved_courses"); op.drop_index("ix_courses_title", table_name="courses"); op.drop_table("courses"); op.drop_table("course_categories"); op.drop_table("user_profiles"); op.drop_index("ix_users_email", table_name="users"); op.drop_table("users")
