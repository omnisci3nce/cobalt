-- migrate:up

create table users (
  user_id bigserial primary key,

  -- details
  username varchar(20) not null unique,
  email varchar(80) not null,
  password text not null,
  salt text not null,

  -- audit
  created_at timestamp not null default now(),
  updated_at timestamp not null default now(),

  -- soft delete
  deleted boolean not null default false
);

-- migrate:down

delete from users;
drop table users;
