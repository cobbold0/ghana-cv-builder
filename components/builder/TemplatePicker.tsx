"use client";

import { TEMPLATES, type TemplateId } from "@/lib/templates/registry";

export function TemplatePicker({ value, onChange }: { value: TemplateId; onChange: (id: TemplateId) => void }) {
  return (
    <fieldset>
      <legend className="sr-only">Template</legend>
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
        {TEMPLATES.map((t) => {
          const selected = t.id === value;
          return (
            <label
              key={t.id}
              className={`flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm font-medium has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600 ${
                selected ? "border-brand-700 bg-brand-50 text-brand-900" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              <input type="radio" name="template" value={t.id} checked={selected} onChange={() => onChange(t.id)} className="sr-only" />
              <span aria-hidden="true" className={`size-2 rounded-full ${selected ? "bg-brand-700" : "bg-slate-300"}`} />
              {t.name}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
