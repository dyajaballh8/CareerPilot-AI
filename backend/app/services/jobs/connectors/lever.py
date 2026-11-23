"""Lever Job Board API connector."""
from __future__ import annotations

import logging
from typing import Any
import httpx

logger = logging.getLogger(__name__)

DEFAULT_LEVER_COMPANIES = ["spotify", "palantir", "canva"]


class LeverConnector:
    BASE_URL = "https://api.lever.co/v0/postings"

    def __init__(self, companies: list[str] | None = None, timeout: float = 8.0):
        self.companies = companies or DEFAULT_LEVER_COMPANIES
        self.timeout = timeout

    async def fetch_jobs_for_company(self, company: str) -> list[dict[str, Any]]:
        url = f"{self.BASE_URL}/{company}?mode=json"
        jobs: list[dict[str, Any]] = []
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                res = await client.get(url)
                if res.status_code != 200:
                    logger.warning("Lever company %s returned status %d", company, res.status_code)
                    return []
                raw_jobs = res.json()
                for rj in raw_jobs:
                    title = rj.get("text", "")
                    title_lower = title.lower()
                    employment_type = "Full-time"
                    if "intern" in title_lower or "internship" in title_lower:
                        employment_type = "Internship"
                    elif "part-time" in title_lower:
                        employment_type = "Part-time"

                    cats = rj.get("categories", {})
                    location = cats.get("location", "Remote")
                    workplace_type = cats.get("workplaceType", "")
                    is_remote = "remote" in location.lower() or "remote" in workplace_type.lower()

                    jobs.append({
                        "title": title,
                        "company": company.capitalize(),
                        "location": location,
                        "description": rj.get("descriptionPlain", "") or f"Opportunity at {company.capitalize()}",
                        "employment_type": employment_type,
                        "experience_level": "Internship" if employment_type == "Internship" else "Entry Level",
                        "source_name": "Lever",
                        "source_url": rj.get("hostedUrl"),
                        "external_id": f"lever_{company}_{rj.get('id')}",
                        "is_remote": is_remote,
                    })
        except Exception as e:
            logger.info("Lever company %s fetch error (graceful fallback): %s", company, e)
        return jobs
