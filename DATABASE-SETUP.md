# Free backend setup: Neon + Cloudinary

This version no longer uses Supabase.

## 1) Neon PostgreSQL
Create a free Neon project, copy the connection string into `.env.local` as `DATABASE_URL`, then run `neon-schema.sql` in Neon SQL Editor.

## 2) Cloudinary
Create a free Cloudinary account. Copy Cloud Name, API Key and API Secret into `.env.local`.

## 3) Admin
The local default password is `admin123`.
Set `ADMIN_PASSWORD=admin123` in `.env.local` for the requested password. Change it before public launch.

## 4) Run
npm install
npm run dev

Open `/admin`.
