"use client";

import type { ReactNode } from "react";

/** Collapsible builder section. Header shows a short status so progress isn't conveyed by colour alone. */
export function SectionPanel({
  id,
  title,
  status,
  open,
  onToggle,
  children,
  hasError,
}: {
  id: string;
  title: string;
  status?: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
  hasError?: boolean;
}) {
  const panelId = `panel-${id}`;
  return (
    <section className="rounded-xl border border-slate-200 bg-white" aria-labelledby={`${panelId}-heading`}>
      <h2 id={`${panelId}-heading`} className="m-0">
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-4 text-left sm:px-5"
        >
          <span className="text-base font-semibold text-slate-900">{title}</span>
          <span className="flex items-center gap-3">
            {hasError ? (
              <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700">Needs attention</span>
            ) : status ? (
              <span className="text-sm text-slate-500">{status}</span>
            ) : null}
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              className={`size-5 shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
            >
              <path fill="currentColor" d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" />
            </svg>
          </span>
        </button>
      </h2>
      <div id={panelId} hidden={!open} className="border-t border-slate-100 px-4 pt-4 pb-5 sm:px-5">
        {children}
      </div>
    </section>
  );
}
