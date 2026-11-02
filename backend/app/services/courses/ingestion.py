from __future__ import annotations

import logging
from typing import Any

import httpx

from app.core.config import settings
from app.services.courses.connectors.coursera import fetch_coursera_courses
from app.services.courses.connectors.edx import fetch_edx_courses
from app.services.courses.connectors.mit_ocw import fetch_mit_ocw_courses
from app.services.courses.connectors.udemy import fetch_udemy_courses
from app.services.courses.connectors.youtube_edu import fetch_youtube_edu_courses
from app.services.courses.normalize import normalize_course

logger = logging.getLogger(__name__)


def _fetch_generic_source() -> list[dict[str, Any]]:
    """Fetch from the configurable generic JSON source."""
    if not settings.COURSE_SOURCE_URL:
        return []
    try:
        headers: dict[str, str] = {"Accept": "application/json"}
        if settings.COURSE_SOURCE_API_KEY:
            headers["Authorization"] = f"Bearer {settings.COURSE_SOURCE_API_KEY}"

        resp = httpx.get(
            settings.COURSE_SOURCE_URL, headers=headers, timeout=20
        )
        resp.raise_for_status()
        payload = resp.json()

        items: list[Any]
        if isinstance(payload, dict):
            items = payload.get("items", [])
            if not isinstance(items, list):
                items = []
        elif isinstance(payload, list):
            items = payload
        else:
            return []

        return [normalize_course(item) for item in items if isinstance(item, dict)]
    except Exception as exc:
        logger.warning("Generic course source error: %s", exc)
        return []


def fetch_external_courses() -> list[dict[str, Any]]:
    """Aggregate courses from all configured external sources."""
    courses: list[dict[str, Any]] = []

    courses.extend(_fetch_generic_source())
    courses.extend(fetch_coursera_courses())
    courses.extend(fetch_udemy_courses())
    courses.extend(fetch_edx_courses())
    courses.extend(fetch_mit_ocw_courses())
    courses.extend(fetch_youtube_edu_courses())

    logger.info("Total external courses fetched: %d", len(courses))
    return courses
