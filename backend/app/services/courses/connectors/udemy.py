from __future__ import annotations

import logging
from typing import Any

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

UDEMY_API_BASE = "https://www.udemy.com/api-2.0"


def fetch_udemy_courses(
    search: str = "",
    page_size: int = 100,
) -> list[dict[str, Any]]:
    """Fetch courses from the Udemy Affiliate API (Basic auth)."""
    if not (settings.UDEMY_CLIENT_ID and settings.UDEMY_CLIENT_SECRET):
        logger.debug("Udemy connector: credentials not configured, skipping")
        return []

    try:
        params: dict[str, Any] = {
            "page_size": page_size,
            "ordering": "relevance",
            "fields[course]": (
                "title,headline,url,price,image_240x135,"
                "avg_rating,num_subscribers,content_info,"
                "instructional_level,locale"
            ),
        }
        if search:
            params["search"] = search

        resp = httpx.get(
            f"{UDEMY_API_BASE}/courses/",
            params=params,
            auth=(settings.UDEMY_CLIENT_ID, settings.UDEMY_CLIENT_SECRET),
            timeout=30,
        )
        resp.raise_for_status()
        data = resp.json()
        results = data.get("results", [])

        level_map: dict[str, str] = {
            "All Levels": "All levels",
            "Beginner Level": "Beginner",
            "Intermediate Level": "Intermediate",
            "Expert Level": "Advanced",
        }

        courses: list[dict[str, Any]] = []
        for item in results:
            if not isinstance(item, dict):
                continue

            locale_raw = item.get("locale")
            language = (
                locale_raw.get("locale", "en")
                if isinstance(locale_raw, dict)
                else "en"
            )

            price_raw = str(item.get("price", ""))
            if price_raw.lower().startswith("free") or price_raw in ("0", "0.0"):
                price = "Free"
            elif price_raw:
                price = price_raw
            else:
                price = "See provider"

            course: dict[str, Any] = {
                "title": item.get("title", ""),
                "provider": "Udemy",
                "category": "General",  # Udemy API doesn't return category directly
                "level": level_map.get(
                    item.get("instructional_level", ""), "All levels"
                ),
                "duration": item.get("content_info", "Self-paced"),
                "price": price,
                "description": item.get("headline", ""),
                "source_url": (
                    f"https://www.udemy.com{item['url']}"
                    if item.get("url")
                    else None
                ),
                "rating": (
                    round(float(item["avg_rating"]), 1)
                    if item.get("avg_rating")
                    else None
                ),
                "enrolled_count": item.get("num_subscribers"),
                "image_url": item.get("image_240x135"),
                "language": language,
            }
            courses.append(course)

        logger.info("Udemy: fetched %d courses", len(courses))
        return courses

    except Exception as exc:
        logger.warning("Udemy connector error: %s", exc)
        return []
