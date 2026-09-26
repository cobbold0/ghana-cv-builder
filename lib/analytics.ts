/**
 * Product analytics. Events describe usage only — never CV content.
 * Sends to Google Analytics when NEXT_PUBLIC_GA_MEASUREMENT_ID is configured; otherwise a no-op.
 */
export type AnalyticsEvent =
  | "builder_started"
  | "cv_started"
  | "template_selected"
  | "section_added"
  | "preview_opened"
  | "pdf_exported"
  | "pdf_export_failed"
  | "example_loaded";

type Props = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (command: "event", name: string, params?: Props) => void;
  }
}

export function track(event: AnalyticsEvent, props?: Props) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, props);
  } catch {
    // Analytics must never break the app.
  }
}
