import { pdf } from "@react-pdf/renderer";
import type { CV } from "@/lib/cv/schema";
import type { TemplateId } from "@/lib/templates/registry";
import { CvPdfDocument, registerFonts } from "./document";

/** Browser-only: builds the PDF on the user's device, so CV data never leaves it. */
export async function generatePdfBlob(cv: CV, templateId: TemplateId): Promise<Blob> {
  registerFonts(`${window.location.origin}/fonts`);
  return pdf(<CvPdfDocument cv={cv} templateId={templateId} />).toBlob();
}

export function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Give slower mobile browsers time to start the download before revoking.
  setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
