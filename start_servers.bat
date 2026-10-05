@echo off
echo ==================================================
echo Starting NyayaSetu Servers...
echo ==================================================

echo [1/2] Starting Frontend (React/Vite)...
start cmd /k "cd frontend && npm run dev"

echo [2/2] Starting Backend (FastAPI)...
start cmd /k "cd backend && python -m uvicorn app.main:app --reload --port 8000"

echo.
echo Both servers are starting up in separate windows!
echo - Website: http://localhost:5173
echo - API: http://localhost:8000
echo.
echo You can minimize those black windows.
