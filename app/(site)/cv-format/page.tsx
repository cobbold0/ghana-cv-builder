import Link from "next/link";
import { ContentPage, InlineCta } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "CV Format: Layout, Length and Section Order";
const description =
  "The standard CV format explained: which sections to include, the best order for your experience level, how long a CV should be, fonts, margins and file type.";

export const metadata = pageMetadata({ title: "CV Format Guide — Layout, Length and Section Order", description, path: "/cv-format" });

export default function Page() {
  return (
    <ContentPage
      path="/cv-format"
      breadcrumb={[{ name: "CV format", path: "/cv-format" }]}
      title={title}
      description={description}
      intro={
        <p>
          There is no single official CV format, but most employers expect the same basic structure. Getting the format right makes your CV quick to
          read and easy to print. Here is what that structure looks like and how to adjust it for your situation.
        </p>
      }
      related={[LINKS.howTo, LINKS.templates, LINKS.ghana, LINKS.professional]}
      cta={{ ...CREATE_CTA, title: "Get the format right automatically", text: "Every template in the builder uses a clean, standard A4 layout." }}
    >
      <h2>The standard CV structure</h2>
      <ol>
        <li>
          <strong>Name and contact details</strong>
        </li>
        <li>
          <strong>Professional summary</strong> (2–4 sentences)
        </li>
        <li>
          <strong>Work experience</strong>, most recent first
        </li>
        <li>
          <strong>Education</strong>, most recent first
        </li>
        <li>
          <strong>Skills</strong>
        </li>
        <li>
          <strong>Optional:</strong> projects, certifications, languages, references
        </li>
      </ol>
      <p>
        This is called a <em>reverse-chronological</em> format because each list starts with the most recent item. It is the format most recruiters
        are used to, and it works for most people.
      </p>

      <h2>Which section order is best for you?</h2>
      <p>Put your strongest, most relevant section nearest the top.</p>
      <table>
        <thead>
          <tr>
            <th scope="col">Your situation</th>
            <th scope="col">Suggested order</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Student or recent graduate</td>
            <td>Summary → Education → Projects → Experience (including national service) → Skills</td>
          </tr>
          <tr>
            <td>Experienced professional</td>
            <td>Summary → Experience → Education → Certifications → Skills</td>
          </tr>
          <tr>
            <td>Technical role (IT, engineering)</td>
            <td>Summary → Experience → Projects → Skills → Education</td>
          </tr>
          <tr>
            <td>Changing career</td>
            <td>Summary → Relevant skills and training → Experience → Education</td>
          </tr>
        </tbody>
      </table>
      <p>
        The <Link href="/cv-templates">Graduate template</Link> puts education and projects first automatically; the others lead with experience.
      </p>

      <h2>How long should a CV be?</h2>
      <ul>
        <li>
          <strong>Students and recent graduates:</strong> one page is usually enough.
        </li>
        <li>
          <strong>Most professionals:</strong> one to two pages.
        </li>
        <li>
          <strong>Academic, research and some medical roles:</strong> often longer, because publications and clinical experience are listed in
          detail.
        </li>
      </ul>
      <p>
        Length matters less than relevance. A tight one-page CV beats two pages padded with duties from a job ten years ago. If you are over two
        pages, shorten older roles to one line each.
      </p>

      <h2>Layout and design</h2>
      <ul>
        <li>
          <strong>Paper size:</strong> A4 is standard in Ghana and most countries outside North America.
        </li>
        <li>
          <strong>Margins:</strong> around 1.5–2 cm on each side, so nothing is cut off when printed.
        </li>
        <li>
          <strong>Fonts:</strong> one or two clear fonts. Body text around 10–11 pt; your name larger.
        </li>
        <li>
          <strong>Headings:</strong> consistent section headings so the reader can jump to what they need.
        </li>
        <li>
          <strong>Bullet points</strong> for experience instead of long paragraphs.
        </li>
        <li>
          <strong>Colour:</strong> little or none. Your CV may be printed in black and white or photocopied.
        </li>
      </ul>
      <h3>Single-column layouts are safer</h3>
      <p>
        Many organisations use applicant tracking systems (ATS) that read the text of your CV. Simple single-column layouts with standard headings
        are generally the easiest for this software to read. Tables, text boxes and text inside images can confuse it. All templates in our builder
        use single-column layouts with real text.
      </p>

      <h2>Dates</h2>
      <p>
        Use the same format everywhere — for example &ldquo;Mar 2022 – Present&rdquo;. Month and year is enough; exact days aren&apos;t needed.
      </p>

      <h2>File format and file name</h2>
      <ul>
        <li>Send a PDF unless the employer asks for a Word document. A PDF looks the same on every phone and computer.</li>
        <li>
          Name the file with your name, for example <em>Kofi-Mensah-CV.pdf</em>, not <em>CV final (2).pdf</em>.
        </li>
        <li>Make sure the text in the PDF can be selected; scanned or photographed CVs are harder to read and search.</li>
      </ul>

      <InlineCta href="/builder">Create a correctly formatted A4 PDF CV</InlineCta>

      <h2>CV or résumé?</h2>
      <p>
        In Ghana, the UK and much of Africa and Europe, &ldquo;CV&rdquo; is the usual word for a job application document. In the United States and
        Canada, a short job application document is usually called a &ldquo;résumé&rdquo;, and &ldquo;CV&rdquo; often means a longer academic
        record. For most job applications the content is similar: a focused summary of your experience, education and skills.
      </p>
    </ContentPage>
  );
}
