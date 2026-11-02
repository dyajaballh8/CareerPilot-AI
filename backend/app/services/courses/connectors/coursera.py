from __future__ import annotations

import logging
from typing import Any

import httpx

from app.core.config import settings
from app.services.courses.normalize import normalize_course

logger = logging.getLogger(__name__)


def fetch_coursera_courses() -> list[dict[str, Any]]:
    """Fetch courses via the Coursera Partner / OAuth2 API."""
    if not (
        settings.COURSERA_CLIENT_ID
        and settings.COURSERA_CLIENT_SECRET
        and settings.COURSERA_CONTENT_URL
    ):
        logger.debug("Coursera connector: credentials not configured, skipping")
        return []

    try:
        # ── OAuth2 client-credentials token ──────────────────────────
        token_resp = httpx.post(
            settings.COURSERA_TOKEN_URL,
            data={"grant_type": "client_credentials"},
            auth=(settings.COURSERA_CLIENT_ID, settings.COURSERA_CLIENT_SECRET),
            timeout=20,
        )
        token_resp.raise_for_status()
        access_token = token_resp.json()["access_token"]

        # ── Fetch course catalogue ───────────────────────────────────
        resp = httpx.get(
            settings.COURSERA_CONTENT_URL,
            headers={
                "Authorization": f"Bearer {access_token}",
                "Accept": "application/json",
            },
            timeout=30,
        )
        resp.raise_for_status()
        payload = resp.json()

        items: list[Any]
        if isinstance(payload, dict):
            items = payload.get("items", payload.get("elements", []))
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
            course["provider"] = course["provider"] or "Coursera"
            courses.append(course)

        logger.info("Coursera: fetched %d courses", len(courses))
        return courses

    except Exception as exc:
        logger.warning("Coursera connector error: %s", exc)
        return []
