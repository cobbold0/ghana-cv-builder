import type { CSSProperties } from "react";
import { A4, flattenStyle, type Primitives, type StyleProp } from "./primitives";

const UNITLESS = new Set(["fontWeight", "lineHeight", "flex", "flexGrow", "flexShrink", "opacity", "zIndex", "order"]);
const FONT_FAMILIES: Record<string, string> = {
  Inter: "Inter, ui-sans-serif, system-ui, sans-serif",
  SourceSerif4: '"Source Serif 4", Georgia, serif',
};

/** Convert react-pdf style objects to CSS (numbers are points). */
export function toCss(style: StyleProp): CSSProperties {
  const out: Record<string, string | number> = {};
  for (const [key, raw] of Object.entries(flattenStyle(style))) {
    if (raw === undefined) continue;
    const value = typeof raw === "number" && !UNITLESS.has(key) ? `${raw}pt` : raw;
    if (key === "paddingHorizontal" || key === "marginHorizontal") {
      const base = key.startsWith("padding") ? "padding" : "margin";
      out[`${base}Left`] = value;
      out[`${base}Right`] = value;
    } else if (key === "paddingVertical" || key === "marginVertical") {
      const base = key.startsWith("padding") ? "padding" : "margin";
      out[`${base}Top`] = value;
      out[`${base}Bottom`] = value;
    } else if (key === "fontFamily") {
      out.fontFamily = FONT_FAMILIES[String(raw)] ?? String(raw);
    } else {
      out[key] = value;
    }
  }
  return out as CSSProperties;
}

export const htmlPrimitives: Primitives = {
  Page: ({ style, children }) => (
    <div className="cv-page" style={{ width: `${A4.width}pt`, minHeight: `${A4.height}pt`, ...toCss(style) }}>
      {children}
    </div>
  ),
  // "fixed" views are full-page backgrounds (side panels, stripes); keep them behind the content.
  View: ({ style, children, fixed }) => (
    <div className="cv-view" style={fixed ? { ...toCss(style), zIndex: -1 } : toCss(style)}>
      {children}
    </div>
  ),
  Text: ({ style, children }) => (
    <span className="cv-text" style={toCss(style)}>
      {children}
    </span>
  ),
  // Links are not clickable inside the preview; the PDF keeps them live.
  Link: ({ style, children }) => (
    <span className="cv-text" style={toCss(style)}>
      {children}
    </span>
  ),
  // eslint-disable-next-line @next/next/no-img-element
  Image: ({ src, style }) => <img className="cv-image" src={src} alt="" style={toCss(style)} />,
};
