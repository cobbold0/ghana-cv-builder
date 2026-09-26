import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { ContentPage, InlineCta } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "How to Make Your CV Look Professional";
const description =
  "Practical ways to make your CV look and read like a professional's: clean layout, achievement-focused writing, tailoring for each role and a final quality check.";

export const metadata = pageMetadata({ title: "Professional CV — How to Make Your CV Look Professional", description, path: "/professional-cv" });

export default function Page() {
  return (
    <ContentPage
      path="/professional-cv"
      breadcrumb={[{ name: "Professional CV", path: "/professional-cv" }]}
      title={title}
      description={description}
      intro={
        <p>
          A professional CV isn&apos;t about fancy design. It&apos;s about being easy to read, specific about what you&apos;ve achieved, and free of
          mistakes. These are the changes that make the biggest difference, especially once you have a few years of experience.
        </p>
      }
      related={[LINKS.templates, LINKS.format, { href: "/cv-examples/accountant", label: "Accountant CV example", description: "A clean, conservative professional CV." }, LINKS.howTo]}
      cta={CREATE_CTA}
    >
      <h2>1. A clean, consistent layout</h2>
      <ul>
        <li>One or two fonts, with your name clearly larger than everything else.</li>
        <li>The same date format, heading style and spacing throughout.</li>
        <li>Plenty of white space. Crowded pages are tiring to read.</li>
        <li>Little or no colour, no icons for every heading, and no skill bars or star ratings, which say little and can confuse screening software.</li>
      </ul>
      <p>
        Our <Link href="/cv-templates">templates</Link> handle this for you, so you can focus on the content.
      </p>

      <h2>2. A summary that sounds like you, not a template</h2>
      <p>
        Open with your professional identity and your strongest evidence: &ldquo;Procurement officer with seven years in manufacturing, managing
        annual purchases of around GH₵ 15 million and 60+ suppliers.&rdquo; Specific facts make you credible.
      </p>

      <h2>3. Achievements, with scale</h2>
      <p>For each recent role, use three to five bullets that show:</p>
      <ul>
        <li>
          <strong>What you did</strong> — start with a strong verb (led, negotiated, introduced, reduced).
        </li>
        <li>
          <strong>How big it was</strong> — team size, budget, number of customers, sites or transactions.
        </li>
        <li>
          <strong>What changed</strong> — time saved, costs reduced, targets met, problems solved.
        </li>
      </ul>
      <p>Only include numbers you can explain in an interview.</p>

      <AdSlot />

      <h2>4. Tailor it for every application</h2>
      <p>
        Recruiters notice when a CV was written for the job. Adjust your summary, reorder your bullet points so the most relevant come first, and make
        sure the skills section uses the same terms as the advert where they genuinely apply to you.
      </p>

      <h2>5. Cut what no longer helps</h2>
      <ul>
        <li>Roles from more than 10–15 years ago can be shortened to one line or grouped.</li>
        <li>Remove senior high school once you have a degree and several years of experience.</li>
        <li>Drop outdated skills and generic statements like &ldquo;works well under pressure&rdquo; unless you back them up with an example.</li>
      </ul>

      <InlineCta href="/builder?template=professional">Try the Professional template</InlineCta>

      <h2>6. Show qualifications precisely</h2>
      <p>
        Professional qualifications, licences and memberships carry weight. Write their full names and your current status. Never round up — an
        unfinished qualification written as complete can end an application or a job.
      </p>

      <h2>7. A final check</h2>
      <ul>
        <li>Spelling and grammar checked, and read by someone else.</li>
        <li>Contact details correct and professional.</li>
        <li>Consistent tense: past tense for past roles, present tense for your current role.</li>
        <li>Exported as a PDF with selectable text and a clear file name.</li>
      </ul>
    </ContentPage>
  );
}
