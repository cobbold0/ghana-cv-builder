import { ContentPage, InlineCta } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "How to Write a Student CV (Even With No Experience)";
const description =
  "A practical guide to writing a CV as a student with little or no work experience — what to include, how to describe school and volunteer activities, and a sample layout.";

export const metadata = pageMetadata({ title: "Student CV Guide — Writing a CV With No Experience", description, path: "/student-cv" });

export default function Page() {
  return (
    <ContentPage
      path="/student-cv"
      breadcrumb={[{ name: "Student CV", path: "/student-cv" }]}
      title={title}
      description={description}
      intro={
        <p>
          Everyone starts with no experience. Employers who hire students know this; they are looking for signs that you are reliable, willing to learn
          and able to work with people. You can show all three without ever having had a formal job.
        </p>
      }
      related={[{ href: "/cv-examples/student", label: "Student CV example", description: "A full example for a university student." }, LINKS.internship, LINKS.graduate, LINKS.howTo]}
      cta={{ ...CREATE_CTA, title: "Build your student CV", href: "/builder?template=graduate", label: "Start with the Graduate template" }}
    >
      <h2>What to include on a student CV</h2>
      <ol>
        <li>
          <strong>Contact details</strong> — name, phone, email, town.
        </li>
        <li>
          <strong>Summary</strong> — what you study, one strength, and what opportunity you&apos;re looking for.
        </li>
        <li>
          <strong>Education</strong> — your current programme with expected completion year, and relevant courses.
        </li>
        <li>
          <strong>Experience</strong> — anything where you had responsibility (see below).
        </li>
        <li>
          <strong>Projects</strong> — assignments, research or things you built or organised.
        </li>
        <li>
          <strong>Skills and languages</strong>
        </li>
      </ol>

      <h2>&ldquo;But I don&apos;t have any experience&rdquo;</h2>
      <p>You probably have more than you think. These all count when you describe what you did:</p>
      <ul>
        <li>Class prefect, course representative or association executive</li>
        <li>Helping in a family shop or business</li>
        <li>Tutoring younger students or siblings</li>
        <li>Church, mosque or community youth activities</li>
        <li>Sports teams and clubs, especially if you organised something</li>
        <li>Volunteering at events, clean-ups or health screenings</li>
        <li>Selling online, running a social media page, or freelance work</li>
      </ul>
      <p>
        Describe each one with an action and a result: &ldquo;Organised a fundraising football match that raised money for the hall library&rdquo;
        shows initiative and planning.
      </p>

      <h2>Use your courses and projects</h2>
      <p>
        List courses that relate to the jobs you want and describe one or two projects. A group project shows teamwork; a research paper shows you can
        collect and analyse information; a presentation shows communication skills.
      </p>

      <h2>Skills students often forget</h2>
      <ul>
        <li>Software: Word, Excel, PowerPoint, Google Docs, Canva</li>
        <li>Languages, including Ghanaian languages</li>
        <li>Online certificates from free courses</li>
        <li>Typing speed, driving licence or first aid, where relevant</li>
      </ul>

      <InlineCta href="/cv-examples/student">See a full student CV example</InlineCta>

      <h2>Keep it honest and short</h2>
      <p>
        One page is plenty. Don&apos;t exaggerate responsibilities or invent skills — interviewers will ask about them. It&apos;s better to show a
        little real experience clearly than a lot of vague claims.
      </p>
    </ContentPage>
  );
}
