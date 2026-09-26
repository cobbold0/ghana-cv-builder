import type { ComponentType, ReactNode } from "react";

/**
 * Templates are written once against these primitives. The HTML set renders
 * the on-screen preview; the PDF set (react-pdf) renders the download. Style
 * numbers are points, matching react-pdf.
 */
export type Style = Record<string, string | number | undefined>;
export type StyleProp = Style | false | null | undefined | StyleProp[];

export interface ViewProps {
  style?: StyleProp;
  /** false = keep on one page (PDF only). */
  wrap?: boolean;
  /** Repeat on every page (PDF only). */
  fixed?: boolean;
  /** Avoid a page break within this many points after the element (PDF only). */
  minPresenceAhead?: number;
  children?: ReactNode;
}

export interface Primitives {
  Page: ComponentType<{ style?: StyleProp; children?: ReactNode }>;
  View: ComponentType<ViewProps>;
  Text: ComponentType<{ style?: StyleProp; children?: ReactNode }>;
  Link: ComponentType<{ href: string; style?: StyleProp; children?: ReactNode }>;
  Image: ComponentType<{ src: string; style?: StyleProp }>;
}

export const A4 = { width: 595.28, height: 841.89 };

export function flattenStyle(style: StyleProp): Style {
  if (!style) return {};
  if (Array.isArray(style)) return Object.assign({}, ...style.map(flattenStyle));
  return style;
}
