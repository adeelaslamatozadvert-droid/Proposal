# Supabase Migrations

The current app expects all of these migrations to be present and applied in order:

1. `20260421000001_create_proposals_table.sql`
2. `20260421000002_add_proposal_pdf_and_response_columns.sql`
3. `20260422000003_create_companies_table.sql`
4. `20260422000004_create_company_services_table.sql`
5. `20260422000005_create_draft_proposals_table.sql`
6. `20260422000006_create_proposal_responses_table.sql`
7. `20260424000007_add_company_branding_fields.sql`

## What they cover

- `proposals`: main sent proposal records, PDF storage, and `response_at`
- `companies`: company branding, currency, reply-to email, website, registration number, and social links
- `company_services`: reusable services per company
- `draft_proposals`: in-progress proposal autosaves
- `proposal_responses`: response event tracking table

## Audit result

The migration set in the repo is complete for the current codebase. Two important schema dependencies are:

- `response_at` is required for accept / decline status updates
- the branding fields from `20260424000007_add_company_branding_fields.sql` are required for the full company form

## Important note

If an older database has not applied `20260421000002_add_proposal_pdf_and_response_columns.sql`, proposal list endpoints can still work in fallback mode, but the database should still be brought up to date.
