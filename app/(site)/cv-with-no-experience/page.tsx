import { AdSlot } from "@/components/ads/AdSlot";
import { ContentPage, InlineCta } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "How to Write a CV With No Experience";
const description =
  "How to write a strong CV when you have never had a formal job: what to include instead of work experience, a recommended layout and a full example.";

export const metadata = pageMetadata({ title: "How to Write a CV With No Work Experience (With Example)", description, path: "/cv-with-no-experience" });

export default function Page() {
  return (
    <ContentPage
      path="/cv-with-no-experience"
      breadcrumb={[
        { name: "CV guides", path: "/cv-guides" },
        { name: "CV with no experience", path: "/cv-with-no-experience" },
      ]}
      title={title}
      description={description}
      intro={
        <p>
          Everyone starts somewhere. When you have no formal work history, your CV&apos;s job is to show the same qualities employers look for in
          experience — reliability, responsibility and a willingness to learn — using what you have done in school, at home and in your community.
        </p>
      }
      related={[
        { href: "/cv-examples/school-leaver", label: "School leaver CV example", description: "A complete CV with no work experience." },
        LINKS.student,
        LINKS.skills,
        LINKS.summary,
      ]}
      cta={{ ...CREATE_CTA, href: "/builder?example=school-leaver", label: "Start from the school leaver example" }}
    >
      <h2>A layout that works without experience</h2>
      <ol>
        <li>Contact details</li>
        <li>A short summary saying what you are looking for</li>
        <li>Education (most recent first)</li>
        <li>Experience — anything where you had responsibility</li>
        <li>Skills</li>
        <li>Languages and references</li>
      </ol>

      <h2>What counts as experience</h2>
      <p>You can include anything real where you had a responsibility. For example:</p>
      <ul>
        <li>Helping in a family shop, farm or business</li>
        <li>Prefect, class representative or club leader roles</li>
        <li>Church, mosque or community volunteering</li>
        <li>Tutoring or caring for younger children</li>
        <li>Selling products online or running a small side business</li>
        <li>Sports teams, choirs, drama or debate — especially if you organised something</li>
      </ul>
      <p>
        Give each one a title, where it was, dates, and one or two lines about what you did. &ldquo;Served customers and handled mobile money
        payments in my family&apos;s shop every weekend&rdquo; is real, relevant experience.
      </p>

      <h2>Make education work harder</h2>
      <ul>
        <li>List your most recent school or course with dates.</li>
        <li>Include results if they help (for example WASSCE subjects and grades for a first job).</li>
        <li>Mention subjects, projects or awards that relate to the job.</li>
      </ul>

      <AdSlot />

      <h2>Write a summary that says what you want</h2>
      <p>
        With little experience, your summary should be honest and specific: who you are, one or two strengths, and the kind of job you want.
      </p>
      <p>
        &ldquo;Recent senior high school graduate with weekend experience serving customers in a family shop. Friendly, punctual and good with
        numbers. Looking for a full-time retail or reception role.&rdquo;
      </p>

      <h2>Skills worth listing</h2>
      <ul>
        <li>Basic computer skills (Word, Excel, email)</li>
        <li>Cash and mobile money handling</li>
        <li>Languages you speak</li>
        <li>Online certificates you have completed</li>
      </ul>

      <h2>Keep it short and clean</h2>
      <p>
        One page is plenty. Use a simple template, no photo unless asked, and check spelling carefully. A short, tidy, honest CV makes a better
        impression than a long one padded with filler.
      </p>

      <InlineCta href="/cv-examples/school-leaver">See the full school leaver CV example</InlineCta>
    </ContentPage>
  );
}
