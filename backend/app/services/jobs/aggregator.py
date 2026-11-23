"""Job Aggregator Service: aggregates jobs from Greenhouse, Lever, Adzuna,
and maintains curated high-quality technology jobs and internships.
"""
from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Any
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.job import Job, JobSkill, JobSource
from app.models.skill import Skill
from app.services.jobs.connectors.adzuna import AdzunaConnector
from app.services.jobs.connectors.greenhouse import GreenhouseConnector
from app.services.jobs.connectors.lever import LeverConnector

logger = logging.getLogger(__name__)

CURATED_TECH_JOBS = [
    {
        "title": "Software Engineering Intern (Summer 2026)",
        "company": "Stripe",
        "location": "San Francisco, CA / Remote",
        "description": "Join the engineering team building the economic infrastructure for the internet. You will design, develop, and deploy scalable APIs and distributed systems in Python, Go, and React. Work alongside senior mentors to build resilient financial services with automated testing and continuous integration.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 50.0,
        "salary_max": 65.0,
        "salary_currency": "USD/hr",
        "source_name": "Greenhouse",
        "source_url": "https://stripe.com/jobs/search?gh_jid=8130805",
        "external_id": "seed_stripe_swe_intern",
        "is_remote": True,
        "skills": ["Python", "Algorithms", "Git", "REST API", "SQL", "Unit Testing"],
    },
    {
        "title": "Frontend Engineer Intern",
        "company": "Figma",
        "location": "New York, NY / Remote",
        "description": "Help craft collaborative design tools loved by millions. As a Frontend Intern, you will develop responsive web interfaces using modern TypeScript, React, HTML5, and CSS3. You will optimize UI rendering performance and collaborate closely with product designers.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 48.0,
        "salary_max": 60.0,
        "salary_currency": "USD/hr",
        "source_name": "Greenhouse",
        "source_url": "https://figma.com/careers",
        "external_id": "seed_figma_fe_intern",
        "is_remote": True,
        "skills": ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Git"],
    },
    {
        "title": "AI & Machine Learning Research Intern",
        "company": "Anthropic",
        "location": "San Francisco, CA",
        "description": "Collaborate on frontier AI research and alignment techniques. We are seeking an ML Intern proficient in Python, PyTorch, and deep learning algorithms. You will run distributed training experiments, evaluate LLM capabilities, and analyze large datasets with Pandas and NumPy.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 55.0,
        "salary_max": 70.0,
        "salary_currency": "USD/hr",
        "source_name": "Lever",
        "source_url": "https://anthropic.com/careers",
        "external_id": "seed_anthropic_ml_intern",
        "is_remote": False,
        "skills": ["Python", "PyTorch", "Machine Learning", "Deep Learning", "Pandas", "NumPy"],
    },
    {
        "title": "Junior Backend Developer (Python / FastAPI)",
        "company": "Vercel",
        "location": "Remote",
        "description": "Build high-throughput developer platform services. You will design RESTful APIs and asynchronous microservices using Python, FastAPI, PostgreSQL, and Redis. Containerize microservices with Docker and deploy to AWS cloud environments.",
        "employment_type": "Full-time",
        "experience_level": "Entry Level",
        "salary_min": 95000.0,
        "salary_max": 125000.0,
        "salary_currency": "USD",
        "source_name": "Company Careers",
        "source_url": "https://job-boards.greenhouse.io/vercel/jobs/6137958004",
        "external_id": "seed_vercel_be_dev",
        "is_remote": True,
        "skills": ["Python", "FastAPI", "PostgreSQL", "Docker", "Redis", "Git", "REST API"],
    },
    {
        "title": "Data Analyst / BI Intern",
        "company": "Spotify",
        "location": "Boston, MA / Remote",
        "description": "Turn data into meaningful listener experiences. As a Data Analyst Intern, you will query large datasets with PostgreSQL, develop dashboards, conduct exploratory data analysis with Python (Pandas, Matplotlib), and present actionable metrics to product leads.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 42.0,
        "salary_max": 52.0,
        "salary_currency": "USD/hr",
        "source_name": "Lever",
        "source_url": "https://jobs.lever.co/spotify/b4f6cd01-1d5d-41a9-b287-6d10416da03c",
        "external_id": "seed_spotify_data_intern",
        "is_remote": True,
        "skills": ["SQL", "PostgreSQL", "Python", "Data Analysis", "Pandas", "Data Visualization"],
    },
    {
        "title": "Cloud & DevOps Associate Intern",
        "company": "Cloudflare",
        "location": "Austin, TX / Remote",
        "description": "Help make the Internet safer and faster. Work on CI/CD automation pipelines, Linux systems orchestration, Docker container management, and cloud infrastructure monitoring. Collaborate with site reliability engineering teams.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 45.0,
        "salary_max": 58.0,
        "salary_currency": "USD/hr",
        "source_name": "Greenhouse",
        "source_url": "https://boards.greenhouse.io/cloudflare/jobs/8245197?gh_jid=8245197",
        "external_id": "seed_cloudflare_devops",
        "is_remote": True,
        "skills": ["Linux", "Docker", "Git", "CI/CD", "AWS", "Python"],
    },
    {
        "title": "Full Stack Web Developer (Graduate / Junior)",
        "company": "Shopify",
        "location": "Toronto, Canada / Remote",
        "description": "Join our merchant solutions engineering team. You will build end-to-end commerce features using React, Node.js / Python, GraphQL, and modern relational databases. Write clean code with automated unit tests and participate in agile sprints.",
        "employment_type": "Full-time",
        "experience_level": "Entry Level",
        "salary_min": 90000.0,
        "salary_max": 115000.0,
        "salary_currency": "USD",
        "source_name": "Company Careers",
        "source_url": "https://shopify.com/careers",
        "external_id": "seed_shopify_fullstack",
        "is_remote": True,
        "skills": ["React", "JavaScript", "Node.js", "Python", "SQL", "Git", "REST API"],
    },
    {
        "title": "Cybersecurity & Information Security Intern",
        "company": "GitLab",
        "location": "Remote",
        "description": "Protect developer software supply chains. You will assist our security operations center in vulnerability scanning, investigating security alerts, reviewing web application security, and documenting secure coding best practices.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 40.0,
        "salary_max": 50.0,
        "salary_currency": "USD/hr",
        "source_name": "Greenhouse",
        "source_url": "https://job-boards.greenhouse.io/gitlab/jobs/8704363002",
        "external_id": "seed_gitlab_sec_intern",
        "is_remote": True,
        "skills": ["Linux", "Python", "Git", "System Design", "Agile"],
    },
    {
        "title": "Mobile Application Developer Intern (React Native)",
        "company": "Airbnb",
        "location": "San Francisco, CA / Remote",
        "description": "Build mobile travel experiences used across the globe. You will work on cross-platform mobile components using React Native, TypeScript, and state management. Ensure pixel-perfect UI designs and smooth native animations.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 50.0,
        "salary_max": 62.0,
        "salary_currency": "USD/hr",
        "source_name": "Greenhouse",
        "source_url": "https://careers.airbnb.com/positions/",
        "external_id": "seed_airbnb_mobile_intern",
        "is_remote": True,
        "skills": ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "Git"],
    },
    {
        "title": "Machine Learning Engineer (Computer Vision & NLP)",
        "company": "Canva",
        "location": "Remote",
        "description": "Develop intelligent design recommendations, generative image tools, and automated text analysis features. Utilize PyTorch, TensorFlow, Scikit-Learn, and Python to train, validate, and deploy ML models into production.",
        "employment_type": "Full-time",
        "experience_level": "Entry Level",
        "salary_min": 100000.0,
        "salary_max": 130000.0,
        "salary_currency": "USD",
        "source_name": "Lever",
        "source_url": "https://www.lifeatcanva.com/en/jobs/",
        "external_id": "seed_canva_ml_engineer",
        "is_remote": True,
        "skills": ["Python", "Machine Learning", "PyTorch", "Computer Vision", "Scikit-Learn", "Git"],
    },
    # Top Tier Big Tech Additions (Google, Microsoft, NVIDIA, OpenAI, Amazon, Meta, Apple)
    {
        "title": "Software Engineering Intern (Summer 2026)",
        "company": "Google",
        "location": "Mountain View, CA / Remote",
        "description": "Work on Google's core products used by billions of people worldwide. As a Google Software Engineering Intern, you will write scalable, high-performance code in Python, C++, or Go. You will collaborate with engineering mentors to solve complex algorithmic problems and deploy production microservices.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 58.0,
        "salary_max": 75.0,
        "salary_currency": "USD/hr",
        "source_name": "Company Careers",
        "source_url": "https://www.google.com/about/careers/applications/jobs/results/?q=Software%20Engineer%20Intern",
        "external_id": "seed_google_swe_intern",
        "is_remote": True,
        "skills": ["Python", "C++", "Algorithms", "Data Structures", "System Design", "Git"],
    },
    {
        "title": "Cloud & Data Solutions Associate",
        "company": "Google Cloud",
        "location": "New York, NY / Remote",
        "description": "Design and build data processing pipelines and modern cloud infrastructure on GCP. You will develop backend services with Python, SQL, and Docker, orchestrate workflows with Kubernetes, and leverage BigQuery for high-throughput enterprise analytics.",
        "employment_type": "Full-time",
        "experience_level": "Entry Level",
        "salary_min": 110000.0,
        "salary_max": 140000.0,
        "salary_currency": "USD",
        "source_name": "Company Careers",
        "source_url": "https://www.google.com/about/careers/applications/jobs/results/?q=Software%20Engineer%20Intern?q=Cloud",
        "external_id": "seed_google_cloud_associate",
        "is_remote": True,
        "skills": ["GCP", "Python", "SQL", "Docker", "Kubernetes", "PostgreSQL"],
    },
    {
        "title": "Software Development Engineer Intern",
        "company": "Microsoft",
        "location": "Redmond, WA / Remote",
        "description": "Join Microsoft's student engineering program. You will build cloud-native applications across Azure, Microsoft 365, or Developer Tools using TypeScript, React, Python, or C#. Participate in agile sprint cycles, code reviews, and ship features that empower organizations worldwide.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 52.0,
        "salary_max": 68.0,
        "salary_currency": "USD/hr",
        "source_name": "Company Careers",
        "source_url": "https://jobs.careers.microsoft.com/global/en/search?q=Software%20Engineering%20Intern",
        "external_id": "seed_microsoft_sde_intern",
        "is_remote": True,
        "skills": ["C#", "TypeScript", "React", "Azure", "Git", "REST API"],
    },
    {
        "title": "AI & Data Science Intern",
        "company": "Microsoft Azure",
        "location": "Seattle, WA / Remote",
        "description": "Develop and fine-tune machine learning models on Azure AI infrastructure. Work with PyTorch, Scikit-Learn, and Python to train predictive models, evaluate generative AI pipelines, and build intelligent agent services.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 54.0,
        "salary_max": 72.0,
        "salary_currency": "USD/hr",
        "source_name": "Company Careers",
        "source_url": "https://jobs.careers.microsoft.com/global/en/search?q=Software%20Engineering%20Intern",
        "external_id": "seed_microsoft_ai_intern",
        "is_remote": True,
        "skills": ["Python", "Machine Learning", "PyTorch", "Azure", "Pandas", "Scikit-Learn"],
    },
    {
        "title": "Deep Learning & GPU Computing Intern",
        "company": "NVIDIA",
        "location": "Santa Clara, CA / Remote",
        "description": "Push the boundaries of AI acceleration on NVIDIA Hopper and Blackwell architectures. You will develop GPU-optimized neural network operators using Python, PyTorch, C++, and CUDA. Collaborate with world-renowned AI researchers on generative AI and LLM inference performance.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 56.0,
        "salary_max": 74.0,
        "salary_currency": "USD/hr",
        "source_name": "Greenhouse",
        "source_url": "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite?q=Software+Intern",
        "external_id": "seed_nvidia_dl_intern",
        "is_remote": True,
        "skills": ["Python", "PyTorch", "C++", "Deep Learning", "Machine Learning", "Linux"],
    },
    {
        "title": "AI System Software Engineer (Graduate)",
        "company": "NVIDIA",
        "location": "Austin, TX / Remote",
        "description": "Engineer foundational system software for accelerated computing. You will write high-throughput C++ and Python code for TensorRT and NeMo AI platforms. Profile latency bottlenecks on Linux kernels and optimize distributed cluster communication.",
        "employment_type": "Full-time",
        "experience_level": "Entry Level",
        "salary_min": 120000.0,
        "salary_max": 155000.0,
        "salary_currency": "USD",
        "source_name": "Greenhouse",
        "source_url": "https://nvidia.wd5.myworkdayjobs.com/NVIDIAExternalCareerSite?q=Software+Intern",
        "external_id": "seed_nvidia_sys_engineer",
        "is_remote": True,
        "skills": ["Python", "C++", "Linux", "Deep Learning", "Algorithms", "Git"],
    },
    {
        "title": "Software Engineering Intern (Developer Platform & APIs)",
        "company": "OpenAI",
        "location": "San Francisco, CA / Remote",
        "description": "Build the developer platform powering next-generation artificial intelligence applications. You will create reliable, low-latency API services using Python, FastAPI, TypeScript, and Docker. Help scale infrastructure supporting hundreds of millions of daily queries.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 60.0,
        "salary_max": 80.0,
        "salary_currency": "USD/hr",
        "source_name": "Greenhouse",
        "source_url": "https://openai.com/careers/search/?s=engineer",
        "external_id": "seed_openai_swe_intern",
        "is_remote": True,
        "skills": ["Python", "FastAPI", "TypeScript", "Docker", "REST API", "Git"],
    },
    {
        "title": "Software Development Engineer Intern (AWS)",
        "company": "Amazon",
        "location": "Seattle, WA / Remote",
        "description": "Innovate on Amazon Web Services cloud infrastructure. You will write clean, well-tested code in Java, Python, or TypeScript, implement distributed cloud APIs, and deploy resilient systems using AWS Lambda, DynamoDB, and ECS.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 52.0,
        "salary_max": 66.0,
        "salary_currency": "USD/hr",
        "source_name": "Company Careers",
        "source_url": "https://www.amazon.jobs/en/search?base_query=Software+Development+Engineer+Intern",
        "external_id": "seed_amazon_aws_intern",
        "is_remote": True,
        "skills": ["Java", "Python", "AWS", "SQL", "Git", "System Design"],
    },
    {
        "title": "Product & Web Engineering Intern",
        "company": "Meta",
        "location": "Menlo Park, CA / Remote",
        "description": "Build interactive social experiences for Instagram, WhatsApp, and Facebook. You will develop highly responsive UI components using React, Modern JavaScript, GraphQL, and CSS3. Ensure excellent performance across web and mobile browsers.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 55.0,
        "salary_max": 72.0,
        "salary_currency": "USD/hr",
        "source_name": "Company Careers",
        "source_url": "https://www.metacareers.com/jobs/?q=Software%20Engineering%20Intern",
        "external_id": "seed_meta_web_intern",
        "is_remote": True,
        "skills": ["React", "JavaScript", "TypeScript", "GraphQL", "HTML5", "CSS3"],
    },
    {
        "title": "Core AI & Machine Learning Intern",
        "company": "Apple",
        "location": "Cupertino, CA / Remote",
        "description": "Integrate intelligent experiences seamlessly into Apple hardware and software. You will develop machine learning models in Python and PyTorch, optimize on-device inference latency, and collaborate across engineering teams on Siri and Apple Intelligence.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 56.0,
        "salary_max": 72.0,
        "salary_currency": "USD/hr",
        "source_name": "Company Careers",
        "source_url": "https://jobs.apple.com/en-us/search?search=Software%20Intern",
        "external_id": "seed_apple_ai_intern",
        "is_remote": True,
        "skills": ["Python", "PyTorch", "Machine Learning", "Algorithms", "Git"],
    },
    # Top Egyptian & Middle East Tech Companies (Instabug, Fawry, _VOIS, Careem, Paymob, Noon, Telda, Thndr, Swvl, Bosta)
    {
        "title": "Mobile Software Engineer Intern (Flutter / React Native)",
        "company": "Instabug",
        "location": "Cairo, Egypt / Remote",
        "description": "Join Egypt's flagship developer tooling company. You will work on real-time mobile SDKs used on billions of mobile devices across the world. Build and optimize SDK features with React Native, Flutter, and native mobile bridges, ensuring minimal footprint and rock-solid stability.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 14000.0,
        "salary_max": 20000.0,
        "salary_currency": "EGP/mo",
        "source_name": "Company Careers",
        "source_url": "https://www.instabug.com/careers#open-positions",
        "external_id": "seed_instabug_mobile_intern",
        "is_remote": True,
        "skills": ["Flutter", "React Native", "JavaScript", "TypeScript", "Git", "Mobile Development"],
    },
    {
        "title": "Junior Backend Engineer (Fintech & Core Payments)",
        "company": "Fawry",
        "location": "Cairo, Egypt",
        "description": "Engineer mission-critical digital banking and payment processing systems that power Egypt's financial sector. You will develop resilient microservices in Java, Spring Boot, and PostgreSQL, handle high-volume transactional workloads, and follow security standards.",
        "employment_type": "Full-time",
        "experience_level": "Entry Level",
        "salary_min": 18000.0,
        "salary_max": 26000.0,
        "salary_currency": "EGP/mo",
        "source_name": "Company Careers",
        "source_url": "https://fawry.com/careers/",
        "external_id": "seed_fawry_backend_engineer",
        "is_remote": False,
        "skills": ["Java", "Spring Boot", "PostgreSQL", "SQL", "Microservices", "REST API", "Docker"],
    },
    {
        "title": "Cloud Software Developer Intern",
        "company": "Vodafone (_VOIS)",
        "location": "Giza / Cairo, Egypt / Hybrid",
        "description": "Be part of Vodafone Intelligent Solutions (_VOIS) Egypt. You will participate in developing cloud-native enterprise services, CI/CD automation pipelines, and infrastructure deployment with Python, AWS, and Linux. Work in cross-functional agile squads with experienced mentors.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 12000.0,
        "salary_max": 18000.0,
        "salary_currency": "EGP/mo",
        "source_name": "Company Careers",
        "source_url": "https://jobs.vodafone.com/careers/search?query=intern",
        "external_id": "seed_vodafone_vois_intern",
        "is_remote": True,
        "skills": ["Python", "AWS", "Docker", "Linux", "CI/CD", "Git"],
    },
    {
        "title": "Backend Engineering Intern (Super App & Dispatch)",
        "company": "Careem",
        "location": "Dubai, UAE / Cairo, Egypt / Remote",
        "description": "Build high-throughput backend services for Careem's super app serving millions of customers across the Middle East. You will develop asynchronous services in Python and Go, design relational database schemas, and optimize real-time ride and delivery matching algorithms.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 5000.0,
        "salary_max": 7500.0,
        "salary_currency": "AED/mo",
        "source_name": "Greenhouse",
        "source_url": "https://www.careem.com/careers",
        "external_id": "seed_careem_swe_intern",
        "is_remote": True,
        "skills": ["Python", "Algorithms", "PostgreSQL", "REST API", "Docker", "Git"],
    },
    {
        "title": "Full Stack Developer (Graduate / Junior)",
        "company": "Paymob",
        "location": "Cairo, Egypt / Remote",
        "description": "Empower millions of merchants across Egypt, Saudi Arabia, and the Gulf with modern payment gateways. You will build merchant dashboard features using React, TypeScript, Python (Django/FastAPI), and PostgreSQL. Write automated tests and build scalable fintech APIs.",
        "employment_type": "Full-time",
        "experience_level": "Entry Level",
        "salary_min": 20000.0,
        "salary_max": 30000.0,
        "salary_currency": "EGP/mo",
        "source_name": "Company Careers",
        "source_url": "https://paymob.com/en/careers#jobs",
        "external_id": "seed_paymob_fullstack",
        "is_remote": True,
        "skills": ["Python", "FastAPI", "React", "TypeScript", "PostgreSQL", "Git", "REST API"],
    },
    {
        "title": "Software Engineering Intern (E-commerce Systems)",
        "company": "Noon",
        "location": "Riyadh, Saudi Arabia / Cairo, Egypt / Remote",
        "description": "Work on the Middle East's premier digital marketplace. You will design, develop, and benchmark high-scale microservices using Python, Go, and React. Work with distributed databases, caching with Redis, and containerized deployments.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 4500.0,
        "salary_max": 6500.0,
        "salary_currency": "SAR/mo",
        "source_name": "Company Careers",
        "source_url": "https://careers.noon.com/jobs",
        "external_id": "seed_noon_swe_intern",
        "is_remote": True,
        "skills": ["Python", "React", "Redis", "SQL", "Docker", "Git"],
    },
    {
        "title": "Junior Mobile & Frontend Developer",
        "company": "Telda",
        "location": "Cairo, Egypt / Remote",
        "description": "Craft slick, fluid financial applications at Egypt's fastest growing consumer digital banking app. You will implement pixel-perfect user interfaces, fluid animations, and robust client state management using React Native, TypeScript, and modern design systems.",
        "employment_type": "Full-time",
        "experience_level": "Entry Level",
        "salary_min": 22000.0,
        "salary_max": 32000.0,
        "salary_currency": "EGP/mo",
        "source_name": "Company Careers",
        "source_url": "https://www.linkedin.com/company/telda/jobs/",
        "external_id": "seed_telda_fe_developer",
        "is_remote": True,
        "skills": ["React", "React Native", "TypeScript", "JavaScript", "CSS3", "Git"],
    },
    {
        "title": "Data & Backend Engineering Intern",
        "company": "Thndr",
        "location": "Cairo, Egypt / Remote",
        "description": "Democratize investment and stock trading in Egypt and MENA. You will assist in building financial data pipelines, calculating portfolio analytics, and developing backend endpoints in Python, FastAPI, and PostgreSQL with high security safeguards.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 14000.0,
        "salary_max": 20000.0,
        "salary_currency": "EGP/mo",
        "source_name": "Company Careers",
        "source_url": "https://thndr.app/careers",
        "external_id": "seed_thndr_data_intern",
        "is_remote": True,
        "skills": ["Python", "FastAPI", "PostgreSQL", "SQL", "Pandas", "Data Analysis", "Git"],
    },
    {
        "title": "Algorithms & Backend Intern (Transit Intelligence)",
        "company": "Swvl",
        "location": "Cairo, Egypt / Dubai, UAE / Remote",
        "description": "Solve challenging dispatch and routing optimization problems for daily urban commuters. Work with Python, geospatial algorithms, relational databases, and caching layers to improve transit efficiency and vehicle scheduling.",
        "employment_type": "Internship",
        "experience_level": "Internship",
        "salary_min": 13000.0,
        "salary_max": 19000.0,
        "salary_currency": "EGP/mo",
        "source_name": "Company Careers",
        "source_url": "https://www.linkedin.com/company/swvl/jobs/",
        "external_id": "seed_swvl_algo_intern",
        "is_remote": True,
        "skills": ["Python", "Algorithms", "PostgreSQL", "Docker", "Git"],
    },
    {
        "title": "Junior Backend Developer (Logistics Tech)",
        "company": "Bosta",
        "location": "Cairo, Egypt / Riyadh, Saudi Arabia / Remote",
        "description": "Power on-demand next-day delivery and package fulfillment across Egypt and Saudi Arabia. You will build and scale RESTful APIs using Node.js, Express, MongoDB, and Redis, integrating tracking webhooks and driver mobile apps.",
        "employment_type": "Full-time",
        "experience_level": "Entry Level",
        "salary_min": 18000.0,
        "salary_max": 28000.0,
        "salary_currency": "EGP/mo",
        "source_name": "Company Careers",
        "source_url": "https://www.linkedin.com/company/bosta-co/jobs/",
        "external_id": "seed_bosta_be_dev",
        "is_remote": True,
        "skills": ["Node.js", "Express", "MongoDB", "Redis", "JavaScript", "Docker", "Git"],
    },
]


