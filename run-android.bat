@echo off
echo ========================================
echo Fake News Detector - Run Android
echo ========================================
echo.

echo Checking for connected devices...
adb devices
echo.

echo Starting Metro Bundler...
start cmd /k "npm start"

echo.
echo Waiting for Metro to start (10 seconds)...
timeout /t 10 /nobreak

echo.
echo Building and installing app...
call npx react-native run-android

echo.
echo ========================================
echo App should be running on your device!
echo ========================================
pause