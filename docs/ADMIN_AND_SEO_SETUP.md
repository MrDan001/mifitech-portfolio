# MifiTech admin and content setup

The portfolio uses Supabase for enquiry, proposal, website-content and SEO storage. The admin also uses the `mifitech-media` Storage bucket for uploaded images.

## Environment variables

Set these in Vercel for Production and Preview:

- `SUPABASE_URL` — the Supabase project URL.
- `SUPABASE_SECRET_KEY` — the server-only Supabase secret key. The legacy `SUPABASE_SERVICE_ROLE_KEY` name is also accepted. Never add a `NEXT_PUBLIC_` prefix.
- `ADMIN_PASSWORD` — a unique, strong admin password.
- `ADMIN_SESSION_SECRET` — a random secret of at least 32 characters.
- `NEXT_PUBLIC_SITE_URL` — the canonical public portfolio URL.

Redeploy after changing environment variables.

## Database and storage

1. Open the Supabase SQL Editor.
2. Run `supabase/schema.sql`.
3. Confirm the `leads`, `proposals` and `site_settings` tables exist.
4. Confirm the `mifitech-media` storage bucket exists.
5. Visit `/admin` and sign in.

The application uses a server-only key for database and storage operations. Public visitors cannot read the lead or proposal tables through the browser client.

## What the admin can manage

- Homepage hero, sections, navigation, services, footer and contact details.
- Project cards, external website links, case-study text, project flyers and product-gallery URLs.
- Industry demo cards and their main detail-page headings and content.
- Website guide title, introduction, article sections and closing call to action.
- Studio principles, optional founder profile, FAQs and approved client testimonials.
- Global SEO title, description, target phrases, canonical URL and social metadata.
- Enquiries: search, filter by status, update status, export CSV and delete.
- Uploaded media: browse images, copy public URLs and delete files that are no longer in use.

The optional founder section remains hidden until profile information is added. Testimonials are empty by default; publish only quotes that clients have approved. Use genuine product screenshots in project galleries. Promotional flyers are not application screenshots.

## Proposals and payments

The admin can create shareable proposal links, and clients can review and accept the proposal. Payment instructions and payment status are currently managed manually in the admin. No card processor or automatic payment reconciliation is connected.

## Enquiry delivery

The public enquiry form attempts to store a lead in Supabase and uses FormSubmit to send an email notification to the studio contact address. If one service is temporarily unavailable, the form reports whether the enquiry was stored or emailed.

## Media

Images uploaded through the admin are limited to 5 MB and supported image formats. The media bucket is publicly readable so the website can display published images; writes and deletes are performed through authenticated server routes. Before deleting a file, check that it is not referenced by the homepage, a project flyer or a gallery.

## Search engine setup

The site publishes `/sitemap.xml` and `/robots.txt`, includes business structured data, and provides an editable website-building guide. Project pages have project-specific metadata.

After the production domain is live, verify it in Google Search Console and Bing Webmaster Tools, then submit `https://YOUR-DOMAIN/sitemap.xml`. Search engines control crawl and indexing schedules; rankings are not guaranteed.
