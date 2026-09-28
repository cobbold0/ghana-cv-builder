"use client";

import { useState, type ReactNode } from "react";
import { EXAMPLE_CATEGORIES, EXAMPLE_LEVELS, type ExampleCategory, type ExampleLevel } from "@/lib/examples/meta";

export interface ExampleSummary {
  slug: string;
  title: string;
  label: string;
  audience: string;
  category: ExampleCategory;
  level: ExampleLevel;
}

/** Filters server-rendered example cards by category, level and a text search. */
export function ExampleFilter({ examples, cards }: { examples: ExampleSummary[]; cards: Record<string, ReactNode> }) {
  const [category, setCategory] = useState<"all" | ExampleCategory>("all");
  const [level, setLevel] = useState<"all" | ExampleLevel>("all");
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const visible = examples.filter(
    (e) =>
      (category === "all" || e.category === category) &&
      (level === "all" || e.level === level) &&
      (!q || `${e.title} ${e.label} ${e.audience}`.toLowerCase().includes(q)),
  );
  const reset = () => {
    setCategory("all");
    setLevel("all");
    setQuery("");
  };
  const chip = (selected: boolean) =>
    `relative flex min-h-10 cursor-pointer items-center rounded-full border px-4 text-sm font-medium has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand-600 ${
      selected ? "border-brand-700 bg-brand-700 text-white" : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
    }`;

  return (
    <div>
      <div className="mb-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">
        <div>
          <label htmlFor="example-search" className="mb-2 block text-sm font-semibold text-slate-900">
            Search by job
          </label>
          <input
            id="example-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. nurse, bank, driver"
            className="block w-full max-w-md rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 placeholder:text-slate-400 focus:border-brand-600 focus:outline-2 focus:outline-brand-600/30 sm:text-sm"
          />
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-10">
          <fieldset className="min-w-0">
            <legend className="mb-2 text-sm font-semibold text-slate-900">Category</legend>
            <div className="flex flex-wrap gap-2">
              {(["all", ...Object.keys(EXAMPLE_CATEGORIES)] as ("all" | ExampleCategory)[]).map((c) => (
                <label key={c} className={chip(category === c)}>
                  <input type="radio" name="example-category" value={c} checked={category === c} onChange={() => setCategory(c)} className="sr-only" />
                  {c === "all" ? "All" : EXAMPLE_CATEGORIES[c]}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset className="min-w-0">
            <legend className="mb-2 text-sm font-semibold text-slate-900">Experience</legend>
            <div className="flex flex-wrap gap-2">
              {(["all", ...Object.keys(EXAMPLE_LEVELS)] as ("all" | ExampleLevel)[]).map((l) => (
                <label key={l} className={chip(level === l)}>
                  <input type="radio" name="example-level" value={l} checked={level === l} onChange={() => setLevel(l)} className="sr-only" />
                  {l === "all" ? "Any" : EXAMPLE_LEVELS[l]}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      </div>

      <p className="mb-6 text-sm text-slate-600" aria-live="polite">
        Showing {visible.length} of {examples.length} examples
      </p>

      {visible.length > 0 ? (
        <div className="space-y-14">
          {(Object.keys(EXAMPLE_CATEGORIES) as ExampleCategory[]).map((c) => {
            const items = visible.filter((e) => e.category === c);
            if (items.length === 0) return null;
            return (
              <section key={c} id={c} aria-labelledby={`h-${c}`} className="scroll-mt-6">
                <h2 id={`h-${c}`} className="text-xl font-bold text-slate-900">
                  {EXAMPLE_CATEGORIES[c]}
                </h2>
                <ul className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((e) => (
                    <li key={e.slug}>{cards[e.slug]}</li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
          <p className="text-slate-700">No examples match. Try a different job title or clear the filters.</p>
          <button type="button" onClick={reset} className="mt-3 font-medium text-brand-700 underline underline-offset-2">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
