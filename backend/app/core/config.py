from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    ENVIRONMENT: str = "development"
    DATABASE_URL: str = "sqlite:///./careerpilot.db"
    SECRET_KEY: str = "change-me-before-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    DB_POOL_SIZE: int = 10
    DB_MAX_OVERFLOW: int = 20
    DB_POOL_TIMEOUT: int = 30
    DB_SSLMODE: str = ""
    UPLOAD_DIR: str = "./storage/resumes"
    STORAGE_BACKEND: str = "local"
    S3_BUCKET: str = ""
    S3_REGION: str = ""
    S3_ENDPOINT_URL: str = ""
    CORS_ORIGINS: str = "http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173,null"
    # Course connectors
    COURSE_SOURCE_URL: str = ""
    COURSE_SOURCE_API_KEY: str = ""
    COURSERA_CLIENT_ID: str = ""
    COURSERA_CLIENT_SECRET: str = ""
    COURSERA_TOKEN_URL: str = "https://api.coursera.com/oauth2/client_credentials/token"
    COURSERA_CONTENT_URL: str = ""
    EDX_CATALOG_URL: str = ""
    EDX_API_KEY: str = ""
    MIT_OCW_CATALOG_URL: str = ""
    UDEMY_CLIENT_ID: str = ""
    UDEMY_CLIENT_SECRET: str = ""
    YOUTUBE_API_KEY: str = ""
    # Gemini (Phase 2)
    GEMINI_API_KEY: str = ""
    GEMINI_MODEL: str = "gemini-2.0-flash"
    GEMINI_TIMEOUT_SECONDS: int = 30
    GEMINI_MAX_RETRIES: int = 2
    GEMINI_REQUESTS_PER_MINUTE: int = 30

    class Config:
        env_file = ".env"
        extra = "ignore"


settings = Settings()

# Production guards
if settings.ENVIRONMENT == "production":
    if settings.SECRET_KEY == "change-me-before-production":
        raise RuntimeError("SECRET_KEY must be configured before starting in production")
    if not settings.DATABASE_URL.startswith("postgres"):
        raise RuntimeError("Production requires a managed PostgreSQL DATABASE_URL")
