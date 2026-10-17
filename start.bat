@echo off
rem Double-click this on Windows to start Trading Terminal.
cd /d "%~dp0"
node server.js --open
pause
