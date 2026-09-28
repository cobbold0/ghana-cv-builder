import { cvSchema } from "@/lib/cv/schema";
import type { CvExample } from "./index";

// All people and employers are fictional; schools and public institutions are
// named only to make the examples realistic.
const cv = (data: unknown) => cvSchema.parse(data);

export const MORE_EXAMPLES: CvExample[] = [
  {
    slug: "school-leaver",
    category: "students",
    title: "School leaver CV example (no experience)",
    label: "School leaver",
    metaTitle: "CV Example With No Work Experience — School Leaver (WASSCE)",
    metaDescription:
      "A CV example for a senior high school leaver with no work experience, showing how to use school results, responsibilities and volunteering to get a first job.",
    audience: "Senior high school leavers and anyone applying for a first job with no work history",
    templateId: "minimal",
    intro:
      "This example is for a recent WASSCE candidate looking for a first job in retail or customer service while waiting to continue education. There is no employment history, so the CV leans on what the writer has actually done: a school leadership role, helping in a family business, and church volunteering.",
    whyItWorks: [
      "The summary is honest about being a school leaver and says exactly what kind of job is wanted.",
      "Helping in a family shop is described as real work, with specific tasks.",
      "A prefect role shows responsibility and reliability without exaggeration.",
      "It is short. Half a page of real content is better than a page of filler.",
    ],
    tips: [
      {
        heading: "Use what you have actually done",
        body: "School roles, family business work, church or community volunteering and sports all show that you can be trusted with responsibility. Describe what you did, not just the title.",
      },
      {
        heading: "Include your results if they help",
        body: "For a first job, your WASSCE subjects and results can show you are capable. Leave them out once you have work experience to show instead.",
      },
      {
        heading: "Keep it simple",
        body: "A clean, one-page CV with no photo and no decoration is best. Employers hiring school leavers care most about reliability, attitude and communication.",
      },
    ],
    relatedGuide: { href: "/cv-with-no-experience", label: "How to write a CV with no experience" },
    cv: cv({
      personal: { fullName: "Adjoa Pokuaa Asante", title: "School Leaver", email: "adjoa.asante@example.com", phone: "+233 24 000 0101", location: "Koforidua, Eastern Region" },
      summary:
        "Recent senior high school graduate with experience serving customers in my family's provisions shop. Friendly, punctual and good with numbers. Looking for a full-time role in retail, customer service or reception.",
      education: [
        {
          id: "ed1",
          institution: "Senior High School, Koforidua (example)",
          degree: "WASSCE",
          field: "General Arts",
          location: "Koforidua",
          startDate: "2022",
          endDate: "2025",
          description: "Credits in English Language, Core Mathematics, Economics and Government.",
        },
      ],
      experience: [
        {
          id: "e1",
          position: "Shop Assistant (family business)",
          company: "Asante Provisions (fictional)",
          location: "Koforidua",
          startDate: "2021",
          current: true,
          highlights:
            "Serve customers and handle cash and mobile money payments on weekends and holidays\nKeep a daily record of sales in an exercise book and later in a spreadsheet\nArrange stock and tell my parents when popular items are running low",
        },
        {
          id: "e2",
          position: "Dining Hall Prefect",
          company: "Senior High School (example)",
          location: "Koforidua",
          startDate: "2024-01",
          endDate: "2025-06",
          highlights: "Supervised serving for about 400 students at meal times with a team of six",
        },
        {
          id: "e3",
          position: "Volunteer, Children's Service",
          company: "Local church (example)",
          location: "Koforidua",
          startDate: "2023",
          current: true,
          highlights: "Help teach and look after a class of 20 children aged 6–10 every Sunday",
        },
      ],
      skills: [
        { id: "s1", name: "Customer service" },
        { id: "s2", name: "Cash and mobile money handling" },
        { id: "s3", name: "Microsoft Word and Excel (basic)" },
        { id: "s4", name: "Teamwork" },
      ],
      languages: [
        { id: "l1", name: "English", proficiency: "fluent" },
        { id: "l2", name: "Twi", proficiency: "native" },
      ],
      referencesOnRequest: true,
    }),
  },
  {
    slug: "nurse",
    category: "health-education",
    title: "Nurse CV example",
    label: "Nurse",
    metaTitle: "Nurse CV Example — Registered General Nurse",
    metaDescription:
      "A nurse CV example for a registered general nurse, showing how to present clinical experience, wards, licences and professional development clearly.",
    audience: "Registered nurses and midwives applying to hospitals, clinics and NGOs",
    templateId: "classic",
    intro:
      "This example is for a registered general nurse with four years of experience across medical and emergency wards. Health employers look for three things quickly: that you are licensed, where you have worked clinically, and what you can be trusted with. The CV puts all three near the top.",
    whyItWorks: [
      "The licence and registration status appear under Certifications where a recruiter expects them.",
      "Each role names the ward or unit and the kind of patients cared for.",
      "Bullets describe clinical responsibilities and improvements without breaching patient confidentiality.",
      "Training such as Basic Life Support is listed with dates, which matters for renewals.",
    ],
    tips: [
      {
        heading: "Be specific about clinical settings",
        body: "Name the ward or unit (e.g. emergency, paediatrics, maternity), the typical patient load and any specialist equipment or procedures you are competent in.",
      },
      {
        heading: "Keep licences current and exact",
        body: "List your registration with the relevant council and its status. If a licence is in renewal, say so. Never list a qualification you do not yet hold.",
      },
      {
        heading: "Never include patient details",
        body: "Describe your work in general terms. Do not name patients or share anything that could identify them.",
      },
    ],
    relatedGuide: { href: "/work-experience-on-cv", label: "How to describe work experience on a CV" },
    cv: cv({
      personal: { fullName: "Priscilla Enyonam Kpodo", title: "Registered General Nurse", email: "priscilla.kpodo@example.com", phone: "+233 20 000 0102", location: "Accra" },
      summary:
        "Registered general nurse with four years of experience in medical and emergency care in a busy regional hospital. Calm under pressure, careful with medication and documentation, and experienced in mentoring student nurses.",
      experience: [
        {
          id: "e1",
          position: "Staff Nurse, Emergency Unit",
          company: "Regional hospital (example)",
          location: "Accra",
          startDate: "2023-03",
          current: true,
          highlights:
            "Triage and care for adult emergency patients on rotating shifts in a 20-bed unit\nAdminister medication and monitor vital signs, escalating deteriorating patients promptly\nMentor nursing students on clinical placement and assess their practical skills\nHelped introduce a shift handover checklist that reduced missed follow-ups",
        },
        {
          id: "e2",
          position: "Staff Nurse, Medical Ward",
          company: "District hospital (example)",
          location: "Eastern Region",
          startDate: "2021-10",
          endDate: "2023-02",
          highlights: "Cared for adult medical patients, including patients with diabetes and hypertension\nEducated patients and families on medication and follow-up care before discharge",
        },
      ],
      education: [
        { id: "ed1", institution: "Nursing and Midwifery Training College (example)", degree: "Diploma in Registered General Nursing", location: "Ghana", startDate: "2017", endDate: "2020" },
      ],
      certifications: [
        { id: "c1", name: "Registered General Nurse — licensed", issuer: "Nursing and Midwifery Council of Ghana" },
        { id: "c2", name: "Basic Life Support (BLS)", issuer: "Accredited training provider (example)", date: "2025-02" },
      ],
      skills: [
        { id: "s1", name: "Triage" },
        { id: "s2", name: "Medication administration" },
        { id: "s3", name: "Wound care" },
        { id: "s4", name: "Patient education" },
        { id: "s5", name: "Clinical documentation" },
      ],
      languages: [
        { id: "l1", name: "English", proficiency: "fluent" },
        { id: "l2", name: "Ewe", proficiency: "native" },
        { id: "l3", name: "Twi", proficiency: "conversational" },
      ],
      referencesOnRequest: true,
    }),
  },
  {
    slug: "customer-service",
    category: "business",
    title: "Customer service CV example",
    label: "Customer service",
    metaTitle: "Customer Service CV Example — Call Centre and Front Desk",
    metaDescription:
      "A customer service CV example with measurable results, showing how to present call centre, front desk and complaint-handling experience.",
    audience: "Customer service officers, call centre agents and front desk staff",
    templateId: "modern",
    intro:
      "This example is for a customer service officer with three years in a telecom call centre, moving into a bank or retail customer experience role. Customer service CVs work best when they show volume, quality and problem-solving with real numbers.",
    whyItWorks: [
      "Numbers show the scale of the work: calls per day, satisfaction scores, resolution rates.",
      "It shows progression from agent to team support, which signals trust.",
      "Systems and languages are listed because they matter in customer-facing roles.",
    ],
    tips: [
      {
        heading: "Use the numbers your team already tracks",
        body: "Call volumes, first-contact resolution, customer satisfaction and quality scores are usually measured. Use your real figures, or honest approximations.",
      },
      {
        heading: "Show how you handle difficult situations",
        body: "One bullet about resolving complaints or escalations tells an employer more than listing “good communication skills”.",
      },
      {
        heading: "Mention languages",
        body: "Speaking several local languages is a genuine advantage for customer-facing jobs. List each one.",
      },
    ],
    relatedGuide: { href: "/work-experience-on-cv", label: "How to describe work experience on a CV" },
    cv: cv({
      personal: { fullName: "Emmanuel Kojo Quaye", title: "Customer Service Officer", email: "kojo.quaye@example.com", phone: "+233 55 000 0103", location: "Tema", linkedin: "linkedin.com/in/kojo-quaye-example" },
      summary:
        "Customer service officer with three years of experience handling phone, chat and walk-in customers for a mobile network. Consistently above target on customer satisfaction and known for calmly resolving complaints. Looking for a customer experience role in banking or retail.",
      experience: [
        {
          id: "e1",
          position: "Senior Customer Service Agent",
          company: "Nkabom Telecom (fictional)",
          location: "Accra",
          startDate: "2024-04",
          current: true,
          highlights:
            "Handle 60–80 customer calls and chats a day on billing, data and mobile money issues\nMaintain a customer satisfaction score above 90% for four consecutive quarters\nSupport a team of 12 agents with escalated complaints and coach new starters\nWrote simple answer guides for common issues, now used across the team",
        },
        {
          id: "e2",
          position: "Customer Service Agent",
          company: "Nkabom Telecom (fictional)",
          location: "Accra",
          startDate: "2023-01",
          endDate: "2024-03",
          highlights: "Resolved account and SIM registration queries by phone and in the service centre",
        },
      ],
      education: [{ id: "ed1", institution: "Accra Technical University", degree: "HND", field: "Marketing", location: "Accra", startDate: "2019", endDate: "2022" }],
      skills: [
        { id: "s1", name: "Complaint handling" },
        { id: "s2", name: "CRM systems" },
        { id: "s3", name: "Mobile money support" },
        { id: "s4", name: "Microsoft Excel" },
        { id: "s5", name: "Coaching new staff" },
      ],
      languages: [
        { id: "l1", name: "English", proficiency: "fluent" },
        { id: "l2", name: "Ga", proficiency: "native" },
        { id: "l3", name: "Twi", proficiency: "fluent" },
        { id: "l4", name: "Ewe", proficiency: "conversational" },
      ],
      referencesOnRequest: true,
    }),
  },
  {
    slug: "marketing-officer",
    category: "business",
    title: "Marketing officer CV example",
    label: "Marketing officer",
    metaTitle: "Marketing CV Example — Digital and Brand Marketing Officer",
    metaDescription:
      "A marketing CV example showing campaigns, digital results and tools. Learn how to present marketing achievements with honest, measurable results.",
    audience: "Marketing, digital marketing and communications officers",
    templateId: "modern",
    intro:
      "This example is for a marketing officer with four years of experience across brand and digital marketing for a consumer goods company. Marketing CVs are judged on results, so every role shows what the campaigns achieved and which tools were used.",
    whyItWorks: [
      "Results are specific: reach, engagement, leads and sales where they can be attributed.",
      "It separates campaign strategy from execution, showing both.",
      "Tools are named so a hiring manager can match them to their own stack.",
      "A link to a portfolio lets the reader see the actual work.",
    ],
    tips: [
      {
        heading: "Only claim results you can explain",
        body: "Marketing results are often shared by a team. Say what your part was, and be ready to explain how the figure was measured.",
      },
      {
        heading: "Show a portfolio",
        body: "A simple online folder or website with campaign examples makes your CV much more convincing. Remove anything confidential.",
      },
    ],
    relatedGuide: { href: "/professional-summary", label: "How to write a professional summary" },
    cv: cv({
      personal: { fullName: "Nana Ama Boakye", title: "Marketing Officer", email: "nana.boakye@example.com", phone: "+233 24 000 0104", location: "Accra", website: "nanaboakye-portfolio.example.com" },
      summary:
        "Marketing officer with four years of experience planning and running brand and digital campaigns for fast-moving consumer goods. Strong at turning customer insight into clear campaigns and measuring what works. Comfortable managing agencies, budgets and social media communities.",
      experience: [
        {
          id: "e1",
          position: "Marketing Officer",
          company: "Sankofa Foods (fictional)",
          location: "Accra",
          startDate: "2023-02",
          current: true,
          highlights:
            "Plan and run quarterly campaigns for three product lines with a combined budget of about GH₵ 600,000\nGrew Instagram and TikTok followers from 15,000 to 60,000 in 18 months through regular video content\nLaunched a retailer promotion in Kumasi and Takoradi that lifted distributor orders during the campaign period\nBrief and manage creative and media agencies and report results monthly to management",
        },
        {
          id: "e2",
          position: "Marketing Assistant",
          company: "Kasa Communications (fictional)",
          location: "Accra",
          startDate: "2021-06",
          endDate: "2023-01",
          highlights: "Scheduled social media content for five client brands and prepared monthly performance reports",
        },
      ],
      education: [{ id: "ed1", institution: "University of Ghana Business School", degree: "BSc Administration", field: "Marketing", location: "Legon", startDate: "2016", endDate: "2020" }],
      certifications: [{ id: "c1", name: "Google Ads Search Certification", issuer: "Google Skillshop", date: "2024-05" }],
      skills: [
        { id: "s1", name: "Campaign planning" },
        { id: "s2", name: "Social media marketing" },
        { id: "s3", name: "Meta Ads and Google Ads" },
        { id: "s4", name: "Canva and CapCut" },
        { id: "s5", name: "Google Analytics" },
        { id: "s6", name: "Budget management" },
      ],
      languages: [
        { id: "l1", name: "English", proficiency: "fluent" },
        { id: "l2", name: "Twi", proficiency: "native" },
      ],
      referencesOnRequest: true,
    }),
  },
  {
    slug: "bank-teller",
    category: "business",
    title: "Bank teller CV example",
    label: "Bank teller",
    metaTitle: "Bank Teller CV Example — Banking and Cash Operations",
    metaDescription:
      "A bank teller CV example showing accurate cash handling, customer service and compliance. Tips on what banks look for in teller and customer service applicants.",
    audience: "Bank tellers, cashiers and banking operations staff",
    templateId: "classic",
    intro:
      "This example is for a bank teller with three years of experience in a busy branch, applying for a senior teller or customer service role. Banks look for accuracy, honesty and good customer service, so the CV highlights balancing records, compliance and customer handling.",
    whyItWorks: [
      "Accuracy is shown with facts: daily cash volumes and balanced tills.",
      "Compliance awareness (know-your-customer checks, anti-money-laundering training) is mentioned because banks require it.",
      "The layout is conservative and easy to scan, which suits financial institutions.",
    ],
    tips: [
      {
        heading: "Show that you are careful",
        body: "Mention accuracy measures such as balanced tills, audit results or low error rates — but only if you can back them up.",
      },
      {
        heading: "Mention regulation and procedures",
        body: "Know-your-customer checks, fraud awareness and anti-money-laundering training are all worth listing for banking roles.",
      },
    ],
    relatedGuide: { href: "/cv-skills", label: "What skills to put on a CV" },
    cv: cv({
      personal: { fullName: "Samuel Kwaku Owusu-Ansah", title: "Bank Teller", email: "samuel.owusuansah@example.com", phone: "+233 20 000 0105", location: "Kumasi" },
      summary:
        "Bank teller with three years of experience handling cash and customer transactions in a busy city branch. Accurate, trustworthy and calm with customers. Looking to grow into a senior teller or customer service officer role.",
      experience: [
        {
          id: "e1",
          position: "Teller",
          company: "Adwenpa Savings and Loans (fictional)",
          location: "Kumasi",
          startDate: "2023-01",
          current: true,
          highlights:
            "Process cash deposits, withdrawals and transfers for 100+ customers a day\nBalance the till at close of business with no unresolved differences in the last 12 months\nCarry out know-your-customer checks and flag unusual transactions to the branch manager\nHelp customers open accounts and sign up for mobile banking",
        },
        {
          id: "e2",
          position: "National Service Personnel – Customer Service",
          company: "Commercial bank branch (example posting)",
          location: "Kumasi",
          startDate: "2021-11",
          endDate: "2022-10",
          highlights: "Answered customer enquiries, updated account records and supported the tellers during busy periods",
        },
      ],
      education: [{ id: "ed1", institution: "Kwame Nkrumah University of Science and Technology (KNUST)", degree: "BSc", field: "Banking and Finance", location: "Kumasi", startDate: "2017", endDate: "2021" }],
      certifications: [{ id: "c1", name: "Anti-Money Laundering Awareness", issuer: "Employer training (example)", date: "2024-03" }],
      skills: [
        { id: "s1", name: "Cash handling" },
        { id: "s2", name: "Core banking software" },
        { id: "s3", name: "Know-your-customer checks" },
        { id: "s4", name: "Customer service" },
        { id: "s5", name: "Microsoft Excel" },
      ],
      languages: [
        { id: "l1", name: "English", proficiency: "fluent" },
        { id: "l2", name: "Twi", proficiency: "native" },
      ],
      referencesOnRequest: true,
    }),
  },
  {
    slug: "administrative-assistant",
    category: "business",
    title: "Administrative assistant CV example",
    label: "Administrative assistant",
    metaTitle: "Administrative Assistant CV Example — Office and Secretary Roles",
    metaDescription:
      "An administrative assistant CV example showing how to present office management, scheduling and organisational skills with concrete examples.",
    audience: "Administrative assistants, secretaries, receptionists and office managers",
    templateId: "minimal",
    intro:
      "This example is for an administrative assistant with five years of experience in an NGO office. Administrative work is often invisible, so the CV makes it visible: how many people were supported, which systems were run, and what was improved.",
    whyItWorks: [
      "It shows scope — number of staff supported, events organised, records managed.",
      "Improvements (a new filing system, a shared calendar) prove initiative.",
      "Software skills are specific, which matters for office roles.",
    ],
    tips: [
      {
        heading: "Make the invisible visible",
        body: "Describe what would go wrong without you: meetings missed, supplies running out, documents lost. Then say how you prevented it.",
      },
      {
        heading: "List the tools you use every day",
        body: "Microsoft Office, Google Workspace, accounting or HR systems, and any typing speed you can prove are all worth listing.",
      },
    ],
    relatedGuide: { href: "/cv-skills", label: "What skills to put on a CV" },
    cv: cv({
      personal: { fullName: "Gifty Afua Mensah", title: "Administrative Assistant", email: "gifty.mensah@example.com", phone: "+233 24 000 0106", location: "Tamale, Northern Region" },
      summary:
        "Organised administrative assistant with five years of experience supporting a busy NGO office of 25 staff. Manages calendars, travel, procurement records and events so that programme staff can focus on their work.",
      experience: [
        {
          id: "e1",
          position: "Administrative Assistant",
          company: "Northern Development Trust (fictional NGO)",
          location: "Tamale",
          startDate: "2021-03",
          current: true,
          highlights:
            "Manage the director's calendar, correspondence and travel bookings\nKeep procurement records and petty cash for an office of 25 staff\nOrganise workshops and community meetings for up to 150 participants\nSet up a shared digital filing system that made donor reports quicker to prepare",
        },
        {
          id: "e2",
          position: "Receptionist",
          company: "Savanna Guest House (fictional)",
          location: "Tamale",
          startDate: "2019-06",
          endDate: "2021-02",
          highlights: "Managed bookings, welcomed guests and handled payments and daily cash reports",
        },
      ],
      education: [{ id: "ed1", institution: "Tamale Technical University", degree: "HND", field: "Secretaryship and Management Studies", location: "Tamale", startDate: "2016", endDate: "2019" }],
      skills: [
        { id: "s1", name: "Microsoft Word, Excel and Outlook", level: "advanced" },
        { id: "s2", name: "Google Workspace" },
        { id: "s3", name: "Event and meeting organisation" },
        { id: "s4", name: "Records management" },
        { id: "s5", name: "Petty cash and procurement" },
      ],
      languages: [
        { id: "l1", name: "English", proficiency: "fluent" },
        { id: "l2", name: "Dagbani", proficiency: "native" },
        { id: "l3", name: "Hausa", proficiency: "conversational" },
      ],
      referencesOnRequest: true,
    }),
  },
  {
    slug: "civil-engineer",
    category: "technical",
    title: "Civil engineer CV example",
    label: "Civil engineer",
    metaTitle: "Civil Engineer CV Example — Site and Structural Engineering",
    metaDescription:
      "A civil engineer CV example with projects, site responsibilities, software and professional registration. Tips for engineers applying to contractors and consultancies.",
    audience: "Civil and site engineers, including graduate engineers",
    templateId: "professional",
    intro:
      "This example is for a civil engineer with six years of experience on road and building projects. Engineering employers want to know which projects you worked on, what you were responsible for, and which tools and standards you know.",
    whyItWorks: [
      "Each role names project types, values or sizes where appropriate, and the engineer's responsibilities.",
      "Safety and quality responsibilities are included, which contractors look for.",
      "Software and professional registration are clearly listed.",
    ],
    tips: [
      {
        heading: "Lead with projects",
        body: "Mention project type, size and your role. For senior engineers, a short list of major projects can be more useful than long job descriptions.",
      },
      {
        heading: "Be exact about registration",
        body: "If you are a member or working towards membership of a professional engineering body, say which grade. Don't round up.",
      },
    ],
    relatedGuide: { href: "/professional-cv", label: "How to make your CV look professional" },
    cv: cv({
      personal: { fullName: "Kwame Nyarko Addo", title: "Civil Engineer", email: "kwame.addo@example.com", phone: "+233 24 000 0107", location: "Kumasi", linkedin: "linkedin.com/in/kwame-addo-example" },
      summary:
        "Civil engineer with six years of site and design experience on roads, drainage and multi-storey buildings. Experienced in supervising contractors, checking quantities and keeping projects safe and on schedule.",
      experience: [
        {
          id: "e1",
          position: "Site Engineer",
          company: "Asafo Construction Ltd (fictional)",
          location: "Kumasi",
          startDate: "2022-01",
          current: true,
          highlights:
            "Supervise daily site work on a 12 km urban road and drainage project\nCheck setting out, levels and concrete works against drawings and specifications\nPrepare weekly progress reports and measure quantities for monthly valuations\nRun toolbox talks and enforce safety rules for crews of up to 80 workers",
        },
        {
          id: "e2",
          position: "Graduate Engineer",
          company: "Obuasi Consult (fictional)",
          location: "Kumasi",
          startDate: "2019-09",
          endDate: "2021-12",
          highlights: "Produced structural drawings and calculations for two- to four-storey buildings\nAssisted with site inspections and snag lists at project handover",
        },
      ],
      education: [{ id: "ed1", institution: "Kwame Nkrumah University of Science and Technology (KNUST)", degree: "BSc", field: "Civil Engineering", location: "Kumasi", startDate: "2014", endDate: "2018" }],
      certifications: [{ id: "c1", name: "Professional engineering body — Graduate member (example)", issuer: "Professional engineering institution" }],
      skills: [
        { id: "s1", name: "AutoCAD", level: "advanced" },
        { id: "s2", name: "Civil 3D" },
        { id: "s3", name: "Quantity measurement" },
        { id: "s4", name: "Site supervision" },
        { id: "s5", name: "Health and safety" },
      ],
      languages: [
        { id: "l1", name: "English", proficiency: "fluent" },
        { id: "l2", name: "Twi", proficiency: "native" },
      ],
      referencesOnRequest: true,
    }),
  },
  {
    slug: "driver",
    category: "technical",
    title: "Driver CV example",
    label: "Driver",
    metaTitle: "Driver CV Example — Company and Delivery Driver",
    metaDescription:
      "A driver CV example showing licence class, safety record, routes and vehicle care. A short, clear CV for company, delivery and dispatch drivers.",
    audience: "Company, delivery and heavy goods drivers",
    templateId: "classic",
    intro:
      "This example is for an experienced company driver applying to NGOs, companies and logistics firms. For drivers, the most important details are the licence class, years of accident-free driving, the vehicles and routes you know, and how you look after a vehicle.",
    whyItWorks: [
      "The licence class and driving record appear right at the top in the summary.",
      "It names vehicle types and regions, so employers can match them to their needs.",
      "Vehicle care and logbooks are mentioned, which shows responsibility.",
    ],
    tips: [
      {
        heading: "Put your licence first",
        body: "State your licence class and how long you have held it. Employers often screen on this before anything else.",
      },
      {
        heading: "Show your safety record honestly",
        body: "Years of accident-free driving and any defensive driving training are strong points. Only claim what is true.",
      },
    ],
    relatedGuide: { href: "/cv-mistakes", label: "CV mistakes to avoid" },
    cv: cv({
      personal: { fullName: "Yakubu Abdul-Rahman", title: "Company Driver", phone: "+233 24 000 0108", location: "Accra" },
      summary:
        "Company driver with nine years of accident-free driving of saloon cars, 4x4s and minibuses across all regions of Ghana. Holder of a Class D licence. Punctual, discreet and careful with vehicle maintenance and trip records.",
      experience: [
        {
          id: "e1",
          position: "Driver",
          company: "International NGO office, Accra (example)",
          location: "Accra",
          startDate: "2019-02",
          current: true,
          highlights:
            "Drive staff and visitors within Accra and on field trips to the Northern and Volta regions\nKeep daily logbooks for mileage, fuel and trips\nCarry out daily vehicle checks and arrange servicing on schedule\nRecognised by management for safe driving and punctuality",
        },
        {
          id: "e2",
          position: "Delivery Driver",
          company: "Obaapa Distributors (fictional)",
          location: "Accra",
          startDate: "2016-05",
          endDate: "2019-01",
          highlights: "Delivered goods to shops across Greater Accra and collected payments and signed delivery notes",
        },
      ],
      certifications: [
        { id: "c1", name: "Driving Licence — Class D", issuer: "Driver and Vehicle Licensing Authority (DVLA)" },
        { id: "c2", name: "Defensive Driving Training", issuer: "Training provider (example)", date: "2023-08" },
      ],
      education: [{ id: "ed1", institution: "Junior High School (example)", degree: "BECE", location: "Accra", endDate: "2008" }],
      skills: [
        { id: "s1", name: "Defensive driving" },
        { id: "s2", name: "Basic vehicle maintenance" },
        { id: "s3", name: "Route planning" },
        { id: "s4", name: "Logbook and fuel records" },
      ],
      languages: [
        { id: "l1", name: "English", proficiency: "conversational" },
        { id: "l2", name: "Hausa", proficiency: "native" },
        { id: "l3", name: "Twi", proficiency: "fluent" },
        { id: "l4", name: "Ga", proficiency: "conversational" },
      ],
      referencesOnRequest: true,
    }),
  },
  {
    slug: "security-officer",
    category: "technical",
    title: "Security officer CV example",
    label: "Security officer",
    metaTitle: "Security Officer CV Example — Guards and Supervisors",
    metaDescription:
      "A security officer CV example showing patrol duties, incident reporting, access control and training. Clear tips for security guards and supervisors.",
    audience: "Security guards, officers and supervisors",
    templateId: "modern",
    intro:
      "This example is for a security officer with seven years of experience, now supervising a small team. Security employers look for reliability, alertness, clear reporting and relevant training, so the CV shows each of these directly.",
    whyItWorks: [
      "Duties are specific: access control, patrols, CCTV monitoring and incident reports.",
      "Supervision experience is shown with team size and shift patterns.",
      "Training certificates are listed, which many employers require.",
    ],
    tips: [
      {
        heading: "Show that you report clearly",
        body: "Incident reports and handover logs are a big part of security work. Mention them — good reporting sets strong candidates apart.",
      },
      {
        heading: "List your training",
        body: "First aid, fire safety and any security training should be listed with dates.",
      },
    ],
    relatedGuide: { href: "/work-experience-on-cv", label: "How to describe work experience on a CV" },
    cv: cv({
      personal: { fullName: "Daniel Kofi Tetteh", title: "Security Supervisor", phone: "+233 55 000 0109", email: "daniel.tetteh@example.com", location: "Takoradi, Western Region" },
      summary:
        "Security supervisor with seven years of experience protecting offices, warehouses and residential estates. Leads a team of eight officers on rotating shifts. Alert, disciplined and thorough with incident reporting.",
      experience: [
        {
          id: "e1",
          position: "Security Supervisor",
          company: "Gye Nyame Security Services (fictional)",
          location: "Takoradi",
          startDate: "2022-06",
          current: true,
          highlights:
            "Supervise eight officers across day and night shifts at a warehouse and office site\nPlan patrol routes and check that guard logs and CCTV checks are completed\nWrite incident reports and brief the client's facilities manager weekly\nTrain new officers on access control and emergency procedures",
        },
        {
          id: "e2",
          position: "Security Officer",
          company: "Gye Nyame Security Services (fictional)",
          location: "Takoradi",
          startDate: "2019-01",
          endDate: "2022-05",
          highlights: "Controlled visitor and vehicle access at a residential estate of 120 homes and carried out night patrols",
        },
      ],
      education: [{ id: "ed1", institution: "Senior High School (example)", degree: "WASSCE", location: "Takoradi", endDate: "2017" }],
      certifications: [
        { id: "c1", name: "First Aid at Work", issuer: "Training provider (example)", date: "2024-10" },
        { id: "c2", name: "Fire Safety Awareness", issuer: "Training provider (example)", date: "2023-05" },
      ],
      skills: [
        { id: "s1", name: "Access control" },
        { id: "s2", name: "CCTV monitoring" },
        { id: "s3", name: "Incident reporting" },
        { id: "s4", name: "Team supervision" },
      ],
      languages: [
        { id: "l1", name: "English", proficiency: "fluent" },
        { id: "l2", name: "Fante", proficiency: "native" },
        { id: "l3", name: "Nzema", proficiency: "conversational" },
      ],
      referencesOnRequest: true,
    }),
  },
];
