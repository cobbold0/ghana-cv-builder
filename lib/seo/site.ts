import type { Metadata } from "next";

const PRODUCTION_URL = "https://ghanacv.cobbold.dev";
// Production builds default to the live domain so canonical URLs and the sitemap are always correct.
const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || (process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000");

export const SITE = {
  name: "Ghana CV Builder",
  url: rawUrl.replace(/\/+$/, ""),
  description:
    "Create a professional CV in minutes. Free online CV builder with templates, examples and practical advice for job seekers in Ghana.",
  locale: "en_GH",
  email: "augustine@cobbold.dev",
} as const;

export const absoluteUrl = (path = "/") => `${SITE.url}${path === "/" ? "" : path}`;

// Pages that set their own openGraph object don't inherit the root opengraph-image, so reference it explicitly.
const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "Ghana CV Builder — Create a professional CV in minutes" };

/** Metadata for an indexable page: unique title/description, canonical URL and Open Graph. */
export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE.name,
      type: "website",
      locale: SITE.locale,
      images: [OG_IMAGE],
    },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}
