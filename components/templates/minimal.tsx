import { baseSectionStyles, ContactLine, CvSections, type TemplateProps } from "./shared";

const c = { text: "#171717", muted: "#6b6b6b", accent: "#8a8a8a", rule: "#e5e5e5" };

const s = baseSectionStyles(c, {
  section: { marginTop: 14 },
  sectionTitle: { fontSize: 8, fontWeight: 600, color: c.accent, letterSpacing: 1.6, textTransform: "uppercase", marginBottom: 7 },
  entry: { marginBottom: 9 },
  entryTitle: { flex: 1, fontSize: 10, fontWeight: 600, color: c.text },
  bulletDot: { width: 10, color: "#a3a3a3" },
});

export default function MinimalTemplate({ cv, p }: TemplateProps) {
  const { Page, Text } = p;
  return (
    <Page style={{ fontFamily: "Inter", fontSize: 9.5, lineHeight: 1.45, color: "#262626", paddingTop: 44, paddingBottom: 40, paddingHorizontal: 56 }}>
      <Text style={{ fontSize: 21, fontWeight: 600, color: c.text, lineHeight: 1.2 }}>{cv.name || "Your Name"}</Text>
      {cv.title ? <Text style={{ fontSize: 11, color: c.muted, marginTop: 2 }}>{cv.title}</Text> : null}
      <ContactLine cv={cv} p={p} style={{ marginTop: 8 }} itemStyle={{ fontSize: 8.5, color: c.muted }} separator="     " />
      <CvSections cv={cv} p={p} s={s} />
    </Page>
  );
}
