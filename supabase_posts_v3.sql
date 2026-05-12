-- Create cms_posts table for blog functionality
create table if not exists public.cms_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  body text not null,
  category text,
  featured_image text,
  read_time text,
  status text not null default 'draft' check (status in ('draft', 'published', 'archived')),
  author_id uuid references auth.users(id) on delete set null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Create indexes for better query performance
create index if not exists cms_posts_slug_idx on public.cms_posts(slug);
create index if not exists cms_posts_status_idx on public.cms_posts(status);
create index if not exists cms_posts_published_at_idx on public.cms_posts(published_at);
create index if not exists cms_posts_category_idx on public.cms_posts(category);
create index if not exists cms_posts_author_id_idx on public.cms_posts(author_id);

-- Enable Row Level Security (RLS)
alter table public.cms_posts enable row level security;

-- RLS Policy: Anyone can read published posts
create policy "Published posts are readable by everyone"
  on public.cms_posts
  for select
  using (status = 'published' OR auth.uid() = author_id OR auth.jwt() ->> 'user_role' IN ('admin', 'owner'));

-- RLS Policy: Only authenticated admins/owners can create posts
create policy "Only admins can create posts"
  on public.cms_posts
  for insert
  with check (auth.jwt() ->> 'user_role' IN ('admin', 'owner'));

-- RLS Policy: Only admins/owners and post authors can update posts
create policy "Admins and authors can update posts"
  on public.cms_posts
  for update
  using (auth.uid() = author_id OR auth.jwt() ->> 'user_role' IN ('admin', 'owner'))
  with check (auth.uid() = author_id OR auth.jwt() ->> 'user_role' IN ('admin', 'owner'));

-- RLS Policy: Only admins/owners can delete posts
create policy "Only admins can delete posts"
  on public.cms_posts
  for delete
  using (auth.jwt() ->> 'user_role' IN ('admin', 'owner'));

-- Insert sample published post for testing
insert into public.cms_posts (
  slug,
  title,
  excerpt,
  body,
  category,
  featured_image,
  read_time,
  status,
  published_at,
  created_at,
  updated_at
) values (
  'welcome-to-elite-tenancy-blog',
  'Welcome to Elite Tenancy Blog',
  'Discover market trends, property insights, and expert advice for landlords and tenants.',
  '<h2>Welcome to Our Blog</h2><p>Elite Tenancy is excited to launch our new blog platform where we share valuable insights about the rental market, property management tips, and guidance for both landlords and tenants.</p><h3>What You''ll Find Here</h3><ul><li>Market trends and analysis</li><li>Property management guides</li><li>Legal updates and regulations</li><li>Investment strategies</li><li>Tenant-focused advice</li></ul><p>Stay tuned for regular updates from our team of experts.</p>',
  'General',
  'https://images.unsplash.com/photo-1570129477492-45a003537e1f?w=800&h=400&fit=crop',
  '3 min read',
  'published',
  now(),
  now(),
  now()
);
