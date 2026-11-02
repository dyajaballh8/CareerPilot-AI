from __future__ import annotations

import logging
from typing import Any

import httpx

from app.core.config import settings
from app.services.courses.normalize import normalize_course

logger = logging.getLogger(__name__)


def fetch_mit_ocw_courses() -> list[dict[str, Any]]:
    """Fetch courses from MIT OpenCourseWare public JSON catalogue."""
    if not settings.MIT_OCW_CATALOG_URL:
        logger.debug("MIT OCW connector: catalog URL not configured, skipping")
        return []

    try:
        resp = httpx.get(
            settings.MIT_OCW_CATALOG_URL,
            headers={"Accept": "application/json"},
            timeout=30,
        )
        resp.raise_for_status()
        payload = resp.json()

        items: list[Any]
        if isinstance(payload, dict):
            items = payload.get("results", payload.get("items", []))
            if not isinstance(items, list):
                items = []
        elif isinstance(payload, list):
            items = payload
        else:
            items = []

        courses: list[dict[str, Any]] = []
        for item in items:
            if not isinstance(item, dict):
                continue
            course = normalize_course(item)
            course["provider"] = course["provider"] or "MIT OpenCourseWare"
            course["price"] = "Free"
            courses.append(course)

        logger.info("MIT OCW: fetched %d courses", len(courses))
        return courses

    except Exception as exc:
        logger.warning("MIT OCW connector error: %s", exc)
        return []
