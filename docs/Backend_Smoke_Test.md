# Phase 1 backend smoke test (CMD)

Run the API from `backend` with the virtual environment active:

```bat
python -m uvicorn app.main:app --reload --port 8001
```

In a second CMD window:

```bat
curl http://127.0.0.1:8001/health
curl -X POST http://127.0.0.1:8001/api/auth/register -H "Content-Type: application/json" -d "{\"email\":\"maya@example.com\",\"password\":\"password123\",\"name\":\"Maya Hassan\"}"
```

Copy the `access_token` from the response and use it below:

```bat
set TOKEN=PASTE_ACCESS_TOKEN_HERE
curl "http://127.0.0.1:8001/api/courses/search" -H "Authorization: Bearer %TOKEN%"
curl -X POST "http://127.0.0.1:8001/api/courses/1/save" -H "Authorization: Bearer %TOKEN%"
curl "http://127.0.0.1:8001/api/resumes/latest" -H "Authorization: Bearer %TOKEN%"
```

For the frontend, open `frontend/index.html` in Edge. If the API is online, register or log in and the UI stores the JWT and loads the course catalog from `/api/courses/search`. If the API is offline, the UI stays usable in local preview mode.
