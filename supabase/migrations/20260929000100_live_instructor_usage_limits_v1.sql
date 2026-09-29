alter table public.ai_usage_events
  add column if not exists usage_seconds integer not null default 0,
  add column if not exists session_limit_seconds integer,
  add column if not exists provider_session_id text,
  add column if not exists ended_at timestamptz,
  add column if not exists updated_at timestamptz not null default now();

alter table public.ai_usage_events
  drop constraint if exists ai_usage_events_usage_seconds_check;

alter table public.ai_usage_events
  add constraint ai_usage_events_usage_seconds_check
  check (usage_seconds >= 0);

alter table public.ai_usage_events
  drop constraint if exists ai_usage_events_session_limit_seconds_check;

alter table public.ai_usage_events
  add constraint ai_usage_events_session_limit_seconds_check
  check (session_limit_seconds is null or session_limit_seconds > 0);

create index if not exists ai_usage_events_live_instructor_month_idx
  on public.ai_usage_events (user_id, created_at desc)
  where usage_kind = 'live_instructor';

create unique index if not exists ai_usage_events_one_open_live_session_per_user
  on public.ai_usage_events (user_id)
  where usage_kind = 'live_instructor' and ended_at is null;

create unique index if not exists ai_usage_events_provider_session_id_unique
  on public.ai_usage_events (provider_session_id)
  where provider_session_id is not null;
