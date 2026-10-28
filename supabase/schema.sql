-- MLAT: Supabase schema (bilingual: *_en / *_hi). Includes donations (manual UPI receipt verification).
-- Run in Supabase SQL Editor. Safe to re-run.

-- ============ Helpers ============
-- Auth is custom JWT handled in Next.js. All admin writes go through server
-- routes using the service role key (bypasses RLS). So RLS only needs public rules.
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- ============ Tables ============
-- Single-block sections: home_hero, home_about, home_donation_banner,
-- prisoners_banner, legal_help_intro, site_general, site_social, site_seo
create table if not exists public.site_content (
  key text primary key,
  value jsonb not null default '{}'::jsonb,   -- bilingual keys inside, e.g. {"title_en":"..","title_hi":".."}
  updated_at timestamptz not null default now()
);

create table if not exists public.home_stats (
  id bigint generated always as identity primary key,
  value text not null,
  label_en text not null,
  label_hi text not null default '',
  sort_order int not null default 0
);

create table if not exists public.aims (
  id bigint generated always as identity primary key,
  clause text not null,
  category text not null check (category in ('legal','rights','education','health','welfare','cells')),
  title_en text not null,
  title_hi text not null default '',
  summary_en text not null default '',
  summary_hi text not null default '',
  original_text text not null default '',
  is_published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.office_bearers (
  id bigint generated always as identity primary key,
  name_en text not null,
  name_hi text not null default '',
  role_en text not null,
  role_hi text not null default '',
  description_en text not null default '',
  description_hi text not null default '',
  address_en text not null default '',
  address_hi text not null default '',
  photo_url text,
  sort_order int not null default 0
);

create table if not exists public.prisoner_support_cards (
  id bigint generated always as identity primary key,
  title_en text not null, title_hi text not null default '',
  text_en text not null default '', text_hi text not null default '',
  sort_order int not null default 0
);

create table if not exists public.prisoner_steps (
  id bigint generated always as identity primary key,
  title_en text not null, title_hi text not null default '',
  text_en text not null default '', text_hi text not null default '',
  sort_order int not null default 0
);

create table if not exists public.legal_practice_areas (
  id bigint generated always as identity primary key,
  title_en text not null, title_hi text not null default '',
  text_en text not null default '', text_hi text not null default '',
  sort_order int not null default 0
);

create table if not exists public.legal_eligibility (
  id bigint generated always as identity primary key,
  text_en text not null, text_hi text not null default '',
  sort_order int not null default 0
);

create table if not exists public.legal_actions (
  id bigint generated always as identity primary key,
  title_en text not null, title_hi text not null default '',
  court_en text not null, court_hi text not null default '',
  status text not null default 'Active' check (status in ('Active','Pending','Resolved')),
  action_date date not null default current_date,
  summary_en text not null default '', summary_hi text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists public.gallery_images (
  id bigint generated always as identity primary key,
  url text not null,                 -- ImageKit URL
  file_id text,                      -- ImageKit fileId (needed for deletion)
  alt_en text not null default '',
  alt_hi text not null default '',
  category text not null default 'General',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.donations (
  id bigint generated always as identity primary key,
  donor_name text not null,
  email text not null,
  phone text not null,
  amount numeric not null,
  utr_number text not null,
  receipt_url text not null default '',
  receipt_file_id text,
  mode text not null default 'UPI',
  status text not null default 'Pending' check (status in ('Pending','Completed','Failed')),
  notes text not null default '',
  created_at timestamptz not null default now()
);

-- Verification workflow + official receipt number (safe to re-run).
alter table public.donations add column if not exists verified_by text;
alter table public.donations add column if not exists verified_at timestamptz;
alter table public.donations add column if not exists receipt_no text;
-- One donation per UTR. If this fails, delete the duplicate rows first.
create unique index if not exists donations_utr_unique on public.donations (utr_number);
create unique index if not exists donations_receipt_no_unique on public.donations (receipt_no) where receipt_no is not null;

-- Memberships (Annual / Life / Volunteer). Fee is set server-side from the type.
create table if not exists public.members (
  id bigint generated always as identity primary key,
  member_no text,
  membership_type text not null check (membership_type in ('Annual','Life','Volunteer')),
  full_name text not null,
  guardian_name text not null default '',
  dob date,
  email text not null,
  phone text not null,
  address text not null default '',
  city text not null default '',
  state text not null default '',
  pincode text not null default '',
  occupation text not null default '',
  id_proof_type text not null default '',
  id_proof_number text not null default '',
  interest text not null default '',
  fee numeric not null default 0,
  utr_number text,
  receipt_url text not null default '',
  receipt_file_id text,
  status text not null default 'Pending' check (status in ('Pending','Active','Rejected','Expired')),
  start_date date,
  end_date date,
  notes text not null default '',
  verified_by text,
  verified_at timestamptz,
  created_at timestamptz not null default now()
);
alter table public.members add column if not exists photo_url text not null default '';
alter table public.members add column if not exists photo_file_id text;
create unique index if not exists members_utr_unique on public.members (utr_number) where utr_number is not null;
create unique index if not exists members_member_no_unique on public.members (member_no) where member_no is not null;

alter table public.members enable row level security;
drop policy if exists "public insert members" on public.members;
create policy "public insert members" on public.members for insert with check (true);

create table if not exists public.leads (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  phone text not null default 'Not provided',
  message text not null,
  status text not null default 'New' check (status in ('New','In Progress','Resolved')),
  created_at timestamptz not null default now()
);

drop trigger if exists trg_site_content_touch on public.site_content;
create trigger trg_site_content_touch before update on public.site_content
for each row execute function public.touch_updated_at();

-- ============ RLS ============
do $$
declare t text;
begin
  foreach t in array array['site_content','home_stats','aims','office_bearers','prisoner_support_cards',
    'prisoner_steps','legal_practice_areas','legal_eligibility','legal_actions','gallery_images'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('create policy "public read" on public.%I for select using (true)', t);
  end loop;
end $$;

-- leads: anon can only INSERT (contact form); no public read. Admin reads via service role.
alter table public.leads enable row level security;
drop policy if exists "public insert" on public.leads;
create policy "public insert" on public.leads for insert with check (true);

-- donations: public can submit receipts; admin reads and updates via service role.
alter table public.donations enable row level security;
drop policy if exists "public insert donations" on public.donations;
create policy "public insert donations" on public.donations for insert with check (true);

-- ============ Seed (English from current site; fill *_hi later from admin) ============
insert into public.home_stats (value, label_en, sort_order)
select * from (values
  ('500+','Families Supported',1),('120+','Legal Cases Assisted',2),
  ('50+','Volunteers',3),('10+','Awareness Programs',4)) v
where not exists (select 1 from public.home_stats);

insert into public.prisoner_support_cards (title_en, text_en, sort_order)
select * from (values
  ('Jail Visits & Inspection','Routine legal inspection of correctional homes to monitor conditions and identify cases needing urgent help.',1),
  ('Family Counselling','Guidance and emotional support for families of prisoners during difficult and uncertain times.',2),
  ('Ration & Essentials','Distribution of monthly rations, sewing machines and essential supplies to families facing financial hardship.',3),
  ('Bail Assistance','Timely filing of bail applications and furnishing of sureties to prevent prolonged, unjust detention.',4)) v
where not exists (select 1 from public.prisoner_support_cards);

insert into public.prisoner_steps (title_en, text_en, sort_order)
select * from (values
  ('Identification','Jail visits and case intake to identify under-trials, sentenced prisoners and those detained beyond term.',1),
  ('Legal Assessment','Our legal panel reviews case records, FIRs and court history to determine the best course of relief.',2),
  ('Representation','Filing bail applications, arranging sureties, and representing cases before courts and tribunals.',3),
  ('Rehabilitation','Post-release counselling, family reintegration support, and vocational guidance for a dignified return to society.',4)) v
where not exists (select 1 from public.prisoner_steps);

insert into public.legal_practice_areas (title_en, text_en, sort_order)
select * from (values
  ('Bail Assistance & Rehabilitation','Filing timely bail applications, furnishing sureties, and post-release reintegration support.',1),
  ('Civil, Criminal & Constitutional Aid','Full-spectrum litigation assistance in trial courts, High Courts and the Supreme Court.',2),
  ('Public Interest Litigation','Strategic PILs defending constitutional guarantees and civil liberties for the community.',3),
  ('Mediation & Family Disputes','Peaceful alternative dispute resolution for matrimonial, family and community conflicts.',4),
  ('Protection of Religious & Waqf Property','Legal defense of mosques, dargahs, graveyards and heritage sites against encroachment.',5),
  ('Legal Literacy Camps','On-ground legal aid camps in villages, backward tehsils, and urban slums.',6)) v
where not exists (select 1 from public.legal_practice_areas);

insert into public.site_content (key, value) values
  ('home_hero','{}'),('home_about','{}'),('home_donation_banner','{}'),
  ('prisoners_banner','{"title_en":"Support, Rights and Rehabilitation"}'),
  ('legal_help_intro','{"title_en":"No One Should Be Denied Justice for Lack of Means"}'),
  ('site_general','{}'),('site_social','{}'),('site_seo','{}')
on conflict (key) do nothing;

