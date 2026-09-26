import type { ReactNode } from "react";

export interface FaqItem {
  q: string;
  a: ReactNode;
}

/** Native disclosure widgets: accessible and no JavaScript. */
export function Faq({ items, headingId = "faq" }: { items: FaqItem[]; headingId?: string }) {
  return (
    <section aria-labelledby={headingId}>
      <h2 id={headingId} className="text-2xl font-bold text-slate-900 sm:text-3xl">
        Frequently asked questions
      </h2>
      <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
        {items.map((item) => (
          <details key={item.q} className="group py-1">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 text-left font-medium text-slate-900 [&::-webkit-details-marker]:hidden">
              <h3 className="text-base">{item.q}</h3>
              <span aria-hidden="true" className="text-xl leading-none text-slate-500 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <div className="pb-4 text-slate-600 leading-relaxed">{item.a}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
