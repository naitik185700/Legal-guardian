#!/usr/bin/env bash
set -e

echo "=== 1. Pulling latest code ==="
cd /var/www/guardian-legal
git fetch origin main
git reset --hard origin/main

echo "=== 2. Configuring Nginx for guardianslegalsolutions.com ==="
cat << 'EOF' > /etc/nginx/sites-available/guardianslegalsolutions.conf
# HTTP Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name guardianslegalsolutions.com www.guardianslegalsolutions.com;
    return 301 https://$host$request_uri;
}

# HTTPS Server Block -> Guardian Legal Solutions (Port 3002)
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name guardianslegalsolutions.com www.guardianslegalsolutions.com;

    ssl_certificate /etc/letsencrypt/live/guardianslegalsolutions.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/guardianslegalsolutions.com/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    client_max_body_size 25M;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    location / {
        proxy_pass http://127.0.0.1:3002;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 90;
    }

    location /_next/static {
        proxy_pass http://127.0.0.1:3002;
        proxy_cache_bypass $http_upgrade;
        expires 365d;
        access_log off;
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/guardianslegalsolutions.conf /etc/nginx/sites-enabled/guardianslegalsolutions.conf

echo "=== 3. Testing and reloading Nginx ==="
nginx -t
systemctl reload nginx

echo "=== 4. Ensuring Guardian Legal is built and running on PM2 (Port 3002) ==="
cd /var/www/guardian-legal
npm install --legacy-peer-deps
npx -y prisma generate || true
npm run build
pm2 delete guardian-legal 2>/dev/null || true
pm2 start deploy/ecosystem.config.cjs
pm2 save

echo "=== SUCCESS! Visit https://guardianslegalsolutions.com ==="
