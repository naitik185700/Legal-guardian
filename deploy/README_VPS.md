# Guardian Legal Solutions — Hostinger VPS Deployment Guide
**Target VPS Server:** `46.202.160.208` (Hostinger VPS)  
**Recommended Subdomain:** `legal.guardianfinancialexperts.com` (or your custom domain `guardianlegalsolutions.com`)

---

## Pre-Built Archives Ready for Deployment
In your project directory, two production-ready bundles have already been packaged:
1. `guardian-legal-production.tar.gz` (34.83 MB — recommended for Linux VPS)
2. `guardian-legal-production.zip` (35.13 MB)

---

## Step 1: Add DNS A-Record in Hostinger hPanel

1. Log in to your **Hostinger hPanel**.
2. Go to **Domains** ➔ Select `guardianfinancialexperts.com` (or `guardianlegalsolutions.com`) ➔ **DNS / Nameservers**.
3. Add a new **A Record**:
   - **Type**: `A`
   - **Name / Host**: `legal` (or `@` for root domain)
   - **Points to**: `46.202.160.208`
   - **TTL**: `300`

---

## Step 2: Upload Files to the VPS

Open a terminal or PowerShell window on your PC and run:

```powershell
# 1. Upload the production archive
scp "guardian-legal-production.tar.gz" root@46.202.160.208:/root/

# 2. Upload the deployment script directory
scp -r deploy root@46.202.160.208:/root/
```

---

## Step 3: Run the 1-Click Deployment Script on the VPS

Connect to your VPS via SSH:

```bash
ssh root@46.202.160.208
```

Make the automated script executable and run it:

```bash
chmod +x /root/deploy/deploy-vps.sh
/root/deploy/deploy-vps.sh
```

### What the script does automatically:
1. Installs Node.js 20+ LTS, Nginx, and PM2 if not already present.
2. Unpacks the app into `/var/www/guardian-legal`.
3. Installs production dependencies and generates the Prisma client.
4. Starts the app with PM2 cluster mode on port `3002`.
5. Configures Nginx virtual host (`/etc/nginx/sites-available/guardian-legal.conf`) reverse-proxying port `3002`.
6. Tests and reloads Nginx.

---

## Step 4: Enable Free HTTPS (SSL) with Let's Encrypt

On your VPS terminal, execute:

```bash
certbot --nginx -d legal.guardianfinancialexperts.com
```
Follow the prompt to enter your email and select redirect to HTTPS.

---

## Step 5: Verification & Access
- Public Website: `https://legal.guardianfinancialexperts.com`
- Chambers Admin Portal: `https://legal.guardianfinancialexperts.com/admin/login`
  - **Email**: `admin@guardianlegalsolutions.com`
  - **Password**: `GuardianLegal@2026`
