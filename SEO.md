# SEO

Organic search is the primary acquisition channel. Most searches are on mobile, in English, often phrased as questions.

## Target keywords

| Intent | Examples |
|---|---|
| Tool | "cv maker ghana", "free cv builder ghana", "create cv online ghana", "cv template ghana" |
| Format | "cv format for fresh graduate in ghana", "ghana cv sample pdf", "how to write a cv in ghana" |
| Sector | "cv for teaching job ghana", "nursing cv ghana", "bank job cv ghana", "cv for nss" |
| Cover letter | "application letter for teaching job in ghana", "cover letter sample ghana" |
| Recruitment | "ges recruitment cv", "ghana health service application requirements" |

Validate volumes with Google Search Console and Keyword Planner after launch; prioritise by impressions.

## Site structure

```
/                               Home — CV builder landing
/templates                      All templates
/templates/[slug]               Template page with preview + "Use this template"
/cv-examples                    Examples hub
/cv-examples/[profession]       e.g. /cv-examples/teacher, /nurse, /accountant
/cover-letter                   Cover letter builder landing
/cover-letter-examples/[slug]
/guides                         Blog / guides hub
/guides/[slug]                  e.g. /guides/how-to-write-a-cv-in-ghana
/pricing
/cv/[public_slug]               User public CVs — noindex by default
```

## Content plan (first 20 pages)

1. How to write a CV in Ghana (pillar guide)
2. CV format for fresh graduates in Ghana
3. CV for National Service (NSS) personnel
4. Teacher CV example (GES)
5. Nurse CV example (GHS)
6. Accountant CV example
7. Banking CV example
8. Sales & marketing CV example
9. Driver CV example
10. Security officer CV example
11. IT / software developer CV example
12. Application letter for a teaching job
13. Application letter for a nursing job
14. How to list references on a Ghanaian CV
15. ATS-friendly CVs: what recruiters in Ghana use
16. CV vs résumé: which do Ghanaian employers want?
17. How to write a CV for jobs abroad (UK, Canada)
18. Common CV mistakes Ghanaian recruiters see
19. Interview tips for Ghana jobs
20. How to write a professional summary (with examples)

Each example page: real-looking sample CV (fictional names), downloadable preview, and a "Edit this CV" CTA that pre-fills the builder.

## Technical SEO

- Marketing pages statically generated; builder routes `noindex`.
- `generateMetadata` per page: unique title (≤ 60 chars), description (≤ 155 chars), canonical URL.
- Open Graph + Twitter images generated with `next/og` (important for WhatsApp previews).
- `app/sitemap.ts` and `app/robots.ts`.
- Structured data (JSON-LD): `WebApplication` on home, `HowTo`/`Article` on guides, `FAQPage` where FAQs exist, `BreadcrumbList` everywhere.
- Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1 on mobile.
- `hreflang` not needed at launch (English, Ghana); set `lang="en-GH"`.
- Internal linking: every guide links to the builder and 2–3 related examples.
- Public user CVs `noindex` unless the owner opts in.

## Off-page

- Listings on Ghanaian career portals and university career-service pages.
- Guest posts / partnerships with Ghanaian job sites and career bloggers.
- Campus ambassador programme linking from student association sites.
- Google Business Profile.

## Measurement

- Google Search Console: impressions, CTR, queries per page.
- Track organic landing page → CV started → download → paid.
- Monthly review: refresh pages ranking positions 5–20; expand winning topics.
