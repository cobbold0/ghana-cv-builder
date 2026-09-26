import type { CV, LanguageLevel, SkillLevel } from "./schema";
import { formatCvDate, formatDateRange } from "./dates";
import { cleanText, displayUrl, hrefFor, toBullets, toParagraphs } from "./text";

/** Render-ready CV: cleaned text, formatted dates, empty entries removed. */
export interface RenderCv {
  name: string;
  title: string;
  photo: string;
  contacts: { kind: "email" | "phone" | "location" | "linkedin" | "website"; text: string; href?: string }[];
  summary: string[];
  experience: { position: string; company: string; location: string; dates: string; description: string[]; bullets: string[] }[];
  education: { degree: string; institution: string; location: string; dates: string; description: string[] }[];
  skills: { name: string; level: string }[];
  projects: { name: string; description: string[]; tools: string; url: string; href: string }[];
  certifications: { name: string; issuer: string; date: string; url: string; href: string }[];
  languages: { name: string; proficiency: string }[];
  references: { name: string; position: string; organization: string; email: string; phone: string }[];
  referencesOnRequest: boolean;
}

export const SKILL_LEVEL_LABELS: Record<SkillLevel, string> = {
  "": "",
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  expert: "Expert",
};

export const LANGUAGE_LEVEL_LABELS: Record<LanguageLevel, string> = {
  "": "",
  basic: "Basic",
  conversational: "Conversational",
  professional: "Professional working",
  fluent: "Fluent",
  native: "Native",
};

const hasAny = (o: Record<string, unknown>) =>
  Object.values(o).some((v) => (typeof v === "string" ? v.length > 0 : Array.isArray(v) ? v.length > 0 : false));

export function normalizeCv(cv: CV): RenderCv {
  const p = cv.personal;
  const c = cleanText;
  const contacts: RenderCv["contacts"] = [];
  if (c(p.email)) contacts.push({ kind: "email", text: c(p.email), href: `mailto:${c(p.email)}` });
  if (c(p.phone)) contacts.push({ kind: "phone", text: c(p.phone), href: `tel:${c(p.phone).replace(/[^\d+]/g, "")}` });
  if (c(p.location)) contacts.push({ kind: "location", text: c(p.location) });
  if (c(p.linkedin)) contacts.push({ kind: "linkedin", text: displayUrl(p.linkedin), href: hrefFor(p.linkedin) });
  if (c(p.website)) contacts.push({ kind: "website", text: displayUrl(p.website), href: hrefFor(p.website) });

  return {
    name: c(p.fullName),
    title: c(p.title),
    photo: p.photo,
    contacts,
    summary: toParagraphs(cv.summary),
    experience: cv.experience
      .map((e) => ({
        position: c(e.position),
        company: c(e.company),
        location: c(e.location),
        dates: formatDateRange(e.startDate, e.endDate, e.current),
        description: toParagraphs(e.description),
        bullets: toBullets(e.highlights),
      }))
      .filter(hasAny),
    education: cv.education
      .map((e) => {
        const degree = c(e.degree);
        const field = c(e.field);
        return {
          degree: degree && field ? `${degree}, ${field}` : degree || field,
          institution: c(e.institution),
          location: c(e.location),
          dates: formatDateRange(e.startDate, e.endDate),
          description: toParagraphs(e.description),
        };
      })
      .filter(hasAny),
    skills: cv.skills.map((s) => ({ name: c(s.name), level: SKILL_LEVEL_LABELS[s.level] })).filter((s) => s.name),
    projects: cv.projects
      .map((pr) => ({
        name: c(pr.name),
        description: toParagraphs(pr.description),
        tools: c(pr.tools),
        url: c(pr.url) ? displayUrl(pr.url) : "",
        href: c(pr.url) ? hrefFor(pr.url) : "",
      }))
      .filter((pr) => pr.name || pr.description.length || pr.tools),
    certifications: cv.certifications
      .map((ce) => ({
        name: c(ce.name),
        issuer: c(ce.issuer),
        date: formatCvDate(ce.date),
        url: c(ce.url) ? displayUrl(ce.url) : "",
        href: c(ce.url) ? hrefFor(ce.url) : "",
      }))
      .filter((ce) => ce.name),
    languages: cv.languages
      .map((l) => ({ name: c(l.name), proficiency: LANGUAGE_LEVEL_LABELS[l.proficiency] }))
      .filter((l) => l.name),
    references: cv.references
      .map((r) => ({
        name: c(r.name),
        position: c(r.position),
        organization: c(r.organization),
        email: c(r.email),
        phone: c(r.phone),
      }))
      .filter((r) => r.name),
    referencesOnRequest: cv.referencesOnRequest,
  };
}
