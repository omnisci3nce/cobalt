-- migrate:up

-- Some example configs
-- allow_anonymous_uploads : default = true

create table config (
  config_id serial primary key,

  -- nonupdatable
  key text not null,
  display_name text not null,
  type text not null,
  default_value text not null,

  -- updatable
  value text not null,

  -- audit
  updated_at timestamp not null default now(),
  updated_by bigint references users(user_id)
);

insert into public.config(key, display_name, type, default_value, value)
values ('ALLOW_ANON_UPLOADS', 'Allow anonymous uploads', 'boolean', 'true', 'true');

insert into public.config(key, display_name, type, default_value, value)
values ('INSTANCE_NAME', 'Instance name', 'text', 'Cobalt', 'Cobalt');

-- migrate:down

delete from config;
drop table config;