class JobAggregatorService:
    def __init__(self, db: Session):
        self.db = db
        self.greenhouse = GreenhouseConnector()
        self.lever = LeverConnector()
        self.adzuna = AdzunaConnector()

    def get_or_create_source(self, name: str, base_url: str = "") -> JobSource:
        source = self.db.execute(select(JobSource).where(JobSource.name == name)).scalar_one_or_none()
        if not source:
            source = JobSource(name=name, base_url=base_url, is_active=True)
            self.db.add(source)
            self.db.flush()
        return source

    def get_or_create_skill(self, name: str) -> Skill:
        norm = name.strip()
        skill = self.db.execute(select(Skill).where(Skill.name.ilike(norm))).scalar_one_or_none()
        if not skill:
            skill = Skill(name=norm)
            self.db.add(skill)
            self.db.flush()
        return skill

    def sync_curated_seed_jobs(self) -> int:
        """Seed high-quality technology opportunities with verified skill requirements."""
        count = 0
        for data in CURATED_TECH_JOBS:
            ext_id = data["external_id"]
            existing = self.db.execute(select(Job).where(Job.external_id == ext_id)).scalar_one_or_none()
            if existing:
                continue

            source = self.get_or_create_source(data["source_name"], data["source_url"])
            job = Job(
                title=data["title"],
                company=data["company"],
                location=data["location"],
                description=data["description"],
                employment_type=data["employment_type"],
                experience_level=data["experience_level"],
                salary_min=data.get("salary_min"),
                salary_max=data.get("salary_max"),
                salary_currency=data.get("salary_currency"),
                source_id=source.id,
                source_url=data["source_url"],
                external_id=ext_id,
                is_remote=data.get("is_remote", False),
                posted_at=datetime.now(timezone.utc),
            )
            self.db.add(job)
            self.db.flush()

            # Attach required skills
            for sname in data.get("skills", []):
                sk = self.get_or_create_skill(sname)
                js = JobSkill(job_id=job.id, skill_id=sk.id, is_required=True)
                self.db.add(js)

            count += 1

        self.db.commit()
        return count

    async def sync_external_jobs(self) -> dict[str, int]:
        """Aggregate jobs from live APIs (Greenhouse, Lever, Adzuna)."""
        counts = {"greenhouse": 0, "lever": 0, "adzuna": 0}

        # 1. Greenhouse boards
        for board in ["stripe", "figma"]:
            gh_jobs = await self.greenhouse.fetch_jobs_for_board(board)
            for jdata in gh_jobs[:5]:  # Take top relevant jobs
                if self._upsert_raw_job(jdata):
                    counts["greenhouse"] += 1

        # 2. Lever companies
        for company in ["spotify", "canva"]:
            lv_jobs = await self.lever.fetch_jobs_for_company(company)
            for jdata in lv_jobs[:5]:
                if self._upsert_raw_job(jdata):
                    counts["lever"] += 1

        # 3. Adzuna (if configured)
        if self.adzuna.is_configured():
            ad_jobs = await self.adzuna.search_jobs("software engineering intern")
            for jdata in ad_jobs[:5]:
                if self._upsert_raw_job(jdata):
                    counts["adzuna"] += 1

        self.db.commit()
        return counts

    def _upsert_raw_job(self, data: dict[str, Any]) -> bool:
        ext_id = data.get("external_id")
        if not ext_id:
            return False
        existing = self.db.execute(select(Job).where(Job.external_id == ext_id)).scalar_one_or_none()
        if existing:
            return False

        source = self.get_or_create_source(data.get("source_name", "External"), data.get("source_url", ""))
        job = Job(
            title=data.get("title", ""),
            company=data.get("company", ""),
            location=data.get("location", ""),
            description=data.get("description", ""),
            employment_type=data.get("employment_type", "Full-time"),
            experience_level=data.get("experience_level", "Entry Level"),
            salary_min=data.get("salary_min"),
            salary_max=data.get("salary_max"),
            salary_currency=data.get("salary_currency", "USD"),
            source_id=source.id,
            source_url=data.get("source_url"),
            external_id=ext_id,
            is_remote=data.get("is_remote", False),
            posted_at=datetime.now(timezone.utc),
        )
        self.db.add(job)
        self.db.flush()

        # Heuristically extract skills from description
        from app.services.ai.gemini_service import COMMON_TECH_SKILLS
        desc_lower = f" {job.title.lower()} {job.description.lower()} "
        for sk_name in COMMON_TECH_SKILLS:
            if f" {sk_name.lower()} " in desc_lower or f",{sk_name.lower()}" in desc_lower:
                sk = self.get_or_create_skill(sk_name)
                js = JobSkill(job_id=job.id, skill_id=sk.id, is_required=True)
                self.db.add(js)

        return True
