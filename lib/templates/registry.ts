/** Template metadata. Components live in `components/templates` and are looked up by id. */
export interface TemplateInfo {
  id: TemplateId;
  name: string;
  tagline: string;
  description: string;
  bestFor: string[];
  font: "sans" | "serif";
  supportsPhoto: boolean;
  /** Number of columns in the body; single-column is safest for applicant tracking systems. */
  columns: 1 | 2;
  /** Style tags used by the template filter. */
  styles: TemplateStyle[];
  /** Reserved for future premium templates; all current templates are free. */
  premium: boolean;
}

export const TEMPLATE_STYLES = {
  simple: "Simple",
  modern: "Modern",
  professional: "Professional",
  creative: "Creative",
} as const;
export type TemplateStyle = keyof typeof TEMPLATE_STYLES;

export const TEMPLATE_IDS = ["modern", "classic", "minimal", "graduate", "professional", "sidebar", "timeline", "executive", "compact", "bold"] as const;
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
    columns: 1,
    styles: ["modern"],
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
    columns: 1,
    styles: ["professional", "simple"],
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
    columns: 1,
    styles: ["simple"],
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
    columns: 1,
    styles: ["simple", "modern"],
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
    columns: 1,
    styles: ["professional"],
    premium: false,
  },
  {
    id: "sidebar",
    name: "Sidebar",
    tagline: "Two columns with a tinted side panel",
    description:
      "Contact details, skills and languages sit in a soft side panel, leaving the main column for your summary, experience and education. Supports an optional photo.",
    bestFor: ["Modern offices and start-ups", "Roles where skills matter as much as history", "CVs with many skills or languages"],
    font: "sans",
    supportsPhoto: true,
    columns: 2,
    styles: ["modern", "creative"],
    premium: false,
  },
  {
    id: "timeline",
    name: "Timeline",
    tagline: "Dates in a column down the left",
    description:
      "Puts every date in a column on the left so your career reads like a timeline. Makes steady progression easy to see at a glance.",
    bestFor: ["Steady career progression", "Public service and NGOs", "Showing long tenure clearly"],
    font: "sans",
    supportsPhoto: false,
    columns: 1,
    styles: ["modern", "professional"],
    premium: false,
  },
  {
    id: "executive",
    name: "Executive",
    tagline: "Navy and gold serif, understated and formal",
    description:
      "A formal layout with serif headings, a navy and gold palette and an executive profile. Organisations are listed first, then your role.",
    bestFor: ["Senior and management roles", "Board and director applications", "Finance, law and consulting"],
    font: "serif",
    supportsPhoto: false,
    columns: 1,
    styles: ["professional"],
    premium: false,
  },
  {
    id: "compact",
    name: "Compact",
    tagline: "Dense and efficient, fits more on a page",
    description:
      "Smaller type, tight spacing and shaded section bars fit a long career onto fewer pages without looking cramped. Contact details sit top right.",
    bestFor: ["Long careers and many roles", "Technical and engineering CVs", "Keeping to two pages"],
    font: "sans",
    supportsPhoto: false,
    columns: 1,
    styles: ["simple", "professional"],
    premium: false,
  },
  {
    id: "bold",
    name: "Bold",
    tagline: "Large name, red accent stripe",
    description:
      "A confident layout with a large name, a red stripe down the left edge and strong section headings. Supports an optional photo.",
    bestFor: ["Sales and marketing", "Creative and media roles", "Standing out in a pile of CVs"],
    font: "sans",
    supportsPhoto: true,
    columns: 1,
    styles: ["creative", "modern"],
    premium: false,
  },
];

export function isTemplateId(v: unknown): v is TemplateId {
  return typeof v === "string" && (TEMPLATE_IDS as readonly string[]).includes(v);
}

export function getTemplateInfo(id: TemplateId): TemplateInfo {
  return TEMPLATES.find((t) => t.id === id)!;
}
