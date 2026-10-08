-- Preserve historical feedback while preventing new repeated submissions.
-- A trigger is used because historical learner_feedback may already have
-- multiple rows for a user and should not be deleted.
create or replace function public.prevent_duplicate_learner_feedback()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtext(new.user_id::text));

  if exists (
    select 1 from public.learner_feedback
    where user_id = new.user_id
  ) then
    raise exception 'Feedback has already been submitted for this account'
      using errcode = '23505';
  end if;

  return new;
end;
$$;

drop trigger if exists one_feedback_per_learner on public.learner_feedback;
create trigger one_feedback_per_learner
before insert on public.learner_feedback
for each row execute function public.prevent_duplicate_learner_feedback();

-- Landing comments are private and limited to one per signed-in user.
create unique index if not exists one_landing_comment_per_learner
on public.public_feedback (user_id);
