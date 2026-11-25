-- ChartSpeak initial schema. Run in the Supabase SQL editor (or `supabase db push`).

create extension if not exists "pgcrypto";

-- ───────── profiles ─────────
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  specialty text,
  organization text,
  plan text not null default 'trial' check (plan in ('trial','starter','professional','practice')),
  credits_total int not null default 5,
  credits_used int not null default 0,
  period_start timestamptz not null default now(),
  is_admin boolean not null default false,
  created_at timestamptz not null default now()
);

-- ───────── notes ─────────
create table public.notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null default 'Untitled visit',
  patient_label text,
  specialty text,
  template text not null default 'soap',
  language text not null default 'English',
  transcript text,
  audio_path text,
  status text not null default 'draft' check (status in ('draft','generating','ready','failed')),
  content jsonb,
  codes jsonb,
  instructions text,
  error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index notes_user_created on public.notes (user_id, created_at desc);

-- ───────── usage_events ─────────
create table public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  note_id uuid references public.notes(id) on delete set null,
  kind text not null,
  created_at timestamptz not null default now()
);
create index usage_user_created on public.usage_events (user_id, created_at desc);

-- ───────── payments (written only by the server) ─────────
create table public.payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  email text,
  plan text not null,
  amount numeric,
  reference text unique not null,
  status text not null default 'confirmed',
  raw jsonb,
  created_at timestamptz not null default now()
);

-- ───────── contact leads (written only by the server) ─────────
create table public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  first_name text, last_name text, email text not null,
  organization text, existing_customer text, topic text, message text,
  created_at timestamptz not null default now()
);

-- ───────── notifications ─────────
create table public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  body text,
  read boolean not null default false,
  created_at timestamptz not null default now()
);
create index notif_user on public.notifications (user_id, created_at desc);

-- ───────── new user trigger ─────────
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''));
  insert into public.notifications (user_id, title, body)
  values (new.id, 'Welcome to ChartSpeak', 'Your trial includes 5 note generations. Create your first note from the dashboard.');
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- ───────── credits (server only) ─────────
-- Atomically consumes one credit. Resets the counter each 30 days. Returns true if a credit was available.
create or replace function public.consume_credit(uid uuid) returns boolean
language plpgsql security definer set search_path = public as $$
declare p public.profiles;
begin
  select * into p from public.profiles where id = uid for update;
  if not found then return false; end if;
  if p.plan <> 'trial' and now() - p.period_start > interval '30 days' then
    update public.profiles set credits_used = 0, period_start = now() where id = uid;
    p.credits_used := 0;
  end if;
  if p.credits_used >= p.credits_total then return false; end if;
  update public.profiles set credits_used = credits_used + 1 where id = uid;
  return true;
end $$;

create or replace function public.refund_credit(uid uuid) returns void
language sql security definer set search_path = public as $$
  update public.profiles set credits_used = greatest(credits_used - 1, 0) where id = uid;
$$;

-- Applies a confirmed payment to a user's plan. Idempotent on reference.
create or replace function public.apply_payment(p_email text, p_plan text, p_amount numeric, p_ref text, p_raw jsonb)
returns text language plpgsql security definer set search_path = public as $$
declare uid uuid; credits int;
begin
  if exists (select 1 from public.payments where reference = p_ref) then return 'duplicate'; end if;
  credits := case p_plan when 'starter' then 50 when 'professional' then 150 when 'practice' then 500 else null end;
  if credits is null then return 'bad_plan'; end if;
  select id into uid from public.profiles where lower(email) = lower(p_email) limit 1;
  insert into public.payments (user_id, email, plan, amount, reference, raw) values (uid, p_email, p_plan, p_amount, p_ref, p_raw);
  if uid is null then return 'no_user'; end if;
  update public.profiles set plan = p_plan, credits_total = credits, credits_used = 0, period_start = now() where id = uid;
  insert into public.notifications (user_id, title, body) values (uid, 'Plan activated', 'Your ' || p_plan || ' plan is now active.');
  return 'applied';
end $$;

revoke all on function public.consume_credit(uuid), public.refund_credit(uuid), public.apply_payment(text,text,numeric,text,jsonb) from public, anon, authenticated;
grant execute on function public.consume_credit(uuid), public.refund_credit(uuid), public.apply_payment(text,text,numeric,text,jsonb) to service_role;

-- ───────── Row Level Security ─────────
alter table public.profiles enable row level security;
alter table public.notes enable row level security;
alter table public.usage_events enable row level security;
alter table public.payments enable row level security;
alter table public.contact_leads enable row level security;
alter table public.notifications enable row level security;

create policy "own profile read" on public.profiles for select using (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
-- users may only edit descriptive columns, never plan or credits
revoke update on public.profiles from authenticated;
grant update (full_name, specialty, organization) on public.profiles to authenticated;

create policy "own notes all" on public.notes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own usage read" on public.usage_events for select using (auth.uid() = user_id);
create policy "own payments read" on public.payments for select using (auth.uid() = user_id);
create policy "own notifications read" on public.notifications for select using (auth.uid() = user_id);
create policy "own notifications update" on public.notifications for update using (auth.uid() = user_id);
-- contact_leads: no policies, so only the service role can touch it.

-- ───────── Storage: private audio bucket, files under <user_id>/ ─────────
insert into storage.buckets (id, name, public, file_size_limit)
values ('audio', 'audio', false, 26214400) on conflict (id) do nothing;

create policy "audio own read" on storage.objects for select to authenticated
  using (bucket_id = 'audio' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "audio own insert" on storage.objects for insert to authenticated
  with check (bucket_id = 'audio' and (storage.foldername(name))[1] = auth.uid()::text);
create policy "audio own delete" on storage.objects for delete to authenticated
  using (bucket_id = 'audio' and (storage.foldername(name))[1] = auth.uid()::text);
