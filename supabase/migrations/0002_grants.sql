-- Newer Supabase projects do not auto-grant table privileges to API roles.
-- RLS policies still decide which rows each user can touch.

grant usage on schema public to anon, authenticated, service_role;

-- server-side (service role) full access
grant all on all tables in schema public to service_role;

-- signed-in users: only what the app needs; RLS restricts rows
grant select on public.profiles to authenticated;
grant update (full_name, specialty, organization) on public.profiles to authenticated;
grant select, insert, update, delete on public.notes to authenticated;
grant select on public.usage_events to authenticated;
grant select on public.payments to authenticated;
grant select, update on public.notifications to authenticated;

-- anon gets nothing on application tables
