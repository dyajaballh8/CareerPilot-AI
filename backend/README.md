# CareerPilot Phase 1 backend

The Phase 1 backend now covers the complete foundation contract: JWT access/refresh tokens, user profiles, course categories and search, course details, save/unsave, resume upload validation, local file storage, and PDF/DOCX text extraction.

## What you need to install

The current device does not expose Python or Node in PATH. Install **Python 3.11+** and make sure `python` and `pip` work in a new terminal. PostgreSQL 15+ is recommended for the team environment, but local development can start immediately with SQLite using the default `DATABASE_URL`.

Node.js is not required for the current dependency-free frontend preview.

## Run with SQLite first

### PowerShell

```powershell
cd backend
python -m venv .venv
.venv\\Scripts\\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
python -m alembic upgrade head
python -m uvicorn app.main:app --reload --port 8001
```

### Command Prompt (CMD)

```bat
cd /d "C:\\CareerPilot AI - Copy\\backend"
python -m venv .venv
.venv\\Scripts\\activate.bat
python -m pip install -r requirements.txt
copy .env.example .env
python -m alembic upgrade head
python -m uvicorn app.main:app --reload --port 8001
```

Then open `http://127.0.0.1:8001/docs` to test the API.

## Run with PostgreSQL

Create a database named `careerpilot`, then update `.env`:

```env
DATABASE_URL=postgresql+psycopg://careerpilot:YOUR_PASSWORD@localhost:5432/careerpilot
SECRET_KEY=use-a-long-random-secret-here
```

Run `alembic upgrade head` and start Uvicorn again.

## Phase 1 routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET/PATCH /api/me`
- `GET /api/courses/search`
- `GET /api/courses/{id}`
- `POST/DELETE /api/courses/{id}/save`
- `POST/GET /api/resumes/upload` and `/api/resumes/latest`
- `DELETE /api/resumes/{id}`

AI CV analysis, job aggregation, matching, and interview features are intentionally excluded until Phase 2.
