# Shekhar Events — Wedding & Event Decoration

Mobile-first Next.js website for Shekhar Events.

## Stack
- Next.js 14
- Neon PostgreSQL for photo metadata
- Cloudinary for event-image storage, CDN delivery and transformations
- Vercel for hosting

## Local setup

1. Install Node.js 18+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Create a free Neon project and put its pooled connection string in `DATABASE_URL`.
5. Run `neon-schema.sql` in the Neon SQL Editor.
6. Create a free Cloudinary account and add the cloud name, API key and API secret to `.env.local`.
7. Keep `ADMIN_PASSWORD=admin123` for local testing, then change it before publishing.
8. Run `npm run dev` and open http://localhost:3000.

## Admin
Open `/admin` and use the password from `ADMIN_PASSWORD` (default for this starter: `admin123`).

The admin page can upload multiple images from a phone or laptop. Images are converted to WebP in the browser and capped at 3840px before being sent to Cloudinary. The metadata and Cloudinary URL are stored in Neon.

## Deployment
Set the same environment variables in Vercel. Run `neon-schema.sql` once in Neon. No Supabase account is required.

## Free-tier note
Neon currently offers a Free plan with 0.5 GB database storage per project and 5 GB monthly public network transfer. Cloudinary currently offers a free plan with 25 monthly credits; 1 credit corresponds to 1 GB of storage, 1 GB of image bandwidth, or 1,000 transformations, with the credits shared across those resources. Check provider dashboards for current usage.
