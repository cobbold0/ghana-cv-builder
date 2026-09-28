import Link from "next/link";
import { ContentPage } from "@/components/content/ContentPage";
import { TemplateThumbnail } from "@/components/cv/TemplateThumbnail";
import { EXAMPLE_CATEGORIES, EXAMPLES, type ExampleCategory } from "@/lib/examples";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "CV Examples";
const description =
  "Realistic CV examples for students, graduates, office, health, teaching, technical and trade jobs — with notes on why they work. Open any example and edit it.";

export const metadata = pageMetadata({ title: "CV Examples for Graduates, Students and Professionals", description, path: "/cv-examples" });

export default function Page() {
  return (
    <ContentPage
      path="/cv-examples"
      breadcrumb={[{ name: "CV examples", path: "/cv-examples" }]}
      title={title}
      description={description}
      article={false}
      wide
      intro={
        <p className="max-w-3xl">
          Each example is a complete CV for a fictional person, written to show good practice for a particular situation. Read the notes on what
          makes it work, then open it in the builder and replace the details with your own.
        </p>
      }
      related={[LINKS.templates, LINKS.howTo, LINKS.graduate, LINKS.professional]}
      cta={CREATE_CTA}
    >
      <nav aria-label="Example categories" className="mb-8 flex flex-wrap gap-2">
        {(Object.keys(EXAMPLE_CATEGORIES) as ExampleCategory[]).map((c) => (
          <a key={c} href={`#${c}`} className="rounded-full border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:border-brand-600 hover:bg-brand-50">
            {EXAMPLE_CATEGORIES[c]}
          </a>
        ))}
      </nav>
      <div className="space-y-14">
        {(Object.keys(EXAMPLE_CATEGORIES) as ExampleCategory[]).map((c) => (
          <section key={c} id={c} aria-labelledby={`h-${c}`} className="scroll-mt-6">
            <h2 id={`h-${c}`} className="text-xl font-bold text-slate-900">
              {EXAMPLE_CATEGORIES[c]}
            </h2>
            <ul className="mt-5 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {EXAMPLES.filter((e) => e.category === c).map((e) => (
                <li key={e.slug}>
                  <Link href={`/cv-examples/${e.slug}`} className="group block rounded-2xl border border-slate-200 p-5 hover:border-brand-600">
                    <div className="flex justify-center rounded-lg bg-slate-50 py-5">
                      <TemplateThumbnail templateId={e.templateId} cv={e.cv} width={200} label={`${e.title} preview`} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-slate-900 group-hover:underline">{e.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{e.audience}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="mt-8 text-sm text-slate-500">
        All names, contact details and employers in these examples are fictional. Schools and public institutions are named only to make the examples
        realistic.
      </p>
    </ContentPage>
  );
}
