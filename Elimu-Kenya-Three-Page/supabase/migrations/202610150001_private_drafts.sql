-- Optional private draft storage for a future authenticated application.
-- Run only in a fresh dedicated Supabase project. This does not enable payments.
create table if not exists public.application_drafts (
 id uuid primary key default gen_random_uuid(),
 owner_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
 payload jsonb not null default '{}'::jsonb check (octet_length(payload::text) <= 32768),
 created_at timestamptz not null default now()
);
alter table public.application_drafts enable row level security;
revoke all on public.application_drafts from anon;
grant select, insert, update, delete on public.application_drafts to authenticated;
create policy "Owners manage their own drafts" on public.application_drafts
 for all to authenticated using ((select auth.uid()) = owner_id)
 with check ((select auth.uid()) = owner_id);
