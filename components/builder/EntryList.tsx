"use client";

import { useRef, useState, type ReactNode } from "react";
import { buttonClass } from "@/lib/ui";
import { ConfirmDialog } from "./ConfirmDialog";
import { Icon } from "./icons";

export function move<T>(items: T[], from: number, to: number): T[] {
  if (to < 0 || to >= items.length) return items;
  const next = items.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

const hasContent = (item: object) =>
  Object.entries(item).some(([k, v]) => k !== "id" && (typeof v === "string" ? v.trim() !== "" : v === true));

const iconButton =
  "inline-flex size-10 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-30 disabled:hover:bg-transparent";

/** Repeatable entries (experience, education…) with add, edit, reorder and delete. */
export function EntryList<T extends { id: string }>({
  items,
  onChange,
  create,
  max,
  noun,
  addLabel,
  summarize,
  renderItem,
  emptyText,
  reveal,
}: {
  reveal?: string;
  items: T[];
  onChange: (items: T[]) => void;
  create: () => T;
  max: number;
  noun: string;
  addLabel: string;
  summarize: (item: T) => { title: string; subtitle?: string };
  renderItem: (item: T, update: (patch: Partial<T>) => void) => ReactNode;
  emptyText: string;
}) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set(items.length === 1 ? [items[0].id] : []));
  const [pendingDelete, setPendingDelete] = useState<T | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const addRef = useRef<HTMLButtonElement>(null);

  // Expand an entry when asked to (e.g. it contains a field with an error).
  const [prevReveal, setPrevReveal] = useState(reveal);
  if (reveal !== prevReveal) {
    setPrevReveal(reveal);
    if (reveal && items.some((i) => i.id === reveal) && !openIds.has(reveal)) setOpenIds(new Set(openIds).add(reveal));
  }

  const toggle = (id: string) =>
    setOpenIds((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const add = () => {
    const item = create();
    onChange([...items, item]);
    setOpenIds((s) => new Set(s).add(item.id));
    // Focus the first field of the new entry once it renders.
    requestAnimationFrame(() => {
      listRef.current?.querySelector<HTMLElement>(`[data-entry="${item.id}"] input, [data-entry="${item.id}"] textarea`)?.focus();
    });
  };

  const remove = (item: T) => {
    onChange(items.filter((i) => i.id !== item.id));
    setPendingDelete(null);
    requestAnimationFrame(() => addRef.current?.focus());
  };

  return (
    <div>
      {items.length === 0 ? <p className="mb-4 text-sm text-slate-500">{emptyText}</p> : null}
      <ol ref={listRef} className="space-y-3">
        {items.map((item, index) => {
          const open = openIds.has(item.id);
          const { title, subtitle } = summarize(item);
          const label = title || `New ${noun}`;
          return (
            <li key={item.id} data-entry={item.id} className="rounded-lg border border-slate-200 bg-slate-50/60">
              <div className="flex items-center gap-1 py-1 pr-1 pl-3">
                <button
                  type="button"
                  className="flex min-h-11 min-w-0 flex-1 items-center gap-2 text-left"
                  aria-expanded={open}
                  aria-controls={`entry-${item.id}`}
                  onClick={() => toggle(item.id)}
                >
                  <Icon name="chevron" className={`size-4 shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`} />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-slate-900">{label}</span>
                    {subtitle ? <span className="block truncate text-xs text-slate-500">{subtitle}</span> : null}
                  </span>
                </button>
                <button type="button" className={iconButton} disabled={index === 0} onClick={() => onChange(move(items, index, index - 1))} aria-label={`Move ${label} up`}>
                  <Icon name="up" />
                </button>
                <button
                  type="button"
                  className={iconButton}
                  disabled={index === items.length - 1}
                  onClick={() => onChange(move(items, index, index + 1))}
                  aria-label={`Move ${label} down`}
                >
                  <Icon name="down" />
                </button>
                <button
                  type="button"
                  className={`${iconButton} hover:text-red-700`}
                  onClick={() => (hasContent(item) ? setPendingDelete(item) : remove(item))}
                  aria-label={`Delete ${label}`}
                >
                  <Icon name="trash" />
                </button>
              </div>
              <div id={`entry-${item.id}`} hidden={!open} className="border-t border-slate-200 bg-white px-3 pt-4 pb-4 sm:px-4">
                {renderItem(item, (patch) => onChange(items.map((i) => (i.id === item.id ? { ...i, ...patch } : i))))}
              </div>
            </li>
          );
        })}
      </ol>
      {items.length < max ? (
        <button ref={addRef} type="button" className={buttonClass("secondary", "md", "mt-3 w-full border-dashed")} onClick={add}>
          <Icon name="plus" className="size-4" />
          {addLabel}
        </button>
      ) : (
        <p className="mt-3 text-sm text-slate-500">You can add up to {max} entries here.</p>
      )}
      <ConfirmDialog
        open={pendingDelete !== null}
        title={`Delete this ${noun}?`}
        message={`“${pendingDelete ? summarize(pendingDelete).title || `New ${noun}` : ""}” will be removed from your CV. This can't be undone.`}
        confirmLabel="Delete"
        onConfirm={() => pendingDelete && remove(pendingDelete)}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}

/** Compact rows for short items such as skills and languages. */
export function RowList<T extends { id: string }>({
  items,
  onChange,
  create,
  max,
  addLabel,
  noun,
  renderRow,
}: {
  items: T[];
  onChange: (items: T[]) => void;
  create: () => T;
  max: number;
  addLabel: string;
  noun: string;
  renderRow: (item: T, update: (patch: Partial<T>) => void, index: number, addAfter: () => void) => ReactNode;
}) {
  const addRef = useRef<HTMLButtonElement>(null);

  const focusRow = (id: string) => requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-row="${id}"] input`)?.focus());

  const addAt = (index: number) => {
    if (items.length >= max) return;
    const item = create();
    const next = items.slice();
    next.splice(index, 0, item);
    onChange(next);
    focusRow(item.id);
  };

  return (
    <div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={item.id} data-row={item.id} className="flex items-end gap-1">
            <div className="min-w-0 flex-1">
              {renderRow(item, (patch) => onChange(items.map((i) => (i.id === item.id ? { ...i, ...patch } : i))), index, () => addAt(index + 1))}
            </div>
            <button type="button" className={iconButton} disabled={index === 0} onClick={() => onChange(move(items, index, index - 1))} aria-label={`Move ${noun} ${index + 1} up`}>
              <Icon name="up" />
            </button>
            <button
              type="button"
              className={iconButton}
              disabled={index === items.length - 1}
              onClick={() => onChange(move(items, index, index + 1))}
              aria-label={`Move ${noun} ${index + 1} down`}
            >
              <Icon name="down" />
            </button>
            <button
              type="button"
              className={`${iconButton} hover:text-red-700`}
              onClick={() => {
                onChange(items.filter((i) => i.id !== item.id));
                const neighbour = items[index + 1] ?? items[index - 1];
                if (neighbour) focusRow(neighbour.id);
                else requestAnimationFrame(() => addRef.current?.focus());
              }}
              aria-label={`Delete ${noun} ${index + 1}`}
            >
              <Icon name="trash" />
            </button>
          </li>
        ))}
      </ul>
      {items.length < max ? (
        <button ref={addRef} type="button" className={buttonClass("secondary", "md", "mt-3 w-full border-dashed")} onClick={() => addAt(items.length)}>
          <Icon name="plus" className="size-4" />
          {addLabel}
        </button>
      ) : (
        <p className="mt-3 text-sm text-slate-500">You can add up to {max} here.</p>
      )}
    </div>
  );
}
