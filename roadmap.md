# MifiTech Studio Control Centre — Roadmap

## Product goal
One secure, mobile-friendly workspace to run MifiTech and manage the public website without editing code. Visual direction: warm off-white, charcoal, restrained orange, clear labels and generous whitespace.

## Admin navigation
1. **Dashboard** — new enquiries, open proposals, projects in progress, received payments and recent activity.
2. **Enquiries** — customer and business details, project requirements, source/demo, status, search and follow-up.
3. **Proposals & Payments** — create private proposals, track acceptance, and manually record deposits, balances and refunds.
4. **Homepage** — edit hero copy, image, buttons, section headings, about/process/guide/contact copy and enquiry email.
5. **Services** — add, edit, remove, publish/hide and reorder service cards.
6. **Portfolio** — manage projects, thumbnails, descriptions, category labels, live URLs, visibility and order.
7. **Demo Studio** — manage industry concepts, images, brand labels, descriptions, tags, visibility and order.
8. **Media Library** — upload, browse, copy image URLs and remove unused media.
9. **SEO** — title, meta description, phrases, canonical URL and social preview metadata.
10. **Settings** — business identity, enquiry email, phone, service location, tagline and sign-out.

## Phase 1 — Core control centre (current build)
- [x] Secure password sign-in with signed HTTP-only sessions.
- [x] Responsive desktop sidebar and mobile navigation.
- [x] Dashboard summary and latest enquiries.
- [x] Searchable enquiry pipeline and status updates.
- [x] Proposal builder and private client proposal links.
- [x] Manual payment ledger linked to proposals (method, reference, date, amount, status and note).
- [x] Homepage content editor with safe defaults before database setup.
- [x] Service, portfolio and demo managers with create/edit/hide/delete/reorder.
- [x] Media library with server-side Supabase Storage upload/delete.
- [x] SEO and business settings editors.
- [x] Public homepage consumes saved content with committed defaults as fallback.
- [x] Repeatable SQL and setup instructions.

## Phase 2 — Studio operations
- Staff accounts and role permissions (owner, editor, sales/finance).
- Project records, milestones, tasks and client status pages.
- Email notifications and proposal reminders.
- Activity/audit log, content drafts, preview links and scheduled publishing.

## Phase 3 — Integrations and growth
- Paystack or Flutterwave checkout and verified webhooks. Until integrated, payments are manual owner-entered records and are not automatically verified.
- Lead-source reporting, conversion trends and analytics.
- Richer per-demo page builder and reusable content blocks.
- Search Console and analytics integrations.

## Data and security
- Supabase is the persistent store. The service-role key stays server-side and is never exposed to the browser.
- All admin reads/writes go through server endpoints that validate the signed admin session.
- The media bucket is public for image delivery only; upload/delete remains protected server-side.
- RLS stays enabled. No anonymous policies for leads, proposals, payments, media metadata or site settings.
- Website copy is stored in site_settings JSON documents: homepage, SEO and business. Public pages fall back to repository defaults if Supabase is not configured.
- Proposal tokens are unguessable; public proposal pages do not expose private admin records.
- The payment ledger is manual in this phase; no processor integration or automatic verification is implied.

## Launch checklist
1. Create a dedicated MifiTech Supabase project.
2. Run supabase/schema.sql in the Supabase SQL editor (safe to re-run).
3. Configure SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_PASSWORD, ADMIN_SESSION_SECRET and NEXT_PUBLIC_SITE_URL in Vercel Preview and Production.
4. Redeploy and sign in at /admin.
5. Upload a test image, set it as the hero image and confirm it appears publicly.
6. Submit a test enquiry, create a test proposal and record a test payment.
7. Confirm business contact details and canonical domain, then submit the sitemap to search engines.

## Definition of done
From a phone or desktop, an authorised owner can review enquiries, create/share proposals, record payments, update homepage content, manage services/portfolio/demos, upload/reuse images and update SEO/business details. Changes persist in Supabase and appear on public pages without a code edit.
