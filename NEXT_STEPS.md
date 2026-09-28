# Next Steps

This file is maintained by Claude Code.

It must always reflect the actual current state of the project.

## Owner must do

1. **AdSense:** in the `cobbold.dev` site, tick "I've published the ads.txt file", click **Verify**, then **Request review**. (`https://cobbold.dev/ads.txt` is served by the `my-portfolio` project and covers every `*.cobbold.dev` site.)
2. **After AdSense approval:** create a Display ad unit (Ads → By ad unit) and set its ID as `NEXT_PUBLIC_ADSENSE_SLOT` in Vercel (or give it to Claude to build in), then redeploy. Turn on the consent message under **Privacy & messaging** before serving ads to EEA/UK visitors.
3. **Delete the old branch** `claude/amazing-faraday-spzpl3` on GitHub (Branches page). It is fully merged into `main`.
4. **my-portfolio:** merge `Production` back into `Develop` (an `ads.txt` commit was pushed directly to `Production`).
5. **Search Console:** if the sitemap still shows "could not be read", remove and resubmit `sitemap.xml`, and use URL Inspection → Test live URL.
6. **Review the privacy policy and terms of use** (`/privacy`, `/terms`) with someone qualified, including whether you need to register with Ghana's Data Protection Commission.
7. **Analytics:** confirm visits appear in GA4 (`G-PP7163Z5PK`) under Reports → Realtime.

## Optional improvements

Prioritised by practical value.

1. **Contact/about details** once the owner provides a contact email.
2. **More content:** further examples (pharmacist, electrician, procurement, sales representative, HR officer) and guides (interview tips, CV for jobs abroad, references) based on Search Console queries.
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
- **Ten professional templates** (Modern, Classic, Minimal, Graduate, Professional, Sidebar, Timeline, Executive, Compact, Bold), sharing one data model; empty sections are omitted; long names and long CVs paginate in every template (verified by PDF tests), and every example fits on one page in its template.
- **Live preview** with page markers; Edit/Preview switch on phones; side-by-side on desktop.
- **PDF export** in the browser: A4, embedded fonts, selectable text, clickable email/links, photos, multi-page with consistent margins and headings kept with content. Verified for one-page, multi-page (4–5 pages), empty, no-experience and photo CVs, and Ghanaian characters (ɛ, ɔ, ₵).
- **Validation and error states:** inline errors after leaving a field; export blocked with a clear message and focus on the first problem; PDF failure message; storage-blocked and storage-full messages; recovered-draft message; 404 and error pages.
- **Loading states:** builder loading placeholder, "Preparing PDF…" button state, photo processing state.
- **Local persistence:** autosave, restore on reload, save on page close, backups (save/open), salvage of damaged drafts.
- **Example CVs:** 15 fictional examples in four categories (students and graduates, business and office, health and education, technical and trades), each with its own page and one-click loading into the builder; all verified to render as a one-page PDF.
- **Guides:** 14 guides plus a `/cv-guides` hub, including professional summary, work experience, skills, CV with no experience, CV mistakes, CV vs résumé and application letters.
- **SEO:** production domain `https://ghanacv.cobbold.dev` built in (sitemap, robots.txt, canonical and Open Graph URLs verified against a production build); optional Search Console verification tag; unique titles and descriptions, canonical URLs, Open Graph image, BreadcrumbList/Article/WebSite/WebApplication structured data, sitemap, robots.txt, noindex builder, one H1 per page, internal linking between guides, examples and templates. Checked automatically for every sitemap URL.
- **Accessibility:** labelled fields, error messages linked to inputs, keyboard-operable controls, native dialogs, skip link, visible focus; no axe WCAG 2.1 A/AA violations on the tested pages.
- **Mobile:** no horizontal overflow on the builder in edit or preview mode; full journey passes on a Pixel 7 viewport.
- **Performance:** all pages statically generated; content pages ship only the framework baseline plus a tiny ad component; PDF library loaded on demand; fonts subsetted and preloaded.
- **Security and privacy:** no secrets in the repository; no server-side CV storage; JSON-LD escaped; security headers configured.
- **Google Analytics 4** (`G-PP7163Z5PK`) loads on production builds, with product events that never include CV content.
- **Deployment:** live on Vercel at `https://ghanacv.cobbold.dev` (DNS on Cloudflare); `ads.txt` verified on both `ghanacv.cobbold.dev` and `cobbold.dev`.
- **AdSense** publisher `ca-pub-5952797612434262` wired in: verification meta tag on every page, ad script on content pages only, `/ads.txt`.
- **Cookie consent:** Google Consent Mode v2 — analytics and ad storage denied by default for EEA/UK/Swiss visitors until they answer Google's AdSense consent message; granted elsewhere. "Cookie settings" footer link reopens the message. Verified in a browser that consent defaults precede the Analytics config.
- **Ads:** two in-content ad units on the long guides (how to write a CV, CV format, Ghana CV, professional CV), one on other content pages, none in the builder; unfilled slots are hidden.
- **Contact:** augustine@cobbold.dev on the About, Privacy and Terms pages and in the footer.
- **Monetisation hooks:** labelled ad slots on content pages only (never in the builder), `ads.txt` generation, analytics events without CV content — all disabled until configured.
- **README** documents setup, environment variables, testing, deployment and architecture.
