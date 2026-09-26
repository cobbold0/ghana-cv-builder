/**
 * Google Consent Mode v2 defaults. Visitors in the EEA, UK and Switzerland start
 * with all storage denied until they answer Google's consent message (the
 * AdSense "Privacy & messaging" CMP), which updates consent itself. Everyone
 * else is granted by default. Must run before Analytics or AdSense load.
 */
export const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT", "LV", "LT",
  "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO", "GB", "CH",
];

const all = (value: "granted" | "denied") =>
  `ad_storage:'${value}',ad_user_data:'${value}',ad_personalization:'${value}',analytics_storage:'${value}'`;

export const CONSENT_DEFAULT_SCRIPT =
  "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}" +
  `gtag('consent','default',{${all("denied")},region:${JSON.stringify(CONSENT_REGIONS)},wait_for_update:500});` +
  `gtag('consent','default',{${all("granted")}});`;
