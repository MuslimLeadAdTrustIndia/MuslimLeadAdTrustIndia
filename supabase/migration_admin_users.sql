-- =========================================================================
-- MLAT Security & Admin Users Migration
-- Run this in Supabase Dashboard -> SQL Editor
-- =========================================================================

-- 1. Create admin_users table for database-based admin authentication
create table if not exists public.admin_users (
  id bigint generated always as identity primary key,
  email text not null unique,
  password_hash text not null,
  role text not null default 'admin',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Enable RLS (Zero public access - only accessible via service-role / supabaseAdmin)
alter table public.admin_users enable row level security;
drop policy if exists "no public access admin_users" on public.admin_users;

-- 2. Insert initial admin user (from current .env)
insert into public.admin_users (email, password_hash, role)
values (
  'admin@mlat.com',
  '$2b$10$KYoiiWDLDAu1PcTfk2znb.5372oiiFsmaGdPhfFyzWtbIhu./u1Sm',
  'admin'
)
on conflict (email) do update 
set password_hash = excluded.password_hash,
    updated_at = now();

-- 3. Lock down public direct inserts for leads, donations, members
-- Since all submissions are handled by Next.js server route handlers using service-role,
-- direct anon API access should be blocked to prevent spam/injection.
alter table public.leads enable row level security;
drop policy if exists "public insert" on public.leads;

alter table public.donations enable row level security;
drop policy if exists "public insert donations" on public.donations;

alter table public.members enable row level security;
drop policy if exists "public insert members" on public.members;
