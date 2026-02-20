# Elite Tendancy Platform Architecture (v1)

## Surfaces
1. Public Marketplace (`/`, `/properties`, `/property/:id`)
2. Tenant Dashboard (`/tenant/*`)
3. Landlord Dashboard (`/landlord/*`)
4. Owner/Admin CMS (`/admin/*`)

## Frontend
- React + Vite
- Route guards by role
- Shared UI theme from existing cinematic brand

## Backend (Supabase)
- Postgres + RLS
- Auth (email/password)
- Storage for listing media/documents
- Realtime for inbox/status updates (phase 2)

## Core modules
- Auth/RBAC
- Listings
- Inquiries + Viewings
- Applications
- CMS content blocks
- Automation rules/events
- Moderation + verification

## Security baseline
- RLS on all user data tables
- `anon` insert only for public lead capture table(s)
- role checks for tenant/landlord/admin actions
- audit logs for admin operations
