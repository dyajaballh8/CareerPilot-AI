"""Greenhouse Public Job Board API connector."""
from __future__ import annotations

import logging
import re
from typing import Any
import httpx

logger = logging.getLogger(__name__)

DEFAULT_GREENHOUSE_BOARDS = ["stripe", "figma", "cloudflare", "gitlab"]


class GreenhouseConnector:
    BASE_URL = "https://boards-api.greenhouse.io/v1/boards"

    def __init__(self, boards: list[str] | None = None, timeout: float = 8.0):
        self.boards = boards or DEFAULT_GREENHOUSE_BOARDS
        self.timeout = timeout

    async def fetch_jobs_for_board(self, board: str) -> list[dict[str, Any]]:
        url = f"{self.BASE_URL}/{board}/jobs?content=true"
        jobs: list[dict[str, Any]] = []
        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                res = await client.get(url)
                if res.status_code != 200:
                    logger.warning("Greenhouse board %s returned status %d", board, res.status_code)
                    return []
                data = res.json()
                raw_jobs = data.get("jobs", [])
                for rj in raw_jobs:
                    # Clean html in content
                    raw_content = rj.get("content", "")
                    clean_desc = re.sub(r"<[^>]+>", " ", raw_content).strip()
                    title = rj.get("title", "")
                    
                    # Detect internship / employment type
                    title_lower = title.lower()
                    employment_type = "Full-time"
                    if "intern" in title_lower or "internship" in title_lower:
                        employment_type = "Internship"
                    elif "part-time" in title_lower:
                        employment_type = "Part-time"
                    elif "contract" in title_lower:
                        employment_type = "Contract"

                    is_remote = False
                    loc = rj.get("location", {}).get("name", "Remote")
                    if "remote" in loc.lower() or "remote" in title_lower:
                        is_remote = True

                    jobs.append({
                        "title": title,
                        "company": board.capitalize(),
                        "location": loc,
                        "description": clean_desc or f"Role at {board.capitalize()}",
                        "employment_type": employment_type,
                        "experience_level": "Internship" if employment_type == "Internship" else "Entry Level",
                        "source_name": "Greenhouse",
                        "source_url": rj.get("absolute_url"),
                        "external_id": f"gh_{board}_{rj.get('id')}",
                        "is_remote": is_remote,
                    })
        except Exception as e:
            logger.info("Greenhouse board %s fetch error (graceful fallback): %s", board, e)
        return jobs
