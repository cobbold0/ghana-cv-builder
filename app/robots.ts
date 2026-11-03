import type { MetadataRoute } from "next";
import { absoluteUrl, SITE } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // /builder is not blocked here: it carries a noindex tag, which crawlers must be able to read.
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: ["Googlebot", "Bingbot", "Google-Extended", "GPTBot", "ClaudeBot", "PerplexityBot"],
        allow: "/",
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE.url,
  };
}
