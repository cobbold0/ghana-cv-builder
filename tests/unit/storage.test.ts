// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { cvSchema } from "@/lib/cv/schema";
import { SAMPLE_CV } from "@/lib/cv/sample";
import { DRAFT_KEY, clearDraft, loadDraft, parseDraft, saveDraft } from "@/lib/storage/draft";

beforeEach(() => localStorage.clear());

describe("draft storage", () => {
  it("returns empty when nothing is saved", () => {
    expect(loadDraft()).toEqual({ status: "empty" });
  });

  it("round-trips a CV and template", () => {
    expect(saveDraft(SAMPLE_CV, "classic")).toBe(true);
    const result = loadDraft();
    expect(result.status).toBe("loaded");
    if (result.status === "loaded") {
      expect(result.draft.cv).toEqual(SAMPLE_CV);
      expect(result.draft.templateId).toBe("classic");
    }
  });

  it("clears the draft", () => {
    saveDraft(SAMPLE_CV, "modern");
    clearDraft();
    expect(loadDraft().status).toBe("empty");
  });

  it("survives corrupted JSON without throwing", () => {
    localStorage.setItem(DRAFT_KEY, "{not json");
    expect(loadDraft().status).toBe("empty");
  });

  it("salvages valid sections from a partly damaged draft", () => {
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ templateId: "nope", cv: { personal: { fullName: "Ama" }, summary: 42, skills: [{ id: "s", name: "Excel" }] } }),
    );
    const result = loadDraft();
    expect(result.status).toBe("recovered");
    if (result.status === "recovered") {
      expect(result.draft.cv.personal.fullName).toBe("Ama");
      expect(result.draft.cv.summary).toBe("");
      expect(result.draft.cv.skills[0].name).toBe("Excel");
      expect(result.draft.templateId).toBe("modern");
    }
  });

  it("parses a backup file produced by the app", () => {
    const parsed = parseDraft({ version: 1, templateId: "minimal", cv: SAMPLE_CV });
    expect(parsed?.lossy).toBe(false);
    expect(cvSchema.safeParse(parsed?.draft.cv).success).toBe(true);
  });

  it("rejects things that aren't backups", () => {
    expect(parseDraft(null)).toBeNull();
    expect(parseDraft({ hello: "world" })).toBeNull();
  });
});
