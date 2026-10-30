# MifiTech admin and website content setup

The Studio Control Centre at /admin uses Supabase for durable enquiries, proposals, manual payments, website content, SEO settings, business details and media metadata. Public pages use committed defaults until website content has been saved in Supabase.

## 1. Create the MifiTech database

1. Create a dedicated Supabase project for MifiTech. Do not reuse a different product's production database.
2. Open the Supabase SQL Editor.
3. Run the complete supabase/schema.sql file. It is safe to run again: tables and the media bucket use create-if-not-exists/upsert statements.
4. The script creates the leads, proposals, payments, media_assets and site_settings tables. It enables Row Level Security and does not create anonymous policies.
5. The script also creates a public-delivery bucket named mifitech-media, with an 8 MB image limit. Public access is for image viewing only; server-side uploads and deletes still require the service-role key and a valid admin session.

## 2. Configure Vercel

Add the following environment variables to the MifiTech Vercel project for Preview and Production:

- SUPABASE_URL — the project URL.
- SUPABASE_SERVICE_ROLE_KEY — server-side service-role key. Never use a NEXT_PUBLIC_ prefix and never expose this value in the browser.
- ADMIN_PASSWORD — a long, unique admin password.
- ADMIN_SESSION_SECRET — a random signing secret of at least 32 characters.
- NEXT_PUBLIC_SITE_URL — the final canonical website URL, including https://.

Redeploy after setting or changing the variables. Then visit /admin and sign in.

## 3. Use the admin

- Dashboard: review current enquiries, proposals, payments and active project counts.
- Enquiries: read contact requests, search the list, and update a lead status.
- Proposals & Payments: create a private client proposal URL; record transfers, cash or other payments manually; update a payment record if it is corrected or refunded.
- Homepage: change the hero copy, image URL, buttons, section headings/descriptions and displayed enquiry email.
- Services, Portfolio and Demo Studio: add or remove cards, edit text/image URLs, choose visibility and reorder items. Save the list to publish changes.
- Media Library: upload a JPEG, PNG, WebP or AVIF up to 8 MB, then copy its public URL into an image field.
- SEO: update the site title, description, keyword phrases, canonical URL and social preview.
- Settings: edit business name, public email, phone, service location and tagline.

A newly added demo card uses a generic demo concept page when its slug does not match one of the five custom demo designs. A newly added portfolio item uses the generic project detail view.

## 4. Payment handling

Payment records in this release are manual records made by the studio owner. A status selected as Paid means the owner has marked the transfer/payment as received; it is not verified by Paystack, Flutterwave or a bank API. Automatic checkout and webhook verification are future integrations.

## 5. Search engine setup

The website publishes its sitemap and robots.txt. After choosing the final domain, verify it in Google Search Console and Bing Webmaster Tools and submit https://YOUR-DOMAIN/sitemap.xml. Search engines decide when to crawl and index pages; rankings are not guaranteed.

## Security notes

- Admin mutations are protected by the signed HTTP-only mifi_admin cookie and server-side isAdmin() check.
- The service-role key is used only inside server code.
- Lead, proposal, payment, media metadata and website settings tables stay behind RLS with no anonymous policies.
- Proposal access is via an unguessable token; public proposal responses must not contain internal client email or admin data.
