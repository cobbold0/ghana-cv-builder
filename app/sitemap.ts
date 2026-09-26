import type { MetadataRoute } from "next";
import { EXAMPLES } from "@/lib/examples";
import { CONTENT_UPDATED } from "@/lib/seo/content";
import { absoluteUrl } from "@/lib/seo/site";

/** Indexable pages only. The builder (/builder) is noindex and excluded. */
export const INDEXABLE_PATHS = [
  "/",
  "/cv-builder",
  "/cv-templates",
  "/cv-examples",
  "/how-to-write-a-cv",
  "/cv-format",
  "/cv-template-ghana",
  "/professional-cv",
  "/graduate-cv",
  "/student-cv",
  "/internship-cv",
  "/about",
  "/privacy",
  "/terms",
  ...EXAMPLES.map((e) => `/cv-examples/${e.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXABLE_PATHS.map((path) => ({
    url: absoluteUrl(path),
    lastModified: CONTENT_UPDATED,
    priority: path === "/" ? 1 : path.startsWith("/cv-examples/") ? 0.6 : 0.8,
  }));
}
