from __future__ import annotations
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func, select

from app.core.config import settings
from app.core.database import Base, SessionLocal, engine
import app.models  # noqa: F401 - ensure all tables are registered
from app.api.routes import api_router
from app.models.course import Course, CourseCategory

SAMPLE_COURSES = [
    # Development - Python, JS, React, CS50
    {
        "category": "Development",
        "title": "Programming for Everybody (Getting Started with Python)",
        "provider": "Coursera · University of Michigan",
        "level": "Beginner",
        "duration": "7 weeks",
        "price": "Free",
        "rating": 4.8,
        "enrolled_count": 1250000,
        "source_url": "https://www.coursera.org/learn/python",
        "description": "Learn the basics of building programs from simple instructions in Python. Covers variables, conditional execution, loops, and functions. No prerequisites required.",
    },
    {
        "category": "Development",
        "title": "The Complete 2025 Web Development Bootcamp",
        "provider": "Udemy · Dr. Angela Yu",
        "level": "Beginner",
        "duration": "65 hours",
        "price": "$19.99",
        "rating": 4.7,
        "enrolled_count": 980000,
        "source_url": "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
        "description": "Master full-stack web development: HTML5, CSS3, Modern JavaScript, React.js, Node.js, Express, MongoDB, and RESTful APIs.",
    },
    {
        "category": "Development",
        "title": "CS50: Introduction to Computer Science",
        "provider": "edX · Harvard University",
        "level": "Beginner",
        "duration": "12 weeks",
        "price": "Free",
        "rating": 4.9,
        "enrolled_count": 2800000,
        "source_url": "https://www.edx.org/learn/computer-science/harvard-university-cs50-s-introduction-to-computer-science",
        "description": "Harvard's flagship entry-level computer science course. Teaches how to think algorithmically and solve problems efficiently using C, Python, SQL, and JavaScript.",
    },
    {
        "category": "Development",
        "title": "React - The Complete Guide (incl. Next.js, Redux)",
        "provider": "Udemy · Maximilian Schwarzmüller",
        "level": "Intermediate",
        "duration": "48 hours",
        "price": "$24.99",
        "rating": 4.8,
        "enrolled_count": 840000,
        "source_url": "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
        "description": "Learn React from the ground up: Hooks, Redux Toolkit, React Router, Next.js, Server Actions, animations, and deployment.",
    },
    {
        "category": "Development",
        "title": "Introduction to Computer Science and Programming in Python",
        "provider": "MIT OpenCourseWare",
        "level": "Beginner",
        "duration": "9 weeks",
        "price": "Free",
        "rating": 4.9,
        "enrolled_count": 650000,
        "source_url": "https://ocw.mit.edu/courses/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/",
        "description": "MIT introductory course aimed at students with little or no programming background. Develops computational problem-solving and algorithmic thinking.",
    },
    {
        "category": "Development",
        "title": "JavaScript Full Course for Beginners",
        "provider": "YouTube · freeCodeCamp",
        "level": "Beginner",
        "duration": "8 hours",
        "price": "Free",
        "rating": 4.9,
        "enrolled_count": 2100000,
        "source_url": "https://www.youtube.com/watch?v=PkZNo7MFNFg",
        "description": "Comprehensive JavaScript tutorial covering variables, data types, arrays, functions, objects, DOM manipulation, and asynchronous programming.",
    },
    {
        "category": "Development",
        "title": "Full Stack Open: Deep Dive into Modern Web Development",
        "provider": "University of Helsinki",
        "level": "Intermediate",
        "duration": "Self-paced",
        "price": "Free",
        "rating": 4.9,
        "enrolled_count": 350000,
        "source_url": "https://fullstackopen.com/en/",
        "description": "Learn React, Redux, Node.js, MongoDB, GraphQL, TypeScript, and CI/CD with real-world industry project architectures.",
    },

    # Data - SQL, Analytics, Python Data Science
    {
        "category": "Data",
        "title": "Google Data Analytics Professional Certificate",
        "provider": "Coursera · Google",
        "level": "Beginner",
        "duration": "6 months",
        "price": "Free to audit",
        "rating": 4.8,
        "enrolled_count": 1600000,
        "source_url": "https://www.coursera.org/professional-certificates/google-data-analytics",
        "description": "Gain hands-on skills in data cleaning, data analysis, spreadsheets, SQL, R programming, and Tableau dashboards for entry-level data analyst roles.",
    },
    {
        "category": "Data",
        "title": "The Complete SQL Bootcamp: Go from Zero to Hero",
        "provider": "Udemy · Jose Portilla",
        "level": "Beginner",
        "duration": "9 hours",
        "price": "$18.99",
        "rating": 4.7,
        "enrolled_count": 720000,
        "source_url": "https://www.udemy.com/course/the-complete-sql-bootcamp/",
        "description": "Learn how to query databases with PostgreSQL. Master SELECT, GROUP BY, JOINs, subqueries, view creation, and business reporting.",
    },
    {
        "category": "Data",
        "title": "Applied Data Science with Python Specialization",
        "provider": "Coursera · University of Michigan",
        "level": "Intermediate",
        "duration": "4 months",
        "price": "Free to audit",
        "rating": 4.6,
        "enrolled_count": 590000,
        "source_url": "https://www.coursera.org/specializations/applied-data-science-with-python",
        "description": "Gain practical data science skills using Pandas, Matplotlib, Scikit-learn, and NLTK for statistical analysis and machine learning.",
    },
    {
        "category": "Data",
        "title": "Data Analytics Full Course: Excel, SQL, Tableau & Power BI",
        "provider": "YouTube · Alex The Analyst",
        "level": "Beginner",
        "duration": "6 hours",
        "price": "Free",
        "rating": 4.9,
        "enrolled_count": 850000,
        "source_url": "https://www.youtube.com/watch?v=rGx1QNdYzvs",
        "description": "End-to-end data analyst portfolio bootcamp covering data cleaning in Excel, relational queries in SQL, and visualization in Power BI.",
    },

    # AI & Machine Learning
    {
        "category": "Development",
        "title": "Machine Learning Specialization",
        "provider": "Coursera · DeepLearning.AI & Stanford",
        "level": "Beginner",
        "duration": "3 months",
        "price": "Free to audit",
        "rating": 4.9,
        "enrolled_count": 920000,
        "source_url": "https://www.coursera.org/specializations/machine-learning-introduction",
        "description": "Taught by AI pioneer Andrew Ng. Master foundational machine learning algorithms: linear regression, logistic regression, neural networks, and decision trees.",
    },
    {
        "category": "Development",
        "title": "Generative AI with Large Language Models (LLMs)",
        "provider": "Coursera · DeepLearning.AI & AWS",
        "level": "Intermediate",
        "duration": "3 weeks",
        "price": "Free to audit",
        "rating": 4.8,
        "enrolled_count": 340000,
        "source_url": "https://www.coursera.org/learn/generative-ai-with-llms",
        "description": "Learn the key steps of LLM application development: model selection, prompt engineering, fine-tuning, RLHF, and LangChain orchestration.",
    },

    # Design - UX/UI & Figma
    {
        "category": "Design",
        "title": "Google UX Design Professional Certificate",
        "provider": "Coursera · Google",
        "level": "Beginner",
        "duration": "6 months",
        "price": "Free to audit",
        "rating": 4.8,
        "enrolled_count": 910000,
        "source_url": "https://www.coursera.org/professional-certificates/google-ux-design",
        "description": "Learn the foundational UX design process: empathize with users, define problem statements, ideate solutions, create wireframes and high-fidelity prototypes in Figma.",
    },
    {
        "category": "Design",
        "title": "Figma UI UX Design Essentials",
        "provider": "Udemy · Daniel Walter Scott",
        "level": "Beginner",
        "duration": "12 hours",
        "price": "$17.99",
        "rating": 4.8,
        "enrolled_count": 280000,
        "source_url": "https://www.udemy.com/course/figma-ux-ui-design-user-experience-tutorial-course/",
        "description": "Learn how to use Figma for web and mobile design: auto-layout, design systems, variants, micro-interactions, and design-to-code handoff.",
    },
    {
        "category": "Design",
        "title": "Product Design: From Idea to Interface",
        "provider": "Design School",
        "level": "Beginner",
        "duration": "6 weeks",
        "price": "Free",
        "rating": 4.7,
        "enrolled_count": 140000,
        "source_url": "https://www.coursera.org/",
        "description": "A step-by-step introduction to product strategy, user journey mapping, design heuristics, and rapid interactive prototyping.",
    },

    # Career & Soft skills
    {
        "category": "Career",
        "title": "Mastering the Tech & Coding Interview",
        "provider": "edX · UC San Diego",
        "level": "Intermediate",
        "duration": "5 weeks",
        "price": "Free",
        "rating": 4.8,
        "enrolled_count": 390000,
        "source_url": "https://www.edx.org/",
        "description": "Comprehensive technical interview preparation: Big-O analysis, binary search, trees, dynamic programming, system architecture, and behavioral STAR stories.",
    },
    {
        "category": "Career",
        "title": "Build a Tech Portfolio and Resume That Gets Noticed",
        "provider": "Coursera · Career Academy",
        "level": "Beginner",
        "duration": "2 weeks",
        "price": "Free",
        "rating": 4.7,
        "enrolled_count": 210000,
        "source_url": "https://www.coursera.org/",
        "description": "Learn how to craft an ATS-compliant tech CV, showcase meaningful open-source GitHub projects, and highlight measurable impact.",
    },
    {
        "category": "Soft skills",
        "title": "Successful Negotiation & Workplace Communication",
        "provider": "Coursera · University of Michigan",
        "level": "All levels",
        "duration": "4 weeks",
        "price": "Free to audit",
        "rating": 4.8,
        "enrolled_count": 1150000,
        "source_url": "https://www.coursera.org/learn/negotiation-skills",
        "description": "Master essential negotiation and persuasion strategies: planning, building rapport, value creation, handling objections, and closing agreements.",
    },
    {
        "category": "Soft skills",
        "title": "Communicate with Confidence at Work",
        "provider": "Open Learning",
        "level": "All levels",
        "duration": "3 weeks",
        "price": "$12",
        "rating": 4.6,
        "enrolled_count": 95000,
        "source_url": "https://www.coursera.org/",
        "description": "Practical workplace communication: presenting technical ideas to non-technical stakeholders, giving effective feedback, and active listening.",
    },
]


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Ensure tables exist in dev/fallback mode
    Base.metadata.create_all(engine)
    with SessionLocal() as db:
        course_count = db.scalar(select(func.count(Course.id))) or 0
        if course_count < 10:
            categories: dict[str, CourseCategory] = {}
            for item in SAMPLE_COURSES:
                cat_name = item["category"]
                if cat_name not in categories:
                    existing_cat = db.scalar(select(CourseCategory).where(CourseCategory.name == cat_name))
                    if not existing_cat:
                        existing_cat = CourseCategory(name=cat_name)
                        db.add(existing_cat)
                        db.flush()
                    categories[cat_name] = existing_cat

            for item in SAMPLE_COURSES:
                existing = db.scalar(
                    select(Course).where(Course.title == item["title"])
                )
                if existing:
                    existing.source_url = item["source_url"]
                    existing.rating = item["rating"]
                    existing.enrolled_count = item["enrolled_count"]
                    existing.description = item["description"]
                    existing.price = item["price"]
                    existing.duration = item["duration"]
                    existing.level = item["level"]
                else:
                    db.add(
                        Course(
                            title=item["title"],
                            provider=item["provider"],
                            category_id=categories[item["category"]].id,
                            level=item["level"],
                            duration=item["duration"],
                            price=item["price"],
                            description=item["description"],
                            source_url=item["source_url"],
                            rating=item["rating"],
                            enrolled_count=item["enrolled_count"],
                        )
                    )
            db.commit()
    yield


app = FastAPI(
    title="CareerPilot API",
    version="1.0.0",
    description="AI-Powered Career Development Platform API",
    lifespan=lifespan,
)

cors_origins = [o.strip() for o in settings.CORS_ORIGINS.split(",") if o.strip()]
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins or ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/health")
def health():
    return {
        "status": "ok",
        "environment": settings.ENVIRONMENT,
        "phase": 1,
        "database": settings.DATABASE_URL.split(":")[0],
    }
