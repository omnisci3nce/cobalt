-- migrate:up

create table users (
  id bigserial primary key,

  -- details
  username varchar(20) not null unique,
  email varchar(80) not null,
  encrypted_password varchar(64) not null,

  -- audit
  created_at timestamp not null default now(),
  updated_at timestamp not null default now(),

  -- soft delete
  deleted boolean not null default false
);

-- migrate:down

delete from users;
drop table users;
