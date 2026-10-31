# MifiTech — Websites & Digital Products

A Next.js portfolio and client-acquisition website for MifiTech.

## Website features

- Responsive agency homepage with editable content sections.
- Admin workspace at `/admin` for editing homepage copy, navigation, service cards, demo cards, portfolio projects, live website links, SEO settings, enquiries and proposals.
- Portfolio projects and live website links are managed separately. By default, only Garrison Market has a live website button: `https://gmstock.co`.
- Fifteen industry website concept previews:
  - `/demos/restaurant`
  - `/demos/beauty-salon`
  - `/demos/fashion-boutique`
  - `/demos/event-planner`
  - `/demos/printing`
  - `/demos/auto-workshop`
  - `/demos/laundry`
  - `/demos/catering`
  - `/demos/interior-design`
  - `/demos/cleaning`
  - `/demos/private-clinic`
  - `/demos/school`
  - `/demos/logistics`
  - `/demos/real-estate`
  - `/demos/car-dealership`
- Admin-added demo cards can use the reusable concept page template by choosing a unique slug.
- Existing project case studies under `/projects/[slug]`.

All industry demos use fictional sample brands and illustrative content. They are concept previews, not client websites.

## Connect the portfolio CMS

Use a **dedicated Supabase project for this portfolio**. Do not reuse a database already connected to another app.

1. Create a new Supabase project.
2. Open its SQL Editor and run `supabase/schema.sql`.
3. In the Vercel project settings, add these server-side environment variables:
   - `SUPABASE_URL`: the dedicated portfolio project's Project URL.
   - `SUPABASE_SECRET_KEY`: a server-only secret API key. Never prefix it with `NEXT_PUBLIC_`.
   - `ADMIN_PASSWORD`: a long, unique admin password.
   - `ADMIN_SESSION_SECRET`: a random secret with at least 32 characters.
   - `NEXT_PUBLIC_SITE_URL`: the production website origin.
4. Redeploy the Vercel project after setting the variables.
5. Open `/admin` and sign in.

A legacy `SUPABASE_SERVICE_ROLE_KEY` can be used instead of `SUPABASE_SECRET_KEY`, but it must remain server-only. The public website uses safe defaults until the CMS database is connected and content is saved.

## Admin content management

The Website Content tab manages:
- Hero copy and calls to action.
- Homepage section headings and descriptions.
- Navigation links.
- Service cards.
- Industry demo cards, visibility and destinations.
- Portfolio cards, live website URLs and GitHub repository links.
- Process steps and footer copy.

To remove a project's live website button, clear its Live website URL. Garrison Market is preconfigured with `https://gmstock.co`; other project live-site fields are blank. Image fields accept an existing local asset path or an HTTPS image URL. The Website Content tab can also upload JPG, PNG, WebP, AVIF and GIF files up to 5 MB into the portfolio's public Supabase Storage bucket; uploaded media is served from that bucket.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
