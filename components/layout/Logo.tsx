import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 rounded-md font-semibold whitespace-nowrap text-slate-900">
      <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-md bg-brand-700 text-xs font-bold tracking-tight text-white">
        CV
      </span>
      <span className="text-[15px] sm:text-base">Ghana CV Builder</span>
    </Link>
  );
}
