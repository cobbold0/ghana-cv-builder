/**
 * Advertising configuration. Ads only appear on content pages (guides, templates,
 * examples, homepage) — never in the CV builder, preview or export controls.
 */
export const ADS = {
  /** e.g. "ca-pub-1234567890123456" — provided by the owner after AdSense approval. */
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  /** Display ad unit id for in-content placements. */
  slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT ?? "",
  /** Show labelled placeholder boxes (development only). */
  placeholders: process.env.NEXT_PUBLIC_AD_PLACEHOLDERS === "true",
};

/** Publisher id for ads.txt ("pub-…"), derived from the client id. */
export function adsTxtPublisherId(): string | null {
  const m = /^ca-(pub-\d{10,20})$/.exec(ADS.client.trim());
  return m ? m[1] : null;
}
