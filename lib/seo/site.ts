import type { Metadata } from "next";

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const SITE = {
  name: "Ghana CV Builder",
  url: rawUrl.replace(/\/+$/, ""),
  description:
    "Create a professional CV in minutes. Free online CV builder with templates, examples and practical advice for job seekers in Ghana.",
  locale: "en_GH",
} as const;

export const absoluteUrl = (path = "/") => `${SITE.url}${path === "/" ? "" : path}`;

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
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
