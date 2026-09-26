// Characters our embedded fonts can't draw (emoji, pictographs) and control
// characters are removed before rendering so they never appear as boxes.
const UNSUPPORTED = /[\p{Extended_Pictographic}\u{FE0F}\u{200D}\u{0000}-\u{0008}\u{000B}\u{000C}\u{000E}-\u{001F}\u{007F}]/gu;

export function cleanText(value: string): string {
  return value.replace(UNSUPPORTED, "").replace(/[ \t]+/g, " ").trim();
}

export function hasUnsupportedChars(value: string): boolean {
  UNSUPPORTED.lastIndex = 0;
  const found = UNSUPPORTED.test(value);
  UNSUPPORTED.lastIndex = 0;
  return found;
}

/** Split a multi-line field into bullet items, dropping list markers users often type. */
export function toBullets(value: string): string[] {
  return value
    .split(/\r?\n/)
    .map((line) => cleanText(line.replace(/^\s*(?:[-*•·–]|\d+[.)])\s+/, "")))
    .filter(Boolean);
}

/** Paragraph text: keep line breaks, clean each line. */
export function toParagraphs(value: string): string[] {
  return value.split(/\r?\n\s*\r?\n|\r?\n/).map(cleanText).filter(Boolean);
}

export function displayUrl(url: string): string {
  return cleanText(url).replace(/^https?:\/\//i, "").replace(/^www\./i, "").replace(/\/+$/, "");
}

export function hrefFor(url: string): string {
  const u = cleanText(url);
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

export function slugifyFileName(name: string): string {
  const base = cleanText(name)
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base ? `${base}-CV.pdf` : "CV.pdf";
}
