import { cvSchema, type CV } from "@/lib/cv/schema";
import type { TemplateId } from "@/lib/templates/registry";

/**
 * Example CVs for the /cv-examples pages and "Edit this example" in the builder.
 * All people and employers are fictional; schools and public institutions are
 * named only to make the examples realistic.
 */
export interface CvExample {
  slug: string;
  title: string;
  /** Short label for cards and links. */
  label: string;
  metaTitle: string;
  metaDescription: string;
  audience: string;
  templateId: TemplateId;
  intro: string;
  whyItWorks: string[];
  tips: { heading: string; body: string }[];
  relatedGuide: { href: string; label: string };
  cv: CV;
}

const cv = (data: unknown) => cvSchema.parse(data);

export const EXAMPLES: CvExample[] = [
  {
    slug: "graduate",
    title: "Graduate CV example",
    label: "Graduate",
    metaTitle: "Graduate CV Example (Ghana) — With Tips You Can Copy",
    metaDescription:
      "A realistic graduate CV example for a recent university graduate in Ghana, with notes on what makes it work and how to adapt it for your own first job applications.",
    audience: "Recent university graduates applying for their first full-time role",
    templateId: "graduate",
    intro:
      "This example is for a recent business graduate with national service experience and part-time work, applying for entry-level finance and administration roles. It leads with education and gives national service the same weight as a job, because for most graduates it is the most relevant experience they have.",
    whyItWorks: [
      "The summary names the kind of job wanted, so a recruiter knows immediately where the CV fits.",
      "Education comes first and includes the class of degree and a relevant final-year project.",
      "National service is written like a real job, with specific tasks and results.",
      "A part-time job shows reliability and customer skills even though it is not in finance.",
      "Skills are specific (Excel functions, accounting software) rather than generic words like “hardworking”.",
    ],
    tips: [
      {
        heading: "Treat national service as work experience",
        body: "List your posting under Work Experience with your role, the organisation and the dates. Describe what you actually did — reports prepared, records managed, people served — not just the department name.",
      },
      {
        heading: "Use your final-year project",
        body: "A project shows you can plan and finish a piece of work. Add it under Projects with one or two lines on what you did and what you found.",
      },
      {
        heading: "Keep it to one or two pages",
        body: "Most graduate CVs fit on one page. Remove secondary school details if you are short of space and they add nothing new.",
      },
    ],
    relatedGuide: { href: "/graduate-cv", label: "How to write a graduate CV" },
    cv: cv({
      personal: {
        fullName: "Kwabena Asare Boateng",
        title: "Business Administration Graduate (Accounting)",
        email: "kwabena.boateng@example.com",
        phone: "+233 20 000 0001",
        location: "Kumasi, Ashanti Region",
        linkedin: "linkedin.com/in/kwabena-boateng-example",
      },
      summary:
        "BSc Business Administration (Accounting) graduate with national service experience in a district finance office. Accurate, organised and confident with Excel and accounting software. Looking for an entry-level role in accounts, audit or finance administration.",
      education: [
        {
          id: "ed1",
          institution: "Kwame Nkrumah University of Science and Technology (KNUST)",
          degree: "BSc Business Administration",
          field: "Accounting",
          location: "Kumasi",
          startDate: "2019",
          endDate: "2023",
          description:
            "Second Class Upper Division. Final-year project: an assessment of cash management practices in small retail businesses in Kumasi.",
        },
        { id: "ed2", institution: "Opoku Ware School", degree: "WASSCE", field: "Business", location: "Kumasi", startDate: "2015", endDate: "2018" },
      ],
      experience: [
        {
          id: "e1",
          position: "National Service Personnel – Finance Office",
          company: "District Assembly (example posting)",
          location: "Ashanti Region",
          startDate: "2023-11",
          endDate: "2024-10",
          highlights:
            "Recorded daily revenue collections and reconciled them with bank deposits\nPrepared monthly expenditure summaries in Excel for the finance officer\nFiled and retrieved payment vouchers, reducing search time for audits",
        },
        {
          id: "e2",
          position: "Sales Assistant (part-time)",
          company: "Asare Stationery Shop (fictional)",
          location: "Kumasi",
          startDate: "2021-06",
          endDate: "2023-05",
          highlights: "Served customers and handled cash and mobile money payments\nKept a simple stock record and flagged items running low",
        },
      ],
      skills: [
        { id: "s1", name: "Microsoft Excel (VLOOKUP, pivot tables)", level: "advanced" },
        { id: "s2", name: "QuickBooks", level: "intermediate" },
        { id: "s3", name: "Bank reconciliation" },
        { id: "s4", name: "Financial record keeping" },
        { id: "s5", name: "Customer service" },
      ],
      languages: [
        { id: "l1", name: "English", proficiency: "fluent" },
        { id: "l2", name: "Twi", proficiency: "native" },
      ],
      referencesOnRequest: true,
    }),
  },
  {
    slug: "student",
    title: "Student CV example",
    label: "Student",
    metaTitle: "Student CV Example — For Part-Time Jobs, Volunteering and Programmes",
    metaDescription:
      "A student CV example for a university student with no formal work experience, showing how to use projects, campus roles and volunteering to fill a CV.",
    audience: "University or college students with little or no work experience",
    templateId: "graduate",
    intro:
      "This example is for a second-year student applying for part-time work, campus jobs and student programmes. With no formal employment to show, it uses course projects, a student association role and volunteering to prove the same things employers look for in work experience: responsibility, teamwork and results.",
    whyItWorks: [
      "It is honest about being a student and says what kind of opportunity is wanted.",
      "Leadership in a student association is described with numbers (members, events, budget).",
      "Volunteering is listed as experience, which is appropriate when it involved real responsibility.",
      "The CV is short. One full page is better than two thin ones.",
    ],
    tips: [
      {
        heading: "Everything counts, if it's real",
        body: "Church or mosque youth roles, family business work, tutoring, sports teams and clubs are all valid experience. Describe what you did and what changed because of it.",
      },
      {
        heading: "Show you can learn",
        body: "Online courses and certificates are a good way to show initiative. Add them under Certifications.",
      },
      {
        heading: "Expected graduation date",
        body: "Put your expected completion year as the end date for your current programme so employers know when you finish.",
      },
    ],
    relatedGuide: { href: "/student-cv", label: "How to write a student CV" },
    cv: cv({
      personal: {
        fullName: "Esi Mensah",
        title: "Second-Year Communication Studies Student",
        email: "esi.mensah@example.com",
        phone: "+233 55 000 0002",
        location: "Cape Coast, Central Region",
      },
      summary:
        "Second-year Communication Studies student with experience writing for a campus newsletter and running social media for a student association. Looking for a part-time or vacation role in communications, customer service or events.",
      education: [
        {
          id: "ed1",
          institution: "University of Cape Coast",
          degree: "BA",
          field: "Communication Studies",
          location: "Cape Coast",
          startDate: "2024",
          endDate: "2028",
          description: "Current GPA 3.4. Relevant courses: Public Relations, Writing for the Media, Digital Communication.",
        },
      ],
      experience: [
        {
          id: "e1",
          position: "Public Relations Officer (volunteer)",
          company: "Departmental Students' Association",
          location: "Cape Coast",
          startDate: "2025-01",
          current: true,
          highlights:
            "Run the association's social media pages, growing followers from about 300 to over 1,000\nWrite event announcements and a monthly update for 450 members\nHelped organise a careers talk attended by 120 students",
        },
        {
          id: "e2",
          position: "Volunteer Tutor",
          company: "Community Reading Club (fictional)",
          location: "Cape Coast",
          startDate: "2024-06",
          endDate: "2024-09",
          highlights: "Supported 15 primary school pupils with reading every Saturday during the long vacation",
        },
      ],
      projects: [
        {
          id: "p1",
          name: "Campus Radio Feature on Student Housing",
          description: "Researched, scripted and co-presented a 10-minute feature for a course assignment, interviewing students and a hostel manager.",
          tools: "Audacity, interviewing",
        },
      ],
      skills: [
        { id: "s1", name: "Writing and editing" },
        { id: "s2", name: "Social media management" },
        { id: "s3", name: "Canva" },
        { id: "s4", name: "Microsoft Word and PowerPoint" },
        { id: "s5", name: "Public speaking" },
      ],
      certifications: [{ id: "c1", name: "Fundamentals of Digital Marketing", issuer: "Google Digital Garage", date: "2025-03" }],
      languages: [
        { id: "l1", name: "English", proficiency: "fluent" },
        { id: "l2", name: "Fante", proficiency: "native" },
      ],
      referencesOnRequest: true,
    }),
  },
  {
    slug: "internship",
    title: "Internship CV example",
    label: "Internship",
    metaTitle: "Internship CV Example — Industrial Attachment and Internship Applications",
    metaDescription:
      "An internship CV example for an engineering student applying for industrial attachment or internship placements, with practical tips on what to include.",
    audience: "Students applying for internships, industrial attachment or vacation placements",
    templateId: "graduate",
    intro:
      "This example is for a third-year electrical engineering student applying for an industrial attachment. Internship recruiters know you won't have much experience; they want to see what you have studied, what you can already do with your hands and tools, and that you are serious about learning.",
    whyItWorks: [
      "The summary names the placement type and the dates the student is available.",
      "Relevant courses and practical lab work are listed, because that is the student's real experience.",
      "Projects include the tools used, which helps technical supervisors judge readiness.",
      "A previous attachment is described with specific tasks, not just the company name.",
    ],
    tips: [
      {
        heading: "Say when you are available",
        body: "Internship and attachment periods are fixed. Put your available dates in your summary or cover letter so the recruiter doesn't have to ask.",
      },
      {
        heading: "Match the organisation",
        body: "If you are applying to a utility, mention power systems courses; for a telecoms company, mention networking. Reorder your skills so the most relevant come first.",
      },
      {
        heading: "Include safety training",
        body: "For technical placements, any health and safety or workshop training is worth listing under Certifications.",
      },
    ],
    relatedGuide: { href: "/internship-cv", label: "How to write an internship CV" },
    cv: cv({
      personal: {
        fullName: "Yaw Darko Ofori",
        title: "Electrical Engineering Student",
        email: "yaw.ofori@example.com",
        phone: "+233 24 000 0003",
        location: "Accra",
        linkedin: "linkedin.com/in/yaw-ofori-example",
      },
      summary:
        "Third-year Electrical and Electronic Engineering student seeking an industrial attachment in power distribution or building services, available June to September. Hands-on experience with domestic wiring, circuit testing and AutoCAD Electrical.",
      education: [
        {
          id: "ed1",
          institution: "University of Ghana",
          degree: "BSc",
          field: "Electrical and Electronic Engineering",
          location: "Legon",
          startDate: "2023",
          endDate: "2027",
          description: "Relevant courses: Circuit Theory, Electrical Machines, Power Systems I, Electrical Installation Practice.",
        },
      ],
      projects: [
        {
          id: "p1",
          name: "Solar-Powered Phone Charging Station",
          description: "Designed and built a 100 W solar charging station with a team of four for a second-year design course; sized the panel, charge controller and battery.",
          tools: "Multimeter, soldering, Proteus",
        },
        {
          id: "p2",
          name: "Hostel Wiring Survey",
          description: "Inspected socket and lighting circuits in a student hostel block and reported faults to the facilities office.",
          tools: "Insulation tester",
        },
      ],
      experience: [
        {
          id: "e1",
          position: "Industrial Attachment Student",
          company: "Ofori Electrical Contractors (fictional)",
          location: "Tema",
          startDate: "2025-06",
          endDate: "2025-08",
          highlights:
            "Assisted electricians with conduit installation and cable pulling on a residential project\nTested circuits for continuity and insulation resistance under supervision\nUpdated as-built drawings in AutoCAD",
        },
      ],
      skills: [
        { id: "s1", name: "Domestic electrical installation" },
        { id: "s2", name: "AutoCAD Electrical", level: "intermediate" },
        { id: "s3", name: "Circuit testing and fault finding" },
        { id: "s4", name: "MATLAB", level: "beginner" },
        { id: "s5", name: "Teamwork" },
      ],
      certifications: [{ id: "c1", name: "Workshop Health and Safety Induction", issuer: "University of Ghana, School of Engineering Sciences", date: "2023-09" }],
      languages: [
        { id: "l1", name: "English", proficiency: "fluent" },
        { id: "l2", name: "Twi", proficiency: "native" },
        { id: "l3", name: "Ga", proficiency: "conversational" },
      ],
      referencesOnRequest: true,
    }),
  },
  {
    slug: "software-developer",
    title: "Software developer CV example",
    label: "Software developer",
    metaTitle: "Software Developer CV Example — Junior to Mid-Level",
    metaDescription:
      "A software developer CV example with projects, tech stack and measurable achievements. Includes tips on GitHub links, skills lists and what hiring managers look for.",
    audience: "Junior and mid-level software developers",
    templateId: "modern",
    intro:
      "This example is for a developer with about three years of experience building web and mobile apps. Technical hiring managers scan for three things: what you built, what you built it with, and what difference it made. The CV answers all three for every role and project.",
    whyItWorks: [
      "Each bullet starts with an action and ends with a result, such as faster load times or fewer support tickets.",
      "Technologies are named inside the bullets, so the reader sees how each tool was used.",
      "Links to real work (GitHub, portfolio) are included in the header and projects.",
      "The skills list is grouped and limited to tools the developer can discuss in an interview.",
    ],
    tips: [
      {
        heading: "Link to work people can see",
        body: "A GitHub profile or portfolio with two or three tidy projects is worth more than a long list of languages. Make sure the links work and the repositories have a short README.",
      },
      {
        heading: "Don't list every technology",
        body: "Only include tools you could answer questions about. A shorter, honest list is more convincing.",
      },
      {
        heading: "Mention mobile money or local integrations if you've done them",
        body: "Experience with payment APIs, USSD or SMS gateways is valuable to many employers in the region.",
      },
    ],
    relatedGuide: { href: "/professional-cv", label: "How to make your CV look professional" },
    cv: cv({
      personal: {
        fullName: "Selasi Kwame Agbenyega",
        title: "Software Developer",
        email: "selasi.dev@example.com",
        phone: "+233 26 000 0004",
        location: "Accra",
        linkedin: "linkedin.com/in/selasi-example",
        website: "github.com/selasi-example",
      },
      summary:
        "Full-stack developer with three years of experience building web and mobile products with TypeScript, React and Node.js. Has shipped payment and SMS integrations used by thousands of customers. Enjoys making slow software fast and complex forms simple.",
      experience: [
        {
          id: "e1",
          position: "Software Developer",
          company: "Kente Labs (fictional)",
          location: "Accra",
          startDate: "2023-03",
          current: true,
          highlights:
            "Built a React and Node.js customer portal used by over 8,000 small businesses\nIntegrated a mobile money payment API, handling failed and duplicate payments safely\nCut the main dashboard's load time from 6 seconds to under 2 by adding caching and pagination\nMentor two junior developers and review their pull requests",
        },
        {
          id: "e2",
          position: "Junior Developer",
          company: "Sankofa Digital (fictional)",
          location: "Accra",
          startDate: "2021-09",
          endDate: "2023-02",
          highlights:
            "Developed features for a school management app in Flutter and Firebase\nWrote automated tests that caught regressions before release, reducing support tickets",
        },
      ],
      education: [
        {
          id: "ed1",
          institution: "Ashesi University",
          degree: "BSc",
          field: "Computer Science",
          location: "Berekuso",
          startDate: "2017",
          endDate: "2021",
        },
      ],
      projects: [
        {
          id: "p1",
          name: "Trotro Route Finder",
          description: "Open-source web app that suggests minibus routes between Accra neighbourhoods using community-submitted stops.",
          tools: "Next.js, PostgreSQL, Leaflet",
          url: "github.com/selasi-example/trotro",
        },
      ],
      skills: [
        { id: "s1", name: "TypeScript / JavaScript", level: "advanced" },
        { id: "s2", name: "React and Next.js", level: "advanced" },
        { id: "s3", name: "Node.js", level: "advanced" },
        { id: "s4", name: "PostgreSQL", level: "intermediate" },
        { id: "s5", name: "Flutter", level: "intermediate" },
        { id: "s6", name: "Git and CI/CD" },
      ],
      languages: [
        { id: "l1", name: "English", proficiency: "fluent" },
        { id: "l2", name: "Ewe", proficiency: "native" },
      ],
      referencesOnRequest: true,
    }),
  },
  {
    slug: "accountant",
    title: "Accountant CV example",
    label: "Accountant",
    metaTitle: "Accountant CV Example — With Professional Qualifications",
    metaDescription:
      "An accountant CV example showing how to present professional qualifications, audit and reporting experience, and accounting software skills clearly.",
    audience: "Accountants and finance officers with a few years of experience",
    templateId: "classic",
    intro:
      "This example is for an accountant with five years of experience across audit and in-house finance, part-way through a professional qualification. In finance, credibility comes from precision: exact qualifications, the size of the books managed, and deadlines met.",
    whyItWorks: [
      "Professional qualifications are listed precisely, including levels still in progress.",
      "Bullets quantify scope — number of entities audited, value of budgets managed, closing deadlines.",
      "The Classic template's conservative layout suits banks, audit firms and public institutions.",
      "Software and regulatory knowledge are listed separately from soft skills.",
    ],
    tips: [
      {
        heading: "Be exact about qualifications",
        body: "Write the full name of the qualification and the level reached, for example “ICAG — Professional level, 6 of 9 papers passed”. Never round up.",
      },
      {
        heading: "Show scale",
        body: "Mention the size of what you handled: number of clients, monthly transactions, or budget size. Numbers help employers compare you with other candidates.",
      },
      {
        heading: "Mention the standards and tools you know",
        body: "IFRS, tax filing, payroll and specific accounting software are the kind of detail finance recruiters search for.",
      },
    ],
    relatedGuide: { href: "/professional-cv", label: "How to make your CV look professional" },
    cv: cv({
      personal: {
        fullName: "Abena Ofosua Adjei",
        title: "Accountant",
        email: "abena.adjei@example.com",
        phone: "+233 24 000 0005",
        location: "Accra",
        linkedin: "linkedin.com/in/abena-adjei-example",
      },
      summary:
        "Accountant with five years of experience in external audit and in-house financial reporting. Prepares monthly management accounts and statutory returns accurately and on time. Currently completing the ICAG professional qualification.",
      experience: [
        {
          id: "e1",
          position: "Accountant",
          company: "Adinkra Foods Ltd (fictional)",
          location: "Tema",
          startDate: "2022-04",
          current: true,
          highlights:
            "Prepare monthly management accounts for a business with annual revenue of about GH₵ 40 million\nReduced month-end closing from 12 to 7 working days by standardising reconciliations\nPrepare VAT and withholding tax returns and liaise with external auditors",
        },
        {
          id: "e2",
          position: "Audit Associate",
          company: "Owusu & Partners Chartered Accountants (fictional)",
          location: "Accra",
          startDate: "2020-01",
          endDate: "2022-03",
          highlights:
            "Performed audit fieldwork on 15 clients in manufacturing, NGOs and retail\nTested controls over payroll and procurement and drafted management letter points",
        },
      ],
      education: [
        {
          id: "ed1",
          institution: "University of Professional Studies, Accra",
          degree: "BSc",
          field: "Accounting",
          location: "Accra",
          startDate: "2015",
          endDate: "2019",
        },
      ],
      certifications: [
        { id: "c1", name: "ICAG Professional Qualification — Professional level (in progress)", issuer: "Institute of Chartered Accountants, Ghana" },
      ],
      skills: [
        { id: "s1", name: "Financial reporting (IFRS)" },
        { id: "s2", name: "Management accounts" },
        { id: "s3", name: "Tax returns (VAT, PAYE, WHT)" },
        { id: "s4", name: "Sage and QuickBooks" },
        { id: "s5", name: "Microsoft Excel", level: "advanced" },
      ],
      languages: [
        { id: "l1", name: "English", proficiency: "fluent" },
        { id: "l2", name: "Twi", proficiency: "native" },
      ],
      references: [
        { id: "r1", name: "Mr. Kofi Owusu (fictional)", position: "Partner", organization: "Owusu & Partners", phone: "+233 30 000 0000" },
        { id: "r2", name: "Mrs. Efua Sam (fictional)", position: "Finance Manager", organization: "Adinkra Foods Ltd", email: "efua.sam@example.com" },
      ],
    }),
  },
  {
    slug: "teacher",
    title: "Teacher CV example",
    label: "Teacher",
    metaTitle: "Teacher CV Example — For Basic and Secondary School Teachers",
    metaDescription:
      "A teacher CV example showing how to present teaching experience, subjects, results and professional development for school applications.",
    audience: "Qualified teachers applying to public or private schools",
    templateId: "classic",
    intro:
      "This example is for a trained teacher with several years of experience in a junior high school, applying to private schools and for promotion. Schools want to know what you teach, at what level, how your learners perform and what you do beyond the classroom.",
    whyItWorks: [
      "Subjects and class levels are clear in each role.",
      "Learner results are mentioned carefully and honestly, without claiming sole credit.",
      "Co-curricular roles (clubs, sports, PTA) show commitment to the wider school.",
      "Teaching licence and professional development are listed under Certifications.",
    ],
    tips: [
      {
        heading: "Name your subjects and levels",
        body: "“Mathematics and Science, JHS 1–3” tells a head teacher far more than “Teacher”.",
      },
      {
        heading: "Show outcomes without exaggerating",
        body: "If your class's results improved, say so with real figures you can back up, and describe what you did differently.",
      },
      {
        heading: "Follow the application instructions",
        body: "Public-sector recruitment often has its own forms and document requirements. Use your CV alongside those, not instead of them.",
      },
    ],
    relatedGuide: { href: "/how-to-write-a-cv", label: "How to write a CV" },
    cv: cv({
      personal: {
        fullName: "Comfort Akosua Ansah",
        title: "Mathematics and Science Teacher",
        email: "comfort.ansah@example.com",
        phone: "+233 50 000 0006",
        location: "Ho, Volta Region",
      },
      summary:
        "Trained teacher with seven years of experience teaching Mathematics and Integrated Science at junior high school level. Uses practical, activity-based lessons to help learners understand difficult concepts, and leads the school's STEM club.",
      experience: [
        {
          id: "e1",
          position: "Mathematics and Science Teacher, JHS 1–3",
          company: "Basic school in the Ho Municipality (example)",
          location: "Ho",
          startDate: "2019-09",
          current: true,
          highlights:
            "Teach Mathematics and Integrated Science to about 120 learners each year\nIntroduced weekly low-cost practical science activities using local materials\nCoordinate the STEM club and prepared a team for the regional science quiz\nServe as form teacher and keep attendance and assessment records",
        },
        {
          id: "e2",
          position: "Teacher (Internship and Posting)",
          company: "Primary school, Volta Region (example)",
          location: "Volta Region",
          startDate: "2017-09",
          endDate: "2019-07",
          highlights: "Taught upper primary Mathematics and supported early-grade reading",
        },
      ],
      education: [
        { id: "ed1", institution: "University of Education, Winneba", degree: "B.Ed", field: "Mathematics Education", location: "Winneba", startDate: "2019", endDate: "2022", description: "Completed by distance learning while teaching." },
        { id: "ed2", institution: "College of Education, Volta Region", degree: "Diploma in Basic Education", location: "Volta Region", startDate: "2014", endDate: "2017" },
      ],
      certifications: [{ id: "c1", name: "Teacher Licence", issuer: "National Teaching Council" }],
      skills: [
        { id: "s1", name: "Lesson planning and assessment" },
        { id: "s2", name: "Classroom management" },
        { id: "s3", name: "Practical science teaching" },
        { id: "s4", name: "Microsoft Office and Google Classroom" },
      ],
      languages: [
        { id: "l1", name: "English", proficiency: "fluent" },
        { id: "l2", name: "Ewe", proficiency: "native" },
      ],
      referencesOnRequest: true,
    }),
  },
];

export function getExample(slug: string): CvExample | undefined {
  return EXAMPLES.find((e) => e.slug === slug);
}
