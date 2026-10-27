@echo off
cd /d "%~dp0"
if not exist node_modules\next (call npm install)
start "" http://localhost:3000/concept-a/
call npm run dev
