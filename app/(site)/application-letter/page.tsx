import { AdSlot } from "@/components/ads/AdSlot";
import { ContentPage, InlineCta } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "How to Write a Job Application Letter";
const description =
  "A clear structure for a job application letter or cover letter, with a full example, tips for emailed applications, and common mistakes to avoid.";

export const metadata = pageMetadata({ title: "How to Write an Application Letter for a Job (With Example)", description, path: "/application-letter" });

export default function Page() {
  return (
    <ContentPage
      path="/application-letter"
      breadcrumb={[
        { name: "CV guides", path: "/cv-guides" },
        { name: "Application letter", path: "/application-letter" },
      ]}
      title={title}
      description={description}
      intro={
        <p>
          An application letter (or cover letter) goes with your CV and explains why you are applying and why you fit the role. Many employers in
          Ghana still ask for one. It should be one page and written for the specific job.
        </p>
      }
      related={[LINKS.howTo, LINKS.summary, LINKS.mistakes, LINKS.examples]}
      cta={{ ...CREATE_CTA, title: "Now build the CV to go with it", text: "Free, no sign-up, and your details stay on your device." }}
    >
      <h2>The structure</h2>
      <ol>
        <li>
          <strong>Your address and contact details</strong>, then the date.
        </li>
        <li>
          <strong>The recipient&apos;s title and address</strong> — use a name if the advert gives one.
        </li>
        <li>
          <strong>Salutation</strong>: &ldquo;Dear Mrs Owusu&rdquo; or, if you don&apos;t know the name, &ldquo;Dear Sir/Madam&rdquo;.
        </li>
        <li>
          <strong>Subject line</strong> naming the position and any reference number, e.g. &ldquo;APPLICATION FOR THE POSITION OF ACCOUNTS
          OFFICER (REF: AO/2026/04)&rdquo;.
        </li>
        <li>
          <strong>Opening paragraph</strong>: the job you are applying for and where you saw it.
        </li>
        <li>
          <strong>One or two middle paragraphs</strong>: your most relevant experience and skills, matched to what the advert asks for.
        </li>
        <li>
          <strong>Closing paragraph</strong>: your availability and a polite request for an interview.
        </li>
        <li>
          <strong>Sign-off</strong>: &ldquo;Yours faithfully&rdquo; after &ldquo;Dear Sir/Madam&rdquo;, or &ldquo;Yours sincerely&rdquo; after a
          name, followed by your signature and full name.
        </li>
      </ol>

      <h2>Example (fictional)</h2>
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-5 text-[15px] leading-relaxed">
        <p className="!mt-0">
          Kwabena Asare Boateng
          <br />
          Kumasi, Ashanti Region
          <br />
          +233 20 000 0001 · kwabena.boateng@example.com
        </p>
        <p>28 September 2026</p>
        <p>
          The Human Resource Manager
          <br />
          Example Company Ltd
          <br />
          Kumasi
        </p>
        <p>Dear Sir/Madam,</p>
        <p>
          <strong>APPLICATION FOR THE POSITION OF ACCOUNTS ASSISTANT</strong>
        </p>
        <p>
          I am writing to apply for the position of Accounts Assistant advertised on your website. I recently completed a BSc in Business
          Administration (Accounting) and my national service in a district finance office.
        </p>
        <p>
          During national service I recorded daily revenue, reconciled collections with bank deposits and prepared monthly expenditure summaries in
          Excel. This gave me practical experience of the accuracy and deadlines an accounts role requires. I am also comfortable with QuickBooks and
          have handled cash and mobile money payments in a part-time sales role.
        </p>
        <p>
          I am available to start immediately and would welcome the opportunity to discuss how I can support your finance team. My CV is attached.
          Thank you for considering my application.
        </p>
        <p>Yours faithfully,</p>
        <p>Kwabena Asare Boateng</p>
      </div>

      <AdSlot />

      <h2>Sending by email</h2>
      <ul>
        <li>Use a clear subject line: &ldquo;Application for Accounts Assistant – Kwabena Boateng&rdquo;.</li>
        <li>Either paste a short version of the letter into the email or write two or three lines and attach the letter.</li>
        <li>Attach your letter and CV as PDFs with clear file names.</li>
        <li>Send from a professional email address and check the recipient&apos;s address carefully.</li>
      </ul>

      <h2>Mistakes to avoid</h2>
      <ul>
        <li>Repeating your whole CV. Pick the two or three things that matter most for this job.</li>
        <li>Using the same letter for every employer. Name the company and the role every time.</li>
        <li>Writing more than one page.</li>
        <li>Over-formal or flowery language. Clear and polite is best.</li>
        <li>Forgetting to sign or to include your contact details.</li>
      </ul>

      <InlineCta href="/builder">Build the CV to attach to your letter</InlineCta>
    </ContentPage>
  );
}
