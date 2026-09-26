import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { Faq, type FaqItem } from "@/components/content/Faq";
import { JsonLd } from "@/components/content/JsonLd";
import { TemplateThumbnail } from "@/components/cv/TemplateThumbnail";
import { EXAMPLES } from "@/lib/examples";
import { SITE, absoluteUrl, pageMetadata } from "@/lib/seo/site";
import { TEMPLATES } from "@/lib/templates/registry";
import { buttonClass } from "@/lib/ui";

export const metadata = pageMetadata({
  title: "Free CV Builder for Ghana — Create a Professional CV in Minutes",
  description:
    "Create a professional CV online for free. Choose a template, fill in your details on your phone or computer, and download a clean PDF. No sign-up needed.",
  path: "/",
});

const STEPS = [
  { title: "Fill in your details", body: "Add your experience, education and skills in simple steps. Tips and examples help you write each section." },
  { title: "Choose a template", body: "Switch between five professional templates at any time. Your details stay the same." },
  { title: "Download your PDF", body: "Get a clean, print-ready A4 PDF with selectable text, ready to email or upload." },
];

const FEATURES = [
  { title: "Works well on phones", body: "Designed for small screens first, with an Edit and Preview switch so you're never lost." },
  { title: "No account needed", body: "Start straight away. Your CV is saved automatically in your browser so you can come back later." },
  { title: "Private by design", body: "Your CV is built on your own device and isn't uploaded to our servers." },
  { title: "Made with Ghana in mind", body: "Sections for national service, local languages and referees, plus guidance written for local job seekers." },
  { title: "Professional PDFs", body: "Real text (not an image), embedded fonts and sensible page breaks, so your CV prints and reads cleanly." },
  { title: "Free to use", body: "Create and download as many CVs as you need. No watermarks." },
];

const FAQ: FaqItem[] = [
  { q: "Is Ghana CV Builder free?", a: "Yes. You can create, edit and download your CV as a PDF for free, with no watermark." },
  {
    q: "Do I need to create an account?",
    a: "No. Open the builder and start typing. Your CV is saved in your browser on the device you're using.",
  },
  {
    q: "Where is my CV saved, and can I edit it later?",
    a: "Your CV is saved in your browser's storage on this device, so you can close the page and continue later. If you clear your browser data or switch devices, use Menu → Save backup file in the builder to keep a copy you can open again.",
  },
  {
    q: "Will it work on my phone?",
    a: "Yes. The builder is designed for phones first. You can switch between editing and previewing, then download the PDF straight to your phone.",
  },
  {
    q: "Should I put a photo on my CV?",
    a: "Usually not, unless the job advert asks for one. If you need a photo, the Modern and Professional templates support it.",
  },
  {
    q: "How long should my CV be?",
    a: (
      <>
        One page is usually enough for students and recent graduates; two pages is common for experienced professionals. See our{" "}
        <Link href="/cv-format" className="text-brand-700 underline">
          CV format guide
        </Link>{" "}
        for more detail.
      </>
    ),
  },
  { q: "What file format should I send?", a: "Send a PDF unless the employer asks for something else. PDFs look the same on every device." },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", name: SITE.name, url: absoluteUrl("/") },
            {
              "@type": "WebApplication",
              name: SITE.name,
              url: absoluteUrl("/builder"),
              applicationCategory: "BusinessApplication",
              operatingSystem: "Any",
              browserRequirements: "Requires a modern web browser",
              offers: { "@type": "Offer", price: "0", priceCurrency: "GHS" },
              description: SITE.description,
            },
          ],
        }}
      />

      {/* Hero */}
      <section className="border-b border-slate-200 bg-gradient-to-b from-brand-50/60 to-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h1 className="text-4xl leading-tight font-bold tracking-tight text-slate-900 sm:text-5xl">Create a professional CV in minutes</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              A free CV builder for job seekers in Ghana. Fill in your details, pick a template and download a clean PDF — on your phone or computer, with no
              sign-up.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/builder" className={buttonClass("primary", "lg")}>
                Create my CV
              </Link>
              <Link href="/cv-templates" className={buttonClass("secondary", "lg")}>
                See templates
              </Link>
            </div>
            <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600">
              {["Free, no watermark", "No account needed", "Your CV stays on your device"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <span aria-hidden="true" className="text-brand-700">
                    ✓
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden justify-center sm:flex">
            <div className="rotate-1 rounded-lg shadow-xl shadow-slate-900/10">
              <TemplateThumbnail templateId="modern" width={380} label="Example CV made with the Modern template" />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how" className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="how" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          How it works
        </h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="rounded-xl border border-slate-200 p-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-brand-700 font-semibold text-white">{i + 1}</span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{s.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Templates */}
      <section aria-labelledby="templates" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 id="templates" className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Professional CV templates
              </h2>
              <p className="mt-2 max-w-2xl text-slate-600">Every template is A4, prints cleanly in black and white, and works with the same details — switch any time.</p>
            </div>
            <Link href="/cv-templates" className="font-medium text-brand-700 underline underline-offset-2">
              Compare all templates
            </Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {TEMPLATES.map((t) => (
              <li key={t.id} className="flex flex-col items-center">
                <Link href={`/builder?template=${t.id}`} className="group block rounded-md" aria-label={`Use the ${t.name} template`}>
                  <TemplateThumbnail templateId={t.id} width={170} label={`${t.name} CV template preview`} />
                </Link>
                <h3 className="mt-3 text-sm font-semibold text-slate-900">{t.name}</h3>
                <p className="mt-1 text-center text-xs text-slate-500">{t.tagline}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features */}
      <section aria-labelledby="why" className="mx-auto max-w-6xl px-4 py-16">
        <h2 id="why" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Why use Ghana CV Builder
        </h2>
        <ul className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <li key={f.title}>
              <h3 className="font-semibold text-slate-900">{f.title}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{f.body}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Examples and guides */}
      <section aria-labelledby="resources" className="border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 id="resources" className="text-2xl font-bold text-slate-900 sm:text-3xl">
            CV examples and guides
          </h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-semibold text-slate-900">Examples you can edit</h3>
              <ul className="mt-3 grid grid-cols-2 gap-2">
                {EXAMPLES.map((e) => (
                  <li key={e.slug}>
                    <Link href={`/cv-examples/${e.slug}`} className="block rounded-lg border border-slate-200 px-4 py-3 text-sm font-medium text-slate-800 hover:border-brand-600 hover:bg-brand-50">
                      {e.label} CV
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Practical guides</h3>
              <ul className="mt-3 space-y-2">
                {[
                  { href: "/how-to-write-a-cv", label: "How to write a CV, step by step" },
                  { href: "/cv-format", label: "CV format: layout, length and sections" },
                  { href: "/cv-template-ghana", label: "Writing a CV for jobs in Ghana" },
                  { href: "/graduate-cv", label: "Graduate CV guide" },
                  { href: "/internship-cv", label: "Internship and attachment CVs" },
                ].map((g) => (
                  <li key={g.href}>
                    <Link href={g.href} className="text-brand-700 underline underline-offset-2">
                      {g.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <AdSlot />
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-8">
        <Faq items={FAQ} />
      </div>

      {/* Final CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-12">
        <div className="rounded-2xl bg-brand-800 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to build your CV?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">It takes a few minutes, and you can come back to it any time on this device.</p>
          <Link href="/builder" className={buttonClass("secondary", "lg", "mt-8 border-transparent")}>
            Create my CV
          </Link>
        </div>
      </section>
    </>
  );
}
