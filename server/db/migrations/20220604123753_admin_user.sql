-- migrate:up

alter table public.users add is_admin boolean not null default false;

insert into public.users(username, email, password, salt, is_admin)
values ('admin', 'admin@email.com', '', '', true);

-- migrate:down

alter table public.users drop is_admin;