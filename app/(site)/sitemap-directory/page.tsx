import Link from "next/link";
import { EXAMPLES } from "@/lib/examples";
import { GUIDES } from "@/lib/guides";
import { pageMetadata } from "@/lib/seo/site";

export const metadata = pageMetadata({
  title: "Site Directory & Sitemap — Ghana CV Builder",
  description: "Browse all CV templates, job seeker CV examples by industry, formatting guides, and career resources.",
  path: "/sitemap-directory",
});

export default function SitemapDirectoryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Site Directory &amp; Sitemap</h1>
        <p className="mt-2 text-slate-600">
          Complete index of all CV templates, Ghanaian CV examples by career field, and job application guides.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Core CV Tools &amp; Pages</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link href="/" className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-emerald-600">
            <span className="font-semibold text-emerald-800">Home</span>
            <span className="block text-xs text-slate-500 mt-1">CV builder overview and templates preview</span>
          </Link>
          <Link href="/cv-builder" className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-emerald-600">
            <span className="font-semibold text-emerald-800">CV Builder Guide</span>
            <span className="block text-xs text-slate-500 mt-1">Step-by-step CV writing tutorial</span>
          </Link>
          <Link href="/cv-templates" className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-emerald-600">
            <span className="font-semibold text-emerald-800">CV Templates</span>
            <span className="block text-xs text-slate-500 mt-1">Free professional, graduate, and executive templates</span>
          </Link>
          <Link href="/cv-examples" className="block rounded-lg border border-slate-200 bg-white p-4 hover:border-emerald-600">
            <span className="font-semibold text-emerald-800">CV Examples Directory</span>
            <span className="block text-xs text-slate-500 mt-1">Real CV samples for Ghanaian job seekers</span>
          </Link>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Guides &amp; Advice ({GUIDES.length})</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {GUIDES.map((g) => (
            <Link key={g.href} href={g.href} className="block rounded-lg border border-slate-200 bg-white p-3 hover:border-emerald-600">
              <span className="font-medium text-slate-900">{g.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Role-Specific CV Examples ({EXAMPLES.length})</h2>
        <div className="grid gap-2 sm:grid-cols-2">
          {EXAMPLES.map((e) => (
            <Link key={e.slug} href={`/cv-examples/${e.slug}`} className="block rounded-lg border border-slate-200 bg-white p-3 hover:border-emerald-600 text-sm">
              <span className="font-medium text-slate-900">{e.title}</span>
              <span className="block text-xs text-slate-500">{e.category} · {e.level}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
