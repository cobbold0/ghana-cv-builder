import { AdRailsLayout } from "@/components/ads/AdRailsLayout";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ThirdPartyScripts } from "@/components/layout/ThirdPartyScripts";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="py-4">
        <AdRailsLayout>{children}</AdRailsLayout>
      </main>
      <SiteFooter />
      {/* Ad script is only loaded on content pages, never in the builder. */}
      <ThirdPartyScripts ads />
    </>
  );
}
