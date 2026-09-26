"use client";

import { useId, useState, type ReactNode } from "react";
import { MAX_YEAR, MIN_YEAR, MONTH_NAMES, joinCvDate, parseCvDate } from "@/lib/cv/dates";

/** DOM id for a CV field path, used to focus the first invalid field. */
export const fieldId = (path: string) => `f-${path.replace(/[^a-zA-Z0-9-]/g, "-")}`;

const inputClass =
  "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-base text-slate-900 shadow-xs placeholder:text-slate-400 focus:border-brand-600 focus:outline-2 focus:outline-offset-0 focus:outline-brand-600/30 aria-[invalid=true]:border-red-600 sm:text-sm";

interface BaseProps {
  path: string;
  label: string;
  hint?: ReactNode;
  error?: string;
  optional?: boolean;
  className?: string;
}

function Label({ htmlFor, label, optional }: { htmlFor: string; label: string; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-800">
      {label}
      {optional && <span className="ml-1 font-normal text-slate-500">(optional)</span>}
    </label>
  );
}

function Help({ id, hint, error }: { id: string; hint?: ReactNode; error?: string }) {
  return (
    <>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          <span aria-hidden="true">⚠ </span>
          {error}
        </p>
      ) : null}
      {hint ? (
        <p id={`${id}-hint`} className="mt-1.5 text-sm text-slate-500">
          {hint}
        </p>
      ) : null}
    </>
  );
}

const describedBy = (id: string, hint?: ReactNode, error?: string) =>
  [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;

export function TextField({
  path,
  label,
  hint,
  error,
  optional,
  className,
  value,
  onChange,
  onBlur,
  maxLength,
  type = "text",
  placeholder,
  autoComplete,
  inputMode,
  onEnter,
}: BaseProps & {
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  maxLength: number;
  type?: "text" | "email" | "tel" | "url";
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "email" | "tel" | "url";
  onEnter?: () => void;
}) {
  const id = fieldId(path);
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} optional={optional} />
      <input
        id={id}
        type={type}
        className={inputClass}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        autoComplete={autoComplete ?? "off"}
        inputMode={inputMode}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        onKeyDown={
          onEnter
            ? (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onEnter();
                }
              }
            : undefined
        }
      />
      <Help id={id} hint={hint} error={error} />
    </div>
  );
}

export function TextArea({
  path,
  label,
  hint,
  error,
  optional,
  className,
  value,
  onChange,
  maxLength,
  rows = 4,
  placeholder,
}: BaseProps & { value: string; onChange: (v: string) => void; maxLength: number; rows?: number; placeholder?: string }) {
  const id = fieldId(path);
  const nearLimit = value.length > maxLength * 0.85;
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} optional={optional} />
      <textarea
        id={id}
        className={`${inputClass} leading-relaxed`}
        rows={rows}
        value={value}
        maxLength={maxLength}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(id, hint, error)}
        onChange={(e) => onChange(e.target.value)}
      />
      {nearLimit && (
        <p className="mt-1 text-right text-xs text-slate-500" aria-live="polite">
          {value.length} / {maxLength} characters
        </p>
      )}
      <Help id={id} hint={hint} error={error} />
    </div>
  );
}

export function SelectField<T extends string>({
  path,
  label,
  hint,
  optional,
  className,
  value,
  onChange,
  options,
}: BaseProps & { value: T; onChange: (v: T) => void; options: readonly { value: T; label: string }[] }) {
  const id = fieldId(path);
  return (
    <div className={className}>
      <Label htmlFor={id} label={label} optional={optional} />
      <select id={id} className={inputClass} value={value} onChange={(e) => onChange(e.target.value as T)}>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <Help id={id} hint={hint} />
    </div>
  );
}

export function Checkbox({ label, checked, onChange, id }: { label: string; checked: boolean; onChange: (v: boolean) => void; id?: string }) {
  const auto = useId();
  const cid = id ?? auto;
  return (
    <div className="flex items-center gap-2.5">
      <input
        id={cid}
        type="checkbox"
        className="size-5 rounded border-slate-400 accent-brand-700"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <label htmlFor={cid} className="text-sm text-slate-800">
        {label}
      </label>
    </div>
  );
}

const thisYear = new Date().getFullYear();
const YEARS = Array.from({ length: Math.min(MAX_YEAR, thisYear + 8) - MIN_YEAR + 1 }, (_, i) => String(Math.min(MAX_YEAR, thisYear + 8) - i));

/** Month + year pickers. Works the same on every browser, unlike <input type="month">. */
export function MonthYearField({
  path,
  label,
  error,
  optional,
  className,
  value,
  onChange,
  disabled,
}: BaseProps & { value: string; onChange: (v: string) => void; disabled?: boolean }) {
  const id = fieldId(path);
  const parsed = parseCvDate(value);
  // Remember a month picked before the year so the choice isn't lost.
  const [pendingMonth, setPendingMonth] = useState("");
  const month = parsed?.month ? String(parsed.month).padStart(2, "0") : parsed ? "" : pendingMonth;
  const year = parsed ? String(parsed.year) : "";
  const selectClass = `${inputClass} disabled:bg-slate-100 disabled:text-slate-400`;

  return (
    <fieldset className={`min-w-0 ${className ?? ""}`} aria-describedby={error ? `${id}-error` : undefined}>
      <legend className="mb-1.5 block text-sm font-medium text-slate-800">
        {label}
        {optional && <span className="ml-1 font-normal text-slate-500">(optional)</span>}
      </legend>
      <div className="grid grid-cols-2 gap-2">
        <select
          id={`${id}-month`}
          aria-label={`${label} month`}
          className={selectClass}
          value={month}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          onChange={(e) => {
            if (year) onChange(joinCvDate(year, e.target.value));
            else setPendingMonth(e.target.value);
          }}
        >
          <option value="">Month</option>
          {MONTH_NAMES.map((m, i) => (
            <option key={m} value={String(i + 1).padStart(2, "0")}>
              {m}
            </option>
          ))}
        </select>
        <select
          id={id}
          aria-label={`${label} year`}
          className={selectClass}
          value={year}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          onChange={(e) => onChange(joinCvDate(e.target.value, month))}
        >
          <option value="">Year</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          <span aria-hidden="true">⚠ </span>
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}
