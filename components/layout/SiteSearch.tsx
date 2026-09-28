"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { searchItems, type SearchItem } from "@/lib/search";

const SUGGESTED = ["/how-to-write-a-cv", "/cv-templates", "/cv-examples/graduate", "/cv-with-no-experience", "/application-letter"];

/** Header search: a button plus a modal combobox over a small static index loaded on first open. */
export function SiteSearch() {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState<SearchItem[] | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const results = useMemo(() => {
    if (!index) return [];
    if (!query.trim()) return SUGGESTED.map((h) => index.find((i) => i.href === h)).filter((i): i is SearchItem => Boolean(i));
    return searchItems(index, query);
  }, [index, query]);

  const show = () => {
    setOpen(true);
    if (!index) {
      fetch("/search-index.json")
        .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
        .then((data: SearchItem[]) => setIndex(data))
        .catch(() => setError(true));
    }
  };

  const close = () => {
    setOpen(false);
    setQuery("");
    setActive(0);
  };

  const go = (item: SearchItem) => {
    track("search_selected", { kind: item.kind, query_length: query.trim().length });
    close();
    router.push(item.href);
  };

  // Open/close the native dialog (gives focus trapping and Esc for free).
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      inputRef.current?.focus();
    }
    if (!open && d.open) d.close();
  }, [open]);

  // Ctrl/Cmd+K or "/" opens search from anywhere (except while typing in a field).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        show();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Escape") {
      // Search inputs swallow Escape to clear themselves; close the dialog instead.
      e.preventDefault();
      close();
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={show}
        className="flex min-h-9 min-w-9 items-center justify-center gap-2 rounded-md px-1 text-sm font-medium text-slate-700 hover:bg-slate-100 md:rounded-lg md:border md:border-slate-300 md:px-3 md:text-slate-500"
        aria-label="Search"
        aria-keyshortcuts="Control+K Meta+K /"
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 md:size-4">
          <path fill="currentColor" d="M8.5 3a5.5 5.5 0 0 1 4.38 8.82l3.65 3.65-1.06 1.06-3.65-3.65A5.5 5.5 0 1 1 8.5 3Zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
        </svg>
        <span className="hidden lg:inline">Search</span>
        <kbd className="hidden rounded border border-slate-200 px-1 font-sans text-[11px] text-slate-500 lg:inline">Ctrl K</kbd>
      </button>

      <dialog
        ref={dialogRef}
        aria-label="Search the site"
        className="mx-auto mt-[10vh] w-[min(40rem,calc(100vw-1.5rem))] rounded-xl p-0 shadow-2xl backdrop:bg-slate-900/50"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="flex items-center gap-2 border-b-2 border-slate-200 px-4 focus-within:border-brand-600">
          <svg aria-hidden="true" viewBox="0 0 20 20" className="size-5 shrink-0 text-slate-400">
            <path fill="currentColor" d="M8.5 3a5.5 5.5 0 0 1 4.38 8.82l3.65 3.65-1.06 1.06-3.65-3.65A5.5 5.5 0 1 1 8.5 3Zm0 1.5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="site-search-results"
            aria-activedescendant={results[active] ? `search-opt-${active}` : undefined}
            aria-autocomplete="list"
            aria-label="Search guides, examples and templates"
            placeholder="Search guides, examples and templates…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            className="min-h-14 w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400 focus-visible:outline-none"
          />
          <button type="button" onClick={close} className="rounded px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100">
            Esc
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {error ? (
            <p className="px-3 py-6 text-center text-sm text-slate-600">Search couldn&apos;t load. Check your connection and try again.</p>
          ) : !index ? (
            <p className="px-3 py-6 text-center text-sm text-slate-500" role="status">
              Loading…
            </p>
          ) : results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-slate-600" role="status">
              No results for “{query.trim()}”. Try a job title like “nurse” or a topic like “summary”.
            </p>
          ) : (
            <>
              <p className="px-3 pt-1 pb-2 text-xs font-medium text-slate-500" aria-live="polite">
                {query.trim() ? `${results.length} result${results.length === 1 ? "" : "s"}` : "Popular"}
              </p>
              <ul id="site-search-results" role="listbox" aria-label="Search results">
                {results.map((item, i) => (
                  <li
                    key={item.href}
                    id={`search-opt-${i}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseMove={() => setActive(i)}
                    onClick={() => go(item)}
                    className={`flex cursor-pointer items-start justify-between gap-3 rounded-lg px-3 py-2.5 ${i === active ? "bg-brand-50" : ""}`}
                  >
                    <span className="min-w-0">
                      <span className="block font-medium text-slate-900">{item.title}</span>
                      <span className="block truncate text-sm text-slate-600">{item.description}</span>
                    </span>
                    <span className="mt-0.5 shrink-0 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{item.kind}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}
