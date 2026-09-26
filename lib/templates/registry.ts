/** Template metadata. Components live in `components/templates` and are looked up by id. */
export interface TemplateInfo {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  bestFor: string[];
  font: "sans" | "serif";
  supportsPhoto: boolean;
  /** Reserved for future premium templates; all current templates are free. */
  premium: boolean;
}

export const TEMPLATE_IDS = ["modern", "classic", "minimal", "graduate", "professional"] as const;
export type TemplateId = (typeof TEMPLATE_IDS)[number];
export const DEFAULT_TEMPLATE: TemplateId = "modern";

export const TEMPLATES: TemplateInfo[] = [
  {
    id: "modern",
    name: "Modern",
    tagline: "Clean sans-serif layout with a teal accent",
    description:
      "A clear single-column layout with a restrained colour accent for section headings. Easy to scan on screen and prints well in black and white.",
    bestFor: ["Most private-sector roles", "Tech, marketing and business jobs", "Online applications"],
    font: "sans",
    supportsPhoto: true,
    premium: false,
  },
  {
    id: "classic",
    name: "Classic",
    tagline: "Traditional serif layout, black and white",
    description:
      "A conservative, centred layout set in a serif typeface with ruled section headings. Employers and organisations first, then your role.",
    bestFor: ["Banking, law and public service", "Teaching and academic roles", "Printed applications"],
    font: "serif",
    supportsPhoto: false,
    premium: false,
  },
  {
    id: "minimal",
    name: "Minimal",
    tagline: "Generous white space, no colour",
    description:
      "Quiet typography and plenty of white space let your content do the talking. A good choice when you have strong experience to show.",
    bestFor: ["Design, writing and creative roles", "Experienced professionals", "Short, focused CVs"],
    font: "sans",
    supportsPhoto: false,
    premium: false,
  },
  {
    id: "graduate",
    name: "Graduate",
    tagline: "Education and projects first",
    description:
      "Puts education and projects ahead of work experience, so a CV with little work history still reads well. Includes room for national service, attachments and volunteering.",
    bestFor: ["Students and recent graduates", "National service and internship applications", "First jobs"],
    font: "sans",
    supportsPhoto: false,
    premium: false,
  },
  {
    id: "professional",
    name: "Professional",
    tagline: "Bold header band with an optional photo",
    description:
      "A strong dark header with your name and contact details, serif section headings and a clean body. Supports an optional profile photo.",
    bestFor: ["Mid-career and senior roles", "Sales, management and consulting", "Roles where a photo is expected"],
    font: "sans",
    supportsPhoto: true,
    premium: false,
  },
];

export function isTemplateId(v: unknown): v is TemplateId {
  return typeof v === "string" && (TEMPLATE_IDS as readonly string[]).includes(v);
}

export function getTemplateInfo(id: TemplateId): TemplateInfo {
  return TEMPLATES.find((t) => t.id === id)!;
}
