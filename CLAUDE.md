# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Ghana CV Builder — a mobile-first web app that lets job seekers in Ghana create, download and share professional CVs, paying with Mobile Money. See:

- `PRODUCT.md` — users, problems, features, scope
- `TECHNICAL_SPEC.md` — architecture, data model, APIs
- `MONETIZATION.md` — pricing and payments
- `SEO.md` — acquisition via search
- `NEXT_STEPS.md` — current build plan (check this first)

## Stack

- Next.js (App Router) + TypeScript (strict)
- Tailwind CSS + shadcn/ui (Radix) — use existing components before writing new ones
- React Hook Form + Zod for all forms; Zod schemas are the single source of truth for CV data
- Supabase (Postgres, Auth, Storage) with Row Level Security
- `@react-pdf/renderer` for PDF output
- Paystack for payments (MoMo + card)
- Claude API for AI writing assistance
- Deployed on Vercel

## Commands

```bash
pnpm install
pnpm dev          # local dev server
pnpm lint
pnpm typecheck
pnpm test         # Vitest
pnpm test:e2e     # Playwright
```

Run `pnpm lint && pnpm typecheck && pnpm test` before committing.

## Layout

```
src/
  app/                 # routes (App Router)
    (marketing)/       # public, SEO pages
    (app)/             # authenticated builder
    api/               # route handlers (webhooks, PDF, AI)
  components/ui/       # shadcn/ui primitives (generated — don't hand-edit)
  components/          # app components
  features/cv/         # CV schema, editor, templates
  lib/                 # supabase, paystack, ai clients
supabase/migrations/   # SQL migrations
```

## Conventions

- Smallest correct change. Modify existing code; don't add abstractions, wrappers or files without need.
- Server Components by default; add `"use client"` only where interactivity requires it.
- Server Actions for mutations from the app; route handlers only for webhooks and file streams.
- All CV content is validated with the Zod schema in `src/features/cv/schema.ts` on both client and server.
- Money is stored as integer pesewas (`amount_pesewas`), never floats. Currency is GHS.
- Phone numbers stored in E.164 (`+233XXXXXXXXX`).
- Never trust client-reported payment status; entitlements are granted only from verified Paystack webhooks.
- Every table has RLS enabled; add policies in the same migration that creates the table.
- Keep pages light: target < 200 KB JS on first load; users are often on 3G/4G with metered data.
- Copy is in plain English aimed at Ghanaian users; use GHS (₵) and local examples.

## Don'ts

- Don't commit secrets; use `.env.local` (see `.env.example`).
- Don't collect Ghana Card numbers, dates of birth or photos unless the user opts in — CVs are shared widely.
- Don't hand-edit files in `components/ui/`; regenerate via the shadcn CLI.
