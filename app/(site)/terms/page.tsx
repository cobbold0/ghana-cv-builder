import { ContentPage } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { SITE, pageMetadata } from "@/lib/seo/site";

const description = "The terms for using Ghana CV Builder, a free online CV creation tool.";

export const metadata = pageMetadata({ title: "Terms of Use — Ghana CV Builder", description, path: "/terms" });

export default function Page() {
  return (
    <ContentPage
      path="/terms"
      breadcrumb={[{ name: "Terms of use", path: "/terms" }]}
      title="Terms of use"
      description={description}
      article={false}
      intro={<p>By using Ghana CV Builder you agree to these terms.</p>}
      related={[LINKS.builder, LINKS.howTo]}
      cta={CREATE_CTA}
    >
      <h2>The service</h2>
      <p>
        Ghana CV Builder is a free tool for creating CVs. We aim to keep it available and working correctly, but we provide it &ldquo;as is&rdquo;
        without guarantees. We may change or discontinue features at any time.
      </p>
      <h2>Your content</h2>
      <p>
        You are responsible for the information you put in your CV. Make sure it is accurate and that you have permission to list any referees. The
        CVs you create belong to you.
      </p>
      <h2>Keeping a copy</h2>
      <p>
        Your CV is stored only in your browser. We cannot recover it if your browser data is cleared or your device is lost, so keep a downloaded PDF
        or backup file.
      </p>
      <h2>Advice on this site</h2>
      <p>
        Our guides and examples are general information to help you write a CV. They are not a guarantee of any job outcome, and employers&apos;
        requirements vary. Always follow the instructions in the job advert.
      </p>
      <h2>Acceptable use</h2>
      <p>Don&apos;t misuse the site, attempt to disrupt it, or use it to create misleading or fraudulent documents.</p>
      <h2>Contact</h2>
      <p>
        Questions about these terms? Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>
    </ContentPage>
  );
}
