import Link from "next/link";
import { ContentPage, InlineCta } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "How to Write a Graduate CV";
const description =
  "How to write a strong CV as a recent graduate: what to put first, how to present national service, projects and part-time work, and a clear example to follow.";

export const metadata = pageMetadata({ title: "Graduate CV Guide — How to Write Your First Real CV", description, path: "/graduate-cv" });

export default function Page() {
  return (
    <ContentPage
      path="/graduate-cv"
      breadcrumb={[{ name: "Graduate CV", path: "/graduate-cv" }]}
      title={title}
      description={description}
      intro={
        <p>
          As a new graduate you are competing with many people who have the same degree. Your CV needs to show what makes you different: what you
          studied in depth, what you&apos;ve done outside class, and what you can already do for an employer.
        </p>
      }
      related={[{ href: "/cv-examples/graduate", label: "Graduate CV example", description: "A complete example you can open and edit." }, LINKS.internship, LINKS.ghana, LINKS.howTo]}
      cta={{ ...CREATE_CTA, title: "Start your graduate CV", href: "/builder?template=graduate", label: "Use the Graduate template" }}
    >
      <h2>Lead with education — but make it specific</h2>
      <p>
        With limited work history, education is your strongest section, so put it near the top. Go beyond the degree name:
      </p>
      <ul>
        <li>Class of degree, if it helps you</li>
        <li>Three or four courses relevant to the job</li>
        <li>Your final-year project or dissertation title and what you found</li>
        <li>Awards, scholarships or leadership roles</li>
      </ul>

      <h2>Treat national service as a job</h2>
      <p>
        Your national service posting is work experience. Write the role you did, the organisation and the dates, then two to four bullets about your
        tasks and results. &ldquo;Prepared monthly payroll summaries for 60 staff&rdquo; says much more than &ldquo;worked in the accounts
        department&rdquo;.
      </p>

      <h2>Count everything that shows responsibility</h2>
      <p>These all belong on a graduate CV if you describe them properly:</p>
      <ul>
        <li>Internships and industrial attachment</li>
        <li>Part-time and holiday jobs, including family business work</li>
        <li>Student association, hall or church leadership roles</li>
        <li>Volunteering and community projects</li>
        <li>Personal projects: a website, a small business, research, a YouTube channel</li>
      </ul>
      <p>
        A job that isn&apos;t in your field still shows reliability, customer skills and time management. Keep it short and focus on the transferable
        parts.
      </p>

      <h2>Write a focused summary</h2>
      <p>
        Two or three sentences: your degree, your strongest relevant experience or skill, and the kind of role you want. Avoid generic phrases like
        &ldquo;seeking a challenging position in a reputable organisation&rdquo; — they appear on thousands of CVs.
      </p>
      <p>
        <strong>Example:</strong> &ldquo;BSc Statistics graduate with national service experience cleaning and analysing survey data. Confident with
        Excel, SPSS and basic Python. Looking for an entry-level data or research assistant role.&rdquo;
      </p>

      <h2>Skills that match the job</h2>
      <p>
        Read the job advert and list the skills it mentions that you genuinely have. Be specific about software and tools. If you&apos;ve completed an
        online course, add it under Certifications.
      </p>

      <InlineCta href="/cv-examples/graduate">See a complete graduate CV example</InlineCta>

      <h2>Keep it to one page</h2>
      <p>
        Most graduate CVs fit on one page. If yours doesn&apos;t, remove secondary school details, shorten unrelated jobs to one line, and cut
        bullets that don&apos;t relate to the jobs you&apos;re applying for. See the <Link href="/cv-format">CV format guide</Link> for more on length
        and layout.
      </p>

      <h2>Graduate CV checklist</h2>
      <ul>
        <li>Name, phone (+233 format), professional email and town at the top</li>
        <li>A specific summary naming the role you want</li>
        <li>Education with relevant courses or project</li>
        <li>National service and any other experience, with results</li>
        <li>Specific skills, not just &ldquo;hardworking&rdquo;</li>
        <li>Referees who have agreed to speak for you, or &ldquo;available on request&rdquo;</li>
        <li>Saved as a PDF with your name in the file name</li>
      </ul>
    </ContentPage>
  );
}
