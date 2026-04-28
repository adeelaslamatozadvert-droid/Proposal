# Quick Start

## 1. Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 2. Configure local environment

Set these values in `.env.local`:

```env
ADMIN_USERNAME="admin"
ADMIN_PASSWORD_HASH="scrypt$replace-with-salt$replace-with-hash"
AUTH_SESSION_SECRET="replace-with-a-random-secret"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

SMTP settings are optional for local testing. Without them, the app can still be used for editing and preview workflows.

## 3. Apply database migrations

Make sure all SQL files in `supabase/migrations` are applied to the active database. See [SUPABASE_MIGRATIONS.md](/d:/Development%20and%20Plugin%20Projects/Proposal/SUPABASE_MIGRATIONS.md).

## 4. Sign in

Use the `ADMIN_USERNAME` value and the password that matches your `ADMIN_PASSWORD_HASH`.

## 5. Use the app

- Add companies in `/admin/companies`
- Add services in `/admin/services`
- Build and send proposals in `/admin/proposals`
- Review sent proposals in `/admin/submitted-proposals`
