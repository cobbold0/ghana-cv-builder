# Next Steps

## Phase 0 — Setup (week 1)
- [ ] Scaffold Next.js + TypeScript + Tailwind; init shadcn/ui
- [ ] Add ESLint, Prettier, Vitest, Playwright; CI (GitHub Actions: lint, typecheck, test)
- [ ] Create Supabase project; local dev with Supabase CLI
- [ ] `.env.example` with required keys
- [ ] Deploy empty app to Vercel; connect domain

## Phase 1 — Builder MVP (weeks 2–4)
- [ ] Zod CV schema (`src/features/cv/schema.ts`)
- [ ] Editor sections with React Hook Form; localStorage autosave
- [ ] Live preview with 3 free templates
- [ ] PDF export via `@react-pdf/renderer` (watermarked)
- [ ] Mobile usability pass on a low-end Android device

## Phase 2 — Accounts (week 5)
- [ ] Supabase Auth: phone OTP + Google
- [ ] `profiles`, `cvs` tables with RLS
- [ ] Migrate local draft to account on sign-up
- [ ] Multiple CVs, duplicate, delete

## Phase 3 — Payments (weeks 6–7)
- [ ] Paystack account (business verification)
- [ ] `orders`, `entitlements` tables
- [ ] Checkout Server Action + inline popup
- [ ] Webhook with signature verification + idempotency
- [ ] Clean PDF and premium templates gated by entitlement
- [ ] E2E test with Paystack test MoMo numbers

## Phase 4 — Launch (week 8)
- [ ] Marketing home, pricing, 5 template pages, 5 guides
- [ ] Sitemap, robots, metadata, OG images
- [ ] Analytics + Sentry
- [ ] Privacy policy and terms (Act 843)
- [ ] Soft launch with 50 students/NSS personnel; collect feedback

## Phase 5 — Post-launch
- [ ] AI assistant (summary, bullets, tailor to job)
- [ ] Cover letter builder
- [ ] Import existing CV
- [ ] Remaining SEO content plan
- [ ] Institutional licences outreach

## Open questions
- Domain and brand name?
- Phone OTP SMS provider (Twilio vs local provider like Hubtel/Arkesel) — cost per SMS?
- Final launch pricing — run a price test in first month?
- Who does Pro Review (recruiter partners)?
