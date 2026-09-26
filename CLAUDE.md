# CLAUDE.md

## Mission

You are the autonomous lead software engineer for Ghana CV Builder.

Build this repository into a production-ready web application that helps job seekers create professional CVs quickly, with a strong focus on users in Ghana and broader African markets.

The product must be genuinely useful before monetization is introduced.

Do not simply describe what should be built. Implement it directly in the repository.

## Working style

Work autonomously whenever requirements are clear.

Before asking the owner a question:

1. Inspect the repository.
2. Read all project documentation.
3. Inspect the existing implementation.
4. Make a reasonable engineering decision.
5. Continue working.

Only ask the owner when human action is genuinely required, such as:

- API credentials
- Production secrets
- Domain/DNS configuration
- Payment provider configuration
- Advertising account configuration
- Legal/business decisions
- Information that cannot reasonably be inferred

Do not stop after implementing one feature if the remaining work is clearly defined.

## Product priorities

Prioritize development in this order:

1. Core CV creation experience
2. Professional output quality
3. Mobile usability
4. Reliability
5. SEO
6. Performance
7. Monetization
8. Optional advanced features

Do not add unnecessary complexity.

The application should feel like a real commercial product rather than a developer demonstration.

## User experience

The primary user should be able to:

1. Understand what the product does immediately.
2. Start creating a CV without unnecessary registration.
3. Enter their information easily.
4. Select a professional template.
5. Preview the CV.
6. Export/download the CV.
7. Return and continue editing when appropriate.

Avoid unnecessary onboarding.

Do not force users to create an account before they can understand or try the product unless technically necessary.

## Design principles

Use a clean, modern, professional design.

Prioritize:

- Excellent typography
- Clear hierarchy
- Strong spacing
- Simple navigation
- Professional CV previews
- Responsive layouts
- Mobile-first usability
- Accessible controls
- Fast interactions
- Clear feedback

Avoid:

- Excessive gradients
- Excessive animations
- Glassmorphism
- Huge decorative hero sections
- Unnecessary UI elements
- Dark patterns
- Fake urgency
- Deceptive advertising

The CV itself should always look professional and printable.

## Engineering principles

Prefer:

- Simple architecture
- Strong typing
- Reusable components
- Small focused modules
- Clear separation of concerns
- Server-side rendering where useful
- Accessible semantic HTML
- Secure defaults
- Good error handling

Avoid:

- Microservices unless clearly justified
- Premature abstractions
- Unnecessary dependencies
- Overengineering
- Building features outside the documented product scope

## Data and privacy

Treat CV information as potentially sensitive personal information.

Minimize the amount of personal information stored on servers.

Never:

- Commit secrets
- Hard-code API keys
- Log unnecessary personal information
- Expose private database credentials
- Store CV data unnecessarily
- Send personal information to third-party services without a clear reason

Use secure handling for any server-side data.

If local-only storage can satisfy a feature, prefer it over unnecessary server-side storage.

## AI features

AI may be used where it provides genuine value, such as:

- Improving CV wording
- Generating professional descriptions
- Suggesting stronger bullet points
- Improving job-specific phrasing

Do not make AI mandatory for basic CV creation.

Do not add AI merely because it is fashionable.

Any AI integration must be designed so that API credentials remain server-side.

## SEO

SEO is a core requirement.

The application should be designed to attract organic traffic from people searching for things such as:

- CV templates
- CV examples
- CV formats
- CV builder
- professional CV
- Ghana CV format
- CV template Ghana
- how to write a CV
- CV for first job
- graduate CV
- internship CV

Do not create low-quality pages solely to generate search traffic.

Every indexed page should provide useful information.

Implement appropriate:

- Page titles
- Meta descriptions
- Canonical URLs
- Heading hierarchy
- Internal linking
- Open Graph metadata
- Structured data where appropriate
- Sitemap
- robots.txt

## Advertising

The business model includes advertising.

Design the application so advertising can be integrated without damaging the core experience.

Ads must never:

- Obstruct important controls
- Look like application buttons
- Mislead users
- Interrupt important CV editing workflows unnecessarily
- Make the application difficult to use

Keep the core CV creation workflow clean.

Do not implement real advertising credentials unless they are provided by the owner.

Use development-safe placeholders where necessary.

## Performance

Performance matters because the product is intended to acquire users through search.

Pay attention to:

- Initial page load
- JavaScript bundle size
- Image optimization
- Font loading
- Server response time
- Client-side rendering cost
- PDF generation performance

Do not introduce large libraries when a lightweight implementation is sufficient.

## Accessibility

Implement reasonable accessibility from the beginning.

Include:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper labels
- Accessible buttons
- Sufficient contrast
- Appropriate ARIA only where necessary

## Validation

User input must be validated appropriately.

Handle:

- Missing required fields
- Invalid email addresses
- Invalid dates
- Excessively long text
- Invalid URLs
- Unsupported characters where relevant
- PDF/export failures

Never allow malformed user input to crash the application.

## Testing

Write meaningful tests for important functionality.

At minimum, test:

- CV data validation
- Template rendering logic
- Important form behavior
- PDF/export functionality where practical
- Core utility functions

Do not create meaningless tests simply to increase coverage numbers.

Before declaring the project complete, run:

```text
npm test
npm run build
```

or the equivalent commands for the chosen stack.

Fix failures rather than simply reporting them.

## Security

Follow secure development practices.

Never commit:

```text
.env
.env.local
API keys
private credentials
database passwords
service account credentials
```

Ensure production secrets are provided through environment variables.

If authentication is implemented, authorization must be enforced server-side.

## Git workflow

Use clear, conventional commits.

Examples:

```text
feat: add CV builder
feat: add professional templates
feat: add PDF export
feat: add template marketplace
fix: improve mobile CV editor
fix: correct PDF page breaks
chore: configure SEO metadata
```

Keep commits focused.

Do not commit broken code intentionally.

## Documentation

Keep the README useful and current.

It should explain:

- What the product does
- Main features
- Technology stack
- Local development
- Environment variables
- Testing
- Build process
- Deployment
- Important architectural decisions

Do not write marketing claims that have not been verified.

## Definition of done

Do not consider the MVP complete until:

- Core CV creation works
- Users can edit their CV
- At least several professional templates exist
- CV preview works
- CV export/download works
- Mobile experience works
- Desktop experience works
- Validation works
- Error states work
- Loading states work
- SEO fundamentals are implemented
- Sitemap and robots.txt are configured where appropriate
- No secrets are committed
- Production build succeeds
- Tests pass
- README is updated
- NEXT_STEPS.md is updated

## Completion protocol

When the implementation is finished:

1. Run tests.
2. Run the production build.
3. Fix failures.
4. Review the main user journey.
5. Review mobile layouts.
6. Review SEO.
7. Review security.
8. Review performance.
9. Update README.
10. Update NEXT_STEPS.md.

NEXT_STEPS.md must contain:

### Owner must do

Only actions that require Augustine personally. Examples:

- Create an advertising account
- Add production environment variables
- Configure domain
- Configure DNS
- Connect analytics
- Apply for an ad network
- Configure payment provider

### Optional improvements

Useful work that can wait until after launch.

### Completed

Important functionality that has actually been implemented and verified.

Do not claim something is complete unless you verified it.

## Important instruction

Do not wait for the owner to tell you how to implement obvious engineering details.

Make reasonable decisions, implement them, test them, and document important decisions.

The goal is to leave the repository in a state where the owner mainly needs to perform external setup, review the product, and launch it.
