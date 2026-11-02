from __future__ import annotations

from typing import Any


def normalize_course(item: dict[str, Any]) -> dict[str, Any]:
    """Map various key names to the canonical course format."""
    return {
        "title": str(
            item.get("title")
            or item.get("name")
            or ""
        ),
        "provider": (
            item.get("provider")
            or item.get("platform")
            or item.get("source")
            or ""
        ),
        "category": str(
            item.get("category")
            or item.get("topic")
            or "General"
        ),
        "level": _normalize_level(
            item.get("level")
            or item.get("difficulty")
            or "All levels"
        ),
        "duration": str(
            item.get("duration")
            or (_hours_to_str(item["hours"]) if item.get("hours") else None)
            or "Self-paced"
        ),
        "price": _normalize_price(item),
        "description": str(
            item.get("description")
            or item.get("headline")
            or item.get("summary")
            or ""
        ),
        "source_url": (
            item.get("source_url")
            or item.get("url")
            or item.get("link")
            or None
        ),
        "rating": _safe_float(item.get("rating") or item.get("avg_rating")),
        "enrolled_count": _safe_int(
            item.get("enrolled_count")
            or item.get("enrollment_count")
            or item.get("num_subscribers")
        ),
        "image_url": (
            item.get("image_url")
            or item.get("image")
            or item.get("thumbnail")
            or None
        ),
        "language": str(
            item.get("language")
            or item.get("lang")
            or "en"
        ),
    }


# ── helpers ──────────────────────────────────────────────────────────

def _normalize_level(raw: Any) -> str:
    if not raw:
        return "All levels"
    mapping: dict[str, str] = {
        "beginner": "Beginner",
        "intermediate": "Intermediate",
        "advanced": "Advanced",
        "expert": "Advanced",
        "all levels": "All levels",
        "all": "All levels",
        "mixed": "All levels",
    }
    return mapping.get(str(raw).strip().lower(), str(raw))


def _normalize_price(item: dict[str, Any]) -> str:
    if "is_free" in item and item["is_free"]:
        return "Free"
    price = item.get("price")
    if price is None:
        return "See provider"
    price_str = str(price).strip()
    if price_str.lower() in ("free", "0", "0.0", "0.00"):
        return "Free"
    if price_str:
        return price_str
    return "See provider"


def _hours_to_str(hours: Any) -> str | None:
    try:
        h = float(hours)
        if h <= 0:
            return None
        return f"{h:g} hours"
    except (ValueError, TypeError):
        return None


def _safe_float(value: Any) -> float | None:
    if value is None:
        return None
    try:
        f = float(value)
        return round(min(max(f, 0.0), 5.0), 1)
    except (ValueError, TypeError):
        return None


def _safe_int(value: Any) -> int | None:
    if value is None:
        return None
    try:
        return int(value)
    except (ValueError, TypeError):
        return None
