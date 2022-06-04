-- migrate:up

-- Some example configs
-- allow_anonymous_uploads : default = true

create table config (
  id bigserial primary key,

  -- nonupdatable
  name text not null,
  display_name text not null,
  type text not null
  default text not null

  -- updatable
  value text not null,

  -- audit
  updated_at timestamp not null default now(),
  updated_by bigint not null references users(user_id)
);

-- migrate:down

delete from config;
drop table config;