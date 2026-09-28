"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GA_ID } from "@/components/layout/ThirdPartyScripts";
import { ADS } from "@/lib/ads";
import { CONSENT_EVENT, getConsent, setConsent, type Consent } from "@/lib/consent";

const CONSENT_NEEDED = Boolean(GA_ID || ADS.client);

export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!CONSENT_NEEDED) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- stored choice is only readable on the client
    setOpen(getConsent() === null);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, []);

  // Never cover the builder's controls; it has no ads, and analytics stays cookieless until a choice is made elsewhere.
  if (!open || pathname.startsWith("/builder")) return null;

  const choose = (consent: Consent) => {
    setConsent(consent);
    setOpen(false);
  };

  return (
    <div role="dialog" aria-labelledby="consent-title" className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white p-4 shadow-lg print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-slate-700">
          <p id="consent-title" className="font-semibold text-slate-900">
            Cookies for analytics and personalised ads
          </p>
          <p className="mt-1">
            This free site is supported by ads. May we use cookies to measure visits and show ads based on your interests? If you say no, you’ll still see
            ads, but they won’t be personalised. Your CV details are never shared. <Link href="/privacy" className="underline">Privacy</Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => choose("denied")} className="min-h-10 rounded-md border border-slate-300 px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50">
            No thanks
          </button>
          <button type="button" onClick={() => choose("granted")} className="min-h-10 rounded-md bg-brand-700 px-4 text-sm font-semibold text-white hover:bg-brand-800">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
