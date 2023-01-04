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

pgadmin

`docker run --name pg_dashboard -p 5488:80 -e PGADMIN_DEFAULT_EMAIL=admin@email.com -e PGADMIN_DEFAULT_PASSWORD=admin -d dpage/pgadmin4`

dbmate

`docker run --rm -it --network=host -v "$(pwd)/db:/db" -e DATABASE_URL="postgres://postgres:postgres@localhost:5433/cobalt?sslmode=disable" amacneil/dbmate up`