@echo off
echo ========================================
echo Fake News Detector - Windows Setup
echo ========================================
echo.

echo [1/5] Checking Node.js...
node --version
if %errorlevel% neq 0 (
    echo ERROR: Node.js not found! Please install Node.js 18+
    pause
    exit /b 1
)
echo ✓ Node.js found
echo.

echo [2/5] Checking Java...
java -version
if %errorlevel% neq 0 (
    echo ERROR: Java not found! Please install JDK 17
    pause
    exit /b 1
)
echo ✓ Java found
echo.

echo [3/5] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed
echo.

echo [4/5] Cleaning Android build...
cd android
call gradlew clean
cd ..
echo ✓ Android build cleaned
echo.

echo [5/5] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Start an Android emulator OR connect a physical device
echo 2. Run: npm start (in this terminal)
echo 3. Run: npm run android (in a new terminal)
echo ========================================
echo.
pause