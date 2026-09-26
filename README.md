# Ghana CV Builder

A free, mobile-first web app that helps job seekers — starting with Ghana — go from an empty page to a professional, downloadable CV. It also publishes practical CV guides, templates and examples to attract search traffic.

No account is needed. CVs are built, stored and exported entirely in the user's browser.

## Features

- **CV builder** — personal details, summary, experience, education, skills, projects, certifications, languages and references. Add, edit, reorder (up/down buttons) and delete entries; deleting an entry with content asks for confirmation.
- **Five templates** — Modern, Classic, Minimal, Graduate (education first) and Professional. All A4, single-column and printable; Modern and Professional support an optional photo.
- **Live preview** — updates as you type, shows page boundaries. On phones there's an Edit / Preview switch.
- **PDF export** — generated on the device with embedded fonts, selectable text, clickable links, consistent margins on every page and headings kept with their content.
- **Validation** — email, phone, links, dates (end after start) and length limits. Problems are shown inline; export is blocked until they're fixed, and the first problem field gets focus.
- **Saving** — autosaves to `localStorage`; "Start a new CV" (with confirmation); backup file save/open for moving between devices. Damaged saved data is salvaged section by section instead of lost.
- **Examples** — six fictional example CVs, each with its own page and an "Edit this example" link that loads it into the builder.
- **SEO content** — homepage, builder guide, template gallery, examples, and guides (how to write a CV, CV format, Ghana-specific advice, graduate, student, internship, professional CVs), plus about, privacy and terms.
- **Monetisation hooks** — an `AdSlot` component used only on content pages, and analytics events. Both are inactive until configured.

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript (strict) |
| Styling | Tailwind CSS 4 |
| Validation | Zod (draft structure) + small format validators |
| PDF | `@react-pdf/renderer`, loaded on demand in the browser |
| Fonts | Inter and Source Serif 4, subsetted (Latin Extended incl. Ɛ ɛ Ɔ ɔ, ₵) and self-hosted |
| Tests | Vitest + Testing Library (unit/component), Playwright + axe-core (end-to-end, accessibility) |

There is no database, authentication or server API. Every page is statically generated.

## Local development

Requires Node.js 20.9 or newer (22 recommended).

```bash
npm install
cp .env.example .env.local   # optional
npm run dev                  # http://localhost:3000
```

## Environment variables

See [`.env.example`](.env.example). None are secrets and all are optional in development.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public site URL for canonical URLs, sitemap, robots.txt and Open Graph. Defaults to `https://ghanacv.cobbold.dev` in production builds and `http://localhost:3000` in development. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console HTML-tag verification code (optional). |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Google Analytics 4 ID. Production defaults to `G-PP7163Z5PK`; set another ID to override or `off` to disable. |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher ID. Production defaults to `ca-pub-5952797612434262`; `off` disables. Loads the ad script on content pages and serves `/ads.txt`. |
| `NEXT_PUBLIC_ADSENSE_SLOT` | Ad unit used by in-content `AdSlot`s. |
| `NEXT_PUBLIC_AD_PLACEHOLDERS` | `true` shows labelled ad placeholders (development only). |

`NEXT_PUBLIC_*` values are embedded at build time; rebuild after changing them.

## Testing

```bash
npm run lint
npm run typecheck
npm test                                # unit + component tests (Vitest)
npm run build && npm run test:e2e       # end-to-end + accessibility (Playwright, desktop and mobile)
```

- `tests/unit/pdf.test.tsx` renders real PDFs for every template (one-page, multi-page, empty, photo, unusual characters). Set `PDF_OUT=/some/dir` to write them to disk for inspection.
- The end-to-end tests start `next start` on port 3300 against the production build.

## Build and deployment

```bash
npm run build
npm start
```

The app is designed for [Vercel](https://vercel.com) (zero configuration): import the repository, add the domain `ghanacv.cobbold.dev`, set any optional variables, and deploy. Any host that runs Next.js works; because every page is static, hosting costs are minimal. Security headers and long-lived font caching are configured in `next.config.ts`.

## Architecture

```
app/
  (site)/           marketing and content pages (header, footer, ads allowed)
  builder/          the CV builder (noindex, no ads)
  sitemap.ts robots.ts opengraph-image.tsx ads.txt/
components/
  builder/          builder UI: sections, fields, list editors, dialogs
  cv/               live preview and static template thumbnails
  templates/        template renderers + HTML primitives
  content/ layout/ ads/
lib/
  cv/               schema, validation, dates, text cleaning, normalisation, sample data
  pdf/              react-pdf primitives, document, fonts, download
  storage/          localStorage drafts and backups
  templates/        template metadata registry
  examples/         example CVs and their page content
  seo/              site config, metadata helper, shared links
public/fonts/       subsetted .ttf (PDF) and .woff2 (web) fonts
```

### Key decisions

- **One template, two renderers.** Each template is written once against a tiny set of primitives (`Page`, `View`, `Text`, `Link`, `Image`) using react-pdf style objects. `components/templates/html-primitives.tsx` renders them as HTML for the preview and thumbnails; `lib/pdf/primitives.tsx` renders them with react-pdf for the download. The preview therefore closely matches the PDF. Page breaks in the PDF are decided by react-pdf (headings stay with the first entry; bullets don't split), so the on-screen page markers are approximate.
- **Client-side PDF.** Generating the PDF in the browser keeps CV data on the device, needs no server, and costs nothing to run. The PDF library (~500 KB) is loaded only when the user downloads (and prefetched on hover/touch of the button).
- **Local-only storage.** Drafts live in `localStorage` under a versioned key. The Zod schema only enforces structure and length, so half-typed values always save; format checks are separate (`lib/cv/validation.ts`). Adding cloud storage later means adding a second implementation of the load/save functions in `lib/storage`.
- **Fonts** are subsetted with `pyftsubset` to Latin, Latin Extended, IPA (for Ghanaian letters), general punctuation and currency symbols. react-pdf needs TTF; the browser uses WOFF2.
- **Ads and analytics** load only when their environment variables are set. Ad slots appear only on content pages, are labelled "Advertisement", and the ad script isn't loaded on the builder. Analytics events (`lib/analytics.ts`) never include CV content.
- **SEO.** Content pages are server-rendered static HTML with unique titles, descriptions, canonical URLs, Open Graph images, breadcrumb and article structured data. The builder is `noindex` (not blocked in robots.txt, so crawlers can see the tag). `CONTENT_UPDATED` in `lib/seo/content.ts` feeds `dateModified` and the sitemap — change it only when content really changes.

### Extending

- **New template:** add a renderer in `components/templates/`, register it in `components/templates/index.ts` and add metadata in `lib/templates/registry.ts`. Tests cover every registered template automatically.
- **New example:** add an entry to `lib/examples/index.ts`; its page and sitemap entry are generated.
- **New guide:** add `app/(site)/<slug>/page.tsx` using `ContentPage`, then add the path to `INDEXABLE_PATHS` in `app/sitemap.ts` and link it from related pages.
