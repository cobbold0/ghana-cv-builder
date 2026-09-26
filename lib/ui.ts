/** Shared class names so links and buttons look the same without wrapper components. */
const base =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2";

const variants = {
  primary: "bg-brand-700 text-white hover:bg-brand-800 focus-visible:outline-brand-700",
  secondary: "border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 focus-visible:outline-brand-700",
  ghost: "text-slate-700 hover:bg-slate-100 focus-visible:outline-brand-700",
  danger: "bg-red-700 text-white hover:bg-red-800 focus-visible:outline-red-700",
};

const sizes = {
  sm: "min-h-9 px-3 text-sm",
  md: "min-h-11 px-4 text-sm",
  lg: "min-h-12 px-6 text-base",
};

export function buttonClass(variant: keyof typeof variants = "primary", size: keyof typeof sizes = "md", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`.trim();
}
