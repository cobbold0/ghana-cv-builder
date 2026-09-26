import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { TEMPLATE_COMPONENTS } from "@/components/templates";
import { htmlPrimitives, toCss } from "@/components/templates/html-primitives";
import { normalizeCv } from "@/lib/cv/normalize";
import { cvSchema, emptyCv, type CV } from "@/lib/cv/schema";
import { SAMPLE_CV } from "@/lib/cv/sample";
import { EXAMPLES } from "@/lib/examples";
import { TEMPLATE_IDS, TEMPLATES } from "@/lib/templates/registry";

const html = (cv: CV, id: (typeof TEMPLATE_IDS)[number]) => {
  const T = TEMPLATE_COMPONENTS[id];
  return renderToStaticMarkup(<T cv={normalizeCv(cv)} p={htmlPrimitives} />);
};

describe("template registry", () => {
  it("has a renderer for every template", () => {
    for (const t of TEMPLATES) expect(TEMPLATE_COMPONENTS[t.id]).toBeTypeOf("function");
  });
});

describe.each(TEMPLATE_IDS)("%s template", (id) => {
  it("renders every section of a full CV", () => {
    const out = html(SAMPLE_CV, id);
    for (const text of ["Ama Serwaa Owusu", "Junior Data Analyst", "University of Ghana", "Power BI", "Twi", "Available on request."]) {
      expect(out).toContain(text);
    }
  });

  it("omits empty sections entirely", () => {
    const out = html(cvSchema.parse({ personal: { fullName: "Kofi" } }), id);
    for (const heading of ["Experience", "Education", "Skills", "Projects", "Languages", "References", "Profile"]) {
      expect(out).not.toContain(heading);
    }
  });

  it("drops blank entries that were added but never filled in", () => {
    const cv = cvSchema.parse({ personal: { fullName: "Kofi" }, experience: [{ id: "a" }], skills: [{ id: "s", name: "  " }] });
    expect(html(cv, id)).not.toMatch(/Experience|Skills/);
  });

  it("shows a placeholder name when none is entered", () => {
    expect(html(emptyCv(), id)).toContain("Your Name");
  });

  it("escapes user text rather than injecting HTML", () => {
    const out = html(cvSchema.parse({ personal: { fullName: "<script>alert(1)</script>" } }), id);
    expect(out).not.toContain("<script>");
  });
});

describe("photos", () => {
  const withPhoto = cvSchema.parse({ personal: { fullName: "Ama", photo: "data:image/jpeg;base64,AAAA" } });
  it.each(TEMPLATES.map((t) => [t.id, t.supportsPhoto] as const))("%s shows photo: %s", (id, supported) => {
    expect(html(withPhoto, id).includes("<img")).toBe(supported);
  });
});

describe("examples", () => {
  it.each(EXAMPLES.map((e) => [e.slug, e] as const))("%s example is a valid CV", (_slug, ex) => {
    expect(cvSchema.safeParse(ex.cv).success).toBe(true);
    expect(html(ex.cv, ex.templateId)).toContain(ex.cv.personal.fullName);
  });
});

describe("toCss", () => {
  it("converts react-pdf style numbers to points and expands shorthands", () => {
    expect(toCss({ fontSize: 10, lineHeight: 1.4, fontWeight: 700, paddingHorizontal: 12, fontFamily: "Inter" })).toEqual({
      fontSize: "10pt",
      lineHeight: 1.4,
      fontWeight: 700,
      paddingLeft: "12pt",
      paddingRight: "12pt",
      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
    });
  });

  it("merges style arrays and ignores falsy entries", () => {
    expect(toCss([{ color: "red" }, false, [{ color: "blue", width: "50%" }]])).toEqual({ color: "blue", width: "50%" });
  });
});
