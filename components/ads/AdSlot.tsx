"use client";

import { useEffect, useRef } from "react";
import { ADS } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * A single, clearly labelled ad unit for content pages. Never used inside the
 * CV builder. Renders nothing until an ad client and slot are configured, or
 * a labelled placeholder in development when NEXT_PUBLIC_AD_PLACEHOLDERS=true.
 */
export function AdSlot({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLModElement>(null);
  const live = Boolean(ADS.client && ADS.slot);

  useEffect(() => {
    if (!live || !ref.current || ref.current.dataset.adsbygoogleStatus) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ad blockers or script failures must not affect the page */
    }
  }, [live]);

  if (live) {
    return (
      // Hidden entirely when AdSense has no ad to show (e.g. before approval), so no empty box appears.
      <aside aria-label="Advertisement" className={`my-10 has-[ins[data-ad-status=unfilled]]:hidden ${className}`}>
        <p className="mb-1 text-center text-[11px] tracking-wide text-slate-400 uppercase">Advertisement</p>
        <ins
          ref={ref}
          className="adsbygoogle block min-h-[100px]"
          data-ad-client={ADS.client}
          data-ad-slot={ADS.slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </aside>
    );
  }
  if (ADS.placeholders) {
    return (
      <aside aria-label="Advertisement placeholder" className={`my-10 ${className}`}>
        <div className="flex h-[120px] items-center justify-center rounded-lg border border-dashed border-slate-300 text-xs tracking-wide text-slate-400 uppercase">
          Advertisement placeholder
        </div>
      </aside>
    );
  }
  return null;
}
