# Phase 1 completion checklist

## Code-complete in this repository

- [x] Auth API with bcrypt hashing and access/refresh JWTs
- [x] User profile model and `/api/me`
- [x] SQLAlchemy models for foundation entities
- [x] Alembic migration
- [x] PostgreSQL configuration with SSL, pooling, and health checks
- [x] SQLite local fallback only for development smoke tests
- [x] Course search, details, save, unsave, pagination
- [x] Resume PDF/DOCX validation and in-memory text extraction
- [x] S3-compatible object storage path for production resumes
- [x] Production guard that rejects local resume storage
- [x] Responsive frontend pages and visual system
- [x] Frontend API bridge with JWT session and offline preview fallback
- [x] Course normalization and sync endpoint
- [x] Coursera OAuth connector
- [x] edX catalog connector as the DataCamp replacement
- [x] MIT OpenCourseWare metadata connector as an optional open-learning source
- [x] DataCamp scraping excluded for legal and operational safety
- [x] Gemini service boundary reserved for Phase 2
- [x] SRS, ERD, system architecture, UI wireframes, and source research notes
- [x] Basic API tests and smoke-test instructions

## External production setup still required

- [ ] Provision managed PostgreSQL 17 or 18 and set `DATABASE_URL`.
- [ ] Provision S3-compatible object storage and set `STORAGE_BACKEND=s3` plus bucket credentials.
- [ ] Provide Coursera Business/Campus/Government API credentials and approved content endpoint.
- [ ] Provide an approved edX catalog endpoint/API key, or a licensed MIT OpenCourseWare metadata feed.
- [ ] Store all secrets in the deployment platform's secret manager.
- [ ] Run migrations and the smoke-test flow from `docs/Backend_Smoke_Test.md`.

These are provider and infrastructure credentials, not unfinished application features. AI keys are not required for Phase 1 and remain disabled until Phase 2.
