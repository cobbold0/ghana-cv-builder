import { cvSchema, type CV } from "./schema";

/** Fictional example used for template previews. Not a real person. */
export const SAMPLE_CV: CV = cvSchema.parse({
  personal: {
    fullName: "Ama Serwaa Owusu",
    title: "Junior Data Analyst",
    email: "ama.owusu@example.com",
    phone: "+233 24 000 0000",
    location: "East Legon, Accra",
    linkedin: "linkedin.com/in/ama-owusu-example",
    website: "",
  },
  summary:
    "Data analyst with two years of experience turning sales and customer data into clear reports for business teams. Comfortable with Excel, SQL and Power BI, and known for explaining findings in plain language. Looking to grow in a data-driven organisation in Accra.",
  experience: [
    {
      id: "e1",
      position: "Junior Data Analyst",
      company: "Adom Retail Ltd (fictional)",
      location: "Accra",
      startDate: "2024-02",
      current: true,
      highlights:
        "Built a weekly sales dashboard in Power BI used by 12 branch managers\nAutomated a monthly stock report, cutting preparation time from two days to three hours\nCleaned and merged customer records from three branch systems into one database",
    },
    {
      id: "e2",
      position: "National Service Personnel – Research Assistant",
      company: "Ghana Statistical Service (example posting)",
      location: "Accra",
      startDate: "2022-11",
      endDate: "2023-10",
      highlights:
        "Checked and coded survey returns for a regional household survey\nPrepared summary tables and charts for internal reports",
    },
  ],
  education: [
    {
      id: "ed1",
      institution: "University of Ghana",
      degree: "BSc",
      field: "Statistics",
      location: "Legon",
      startDate: "2018",
      endDate: "2022",
      description: "Second Class Upper Division. Final-year project: predicting loan default with logistic regression.",
    },
    {
      id: "ed2",
      institution: "Wesley Girls' High School",
      degree: "WASSCE",
      field: "General Science",
      location: "Cape Coast",
      startDate: "2014",
      endDate: "2017",
    },
  ],
  skills: [
    { id: "s1", name: "Microsoft Excel", level: "advanced" },
    { id: "s2", name: "SQL", level: "intermediate" },
    { id: "s3", name: "Power BI", level: "intermediate" },
    { id: "s4", name: "Python (pandas)" },
    { id: "s5", name: "Report writing" },
  ],
  projects: [
    {
      id: "p1",
      name: "Accra Market Prices Tracker",
      tools: "Python, Google Sheets",
      description: "Collected weekly prices for 20 staple foods from three markets and charted trends over six months.",
      url: "github.com/example/market-prices",
    },
  ],
  certifications: [{ id: "c1", name: "Google Data Analytics Certificate", issuer: "Coursera", date: "2023-06" }],
  languages: [
    { id: "l1", name: "English", proficiency: "fluent" },
    { id: "l2", name: "Twi", proficiency: "native" },
  ],
  referencesOnRequest: true,
});
