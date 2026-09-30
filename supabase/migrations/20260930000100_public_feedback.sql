create table if not exists public.public_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 1 and 60),
  message text not null check (char_length(message) between 10 and 280),
  consent_public boolean not null default false,
  status text not null default 'pending'
    check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

create index if not exists public_feedback_status_approved_at_idx
  on public.public_feedback (status, approved_at desc, created_at desc);

create index if not exists public_feedback_user_created_at_idx
  on public.public_feedback (user_id, created_at desc);

alter table public.public_feedback enable row level security;

comment on table public.public_feedback is
  'Moderated early-access comments that may be displayed as public social proof.';

comment on column public.public_feedback.consent_public is
  'True only when the signed-in user explicitly agreed that the submitted comment may be shown publicly.';
