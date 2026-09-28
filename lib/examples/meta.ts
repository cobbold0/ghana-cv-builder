/** Lightweight example metadata, safe to import in client components. */
export const EXAMPLE_CATEGORIES = {
  students: "Students and graduates",
  business: "Business and office",
  "health-education": "Health and education",
  technical: "Technical and trades",
} as const;
export type ExampleCategory = keyof typeof EXAMPLE_CATEGORIES;
export const EXAMPLE_LEVELS = { entry: "Entry level", experienced: "Experienced" } as const;
export type ExampleLevel = keyof typeof EXAMPLE_LEVELS;

