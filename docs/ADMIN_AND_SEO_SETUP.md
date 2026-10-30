# MifiTech admin setup

The admin uses Supabase for durable lead, proposal and SEO-setting storage.

1. Create a dedicated Supabase project for MifiTech (do not reuse a different product's production database).
2. Open the Supabase SQL Editor and run `supabase/schema.sql`.
3. In the Supabase project settings, copy the Project URL and the service-role key.
4. Add these environment variables to the Vercel project for Production and Preview:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-side only; never use a NEXT_PUBLIC_ prefix)
   - `ADMIN_PASSWORD` (a long unique password)
   - `ADMIN_SESSION_SECRET` (a random secret of at least 32 characters)
   - `NEXT_PUBLIC_SITE_URL` (the final canonical website URL)
5. Redeploy. Visit `/admin` and sign in.

The admin includes a lead pipeline, proposal builder, private client proposal links and manual payment-status tracking. Proposal links allow clients to review and accept the agreed scope; payment instructions are entered in the proposal. No card processor is connected by this change.

The SEO tab controls the global page title, description, target phrases, canonical URL and social metadata. The site also publishes `/sitemap.xml`, `/robots.txt`, business structured data and a practical guide targeting website-building searches in Nigeria.

After the production domain is live, verify it in Google Search Console and Bing Webmaster Tools, then submit `https://YOUR-DOMAIN/sitemap.xml`. Search engines decide when to crawl and index pages; rankings are not guaranteed.
