@echo off
cd /d "%~dp0"
echo Installing project dependencies...
call npm install
if errorlevel 1 goto fail
if not exist .env.local copy .env.example .env.local
echo.
echo Setup complete.
echo Edit .env.local with your Neon and Cloudinary credentials.
echo Local admin password: admin123
npm run dev
goto end
:fail
echo npm install failed. Check your Node.js installation and internet connection.
pause
:end
