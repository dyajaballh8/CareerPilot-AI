import os
os.environ["DATABASE_URL"] = "sqlite:///./careerpilot.db"
os.environ["SECRET_KEY"] = "test-secret"

from fastapi.testclient import TestClient
from app.main import app, Base, engine

Base.metadata.create_all(engine)
client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["phase"] == 1


def test_auth_full_flow():
    email = "pilot_user@example.com"
    password = "secretpassword"

    # Register
    res = client.post("/api/auth/register", json={"email": email, "password": password, "name": "Pilot User"})
    assert res.status_code in (201, 409)

    # Login
    login_res = client.post("/api/auth/login", json={"email": email, "password": password})
    assert login_res.status_code == 200
    tokens = login_res.json()
    assert "access_token" in tokens
    assert "refresh_token" in tokens
    access_token = tokens["access_token"]
    refresh_token = tokens["refresh_token"]

    # Refresh Token
    refresh_res = client.post("/api/auth/refresh", json={"refresh_token": refresh_token})
    assert refresh_res.status_code == 200
    assert "access_token" in refresh_res.json()

    # Get /api/me
    headers = {"Authorization": f"Bearer {access_token}"}
    me_res = client.get("/api/me", headers=headers)
    assert me_res.status_code == 200
    assert me_res.json()["email"] == email

    # Patch /api/me
    patch_res = client.patch("/api/me", headers=headers, json={"career_focus": "Data & analytics"})
    assert patch_res.status_code == 200
    assert patch_res.json()["career_focus"] == "Data & analytics"


def test_course_search_and_save():
    # Login to get token
    login_res = client.post("/api/auth/login", json={"email": "pilot_user@example.com", "password": "secretpassword"})
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Search courses
    search_res = client.get("/api/courses/search?q=Python", headers=headers)
    assert search_res.status_code == 200
    data = search_res.json()
    assert "items" in data
    assert "total" in data

    if data["items"]:
        course_id = data["items"][0]["id"]
        # Get details
        detail_res = client.get(f"/api/courses/{course_id}", headers=headers)
        assert detail_res.status_code == 200

        # Save course
        save_res = client.post(f"/api/courses/{course_id}/save", headers=headers)
        assert save_res.status_code in (200, 204)

        # Unsave course
        unsave_res = client.delete(f"/api/courses/{course_id}/save", headers=headers)
        assert unsave_res.status_code in (200, 204)


def test_resume_flow():
    login_res = client.post("/api/auth/login", json={"email": "pilot_user@example.com", "password": "secretpassword"})
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Upload mock PDF (simple PDF header)
    pdf_bytes = b"%PDF-1.4\n%mock resume content\n%%EOF"
    files = {"file": ("test_resume.pdf", pdf_bytes, "application/pdf")}
    upload_res = client.post("/api/resumes/upload", headers=headers, files=files)
    assert upload_res.status_code == 201
    resume_data = upload_res.json()
    assert resume_data["original_filename"] == "test_resume.pdf"
    resume_id = resume_data["id"]

    # Get latest
    latest_res = client.get("/api/resumes/latest", headers=headers)
    assert latest_res.status_code == 200
    assert latest_res.json()["id"] == resume_id

    # Delete
    del_res = client.delete(f"/api/resumes/{resume_id}", headers=headers)
    assert del_res.status_code in (200, 204)
