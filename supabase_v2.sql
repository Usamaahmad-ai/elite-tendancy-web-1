-- Elite Tendancy v2 core schema (Day 1 draft)
create extension if not exists pgcrypto;

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
  price_pcm numeric(10,2) not null,
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
