"use client";

import { CONSENT_EVENT } from "@/lib/consent";

/** Reopens the cookie banner so visitors can change their choice at any time. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="underline underline-offset-2 hover:text-slate-900"
      onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))}
    >
      Cookie settings
    </button>
  );
}
