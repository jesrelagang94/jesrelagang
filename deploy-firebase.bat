@echo off
echo ==========================================
echo   Firebase Deployment Script
echo ==========================================
echo.

cd /d "C:\laragon\www\jesrelagang"

echo Step 1: Logging into Firebase...
echo Please complete the login in your browser.
echo.
call firebase login

echo.
echo Step 2: Deploying Firestore security rules...
call firebase deploy --only firestore:rules

echo.
echo ==========================================
echo   Deployment Complete!
echo ==========================================
echo.
pause
