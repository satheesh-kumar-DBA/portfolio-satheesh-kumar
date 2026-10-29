-- Lets signed-in admins (the portfolio-admin mobile app) edit content.
-- Visitors keep read-only access via the anon key. Public sign-ups are disabled in Auth settings,
-- and only users listed in public.admins can write.

create table if not exists public.admins (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  created_at  timestamptz not null default now()
);

alter table public.admins enable row level security;
revoke all on public.admins from anon, authenticated;

-- security definer so policies can check membership without exposing the admins table
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins a where a.user_id = (select auth.uid()));
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- Content tables: admins may insert, update and delete
do $$
declare
  t text;
begin
  foreach t in array array[
    'profile','sections','site_text','social_links','hero_badges','hero_actions','stats',
    'experiences','technologies','skills','projects','education','certifications','achievements'
  ] loop
    execute format('grant insert, update, delete on public.%I to authenticated', t);
    execute format('drop policy if exists "Admin insert" on public.%I', t);
    execute format('drop policy if exists "Admin update" on public.%I', t);
    execute format('drop policy if exists "Admin delete" on public.%I', t);
    execute format('create policy "Admin insert" on public.%I for insert to authenticated with check ((select public.is_admin()))', t);
    execute format('create policy "Admin update" on public.%I for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))', t);
    execute format('create policy "Admin delete" on public.%I for delete to authenticated using ((select public.is_admin()))', t);
  end loop;
end $$;

-- Keep profile.updated_at current
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profile_touch_updated_at on public.profile;
create trigger profile_touch_updated_at
  before update on public.profile
  for each row execute function public.touch_updated_at();

-- Storage: admins may manage files in the public "portfolio" bucket
drop policy if exists "Admin upload portfolio" on storage.objects;
drop policy if exists "Admin update portfolio" on storage.objects;
drop policy if exists "Admin delete portfolio" on storage.objects;
drop policy if exists "Admin read portfolio" on storage.objects;

create policy "Admin read portfolio" on storage.objects
  for select to authenticated using (bucket_id = 'portfolio' and (select public.is_admin()));
create policy "Admin upload portfolio" on storage.objects
  for insert to authenticated with check (bucket_id = 'portfolio' and (select public.is_admin()));
create policy "Admin update portfolio" on storage.objects
  for update to authenticated using (bucket_id = 'portfolio' and (select public.is_admin()));
create policy "Admin delete portfolio" on storage.objects
  for delete to authenticated using (bucket_id = 'portfolio' and (select public.is_admin()));
