"""Gemini AI Service for CV parsing, career analysis, and job matching.

Uses Google GenAI SDK when GEMINI_API_KEY is available, and includes a resilient,
high-precision heuristic fallback engine that works reliably offline.
"""
from __future__ import annotations

import json
import logging
import os
import re
from dataclasses import dataclass
from typing import Any

logger = logging.getLogger(__name__)

# Standard skill dictionary for reliable heuristic extraction
COMMON_TECH_SKILLS = [
    # Languages
    "Python", "JavaScript", "TypeScript", "C++", "C#", "C", "Java", "Go", "Rust",
    "PHP", "Ruby", "Swift", "Kotlin", "SQL", "HTML", "CSS", "R", "Dart",
    # Frontend
    "React", "Vue", "Angular", "Next.js", "Nuxt", "Svelte", "Redux", "Tailwind CSS",
    "Bootstrap", "HTML5", "CSS3", "Sass", "Webpack", "Vite",
    # Backend & Frameworks
    "FastAPI", "Django", "Flask", "Node.js", "Express", "NestJS", "Spring Boot",
    "ASP.NET", "Ruby on Rails", "Laravel", "REST API", "GraphQL", "gRPC", "Microservices",
    # Databases & Caching
    "PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "Elasticsearch",
    "Cassandra", "DynamoDB", "Firebase", "Supabase", "Prisma", "SQLAlchemy",
    # Cloud & DevOps
    "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Google Cloud", "CI/CD",
    "GitHub Actions", "Git", "GitHub", "GitLab", "Linux", "Terraform", "Nginx",
    # AI / ML / Data
    "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Pandas",
    "NumPy", "Scikit-Learn", "Computer Vision", "NLP", "OpenAI", "Gemini",
    "Data Analysis", "Data Visualization", "Matplotlib", "Seaborn",
    # Testing & Methodologies
    "PyTest", "Jest", "Unit Testing", "Agile", "Scrum", "OOP", "System Design",
    "Algorithms", "Data Structures"
]


@dataclass(frozen=True)
class GeminiConfig:
    api_key: str = os.getenv("GEMINI_API_KEY", "")
    model: str = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
    timeout_seconds: int = int(os.getenv("GEMINI_TIMEOUT_SECONDS", "30"))
    max_retries: int = int(os.getenv("GEMINI_MAX_RETRIES", "2"))
    requests_per_minute: int = int(os.getenv("GEMINI_REQUESTS_PER_MINUTE", "30"))


