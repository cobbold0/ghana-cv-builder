import { describe, expect, it } from "vitest";
import { searchItems } from "@/lib/search";
import { buildSearchIndex } from "@/lib/search-index";

const index = buildSearchIndex();
const top = (q: string) => searchItems(index, q)[0]?.href;

describe("site search", () => {
  it("indexes guides, examples, templates and pages with unique links", () => {
    const kinds = new Set(index.map((i) => i.kind));
    expect([...kinds].sort()).toEqual(["Example", "Guide", "Page", "Template"]);
    expect(new Set(index.map((i) => i.href)).size).toBe(index.length);
  });

  it("finds examples by job title", () => {
    expect(top("nurse")).toBe("/cv-examples/nurse");
    expect(top("bank teller")).toBe("/cv-examples/bank-teller");
  });

  it("finds guides by topic", () => {
    expect(top("application letter")).toBe("/application-letter");
    expect(top("summary")).toBe("/professional-summary");
    expect(top("no experience")).toBe("/cv-with-no-experience");
  });

  it("finds templates", () => {
    expect(top("sidebar")).toBe("/builder?template=sidebar");
    expect(searchItems(index, "photo").some((r) => r.kind === "Template")).toBe(true);
  });

  it("is case- and accent-insensitive and matches word prefixes", () => {
    expect(top("RÉSUMÉ")).toBe("/cv-vs-resume");
    expect(top("interns")).toBe("/internship-cv");
  });

  it("requires every word to match", () => {
    expect(searchItems(index, "nurse zzzz")).toEqual([]);
    expect(searchItems(index, "   ")).toEqual([]);
  });

  it("limits the number of results", () => {
    expect(searchItems(index, "cv", 5)).toHaveLength(5);
  });
});
