import io
import os
import pytest
from fastapi.testclient import TestClient

os.environ["DATABASE_URL"] = "sqlite:///./test_careerpilot.db"
os.environ["SECRET_KEY"] = "test-secret"

from app.main import app, Base, engine
from app.services.jobs.aggregator import JobAggregatorService
from app.core.database import SessionLocal

Base.metadata.create_all(engine)
client = TestClient(app)

# Ensure jobs are seeded in test db
with SessionLocal() as db:
    JobAggregatorService(db).sync_curated_seed_jobs()


@pytest.fixture
def auth_headers():
    email = "job_test_user@example.com"
    pwd = "securepassword123"
    client.post("/api/auth/register", json={"email": email, "password": pwd, "name": "Job Hunter"})
    login_res = client.post("/api/auth/login", json={"email": email, "password": pwd})
    token = login_res.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def test_job_search_and_filters():
    # 1. Search all jobs
    res = client.get("/api/jobs")
    assert res.status_code == 200
    data = res.json()
    assert data["total"] > 0
    assert len(data["items"]) > 0

    # 2. Filter by internship
    res_intern = client.get("/api/jobs?employment_type=internship")
    assert res_intern.status_code == 200
    items = res_intern.json()["items"]
    assert len(items) > 0
    assert all("intern" in (j["employment_type"] or "").lower() or "intern" in j["title"].lower() for j in items)

    # 3. Search by keyword
    res_py = client.get("/api/jobs?q=Python")
    assert res_py.status_code == 200
    assert any("Python" in j["skills"] or "python" in j["description"].lower() for j in res_py.json()["items"])


def test_job_save_flow(auth_headers):
    # Get a job
    jobs_res = client.get("/api/jobs")
    job_id = jobs_res.json()["items"][0]["id"]

    # Save job
    save_res = client.post(f"/api/jobs/{job_id}/save", headers=auth_headers)
    assert save_res.status_code == 201

    # Check saved list
    saved_res = client.get("/api/jobs/saved", headers=auth_headers)
    assert saved_res.status_code == 200
    saved_ids = [j["id"] for j in saved_res.json()]
    assert job_id in saved_ids

    # Unsave
    unsave_res = client.delete(f"/api/jobs/{job_id}/save", headers=auth_headers)
    assert unsave_res.status_code == 200
    assert unsave_res.json()["saved"] is False


def test_resume_ai_parsing_and_job_matching(auth_headers):
    # Create sample PDF resume with Python & React skills
    import fitz
    doc = fitz.open()
    page = doc.new_page()
    page.insert_text(
        (50, 72),
        "Diaa Abdullah\n"
        "Full Stack Developer\n"
        "Passionate engineer with skills in Python, FastAPI, React, JavaScript, SQL, and Git.\n"
        "Education: Bachelor of Computer Science, University of Technology\n"
        "Experience: Built high-scale web apps using Python and React.",
    )
    pdf_bytes = doc.tobytes()

    # Upload resume
    upload_res = client.post(
        "/api/resumes/upload",
        headers=auth_headers,
        files={"file": ("resume.pdf", pdf_bytes, "application/pdf")},
    )
    assert upload_res.status_code == 201
    res_data = upload_res.json()
    assert len(res_data["skills"]) > 0
    assert "Python" in res_data["skills"]
    assert "React" in res_data["skills"]

    # Get matched jobs
    matched_res = client.get("/api/jobs/matched", headers=auth_headers)
    assert matched_res.status_code == 200
    matched_jobs = matched_res.json()
    assert len(matched_jobs) > 0
    # Top matched job should have high score
    assert matched_jobs[0]["match_score"] is not None
    assert matched_jobs[0]["match_score"] >= 60

    # Test detailed job match & course recommendations
    target_job_id = matched_jobs[0]["id"]
    detail_res = client.get(f"/api/jobs/{target_job_id}/match", headers=auth_headers)
    assert detail_res.status_code == 200
    detail = detail_res.json()
    assert "match_score" in detail
    assert "score_breakdown" in detail
    assert "explanation" in detail
    assert "matching_skills" in detail
    assert "missing_skills" in detail
    assert "recommended_courses" in detail
    assert len(detail["matching_skills"]) > 0
