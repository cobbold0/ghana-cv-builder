import { renderToBuffer } from "@react-pdf/renderer";
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";
import { CvPdfDocument, registerFonts } from "@/lib/pdf/document";
import { cvSchema, emptyCv, newId, type CV } from "@/lib/cv/schema";
import { SAMPLE_CV } from "@/lib/cv/sample";
import { TEMPLATE_IDS, type TemplateId } from "@/lib/templates/registry";

const OUT = process.env.PDF_OUT;

async function render(cv: CV, templateId: TemplateId, name: string) {
  const buf = await renderToBuffer(<CvPdfDocument cv={cv} templateId={templateId} />);
  if (OUT) {
    mkdirSync(OUT, { recursive: true });
    writeFileSync(path.join(OUT, `${name}-${templateId}.pdf`), buf);
  }
  return buf;
}

const pageCount = (buf: Buffer) => buf.toString("latin1").match(/\/Type\s*\/Page[^s]/g)?.length ?? 0;

function longCv(): CV {
  const cv = structuredClone(SAMPLE_CV);
  cv.personal.fullName = "Nana Akua Adwoa Boatemaa Asantewaa-Frimpong Mensah";
  cv.experience = Array.from({ length: 9 }, (_, i) => ({
    ...SAMPLE_CV.experience[0],
    id: newId(),
    position: `Senior Operations and Business Development Officer ${i + 1}`,
    current: false,
    startDate: `${2010 + i}-01`,
    endDate: `${2011 + i}-01`,
    description: "Led a cross-functional team responsible for operations, reporting and stakeholder engagement. ".repeat(4),
    highlights: Array.from({ length: 5 }, (_, j) => `Delivered measurable improvement number ${j + 1} across several regional offices, with a long explanation that wraps onto a second line.`).join("\n"),
  }));
  return cv;
}

beforeAll(() => registerFonts(path.resolve("public/fonts")));

describe("PDF export", () => {
  it.each(TEMPLATE_IDS)("renders the sample CV on one page with %s", async (id) => {
    const buf = await render(SAMPLE_CV, id, "sample");
    expect(buf.subarray(0, 5).toString()).toBe("%PDF-");
    expect(pageCount(buf)).toBe(1);
  });

  it.each(TEMPLATE_IDS)("splits a long CV across several pages with %s", async (id) => {
    const buf = await render(longCv(), id, "long");
    expect(pageCount(buf)).toBeGreaterThanOrEqual(3);
  });

  it.each(TEMPLATE_IDS)("renders an empty CV without crashing with %s", async (id) => {
    const buf = await render(emptyCv(), id, "empty");
    expect(pageCount(buf)).toBe(1);
  });

  it("renders a CV with no experience and unusual characters", async () => {
    const cv = cvSchema.parse({
      personal: { fullName: "Kɔfi Ɛdem Agbeko 🎓", email: "kofi@example.com" },
      summary: "Final-year student 👋 seeking an internship. Budget handled: ₵5,000.",
      education: [{ id: "a", institution: "KNUST", degree: "BSc Computer Science", startDate: "2022", endDate: "2026" }],
    });
    const buf = await render(cv, "graduate", "no-experience");
    expect(pageCount(buf)).toBe(1);
  });
});
