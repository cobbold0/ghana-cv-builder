import type { ComponentType } from "react";
import type { TemplateId } from "@/lib/templates/registry";
import type { TemplateProps } from "./shared";
import ModernTemplate from "./modern";
import ClassicTemplate from "./classic";
import MinimalTemplate from "./minimal";
import GraduateTemplate from "./graduate";
import ProfessionalTemplate from "./professional";
import SidebarTemplate from "./sidebar";
import TimelineTemplate from "./timeline";
import ExecutiveTemplate from "./executive";
import CompactTemplate from "./compact";
import BoldTemplate from "./bold";

/** To add a template: create a renderer here and add its metadata to lib/templates/registry.ts. */
export const TEMPLATE_COMPONENTS: Record<TemplateId, ComponentType<TemplateProps>> = {
  modern: ModernTemplate,
  classic: ClassicTemplate,
  minimal: MinimalTemplate,
  graduate: GraduateTemplate,
  professional: ProfessionalTemplate,
  sidebar: SidebarTemplate,
  timeline: TimelineTemplate,
  executive: ExecutiveTemplate,
  compact: CompactTemplate,
  bold: BoldTemplate,
};
