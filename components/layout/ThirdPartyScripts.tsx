import Script from "next/script";
import { ADS } from "@/lib/ads";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Analytics and ad scripts load only when the owner has configured them. */
export function ThirdPartyScripts({ analytics = false, ads = false }: { analytics?: boolean; ads?: boolean }) {
  return (
    <>
      {analytics && GA_ID ? (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`} strategy="afterInteractive" />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config',${JSON.stringify(GA_ID)});`}
          </Script>
        </>
      ) : null}
      {ads && ADS.client ? (
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADS.client)}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      ) : null}
    </>
  );
}
