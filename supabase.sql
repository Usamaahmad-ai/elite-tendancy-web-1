create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  full_name text,
  email text not null,
  interest text,
  message text not null,
  source_page text,
  created_at timestamptz not null default now()
);

alter table public.contact_inquiries enable row level security;

drop policy if exists "Allow anonymous inserts" on public.contact_inquiries;
create policy "Allow anonymous inserts"
  on public.contact_inquiries
  for insert
  to anon
  with check (true);

-- optional admin read policy for authenticated users
-- drop policy if exists "Allow authenticated read" on public.contact_inquiries;
-- create policy "Allow authenticated read"
--   on public.contact_inquiries for select to authenticated using (true);
