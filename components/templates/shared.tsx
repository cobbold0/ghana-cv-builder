import type { ReactNode } from "react";
import type { RenderCv } from "@/lib/cv/normalize";
import type { Primitives, Style, StyleProp } from "./primitives";

export type SectionKey =
  | "summary"
  | "experience"
  | "education"
  | "projects"
  | "skills"
  | "certifications"
  | "languages"
  | "references";

export const DEFAULT_ORDER: SectionKey[] = [
  "summary",
  "experience",
  "education",
  "projects",
  "skills",
  "certifications",
  "languages",
  "references",
];

export const SECTION_TITLES: Record<SectionKey, string> = {
  summary: "Profile",
  experience: "Work Experience",
  education: "Education",
  projects: "Projects",
  skills: "Skills",
  certifications: "Certifications",
  languages: "Languages",
  references: "References",
};

/** Styles each template supplies to the shared section renderer. */
export interface SectionStyles {
  section: Style;
  sectionTitle: Style;
  /** Optional rule drawn under the section title. */
  titleRule?: Style;
  entry: Style;
  entryHead: Style;
  entryTitle: Style;
  entryDates: Style;
  entrySub: Style;
  paragraph: Style;
  bulletRow: Style;
  bulletDot: Style;
  bulletText: Style;
  inline: Style;
  strong: Style;
  muted: Style;
  link: Style;
}

export interface SectionOptions {
  order?: SectionKey[];
  titles?: Partial<Record<SectionKey, string>>;
  /** Put the organisation first (e.g. "MTN Ghana" then "Sales Executive"). */
  orgFirst?: boolean;
  /** Custom section title renderer (e.g. with a side bar). */
  renderTitle?: (title: string) => ReactNode;
}

const join = (parts: string[], sep = ", ") => parts.filter(Boolean).join(sep);

export function hasSection(cv: RenderCv, key: SectionKey): boolean {
  switch (key) {
    case "summary":
      return cv.summary.length > 0;
    case "references":
      return cv.referencesOnRequest || cv.references.length > 0;
    default:
      return cv[key].length > 0;
  }
}

interface EntryData {
  title: string;
  sub?: string;
  dates?: string;
  paragraphs?: string[];
  bullets?: string[];
  link?: { href: string; text: string };
}

