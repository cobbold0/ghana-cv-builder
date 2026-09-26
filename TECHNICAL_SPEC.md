# Ghana CV Builder — Technical Specification

## 1. Technical objective

Build a production-ready, SEO-friendly web application for creating professional CVs.

The architecture must remain simple enough for one developer to maintain while supporting future growth.

Prioritize:

- Performance
- SEO
- Reliability
- Maintainability
- Mobile usability
- Clean architecture
- Low infrastructure cost

Do not introduce infrastructure that is unnecessary for the MVP.

## 2. Recommended stack

Use the following stack unless the repository already contains a reasonable alternative.

### Frontend / application

- Next.js
- TypeScript
- React
- Tailwind CSS

Use the current stable versions available when development begins.

### UI

Use a clean component architecture.

Prefer lightweight reusable components over a large UI framework.

### Validation

Use:

- Zod

for shared schema validation where appropriate.

### Forms

Use:

- React Hook Form

where it materially simplifies complex CV forms.

### State

Prefer React state and local state management.

Do not introduce Redux or another global state framework unless there is a demonstrated need.

### Persistence

For anonymous users:

- Browser local storage or IndexedDB

For future authenticated users:

- PostgreSQL

Do not require a database for basic anonymous CV creation unless necessary.

## 3. Architecture

Prefer a modular Next.js application.

Suggested structure:

```text
app/
  page.tsx
  builder/
  templates/
  cv-templates/
  cv-examples/
  resources/
  api/

components/
  builder/
  cv/
  templates/
  ui/
  layout/

lib/
  validation/
  pdf/
  templates/
  storage/
  seo/
  utils/

types/
```

Adapt the structure if a better organization is appropriate.

Do not blindly follow this structure if the framework version uses a better convention.

## 4. Application routes

At minimum consider:

```text
/
/builder
/templates
/cv-templates
/cv-examples
/cv-format
/how-to-write-a-cv
```

Additional SEO pages may be added when justified.

Builder-specific routes should not accidentally become indexed search pages.

## 5. CV data model

Create a strongly typed CV model.

Example conceptual structure:

```text
CV
├── personal
│   ├── fullName
│   ├── title
│   ├── email
│   ├── phone
│   ├── location
│   ├── linkedin
│   ├── website
│   └── photo
│
├── summary
│
├── experience[]
│   ├── company
│   ├── position
│   ├── location
│   ├── startDate
│   ├── endDate
│   ├── current
│   └── description
│
├── education[]
│   ├── institution
│   ├── degree
│   ├── field
│   ├── location
│   ├── startDate
│   ├── endDate
│   └── description
│
├── skills[]
│
├── projects[]
│
├── certifications[]
│
├── languages[]
│
└── references[]
```

Use TypeScript interfaces/types and validation schemas.

The model must be extensible.

## 6. Builder architecture

Separate the builder into logical areas. For example:

```text
Builder
├── PersonalInformation
├── Summary
├── Experience
├── Education
├── Skills
├── Projects
├── Certifications
├── Languages
├── References
└── TemplateSelector
```

Do not put the entire builder into one giant React component.

## 7. Editing experience

The user should be able to add, edit, reorder and delete repeatable sections.

Repeatable sections include:

- Experience
- Education
- Projects
- Certifications
- Languages
- References
- Skills

The interface should make these operations obvious.

Use sensible defaults. For example:

```text
Add experience
Add education
Add project
```

Avoid forcing users to understand the underlying data model.

## 8. Draft persistence

Anonymous CV data should persist locally.

The user should not lose their work because of:

- Page refresh
- Accidental navigation
- Browser restart where local persistence supports it

Provide an explicit mechanism to:

- Clear CV
- Start a new CV

Warn the user before destructive actions.

Do not store sensitive CV data remotely unless necessary.

## 9. Template architecture

Templates must be independent rendering components.

Conceptually:

```text
templates/
├── modern/
├── classic/
├── minimal/
├── graduate/
└── professional/
```

Each template receives the same normalized CV data model. For example:

```text
CV data
   ↓
Template renderer
   ↓
CV document
```

Do not duplicate the CV data model for every template.

Adding a new template should require creating a new renderer rather than rewriting the builder.

## 10. Template requirements

Every template must:

- Be printable
- Work on A4
- Handle multiple pages
- Preserve readable typography
- Handle missing sections gracefully
- Handle long names
- Handle long job descriptions
- Handle many experience entries
- Handle many education entries

Do not allow empty sections to create large visual gaps.

## 11. PDF generation

Choose the most reliable approach supported by the selected Next.js architecture.

Evaluate options such as:

- Browser print/PDF
- Server-side PDF rendering
- HTML-to-PDF
- React-based PDF rendering

Select the simplest reliable solution.

The final PDF must be suitable for job applications.

Test:

- One-page CV
- Two-page CV
- Long CV
- Minimal CV
- CV with no experience
- CV with many sections
- CV with long descriptions

Pay particular attention to:

- Page breaks
- Headers
- Footers
- Margins
- Font rendering
- Clipped content

## 12. Mobile behavior

The builder must work on mobile devices.

On small screens:

- Form controls should remain usable
- Preview should remain accessible
- Navigation should remain simple
- Buttons should be easy to tap
- Long forms should not feel overwhelming

A practical mobile pattern may be:

```text
Edit | Preview
```

rather than displaying the complete editor and full CV preview simultaneously.

Use the best UX pattern based on implementation.

## 13. Desktop behavior

On desktop, consider a workspace layout such as:

