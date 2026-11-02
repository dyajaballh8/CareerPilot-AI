from __future__ import annotations

import logging
import os
from typing import Any

import httpx

logger = logging.getLogger(__name__)

YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY", "")
YOUTUBE_API_BASE = "https://www.googleapis.com/youtube/v3"

_DEFAULT_TOPICS: list[str] = [
    "python programming tutorial",
    "web development course",
    "data science course",
    "machine learning tutorial",
]


def fetch_youtube_edu_courses(
    topics: list[str] | None = None,
) -> list[dict[str, Any]]:
    """Search YouTube Data API v3 for educational playlists."""
    api_key = YOUTUBE_API_KEY
    if not api_key:
        logger.debug("YouTube EDU connector: API key not configured, skipping")
        return []

    if topics is None:
        topics = _DEFAULT_TOPICS

    courses: list[dict[str, Any]] = []
    try:
        for topic in topics[:5]:  # cap the number of searches
            resp = httpx.get(
                f"{YOUTUBE_API_BASE}/search",
                params={
                    "part": "snippet",
                    "q": topic,
                    "type": "playlist",
                    "maxResults": 10,
                    "key": api_key,
                    "relevanceLanguage": "en",
                    "videoCategoryId": "27",  # Education
                },
                timeout=15,
            )
            resp.raise_for_status()

            for item in resp.json().get("items", []):
                snippet = item.get("snippet", {})
                playlist_id = item.get("id", {}).get("playlistId", "")
                courses.append(
                    {
                        "title": snippet.get("title", ""),
                        "provider": (
                            f"YouTube · {snippet.get('channelTitle', 'Unknown')}"
                        ),
                        "category": _infer_category(topic),
                        "level": "All levels",
                        "duration": "Self-paced",
                        "price": "Free",
                        "description": snippet.get("description", ""),
                        "source_url": (
                            f"https://www.youtube.com/playlist?list={playlist_id}"
                            if playlist_id
                            else None
                        ),
                        "rating": None,
                        "enrolled_count": None,
                        "image_url": (
                            snippet.get("thumbnails", {})
                            .get("high", {})
                            .get("url")
                        ),
                        "language": "en",
                    }
                )

        logger.info("YouTube EDU: fetched %d playlists", len(courses))
    except Exception as exc:
        logger.warning("YouTube EDU connector error: %s", exc)

    return courses


def _infer_category(topic: str) -> str:
    """Best-effort category from the search topic string."""
    topic_lower = topic.lower()
    if any(
        kw in topic_lower
        for kw in (
            "python", "javascript", "web dev", "programming",
            "coding", "react", "node",
        )
    ):
        return "Development"
    if any(kw in topic_lower for kw in ("data", "sql", "analytics", "statistics")):
        return "Data"
    if any(kw in topic_lower for kw in ("design", "ui", "ux", "figma")):
        return "Design"
    if any(
        kw in topic_lower
        for kw in ("machine learning", "ai", "deep learning", "neural")
    ):
        return "AI & Machine Learning"
    if any(
        kw in topic_lower
        for kw in ("career", "resume", "interview", "soft skill", "leadership")
    ):
        return "Career"
    return "General"
