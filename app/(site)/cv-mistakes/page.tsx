import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { ContentPage, InlineCta } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "Common CV Mistakes to Avoid";
const description =
  "The CV mistakes that most often cost people interviews — from wrong contact details to vague bullet points — and exactly how to fix each one.";

export const metadata = pageMetadata({ title: "15 Common CV Mistakes to Avoid (and How to Fix Them)", description, path: "/cv-mistakes" });

const MISTAKES: { heading: string; body: React.ReactNode }[] = [
  { heading: "Wrong or outdated contact details", body: "Check your phone number and email every time. An employer who can't reach you will move on." },
  { heading: "An unprofessional email address", body: "Use a simple address based on your name. Create a new free one for job applications if you need to." },
  { heading: "Spelling and grammar mistakes", body: "Read your CV aloud, then ask someone else to read it. Pay special attention to names of employers and schools." },
  {
    heading: "A generic summary",
    body: (
      <>
        &ldquo;Hardworking individual seeking a challenging position&rdquo; says nothing. Name your field, your strongest evidence and the role you want.
        See <Link href="/professional-summary">how to write a professional summary</Link>.
      </>
    ),
  },
  {
    heading: "Duties instead of achievements",
    body: (
      <>
        &ldquo;Responsible for sales&rdquo; tells the reader little. Show what changed because of you. See{" "}
        <Link href="/work-experience-on-cv">how to describe work experience</Link>.
      </>
    ),
  },
  { heading: "Sending the same CV to every job", body: "Adjust your summary, skills and the order of your bullet points to match each advert." },
  { heading: "Too long", body: "Most CVs should be one or two pages. Cut old, irrelevant detail first." },
  { heading: "Personal details that aren't needed", body: "Date of birth, marital status, religion, hometown and ID numbers are usually unnecessary. Include them only if the application asks." },
  { heading: "Decorative designs that don't print", body: "Heavy colour, graphics and multiple columns can look good on screen but print badly and confuse screening software." },
  { heading: "Unexplained abbreviations", body: "Not every reader knows every acronym. Write the full name the first time, especially for local institutions and qualifications." },
  { heading: "Inconsistent dates and formatting", body: "Use one date style throughout and check that dates don't overlap or contradict each other." },
  { heading: "Exaggerating or inventing", body: "Qualifications and past jobs are often checked. A false claim can cost you the job, even after you start." },
  { heading: "Listing referees without asking them", body: "Always ask first, and tell them which jobs you've applied for so they're ready for a call." },
  { heading: "Sending the wrong file type or name", body: "Send a PDF unless asked otherwise, named clearly, e.g. Ama-Owusu-CV.pdf." },
  { heading: "Not following the application instructions", body: "If the advert asks for a specific format, documents or subject line, follow it exactly." },
];

export default function Page() {
  return (
    <ContentPage
      path="/cv-mistakes"
      breadcrumb={[
        { name: "CV guides", path: "/cv-guides" },
        { name: "CV mistakes", path: "/cv-mistakes" },
      ]}
      title={title}
      description={description}
      intro={<p>Most CVs are rejected for simple, fixable reasons. Check yours against this list before you send it.</p>}
      related={[LINKS.howTo, LINKS.format, LINKS.experience, LINKS.summary]}
      cta={CREATE_CTA}
    >
      <ol>
        {MISTAKES.slice(0, 8).map((m) => (
          <li key={m.heading}>
            <strong>{m.heading}.</strong> {m.body}
          </li>
        ))}
      </ol>
      <AdSlot />
      <ol start={9}>
        {MISTAKES.slice(8).map((m) => (
          <li key={m.heading}>
            <strong>{m.heading}.</strong> {m.body}
          </li>
        ))}
      </ol>
      <InlineCta href="/builder">Build a clean, correctly formatted CV</InlineCta>
    </ContentPage>
  );
}
