import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { ContentPage, InlineCta } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "How to Write a CV: A Step-by-Step Guide";
const description =
  "Learn how to write a CV that gets read: what to include in each section, how to describe your experience, how long it should be, and the mistakes to avoid.";

export const metadata = pageMetadata({ title: `${title} (With Examples)`, description, path: "/how-to-write-a-cv" });

export default function Page() {
  return (
    <ContentPage
      path="/how-to-write-a-cv"
      breadcrumb={[{ name: "How to write a CV", path: "/how-to-write-a-cv" }]}
      title={title}
      description={description}
      intro={
        <p>
          A CV (curriculum vitae) is a short document that shows an employer what you can do and why you&apos;re worth interviewing. This guide walks
          through each section in the order most people write them, with examples you can adapt.
        </p>
      }
      related={[LINKS.format, LINKS.examples, LINKS.ghana, LINKS.graduate]}
      cta={CREATE_CTA}
    >
      <h2>Before you start: read the job advert</h2>
      <p>
        A CV works best when it answers the questions a particular employer is asking. Before writing, read the advert and note the skills,
        qualifications and experience it mentions. Those words tell you what to put first and what to leave out.
      </p>
      <p>
        Keep one full &ldquo;master&rdquo; version of your CV with everything in it, then make a shorter, focused copy for each application.
      </p>

      <h2>Step 1: Contact details</h2>
      <p>Put your name at the top in the largest text on the page, followed by:</p>
      <ul>
        <li>
          <strong>Phone number</strong> in international format, for example <em>+233 24 123 4567</em>, so it works for employers outside Ghana too.
        </li>
        <li>
          <strong>A professional email address</strong>, ideally based on your name. Avoid nicknames.
        </li>
        <li>
          <strong>Your town or city</strong>. A full house address isn&apos;t needed.
        </li>
        <li>
          <strong>LinkedIn or portfolio link</strong>, if you have one that is up to date.
        </li>
      </ul>
      <p>
        You don&apos;t need to write &ldquo;Curriculum Vitae&rdquo; as a heading. Details such as date of birth, marital status, religion, hometown or
        national ID numbers are not needed on most CVs; only add them if the application specifically asks for them.
      </p>

      <h2>Step 2: A short professional summary</h2>
      <p>
        The summary sits under your name and gives the reader a reason to keep going. In two to four sentences, say who you are, what you&apos;re good
        at, and the kind of role you want.
      </p>
      <p>
        <strong>Weak:</strong> &ldquo;A hardworking and dedicated individual seeking a challenging position in a reputable organisation.&rdquo;
      </p>
      <p>
        <strong>Better:</strong> &ldquo;Customer service officer with three years of experience in a busy bank branch, handling account enquiries and
        complaints. Known for clear communication and accurate record keeping. Looking for a customer experience role in financial services.&rdquo;
      </p>
      <p>The better version is specific: it names the experience, the setting and the goal. Anyone could write the weak version.</p>

      <h2>Step 3: Work experience</h2>
      <p>List your jobs with the most recent first. For each one include:</p>
      <ul>
        <li>Job title</li>
        <li>Employer and location</li>
        <li>Start and end dates (month and year is enough)</li>
        <li>Three to five bullet points about what you did and achieved</li>
      </ul>
      <h3>Write achievements, not just duties</h3>
      <p>
        Duties describe the job; achievements describe you. Start each bullet with an action word (managed, prepared, trained, reduced, organised) and
        add a result or a number where you honestly can.
      </p>
      <table>
        <thead>
          <tr>
            <th scope="col">Duty</th>
            <th scope="col">Achievement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Responsible for stock</td>
            <td>Kept weekly stock records for a shop with 400+ product lines and cut out-of-stock items by setting reorder levels</td>
          </tr>
          <tr>
            <td>Handled customers</td>
            <td>Served 50–70 customers a day and resolved most complaints without escalating to the manager</td>
          </tr>
          <tr>
            <td>Did social media</td>
            <td>Planned and posted weekly content, growing the page from about 800 to 3,000 followers in a year</td>
          </tr>
        </tbody>
      </table>
      <p>
        Never invent numbers. If you don&apos;t know an exact figure, use an honest estimate (&ldquo;about&rdquo;, &ldquo;over&rdquo;) or describe the
        result in words.
      </p>
      <h3>What counts as experience?</h3>
      <p>
        National service, internships, industrial attachment, part-time jobs, volunteering, family business work and leadership roles in clubs or
        associations all count, as long as you describe what you actually did.
      </p>

      <AdSlot />

      <h2>Step 4: Education</h2>
      <p>
        List your highest qualification first: institution, qualification, field of study and dates. Recent graduates can add the class of degree,
        relevant courses or a final-year project. Once you have a few years of work experience, education can move below experience and become
        shorter.
      </p>
      <p>
        Whether to include senior high school depends on your level: it is useful for students and recent graduates, and can usually be dropped once
        you have a degree and some work history.
      </p>

      <h2>Step 5: Skills</h2>
      <p>
        List skills that match the jobs you want: software, tools, technical skills and languages. Be specific. &ldquo;Microsoft Excel (pivot tables,
        VLOOKUP)&rdquo; tells an employer more than &ldquo;computer literate&rdquo;. Soft skills such as teamwork are more convincing when shown in your
        experience bullets than when listed on their own.
      </p>

      <h2>Step 6: Optional sections</h2>
      <ul>
        <li>
          <strong>Projects</strong> — very useful for students, graduates and technical roles.
        </li>
        <li>
          <strong>Certifications</strong> — professional qualifications, licences and short courses.
        </li>
        <li>
          <strong>Languages</strong> — include local languages; many roles value them.
        </li>
        <li>
          <strong>References</strong> — list referees if the advert asks for them, or write &ldquo;available on request&rdquo;. Always ask people
          before listing them.
        </li>
      </ul>

      <InlineCta href="/builder">Fill in these sections in the free CV builder</InlineCta>

      <h2>Step 7: Keep it to the right length</h2>
      <p>
        One page is usually enough for students and recent graduates. Two pages is normal for experienced professionals. Some academic, medical and
        senior roles use longer CVs. If your CV runs long, cut older and less relevant detail first. Our <Link href="/cv-format">CV format guide</Link>{" "}
        covers length and layout in more detail.
      </p>

      <h2>Step 8: Check it before you send it</h2>
      <ul>
        <li>Read it aloud to catch spelling and grammar mistakes, then ask someone else to read it too.</li>
        <li>Check dates are in order and that there are no unexplained gaps you&apos;d struggle to discuss.</li>
        <li>Make sure your phone number and email are correct — this mistake costs interviews.</li>
        <li>
          Save it as a PDF named clearly, for example <em>Ama-Owusu-CV.pdf</em>.
        </li>
        <li>Follow any application instructions exactly, including forms and required documents.</li>
      </ul>

      <h2>Common CV mistakes to avoid</h2>
      <ul>
        <li>Using the same CV for every job without adjusting the summary and skills.</li>
        <li>Long paragraphs instead of short bullet points.</li>
        <li>Listing duties with no results.</li>
        <li>Decorative designs, photos or colours that make the CV hard to read or print.</li>
        <li>Exaggerating qualifications or experience. Employers check, and it can cost you the job later.</li>
      </ul>
    </ContentPage>
  );
}
