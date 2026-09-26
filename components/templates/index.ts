import type { ComponentType } from "react";
import type { TemplateId } from "@/lib/templates/registry";
import type { TemplateProps } from "./shared";
import ModernTemplate from "./modern";
import ClassicTemplate from "./classic";
import MinimalTemplate from "./minimal";
import GraduateTemplate from "./graduate";
import ProfessionalTemplate from "./professional";

/** To add a template: create a renderer here and add its metadata to lib/templates/registry.ts. */
export const TEMPLATE_COMPONENTS: Record<TemplateId, ComponentType<TemplateProps>> = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  graduate: GraduateTemplate,
  professional: ProfessionalTemplate,
};
