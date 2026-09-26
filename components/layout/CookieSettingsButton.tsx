"use client";

declare global {
  interface Window {
    googlefc?: { callbackQueue: (() => void)[]; showRevocationMessage: () => void };
  }
}

/** Reopens Google's consent message so visitors can change their choice at any time. */
export function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="underline underline-offset-2 hover:text-slate-900"
      onClick={() => {
        window.googlefc = window.googlefc || ({ callbackQueue: [] } as unknown as NonNullable<Window["googlefc"]>);
        window.googlefc.callbackQueue = window.googlefc.callbackQueue || [];
        window.googlefc.callbackQueue.push(() => window.googlefc?.showRevocationMessage());
      }}
    >
      Cookie settings
    </button>
  );
}
