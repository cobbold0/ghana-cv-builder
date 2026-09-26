import { z } from "zod";

/**
 * Structural schema for a CV. It only enforces shape and length so that
 * half-finished drafts (e.g. a partly typed email) can always be saved and
 * restored. Format rules live in `validation.ts`.
 */

export const LIMITS = {
  short: 100,
  email: 254,
  phone: 30,
  url: 200,
  date: 7,
  summary: 1500,
  description: 2000,
  highlights: 3000,
  skill: 60,
  photo: 400_000,
  experience: 30,
  education: 20,
  skills: 60,
  projects: 20,
  certifications: 30,
  languages: 15,
  references: 6,
} as const;

const str = (max: number) => z.string().max(max).default("");
const id = z.string().min(1).max(64);

export const SKILL_LEVELS = ["", "beginner", "intermediate", "advanced", "expert"] as const;
export const LANGUAGE_LEVELS = ["", "basic", "conversational", "professional", "fluent", "native"] as const;

export const personalSchema = z.object({
  fullName: str(LIMITS.short),
  title: str(LIMITS.short),
  email: str(LIMITS.email),
  phone: str(LIMITS.phone),
  location: str(LIMITS.short),
  linkedin: str(LIMITS.url),
  website: str(LIMITS.url),
  photo: z
    .string()
    .max(LIMITS.photo)
    .refine((v) => v === "" || /^data:image\/(jpeg|png);base64,/.test(v), "Unsupported image")
    .default(""),
});

export const experienceSchema = z.object({
  id,
  position: str(LIMITS.short),
  company: str(LIMITS.short),
  location: str(LIMITS.short),
  startDate: str(LIMITS.date),
  endDate: str(LIMITS.date),
  current: z.boolean().default(false),
  description: str(LIMITS.description),
  highlights: str(LIMITS.highlights),
});

export const educationSchema = z.object({
  id,
  institution: str(LIMITS.short),
  degree: str(LIMITS.short),
  field: str(LIMITS.short),
  location: str(LIMITS.short),
  startDate: str(LIMITS.date),
  endDate: str(LIMITS.date),
  description: str(LIMITS.description),
});

export const skillSchema = z.object({
  id,
  name: str(LIMITS.skill),
  level: z.enum(SKILL_LEVELS).catch("").default(""),
});

export const projectSchema = z.object({
  id,
  name: str(LIMITS.short),
  description: str(LIMITS.description),
  tools: str(LIMITS.short * 2),
  url: str(LIMITS.url),
});

export const certificationSchema = z.object({
  id,
  name: str(LIMITS.short),
  issuer: str(LIMITS.short),
  date: str(LIMITS.date),
  url: str(LIMITS.url),
});

export const languageSchema = z.object({
  id,
  name: str(LIMITS.skill),
  proficiency: z.enum(LANGUAGE_LEVELS).catch("").default(""),
});

export const referenceSchema = z.object({
  id,
  name: str(LIMITS.short),
  position: str(LIMITS.short),
  organization: str(LIMITS.short),
  email: str(LIMITS.email),
  phone: str(LIMITS.phone),
});

export const cvSchema = z.object({
  personal: personalSchema.default(personalSchema.parse({})),
  summary: str(LIMITS.summary),
  experience: z.array(experienceSchema).max(LIMITS.experience).default([]),
  education: z.array(educationSchema).max(LIMITS.education).default([]),
  skills: z.array(skillSchema).max(LIMITS.skills).default([]),
  projects: z.array(projectSchema).max(LIMITS.projects).default([]),
  certifications: z.array(certificationSchema).max(LIMITS.certifications).default([]),
  languages: z.array(languageSchema).max(LIMITS.languages).default([]),
  references: z.array(referenceSchema).max(LIMITS.references).default([]),
  referencesOnRequest: z.boolean().default(false),
});

export type CV = z.infer<typeof cvSchema>;
export type Personal = CV["personal"];
export type Experience = CV["experience"][number];
export type Education = CV["education"][number];
export type Skill = CV["skills"][number];
export type Project = CV["projects"][number];
export type Certification = CV["certifications"][number];
export type Language = CV["languages"][number];
export type Reference = CV["references"][number];
export type SkillLevel = Skill["level"];
export type LanguageLevel = Language["proficiency"];

export function emptyCv(): CV {
  return cvSchema.parse({});
}

export function newId(): string {
  return typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export const newEntry = {
  experience: (): Experience => experienceSchema.parse({ id: newId() }),
  education: (): Education => educationSchema.parse({ id: newId() }),
  skills: (): Skill => skillSchema.parse({ id: newId() }),
  projects: (): Project => projectSchema.parse({ id: newId() }),
  certifications: (): Certification => certificationSchema.parse({ id: newId() }),
  languages: (): Language => languageSchema.parse({ id: newId() }),
  references: (): Reference => referenceSchema.parse({ id: newId() }),
};
