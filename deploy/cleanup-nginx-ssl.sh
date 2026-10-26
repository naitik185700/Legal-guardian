#!/usr/bin/env bash
set -e

echo "=== Cleaning up conflicting Nginx configurations ==="

# Remove old or duplicate symlinks in sites-enabled
rm -f /etc/nginx/sites-enabled/default
rm -f /etc/nginx/sites-enabled/guardian-test 2>/dev/null || true
rm -f /etc/nginx/sites-enabled/guardian-legal.conf 2>/dev/null || true

# Check if guardian-estate.conf has guardianslegalsolutions.com and remove it from there
if [ -f "/etc/nginx/sites-available/guardian-estate.conf" ]; then
    sed -i 's/guardianslegalsolutions.com//g' /etc/nginx/sites-available/guardian-estate.conf
    sed -i 's/www.guardianslegalsolutions.com//g' /etc/nginx/sites-available/guardian-estate.conf
fi

# Write the clean dedicated Nginx configuration for guardianslegalsolutions.com
cat << 'EOF' > /etc/nginx/sites-available/guardianslegalsolutions.conf
# HTTP Redirect to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name guardianslegalsolutions.com www.guardianslegalsolutions.com;
    return 301 https://guardianslegalsolutions.com$request_uri;
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

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

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

# Link and reload
ln -sf /etc/nginx/sites-available/guardianslegalsolutions.conf /etc/nginx/sites-enabled/guardianslegalsolutions.conf

echo "=== Verifying Nginx Syntax ==="
nginx -t
systemctl reload nginx

echo "=== Nginx reloaded cleanly without conflicts! ==="
