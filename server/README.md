# Cobalt Backend

Based on boilerplate here https://github.com/omnisci3nce/postgresql-repo

## Features

- Generic CRUD for easy setup of new entities (see: `src/crud.ts`)

**Features Brainstorm:**

- Database Migrations
- Login / Authentication
- Authorisation
  - RBAC
  - ABAC
- Pagination & Filterting (abstraction)
- Logging
- Telemetry / monitoring
- Comprehensive testing (E2E, integration, unit)
- Live notifications

## Setup

postgres

`docker run --name postgres-db -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

pgadmin

`docker run --name pg_dashboard -p 5488:80 -e PGADMIN_DEFAULT_EMAIL=josh@josh.com -e PGADMIN_DEFAULT_PASSWORD=josh -d dpage/pgadmin4`

dbmate

`docker run --rm -it --network=host -v "$(pwd)/db:/db" -e DATABASE_URL="postgres://postgres:docker@localhost/postgres?sslmode=disable" amacneil/dbmate up`