import type { RelatedLink } from "@/components/content/ContentPage";

/** Internal links reused across pages so wording stays consistent. */
export const LINKS = {
  howTo: { href: "/how-to-write-a-cv", label: "How to write a CV", description: "A step-by-step guide to every section, with examples." },
  format: { href: "/cv-format", label: "CV format", description: "Layout, length, section order and file type." },
  ghana: { href: "/cv-template-ghana", label: "CV template for Ghana", description: "Local details: phone numbers, national service, referees." },
  graduate: { href: "/graduate-cv", label: "Graduate CV guide", description: "Turn your degree, national service and projects into a strong first CV." },
  student: { href: "/student-cv", label: "Student CV guide", description: "What to write when you have little or no work experience." },
  internship: { href: "/internship-cv", label: "Internship CV guide", description: "CVs for internships and industrial attachment." },
  professional: { href: "/professional-cv", label: "Professional CV guide", description: "Make your CV look and read like a professional's." },
  templates: { href: "/cv-templates", label: "CV templates", description: "Five free, printable A4 templates." },
  examples: { href: "/cv-examples", label: "CV examples", description: "Realistic example CVs you can open and edit." },
  builder: { href: "/cv-builder", label: "How the CV builder works", description: "What you can do with the builder and how your data is kept private." },
} satisfies Record<string, RelatedLink>;

export const CREATE_CTA = {
  title: "Create your CV now",
  text: "Free, no sign-up, and your details stay on your device.",
  href: "/builder",
  label: "Start building your CV",
};
