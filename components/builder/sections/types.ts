import type { CV } from "@/lib/cv/schema";

export interface SectionProps {
  cv: CV;
  update: (patch: Partial<CV>) => void;
  /** Error to show for a field path (only once the field was touched or export was attempted). */
  err: (path: string) => string | undefined;
  touch: (path: string) => void;
  /** Id of an entry that should be expanded (e.g. because it has an error). */
  reveal?: string;
}
