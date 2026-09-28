"use client";

import { useState, type ReactNode } from "react";
import { TEMPLATE_STYLES, type TemplateInfo, type TemplateStyle } from "@/lib/templates/registry";

type StyleFilter = "all" | TemplateStyle;

/**
 * Filters server-rendered template cards on the client. Cards are passed in
 * pre-rendered (keyed by template id) so the page stays crawlable without JavaScript.
 */
export function TemplateFilter({ templates, cards }: { templates: TemplateInfo[]; cards: Record<string, ReactNode> }) {
  const [style, setStyle] = useState<StyleFilter>("all");
  const [photo, setPhoto] = useState(false);
  const [singleColumn, setSingleColumn] = useState(false);

  const visible = templates.filter(
    (t) => (style === "all" || t.styles.includes(style)) && (!photo || t.supportsPhoto) && (!singleColumn || t.columns === 1),
  );
  const reset = () => {
    setStyle("all");
    setPhoto(false);
    setSingleColumn(false);
  };
  const chip = (selected: boolean) =>
    `relative flex min-h-10 cursor-pointer items-center rounded-full border px-4 text-sm font-medium has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600 ${
      selected ? "border-brand-700 bg-brand-700 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
    }`;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <fieldset className="min-w-0">
          <legend className="mb-2 text-sm font-semibold text-slate-900">Style</legend>
          <div className="flex flex-wrap gap-2">
            {(["all", ...Object.keys(TEMPLATE_STYLES)] as StyleFilter[]).map((s) => (
              <label key={s} className={chip(style === s)}>
                <input type="radio" name="template-style" value={s} checked={style === s} onChange={() => setStyle(s)} className="sr-only" />
                {s === "all" ? "All" : TEMPLATE_STYLES[s]}
              </label>
            ))}
          </div>
        </fieldset>
        <fieldset className="min-w-0">
          <legend className="mb-2 text-sm font-semibold text-slate-900">Features</legend>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <label className="flex min-h-10 items-center gap-2 text-sm text-slate-800">
              <input type="checkbox" className="size-5 accent-brand-700" checked={photo} onChange={(e) => setPhoto(e.target.checked)} />
              With photo
            </label>
            <label className="flex min-h-10 items-center gap-2 text-sm text-slate-800">
              <input type="checkbox" className="size-5 accent-brand-700" checked={singleColumn} onChange={(e) => setSingleColumn(e.target.checked)} />
              Single column (best for job portals)
            </label>
          </div>
        </fieldset>
      </div>

      <p className="mb-5 text-sm text-slate-600" aria-live="polite">
        Showing {visible.length} of {templates.length} templates
      </p>

      {visible.length > 0 ? (
        <ul className="grid gap-10 md:grid-cols-2">
          {visible.map((t) => (
            <li key={t.id} className="flex flex-col gap-5 rounded-2xl border border-slate-200 p-5 sm:flex-row">
              {cards[t.id]}
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
          <p className="text-slate-700">No templates match those filters.</p>
          <button type="button" onClick={reset} className="mt-3 font-medium text-brand-700 underline underline-offset-2">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
