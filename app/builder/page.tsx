import type { Metadata } from "next";
import { Builder } from "@/components/builder/Builder";

export const metadata: Metadata = {
  title: "CV Builder",
  description: "Create, preview and download your CV.",
  // The builder is an app screen with no unique content; keep it out of search results.
  robots: { index: false, follow: true },
  alternates: { canonical: "/builder" },
};

export default function BuilderPage() {
  return (
    <div id="main">
      <Builder />
    </div>
  );
}
