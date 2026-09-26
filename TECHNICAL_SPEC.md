# Technical Specification

## Architecture

```
Browser (Next.js client) ──► Vercel (Next.js server: RSC, Server Actions, route handlers)
                                   │
                  ┌────────────────┼──────────────────┬───────────────┐
                  ▼                ▼                  ▼               ▼
            Supabase         Supabase Storage      Paystack        Claude API
       (Postgres + Auth)     (PDFs, imports)    (payments +       (AI writing)
                                                  webhooks)
```

## Stack

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router), TypeScript strict |
| UI | Tailwind CSS, shadcn/ui (Radix) |
| Forms / validation | React Hook Form + Zod |
| DB / Auth / Storage | Supabase (Postgres, RLS, phone OTP via SMS provider, Google OAuth) |
| PDF | `@react-pdf/renderer` (same template components render preview and PDF) |
| Payments | Paystack (GHS; MoMo + card) |
| AI | Anthropic Claude API |
| Analytics | Plausible or PostHog (cookieless) |
| Errors | Sentry |
| Hosting | Vercel (edge caching for marketing pages) |
| Tests | Vitest, Playwright |

## CV data model

CV content is a single JSON document validated by Zod (`src/features/cv/schema.ts`):

```ts
const cvSchema = z.object({
  personal: z.object({
    fullName: z.string().min(1),
    title: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().regex(/^\+233\d{9}$/).optional(),
    location: z.string().optional(),       // e.g. "East Legon, Accra"
    linkedin: z.string().url().optional(),
    photoUrl: z.string().url().optional(), // opt-in
  }),
  summary: z.string().max(1000).optional(),
  experience: z.array(z.object({
    role: z.string(), employer: z.string(), location: z.string().optional(),
    start: z.string(), end: z.string().optional(), current: z.boolean().default(false),
    bullets: z.array(z.string()),
  })),
  education: z.array(z.object({
    institution: z.string(), qualification: z.string(),
    start: z.string().optional(), end: z.string().optional(), grade: z.string().optional(),
  })),
  nss: z.object({ institution: z.string(), role: z.string(), year: z.string() }).optional(),
  skills: z.array(z.string()),
  certifications: z.array(z.object({ name: z.string(), issuer: z.string().optional(), year: z.string().optional() })),
  languages: z.array(z.object({ name: z.string(), level: z.enum(["basic", "conversational", "fluent", "native"]) })),
  references: z.union([z.literal("on_request"), z.array(z.object({
    name: z.string(), position: z.string(), organisation: z.string(), phone: z.string().optional(), email: z.string().optional(),
  }))]),
  sectionOrder: z.array(z.string()),
});
```

## Database (Postgres)

```sql
profiles        (id uuid pk -> auth.users, full_name, phone, created_at)
cvs             (id uuid pk, user_id fk, title, template_id, content jsonb,
                 public_slug text unique null, is_public bool default false,
                 created_at, updated_at)
templates       (id text pk, name, is_premium bool, sort_order int)
orders          (id uuid pk, user_id fk, product text, amount_pesewas int,
                 currency text default 'GHS', paystack_reference text unique,
                 status text check (status in ('pending','success','failed')),
                 created_at, paid_at)
entitlements    (user_id fk, kind text, cv_id uuid null, expires_at timestamptz null,
                 source_order_id fk)
ai_usage        (id, user_id fk, feature text, input_tokens int, output_tokens int, created_at)
```

RLS: users can read/write only rows where `user_id = auth.uid()`. Public CVs are served through a server-side query by `public_slug` with `is_public = true`, never by exposing the table.

## Key flows

### Anonymous editing
- Draft stored in `localStorage` under a versioned key.
- On sign-up, the draft is migrated to a `cvs` row via Server Action.

### PDF generation
- `GET /api/cv/[id]/pdf` — server renders with `@react-pdf/renderer`.
- Checks entitlement: no entitlement → watermark + free templates only.
- Fonts embedded and subset; target PDF < 300 KB.
- ATS check: text must be selectable; single-column templates flagged as "ATS-safe".

### Payments
1. Client calls Server Action `createCheckout(product, cvId?)` → inserts `orders` (pending) → initializes Paystack transaction → returns authorization URL / inline popup config.
2. User pays via MoMo/card.
3. `POST /api/webhooks/paystack` verifies `x-paystack-signature` (HMAC SHA512), is idempotent on `paystack_reference`, re-verifies via Paystack Verify API, marks order `success`, grants `entitlements`.
4. Client polls order status; never grants access based on callback URL alone.

### AI assistant
- Server Actions: `improveSummary`, `rewriteBullets`, `tailorToJob`.
- Rate limited per user (free: 5/day; paid: 50/day) using `ai_usage`.
- Prompt includes only the relevant section, not the full CV, to limit tokens and PII.
- Output validated/trimmed before returning; user must accept changes explicitly.

## Performance budgets

- Marketing pages: static, LCP < 2.0s on Moto G-class device over slow 4G.
- Builder: first-load JS < 200 KB gzipped; PDF renderer loaded lazily.
- Images: `next/image`, AVIF/WebP.

## Security & privacy

- Complies with Ghana Data Protection Act, 2012 (Act 843): consent, purpose limitation, data export and deletion on request.
- Secrets only in Vercel env vars: `SUPABASE_SERVICE_ROLE_KEY`, `PAYSTACK_SECRET_KEY`, `ANTHROPIC_API_KEY`.
- Public CV links use unguessable slugs; contact details can be hidden on public view.
- Account deletion hard-deletes CVs and storage objects.

## Environments

- `local` → Supabase local + Paystack test keys.
- `preview` → per-PR Vercel preview, shared staging Supabase.
- `production`.

## Testing

- Unit: Zod schema, pricing/entitlement logic, webhook signature verification.
- Integration: Server Actions against local Supabase.
- E2E (Playwright, mobile viewport): build CV anonymously → sign up → pay (Paystack test) → download PDF.
