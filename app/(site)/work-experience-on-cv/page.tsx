import { AdSlot } from "@/components/ads/AdSlot";
import { ContentPage, InlineCta } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "How to Describe Work Experience on a CV";
const description =
  "How to turn a list of duties into strong, honest achievement bullet points: a simple formula, action verbs, before-and-after examples and what to include for each job.";

export const metadata = pageMetadata({ title: "How to Describe Work Experience on Your CV (With Examples)", description, path: "/work-experience-on-cv" });

const VERBS = [
  ["Leading", "Led, supervised, coordinated, trained, mentored, managed"],
  ["Improving", "Improved, reduced, increased, simplified, introduced, streamlined"],
  ["Creating", "Built, designed, developed, set up, launched, wrote"],
  ["Helping people", "Served, advised, resolved, supported, taught, guided"],
  ["Organising", "Planned, scheduled, organised, prepared, recorded, maintained"],
  ["Money and numbers", "Budgeted, reconciled, audited, calculated, forecast, saved"],
];

export default function Page() {
  return (
    <ContentPage
      path="/work-experience-on-cv"
      breadcrumb={[
        { name: "CV guides", path: "/cv-guides" },
        { name: "Work experience", path: "/work-experience-on-cv" },
      ]}
      title={title}
      description={description}
      intro={
        <p>
          The work experience section is where most CVs win or lose. The difference is usually not the jobs themselves but how they are described.
          This guide shows how to write bullet points that prove what you can do.
        </p>
      }
      related={[LINKS.summary, LINKS.skills, LINKS.mistakes, LINKS.examples]}
      cta={CREATE_CTA}
    >
      <h2>What to include for each job</h2>
      <ul>
        <li>Job title</li>
        <li>Employer and town</li>
        <li>Start and end month and year (or &ldquo;Present&rdquo;)</li>
        <li>Three to five bullet points for recent roles; one or two for older ones</li>
      </ul>
      <p>List jobs with the most recent first. National service, internships and volunteering can go here too.</p>

      <h2>The bullet point formula</h2>
      <p>
        <strong>Action verb + what you did + result or scale.</strong>
      </p>
      <p>
        The result is what makes a bullet memorable. It can be a number (customers served, money saved, time reduced) or a clear outcome (a process
        that now works, a problem that stopped happening).
      </p>

      <h2>Before and after</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Before (duty)</th>
            <th scope="col">After (achievement)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Responsible for filing</td>
            <td>Reorganised paper and digital files for a 25-person office so documents could be found in minutes instead of hours</td>
          </tr>
          <tr>
            <td>Worked on the company app</td>
            <td>Built the payment screen of a React Native app used by about 5,000 customers</td>
          </tr>
          <tr>
            <td>In charge of sales in my area</td>
            <td>Managed 40 retail accounts in Kumasi and grew monthly orders by about 20% over a year</td>
          </tr>
          <tr>
            <td>Taught JHS pupils</td>
            <td>Taught Mathematics to three JHS classes of about 40 pupils each and ran weekly revision clinics before exams</td>
          </tr>
        </tbody>
      </table>

      <h2>Finding your numbers</h2>
      <p>You probably know more figures than you think. Ask yourself:</p>
      <ul>
        <li>How many customers, patients, students or clients did I deal with in a day or week?</li>
        <li>How big was the team, budget, area or stock I handled?</li>
        <li>What got faster, cheaper, more accurate or more reliable because of me?</li>
        <li>How often did I do it — daily, weekly, every term?</li>
      </ul>
      <p>
        Never invent a number. An honest estimate (&ldquo;about&rdquo;, &ldquo;over&rdquo;, &ldquo;up to&rdquo;) is fine; a made-up statistic can cost
        you the job when an interviewer asks about it.
      </p>

      <AdSlot />

      <h2>Action verbs to start your bullets</h2>
      <table>
        <tbody>
          {VERBS.map(([group, words]) => (
            <tr key={group}>
              <th scope="row">{group}</th>
              <td>{words}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Use past tense for past jobs (&ldquo;managed&rdquo;) and present tense for your current job (&ldquo;manage&rdquo;).</p>

      <h2>Keeping it relevant</h2>
      <ul>
        <li>Put the bullets that match the job advert first.</li>
        <li>Cut tasks that everyone in that job does, unless the employer specifically asks for them.</li>
        <li>For jobs outside your field, keep one or two bullets that show transferable skills such as customer service, reliability or leadership.</li>
      </ul>

      <h2>Gaps in your experience</h2>
      <p>
        Short gaps don&apos;t need explaining. For longer ones — studying, caring for family, looking for work, running a small business — it&apos;s
        fine to be honest in a line or in your cover letter. What matters is that you can talk about it calmly in an interview.
      </p>

      <InlineCta href="/builder">Add your experience in the builder</InlineCta>
    </ContentPage>
  );
}
