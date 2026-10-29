-- Contact form messages.
-- Visitors (anon key) can only INSERT name/email/message. Only admins can read, mark read or delete.

create table if not exists public.messages (
  id          bigint generated always as identity primary key,
  name        text not null check (char_length(btrim(name)) between 1 and 100),
  email       text not null check (char_length(email) <= 200 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  message     text not null check (char_length(btrim(message)) between 1 and 5000),
  created_at  timestamptz not null default now(),
  read_at     timestamptz
);

create index if not exists messages_created_at_idx on public.messages (created_at desc);

alter table public.messages enable row level security;

-- Column-level grants: visitors can set only the three form fields
revoke all on public.messages from anon, authenticated;
grant insert (name, email, message) on public.messages to anon, authenticated;
grant select, delete on public.messages to authenticated;
grant update (read_at) on public.messages to authenticated;

drop policy if exists "Anyone can send a message" on public.messages;
drop policy if exists "Admin read messages" on public.messages;
drop policy if exists "Admin update messages" on public.messages;
drop policy if exists "Admin delete messages" on public.messages;

create policy "Anyone can send a message" on public.messages
  for insert to anon, authenticated with check (read_at is null);
create policy "Admin read messages" on public.messages
  for select to authenticated using ((select public.is_admin()));
create policy "Admin update messages" on public.messages
  for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "Admin delete messages" on public.messages
  for delete to authenticated using ((select public.is_admin()));

-- Flood protection: cap total submissions per hour
create or replace function public.messages_throttle()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select count(*) from public.messages where created_at > now() - interval '1 hour') >= 30 then
    raise exception 'Too many messages right now. Please try again later.' using errcode = 'P0001';
  end if;
  new.name := btrim(new.name);
  new.email := btrim(new.email);
  new.message := btrim(new.message);
  return new;
end;
$$;

drop trigger if exists messages_throttle on public.messages;
create trigger messages_throttle
  before insert on public.messages
  for each row execute function public.messages_throttle();

-- Form labels (editable from the admin app under Labels)
insert into public.site_text (key, value) values
  ('contact.form_title',   'Send a Message'),
  ('contact.form_name',    'Your name'),
  ('contact.form_email',   'Your email'),
  ('contact.form_message', 'Message'),
  ('contact.form_submit',  'Send Message'),
  ('contact.form_success', 'Thanks! Your message has been sent. I''ll get back to you soon.'),
  ('contact.form_error',   'Your message could not be sent. Please try again or email me directly.')
on conflict (key) do nothing;
