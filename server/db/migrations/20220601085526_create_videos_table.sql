-- migrate:up

create table videos (
    video_id uuid default gen_random_uuid() primary key,

    -- details
    name varchar (64) not null,
    description text,
    filename text,
    archived boolean not null default false,

    -- audit
    created_at timestamp not null default now(),
    created_by bigint references users(user_id) default null,

    updated_at timestamp not null default now(),
    updated_by bigint not null references users(user_id)
);

-- migrate:down

delete from videos;
drop table videos;