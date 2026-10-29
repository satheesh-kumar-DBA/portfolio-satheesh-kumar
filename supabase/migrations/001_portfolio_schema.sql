-- Portfolio schema: every piece of content shown on the site lives here.
-- The frontend reads it through public.get_portfolio() using the publishable (anon) key.
-- Edit content from the Supabase Table Editor; writes are only possible with the service role.

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

-- Single-row profile (enforced by the boolean primary key)
create table if not exists public.profile (
  id               boolean primary key default true check (id),
  full_name        text not null,
  headline         text not null,                 -- e.g. "Database Administrator"
  greeting         text,                          -- e.g. "Hi, I'm"
  avatar_url       text,
  avatar_position  text default '50% 20%',        -- CSS object-position for the avatar crop
  resume_url       text,
  email            text,
  location         text,
  about            text,                          -- paragraphs separated by blank lines; **text** is highlighted
  contact_message  text,
  footer_text      text,                          -- supports {year} and {name} placeholders
  meta_title       text,
  updated_at       timestamptz not null default now()
);

-- Page sections: drive the navbar and section headings
create table if not exists public.sections (
  slug         text primary key,                  -- anchor id, e.g. "about"
  nav_label    text,
  title        text,
  show_in_nav  boolean not null default true,
  is_visible   boolean not null default true,
  sort_order   int not null default 0
);

-- Free-form UI labels (sub-headings etc.), keyed by name
create table if not exists public.site_text (
  key    text primary key,
  value  text not null
);

create table if not exists public.social_links (
  id               bigint generated always as identity primary key,
  platform         text not null,                 -- github | linkedin | email ...
  label            text not null,                 -- card heading, e.g. "LinkedIn"
  url              text not null,
  display_text     text,                          -- card sub-text, e.g. "Connect with me"
  icon_svg         text,
  show_in_hero     boolean not null default true,
  show_in_contact  boolean not null default true,
  show_in_footer   boolean not null default true,
  sort_order       int not null default 0
);

create table if not exists public.hero_badges (
  id          bigint generated always as identity primary key,
  label       text not null,
  color       text not null default 'blue',       -- theme key, see src/theme.js
  icon_svg    text,
  is_visible  boolean not null default true,
  sort_order  int not null default 0
);

create table if not exists public.hero_actions (
  id          bigint generated always as identity primary key,
  label       text not null,
  href        text not null,
  variant     text not null default 'primary',    -- primary | secondary | outline
  new_tab     boolean not null default false,
  icon_svg    text,
  is_visible  boolean not null default true,
  sort_order  int not null default 0
);

create table if not exists public.stats (
  id          bigint generated always as identity primary key,
  value       text not null,                      -- e.g. "6+"
  label       text not null,                      -- e.g. "Months"
  sublabel    text,                               -- e.g. "Experience"
  color       text not null default 'sky',
  is_visible  boolean not null default true,
  sort_order  int not null default 0
);

create table if not exists public.experiences (
  id                bigint generated always as identity primary key,
  role              text not null,
  company           text not null,
  company_short     text,                         -- shown in the logo tile when no logo_url
  logo_url          text,
  location          text,
  period            text,                         -- e.g. "July 2025 - Present"
  responsibilities  text[] not null default '{}',
  strengths         text[] not null default '{}',
  is_visible        boolean not null default true,
  sort_order        int not null default 0
);

create table if not exists public.technologies (
  id          bigint generated always as identity primary key,
  name        text not null,
  icon_svg    text,
  is_visible  boolean not null default true,
  sort_order  int not null default 0
);

create table if not exists public.skills (
  id           bigint generated always as identity primary key,
  name         text not null,
  description  text,
  is_visible   boolean not null default true,
  sort_order   int not null default 0
);

