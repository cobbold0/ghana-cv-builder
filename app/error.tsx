"use client";

import Link from "next/link";
import { buttonClass } from "@/lib/ui";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div id="main" className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-slate-900">Something went wrong</h1>
      <p className="mt-3 text-slate-600">
        Sorry, this page hit an unexpected problem. If you were working on your CV, it is still saved on this device.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button type="button" onClick={reset} className={buttonClass("primary")}>
          Try again
        </button>
        <Link href="/" className={buttonClass("secondary")}>
          Go to the homepage
        </Link>
      </div>
    </div>
  );
}
