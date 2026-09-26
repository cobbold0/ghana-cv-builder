/** CV dates are stored as "YYYY" or "YYYY-MM". */

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const MIN_YEAR = 1950;
export const MAX_YEAR = 2100;

const DATE_RE = /^(\d{4})(?:-(\d{2}))?$/;

export function parseCvDate(value: string): { year: number; month?: number } | null {
  const m = DATE_RE.exec(value.trim());
  if (!m) return null;
  const year = Number(m[1]);
  const month = m[2] ? Number(m[2]) : undefined;
  if (year < MIN_YEAR || year > MAX_YEAR) return null;
  if (month !== undefined && (month < 1 || month > 12)) return null;
  return { year, month };
}

export function isValidCvDate(value: string): boolean {
  return value.trim() === "" || parseCvDate(value) !== null;
}

/** True when both dates are present and the end is before the start. */
export function isEndBeforeStart(start: string, end: string): boolean {
  const a = parseCvDate(start);
  const b = parseCvDate(end);
  if (!a || !b) return false;
  // "2020" to "2020-03" is fine, so compare years only if either lacks a month.
  if (!a.month || !b.month) return b.year < a.year;
  return b.year * 12 + b.month < a.year * 12 + a.month;
}

export function formatCvDate(value: string): string {
  const d = parseCvDate(value);
  if (!d) return "";
  return d.month ? `${MONTHS[d.month - 1]} ${d.year}` : String(d.year);
}

export function formatDateRange(start: string, end: string, current = false): string {
  const s = formatCvDate(start);
  const e = current ? "Present" : formatCvDate(end);
  if (s && e) return s === e ? s : `${s} – ${e}`;
  return s || e;
}

export function joinCvDate(year: string, month: string): string {
  if (!year) return "";
  return month ? `${year}-${month.padStart(2, "0")}` : year;
}