create table if not exists public.projects (
  id           bigint generated always as identity primary key,
  title        text not null,
  category     text,
  description  text,
  icon_svg     text,
  image_url    text,
  image_alt    text,
  tags         jsonb not null default '[]',       -- [{"name": "PostgreSQL", "color": "blue"}]
  link_url     text,
  link_label   text default 'View on GitHub',
  is_visible   boolean not null default true,
  sort_order   int not null default 0
);

create table if not exists public.education (
  id           bigint generated always as identity primary key,
  degree       text not null,
  institution  text not null,
  grade        text,
  period       text,
  is_visible   boolean not null default true,
  sort_order   int not null default 0
);

create table if not exists public.certifications (
  id              bigint generated always as identity primary key,
  name            text not null,
  provider        text,
  icon_svg        text,
  credential_url  text,
  is_visible      boolean not null default true,
  sort_order      int not null default 0
);

create table if not exists public.achievements (
  id          bigint generated always as identity primary key,
  title       text not null,
  date_label  text,
  icon        text,                               -- emoji
  is_visible  boolean not null default true,
  sort_order  int not null default 0
);

-- ---------------------------------------------------------------------------
-- Row Level Security: public read-only
-- ---------------------------------------------------------------------------
do $$
declare
  t text;
begin
  foreach t in array array[
    'profile','sections','site_text','social_links','hero_badges','hero_actions','stats',
    'experiences','technologies','skills','projects','education','certifications','achievements'
  ] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "Public read" on public.%I', t);
    execute format('create policy "Public read" on public.%I for select to anon, authenticated using (true)', t);
    execute format('revoke insert, update, delete, truncate on public.%I from anon, authenticated', t);
    execute format('grant select on public.%I to anon, authenticated', t);
  end loop;
end $$;

-- ---------------------------------------------------------------------------
-- Single round-trip read for the frontend
-- ---------------------------------------------------------------------------
create or replace function public.get_portfolio()
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select jsonb_build_object(
    'profile',        (select to_jsonb(p) - 'id' from public.profile p limit 1),
    'sections',       coalesce((select jsonb_agg(to_jsonb(s) order by s.sort_order) from public.sections s where s.is_visible), '[]'),
    'text',           coalesce((select jsonb_object_agg(t.key, t.value) from public.site_text t), '{}'),
    'socialLinks',    coalesce((select jsonb_agg(to_jsonb(x) order by x.sort_order) from public.social_links x), '[]'),
    'heroBadges',     coalesce((select jsonb_agg(to_jsonb(x) order by x.sort_order) from public.hero_badges x where x.is_visible), '[]'),
    'heroActions',    coalesce((select jsonb_agg(to_jsonb(x) order by x.sort_order) from public.hero_actions x where x.is_visible), '[]'),
    'stats',          coalesce((select jsonb_agg(to_jsonb(x) order by x.sort_order) from public.stats x where x.is_visible), '[]'),
    'experiences',    coalesce((select jsonb_agg(to_jsonb(x) order by x.sort_order) from public.experiences x where x.is_visible), '[]'),
    'technologies',   coalesce((select jsonb_agg(to_jsonb(x) order by x.sort_order) from public.technologies x where x.is_visible), '[]'),
    'skills',         coalesce((select jsonb_agg(to_jsonb(x) order by x.sort_order) from public.skills x where x.is_visible), '[]'),
    'projects',       coalesce((select jsonb_agg(to_jsonb(x) order by x.sort_order) from public.projects x where x.is_visible), '[]'),
    'education',      coalesce((select jsonb_agg(to_jsonb(x) order by x.sort_order) from public.education x where x.is_visible), '[]'),
    'certifications', coalesce((select jsonb_agg(to_jsonb(x) order by x.sort_order) from public.certifications x where x.is_visible), '[]'),
    'achievements',   coalesce((select jsonb_agg(to_jsonb(x) order by x.sort_order) from public.achievements x where x.is_visible), '[]')
  );
$$;

revoke all on function public.get_portfolio() from public;
grant execute on function public.get_portfolio() to anon, authenticated;
