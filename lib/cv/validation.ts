import type { CV } from "./schema";
import { isEndBeforeStart, isValidCvDate } from "./dates";
import { cleanText } from "./text";

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+?[0-9\s().-]{7,30}$/;

export function isValidEmail(v: string): boolean {
  return EMAIL_RE.test(v.trim());
}

export function isValidPhone(v: string): boolean {
  const digits = v.replace(/\D/g, "");
  return PHONE_RE.test(v.trim()) && digits.length >= 7 && digits.length <= 15;
}

/** Accepts "linkedin.com/in/ama" as well as full http(s) URLs. */
export function isValidUrl(v: string): boolean {
  const s = v.trim();
  if (/\s/.test(s)) return false;
  if (/^[a-z][a-z0-9+.-]*:/i.test(s) && !/^https?:\/\//i.test(s)) return false;
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    return /\.[a-z]{2,}$/i.test(u.hostname);
  } catch {
    return false;
  }
}

/**
 * Returns user-facing messages keyed by field path, e.g.
 * "personal.email" or "experience.<id>.endDate".
 */
export function validateCv(cv: CV, { forExport = false } = {}): FieldErrors {
  const errors: FieldErrors = {};
  const check = (path: string, value: string, ok: (v: string) => boolean, message: string) => {
    if (value.trim() !== "" && !ok(value)) errors[path] = message;
  };
  const dates = (prefix: string, start: string, end: string, current = false) => {
    check(`${prefix}.startDate`, start, isValidCvDate, "Enter a valid start date.");
    if (!current) {
      check(`${prefix}.endDate`, end, isValidCvDate, "Enter a valid end date.");
      if (isEndBeforeStart(start, end)) errors[`${prefix}.endDate`] = "End date must be after the start date.";
    }
  };

  const p = cv.personal;
  if (forExport && cleanText(p.fullName) === "") errors["personal.fullName"] = "Add your full name.";
  check("personal.email", p.email, isValidEmail, "Enter a valid email address, like ama@example.com.");
  check("personal.phone", p.phone, isValidPhone, "Enter a valid phone number, like +233 24 123 4567.");
  check("personal.linkedin", p.linkedin, isValidUrl, "Enter a valid link, like linkedin.com/in/your-name.");
  check("personal.website", p.website, isValidUrl, "Enter a valid website address.");

  for (const e of cv.experience) dates(`experience.${e.id}`, e.startDate, e.endDate, e.current);
  for (const e of cv.education) dates(`education.${e.id}`, e.startDate, e.endDate);
  for (const pr of cv.projects) check(`projects.${pr.id}.url`, pr.url, isValidUrl, "Enter a valid link.");
  for (const c of cv.certifications) {
    check(`certifications.${c.id}.date`, c.date, isValidCvDate, "Enter a valid date.");
    check(`certifications.${c.id}.url`, c.url, isValidUrl, "Enter a valid link.");
  }
  for (const r of cv.references) {
    check(`references.${r.id}.email`, r.email, isValidEmail, "Enter a valid email address.");
    check(`references.${r.id}.phone`, r.phone, isValidPhone, "Enter a valid phone number.");
  }
  return errors;
}

/** Which builder section a field path belongs to. */
export function sectionOf(path: string): string {
  return path.split(".")[0];
}
