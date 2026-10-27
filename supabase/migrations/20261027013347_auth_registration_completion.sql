-- Apply before deploying the auth PR. Additive only: no existing accounts,
-- identities, credentials, profiles, or learner records are changed.
begin;
create table public.account_registrations (
  id uuid primary key references auth.users(id) on delete cascade,
  completed_at timestamptz not null default now(),
  method text not null check (method in ('legacy', 'email', 'google'))
);
alter table public.account_registrations enable row level security;
revoke all on public.account_registrations from public, anon, authenticated;
grant select on public.account_registrations to authenticated;
grant select, insert on public.account_registrations to service_role;
create policy "Read own registration" on public.account_registrations
  for select to authenticated using ((select auth.uid()) = id);
-- Existing users are grandfathered in by trusted auth IDs, not editable profiles.
insert into public.account_registrations (id, method)
  select id, 'legacy' from auth.users;
commit;
