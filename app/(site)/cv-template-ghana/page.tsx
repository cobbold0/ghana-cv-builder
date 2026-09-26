import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { ContentPage, InlineCta } from "@/components/content/ContentPage";
import { TemplateThumbnail } from "@/components/cv/TemplateThumbnail";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "CV Template for Ghana: What to Include and How to Present It";
const description =
  "A practical guide to writing a CV for jobs in Ghana: contact details, national service, referees, local languages and personal details — plus free templates.";

export const metadata = pageMetadata({ title: "CV Template Ghana — Free Templates and Local Tips", description, path: "/cv-template-ghana" });

export default function Page() {
  return (
    <ContentPage
      path="/cv-template-ghana"
      breadcrumb={[{ name: "CV template for Ghana", path: "/cv-template-ghana" }]}
      title={title}
      description={description}
      intro={
        <p>
          Most of what makes a good CV is the same everywhere. But there are a few details that come up often for job seekers in Ghana — national
          service, referees, phone numbers and which personal details to include. Here&apos;s how to handle them.
        </p>
      }
      related={[LINKS.templates, LINKS.graduate, LINKS.howTo, LINKS.examples]}
      cta={CREATE_CTA}
    >
      <h2>A recommended structure</h2>
      <div className="not-prose float-right mb-4 ml-6 hidden sm:block">
        <TemplateThumbnail templateId="classic" width={200} label="Example CV in the Classic template" />
      </div>
      <ol>
        <li>Name, phone, email, town or city, LinkedIn (optional)</li>
        <li>Professional summary</li>
        <li>Work experience (including national service)</li>
        <li>Education</li>
        <li>Skills</li>
        <li>Certifications and professional bodies</li>
        <li>Languages</li>
        <li>References</li>
      </ol>
      <p>
        Recent graduates can move education above work experience. The <Link href="/cv-templates">Graduate template</Link> does this for you.
      </p>

      <h2>Contact details</h2>
      <ul>
        <li>
          Write your phone number in international format: <em>+233 24 123 4567</em>. It is clear to local employers and works if you apply abroad.
        </li>
        <li>If you use more than one number, list the one you answer most reliably. One number is usually enough.</li>
        <li>
          Your town and region (for example <em>Tamale, Northern Region</em>) is enough. A digital address or house number is not normally needed on a
          CV.
        </li>
      </ul>

      <h2>Personal details: what to leave out</h2>
      <p>
        Older CV formats used in Ghana often include a &ldquo;Personal Data&rdquo; section with date of birth, marital status, hometown, religion,
        number of children or a photo. These details don&apos;t show whether you can do the job, and many employers don&apos;t expect them.
      </p>
      <p>
        Leave them out unless the job advert or application form asks for them. Never put your Ghana Card number, passport number or other ID numbers on
        a CV you send widely — those belong on official forms only.
      </p>

      <h2>National service</h2>
      <p>
        National service is real work experience, and for many graduates it is the most relevant job they have had. List it under Work Experience
        like any other role:
      </p>
      <ul>
        <li>
          <strong>Title:</strong> &ldquo;National Service Personnel – Accounts Assistant&rdquo; (use the role you actually did)
        </li>
        <li>
          <strong>Organisation:</strong> where you were posted
        </li>
        <li>
          <strong>Dates:</strong> start and end month
        </li>
        <li>
          <strong>Bullets:</strong> the tasks you did and anything you improved
        </li>
      </ul>

      <AdSlot />

      <h2>Education and exam results</h2>
      <p>
        List your degree, HND or diploma with the institution and years. Include your class of degree if it helps you. For senior high school,
        WASSCE is useful to include if you are a student or recent graduate, or if the job asks for it; experienced professionals usually leave it
        out to save space.
      </p>

      <h2>Professional bodies and certifications</h2>
      <p>
        If you belong to a professional body or hold a licence — for example in accounting, nursing, teaching, engineering or law — list it with your
        membership level or licence status. Be exact: write &ldquo;in progress&rdquo; or the level reached if you haven&apos;t finished.
      </p>

      <h2>Languages</h2>
      <p>
        Include Ghanaian languages as well as English and any foreign languages. Being able to speak Twi, Ga, Ewe, Dagbani, Hausa, Fante or another
        language can matter for customer-facing, field and community roles.
      </p>

      <h2>References</h2>
      <p>
        Many Ghanaian employers ask for referees. If the advert asks for two or three referees, list them with their name, position, organisation and
        phone number or email. Otherwise, &ldquo;References available on request&rdquo; is fine and saves space. Always ask your referees first and let
        them know which jobs you&apos;ve applied for.
      </p>

      <InlineCta href="/builder">Build a CV with these sections — free</InlineCta>

      <h2>Public sector and formal recruitment</h2>
      <p>
        Recruitment into public institutions and some large organisations often uses its own application forms, portals or document checklists. Where
        that is the case, follow the official instructions exactly and treat your CV as a supporting document. Requirements differ between
        organisations and change over time, so always check the current advert.
      </p>

      <h2>Applying abroad</h2>
      <p>
        If you are applying outside Ghana, the same structure works well. Remove personal details entirely, keep your phone number in +233 format, and
        check whether the country expects a one-to-two-page CV (common in the UK and Europe) or a résumé (common in the US and Canada).
      </p>
    </ContentPage>
  );
}
