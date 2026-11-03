"use client";

import { useEffect, useRef } from "react";
import { ADS } from "@/lib/ads";

interface AdSlotProps {
  variant?: "banner" | "sidebar" | "inline";
  className?: string;
  slot?: string;
  label?: string;
}

/**
 * A single, clearly labelled ad unit for content pages. Never used inside the
 * CV builder canvas. Renders once an ad client is configured.
 * Supports:
 * - "banner": leaderboard (top/bottom)
 * - "sidebar": vertical skyscraper for left and right rails
 * - "inline": in-content rectangle
 */
export function AdSlot({
  variant = "inline",
  className = "",
  slot = ADS.slot,
  label = "Advertisement",
}: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const live = Boolean(ADS.client && (slot || ADS.slot));
  const activeSlot = slot || ADS.slot;

  useEffect(() => {
    if (!live || !ref.current || ref.current.dataset.adsbygoogleStatus) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ad blockers or script failures must not affect the page */
    }
  }, [live]);

  const variantStyles = {
    banner: "w-full my-6 min-h-[90px] sm:min-h-[100px] text-center",
    sidebar: "w-full min-h-[600px] flex flex-col items-center justify-start sticky top-20",
    inline: "w-full my-8 min-h-[250px] text-center",
  };

  if (live) {
    return (
      <aside aria-label={label} className={`print:hidden overflow-hidden ${variantStyles[variant]} ${className}`}>
        <p className="mb-1 text-center text-[10px] font-semibold tracking-wider text-slate-500 uppercase">{label}</p>
        <ins
          ref={ref}
          className="adsbygoogle block"
          style={{
            display: "block",
            minHeight: variant === "sidebar" ? 600 : variant === "banner" ? 90 : 250,
          }}
          data-ad-client={ADS.client}
          data-ad-slot={activeSlot}
          data-ad-format={variant === "sidebar" ? "vertical" : "auto"}
          data-full-width-responsive={variant !== "sidebar" ? "true" : "false"}
        />
      </aside>
    );
  }

  if (ADS.placeholders || process.env.NODE_ENV === "development") {
    return (
      <aside
        aria-label={`${label} Placeholder`}
        className={`print:hidden rounded-lg border border-dashed border-slate-300 bg-slate-50 p-2 text-center ${variantStyles[variant]} ${className}`}
      >
        <p className="mb-1 text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
          {label} {variant === "sidebar" ? "(Skyscraper)" : variant === "banner" ? "(Leaderboard)" : "(In-Content)"}
        </p>
        <div
          className={`flex w-full items-center justify-center rounded bg-slate-100 text-xs font-medium text-slate-500 ${
            variant === "sidebar" ? "h-[560px]" : variant === "banner" ? "h-[80px]" : "h-[220px]"
          }`}
        >
          Google AdSense Slot
        </div>
      </aside>
    );
  }

  return null;
}
