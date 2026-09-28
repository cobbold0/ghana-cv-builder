import { ContentPage } from "@/components/content/ContentPage";
import { CREATE_CTA, LINKS } from "@/lib/seo/links";
import { SITE, pageMetadata } from "@/lib/seo/site";

const description = "How Ghana CV Builder handles your information: your CV stays on your device, and what analytics and advertising may collect.";

export const metadata = pageMetadata({ title: "Privacy Policy — Ghana CV Builder", description, path: "/privacy" });

export default function Page() {
  return (
    <ContentPage
      path="/privacy"
      breadcrumb={[{ name: "Privacy", path: "/privacy" }]}
      title="Privacy policy"
      description={description}
      article={false}
      intro={<p>The short version: the CV you create stays on your device. We don&apos;t upload it, store it on our servers or share it.</p>}
      related={[LINKS.builder, LINKS.howTo]}
      cta={CREATE_CTA}
    >
      <h2>Your CV content</h2>
      <p>
        Everything you type into the CV builder — including your name, contact details, work history and any photo — is stored in your web
        browser&apos;s local storage on your device. The PDF is generated on your device. This information is not sent to our servers.
      </p>
      <p>
        Because the data is stored in your browser, anyone with access to the same browser profile can see it. You can delete it at any time using
        <em> Menu → Start a new CV</em> in the builder, or by clearing your browser&apos;s site data. Backup files you save are stored wherever you choose
        to save them.
      </p>

      <h2>Analytics</h2>
      <p>
        We may use analytics (such as Google Analytics) to understand how the site is used — for example which pages are visited, whether the builder
        is opened, which template is chosen and whether a PDF is downloaded. We do not send the content of your CV to analytics providers. Analytics
        providers may use cookies and collect technical information such as your device type, browser and approximate location.
      </p>

      <h2>Advertising</h2>
      <p>
        Guide and example pages may show advertising from third parties such as Google AdSense. Ads are not shown inside the CV builder. Ads are
        shown whether or not you accept cookies. If you accept, ads may be personalised based on your visits to this and other websites; if you choose
        “No thanks”, you see non-personalised ads. You can also manage personalised advertising in your Google account&apos;s ad settings.
      </p>

      <h2>Cookies and your choices</h2>
      <p>
        A cookie banner asks whether we may use cookies for analytics and personalised ads. Until you accept, analytics runs without cookies and
        ads are not personalised. Non-personalised ads may still use cookies for things like limiting how often an ad appears and preventing fraud,
        except in the European Economic Area, the United Kingdom and Switzerland, where no advertising cookies are used until you accept. You can
        change your choice at any time using the <em>Cookie settings</em> link at the bottom of each page, or by clearing this site&apos;s data in
        your browser.
      </p>

      <h2>Hosting</h2>
      <p>
        Like any website, our hosting provider automatically processes technical data such as IP addresses and browser information to deliver pages
        and protect the service.
      </p>

      <h2>Your rights</h2>
      <p>
        Because we don&apos;t store your CV, there is no CV data held by us to access or delete. For questions about analytics or advertising data,
        or anything in this policy, email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>Changes</h2>
      <p>We will update this page if the way we handle information changes.</p>
    </ContentPage>
  );
}
