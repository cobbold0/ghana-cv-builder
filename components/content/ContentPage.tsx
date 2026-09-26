import Link from "next/link";
import type { ReactNode } from "react";
import { AdSlot } from "@/components/ads/AdSlot";
import { CONTENT_UPDATED } from "@/lib/seo/content";
import { SITE, absoluteUrl } from "@/lib/seo/site";
import { buttonClass } from "@/lib/ui";
import { JsonLd } from "./JsonLd";

export interface RelatedLink {
  href: string;
  label: string;
  description: string;
}

export interface Cta {
  title: string;
  text: string;
  href: string;
  label: string;
}

/**
 * Shared layout for guides and landing pages:
 * breadcrumbs → title → introduction → content → ad → related resources → CTA.
 */
export function ContentPage({
  path,
  breadcrumb,
  title,
  description,
  intro,
  children,
  related,
  cta,
  article = true,
  wide = false,
}: {
  path: string;
  breadcrumb: { name: string; path: string }[];
  title: string;
  /** Used for structured data; usually the meta description. */
  description: string;
  intro: ReactNode;
  children: ReactNode;
  related: RelatedLink[];
  cta: Cta;
  article?: boolean;
  wide?: boolean;
}) {
  const crumbs = [{ name: "Home", path: "/" }, ...breadcrumb];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
            },
            ...(article
              ? [
                  {
                    "@type": "Article",
                    headline: title,
                    description,
                    url: absoluteUrl(path),
                    dateModified: CONTENT_UPDATED,
                    inLanguage: "en-GH",
                    publisher: { "@type": "Organization", name: SITE.name, url: absoluteUrl("/") },
                    mainEntityOfPage: absoluteUrl(path),
                  },
                ]
              : []),
          ],
        }}
      />
      <div className={`mx-auto px-4 pt-6 sm:pt-8 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-sm text-slate-500">
            {crumbs.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true">/</span>}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-slate-700">
                    {c.name}
                  </span>
                ) : (
                  <Link href={c.path} className="hover:text-slate-900 hover:underline">
                    {c.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <header className="mt-6">
          <h1 className="text-3xl leading-tight font-bold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>
          <div className="mt-4 text-lg leading-relaxed text-slate-600">{intro}</div>
        </header>
      </div>

      <div className={`mx-auto px-4 ${wide ? "max-w-6xl" : "max-w-3xl"}`}>
        <div className={wide ? "mt-8" : "prose-cv mt-8"}>{children}</div>
        <AdSlot />
        <section aria-labelledby="related" className="mt-12">
          <h2 id="related" className="text-xl font-bold text-slate-900">
            Related resources
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {related.map((r) => (
              <li key={r.href}>
                <Link href={r.href} className="block h-full rounded-xl border border-slate-200 p-4 hover:border-brand-600 hover:bg-brand-50/50">
                  <span className="font-semibold text-slate-900">{r.label}</span>
                  <span className="mt-1 block text-sm text-slate-600">{r.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
        <CallToAction {...cta} />
      </div>
    </>
  );
}

export function CallToAction({ title, text, href, label }: Cta) {
  return (
    <section className="mt-12 rounded-2xl bg-brand-800 px-6 py-10 text-center text-white">
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mx-auto mt-2 max-w-lg text-brand-100">{text}</p>
      <Link href={href} className={buttonClass("secondary", "lg", "mt-6 border-transparent")}>
        {label}
      </Link>
    </section>
  );
}

/** Inline call-out inside an article. */
export function InlineCta({ href, children }: { href: string; children: ReactNode }) {
  return (
    <p className="!mt-6 rounded-lg border border-brand-200 bg-brand-50 px-4 py-3 text-slate-800">
      <Link href={href} className="font-semibold">
        {children} →
      </Link>
    </p>
  );
}
