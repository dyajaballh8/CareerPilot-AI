"""AI Job Matching Engine & Missing Skills Course Recommender."""
from __future__ import annotations

import json
from typing import Any
from sqlalchemy import or_, select
from sqlalchemy.orm import Session

from app.models.course import Course
from app.models.job import Job
from app.models.resume import Resume
from app.schemas.job import JobMatchDetail, JobOut, RecommendedCourseSummary
from app.services.ai.gemini_service import GeminiService


class JobMatchingEngine:
    def __init__(self, db: Session, gemini: GeminiService | None = None):
        self.db = db
        self.gemini = gemini or GeminiService()

    def get_candidate_skills(self, resume: Resume) -> list[str]:
        skills: set[str] = set()
        # 1. From resume.skills relation
        if resume.skills:
            for rs in resume.skills:
                if rs.skill and rs.skill.name:
                    skills.add(rs.skill.name.strip())

        # 2. From parsed_json
        if resume.parsed_json:
            try:
                data = json.loads(resume.parsed_json)
                for s in data.get("skills", []):
                    if isinstance(s, str) and s.strip():
                        skills.add(s.strip())
            except Exception:
                pass

        # 3. Fallback extraction from text if empty
        if not skills and resume.extracted_text:
            parsed = self.gemini.analyze_resume(resume.extracted_text)
            for s in parsed.get("skills", []):
                skills.add(s)

        return sorted(list(skills))

    def evaluate_match(self, resume: Resume, job: Job) -> dict[str, Any]:
        """Calculates match score, breakdown, matching skills, and missing skills."""
        candidate_skills = self.get_candidate_skills(resume)
        cand_skills_lower = {s.lower(): s for s in candidate_skills}

        job_skills = [js.skill.name for js in job.required_skills if js.skill and js.skill.name]
        job_skills_lower = {s.lower(): s for s in job_skills}

        # 1. Matching & Missing Skills
        matching_skills: list[str] = []
        missing_skills: list[str] = []

        for j_lower, j_orig in job_skills_lower.items():
            if j_lower in cand_skills_lower:
                matching_skills.append(cand_skills_lower[j_lower])
            else:
                missing_skills.append(j_orig)

        # 2. Skills Match Score (40% weight)
        if job_skills:
            skill_ratio = len(matching_skills) / len(job_skills)
            skill_score = int(skill_ratio * 100)
        else:
            skill_score = 75

        # 3. Experience & Level Alignment (25% weight)
        exp_score = 85
        job_level = (job.experience_level or "").lower()
        if "intern" in job_level or "internship" in (job.employment_type or "").lower():
            exp_score = 95
        elif "entry" in job_level:
            exp_score = 90
        elif "mid" in job_level or "senior" in job_level:
            exp_score = 65

        # 4. Semantic / Domain Alignment (20% weight)
        sem_score = 70
        title_words = set(job.title.lower().split())
        cand_text_lower = (resume.extracted_text or "").lower()
        shared_words = [w for w in title_words if len(w) > 3 and w in cand_text_lower]
        if shared_words:
            sem_score = min(100, 70 + len(shared_words) * 8)

        # 5. Education & Eligibility (15% weight)
        edu_score = 90

        # Weighted total
        total_score = int(
            (skill_score * 0.40)
            + (exp_score * 0.25)
            + (sem_score * 0.20)
            + (edu_score * 0.15)
        )
        total_score = max(10, min(99, total_score))

        return {
            "match_score": total_score,
            "score_breakdown": {
                "skills": skill_score,
                "experience": exp_score,
                "semantic": sem_score,
                "education": edu_score,
            },
            "matching_skills": matching_skills,
            "missing_skills": missing_skills,
        }

    def recommend_courses_for_missing_skills(self, missing_skills: list[str], limit: int = 4) -> list[RecommendedCourseSummary]:
        """Finds top courses in the catalog that directly teach the candidate's missing skills."""
        if not missing_skills:
            return []

        recommended: list[RecommendedCourseSummary] = []
        seen_course_ids: set[int] = set()

        for skill in missing_skills:
            if len(recommended) >= limit:
                break
            # Look for courses where title or description mentions this skill
            skill_term = f"%{skill}%"
            courses = self.db.execute(
                select(Course).where(
                    or_(
                        Course.title.ilike(skill_term),
                        Course.description.ilike(skill_term),
                    )
                ).limit(2)
            ).scalars().all()

            for c in courses:
                if c.id not in seen_course_ids:
                    seen_course_ids.add(c.id)
                    cat_name = c.category.name if c.category else "Technology"
                    recommended.append(
                        RecommendedCourseSummary(
                            id=c.id,
                            title=c.title,
                            provider=c.provider,
                            category=cat_name,
                            level=c.level,
                            price=c.price,
                            rating=c.rating,
                            source_url=c.source_url,
                            target_skill=skill,
                        )
                    )
                    if len(recommended) >= limit:
                        break

        # Fallback to top rated courses if none directly matched the query
        if not recommended:
            top_courses = self.db.execute(
                select(Course).order_by(Course.rating.desc().nullslast()).limit(3)
            ).scalars().all()
            for c in top_courses:
                cat_name = c.category.name if c.category else "Technology"
                recommended.append(
                    RecommendedCourseSummary(
                        id=c.id,
                        title=c.title,
                        provider=c.provider,
                        category=cat_name,
                        level=c.level,
                        price=c.price,
                        rating=c.rating,
                        source_url=c.source_url,
                        target_skill="Foundational Tech",
                    )
                )

        return recommended

    def build_job_match_detail(self, resume: Resume, job: Job, job_out: JobOut) -> JobMatchDetail:
        """Assembles comprehensive match report with AI explanation and course recommendations."""
        eval_result = self.evaluate_match(resume, job)
        matching_skills = eval_result["matching_skills"]
        missing_skills = eval_result["missing_skills"]
        match_score = eval_result["match_score"]
        score_breakdown = eval_result["score_breakdown"]

        # Parse resume data for AI explanation
        resume_data = {}
        if resume.parsed_json:
            try:
                resume_data = json.loads(resume.parsed_json)
            except Exception:
                pass

        job_data = {
            "title": job.title,
            "company": job.company,
            "description": job.description,
        }

        ai_analysis = self.gemini.explain_job_match(
            resume_data=resume_data,
            job_data=job_data,
            matching_skills=matching_skills,
            missing_skills=missing_skills,
            match_score=match_score,
        )

        recommended_courses = self.recommend_courses_for_missing_skills(missing_skills)

        # Update job_out with match information
        job_out.match_score = match_score
        job_out.matching_skills = matching_skills
        job_out.missing_skills = missing_skills

        return JobMatchDetail(
            job=job_out,
            match_score=match_score,
            score_breakdown=score_breakdown,
            explanation=ai_analysis.get("explanation", ""),
            strengths=ai_analysis.get("strengths", []),
            matching_skills=matching_skills,
            missing_skills=missing_skills,
            recommended_courses=recommended_courses,
        )
