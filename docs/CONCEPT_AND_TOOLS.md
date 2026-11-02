# 🚀 CareerPilot AI — Concept & Tools

---

## 📌 1. Project Concept

### 1.1 The Problem
- **Fragmented Learning and Job Sources:** Job seekers and students waste hours navigating across disconnected platforms (Coursera, Udemy, edX, YouTube, LinkedIn, job boards) without a single unified overview.
- **The Skill Gap Dilemma:** Candidates struggle to identify what specific skills or certifications they lack to qualify for target roles. Traditional job search engines do not diagnose skill deficiencies.
- **Interview Anxiety and Lack of Practical Preparation:** Candidates lack access to realistic, technical and behavioral interview practice with real-time feedback, leaving them unprepared for actual hiring rounds.

---

### 1.2 The Solution
**CareerPilot AI** is an end-to-end intelligent career companion that consolidates the entire professional growth lifecycle into three interconnected core capabilities:
- **Unified Course Explorer:** Aggregates and discovers hundreds of thousands of learning resources from top global providers (Coursera, Udemy, edX, MIT OCW, YouTube) through a clean, unified multi-platform interface.
- **AI Job & Internship Finder:** Parses and analyzes user resumes (CVs) with Gemini AI, computes real-time Match Scores against live job and internship listings, identifies missing skills (Skill Gap Analysis), and recommends targeted courses to close those gaps.
- **AI Interview Simulator:** Offers interactive, conversational technical and HR interview simulations with Gemini AI, evaluating answers in real time and generating detailed performance scorecards.

---

### 1.3 Target Audience
- **Undergraduates & Fresh Graduates:** Looking for entry-level jobs and internships, seeking clear guidance on how to break into the market.
- **Active Job Seekers:** Professionals looking to measure how well their resume matches real job market requirements and quickly upskill.
- **Career Switchers:** Individuals transitioning into new industries (Software Engineering, Data Science, UI/UX Design, etc.) who require structured learning roadmaps.
- **Lifelong Learners:** Students and practitioners who want a modern, aggregated portal to search and bookmark top-tier educational courses across multiple platforms.

---

## 🌟 2. Core Features Overview

| Feature | Key Capabilities |
| :--- | :--- |
| **1. Course Explorer** | • Multi-platform course aggregation (Coursera, Udemy, edX, MIT OCW, YouTube)<br>• On-demand dynamic discovery for any topic or skill<br>• Advanced filtering by Category, Level, and Platform<br>• Save & bookmark favorite courses to personal learning list |
| **2. AI Job & Internship Finder** | • Resume (CV) upload and structured AI parsing (Gemini AI)<br>• Aggregated listings from job APIs and career portals (Adzuna, Greenhouse, Lever)<br>• AI-powered job matching with percentage score and actionable explanation<br>• Automated skill gap identification with course recommendations |
| **3. AI Interview Simulator** | • Interactive technical & HR mock interviews powered by Gemini AI<br>• Fully configurable: domain/role, difficulty, interview type, and question count<br>• Real-time answer evaluation with instant scoring<br>• Comprehensive feedback reports with strengths and improvement areas |

---

## 🛠️ 3. Tech Stack & Architecture

### 3.1 Frontend
- **Architecture:** Lightweight Single Page Application (SPA).
- **Core Languages:** Modern Vanilla JavaScript (ES6+), Semantic HTML5.
- **Styling:** Modern CSS3 (CSS Variables, Flexbox, CSS Grid, Responsive Breakpoints).
- **UI/UX Design:** 
  - Editorial typography (`Playfair Display` + `Plus Jakarta Sans`).
  - Expressive thematic course cards with dynamic category visuals.
  - Zero heavy frontend dependencies for maximum speed and instant loading.

---

### 3.2 Backend
- **Framework:** **FastAPI** (Python 3.11+) for high-performance, asynchronous REST APIs.
- **ASGI Server:** **Uvicorn** with asynchronous event loop.
- **Data Validation & Schemas:** **Pydantic v2** for strict request/response data validation and serialization.
- **Authentication & Security:** 
  - Password hashing via **Passlib & Bcrypt**.
  - Stateless session authorization using **JWT (JSON Web Tokens)** and **OAuth2 Password Bearer**.

---

### 3.3 Database & ORM
- **Database Engine:** **PostgreSQL** (Production) / **SQLite** (Local Development and automated testing).
- **Object-Relational Mapping (ORM):** **SQLAlchemy 2.0** with full asynchronous session support (`AsyncSession`).
- **Database Migrations:** **Alembic** for automated, version-controlled database schema migrations.

---

### 3.4 Artificial Intelligence & LLM Engine
- **Primary AI Model:** **Google Gemini API** (`gemini-1.5-flash` / `gemini-1.5-pro`).
- **AI Responsibilities:**
  - Semantic resume information extraction (Skills, Experience, Education, Seniority).
  - Skill-to-Job matching and qualification gap analysis.
  - Dynamic interview question generation and context-aware follow-ups.
  - Quantitative rubric scoring and constructive behavioral feedback.

---

### 3.5 External Integrations & Connectors
- **Learning Platforms:**
  - Coursera REST API / Catalog Feeds
  - Udemy Course Search Integration
  - edX Course Discovery Catalog
  - MIT OpenCourseWare (OCW) API
  - YouTube Data API (Curated Tech & Educational Playlists)
- **Job Aggregators:**
  - Adzuna Jobs API
  - Greenhouse & Lever Applicant Tracking System (ATS) Webhooks

---

### 3.6 DevOps, Testing & Tooling
- **Version Control:** **Git** & **GitHub**.
- **Automated Testing:** **Pytest** with **HTTPX** for async endpoint and integration testing.
- **API Documentation:** Interactive **Swagger UI** (`/docs`) and **ReDoc** (`/redoc`) auto-generated by FastAPI.
- **Environment Management:** Python virtual environments (`venv`) and `.env` configuration management.
