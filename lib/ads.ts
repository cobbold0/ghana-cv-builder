/**
 * Advertising configuration. Ads appear on content pages and download flows.
 * Hardcoded directly with zero environment variables needed.
 */
export const ADS = {
  client: "ca-pub-5952797612434262",
  slot: "1273092714",
  placeholders: false,
};

/** Publisher id for ads.txt ("pub-…"), derived from the client id. */
export function adsTxtPublisherId(): string {
  return "pub-5952797612434262";
}
