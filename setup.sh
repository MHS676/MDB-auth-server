#!/bin/bash

# MDB Auth Server Quick Setup Script
# This script sets up the MDB-auth-server for development

set -e

echo "🚀 MDB Auth Server Setup"
echo "========================"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Node.js version:${NC} $(node --version)"
echo -e "${GREEN}✓ npm version:${NC} $(npm --version)"

# Navigate to auth server directory
AUTH_SERVER_DIR="$(dirname "$0")"
cd "$AUTH_SERVER_DIR"

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔑 Setting up environment variables..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo -e "${YELLOW}⚠️  Created .env file. Please update it with your database credentials.${NC}"
else
    echo -e "${GREEN}✓ .env file already exists${NC}"
fi

echo ""
echo "🗄️  Setting up database..."
npx prisma generate
npx prisma migrate dev --name init

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Update .env with your database credentials if not already done"
echo "2. Run: npm run start:dev"
echo "3. Auth server will run on http://localhost:3001"
echo ""
echo "📖 For more information, see README.md"
