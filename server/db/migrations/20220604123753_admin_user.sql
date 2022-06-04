-- migrate:up

alter table public.users add is_admin boolean not null default false;

-- migrate:down

alter table public.users drop is_admin;