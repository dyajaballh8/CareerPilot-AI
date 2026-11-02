# CareerPilot — Phase 1 implementation

## Delivered foundation

The frontend now contains the first complete product flow for the Foundation phase. The experience is intentionally not styled as an AI product. It uses the reference direction as a base: warm paper surfaces, soft sage/coral/yellow/lavender blocks, serif editorial headlines, compact utility labels, and a calm dashboard composition.

Implemented flows:

1. **Auth** — register and sign in screens with local session persistence.
2. **Overview dashboard** — welcome state, progress metrics, resume status, and course recommendations.
3. **Course Explorer** — traditional keyword search, category filters, course cards, provider, duration, price and level metadata.
4. **Saved Courses** — save/unsave state and a dedicated learning shortlist.
5. **Resume** — PDF/DOCX upload metadata, file validation, latest-file preview, replace and remove actions.
6. **Profile** — account details and career focus shell.
7. **Responsive layout** — desktop sidebar and mobile single-column behavior.

## Current technical boundary

Because this device does not currently expose Node.js or Python in PATH, the frontend is delivered as a dependency-free browser prototype. It runs from `frontend/index.html` and persists preview state in `localStorage`.

The UI is ready to replace its local fallback with the planned API layer:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/courses/search`
- `POST /api/courses/{id}/save`
- `DELETE /api/courses/{id}/save`
- `POST /api/resumes/upload`
- `DELETE /api/resumes/{id}`
- `GET /api/me`

AI-powered search, CV parsing, matching, jobs, and interviews are intentionally excluded from this phase.
