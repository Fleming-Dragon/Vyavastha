@echo off
setlocal enabledelayedexpansion

echo 🚀 Vyavastha Web Docker Build Script

if "%1"=="" goto usage
if "%1"=="help" goto usage
if "%1"=="build" goto build_prod
if "%1"=="dev" goto run_dev
if "%1"=="run" goto run_prod
if "%1"=="stop" goto stop_containers
if "%1"=="clean" goto clean_up
goto usage

:usage
echo Usage: %0 [OPTION]
echo Options:
echo   build     Build production Docker image
echo   dev       Build and run development environment
echo   run       Run production container
echo   stop      Stop all containers
echo   clean     Remove all containers and images
echo   help      Show this help message
goto end

:build_prod
echo 📦 Building production image...
docker build -t vyavastha-web:latest .
if %errorlevel% equ 0 (
    echo ✅ Production image built successfully!
) else (
    echo ❌ Build failed!
    exit /b 1
)
goto end

:run_dev
echo 🔧 Starting development environment...
docker-compose --profile dev up --build vyavastha-web-dev
goto end

:run_prod
echo 🌐 Starting production container...
docker-compose up --build vyavastha-web
goto end

:stop_containers
echo 🛑 Stopping containers...
docker-compose down
echo ✅ Containers stopped
goto end

:clean_up
echo 🧹 Cleaning up containers and images...
docker-compose down --rmi all --volumes
docker system prune -f
echo ✅ Cleanup completed
goto end

:end
endlocal
