@echo off
REM Script d'initialisation complète des bases de données (Windows)

echo === Initialisation des bases de données du projet Supply Chain Intelligence ===

REM Vérification des prérequis
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Docker n'est pas installé. Veuillez installer Docker avant de continuer.
    pause
    exit /b 1
)

docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Docker Compose n'est pas installé. Veuillez installer Docker Compose avant de continuer.
    pause
    exit /b 1
)

echo Docker et Docker Compose sont installés.

REM Arrêt des services existants
echo Arrêt des services Docker existants...
docker-compose down

REM Démarrage des services
echo Démarrage des services Docker...
docker-compose up -d

REM Attente de l'initialisation des bases de données
echo Attente de l'initialisation des bases de données...
timeout /t 30 /nobreak >nul

REM Vérification de l'état des services
echo Vérification de l'état des services...
docker-compose ps

echo === Initialisation terminée ===
echo Vous pouvez maintenant accéder aux bases de données avec les identifiants spécifiés dans le README.md
echo.
echo Bases de données créées:
echo 1. PostgreSQL (supply_chain_db) - Port 5432
echo 2. PostgreSQL (IA_supply) - Port 5433
echo 3. MongoDB (supply-IA) - Port 27017
echo 4. ClickHouse - Ports 8123/9000
echo 5. Redis - Port 6379
echo.
pause