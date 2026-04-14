# ABS Herbals Ecommerce

Complete editable ecommerce platform with full admin control for banners, homepage blocks, offers, discounts, coupons, products, categories, orders, announcement bar, popup banners, and marketing settings.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- PostgreSQL + Prisma ORM
- Server Actions for admin CRUD
- Cookie-based admin auth

## Quick Start (Local)

1. Copy env:
```bash
copy .env.example .env
```

2. Start PostgreSQL (Docker):
```bash
docker compose up -d
```

3. Push schema and seed data:
```bash
npm run db:push
npm run db:seed
```

4. Start app:
```bash
npm run dev
```

Open `http://localhost:3000`.

Admin login:
- Email: `admin@absherbals.com`
- Password: `Admin@123`

## Important Routes

- Storefront: `/`
- Shop all: `/shop`
- Product: `/product/[slug]`
- Category: `/category/[slug]`
- Checkout: `/checkout`
- Admin login: `/admin/login`
- Admin dashboard: `/admin`

## Editable Admin Modules

- Homepage block manager (`/admin/homepage`) with enable/toggle and sort order
- Banners (`/admin/banners`)
- Announcement bar (`/admin/announcements`)
- Popup banners (`/admin/popups`)
- Offers (`/admin/offers`)
- Discount rules (`/admin/discounts`)
- Coupons (`/admin/coupons`)
- Products (`/admin/products`)
- Categories (`/admin/categories`)
- Orders (`/admin/orders`)
- Marketing + tracking + campaign links (`/admin/settings`)

## Marketing Integrations

Configure from admin settings:
- Meta Pixel ID
- Google Analytics Measurement ID
- Google Tag Manager ID
- Social links (Facebook/Instagram/YouTube)
- WhatsApp number, Google Maps URL

Campaign links:
- Create in admin settings
- Public redirection pattern: `/c/[slug]`
- App auto-attaches UTM parameters and optional coupon

## Deployment Notes

- Any Next.js host works (Vercel, VPS, etc.)
- Set production `DATABASE_URL`, `JWT_SECRET`, and `NEXT_PUBLIC_APP_URL`
- Run migrations with Prisma in your deployment pipeline
