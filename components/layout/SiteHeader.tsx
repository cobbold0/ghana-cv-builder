import Link from "next/link";
import { buttonClass } from "@/lib/ui";
import { Logo } from "./Logo";

export const NAV = [
  { href: "/cv-templates", label: "Templates" },
  { href: "/cv-examples", label: "Examples" },
  { href: "/how-to-write-a-cv", label: "How to write a CV" },
  { href: "/cv-guides", label: "Guides" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4">
        <Logo />
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/builder" className={buttonClass("primary", "sm", "whitespace-nowrap")}>
            Create my CV
          </Link>
          <details className="relative md:hidden">
            <summary className="flex min-h-9 cursor-pointer list-none items-center rounded-md px-2 text-sm font-medium text-slate-700 hover:bg-slate-100 [&::-webkit-details-marker]:hidden">
              Menu
            </summary>
            <nav aria-label="Main" className="absolute top-full right-0 z-30 mt-2 w-56 rounded-lg border border-slate-200 bg-white p-1 shadow-lg">
              <ul>
                {NAV.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="block rounded-md px-3 py-2.5 text-sm text-slate-800 hover:bg-slate-100">
                      {n.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
