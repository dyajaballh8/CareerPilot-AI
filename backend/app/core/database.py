from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import settings

# Build engine with proper config for SQLite vs PostgreSQL
DATABASE_URL = settings.DATABASE_URL
connect_args: dict = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
if not DATABASE_URL.startswith("sqlite") and settings.DB_SSLMODE:
    connect_args["sslmode"] = settings.DB_SSLMODE

engine_options: dict = {"connect_args": connect_args, "pool_pre_ping": True}
if not DATABASE_URL.startswith("sqlite"):
    engine_options.update(
        {
            "pool_size": settings.DB_POOL_SIZE,
            "max_overflow": settings.DB_MAX_OVERFLOW,
            "pool_timeout": settings.DB_POOL_TIMEOUT,
        }
    )

engine = create_engine(DATABASE_URL, **engine_options)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
