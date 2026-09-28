import Link from "next/link";
import { ContentPage } from "@/components/content/ContentPage";
import { GUIDE_CATEGORIES, GUIDES, type Guide } from "@/lib/guides";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "CV Guides";
const description =
  "Practical guides to writing a CV: format, summaries, work experience, skills, CVs with no experience, graduate and internship CVs, and application letters.";

export const metadata = pageMetadata({ title: "CV Guides — How to Write a CV That Gets Interviews", description, path: "/cv-guides" });

export default function Page() {
  return (
    <ContentPage
      path="/cv-guides"
      breadcrumb={[{ name: "CV guides", path: "/cv-guides" }]}
      title={title}
      description={description}
      article={false}
      wide
      intro={<p className="max-w-3xl">Short, practical guides to every part of your CV and application. Start with the basics, or jump to your situation.</p>}
      related={[LINKS.examples, LINKS.templates]}
      cta={CREATE_CTA}
    >
      <div className="space-y-12">
        {(Object.keys(GUIDE_CATEGORIES) as Guide["category"][]).map((cat) => (
          <section key={cat} aria-labelledby={`guides-${cat}`}>
            <h2 id={`guides-${cat}`} className="text-xl font-bold text-slate-900">
              {GUIDE_CATEGORIES[cat]}
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {GUIDES.filter((g) => g.category === cat).map((g) => (
                <li key={g.href}>
                  <Link href={g.href} className="block h-full rounded-xl border border-slate-200 p-4 hover:border-brand-600 hover:bg-brand-50/50">
                    <span className="font-semibold text-slate-900">{g.title}</span>
                    <span className="mt-1 block text-sm text-slate-600">{g.description}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </ContentPage>
  );
}
