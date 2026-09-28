import { AdSlot } from "@/components/ads/AdSlot";
import { ContentPage, InlineCta } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "How to Write a Professional Summary for Your CV";
const description =
  "A simple three-part formula for writing a CV summary that gets read, with examples for students, graduates, experienced professionals and career changers.";

export const metadata = pageMetadata({ title: "How to Write a CV Professional Summary (With Examples)", description, path: "/professional-summary" });

export default function Page() {
  return (
    <ContentPage
      path="/professional-summary"
      breadcrumb={[
        { name: "CV guides", path: "/cv-guides" },
        { name: "Professional summary", path: "/professional-summary" },
      ]}
      title={title}
      description={description}
      intro={
        <p>
          The professional summary (also called a profile or personal statement) is the short paragraph under your name. Recruiters often read it
          first and use it to decide whether to keep reading. A good one takes two to four sentences.
        </p>
      }
      related={[LINKS.experience, LINKS.skills, LINKS.howTo, LINKS.examples]}
      cta={{ ...CREATE_CTA, title: "Write your summary in the builder", text: "The builder shows example summaries as you write." }}
    >
      <h2>A simple formula</h2>
      <ol>
        <li>
          <strong>Who you are:</strong> your role or field and your level of experience.
        </li>
        <li>
          <strong>Your strongest evidence:</strong> one or two skills, achievements or types of experience that match the job.
        </li>
        <li>
          <strong>What you want:</strong> the kind of role you are looking for.
        </li>
      </ol>
      <p>
        That&apos;s it. Everything in your summary should be something the rest of your CV backs up.
      </p>

      <h2>Examples by career stage</h2>
      <h3>Secondary school leaver</h3>
      <p>
        &ldquo;Recent WASSCE graduate with two years of weekend experience serving customers in a family shop. Friendly, reliable and good with
        numbers. Looking for a full-time retail or reception role.&rdquo;
      </p>
      <h3>University graduate</h3>
      <p>
        &ldquo;BSc Economics graduate with national service experience preparing budget reports for a district assembly. Confident with Excel and
        basic data analysis. Seeking an entry-level role in finance or research.&rdquo;
      </p>
      <h3>Experienced professional</h3>
      <p>
        &ldquo;Procurement officer with seven years in manufacturing, managing around 60 suppliers and annual purchases of about GH₵ 15 million.
        Known for negotiating reliable supply contracts and cutting delivery delays. Looking for a senior procurement role.&rdquo;
      </p>
      <h3>Career changer</h3>
      <p>
        &ldquo;Secondary school teacher moving into corporate training after eight years of planning lessons and presenting to large groups. Now
        completing a certificate in human resource management and looking for a learning and development role.&rdquo;
      </p>

      <AdSlot />

      <h2>What to avoid</h2>
      <ul>
        <li>
          <strong>Generic phrases</strong> such as &ldquo;hardworking and dedicated individual&rdquo; or &ldquo;seeking a challenging position in a
          reputable organisation&rdquo;. They appear on thousands of CVs and tell the reader nothing.
        </li>
        <li>
          <strong>Long paragraphs.</strong> If it runs past four lines on the page, shorten it.
        </li>
        <li>
          <strong>Claims you can&apos;t support.</strong> If you say you are an expert, the rest of the CV must show it.
        </li>
        <li>
          <strong>Writing about what you want from the employer</strong> (&ldquo;a place to grow my career&rdquo;) instead of what you offer.
        </li>
      </ul>

      <h2>First person or third person?</h2>
      <p>
        Most CV summaries leave out &ldquo;I&rdquo; entirely: &ldquo;Accountant with five years…&rdquo; rather than &ldquo;I am an accountant with
        five years…&rdquo;. Either is acceptable; just be consistent, and avoid writing about yourself by name (&ldquo;Ama is a…&rdquo;).
      </p>

      <h2>Tailor it for each application</h2>
      <p>
        Your summary is the easiest part of the CV to adjust. Change the role you name and the evidence you lead with so that they match the job
        advert. Two minutes of tailoring here makes the whole CV feel written for the job.
      </p>

      <InlineCta href="/builder">Write your summary now</InlineCta>
    </ContentPage>
  );
}
