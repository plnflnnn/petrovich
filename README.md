# Building materials to order — IP Filina L.V.

Public website and small admin panel for a local building-materials business in Kargat, Novosibirsk Oblast. The live site is [filin54.com](https://filin54.com).

Customers can browse categories (roofing, fences, windows, doors, and others), leave a request, and read about delivery. The owner can log in to `/admin` to manage requests and clients, apply a markup to an Excel price list, and convert files.

## Stack

- Next.js (App Router) and TypeScript
- Tailwind CSS
- PostgreSQL (`pg`)
- Resend for email
- JWT cookie auth for admin (`jose` + `bcryptjs`)

## What’s in the repo

| Area | Path | Role |
|------|------|------|
| Home | `app/page.tsx`, `app/home/` | Landing page, header, footer, contacts |
| Catalog | `app/category/` | One route per product group; copy lives in each `page.tsx` |
| Services | `app/service/` | Forging, equipment, cargo delivery |
| Admin UI | `app/admin/` | Login, requests, clients, price markup, file converter |
| APIs | `app/api/` | Contact form and admin REST |
| Content / SEO | `lib/data/`, `lib/seo/` | Images, schema, sitemap, keywords |
| Database | `lib/db/` | Queries for admins, requests, clients |

Public catalog text is static TypeScript, not loaded from the database. The database stores admin users, contact requests, and clients.

## Local setup

```bash
npm install
cp .env.example .env.local
```

Fill `.env.local` (see below), then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Admin is at [http://localhost:3000/admin](http://localhost:3000/admin).

```bash
npm run build
npm start
```

## Environment

Copy from `.env.example`. Do not commit `.env` or `.env.local`.

| Variable | Purpose |
|----------|---------|
| `DATABASE_URL` | Postgres connection string |
| `DATABASE_SCHEMA` | Schema name (optional; used locally / some hosts) |
| `DATABASE_SSL` | Set `false` for local Postgres without SSL |
| `ADMIN_JWT_SECRET` | Required. Signs admin session cookies |
| `CONTACT_EMAIL_TO` | Inbox for contact-form emails |
| `RESEND_API_KEY` | Send email |
| `EMAIL_FROM` | Verified Resend sender |
| `SITE_URL` | Public origin for sitemap and canonical URLs (`https://your-domain` in production) |
| `GOOGLE_SITE_VERIFICATION` | Optional Search Console code |
| `YANDEX_SITE_VERIFICATION` | Optional Yandex Webmaster code |

Admin passwords live in the database as hashes, not in this repo. Production secrets belong in the host dashboard (for example Vercel).

## License

Private business project. Source is published for portfolio review; it is not a template for reuse without permission.
