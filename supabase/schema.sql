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
  amount_paid numeric(14,2) not null default 0,
  payment_status text not null default 'unpaid',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.proposals add column if not exists amount_paid numeric(14,2) not null default 0;
alter table public.proposals add column if not exists payment_status text not null default 'unpaid';

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  proposal_id uuid references public.proposals(id) on delete set null,
  amount numeric(14,2) not null check (amount > 0),
  currency text not null default 'NGN',
  method text not null default 'other',
  reference text,
  note text,
  status text not null default 'paid',
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  file_name text not null,
  storage_path text not null unique,
  public_url text not null,
  content_type text not null,
  size_bytes bigint not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on public.leads(created_at desc);
create index if not exists proposals_created_at_idx on public.proposals(created_at desc);
create index if not exists payments_created_at_idx on public.payments(created_at desc);
create index if not exists payments_proposal_id_idx on public.payments(proposal_id);

alter table public.leads enable row level security;
alter table public.proposals enable row level security;
alter table public.payments enable row level security;
alter table public.media_assets enable row level security;
alter table public.site_settings enable row level security;

-- Private database tables: no anonymous read/write policies are created.
-- The server uses SUPABASE_SERVICE_ROLE_KEY after validating the signed admin session.

-- Public image delivery; uploads and deletes are performed by the authenticated server using the service role.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'mifitech-media',
  'mifitech-media',
  true,
  8388608,
  array['image/jpeg','image/png','image/webp','image/avif']
)
on conflict (id) do update
set public = true,
    file_size_limit = 8388608,
    allowed_mime_types = array['image/jpeg','image/png','image/webp','image/avif'];
