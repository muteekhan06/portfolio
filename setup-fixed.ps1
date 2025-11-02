#!/usr/bin/env pwsh
# setup-fixed.ps1 - replacement for broken setup.ps1

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MEGA GODED ULTRA Portfolio v4.1" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Checking prerequisites..." -ForegroundColor Yellow
if (Get-Command node -ErrorAction SilentlyContinue) {
    $nodeVersion = (& node --version)
    Write-Host "OK  Node.js: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "ERROR: Node.js not found. Install from https://nodejs.org" -ForegroundColor Red
    exit 1
}

if (Get-Command npm -ErrorAction SilentlyContinue) {
    $npmVersion = (& npm --version)
    Write-Host "OK  npm: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "ERROR: npm not found." -ForegroundColor Red
    exit 1
}

if (Get-Command git -ErrorAction SilentlyContinue) {
    $gitVersion = (& git --version)
    Write-Host "OK  git: $gitVersion" -ForegroundColor Green
} else {
    Write-Host "WARNING: git not found. Some features (GitHub commits) will not work." -ForegroundColor Yellow
}

Write-Host "";
Write-Host "Installing dependencies (this may take a minute)..." -ForegroundColor Yellow

# Run npm install and capture exit code
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: npm install failed (exit code $LASTEXITCODE)." -ForegroundColor Red
    Write-Host "Check your network, proxy settings, or run 'npm install' manually for details." -ForegroundColor Yellow
    exit 1
}

Write-Host "OK  Dependencies installed" -ForegroundColor Green
Write-Host ""

# Create .env from example if missing
if (-not (Test-Path ".env")) {
    if (Test-Path ".env.example") {
        Write-Host "Creating .env from .env.example..." -ForegroundColor Yellow
        Copy-Item ".env.example" ".env" -ErrorAction SilentlyContinue
        Write-Host "OK  .env file created" -ForegroundColor Green
    } else {
        Write-Host "WARNING: .env.example not found. Please create a .env file manually." -ForegroundColor Yellow
    }

    Write-Host "\nIMPORTANT: Edit .env and add your secrets (GITHUB_TOKEN, ADMIN_PASSWORD_HASH, etc.)." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Generate a password hash with node (example):" -ForegroundColor Cyan
    Write-Host "  node -e \"const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YourPassword', 10));\"" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Generate a TOTP secret with node (example):" -ForegroundColor Cyan
    Write-Host "  node -e \"const speakeasy = require('speakeasy'); console.log(speakeasy.generateSecret().base32);\"" -ForegroundColor Gray
    Write-Host ""
} else {
    Write-Host "OK  .env file exists" -ForegroundColor Green
}

Write-Host "";
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Setup Complete" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1) Edit .env with your values (GITHUB_TOKEN, ADMIN_PASSWORD_HASH, etc.)" -ForegroundColor White
Write-Host "  2) Start dev server: npm run dev" -ForegroundColor White
Write-Host "  3) Visit: http://localhost:3000 and /admin" -ForegroundColor White
Write-Host ""
