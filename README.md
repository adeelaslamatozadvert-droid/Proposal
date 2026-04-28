# Proposal Maker

Proposal Maker is a Next.js admin tool for managing companies, services, draft proposals, sent proposals, and client response flows on top of Supabase.

## What it does

- Secure admin login with hashed password verification and signed session cookies
- Company branding management with logo, website, registration number, and social links
- Company-specific service catalogs
- Proposal drafting, preview, PDF generation, and email sending
- Submitted proposal tracking with accept / decline / payment-pending flows
- Supabase-backed storage for companies, services, drafts, and proposals

## Project docs

- [QUICKSTART.md](/d:/Development%20and%20Plugin%20Projects/Proposal/QUICKSTART.md)
- [SETUP.md](/d:/Development%20and%20Plugin%20Projects/Proposal/SETUP.md)
- [SUPABASE_MIGRATIONS.md](/d:/Development%20and%20Plugin%20Projects/Proposal/SUPABASE_MIGRATIONS.md)

## Main routes

- `/login`
- `/admin/proposals`
- `/admin/companies`
- `/admin/services`
- `/admin/submitted-proposals`

## Tech notes

- App Router project on Next.js 16
- Data APIs use Supabase via server-side route handlers
- Some client views keep short-lived in-memory caches for faster page switching
