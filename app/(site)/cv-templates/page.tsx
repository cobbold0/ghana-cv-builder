import Link from "next/link";
import { ContentPage } from "@/components/content/ContentPage";
import { TemplateThumbnail } from "@/components/cv/TemplateThumbnail";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";
import { TEMPLATES } from "@/lib/templates/registry";
import { buttonClass } from "@/lib/ui";

const title = "Free CV Templates";
const description =
  "Five free, professional CV templates: Modern, Classic, Minimal, Graduate and Professional. All A4, printable and easy to fill in online. Download as PDF.";

export const metadata = pageMetadata({ title: "Professional CV Templates — Free Online CV Builder", description, path: "/cv-templates" });

export default function Page() {
  return (
    <ContentPage
      path="/cv-templates"
      breadcrumb={[{ name: "CV templates", path: "/cv-templates" }]}
      title={title}
      description={description}
      article={false}
      wide
      intro={
        <p className="max-w-3xl">
          Every template uses the same details, so you can fill in your CV once and switch designs whenever you like. All are A4, single-column, print
          cleanly in black and white, and produce a PDF with real, selectable text.
        </p>
      }
      related={[LINKS.examples, LINKS.format, LINKS.professional, LINKS.ghana]}
      cta={CREATE_CTA}
    >
      <ul className="grid gap-10 md:grid-cols-2">
        {TEMPLATES.map((t) => (
          <li key={t.id} className="flex flex-col gap-5 rounded-2xl border border-slate-200 p-5 sm:flex-row">
            <div className="flex justify-center">
              <TemplateThumbnail templateId={t.id} width={210} label={`${t.name} CV template filled with example details`} />
            </div>
            <div className="flex flex-1 flex-col">
              <h2 className="text-xl font-bold text-slate-900">{t.name}</h2>
              <p className="mt-1 text-sm font-medium text-brand-700">{t.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{t.description}</p>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">Good for</h3>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-slate-600">
                {t.bestFor.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-slate-500">{t.supportsPhoto ? "Optional photo supported." : "No photo."}</p>
              <div className="mt-auto pt-5">
                <Link href={`/builder?template=${t.id}`} className={buttonClass("primary", "md", "w-full sm:w-auto")}>
                  Use this template
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <section className="prose-cv mx-auto mt-16 max-w-3xl">
        <h2>How to choose a CV template</h2>
        <ul>
          <li>
            <strong>Not sure?</strong> Choose <em>Modern</em>. It suits most jobs and is easy to scan.
          </li>
          <li>
            <strong>Conservative industries</strong> such as banking, law and public service: <em>Classic</em>.
          </li>
          <li>
            <strong>Students and new graduates:</strong> <em>Graduate</em> puts education and projects first.
          </li>
          <li>
            <strong>Experienced professionals</strong> with a lot to say: <em>Minimal</em> or <em>Professional</em>.
          </li>
        </ul>
        <p>
          The content matters far more than the design. A clear, specific CV in a plain template will beat a beautiful template with vague content.
          Our <Link href="/how-to-write-a-cv">step-by-step guide</Link> covers what to write in each section.
        </p>
        <h2>Are these templates ATS-friendly?</h2>
        <p>
          Many employers use applicant tracking systems to read CVs. Our templates use a single column, standard section headings and real text in
          the PDF, which are the features generally recommended for this kind of software. No template can guarantee how every system will read a
          CV, so keep your wording clear and standard.
        </p>
      </section>
    </ContentPage>
  );
}
