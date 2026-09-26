import { describe, expect, it } from "vitest";
import { cvSchema, emptyCv } from "@/lib/cv/schema";
import { isValidEmail, isValidPhone, isValidUrl, validateCv } from "@/lib/cv/validation";

describe("field formats", () => {
  it.each(["ama@example.com", "kofi.mensah+jobs@mail.co.uk"])("accepts email %s", (v) => expect(isValidEmail(v)).toBe(true));
  it.each(["ama", "ama@", "ama@example", "a b@example.com"])("rejects email %s", (v) => expect(isValidEmail(v)).toBe(false));

  it.each(["+233 24 123 4567", "0241234567", "+233-20-000-0000", "(030) 222 1234"])("accepts phone %s", (v) => expect(isValidPhone(v)).toBe(true));
  it.each(["12345", "call me", "+233 24 123 4567 890 123", "024-ABC-4567"])("rejects phone %s", (v) => expect(isValidPhone(v)).toBe(false));

  it.each(["linkedin.com/in/ama", "https://github.com/ama", "www.example.com.gh/portfolio"])("accepts url %s", (v) => expect(isValidUrl(v)).toBe(true));
  it.each(["not a url", "javascript:alert(1)", "localhost", "ftp://example.com"])("rejects url %s", (v) => expect(isValidUrl(v)).toBe(false));
});

describe("validateCv", () => {
  it("accepts an empty draft (nothing is required while editing)", () => {
    expect(validateCv(emptyCv())).toEqual({});
  });

  it("requires a name only when exporting", () => {
    expect(validateCv(emptyCv(), { forExport: true })).toEqual({ "personal.fullName": "Add your full name." });
  });

  it("reports invalid personal fields", () => {
    const cv = cvSchema.parse({ personal: { email: "bad", phone: "12", linkedin: "no spaces allowed" } });
    expect(Object.keys(validateCv(cv)).sort()).toEqual(["personal.email", "personal.linkedin", "personal.phone"]);
  });

  it("flags an end date before the start date", () => {
    const cv = cvSchema.parse({ experience: [{ id: "x", startDate: "2022-05", endDate: "2021-01" }] });
    expect(validateCv(cv)).toEqual({ "experience.x.endDate": "End date must be after the start date." });
  });

  it("ignores the end date for a current position", () => {
    const cv = cvSchema.parse({ experience: [{ id: "x", startDate: "2022-05", endDate: "2021-01", current: true }] });
    expect(validateCv(cv)).toEqual({});
  });

  it("does not block on hidden referees when references are on request", () => {
    const cv = cvSchema.parse({ referencesOnRequest: true, references: [{ id: "r", name: "A", email: "bad" }] });
    expect(validateCv(cv)).toEqual({});
  });
});

describe("cvSchema", () => {
  it("fills in defaults for missing fields", () => {
    const cv = cvSchema.parse({ personal: { fullName: "Ama" } });
    expect(cv.personal.email).toBe("");
    expect(cv.experience).toEqual([]);
    expect(cv.referencesOnRequest).toBe(false);
  });

  it("rejects text that is far too long", () => {
    expect(cvSchema.safeParse({ summary: "x".repeat(5000) }).success).toBe(false);
  });

  it("rejects unknown skill levels gracefully", () => {
    const cv = cvSchema.parse({ skills: [{ id: "s", name: "Excel", level: "wizard" }] });
    expect(cv.skills[0].level).toBe("");
  });

  it("rejects non-image photo data", () => {
    expect(cvSchema.safeParse({ personal: { photo: "data:text/html;base64,PHNjcmlwdD4=" } }).success).toBe(false);
  });
});
