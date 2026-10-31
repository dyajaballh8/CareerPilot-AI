# 🚀 CareerPilot AI

**AI-Powered Career Development Platform**

> Find Courses · Discover Opportunities · Prepare for Interviews

An intelligent platform that helps university students and fresh graduates develop their skills, discover job and internship opportunities, and practice interviews using AI.

---

## ✨ Core Features

### 1. 📚 Course Explorer
- Search for courses across multiple platforms
- AI-powered natural language search (Gemini)
- Advanced filters: Category, Level, Price, Platform, Duration, Language
- Save & bookmark courses

### 2. 💼 AI Job & Internship Finder
- Aggregates jobs from multiple APIs (Adzuna, Greenhouse, Lever) and company career pages
- Upload & parse CV with AI (Gemini)
- AI-powered job matching with match score & explanation
- Identifies missing skills and recommends courses

### 3. 🎯 AI Interview Simulator
- Practice technical & HR interviews with Gemini AI
- Configurable: field, difficulty, type, question count
- Real-time answer evaluation & scoring
- Follow-up questions & detailed feedback reports

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend | React.js + Tailwind CSS |
| Backend | Python + FastAPI |
| Database | PostgreSQL + SQLAlchemy |
| Authentication | JWT (Access + Refresh Tokens) |
| AI Model | Google Gemini API |
| CV Parsing | PyMuPDF + python-docx |
| ML Matching | Scikit-learn + Sentence Transformers |
| Testing | Pytest + Postman |

---

## 📁 Project Structure

```
CareerPilot AI/
├── frontend/                # React.js Frontend
│   ├── public/
│   └── src/
│       ├── assets/          # Images & static files
│       ├── components/      # Reusable UI components
│       │   ├── auth/        # Login, Register
│       │   ├── common/      # Sidebar, Navbar, Cards
│       │   ├── courses/     # Course cards, filters
│       │   ├── dashboard/   # Dashboard widgets
│       │   ├── interviews/  # Interview UI
│       │   ├── jobs/        # Job cards, matching
│       │   ├── profile/     # Profile & settings
│       │   └── resume/      # CV upload & review
│       ├── hooks/           # Custom React hooks
│       ├── pages/           # Page-level components
│       ├── services/        # API client layer
│       ├── store/           # State management
│       ├── styles/          # Global styles
│       └── utils/           # Helper functions
│
├── backend/                 # FastAPI Backend
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/      # API route handlers
│   │   ├── core/            # Config, security, dependencies
│   │   ├── models/          # SQLAlchemy database models
│   │   ├── schemas/         # Pydantic request/response schemas
│   │   ├── services/        # Business logic
│   │   │   ├── ai/          # Gemini API integration
│   │   │   ├── auth/        # Authentication logic
│   │   │   ├── courses/     # Course search & management
│   │   │   ├── interviews/  # Interview simulator logic
│   │   │   ├── jobs/        # Job aggregation & matching
│   │   │   └── resume/      # CV parsing & analysis
│   │   └── utils/           # Utility functions
│   ├── migrations/          # Alembic database migrations
│   │   └── versions/
│   └── tests/               # Backend tests
│
└── docs/                    # Documentation
    └── CareerPilot_AI_Plan.md
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Google Gemini API Key

### Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env      # Add your API keys
uvicorn app.main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env      # Add backend URL
npm run dev
```

---

## 👥 Team

| Member | Role |
|--------|------|
| Member A | Frontend Developer |
| Member B | Backend Developer |
| Member C | AI/ML & Integration |

---

## 📄 License

This project is for educational purposes.
