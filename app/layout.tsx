import type { Metadata, Viewport } from "next";
import { preload } from "react-dom";
import { GA_ID, ThirdPartyScripts } from "@/components/layout/ThirdPartyScripts";
import { CONSENT_DEFAULT_SCRIPT } from "@/lib/consent";
import { ADS } from "@/lib/ads";
import { SITE } from "@/lib/seo/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: "Ghana CV Builder — Create a Professional CV in Minutes", template: `%s — ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  formatDetection: { telephone: false, email: false, address: false },
  // Google Search Console HTML-tag verification (optional; DNS verification also works).
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } : undefined,
  // Lets AdSense verify site ownership without loading ads on every page.
  other: ADS.client ? { "google-adsense-account": ADS.client } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#0f6848",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  preload("/fonts/inter-400.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload("/fonts/inter-600.woff2", { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  return (
    <html lang="en-GH">
      <head>
        {/* Consent defaults must run before Analytics or AdSense load. */}
        {GA_ID || ADS.client ? <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULT_SCRIPT }} /> : null}
      </head>
      <body className="min-h-dvh antialiased">
        <a href="#main" className="sr-only z-50 rounded-md bg-white px-4 py-2 font-medium focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
          Skip to content
        </a>
        {children}
        <ThirdPartyScripts analytics />
      </body>
    </html>
  );
}
