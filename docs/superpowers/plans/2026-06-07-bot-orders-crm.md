# Bot Orders CRM Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a standalone portfolio CRM for Telegram bot development leads with a public intake form, protected admin workflows, lead management, pricing, notes, and CSV export.

**Architecture:** Use Next.js App Router with server-rendered route shells and focused client components for form and table interactions. Keep the data contract independent of storage, use localStorage for the demo, expose a Supabase client boundary, and document the production schema and RLS model.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, React Hook Form, Zod, TanStack Table, Supabase JS

---

### Task 1: Scaffold and domain model

**Files:** `package.json`, config files, `src/types/lead.ts`, `src/data/mockLeads.ts`

- [ ] Create the Next.js project configuration.
- [ ] Define lead statuses, bot types, business types, features, and lead records.
- [ ] Add realistic Russian demo leads covering all workflow statuses.

### Task 2: Business utilities and persistence boundaries

**Files:** `src/utils/pricing.ts`, `src/utils/exportCsv.ts`, `src/lib/supabase.ts`, `src/components/providers/lead-provider.tsx`

- [ ] Implement deterministic price estimates by bot type and feature.
- [ ] Implement escaped UTF-8 CSV export.
- [ ] Add environment-driven Supabase client creation.
- [ ] Add demo localStorage persistence without coupling UI components to storage details.

### Task 3: Public acquisition flow

**Files:** `src/app/page.tsx`, `src/components/forms/lead-form.tsx`

- [ ] Build the public lead form with React Hook Form and Zod.
- [ ] Add accessible validation messages and feature selection.
- [ ] Persist submitted leads and show a clear success state.

### Task 4: Protected admin CRM

**Files:** `middleware.ts`, `src/app/admin/**`, `src/components/admin/**`, `src/components/table/**`

- [ ] Add mock cookie authentication and login/logout flows.
- [ ] Build responsive sidebar navigation and dashboard overview cards.
- [ ] Build TanStack Table search, filtering, date sorting, empty state, and CSV export.
- [ ] Build lead detail, status update, notes, and price estimate workflow.

### Task 5: Documentation and verification

**Files:** `README.md`, `.env.example`, `.gitignore`

- [ ] Document local setup, Supabase schema, RLS, Auth, and Vercel deployment.
- [ ] Run install, lint, and production build.
- [ ] Start the local server and inspect desktop and mobile layouts with CloakBrowser.
- [ ] Fix visible usability and responsive defects, then rerun verification.