```text
┌──────────────────┬───────────────────────┐
│                  │                       │
│   CV editor      │      CV preview       │
│                  │                       │
│                  │                       │
└──────────────────┴───────────────────────┘
```

The preview should remain visible while editing where practical.

## 14. API architecture

Do not create APIs for functionality that can safely run entirely on the client.

Server APIs may eventually be used for:

- AI features
- Authentication
- Cloud persistence
- Premium functionality
- Analytics events
- Server-side PDF generation

Keep API boundaries clear.

Validate API input server-side.

## 15. Database

Do not introduce PostgreSQL simply because it is available.

For the anonymous MVP, local persistence is preferred.

If server persistence is implemented, use PostgreSQL.

Potential future tables:

```text
users
cvs
cv_versions
templates
subscriptions
ai_generations
```

Do not implement all of these unless required.

## 16. Authentication

Authentication is not required for the basic MVP.

If implemented later, support:

- Secure sessions
- Account deletion
- CV deletion
- Multiple CVs
- Secure authorization

Never rely exclusively on frontend checks for authorization.

## 17. Analytics

Prepare the architecture for analytics.

Potential events:

```text
builder_started
cv_created
template_selected
section_added
preview_opened
pdf_exported
```

Do not collect unnecessary personal information.

Analytics should measure product usage, not individual CV content.

## 18. SEO architecture

Important marketing/content pages should be server-rendered and indexable.

Builder pages should generally not become duplicate/thin indexed pages.

Use:

- Metadata API
- Canonical URLs
- Sitemap
- Robots configuration
- Open Graph metadata
- Structured data where appropriate

Use semantic HTML.

## 19. SEO page architecture

Content pages should have a reusable structure. For example:

```text
SEOPage
├── title
├── introduction
├── useful content
├── examples
├── related resources
└── CTA
```

Do not create a generic page generator that produces nearly identical pages with different keywords.

## 20. Performance

Optimize for Core Web Vitals.

Prioritize:

- Server rendering where beneficial
- Minimal JavaScript
- Optimized fonts
- Optimized images
- Lazy loading where appropriate
- Code splitting
- Avoiding unnecessary client components

The builder may require client-side interactivity, but public SEO pages should remain lightweight.

## 21. Error handling

Every important operation should have a meaningful failure state. Examples:

- PDF generation fails
- Browser storage unavailable
- Invalid CV data
- Unexpected application error

Do not expose technical stack traces to users.

Provide actionable messages.

## 22. Accessibility

Implement:

- Semantic headings
- Labels for inputs
- Keyboard navigation
- Focus management
- Accessible dialogs
- Accessible error messages
- Proper button semantics

Do not rely on color alone to communicate state.

## 23. Security

Protect:

- API routes
- Server actions
- AI endpoints
- Authentication
- Database access

Never expose:

- API keys
- Database credentials
- Internal tokens

Use environment variables.

Provide `.env.example`.

Never commit `.env`.

## 24. Environment variables

Document required variables in:

```text
.env.example
```

Only add environment variables when actually required.

Potential future variables:

```text
DATABASE_URL=
AI_API_KEY=
NEXT_PUBLIC_ANALYTICS_ID=
```

Do not create fake values that look like real credentials.

## 25. Testing strategy

Prioritize tests around business-critical behavior.

### Unit tests

Test:

- CV validation
- Date handling
- Data transformations
- Template data handling
- Local persistence
- Utility functions

### Integration tests

Test:

- Creating a CV
- Editing sections
- Selecting templates
- Exporting a CV

### End-to-end

If practical, test:

```text
Landing page
→ Builder
→ Enter information
→ Select template
→ Preview
→ Export
```

## 26. Deployment

The application should be deployable using a mainstream Next.js-compatible platform.

Prefer a low-maintenance deployment model.

Do not introduce Kubernetes, complex containers or multiple services unless required.

Document deployment requirements in README.

## 27. Infrastructure cost

The initial product should aim for extremely low operating costs.

Avoid paid infrastructure until usage requires it.

Prefer:

- Serverless where appropriate
- Browser-side processing where practical
- Free/low-cost databases
- CDN caching
- Static/SSR pages

The architecture should allow traffic to grow without immediately requiring a large server.

## 28. Development sequence

Build in this order:

1. **Phase 1** — Project foundation.
2. **Phase 2** — Homepage.
3. **Phase 3** — CV data model and validation.
4. **Phase 4** — Builder interface.
5. **Phase 5** — Template system.
6. **Phase 6** — Live preview.
7. **Phase 7** — PDF export.
8. **Phase 8** — Local persistence.
9. **Phase 9** — SEO pages.
10. **Phase 10** — Testing and polish.
11. **Phase 11** — Production configuration.
12. **Phase 12** — Monetization integration points.

Do not move to monetization before the core product works reliably.

## 29. Definition of technical completion

The technical MVP is complete when:

- Application builds successfully
- Core builder works
- CV data validates
- Multiple templates work
- Preview works
- PDF export works
- Local persistence works
- Mobile UI works
- Desktop UI works
- Important tests pass
- SEO fundamentals exist
- No secrets are committed
- Production configuration is documented
- README is complete
- NEXT_STEPS.md clearly identifies remaining owner actions

## 30. Engineering decision rule

When multiple technically valid solutions exist, choose the solution that is:

1. Simpler
2. Cheaper
3. More reliable
4. Easier to maintain
5. Better for SEO
6. Easier to replace later

Do not optimize for architectural sophistication.

Optimize for shipping a useful product.
