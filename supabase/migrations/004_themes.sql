-- Website themes (portfolio_theme_list.pdf). The catalogue is shown in the admin app; the active
-- key is chosen there and returned by get_portfolio(). How each theme looks lives in
-- portfolio/src/themes/registry.js.

create table if not exists public.themes (
  key          text primary key,
  name         text not null,
  description  text,
  best_for     text,
  recommended  boolean not null default false,
  swatches     text[] not null default '{}',   -- [background, accent, second accent] for previews
  sort_order   int not null default 0
);

create table if not exists public.site_settings (
  id            boolean primary key default true check (id),
  active_theme  text not null default 'dark-db-engineer' references public.themes (key),
  updated_at    timestamptz not null default now()
);

insert into public.themes (key, name, description, best_for, recommended, swatches, sort_order) values
  ('dark-db-engineer',    'Dark Database Engineer', 'Midnight navy, cyan accents, animated terminal, SQL snippets and technical diagrams.', 'PostgreSQL DBA / Database Engineer', true,  '{#060a14,#22d3ee,#818cf8}', 1),
  ('corporate-blue',      'Premium Corporate Blue', 'White canvas, royal-blue highlights, clean typography and elegant cards.',            'Corporate IT recruitment',            false, '{#f4f7fc,#1d4ed8,#0e7490}', 2),
  ('bento',               'Bento Grid',             'Modular cards, compact layout, project previews and skill summaries.',                'Modern, visually distinctive portfolios', true, '{#09090b,#38bdf8,#a78bfa}', 3),
  ('terminal',            'Terminal / CLI',         'Black backgrounds, green monospace text and command-line navigation.',               'A strongly technical, experimental look', false, '{#030603,#22c55e,#facc15}', 4),
  ('cyber-tech',          'Cyber Tech',             'Neon cyan, animated network lines, glowing borders and futuristic effects.',          'A bold, high-impact presentation',   false, '{#03030a,#00e5ff,#ff2bd6}', 5),
  ('cloud-infra',         'Cloud & Infrastructure', 'Infrastructure diagrams, server-health cards, replication flows and monitoring panels.', 'DBA, DevOps and infrastructure roles', false, '{#070a10,#38bdf8,#f59e0b}', 6),
  ('minimal-editorial',   'Minimal Editorial',      'Large typography, generous spacing, understated color and text-led case studies.',   'A clean, mature professional identity', false, '{#faf8f4,#9a3412,#57534e}', 7),
  ('glass',               'Glassmorphism',          'Translucent panels, blurred surfaces, gradients and soft glowing accents.',           'A polished, contemporary look',      false, '{#0a0718,#60a5fa,#f472b6}', 8),
  ('data-analytics',      'Data Analytics',         'Charts, KPI cards, query benchmarks and performance comparisons.',                    'DBA + Power BI + data analysis skills', false, '{#eef1f6,#2563eb,#ea580c}', 9),
  ('enterprise-security', 'Enterprise Security',    'Navy and emerald green, access-control visuals, audit logs and security cards.',      'Database security and auditing',     false, '{#06101f,#10b981,#38bdf8}', 10),
  ('split-light-dark',    'Split Light + Dark',     'Light introduction and career sections, dark terminal and code panels.',             'Balancing corporate professionalism with technical depth', true, '{#f8fafc,#0891b2,#0b1120}', 11),
  ('interactive-3d',      'Interactive 3D',         'Animated database objects, depth effects and interactive technical visualizations.',  'A highly creative portfolio, if performance stays fast', false, '{#05060f,#818cf8,#22d3ee}', 12)
on conflict (key) do update set
  name = excluded.name, description = excluded.description, best_for = excluded.best_for,
  recommended = excluded.recommended, swatches = excluded.swatches, sort_order = excluded.sort_order;

insert into public.site_settings (id, active_theme) values (true, 'dark-db-engineer') on conflict (id) do nothing;

-- RLS: everyone reads; admins switch the active theme
alter table public.themes enable row level security;
alter table public.site_settings enable row level security;
revoke all on public.themes, public.site_settings from anon, authenticated;
grant select on public.themes, public.site_settings to anon, authenticated;
grant update (active_theme) on public.site_settings to authenticated;

drop policy if exists "Public read" on public.themes;
drop policy if exists "Public read" on public.site_settings;
drop policy if exists "Admin update" on public.site_settings;
create policy "Public read" on public.themes for select to anon, authenticated using (true);
create policy "Public read" on public.site_settings for select to anon, authenticated using (true);
create policy "Admin update" on public.site_settings for update to authenticated
  using ((select public.is_admin())) with check ((select public.is_admin()));

drop trigger if exists site_settings_touch_updated_at on public.site_settings;
create trigger site_settings_touch_updated_at
  before update on public.site_settings
  for each row execute function public.touch_updated_at();

-- Return the active theme key with the content
create or replace function public.get_portfolio()
returns jsonb
language sql
stable
security invoker
set search_path = ''
as $$
  select jsonb_build_object(
    'profile',        (select to_jsonb(p) - 'id' from public.profile p limit 1),
    'theme',          (select s.active_theme from public.site_settings s limit 1),
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
