import { ContentPage } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "CV vs Résumé: What's the Difference?";
const description =
  "The difference between a CV and a résumé, which one employers in Ghana, the UK, Europe and North America expect, and how to adapt yours when applying abroad.";

export const metadata = pageMetadata({ title: "CV vs Résumé — What's the Difference and Which to Send", description, path: "/cv-vs-resume" });

export default function Page() {
  return (
    <ContentPage
      path="/cv-vs-resume"
      breadcrumb={[
        { name: "CV guides", path: "/cv-guides" },
        { name: "CV vs résumé", path: "/cv-vs-resume" },
      ]}
      title={title}
      description={description}
      intro={
        <p>
          The words are often used for the same thing, but they don&apos;t always mean the same thing. What you should send depends mostly on where
          the job is.
        </p>
      }
      related={[LINKS.format, LINKS.ghana, LINKS.howTo, LINKS.templates]}
      cta={CREATE_CTA}
    >
      <h2>The short answer</h2>
      <ul>
        <li>
          <strong>In Ghana, the UK, Ireland, most of Africa and Europe:</strong> &ldquo;CV&rdquo; is the normal word for the one-to-two-page document you
          send with a job application.
        </li>
        <li>
          <strong>In the United States and Canada:</strong> that document is usually called a &ldquo;résumé&rdquo;, and &ldquo;CV&rdquo; usually means a
          longer academic record.
        </li>
      </ul>

      <h2>Side by side</h2>
      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Job-application CV (Ghana, UK, Europe)</th>
            <th scope="col">US/Canada résumé</th>
            <th scope="col">Academic CV</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Typical length</th>
            <td>1–2 pages</td>
            <td>1 page (2 for senior roles)</td>
            <td>As long as needed</td>
          </tr>
          <tr>
            <th scope="row">Purpose</th>
            <td>Job applications</td>
            <td>Job applications</td>
            <td>Academic, research and some medical posts</td>
          </tr>
          <tr>
            <th scope="row">Content</th>
            <td>Focused on relevant experience and skills</td>
            <td>Very focused; heavy on achievements</td>
            <td>Full record: publications, teaching, grants, conferences</td>
          </tr>
          <tr>
            <th scope="row">Personal details</th>
            <td>Contact details only, usually</td>
            <td>Contact details only; no photo or age</td>
            <td>Contact details only</td>
          </tr>
        </tbody>
      </table>

      <h2>Which one should you send?</h2>
      <p>
        Follow the job advert&apos;s wording and the country. For most jobs in Ghana, a clear one-to-two-page CV is right. For US or Canadian jobs,
        shorten it to a one-page résumé, remove any photo, and use American spelling if the employer does. For university lecturer or research
        posts, a full academic CV is usually expected.
      </p>

      <h2>Adapting your CV to a résumé</h2>
      <ul>
        <li>Cut to the most relevant experience — ideally one page.</li>
        <li>Lead every bullet with a result.</li>
        <li>Remove photos and any personal details beyond contact information.</li>
        <li>Drop &ldquo;References available on request&rdquo; — it&apos;s assumed.</li>
      </ul>
    </ContentPage>
  );
}
