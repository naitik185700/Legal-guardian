#!/usr/bin/env bash
# ==============================================================================
# Guardian Legal Solutions — Turnkey VPS Deployment Script
# Hostinger VPS (Ubuntu / Debian)
# ==============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
GOLD='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${GOLD}===================================================================${NC}"
echo -e "${GOLD}   GUARDIAN LEGAL SOLUTIONS — VPS PRODUCTION DEPLOYMENT SCRIPT     ${NC}"
echo -e "${GOLD}===================================================================${NC}"

APP_DIR="/var/www/guardian-legal"
ARCHIVE_PATH="/root/guardian-legal-production.tar.gz"

# 1. Update OS Packages & Prerequisites
echo -e "\n${BLUE}[1/6] Checking system packages and runtime...${NC}"
apt-get update -y
apt-get install -y curl wget nginx tar gzip certbot python3-certbot-nginx

# 2. Check Node.js
if ! command -v node &> /dev/null || [ "$(node -v | cut -d'.' -f1 | tr -d 'v')" -lt 20 ]; then
    echo -e "${GOLD}Installing Node.js 20 LTS via NodeSource...${NC}"
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi
echo -e "${GREEN}Node.js $(node -v) & npm $(npm -v) verified.${NC}"

# 3. Check PM2
if ! command -v pm2 &> /dev/null; then
    echo -e "${GOLD}Installing PM2 process manager globally...${NC}"
    npm install -g pm2
fi

# 4. Extract Application Bundle
echo -e "\n${BLUE}[2/6] Setting up application in ${APP_DIR}...${NC}"
mkdir -p "${APP_DIR}"

if [ -f "${ARCHIVE_PATH}" ]; then
    tar -xzf "${ARCHIVE_PATH}" -C "${APP_DIR}"
    echo -e "${GREEN}Archive extracted successfully into ${APP_DIR}.${NC}"
elif [ -f "./package.json" ]; then
    echo -e "${GREEN}Running directly from repository directory.${NC}"
    if [ "$(pwd)" != "${APP_DIR}" ]; then
        cp -r ./* "${APP_DIR}/"
    fi
fi

cd "${APP_DIR}"

# 5. Production Dependencies & Prisma Client
echo -e "\n${BLUE}[3/6] Installing dependencies and building...${NC}"
npm install --legacy-peer-deps
npx prisma generate || true

# If .next does not exist, build it
if [ ! -d ".next" ]; then
    echo -e "${GOLD}Building Next.js production bundle...${NC}"
    npm run build
fi

# 6. PM2 Process Launch
echo -e "\n${BLUE}[4/6] Starting application with PM2 on port 3002...${NC}"
if pm2 describe guardian-legal &> /dev/null; then
    pm2 reload guardian-legal --update-env
else
    pm2 start deploy/ecosystem.config.cjs
fi
pm2 save
pm2 startup systemd -u root --hp /root || true

# 7. Configure Nginx
echo -e "\n${BLUE}[5/6] Configuring Nginx reverse proxy...${NC}"
cp -f "${APP_DIR}/deploy/nginx-guardian-legal.conf" /etc/nginx/sites-available/guardian-legal.conf
ln -sf /etc/nginx/sites-available/guardian-legal.conf /etc/nginx/sites-enabled/guardian-legal.conf

# Test and reload Nginx
nginx -t
systemctl reload nginx
echo -e "${GREEN}Nginx configured and reloaded successfully.${NC}"

# 8. Success Report
echo -e "\n${GOLD}===================================================================${NC}"
echo -e "${GREEN}✓ DEPLOYMENT COMPLETED SUCCESSFULLY!${NC}"
echo -e "${GOLD}===================================================================${NC}"
echo -e "Application: Guardian Legal Solutions"
echo -e "Port: 3002 (Reverse proxied by Nginx on port 80/443)"
echo -e "Local Health Check: http://127.0.0.1:3002"
echo -e "\nTo enable free Let's Encrypt SSL/HTTPS, run:"
echo -e "${GOLD}certbot --nginx -d legal.guardianfinancialexperts.com${NC}"
echo -e "===================================================================\n"
