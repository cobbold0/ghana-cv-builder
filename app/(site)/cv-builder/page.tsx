import Link from "next/link";
import { ContentPage } from "@/components/content/ContentPage";
import { LINKS } from "@/lib/seo/links";
import { pageMetadata } from "@/lib/seo/site";

const title = "Online CV Builder: How It Works";
const description =
  "How to use our free online CV builder: fill in guided sections, preview live, switch templates and download a PDF. No account needed — your CV stays on your device.";

export const metadata = pageMetadata({ title: "Free Online CV Builder — Create and Download a PDF CV", description, path: "/cv-builder" });

export default function Page() {
  return (
    <ContentPage
      path="/cv-builder"
      breadcrumb={[{ name: "CV builder", path: "/cv-builder" }]}
      title={title}
      description={description}
      intro={
        <p>
          The builder turns the details you type into a properly formatted CV. You don&apos;t need design skills, an account or any software — just a
          browser on your phone or computer.
        </p>
      }
      related={[LINKS.templates, LINKS.examples, LINKS.howTo, LINKS.format]}
      cta={{ title: "Try it now", text: "It's free and takes a few minutes.", href: "/builder", label: "Create my CV" }}
    >
      <h2>Using the builder, step by step</h2>
      <ol>
        <li>
          <strong>Open the builder.</strong> There&apos;s nothing to sign up for. Go straight to <Link href="/builder">Create my CV</Link>, or start from
          a <Link href="/cv-examples">CV example</Link>.
        </li>
        <li>
          <strong>Fill in each section.</strong> Personal details, summary, experience, education, skills, and optional projects, certifications,
          languages and references. Each section explains what to write.
        </li>
        <li>
          <strong>Add, reorder and remove entries.</strong> Use the arrow buttons to change the order of jobs or qualifications; the most recent
          usually goes first.
        </li>
        <li>
          <strong>Preview as you type.</strong> On a computer the preview sits next to the form. On a phone, switch between <em>Edit</em> and{" "}
          <em>Preview</em> at the bottom of the screen.
        </li>
        <li>
          <strong>Choose a template.</strong> Switch between ten designs — including single-column, two-column and timeline layouts — at any time.
        </li>
        <li>
          <strong>Download your PDF.</strong> The builder checks for missing or mistyped details first, then creates an A4 PDF on your device.
        </li>
      </ol>

      <h2>What the builder checks for you</h2>
      <ul>
        <li>Your name is filled in before you download.</li>
        <li>Email addresses, phone numbers and links look valid.</li>
        <li>End dates come after start dates.</li>
        <li>Text length stays within sensible limits for a CV.</li>
      </ul>

      <h2>Where your CV is stored</h2>
      <p>
        Your CV is saved automatically in your browser on the device you&apos;re using, and the PDF is created on that device too. It isn&apos;t
        uploaded to our servers. That means:
      </p>
      <ul>
        <li>You can close the page and continue later on the same phone or computer.</li>
        <li>
          If you clear your browser data, use a private window or switch devices, your CV won&apos;t be there. Use <em>Menu → Save backup file</em> to
          keep a copy, and <em>Open backup file</em> to load it elsewhere.
        </li>
        <li>Anyone using the same browser on the same device can open the builder and see your CV, so use <em>Start a new CV</em> on shared computers when you finish.</li>
      </ul>

      <h2>About the PDF</h2>
      <ul>
        <li>A4 size with consistent margins on every page.</li>
        <li>Real, selectable text with embedded fonts, so it looks the same everywhere.</li>
        <li>Long CVs flow onto extra pages, keeping headings with the entries that follow them.</li>
        <li>No watermark.</li>
      </ul>
      <p>
        Because page breaks are worked out when the PDF is made, the downloaded file may place a heading or entry slightly differently from the
        on-screen preview.
      </p>

      <h2>Tips for the best result</h2>
      <ul>
        <li>Write experience as short bullet points, one per line. Start each with an action word.</li>
        <li>Keep your summary to two to four sentences.</li>
        <li>Only add a photo if the job advert asks for one.</li>
        <li>Check the preview before downloading to make sure nothing important falls onto a new page on its own.</li>
      </ul>
    </ContentPage>
  );
}
