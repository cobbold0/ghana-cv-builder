import { cvSchema, emptyCv, type CV } from "@/lib/cv/schema";
import { DEFAULT_TEMPLATE, isTemplateId, type TemplateId } from "@/lib/templates/registry";

/**
 * Drafts are stored only in this browser (localStorage). Nothing is sent to a server.
 * The payload is versioned so the format can change without losing users' work.
 */
export const DRAFT_KEY = "gcvb:draft";
const BACKUP_KEY = "gcvb:draft-unreadable";
const VERSION = 1;

export interface Draft {
  cv: CV;
  templateId: TemplateId;
  updatedAt: string;
}

export type LoadResult =
  | { status: "empty" }
  | { status: "loaded"; draft: Draft }
  | { status: "recovered"; draft: Draft }
  | { status: "unavailable" };

function storage(): Storage | null {
  try {
    const s = window.localStorage;
    const probe = "gcvb:probe";
    s.setItem(probe, "1");
    s.removeItem(probe);
    return s;
  } catch {
    return null;
  }
}

export function isStorageAvailable(): boolean {
  return storage() !== null;
}

/** Parse anything (possibly old or damaged) into a valid draft, keeping as much as possible. */
export function parseDraft(raw: unknown): { draft: Draft; lossy: boolean } | null {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw as Record<string, unknown>;
  const templateId = isTemplateId(obj.templateId) ? obj.templateId : DEFAULT_TEMPLATE;
  const updatedAt = typeof obj.updatedAt === "string" ? obj.updatedAt : new Date().toISOString();
  const full = cvSchema.safeParse(obj.cv);
  if (full.success) return { draft: { cv: full.data, templateId, updatedAt }, lossy: false };

  // Salvage section by section so one bad field doesn't wipe the whole CV.
  if (!obj.cv || typeof obj.cv !== "object") return null;
  const source = obj.cv as Record<string, unknown>;
  const cv = emptyCv() as Record<string, unknown>;
  for (const key of Object.keys(cvSchema.shape) as (keyof CV)[]) {
    const field = cvSchema.shape[key].safeParse(source[key]);
    if (field.success) cv[key] = field.data;
  }
  return { draft: { cv: cv as CV, templateId, updatedAt }, lossy: true };
}

export function loadDraft(): LoadResult {
  const s = storage();
  if (!s) return { status: "unavailable" };
  const text = s.getItem(DRAFT_KEY);
  if (!text) return { status: "empty" };
  let raw: unknown;
  try {
    raw = JSON.parse(text);
  } catch {
    s.setItem(BACKUP_KEY, text);
    return { status: "empty" };
  }
  const parsed = parseDraft(raw);
  if (!parsed) {
    s.setItem(BACKUP_KEY, text);
    return { status: "empty" };
  }
  if (parsed.lossy) s.setItem(BACKUP_KEY, text);
  return { status: parsed.lossy ? "recovered" : "loaded", draft: parsed.draft };
}

export function saveDraft(cv: CV, templateId: TemplateId): boolean {
  const s = storage();
  if (!s) return false;
  try {
    s.setItem(DRAFT_KEY, JSON.stringify({ version: VERSION, templateId, cv, updatedAt: new Date().toISOString() }));
    return true;
  } catch {
    // Quota exceeded (usually a large photo) or storage blocked.
    return false;
  }
}

export function clearDraft() {
  try {
    storage()?.removeItem(DRAFT_KEY);
  } catch {
    /* ignore */
  }
}

/** Export the draft as a JSON file the user can keep or move to another device. */
export function draftToJson(cv: CV, templateId: TemplateId): string {
  return JSON.stringify({ version: VERSION, templateId, cv, updatedAt: new Date().toISOString() }, null, 2);
}
