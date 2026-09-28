/** All CV guides, used by the guides hub, the sitemap and related links. */
export interface Guide {
  href: string;
  title: string;
  description: string;
  category: "basics" | "sections" | "situations" | "applying";
}

export const GUIDE_CATEGORIES: Record<Guide["category"], string> = {
  basics: "CV basics",
  sections: "Writing each section",
  situations: "For your situation",
  applying: "Applying for jobs",
};

export const GUIDES: Guide[] = [
  { href: "/how-to-write-a-cv", title: "How to write a CV", description: "A step-by-step guide to every section, with examples.", category: "basics" },
  { href: "/cv-format", title: "CV format", description: "Layout, length, section order and file type.", category: "basics" },
  { href: "/cv-template-ghana", title: "CV template for Ghana", description: "Local details: phone numbers, national service, referees.", category: "basics" },
  { href: "/cv-mistakes", title: "CV mistakes to avoid", description: "The most common problems recruiters see, and how to fix them.", category: "basics" },
  { href: "/cv-vs-resume", title: "CV vs résumé", description: "What the difference is and which one to send.", category: "basics" },
  { href: "/professional-summary", title: "How to write a professional summary", description: "A simple formula and examples for every career stage.", category: "sections" },
  { href: "/work-experience-on-cv", title: "How to describe work experience", description: "Turn duties into achievement bullet points, with action verbs.", category: "sections" },
  { href: "/cv-skills", title: "What skills to put on a CV", description: "Choosing, grouping and proving the right skills.", category: "sections" },
  { href: "/cv-with-no-experience", title: "How to write a CV with no experience", description: "What to include when you have never had a formal job.", category: "situations" },
  { href: "/student-cv", title: "Student CV", description: "Using school, projects and volunteering to fill your CV.", category: "situations" },
  { href: "/graduate-cv", title: "Graduate CV", description: "Your degree, national service and projects as a strong first CV.", category: "situations" },
  { href: "/internship-cv", title: "Internship CV", description: "CVs for internships and industrial attachment.", category: "situations" },
  { href: "/professional-cv", title: "Professional CV", description: "Make an experienced CV look and read like a professional's.", category: "situations" },
  { href: "/application-letter", title: "How to write an application letter", description: "A clear structure and example for job application letters.", category: "applying" },
];
