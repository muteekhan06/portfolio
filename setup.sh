#!/bin/bash

# MEGA GODED ULTRA™ Portfolio Setup Script (Unix/Mac)

echo "========================================"
echo "  MEGA GODED ULTRA™ Portfolio v4.1"
echo "  100% FREE - ZERO COST FOREVER"
echo "========================================"
echo ""

# Check Node.js
echo "Checking prerequisites..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✓ Node.js: $NODE_VERSION"
else
    echo "✗ Node.js not found! Please install from https://nodejs.org"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✓ npm: v$NPM_VERSION"
else
    echo "✗ npm not found!"
    exit 1
fi

echo ""
echo "Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "✗ Installation failed!"
    exit 1
fi

echo "✓ Dependencies installed"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "✓ .env file created"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env file with your credentials!"
    echo ""
    echo "Generate password hash:"
    echo "  node -e \"const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YourPassword', 10));\""
    echo ""
    echo "Generate TOTP secret:"
    echo "  node -e \"const speakeasy = require('speakeasy'); console.log(speakeasy.generateSecret().base32);\""
    echo ""
else
    echo "✓ .env file exists"
fi

echo ""
echo "========================================"
echo "  Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "  1. Edit .env file with your credentials"
echo "  2. Run: npm run dev"
echo "  3. Visit: http://localhost:3000"
echo "  4. Admin: http://localhost:3000/admin"
echo ""
echo "Documentation:"
echo "  - SETUP.md - Quick setup guide"
echo "  - README.md - Full documentation"
echo "  - DEPLOYMENT.md - Deploy checklist"
echo ""
echo "Happy coding! 🚀"
echo ""
