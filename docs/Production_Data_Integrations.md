# Production data and course integrations

## Database and storage decision

Use a managed PostgreSQL 17 or 18 instance for production. PostgreSQL is the right fit for CareerPilot because the domain is relational: users, profiles, courses, categories, saved courses, resumes, skills, jobs, and future matches need foreign keys, uniqueness rules, transactions, and migrations. PostgreSQL major versions receive five years of support; run the current minor release for the chosen major.

The application now supports PostgreSQL through `postgresql+psycopg`, SSL mode, connection pooling, pool health checks, and environment-driven sizing. SQLite remains only as a local smoke-test fallback. Production must also use managed automated backups, point-in-time recovery, private networking, a least-privilege application role, and a tested restore procedure.

Resume files must not live on the API server filesystem in production. The code now rejects `STORAGE_BACKEND=local` when `ENVIRONMENT=production` and requires an S3-compatible object store through `STORAGE_BACKEND=s3`, `S3_BUCKET`, and the related credentials. PDF/DOCX extraction happens in memory; only the object-store key and extracted text metadata are kept in the database. The browser may keep a short-lived session token for the current static preview, but the server is the source of truth for user data.

## Course source replacement for DataCamp

### Coursera

Coursera has an official developer portal and OAuth 2.0 API. Its onboarding guide says API access is for Coursera Business, Campus, or Government customers; an organization admin must register the application and enable APIs. The production integration requires the organization's Coursera agreement, app key/secret, enabled scopes, content endpoint, and business/organization ID. These secrets belong in a deployment secret manager, never in the frontend or Git.

### edX

The recommended DataCamp replacement is **edX Course Catalog / Enterprise API**. edX publishes a Course Catalog API guide and Enterprise API documentation. It is suitable for normalized metadata ingestion when the organization receives the appropriate API access. Configure the approved endpoint and bearer key in `EDX_CATALOG_URL` and `EDX_API_KEY`. Do not copy course content; store metadata and link users to the provider.

### MIT OpenCourseWare

MIT OpenCourseWare is a second optional, open educational source. Use only an official feed or a dataset/API whose license permits the intended use. The integration is designed as a metadata-only provider and should retain attribution and the original course URL. It is a useful fallback for free, open learning content, but it does not replace paid catalog coverage.

### DataCamp

DataCamp's public course catalog is visible to users, but no public production catalog API was identified in the official materials reviewed. DataCamp's Terms of Use prohibit automated searches, scraping, mining, and using the service to build a similar or competitive product without authorization. Therefore DataCamp is removed from the default production plan. It may be added only after a written partner/API agreement.

## Required external inputs

Before production launch, provide: a managed PostgreSQL connection string; a secret-manager value for `SECRET_KEY`; an S3-compatible bucket and credentials for resume objects; Coursera organization API credentials and enabled scopes; and either an approved edX catalog endpoint or an approved MIT OpenCourseWare metadata feed. No Gemini key is required for Phase 1.

## References

- Coursera API onboarding: https://dev.coursera.com/get-started
- Coursera Terms: https://www.coursera.org/about/terms
- DataCamp Terms: https://www.datacamp.com/terms-of-use
- edX Course Catalog API guide: https://course-catalog-api-guide.readthedocs.io/en/latest/intro_edx_apis.html
- edX Enterprise API docs: https://enterprise-api-doc.edx.org/
- MIT OpenCourseWare: https://ocw.mit.edu/
- PostgreSQL versioning: https://www.postgresql.org/support/versioning/
- PostgreSQL server setup: https://www.postgresql.org/docs/current/runtime.html
