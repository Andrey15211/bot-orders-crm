# BotFlow CRM

Standalone bilingual portfolio case study: a mini CRM for handling Telegram bot development leads. It covers the full path from a public inquiry to qualification, pricing, internal notes, status management, and CSV export.

## Stack

- Next.js App Router and TypeScript
- Tailwind CSS
- next-intl
- React Hook Form and Zod
- TanStack Table
- Supabase JS client boundary
- Mock cookie auth and localStorage demo persistence

## CRM features

- Public lead form with validation and success state
- Realistic Telegram bot types and optional features
- Protected `/admin` route structure with mock login
- Dashboard totals for new, active, paid, and completed leads
- Search by name or contact
- Status and business type filters
- Date sorting
- Responsive table and mobile lead list
- Lead details, status updates, manager notes, and price calculation
- CSV export for the current filtered result
- Loading, error, empty, and not-found states
- Russian and English interfaces with locale-aware routes

Demo credentials are prefilled on `/ru/admin/login` and `/en/admin/login`. Any values are accepted because the demo uses mock auth.

## RU/EN localization

Russian is the default locale. The root URL redirects to `/ru`.

- Russian public form: `/ru`
- English public form: `/en`
- Russian CRM: `/ru/admin`
- English CRM: `/en/admin`

Localization uses `next-intl` with dictionaries in:

```text
messages/ru.json
messages/en.json
```

Navigation, forms, Zod validation errors, dashboard cards, statuses, filters, tables, loading/error/empty states, pricing labels, and CSV headers are translated. The RU/EN switcher keeps the current page when changing locale.

Seeded demo leads also have locale-specific content so the English interface does not mix Russian fixture text into the same state. Leads created by a user remain exactly as entered.

## Local setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Available checks:

```bash
npm run lint
npm run typecheck
npm run build
```

Production verification:

```bash
npm run build
npm run start
```

The application works without environment variables in demo mode. No real credentials or secrets are included. To prepare a Supabase connection:

```bash
copy .env.example .env.local
```

Then set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Supabase-ready architecture

`src/lib/supabase.ts` creates the browser client only when both public environment variables exist. UI code currently talks to `LeadProvider`, which is the replacement boundary for repository-backed reads and mutations.

For a production implementation, replace localStorage operations with a small lead repository using Supabase queries and Realtime or server-side refresh as needed.

### Suggested schema

```sql
create type lead_status as enum (
  'new',
  'contacted',
  'in_progress',
  'paid',
  'completed',
  'rejected'
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  business_type text not null,
  bot_type text not null,
  features text[] not null default '{}',
  budget_range text not null,
  deadline date not null,
  comment text not null,
  status lead_status not null default 'new',
  estimated_price integer,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id)
);

create table public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  author_id uuid not null references auth.users(id),
  text text not null,
  created_at timestamptz not null default now()
);

create index leads_created_at_idx on public.leads (created_at desc);
create index leads_status_idx on public.leads (status);
create index lead_notes_lead_id_idx on public.lead_notes (lead_id);
```

### Auth and RLS notes

Enable Supabase Auth and replace the mock cookie in `middleware.ts` with a server client that refreshes and verifies the Supabase session. Login should use `signInWithPassword`, and logout should call `signOut`.

At a high level:

- Allow anonymous users to `insert` into `leads`, but expose only the columns needed by the public form.
- Do not allow anonymous `select`, `update`, or `delete`.
- Allow authenticated admin users to read and update leads.
- Allow authenticated admin users to read and write notes.
- Scope access by organization or assigned user if the CRM becomes multi-tenant.
- Keep service-role keys server-only. Never expose them through `NEXT_PUBLIC_*`.
- Validate public submissions again in a Server Action or Route Handler before inserting.
- Add rate limiting and bot protection to the public endpoint.

Example policy direction:

```sql
alter table public.leads enable row level security;
alter table public.lead_notes enable row level security;

create policy "public can submit leads"
on public.leads for insert
to anon
with check (status = 'new');

create policy "authenticated staff can manage leads"
on public.leads for all
to authenticated
using (true)
with check (true);

create policy "authenticated staff can manage notes"
on public.lead_notes for all
to authenticated
using (true)
with check (auth.uid() = author_id);
```

The broad staff policy is acceptable only for a single-team demo. A real multi-tenant product needs organization membership checks.

## Vercel deployment

1. Import the repository into Vercel.
2. Keep the default Next.js build command: `npm run build`.
3. Add Supabase environment variables for Preview and Production if enabling the real backend.
4. Configure the Supabase project URL allow-list for the Vercel domains.
5. Verify auth cookies and redirects in both preview and production environments.
6. Verify `/ru`, `/en`, and both localized admin login flows.

Demo localStorage data is browser-specific and will not be shared between visitors. Production deployment requires Supabase persistence for real lead management.

## Skills demonstrated

- Translating a service business funnel into a usable internal workflow
- Fullstack boundary design and migration planning
- Typed domain modeling for statuses, bot types, pricing, and notes
- Accessible form validation and practical error states
- Locale-aware App Router architecture with `next-intl`
- Data table search, filters, sorting, and export
- Responsive admin interface design
- Auth and RLS threat awareness
- Deployment and environment configuration
