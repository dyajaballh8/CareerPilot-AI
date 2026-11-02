from __future__ import annotations

import logging
from typing import Any

import httpx

from app.core.config import settings
from app.services.courses.normalize import normalize_course

logger = logging.getLogger(__name__)


def fetch_edx_courses() -> list[dict[str, Any]]:
    """Fetch courses from the edX Course Discovery API."""
    if not settings.EDX_CATALOG_URL:
        logger.debug("edX connector: catalog URL not configured, skipping")
        return []

    try:
        headers: dict[str, str] = {"Accept": "application/json"}
        if settings.EDX_API_KEY:
            headers["Authorization"] = f"Bearer {settings.EDX_API_KEY}"

        resp = httpx.get(settings.EDX_CATALOG_URL, headers=headers, timeout=30)
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
            course["provider"] = course["provider"] or "edX"
            courses.append(course)

        logger.info("edX: fetched %d courses", len(courses))
        return courses

    except Exception as exc:
        logger.warning("edX connector error: %s", exc)
        return []
