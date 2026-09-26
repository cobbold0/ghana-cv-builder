import { baseSectionStyles, ContactLine, CvSections, type SectionKey, type TemplateProps } from "./shared";

const c = { text: "#0f172a", muted: "#475569", accent: "#1e3a8a", rule: "#c7d2fe" };

const s = baseSectionStyles(c, {
  section: { marginTop: 11 },
  sectionTitle: { fontSize: 11, fontWeight: 700, color: c.accent, marginBottom: 3 },
  titleRule: { height: 0.75, backgroundColor: c.rule, marginBottom: 7 },
});

// Graduates usually lead with education and projects.
const ORDER: SectionKey[] = ["summary", "education", "projects", "experience", "skills", "certifications", "languages", "references"];

export default function GraduateTemplate({ cv, p }: TemplateProps) {
  const { Page, View, Text } = p;
  return (
    <Page style={{ fontFamily: "Inter", fontSize: 9.5, lineHeight: 1.45, color: "#1e293b", paddingTop: 40, paddingBottom: 40, paddingHorizontal: 46 }}>
      <View style={{ borderBottomWidth: 2.5, borderBottomColor: c.accent, borderBottomStyle: "solid", paddingBottom: 10 }}>
        <Text style={{ fontSize: 22, fontWeight: 700, color: c.accent, lineHeight: 1.15 }}>{cv.name || "Your Name"}</Text>
        {cv.title ? <Text style={{ fontSize: 11, color: c.text, marginTop: 3 }}>{cv.title}</Text> : null}
        <ContactLine cv={cv} p={p} style={{ marginTop: 6 }} itemStyle={{ fontSize: 8.5, color: c.muted }} />
      </View>
      <CvSections cv={cv} p={p} s={s} options={{ order: ORDER, titles: { experience: "Experience" } }} />
    </Page>
  );
}
