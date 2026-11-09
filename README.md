# TBO SmartERP — Phase 1 (Foundation)

The Brands Outlet: product management, automation and inventory intelligence ERP.

## What Phase 1 contains

| Area | Status |
|---|---|
| Docker setup (Postgres 16 + pgvector, Redis, FastAPI, Next.js) | Done |
| PostgreSQL schema: all 27 requested tables, plus `role_permissions` and `automation_settings` | Done, created and tested against Postgres 16 + pgvector |
| Authentication (JWT, bcrypt, login rate limit of 10/min) | Done, tested |
| Role-based access (Administrator, Manager, Uploader, Reviewer, Publisher) | Done, tested |
| Audit trail (logins, user changes) | Done; later modules must call `audit()` for their own actions |
| Dashboard API and page (every figure is a database query) | Done, tested with inserted rows |
| Team Management page | Done |
| Sidebar with all 15 sections, filtered by permission | Done; modules after Phase 1 show an honest "not built yet" page |
| Inventory status colours (green/blue/yellow/orange/red/grey) | Component and tokens ready (`IndicatorBadge`) |

Not built yet (later phases): bulk upload, product tables, AI analysis, recommendations, publishing engine,
lifecycle/30-day engine, Celery workers, notifications UI, settings page, analytics pages.
The tables for all of these already exist.

## Fleek integration

No official Fleek API access has been confirmed, and nothing here assumes endpoints or credentials.
`FLEEK_MODE=not_connected` is the default. Listing states in the schema distinguish: published,
submitted/awaiting confirmation, failed, not connected and simulated. Only a real confirmation may set
`fleek_listing_id`. Manual Excel import/export is the planned fallback.

## Run it

```bash
cp .env.example .env        # then edit SECRET_KEY, POSTGRES_PASSWORD, ADMIN_PASSWORD
docker compose up --build
```

- App: http://localhost:3000
- API docs: http://localhost:8000/docs
- First login: the `ADMIN_EMAIL` / `ADMIN_PASSWORD` from `.env`. Change the password after signing in.

The dashboard starts at zero. The seed script creates roles, permissions, the admin user and default
automation settings only; it adds no sample products or sales.

## Design decisions worth knowing

- **Three layers kept separate:** `products` (master record), `inventory_lifecycle` (one physical item, never
  duplicated), `fleek_listings` (one per listing cycle). A repost adds a `listing_cycles` row and a new listing.
- **Idempotency:** `publishing_jobs.idempotency_key` and `UNIQUE(inventory_item_id, cycle_number)` make double
  publish/repost impossible at the database level.
- **Trusted recommendations:** `product_embeddings.is_verified` is only true for human-approved records.
- **Only confirmed sales** go in `sales_transactions`; the dashboard reads nothing else for sales.
- **Dashboard "Published"** counts products with status `published`; "confirmed on Fleek" is shown separately
  and excludes simulated listings.

## Known limitations / hardening before production

- The login token is kept in browser localStorage. Move to httpOnly cookies before real use.
- Tables are created with `create_all` at start-up. Add Alembic migrations before the schema changes in later phases.
- Fleek credential encryption column exists but no encryption code yet (planned with the integration phase).
- Frontend uses hand-written components in a shadcn style rather than the shadcn CLI, and a small SVG bar chart.
- The spec you uploaded ends mid-Phase 3, so phases 4 onward are my assumption, not yours.
