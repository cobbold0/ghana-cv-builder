import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/content/ContentPage";
import { TemplateThumbnail } from "@/components/cv/TemplateThumbnail";
import { EXAMPLES, getExample } from "@/lib/examples";
import { LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";
import { getTemplateInfo } from "@/lib/templates/registry";
import { buttonClass } from "@/lib/ui";

export const dynamicParams = false;

export function generateStaticParams() {
  return EXAMPLES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: PageProps<"/cv-examples/[slug]">): Promise<Metadata> {
  const ex = getExample((await params).slug);
  if (!ex) return {};
  return pageMetadata({ title: ex.metaTitle, description: ex.metaDescription, path: `/cv-examples/${ex.slug}` });
}

export default async function Page({ params }: PageProps<"/cv-examples/[slug]">) {
  const ex = getExample((await params).slug);
  if (!ex) notFound();
  const template = getTemplateInfo(ex.templateId);
  const others = EXAMPLES.filter((e) => e.slug !== ex.slug).slice(0, 2);

  return (
    <ContentPage
      path={`/cv-examples/${ex.slug}`}
      breadcrumb={[
        { name: "CV examples", path: "/cv-examples" },
        { name: ex.label, path: `/cv-examples/${ex.slug}` },
      ]}
      title={ex.title}
      description={ex.metaDescription}
      intro={<p>{ex.intro}</p>}
      related={[
        { href: ex.relatedGuide.href, label: ex.relatedGuide.label, description: "The full guide behind this example." },
        ...others.map((o) => ({ href: `/cv-examples/${o.slug}`, label: o.title, description: o.audience })),
        LINKS.templates,
      ]}
      cta={{
        title: "Make this CV your own",
        text: "Open this example in the builder, replace the details with yours and download a PDF.",
        href: `/builder?example=${ex.slug}`,
        label: "Edit this example",
      }}
    >
      <figure className="not-prose !mt-0 flex flex-col items-center rounded-2xl bg-slate-100 px-4 py-6">
        <div className="w-full max-w-[560px] overflow-hidden">
          <div className="hidden sm:block">
            <TemplateThumbnail templateId={ex.templateId} cv={ex.cv} width={560} label={`${ex.title} in the ${template.name} template`} />
          </div>
          <div className="flex justify-center sm:hidden">
            <TemplateThumbnail templateId={ex.templateId} cv={ex.cv} width={320} label={`${ex.title} in the ${template.name} template`} />
          </div>
        </div>
        <figcaption className="mt-3 text-center text-sm text-slate-600">
          Example CV using the <Link href="/cv-templates">{template.name} template</Link>. Page 1 shown. The person and employers are fictional.
        </figcaption>
        <Link href={`/builder?example=${ex.slug}`} className={buttonClass("primary", "md", "mt-4 no-underline")}>
          Edit this example
        </Link>
      </figure>

      <h2>Who this example is for</h2>
      <p>{ex.audience}.</p>

      <h2>Why this CV works</h2>
      <ul>
        {ex.whyItWorks.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ul>

      <h2>Tips for writing your own</h2>
      {ex.tips.map((t) => (
        <section key={t.heading}>
          <h3>{t.heading}</h3>
          <p>{t.body}</p>
        </section>
      ))}
    </ContentPage>
  );
}
