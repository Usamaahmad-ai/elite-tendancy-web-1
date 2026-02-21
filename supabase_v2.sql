-- Elite Tendancy v2 core schema (Day 2 hardened)
create extension if not exists pgcrypto;

-- =====================================
-- Tables
-- =====================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('tenant','landlord','admin','owner')),
  full_name text,
  phone text,
  created_at timestamptz default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  landlord_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  city text,
  postcode text,
  price_pcm numeric(10,2) not null check (price_pcm > 0),
  bedrooms int,
  bathrooms numeric(3,1),
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  tenant_id uuid references auth.users(id) on delete set null,
  name text not null,
  email text not null,
  message text not null,
  status text not null default 'new' check (status in ('new','contacted','closed')),
  created_at timestamptz default now()
);

create table if not exists public.viewing_requests (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  tenant_id uuid references auth.users(id) on delete set null,
  requested_at timestamptz,
  status text not null default 'pending' check (status in ('pending','confirmed','completed','cancelled')),
  created_at timestamptz default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  property_id uuid not null references public.properties(id) on delete cascade,
  tenant_id uuid not null references auth.users(id) on delete cascade,
  landlord_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'submitted' check (status in ('submitted','reviewing','approved','rejected')),
  created_at timestamptz default now()
);

create table if not exists public.cms_pages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  body jsonb not null default '{}'::jsonb,
  published boolean default false,
  updated_by uuid references auth.users(id),
  updated_at timestamptz default now()
);

create table if not exists public.automation_events (
  id uuid primary key default gen_random_uuid(),
  event_type text not null,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'queued' check (status in ('queued','processed','failed')),
  created_at timestamptz default now()
);

-- =====================================
-- Indexes
-- =====================================
create index if not exists idx_profiles_role on public.profiles(role);
create index if not exists idx_properties_landlord on public.properties(landlord_id);
create index if not exists idx_properties_status on public.properties(status);
create index if not exists idx_properties_city on public.properties(city);
create index if not exists idx_properties_price on public.properties(price_pcm);
create index if not exists idx_inquiries_property on public.inquiries(property_id);
create index if not exists idx_inquiries_tenant on public.inquiries(tenant_id);
create index if not exists idx_viewings_property on public.viewing_requests(property_id);
create index if not exists idx_applications_property on public.applications(property_id);
create index if not exists idx_applications_tenant on public.applications(tenant_id);
create index if not exists idx_applications_landlord on public.applications(landlord_id);
create index if not exists idx_cms_slug on public.cms_pages(slug);
create index if not exists idx_automation_status on public.automation_events(status);

-- =====================================
-- Helpers
-- =====================================
create or replace function public.current_role()
returns text
language sql
stable
as $$
  select role from public.profiles where id = auth.uid()
$$;

create or replace function public.is_admin_or_owner()
returns boolean
language sql
stable
as $$
  select exists(
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin','owner')
  )
$$;

-- =====================================
-- RLS
-- =====================================
alter table public.profiles enable row level security;
alter table public.properties enable row level security;
alter table public.inquiries enable row level security;
alter table public.viewing_requests enable row level security;
alter table public.applications enable row level security;
alter table public.cms_pages enable row level security;
alter table public.automation_events enable row level security;

-- Clean old policies
DO $$
DECLARE r record;
BEGIN
  FOR r IN (
    select tablename, policyname
    from pg_policies
    where schemaname='public'
      and tablename in ('profiles','properties','inquiries','viewing_requests','applications','cms_pages','automation_events')
  ) LOOP
    EXECUTE format('drop policy if exists %I on public.%I', r.policyname, r.tablename);
  END LOOP;
END $$;

-- profiles
create policy profiles_select_own_or_admin on public.profiles
for select
using (id = auth.uid() or public.is_admin_or_owner());

create policy profiles_update_own on public.profiles
for update
using (id = auth.uid())
with check (id = auth.uid());

-- properties
create policy properties_public_select_published on public.properties
for select
using (
  status = 'published'
  or landlord_id = auth.uid()
  or public.is_admin_or_owner()
);

create policy properties_landlord_insert on public.properties
for insert
with check (
  landlord_id = auth.uid()
  and public.current_role() = 'landlord'
);

create policy properties_landlord_update on public.properties
for update
using (landlord_id = auth.uid() or public.is_admin_or_owner())
with check (landlord_id = auth.uid() or public.is_admin_or_owner());

create policy properties_landlord_delete on public.properties
for delete
using (landlord_id = auth.uid() or public.is_admin_or_owner());

-- inquiries
create policy inquiries_select_owner_participants on public.inquiries
for select
using (
  tenant_id = auth.uid()
  or exists(select 1 from public.properties p where p.id = property_id and p.landlord_id = auth.uid())
  or public.is_admin_or_owner()
);

create policy inquiries_insert_public on public.inquiries
for insert
with check (true);

create policy inquiries_update_landlord_admin on public.inquiries
for update
using (
  exists(select 1 from public.properties p where p.id = property_id and p.landlord_id = auth.uid())
  or public.is_admin_or_owner()
)
with check (
  exists(select 1 from public.properties p where p.id = property_id and p.landlord_id = auth.uid())
  or public.is_admin_or_owner()
);

-- viewing_requests
create policy viewings_select_participants on public.viewing_requests
for select
using (
  tenant_id = auth.uid()
  or exists(select 1 from public.properties p where p.id = property_id and p.landlord_id = auth.uid())
  or public.is_admin_or_owner()
);

create policy viewings_insert_tenant on public.viewing_requests
for insert
with check (tenant_id = auth.uid() or tenant_id is null);

create policy viewings_update_landlord_admin on public.viewing_requests
for update
using (
  exists(select 1 from public.properties p where p.id = property_id and p.landlord_id = auth.uid())
  or public.is_admin_or_owner()
)
with check (
  exists(select 1 from public.properties p where p.id = property_id and p.landlord_id = auth.uid())
  or public.is_admin_or_owner()
);

-- applications
create policy applications_select_participants on public.applications
for select
using (
  tenant_id = auth.uid()
  or landlord_id = auth.uid()
  or public.is_admin_or_owner()
);

create policy applications_insert_tenant on public.applications
for insert
with check (tenant_id = auth.uid());

create policy applications_update_landlord_admin on public.applications
for update
using (landlord_id = auth.uid() or public.is_admin_or_owner())
with check (landlord_id = auth.uid() or public.is_admin_or_owner());

-- cms_pages
create policy cms_public_read on public.cms_pages
for select
using (published = true or public.is_admin_or_owner());

create policy cms_admin_write on public.cms_pages
for all
using (public.is_admin_or_owner())
with check (public.is_admin_or_owner());

-- automation_events
create policy automation_admin_only on public.automation_events
for all
using (public.is_admin_or_owner())
with check (public.is_admin_or_owner());

-- =====================================
-- Seed (safe demo)
-- =====================================
insert into public.cms_pages (slug, title, body, published)
values
('home', 'Elite Tendancy Home', '{"hero":"Premium Rental Marketplace"}', true),
('about', 'About Elite Tendancy', '{"content":"High-trust UK rental platform."}', true)
on conflict (slug) do nothing;
