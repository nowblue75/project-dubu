@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo =======================================================
echo 🚀 GitHub 원격 저장소(origin main)로 푸시합니다...
echo =======================================================
echo.
git push -u origin main --tags
echo.
pause
