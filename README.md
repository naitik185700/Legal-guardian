# Guardian Legal Solutions — Production Web Application & Chambers Portal

A production-grade, full-stack website and administrative practice portal for **Guardian Legal Solutions**, built with Next.js 15 (App Router), TypeScript, Tailwind CSS, PostgreSQL, and Prisma ORM.

---

## 1. Brand Identity & Visual Design System

The application is built around the authentic **Guardian Legal Solutions** visual identity, incorporating the scales of justice and laurel wreath emblem:

- **Palette**:
  - Primary Dark: Deep Charcoal (`#171717`) and Near-Black (`#0D0D0D`)
  - Accent / Fine Borders: Muted Antique Gold (`#B59A62`, hover `#A38850`)
  - Primary Surface: Warm Ivory (`#F8F6F1`) and Crisp White (`#FFFFFF`)
  - Editorial Body Text: Deep Grey (`#424242`)
- **Typography**: Classical serif headings paired with clean, accessible sans-serif interface typography.
- **Brand Assets** (`/public/brand/`):
  - `guardian-legal-logo.png` — High-resolution transparent official logo.
  - `guardian-legal-logo-white.png` — High-contrast version for dark surfaces.
  - `guardian-emblem.png` — Isolated scales-and-laurel brand seal.
  - `favicon.ico` & `favicon.png` — Extracted favicon emblem.

---

## 2. Architecture & Technology Stack

- **Framework**: Next.js 15.1 (App Router with Server Components & dynamic Route Handlers)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS
- **Database & ORM**: PostgreSQL with Prisma ORM
- **Authentication**: Stateless, cryptographic JWT session tokens encrypted with `jose` and stored in HttpOnly, SameSite cookies. Passwords hashed using `bcryptjs` (cost factor 12).
- **Validation**: Zod schema validation on both client and server boundaries.
- **Icons**: Lucide React.
- **Email Dispatcher**: Configurable transactional email service (`resend` or graceful local development fallback).
- **Accessibility**: WCAG 2.2 Level AA compliance with high-contrast text ratios, visible gold keyboard focus rings, and screen-reader form associations.

---

## 3. Public Pages Directory

| Route | Purpose & Key Features |
|---|---|
| `/` | Homepage featuring editorial hero, verified practice areas grid, firm approach, lawyer intros, consultation workflow, legal insights, and interactive FAQs. |
| `/about` | Institutional background, philosophy, Bar Council compliance, confidentiality code, and dispute handling standards. |
| `/practice-areas` | Directory of verified disciplines: Commercial Litigation, Corporate Governance, Arbitration, Contract Vetting, Banking Disputes, Real Estate. |
| `/practice-areas/[slug]` | Dynamic service pages with procedural roadmaps, documentary checklists, and area-specific FAQs. |
| `/our-lawyers` | Verified advocate profiles, bar enrollment entries, practice concentrations, and academic degrees. |
| `/our-lawyers/[slug]` | Individual counsel profiles with full biography and consultation booking CTA. |
| `/insights` | Case law commentary, searchable articles, and category filters. |
| `/insights/[slug]` | Individual analytical articles with reading time, author credentials, and educational disclaimers. |
| `/faqs` | Searchable administrative and procedural knowledgebase. |
| `/contact` | Click-to-call, verified chambers address, working hours, and secure confidential enquiry form. |
| `/consultation` | Phased consultation request portal (video, chambers, telephonic) with conflict clearance workflow. |
| `/privacy-policy` | Data processing standards and client confidentiality policies. |
| `/terms-of-use` | Terms governing informational access and jurisdictional boundaries. |
| `/disclaimer` | Bar Council of India Rule 36 compliance and non-solicitation declaration. |
| `/accessibility` | Accessibility statement and WCAG 2.2 conformance details. |

---

## 4. Administrative Chambers Portal (`/admin`)

The `/admin` portal provides secure, authenticated management of intake and appointments:

- **Authentication Guard**: Unauthenticated visitors are automatically redirected to `/admin/login`.
- **Enquiry / Lead Management**:
  - Real-time intake listing with unique reference codes (`GLS-ENQ-XXXXXX`).
  - Search and filter by client name, email, or status.
  - Lead statuses: `NEW`, `CONTACTED`, `CONSULTATION_REQUESTED`, `IN_PROGRESS`, `CLOSED`.
  - Restricted internal staff notes.
  - CSV export of client records.
- **Consultation Scheduling**:
  - Review requested conference formats and calendar slots.
  - Appointment statuses: `REQUESTED`, `CONFIRMED`, `RESCHEDULED`, `COMPLETED`, `CANCELLED`.
  - Registrar calendar notes.
- **Security Audit Logs**: Cryptographically timestamped audit trail of all logins, submissions, and status modifications.

### Default Initial Superadmin Credentials:
- **Email**: `admin@guardianlegalsolutions.com`
- **Password**: `GuardianLegal@2026`

---

## 5. Development & Production Run Commands

### Development Server
```bash
npm run dev
# Starts local server at http://localhost:3000
```

### Production Build & Start
```bash
npm run build
npm run start
```

### Prisma ORM & Database Commands
```bash
# Generate Prisma Client
npx prisma generate

# Apply migrations to PostgreSQL
npx prisma migrate deploy

# Seed initial admin user
node scripts/seed.mjs
```

---

## 6. Environment Configuration (`.env`)

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

| Variable | Description | Default / Example |
|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Canonical website domain | `https://guardianlegalsolutions.com` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/guardian_legal?schema=public` |
| `ADMIN_JWT_SECRET` | 32+ character key for JWT signing | `openssl rand -base64 32` |
| `EMAIL_PROVIDER` | Transactional email provider | `resend` or `local-fallback` |
| `RESEND_API_KEY` | Resend API key for live emails | `re_xxxxxxxxxxxx` |
| `EMAIL_FROM` | Sender email address | `Guardian Legal <contact@guardianlegalsolutions.com>` |

---

## 7. Data Retention & Security Architecture

1. **Input Sanitization**: All form entries are trimmed and validated strictly against Zod schemas.
2. **Rate Limiting**: Public enquiry and consultation endpoints enforce IP-based rate limiting (5 submissions per 10 minutes).
3. **Protection Against Brute Force**: Administrative login endpoints lock out repeated failed attempts after 5 consecutive failures.
4. **Security Headers**: Custom HTTP response headers include `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy`.
5. **No Fictional Claims**: The codebase strictly adheres to Bar Council ethics by omitting fabricated testimonials, fake awards, and exaggerated success metrics.
