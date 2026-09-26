import { TEMPLATE_COMPONENTS } from "@/components/templates";
import { htmlPrimitives } from "@/components/templates/html-primitives";
import { A4 } from "@/components/templates/primitives";
import type { CV } from "@/lib/cv/schema";
import { normalizeCv } from "@/lib/cv/normalize";
import { SAMPLE_CV } from "@/lib/cv/sample";
import type { TemplateId } from "@/lib/templates/registry";

const PAGE_W = (A4.width * 96) / 72;
const PAGE_H = (A4.height * 96) / 72;

/** Static first-page preview rendered on the server (no JavaScript needed). */
export function TemplateThumbnail({ templateId, width, cv = SAMPLE_CV, label }: { templateId: TemplateId; width: number; cv?: CV; label: string }) {
  const Template = TEMPLATE_COMPONENTS[templateId];
  const scale = width / PAGE_W;
  return (
    <div
      role="img"
      aria-label={label}
      className="relative overflow-hidden rounded-md bg-white ring-1 ring-slate-200"
      style={{ width, height: PAGE_H * scale }}
    >
      <div aria-hidden="true" className="absolute top-0 left-0 origin-top-left" style={{ width: PAGE_W, height: PAGE_H, transform: `scale(${scale})` }}>
        <Template cv={normalizeCv(cv)} p={htmlPrimitives} />
      </div>
    </div>
  );
}
