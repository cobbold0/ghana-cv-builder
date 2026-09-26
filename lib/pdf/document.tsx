import { Document, Font } from "@react-pdf/renderer";
import { TEMPLATE_COMPONENTS } from "@/components/templates";
import type { CV } from "@/lib/cv/schema";
import { normalizeCv } from "@/lib/cv/normalize";
import type { TemplateId } from "@/lib/templates/registry";
import { pdfPrimitives } from "./primitives";

const FAMILIES = { Inter: "inter", SourceSerif4: "sourceserif4" } as const;

let registeredBase: string | null = null;

/** Register embedded fonts. `base` is a URL prefix (browser) or directory (Node). */
export function registerFonts(base: string) {
  if (registeredBase === base) return;
  for (const [family, file] of Object.entries(FAMILIES)) {
    Font.register({
      family,
      fonts: [
        { src: `${base}/${file}-400.ttf`, fontWeight: 400 },
        { src: `${base}/${file}-400-italic.ttf`, fontWeight: 400, fontStyle: "italic" },
        { src: `${base}/${file}-600.ttf`, fontWeight: 600 },
        { src: `${base}/${file}-700.ttf`, fontWeight: 700 },
      ],
    });
  }
  // Never split words with hyphens; it looks wrong on a CV.
  Font.registerHyphenationCallback((word) => [word]);
  registeredBase = base;
}

export function CvPdfDocument({ cv, templateId }: { cv: CV; templateId: TemplateId }) {
  const data = normalizeCv(cv);
  const Template = TEMPLATE_COMPONENTS[templateId];
  return (
    <Document title={data.name ? `${data.name} – CV` : "CV"} author={data.name || undefined} creator="Ghana CV Builder" producer="Ghana CV Builder">
      <Template cv={data} p={pdfPrimitives} />
    </Document>
  );
}
