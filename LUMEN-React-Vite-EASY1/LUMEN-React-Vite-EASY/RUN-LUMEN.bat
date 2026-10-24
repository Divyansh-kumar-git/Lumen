@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo.
echo  LUMEN - React + Vite Skill Constellation
echo  ----------------------------------------
where npm >nul 2>nul
if errorlevel 1 (
  echo  ERROR: npm was not found.
  echo  Install Node.js 20.19+ or 22.12+, then restart VS Code and run this file again.
  echo.
  pause
  exit /b 1
)
if not exist "node_modules" (
  echo  Installing packages for the first time...
  call npm install --no-audit --no-fund
  if errorlevel 1 (
    echo.
    echo  npm install failed. Check the message above.
    pause
    exit /b 1
  )
)
echo.
echo  Starting LUMEN...
echo  Open this URL in your browser: http://localhost:5173
echo  Press Ctrl+C in this window to stop the server.
echo.
call npm run dev
echo.
echo  Server stopped.
pause
