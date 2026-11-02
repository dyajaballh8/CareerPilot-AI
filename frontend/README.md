# CareerPilot Phase 1 frontend

This first phase is a dependency-free, browser-runnable prototype of the foundation experience. It follows the visual direction of the supplied reference: warm paper background, editorial serif headings, soft color blocks, rounded cards, and calm navigation.

## Included

- Register and sign in flow stored locally in the browser.
- Sidebar layout with Overview, Explore courses, My learning, My resume, and Profile.
- Traditional course search and category filters.
- Save / unsave courses with local persistence.
- Basic dashboard with course, resume, and learning status.
- Resume upload for PDF/DOCX metadata with a 10 MB validation limit.
- Responsive mobile layout.

## Run locally

Open `index.html` in a browser. No Node or Python installation is required for this preview.

## Backend handoff

The UI keeps the feature boundaries ready for the planned FastAPI contracts. Local storage is intentionally used only as a Phase 1 preview fallback until the backend auth, PostgreSQL, course, and resume endpoints are implemented.