export function CvSections({ cv, p, s, options = {} }: { cv: RenderCv; p: Primitives; s: SectionStyles; options?: SectionOptions }) {
  const { View, Text, Link } = p;
  const order = options.order ?? DEFAULT_ORDER;

  // Plain functions rather than nested components so React keeps DOM identity between renders.
  const heading = (id: SectionKey) => {
    const title = options.titles?.[id] ?? SECTION_TITLES[id];
    return (
      <>
        {options.renderTitle ? options.renderTitle(title) : <Text style={s.sectionTitle}>{title}</Text>}
        {s.titleRule && <View style={s.titleRule} />}
      </>
    );
  };

  /** Short sections are kept on one page together with their heading. */
  const section = (id: SectionKey, children: ReactNode) => (
    <View key={id} style={s.section} wrap={false}>
      {heading(id)}
      {children}
    </View>
  );

  /** Long sections may break between entries; the heading stays with the first entry's header. */
  const listSection = (id: SectionKey, items: EntryData[]) => (
    <View key={id} style={s.section}>
      {items.map(({ title, sub, dates, paragraphs = [], bullets = [], link }, i) => (
        <View key={i} style={[s.entry, i === items.length - 1 && { marginBottom: 0 }]}>
          <View wrap={false} minPresenceAhead={36}>
            {i === 0 ? heading(id) : null}
            <View style={s.entryHead}>
              <Text style={s.entryTitle}>{title || sub}</Text>
              {dates ? <Text style={s.entryDates}>{dates}</Text> : null}
            </View>
            {title && sub ? <Text style={s.entrySub}>{sub}</Text> : null}
            {link ? (
              <Link href={link.href} style={[s.entrySub, s.link]}>
                {link.text}
              </Link>
            ) : null}
          </View>
          {paragraphs.map((t, j) => (
            <Text key={`p${j}`} style={s.paragraph}>
              {t}
            </Text>
          ))}
          {bullets.map((t, j) => (
            <View key={`b${j}`} style={s.bulletRow} wrap={false}>
              <Text style={s.bulletDot}>•</Text>
              <Text style={s.bulletText}>{t}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  const inlineList = (items: { name: string; extra: string }[]) => (
    <Text style={s.inline}>{items.map((k) => (k.extra ? `${k.name} (${k.extra})` : k.name)).join("  ·  ")}</Text>
  );

  const render = (key: SectionKey): ReactNode => {
    if (!hasSection(cv, key)) return null;
    switch (key) {
      case "summary":
        return section(
          key,
          cv.summary.map((t, i) => (
            <Text key={i} style={s.paragraph}>
              {t}
            </Text>
          )),
        );
      case "experience":
        return listSection(
          key,
          cv.experience.map((e) => {
              const org = join([e.company, e.location]);
              return {
                title: options.orgFirst ? org : e.position,
                sub: options.orgFirst ? e.position : org,
                dates: e.dates,
                paragraphs: e.description,
                bullets: e.bullets,
              };
            }),
        );
      case "education":
        return listSection(
          key,
          cv.education.map((e) => {
              const org = join([e.institution, e.location]);
              return {
                title: options.orgFirst ? org : e.degree,
                sub: options.orgFirst ? e.degree : org,
                dates: e.dates,
                paragraphs: e.description,
              };
            }),
        );
      case "projects":
        return listSection(
          key,
          cv.projects.map((pr) => ({
              title: pr.name,
              sub: pr.tools,
              paragraphs: pr.description,
              link: pr.url ? { href: pr.href, text: pr.url } : undefined,
            })),
        );
      case "skills":
        return section(key, inlineList(cv.skills.map((k) => ({ name: k.name, extra: k.level }))));
      case "languages":
        return section(key, inlineList(cv.languages.map((l) => ({ name: l.name, extra: l.proficiency }))));
      case "certifications":
        return section(
          key,
          cv.certifications.map((c, i) => (
            <View key={i} wrap={false} style={{ marginBottom: i === cv.certifications.length - 1 ? 0 : 4 }}>
              <Text style={s.inline}>
                <Text style={s.strong}>{c.name}</Text>
                {c.issuer || c.date ? <Text style={s.muted}>{` — ${join([c.issuer, c.date])}`}</Text> : null}
              </Text>
              {c.url ? (
                <Link href={c.href} style={[s.muted, s.link, { fontSize: 8.5 }]}>
                  {c.url}
                </Link>
              ) : null}
            </View>
          )),
        );
      case "references":
        return section(
          key,
          cv.referencesOnRequest || cv.references.length === 0 ? (
            <Text style={s.inline}>Available on request.</Text>
          ) : (
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {cv.references.map((r, i) => (
                <View key={i} wrap={false} style={{ width: "50%", paddingRight: 12, marginBottom: 8 }}>
                  <Text style={[s.inline, s.strong]}>{r.name}</Text>
                  {r.position || r.organization ? <Text style={[s.inline, s.muted]}>{join([r.position, r.organization])}</Text> : null}
                  {r.phone ? <Text style={[s.inline, s.muted]}>{r.phone}</Text> : null}
                  {r.email ? <Text style={[s.inline, s.muted]}>{r.email}</Text> : null}
                </View>
              ))}
            </View>
          ),
        );
    }
  };

  return <>{order.map(render)}</>;
}

/** Contact items joined with a separator, wrapping across lines when needed. */
export function ContactLine({
  cv,
  p,
  style,
  itemStyle,
  separator = "  ·  ",
}: {
  cv: RenderCv;
  p: Primitives;
  style?: StyleProp;
  itemStyle?: StyleProp;
  separator?: string;
}) {
  const { View, Text, Link } = p;
  if (cv.contacts.length === 0) return null;
  return (
    <View style={[{ flexDirection: "row", flexWrap: "wrap" }, style]}>
      {cv.contacts.map((c, i) => (
        <Text key={c.kind} style={itemStyle}>
          {c.href ? (
            <Link href={c.href} style={itemStyle}>
              {c.text}
            </Link>
          ) : (
            c.text
          )}
          {i < cv.contacts.length - 1 ? separator : ""}
        </Text>
      ))}
    </View>
  );
}

export interface Palette {
  text: string;
  muted: string;
  accent: string;
  rule: string;
}

/** Sensible defaults every template starts from and then adjusts. */
export function baseSectionStyles(c: Palette, overrides: Partial<SectionStyles> = {}): SectionStyles {
  const base: SectionStyles = {
    section: { marginTop: 14 },
    sectionTitle: { fontSize: 10.5, fontWeight: 700, color: c.accent, marginBottom: 6 },
    entry: { marginBottom: 9 },
    entryHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
    entryTitle: { flex: 1, fontSize: 10, fontWeight: 600, color: c.text },
    entryDates: { marginLeft: 12, fontSize: 8.5, color: c.muted, paddingTop: 1 },
    entrySub: { fontSize: 9, color: c.muted, marginTop: 1 },
    paragraph: { marginTop: 3 },
    bulletRow: { flexDirection: "row", marginTop: 2 },
    bulletDot: { width: 10, color: c.muted },
    bulletText: { flex: 1 },
    inline: {},
    strong: { fontWeight: 600, color: c.text },
    muted: { color: c.muted },
    link: { color: c.muted },
  };
  const merged = { ...base };
  for (const key of Object.keys(overrides) as (keyof SectionStyles)[]) {
    merged[key] = { ...base[key], ...overrides[key] };
  }
  return merged;
}

export interface TemplateProps {
  cv: RenderCv;
  p: Primitives;
}
