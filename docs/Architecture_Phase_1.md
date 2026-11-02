# CareerPilot — Phase 1 architecture

## System architecture

```mermaid
flowchart LR
  Browser[Static frontend\nHTML CSS JS] -->|Bearer JWT / JSON / multipart| API[FastAPI API]
  API --> ORM[SQLAlchemy]
  ORM --> DB[(PostgreSQL\nor SQLite local)]
  API --> Files[Resume storage\nPDF/DOCX]
  API --> Extract[PyMuPDF + python-docx]
  Source[Configurable course source] --> Ingest[Normalizer]
  Ingest --> DB
  Gemini[Gemini service boundary\nPhase 2 only]
```

## ERD

```mermaid
erDiagram
  USERS ||--|| USER_PROFILES : has
  USERS ||--o{ SAVED_COURSES : saves
  COURSES ||--o{ SAVED_COURSES : appears_in
  COURSE_CATEGORIES ||--o{ COURSES : contains
  USERS ||--o{ RESUMES : uploads

  USERS { int id PK string email string password_hash boolean is_active datetime created_at }
  USER_PROFILES { int id PK int user_id FK string full_name string career_focus }
  COURSE_CATEGORIES { int id PK string name }
  COURSES { int id PK string title string provider int category_id FK string level string duration string price text description string source_url }
  SAVED_COURSES { int id PK int user_id FK int course_id FK datetime created_at }
  RESUMES { int id PK int user_id FK string original_filename string stored_filename string mime_type int size_bytes text extracted_text datetime created_at }
```

## API boundary

The frontend calls `/api/auth`, `/api/me`, `/api/courses`, and `/api/resumes`. The API does not expose AI, jobs, internships, or interview routes in Phase 1. Those domains can be added without changing the Phase 1 entities.
