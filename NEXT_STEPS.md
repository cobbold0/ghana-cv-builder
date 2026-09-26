# Next Steps

This file is maintained by Claude Code.

It must always reflect the actual current state of the project.

## Owner must do

1. **Choose and connect a domain.** Buy the domain, create a hosting project (Vercel is recommended — import this GitHub repository), and point DNS at it.
2. **Set production environment variables** in the hosting dashboard, then redeploy:
   - `NEXT_PUBLIC_SITE_URL` — your final URL, e.g. `https://www.example.com` (required; canonical URLs and the sitemap depend on it).
3. **Merge the work into your main branch** (it is on `claude/amazing-faraday-spzpl3`) so production deploys from it.
4. **Provide a contact email address** for the site. The privacy policy tells users to contact the site owner, and ad networks expect a way to reach you. Once you have it, ask Claude to add a contact section.
5. **Review the privacy policy and terms of use** (`/privacy`, `/terms`) with someone qualified, including whether you need to register with Ghana's Data Protection Commission. The site doesn't store CV data on a server, but analytics and ads do process visitor data.
6. **Google Search Console:** verify the domain and submit `https://<your-domain>/sitemap.xml`.
7. **Analytics (optional but recommended):** create a Google Analytics 4 property and set `NEXT_PUBLIC_GA_MEASUREMENT_ID`. Decide whether you need a cookie consent banner for your audience.
8. **Advertising, when ready:** apply for Google AdSense once the site is live on its domain. After approval, set `NEXT_PUBLIC_ADSENSE_CLIENT` and `NEXT_PUBLIC_ADSENSE_SLOT`; `/ads.txt` is generated automatically. If you'll serve personalised ads to visitors from regions that require consent (e.g. the EU/UK), you'll need a certified consent tool — this is a business/legal decision.
9. **Review the content** — guides, example CVs and template descriptions — and approve the launch.

## Optional improvements

Prioritised by practical value.

1. **Contact/about details** once the owner provides a contact email.
2. **More useful content:** CV with no experience, how to write a professional summary, CV mistakes, CV vs résumé, how long a CV should be; more examples (nurse, sales, banking, driver, customer service).
3. **Cover letter builder** reusing the CV's personal details.
4. **Multiple CVs and "Duplicate this CV"** stored locally, for tailoring to different jobs.
5. **Section reordering and custom sections** (awards, volunteering, publications).
6. **Exact page preview** (render the actual PDF pages) so page breaks on screen match the download exactly.
7. **AI writing help** (improve summary/bullets without inventing facts) via a server route with a server-side API key and rate limiting — needs an API key from the owner.
8. **Individual template pages** (`/cv-templates/modern` …) once each has enough unique content.
9. **Offline support (PWA)** for users with unreliable connections.
10. **Accounts and cloud sync** (PostgreSQL) if users ask to access CVs across devices without backup files.
11. **Word (.docx) export** for employers who require it.
12. **Content Security Policy** header once the final set of third-party scripts (analytics, ads) is known.
13. **Premium features** (e.g. ad-free, extra templates) based on usage data; `premium` flags already exist in the template registry.

## Completed

Verified with the automated test suite (115 unit/component tests, 23 end-to-end checks on desktop and mobile Chrome), a production build, and manual review of screenshots and generated PDFs.

- **CV builder** with all sections from the product spec; add, edit, reorder and delete entries; confirmation before deleting entries with content and before starting a new CV.
- **Five professional templates** (Modern, Classic, Minimal, Graduate, Professional), sharing one data model; empty sections are omitted; long names and long CVs handled.
- **Live preview** with page markers; Edit/Preview switch on phones; side-by-side on desktop.
- **PDF export** in the browser: A4, embedded fonts, selectable text, clickable email/links, photos, multi-page with consistent margins and headings kept with content. Verified for one-page, multi-page (4–5 pages), empty, no-experience and photo CVs, and Ghanaian characters (ɛ, ɔ, ₵).
- **Validation and error states:** inline errors after leaving a field; export blocked with a clear message and focus on the first problem; PDF failure message; storage-blocked and storage-full messages; recovered-draft message; 404 and error pages.
- **Loading states:** builder loading placeholder, "Preparing PDF…" button state, photo processing state.
- **Local persistence:** autosave, restore on reload, save on page close, backups (save/open), salvage of damaged drafts.
- **Example CVs:** six fictional examples with pages and one-click loading into the builder.
- **SEO:** unique titles and descriptions, canonical URLs, Open Graph image, BreadcrumbList/Article/WebSite/WebApplication structured data, sitemap, robots.txt, noindex builder, one H1 per page, internal linking between guides, examples and templates. Checked automatically for every sitemap URL.
- **Accessibility:** labelled fields, error messages linked to inputs, keyboard-operable controls, native dialogs, skip link, visible focus; no axe WCAG 2.1 A/AA violations on the tested pages.
- **Mobile:** no horizontal overflow on the builder in edit or preview mode; full journey passes on a Pixel 7 viewport.
- **Performance:** all pages statically generated; content pages ship only the framework baseline plus a tiny ad component; PDF library loaded on demand; fonts subsetted and preloaded.
- **Security and privacy:** no secrets in the repository; no server-side CV storage; JSON-LD escaped; security headers configured.
- **Monetisation hooks:** labelled ad slots on content pages only (never in the builder), `ads.txt` generation, analytics events without CV content — all disabled until configured.
- **README** documents setup, environment variables, testing, deployment and architecture.
