/** Site search: a small static index scored in the browser (no external service). */
export type SearchKind = "Guide" | "Example" | "Template" | "Page";

export interface SearchItem {
  href: string;
  title: string;
  description: string;
  kind: SearchKind;
  /** Extra words that should match but aren't shown. */
  keywords?: string;
}

const normalize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9ɛɔ]+/g, " ")
    .trim();

/**
 * Every query word must match the start of a word somewhere in the item.
 * Title matches rank above description/keyword matches; guides and examples
 * rank slightly above plain pages when scores tie.
 */
export function searchItems(items: SearchItem[], query: string, limit = 8): SearchItem[] {
  const terms = normalize(query).split(" ").filter(Boolean);
  if (terms.length === 0) return [];
  const kindBoost: Record<SearchKind, number> = { Guide: 0.3, Example: 0.2, Template: 0.1, Page: 0 };

  const scored: { item: SearchItem; score: number }[] = [];
  for (const item of items) {
    const title = ` ${normalize(item.title)}`;
    const rest = ` ${normalize(`${item.description} ${item.keywords ?? ""}`)}`;
    let score = 0;
    let all = true;
    for (const t of terms) {
      if (title.includes(` ${t}`)) score += 3;
      else if (rest.includes(` ${t}`)) score += 1;
      else {
        all = false;
        break;
      }
    }
    if (!all) continue;
    if (title.startsWith(` ${terms.join(" ")}`)) score += 2;
    scored.push({ item, score: score + kindBoost[item.kind] });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.item);
}
