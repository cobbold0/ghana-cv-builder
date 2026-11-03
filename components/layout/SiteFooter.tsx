import Link from "next/link";
import { ADS } from "@/lib/ads";
import { SITE } from "@/lib/seo/site";
import { GA_ID } from "./ThirdPartyScripts";
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
      { href: "/cv-guides", label: "All CV guides" },
      { href: "/how-to-write-a-cv", label: "How to write a CV" },
      { href: "/cv-format", label: "CV format" },
      { href: "/cv-template-ghana", label: "CV template for Ghana" },
      { href: "/professional-summary", label: "Professional summary" },
      { href: "/application-letter", label: "Application letter" },
    ],
  },
  {
    title: "For students",
    links: [
      { href: "/graduate-cv", label: "Graduate CV" },
      { href: "/student-cv", label: "Student CV" },
      { href: "/internship-cv", label: "Internship CV" },
      { href: "/cv-with-no-experience", label: "CV with no experience" },
    ],
  },
  {
    title: "About",
    links: [
      { href: "/about", label: "About" },
      { href: "/sitemap-directory", label: "Sitemap directory" },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms of use" },
      { href: `mailto:${SITE.email}`, label: "Contact" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{g.title}</p>
              <ul className="mt-3 space-y-2">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-slate-600 hover:text-slate-900">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} {SITE.name}. Free, private CV builder for Ghana.
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            {GA_ID && <span>Google Analytics</span>}
            {ADS.client && <span>Google AdSense</span>}
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
