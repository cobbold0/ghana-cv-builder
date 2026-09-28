/**
 * Google Consent Mode v2 with our own banner (components/layout/ConsentBanner.tsx).
 * Ads always show. Personalised ads (ad_user_data, ad_personalization) and analytics
 * cookies wait for "Accept". ad_storage is granted by default so non-personalised ads
 * work normally, except in the EEA, UK and Switzerland, where it also waits for "Accept".
 * The default script must run before Analytics or AdSense load.
 */
export const CONSENT_KEY = "gcv:consent:v1";
export const CONSENT_EVENT = "gcv:open-consent";

export const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT",
  "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
];

export type Consent = "granted" | "denied";

declare global {
  interface Window {
    adsbygoogle?: unknown[] & { requestNonPersonalizedAds?: 0 | 1 };
  }
}

export const CONSENT_DEFAULT_SCRIPT = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
var c = null; try { c = localStorage.getItem(${JSON.stringify(CONSENT_KEY)}); } catch (e) {}
var g = c === "granted" ? "granted" : "denied";
gtag("consent", "default", { ad_storage: g, ad_user_data: g, ad_personalization: g, analytics_storage: g, region: ${JSON.stringify(CONSENT_REGIONS)} });
gtag("consent", "default", { ad_storage: "granted", ad_user_data: g, ad_personalization: g, analytics_storage: g });
(window.adsbygoogle = window.adsbygoogle || []).requestNonPersonalizedAds = g === "granted" ? 0 : 1;
`;

export function getConsent(): Consent | null {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(consent: Consent) {
  try {
    localStorage.setItem(CONSENT_KEY, consent);
  } catch {
    // Storage blocked: the choice applies to this page view only.
  }
  // ad_storage is only sent when granting, so "No thanks" keeps the regional default above.
  const update = { ad_user_data: consent, ad_personalization: consent, analytics_storage: consent, ...(consent === "granted" && { ad_storage: consent }) };
  (window.gtag as ((...args: unknown[]) => void) | undefined)?.("consent", "update", update);
  (window.adsbygoogle ||= []).requestNonPersonalizedAds = consent === "granted" ? 0 : 1;
}
