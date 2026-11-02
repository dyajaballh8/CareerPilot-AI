from __future__ import annotations

from fastapi import APIRouter

from app.api.routes.auth import router as auth_router
from app.api.routes.courses import router as courses_router
from app.api.routes.resumes import router as resumes_router
from app.api.routes.users import router as users_router

api_router = APIRouter(prefix="/api")
api_router.include_router(auth_router)
api_router.include_router(users_router)
api_router.include_router(courses_router)
api_router.include_router(resumes_router)
