import Link from "next/link";
import { ADS } from "@/lib/ads";
import { CookieSettingsButton } from "./CookieSettingsButton";

const GROUPS = [
  {
    title: "Create",
    links: [
      { href: "/builder", label: "CV builder" },
      { href: "/cv-builder", label: "How the builder works" },
      { href: "/cv-templates", label: "CV templates" },
      { href: "/cv-examples", label: "CV examples" },
    ],
  },
  {
    title: "Guides",
    links: [
      { href: "/how-to-write-a-cv", label: "How to write a CV" },
      { href: "/cv-format", label: "CV format" },
      { href: "/cv-template-ghana", label: "CV template for Ghana" },
      { href: "/professional-cv", label: "Professional CV" },
    ],
  },
  {
    title: "For students",
    links: [
      { href: "/graduate-cv", label: "Graduate CV" },
      { href: "/student-cv", label: "Student CV" },
      { href: "/internship-cv", label: "Internship CV" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "About" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms of use" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        {GROUPS.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <h2 className="text-sm font-semibold text-slate-900">{g.title}</h2>
            <ul className="mt-3 space-y-2">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-600 hover:text-slate-900 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Ghana CV Builder. Your CV is created and stored on your own device.</p>
          {ADS.client ? <CookieSettingsButton /> : null}
        </div>
      </div>
    </footer>
  );
}
