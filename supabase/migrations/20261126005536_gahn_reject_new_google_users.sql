-- Applied to the GAHN AI production Supabase project as migration
-- 20261126005536. Hook is inert until selected in Authentication → Hooks.
-- Deny creation of first-time Google Auth users. Existing verified GAHN
-- accounts continue to use Google via Supabase identity linking.
create or replace function public.gahn_reject_new_google_users(event jsonb)
returns jsonb
language plpgsql
set search_path = ''
as $$
declare
  login_provider text;
begin
  login_provider := event->'user'->'app_metadata'->>'provider';
  if login_provider = 'google' then
    return jsonb_build_object(
      'error',
      jsonb_build_object(
        'http_code', 403,
        'message', 'Create your GAHN account with email and verify it before using Google login.'
      )
    );
  end if;
  return '{}'::jsonb;
end;
$$;

revoke execute on function public.gahn_reject_new_google_users(jsonb)
  from public, anon, authenticated;
grant execute on function public.gahn_reject_new_google_users(jsonb)
  to supabase_auth_admin;
