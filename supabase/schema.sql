create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  business text,
  project_type text,
  details text not null,
  source_url text,
  demo text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.proposals (
  id uuid primary key default gen_random_uuid(),
  token text not null unique,
  client_name text not null,
  client_email text not null,
  business_name text not null,
  scope text not null,
  timeline text not null,
  amount numeric(14,2) not null,
  currency text not null default 'NGN',
  payment_terms text,
  payment_instructions text,
  status text not null default 'sent',
  accepted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.leads enable row level security;
alter table public.proposals enable row level security;
alter table public.site_settings enable row level security;

-- The app uses a server-only Supabase secret/service-role key.
-- No anonymous or authenticated policies are intentionally created.
grant usage on schema public to service_role;
grant all privileges on table public.leads to service_role;
grant all privileges on table public.proposals to service_role;
grant all privileges on table public.site_settings to service_role;

 
-- Publicly readable image bucket; writes happen only through the authenticated server API.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'mifitech-media',
  'mifitech-media',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;
