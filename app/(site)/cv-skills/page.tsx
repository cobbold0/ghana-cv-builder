import { ContentPage, InlineCta } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "What Skills to Put on a CV";
const description =
  "How to choose the right skills for your CV, the difference between hard and soft skills, examples by job type, and how to prove your skills instead of just listing them.";

export const metadata = pageMetadata({ title: "What Skills to Put on a CV — With Examples by Job", description, path: "/cv-skills" });

const EXAMPLES = [
  ["Office and administration", "Microsoft Word, Excel and Outlook; Google Workspace; records management; minute taking; scheduling"],
  ["Accounting and finance", "Bank reconciliation; financial reporting; tax returns; QuickBooks, Sage or Tally; Excel (pivot tables)"],
  ["Sales and marketing", "Social media marketing; Meta and Google Ads; Canva; customer relationship management; negotiation"],
  ["Customer service", "Complaint handling; CRM systems; mobile money support; cash handling; local languages"],
  ["IT and software", "Programming languages and frameworks you actually use; Git; databases; networking; IT support"],
  ["Engineering and trades", "AutoCAD; site supervision; electrical installation; welding; health and safety"],
  ["Health", "Patient assessment; medication administration; infection control; clinical documentation"],
  ["Teaching", "Lesson planning; classroom management; assessment; Google Classroom; subject specialisms"],
];

export default function Page() {
  return (
    <ContentPage
      path="/cv-skills"
      breadcrumb={[
        { name: "CV guides", path: "/cv-guides" },
        { name: "CV skills", path: "/cv-skills" },
      ]}
      title={title}
      description={description}
      intro={
        <p>
          A skills section helps a recruiter see at a glance whether you can do the job. The best skills sections are short, specific and match the
          job advert. Here&apos;s how to build one.
        </p>
      }
      related={[LINKS.experience, LINKS.summary, LINKS.examples, LINKS.howTo]}
      cta={CREATE_CTA}
    >
      <h2>Start with the job advert</h2>
      <p>
        Read the advert and underline every skill, tool or qualification it mentions. Those words tell you what to put first. Include the ones you
        genuinely have, using the same wording where it&apos;s accurate — many employers search CVs for those exact terms.
      </p>

      <h2>Hard skills and soft skills</h2>
      <ul>
        <li>
          <strong>Hard skills</strong> are specific and can be tested: software, languages, technical methods, licences.
        </li>
        <li>
          <strong>Soft skills</strong> describe how you work: communication, teamwork, leadership, problem-solving.
        </li>
      </ul>
      <p>
        List hard skills in your skills section. Show soft skills through your experience bullets instead: &ldquo;Trained three new staff on the
        till system&rdquo; proves teamwork and communication far better than writing &ldquo;team player&rdquo;.
      </p>

      <h2>Skill examples by job type</h2>
      <table>
        <tbody>
          {EXAMPLES.map(([job, skills]) => (
            <tr key={job}>
              <th scope="row">{job}</th>
              <td>{skills}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>How many skills?</h2>
      <p>
        Six to twelve is enough for most CVs. A long list of everything you have ever touched makes it harder to see your real strengths. If you
        have many technical skills, group them — for example &ldquo;Languages&rdquo;, &ldquo;Tools&rdquo;, &ldquo;Methods&rdquo;.
      </p>

      <h2>Should you show skill levels?</h2>
      <p>
        Only if it helps. A simple word such as &ldquo;Advanced&rdquo; or &ldquo;Intermediate&rdquo; next to key tools is useful. Avoid star ratings
        and progress bars: they are hard to read, don&apos;t mean anything precise, and some screening software can&apos;t read them. The builder lets
        you add an optional level as plain text.
      </p>

      <h2>Don&apos;t forget</h2>
      <ul>
        <li>Languages, including Ghanaian languages — list them in their own section.</li>
        <li>Driving licence class, if the job involves travel or driving.</li>
        <li>Certificates and short courses — put them under Certifications.</li>
      </ul>

      <h2>Be ready to prove it</h2>
      <p>
        Anything on your CV can come up in an interview or a practical test. If you list Excel, be ready to build a simple table with formulas. If
        you can&apos;t talk comfortably about a skill, leave it off.
      </p>

      <InlineCta href="/builder">Add your skills in the builder</InlineCta>
    </ContentPage>
  );
}
