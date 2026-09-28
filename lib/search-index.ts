import { EXAMPLES } from "@/lib/examples";
import { GUIDES } from "@/lib/guides";
import type { SearchItem } from "@/lib/search";
import { TEMPLATES } from "@/lib/templates/registry";

/** Builds the search index on the server; served as /search-index.json. */
export function buildSearchIndex(): SearchItem[] {
  return [
    { href: "/builder", title: "Create my CV", description: "Open the free CV builder.", kind: "Page", keywords: "builder start make write new resume maker" },
    { href: "/cv-templates", title: "CV templates", description: "All free CV templates, with filters.", kind: "Page", keywords: "design layout resume" },
    { href: "/cv-examples", title: "CV examples", description: "Example CVs for different jobs and levels.", kind: "Page", keywords: "samples resume jobs" },
    { href: "/cv-guides", title: "CV guides", description: "All guides on writing and sending your CV.", kind: "Page", keywords: "help advice tips articles" },
    { href: "/cv-builder", title: "How the CV builder works", description: "Using the builder, saving and privacy.", kind: "Page", keywords: "help backup save pdf download" },
    { href: "/about", title: "About", description: "About Ghana CV Builder and how to contact us.", kind: "Page", keywords: "contact email" },
    { href: "/privacy", title: "Privacy policy", description: "How your information and cookies are handled.", kind: "Page", keywords: "cookies data consent" },
    ...GUIDES.map((g) => ({ href: g.href, title: g.title, description: g.description, kind: "Guide" as const, keywords: "how to write" })),
    ...EXAMPLES.map((e) => ({
      href: `/cv-examples/${e.slug}`,
      title: e.title,
      description: e.audience,
      kind: "Example" as const,
      keywords: `${e.label} sample resume ${e.cv.personal.title}`,
    })),
    ...TEMPLATES.map((t) => ({
      href: `/builder?template=${t.id}`,
      title: `${t.name} template`,
      description: t.tagline,
      kind: "Template" as const,
      keywords: `${t.bestFor.join(" ")} ${t.styles.join(" ")} ${t.supportsPhoto ? "photo picture" : ""} ${t.columns === 2 ? "two column" : "single column"}`,
    })),
  ];
}