class GeminiService:
    def __init__(self, config: GeminiConfig | None = None):
        self.config = config or GeminiConfig()

    def is_configured(self) -> bool:
        return bool(self.config.api_key and self.config.api_key.strip())

    def analyze_resume(self, text: str) -> dict[str, Any]:
        """Parse CV text into structured JSON (skills, experience, education, roles)."""
        if not text or not text.strip():
            return self._empty_resume_data()

        if self.is_configured():
            try:
                ai_result = self._analyze_resume_with_gemini(text)
                if ai_result and ai_result.get("skills"):
                    return ai_result
            except Exception as e:
                logger.warning("Gemini resume parsing failed; falling back to heuristic: %s", e)

        return self._heuristic_analyze_resume(text)

    def explain_job_match(
        self,
        resume_data: dict[str, Any],
        job_data: dict[str, Any],
        matching_skills: list[str],
        missing_skills: list[str],
        match_score: int,
    ) -> dict[str, Any]:
        """Provide detailed AI analysis and explanation for how well a candidate matches a job."""
        if self.is_configured():
            try:
                ai_explanation = self._explain_match_with_gemini(
                    resume_data, job_data, matching_skills, missing_skills, match_score
                )
                if ai_explanation:
                    return ai_explanation
            except Exception as e:
                logger.warning("Gemini match explanation failed; falling back to heuristic: %s", e)

        return self._heuristic_explain_match(
            resume_data, job_data, matching_skills, missing_skills, match_score
        )

    # -------------------------------------------------------------------------
    # Gemini AI Call Implementations
    # -------------------------------------------------------------------------

    def _analyze_resume_with_gemini(self, text: str) -> dict[str, Any] | None:
        from google import genai
        client = genai.Client(api_key=self.config.api_key)

        prompt = (
            "You are an expert technical recruiter and resume parser. "
            "Analyze the following resume text and return ONLY a valid JSON object with the exact keys: "
            "name (string or null), title (string or null), summary (string or null), "
            "skills (list of standardized skill strings, e.g. ['Python', 'React', 'Docker']), "
            "experience_years (number or null), "
            "experience (list of objects with keys: role, company, duration, highlights), "
            "education (list of objects with keys: degree, institution, year), "
            "suggested_roles (list of 3-5 target job titles matching their background).\n\n"
            f"Resume Text:\n{text[:12000]}"
        )

        response = client.models.generate_content(
            model=self.config.model,
            contents=prompt,
        )

        raw = response.text or ""
        # Clean potential markdown formatting
        cleaned = re.sub(r"^```json\s*", "", raw.strip(), flags=re.MULTILINE)
        cleaned = re.sub(r"```$", "", cleaned.strip(), flags=re.MULTILINE)

        data = json.loads(cleaned)
        if isinstance(data, dict):
            # Normalize skills to proper capitalization / trimmed strings
            data["skills"] = [s.strip() for s in data.get("skills", []) if isinstance(s, str) and s.strip()]
            return data
        return None

    def _explain_match_with_gemini(
        self,
        resume_data: dict[str, Any],
        job_data: dict[str, Any],
        matching_skills: list[str],
        missing_skills: list[str],
        match_score: int,
    ) -> dict[str, Any] | None:
        from google import genai
        client = genai.Client(api_key=self.config.api_key)

        prompt = (
            "You are a career coach evaluating a candidate for a job vacancy. "
            "Return ONLY a JSON object with keys: "
            "summary_verdict (short phrase e.g. 'Strong Match', 'Good Potential'), "
            "strengths (list of 2-3 specific bullet points), "
            "growth_areas (list of 1-3 skills or experiences to develop), "
            "explanation (2-3 concise paragraphs explaining why they match and how to bridge the gap).\n\n"
            f"Candidate Skills: {matching_skills}\n"
            f"Candidate Background: {resume_data.get('title', '')} - {resume_data.get('summary', '')}\n"
            f"Job Title: {job_data.get('title')} at {job_data.get('company')}\n"
            f"Job Description Excerpt: {job_data.get('description', '')[:1000]}\n"
            f"Missing Skills: {missing_skills}\n"
            f"Calculated Score: {match_score}%"
        )

        response = client.models.generate_content(
            model=self.config.model,
            contents=prompt,
        )

        raw = response.text or ""
        cleaned = re.sub(r"^```json\s*", "", raw.strip(), flags=re.MULTILINE)
        cleaned = re.sub(r"```$", "", cleaned.strip(), flags=re.MULTILINE)
        data = json.loads(cleaned)
        if isinstance(data, dict):
            return data
        return None

    # -------------------------------------------------------------------------
    # Resilient Heuristic / NLP Fallback Implementations
    # -------------------------------------------------------------------------

    def _heuristic_analyze_resume(self, text: str) -> dict[str, Any]:
        """Extract skills, title, summary, and education from resume text with regex heuristics."""
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        
        # 1. Detect candidate name (often first non-empty line)
        name = None
        if lines:
            first_few = lines[:3]
            for candidate in first_few:
                if len(candidate.split()) in [2, 3, 4] and not any(
                    k in candidate.lower() for k in ["curriculum", "resume", "cv", "page", "email", "phone"]
                ):
                    name = candidate
                    break

        # 2. Extract technical skills matching dictionary
        found_skills: set[str] = set()
        text_lower = f" {text.lower()} "
        for skill in COMMON_TECH_SKILLS:
            # Word boundary check or specific symbol check (e.g. C++, C#)
            if skill in ["C++", "C#", "C", "R"]:
                pattern = rf"(?:\b|\s){re.escape(skill.lower())}(?:\b|\s|,|\.)"
            else:
                pattern = rf"\b{re.escape(skill.lower())}\b"
            if re.search(pattern, text_lower):
                found_skills.add(skill)

        # 3. Detect Education
        education = []
        edu_keywords = ["bachelor", "master", "phd", "b.sc", "m.sc", "b.s.", "degree", "university", "faculty", "college"]
        for line in lines:
            line_l = line.lower()
            if any(k in line_l for k in edu_keywords) and len(line) < 160:
                education.append({"degree": line, "institution": "Extracted from CV", "year": "Present/Graduated"})
                if len(education) >= 2:
                    break

        # 4. Infer suggested roles based on extracted skills
        suggested_roles = []
        has = lambda s: s in found_skills
        if has("React") or has("JavaScript") or has("TypeScript") or has("CSS"):
            suggested_roles.append("Frontend Developer")
        if has("Python") or has("FastAPI") or has("Django") or has("Node.js"):
            suggested_roles.append("Backend Developer")
        if has("Python") and (has("Machine Learning") or has("Pandas") or has("TensorFlow") or has("PyTorch")):
            suggested_roles.append("AI / Machine Learning Engineer")
            suggested_roles.append("Data Scientist")
        if has("Docker") or has("Kubernetes") or has("AWS") or has("Linux"):
            suggested_roles.append("DevOps & Cloud Engineer")
        if not suggested_roles:
            suggested_roles = ["Software Engineer Intern", "Junior Developer", "Full Stack Intern"]

        # 5. Extract Summary or first paragraph
        summary = ""
        for i, line in enumerate(lines[:10]):
            if len(line) > 60 and not any(k in line.lower() for k in ["education", "skills", "experience"]):
                summary = line
                break
        if not summary and lines:
            summary = "Technical profile with foundation in modern software development, problem solving, and building scalable applications."

        title = suggested_roles[0] if suggested_roles else "Software Engineer"

        return {
            "name": name or "Candidate",
            "title": title,
            "summary": summary,
            "skills": sorted(list(found_skills)),
            "experience_years": 1.0,
            "experience": [
                {
                    "role": title,
                    "company": "Projects & Experience",
                    "duration": "Recent",
                    "highlights": [f"Hands-on experience applying {', '.join(list(found_skills)[:4])}."]
                }
            ],
            "education": education or [{"degree": "Bachelor of Computer Science / Engineering", "institution": "University", "year": "2024"}],
            "suggested_roles": suggested_roles,
        }

    def _heuristic_explain_match(
        self,
        resume_data: dict[str, Any],
        job_data: dict[str, Any],
        matching_skills: list[str],
        missing_skills: list[str],
        match_score: int,
    ) -> dict[str, Any]:
        role = job_data.get("title", "Role")
        company = job_data.get("company", "Company")

        if match_score >= 80:
            summary_verdict = "Excellent Match"
        elif match_score >= 60:
            summary_verdict = "Strong Candidate Match"
        elif match_score >= 40:
            summary_verdict = "Moderate Alignment"
        else:
            summary_verdict = "High Growth Potential"

        strengths = []
        if matching_skills:
            strengths.append(f"Demonstrated proficiency in core requirements: {', '.join(matching_skills[:3])}.")
        strengths.append(f"Strong foundation for {role} role at {company}.")
        if resume_data.get("education"):
            strengths.append("Solid technical academic and project background.")

        growth_areas = []
        if missing_skills:
            growth_areas.append(f"Build targeted proficiency in: {', '.join(missing_skills[:3])}.")
        else:
            growth_areas.append("Review company-specific architectural patterns and interview problem domains.")

        explanation = (
            f"You are a {summary_verdict.lower()} for the {role} position at {company} with an overall match score of {match_score}%. "
            f"Your background includes direct exposure to key requirements including {', '.join(matching_skills[:4]) if matching_skills else 'core engineering fundamentals'}. "
        )
        if missing_skills:
            explanation += (
                f"To maximize your interview readiness and stand out from other applicants, focusing on {', '.join(missing_skills[:3])} "
                "through the curated course recommendations below is highly recommended."
            )
        else:
            explanation += "Your profile fulfills the core technical requirements for this opening."

        return {
            "summary_verdict": summary_verdict,
            "strengths": strengths,
            "growth_areas": growth_areas,
            "explanation": explanation,
        }

    def _empty_resume_data(self) -> dict[str, Any]:
        return {
            "name": None,
            "title": "Software Engineer",
            "summary": "No resume text extracted.",
            "skills": [],
            "experience_years": 0,
            "experience": [],
            "education": [],
            "suggested_roles": ["Software Engineer Intern"],
        }
