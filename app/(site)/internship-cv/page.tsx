import { ContentPage, InlineCta } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "How to Write an Internship CV";
const description =
  "How to write a CV for internships and industrial attachment: show relevant courses, practical skills and projects, and make it easy for supervisors to say yes.";

export const metadata = pageMetadata({ title: "Internship CV Guide — Internships and Industrial Attachment", description, path: "/internship-cv" });

export default function Page() {
  return (
    <ContentPage
      path="/internship-cv"
      breadcrumb={[{ name: "Internship CV", path: "/internship-cv" }]}
      title={title}
      description={description}
      intro={
        <p>
          Internship and attachment places are competitive, and supervisors often choose from a pile of CVs that all look alike. A good internship CV
          shows that you already understand the basics of the field and will be useful from the first week.
        </p>
      }
      related={[{ href: "/cv-examples/internship", label: "Internship CV example", description: "An engineering student's attachment CV." }, LINKS.student, LINKS.graduate, LINKS.format]}
      cta={{ ...CREATE_CTA, title: "Create your internship CV", href: "/builder?template=graduate", label: "Start with the Graduate template" }}
    >
      <h2>Say what you want and when you&apos;re available</h2>
      <p>
        Internships and attachments usually run for fixed periods. In your summary, say what kind of placement you want and when you&apos;re free, for
        example: &ldquo;Third-year Computer Science student seeking a software development internship, available June to August.&rdquo;
      </p>

      <h2>Show relevant study</h2>
      <p>
        List your programme, year of study and expected completion. Then name the courses that relate to the organisation&apos;s work. A telecoms
        company cares about your networking course; a bank cares about accounting and economics.
      </p>

      <h2>Make projects do the work</h2>
      <p>For most students, projects are the best evidence of ability. For each project write:</p>
      <ul>
        <li>What the project was and your role in it</li>
        <li>The tools, equipment or methods you used</li>
        <li>The result — a working prototype, a report, a presentation, a grade</li>
      </ul>

      <h2>Include practical skills</h2>
      <p>
        Technical supervisors want to know what you can do with minimal supervision: software you can use, equipment you&apos;ve operated, lab
        techniques, drawing tools, programming languages. Be honest about your level.
      </p>

      <h2>Previous attachments and holiday work</h2>
      <p>
        If you&apos;ve done an attachment before, list it under Experience with specific tasks. Holiday jobs outside your field still belong on the
        CV; keep them short.
      </p>

      <h2>Safety and certificates</h2>
      <p>
        For engineering, construction, laboratory and health placements, any safety training or induction is worth listing. So are relevant online
        certificates.
      </p>

      <InlineCta href="/cv-examples/internship">See a complete internship CV example</InlineCta>

      <h2>Send it the right way</h2>
      <ul>
        <li>Follow the organisation&apos;s instructions — some use online forms, others ask for an email with an introduction letter from your school.</li>
        <li>Send a PDF and name it clearly.</li>
        <li>Write a short, polite email or cover letter that names the placement and your dates.</li>
      </ul>
    </ContentPage>
  );
}
