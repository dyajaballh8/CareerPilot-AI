"""Phase 1 Gemini boundary.

Phase 1 does not call Gemini. This service only defines the safe boundary that
Phase 2 can use for CV analysis and natural-language course search, including
configuration, timeout, retry, and rate-limit hooks.
"""
import os
from dataclasses import dataclass

@dataclass(frozen=True)
class GeminiConfig:
    api_key: str = os.getenv("GEMINI_API_KEY", "")
    model: str = os.getenv("GEMINI_MODEL", "gemini-2.0-flash")
    timeout_seconds: int = int(os.getenv("GEMINI_TIMEOUT_SECONDS", "30"))
    max_retries: int = int(os.getenv("GEMINI_MAX_RETRIES", "2"))
    requests_per_minute: int = int(os.getenv("GEMINI_REQUESTS_PER_MINUTE", "30"))

class GeminiService:
    def __init__(self, config: GeminiConfig | None = None):
        self.config = config or GeminiConfig()

    def is_configured(self) -> bool:
        return bool(self.config.api_key)

    def analyze_resume(self, text: str) -> None:
        raise NotImplementedError("CV analysis is intentionally reserved for Phase 2")

    def natural_language_course_search(self, query: str) -> None:
        raise NotImplementedError("AI course search is intentionally reserved for Phase 2")
