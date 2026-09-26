import Link from "next/link";
import { ContentPage } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { SITE, pageMetadata } from "@/lib/seo/site";

const description = "Ghana CV Builder is a free online tool that helps job seekers in Ghana create clear, professional CVs quickly, on any device.";

export const metadata = pageMetadata({ title: "About Ghana CV Builder", description, path: "/about" });

export default function Page() {
  return (
    <ContentPage
      path="/about"
      breadcrumb={[{ name: "About", path: "/about" }]}
      title="About Ghana CV Builder"
      description={description}
      article={false}
      intro={<p>Ghana CV Builder helps job seekers go from a blank page to a professional, downloadable CV as quickly as possible.</p>}
      related={[LINKS.builder, LINKS.howTo]}
      cta={CREATE_CTA}
    >
      <h2>Why we built it</h2>
      <p>
        Many people write their CV on a phone, often on mobile data, and end up fighting with word-processor templates or paying someone to type it.
        We wanted a builder that works well on a phone, doesn&apos;t require an account, and produces a clean PDF an employer will take seriously.
      </p>
      <h2>What we believe</h2>
      <ul>
        <li>The core builder should be free and genuinely useful.</li>
        <li>Your CV is personal information and should stay under your control. It is created and stored on your device.</li>
        <li>Advice should be practical and honest. We don&apos;t claim there is one CV format every employer requires.</li>
      </ul>
      <h2>How the site is funded</h2>
      <p>
        The builder is free to use. The site may show clearly labelled advertising on guide and example pages to cover running costs. Ads are never
        placed inside the CV builder. We may add optional paid extras in the future, but creating and downloading a CV will stay free. See our{" "}
        <Link href="/privacy">privacy policy</Link> for details.
      </p>
      <h2>Contact</h2>
      <p>
        Questions, feedback or found a problem? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </ContentPage>
  );
}
