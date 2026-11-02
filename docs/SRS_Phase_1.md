# CareerPilot — Software Requirements Specification (Phase 1)

## Scope

Phase 1 delivers the non-AI foundation for a career development platform. A user can create an account, authenticate, maintain a profile, explore courses with traditional search and filters, save courses, upload one current resume, and view a basic dashboard.

AI CV analysis, job aggregation, job matching, internship recommendations, interview simulation, and natural-language course search are explicitly out of scope and belong to Phase 2.

## Functional requirements

- **FR-01 Authentication:** register and login with email and password; passwords are bcrypt-hashed; the API issues access and refresh JWTs.
- **FR-02 Profile:** every user has a profile with a display name and optional career focus.
- **FR-03 Course discovery:** authenticated users can search courses by keyword, category, level, and page.
- **FR-04 Course details:** authenticated users can retrieve a course record.
- **FR-05 Saved courses:** users can save and unsave courses; uniqueness is enforced per user/course.
- **FR-06 Resume:** users can upload PDF or DOCX files up to 10MB. The file is stored and text is extracted for future phases.
- **FR-07 Resume lifecycle:** users can view the latest resume and delete it.
- **FR-08 Dashboard:** the frontend shows welcome state, saved-course count, resume status, and course recommendations.
- **FR-09 Security:** protected routes require a bearer access token and user data is scoped to the authenticated user.

## Non-functional requirements

The API is FastAPI-based, data access uses SQLAlchemy, migrations use Alembic, PostgreSQL is supported, SQLite is available for local smoke testing, uploads are stored outside the source tree, and the frontend remains responsive on mobile widths.

## Acceptance criteria

A fresh local setup can migrate a database, start the API, register a user, log in, search and save a course, upload a PDF/DOCX resume, and access the OpenAPI docs. The frontend can run as a static preview and uses the API when a valid bearer token is present.
