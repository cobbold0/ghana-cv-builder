/**
 * Advertising configuration. Ads only appear on content pages (guides, templates,
 * examples, homepage) — never in the CV builder, preview or export controls.
 */
export const ADS = {
  /** AdSense publisher. Production defaults to the site's account; set the env var to override, or "off" to disable. */
  client:
    process.env.NEXT_PUBLIC_ADSENSE_CLIENT === "off"
      ? ""
      : process.env.NEXT_PUBLIC_ADSENSE_CLIENT || (process.env.NODE_ENV === "production" ? "ca-pub-5952797612434262" : ""),
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
