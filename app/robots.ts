import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /builder is not blocked here: it carries a noindex tag, which crawlers must be able to read.
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
