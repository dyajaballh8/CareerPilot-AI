@echo off
title CareerPilot AI - Runner
echo ========================================================
echo        Starting CareerPilot AI Full-Stack App
echo ========================================================
echo.

echo [1/3] Starting FastAPI Backend on http://127.0.0.1:8001 ...
start "CareerPilot AI Backend" cmd /k "python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8001"

echo [2/3] Starting Frontend Server on http://localhost:5173 ...
start "CareerPilot AI Frontend" cmd /k "python -m http.server 5173 --directory frontend"

timeout /t 2 /nobreak >nul

echo [3/3] Opening browser at http://localhost:5173 ...
start http://localhost:5173

echo.
echo ========================================================
echo  CareerPilot AI is up and running!
echo  - Frontend: http://localhost:5173
echo  - Backend Docs (Swagger): http://127.0.0.1:8001/docs
echo ========================================================
echo.
