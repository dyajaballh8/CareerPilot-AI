"""Adzuna Job API connector."""
from __future__ import annotations

import logging
import os
from typing import Any
import httpx

logger = logging.getLogger(__name__)


class AdzunaConnector:
    BASE_URL = "https://api.adzuna.com/v1/api/jobs/us/search/1"

    def __init__(
        self,
        app_id: str | None = None,
        app_key: str | None = None,
        timeout: float = 8.0,
    ):
        self.app_id = app_id or os.getenv("ADZUNA_APP_ID", "")
        self.app_key = app_key or os.getenv("ADZUNA_APP_KEY", "")
        self.timeout = timeout

    def is_configured(self) -> bool:
        return bool(self.app_id and self.app_key)

    async def search_jobs(self, query: str = "software intern") -> list[dict[str, Any]]:
        if not self.is_configured():
            return []

        params = {
            "app_id": self.app_id,
            "app_key": self.app_key,
            "what": query,
            "content-type": "application/json",
        }
        jobs: list[dict[str, Any]] = []
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                res = await client.get(self.BASE_URL, params=params)
                if res.status_code == 200:
                    data = res.json()
                    for rj in data.get("results", []):
                        title = rj.get("title", "")
                        employment_type = "Internship" if "intern" in title.lower() else "Full-time"
                        jobs.append({
                            "title": title,
                            "company": rj.get("company", {}).get("display_name", "Technology Co."),
                            "location": rj.get("location", {}).get("display_name", "United States"),
                            "description": rj.get("description", ""),
                            "employment_type": employment_type,
                            "experience_level": "Internship" if employment_type == "Internship" else "Entry Level",
                            "salary_min": rj.get("salary_min"),
                            "salary_max": rj.get("salary_max"),
                            "salary_currency": "USD",
                            "source_name": "Adzuna",
                            "source_url": rj.get("redirect_url"),
                            "external_id": f"adzuna_{rj.get('id')}",
                            "is_remote": "remote" in rj.get("title", "").lower() or "remote" in rj.get("description", "").lower(),
                        })
        except Exception as e:
            logger.info("Adzuna API call failed: %s", e)
        return jobs
