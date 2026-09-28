import { baseSectionStyles, ContactLine, CvSections, type TemplateProps } from "./shared";

const c = { text: "#0f1b2d", muted: "#475569", accent: "#1e3a5f", rule: "#b08d57" };

const s = baseSectionStyles(c, {
  section: { marginTop: 11 },
  sectionTitle: { fontFamily: "SourceSerif4", fontSize: 11, fontWeight: 700, color: c.accent, letterSpacing: 1.6, textTransform: "uppercase", marginBottom: 3 },
  titleRule: { height: 1, width: 36, backgroundColor: c.rule, marginBottom: 8 },
  entryTitle: { flex: 1, fontFamily: "SourceSerif4", fontSize: 11, fontWeight: 700, color: c.text },
  entrySub: { fontSize: 9, color: c.muted, marginTop: 1, fontWeight: 600 },
  bulletDot: { width: 10, color: c.rule },
});

export default function ExecutiveTemplate({ cv, p }: TemplateProps) {
  const { Page, View, Text } = p;
  return (
    <Page style={{ fontFamily: "Inter", fontSize: 9.5, lineHeight: 1.45, color: "#1f2937", paddingTop: 36, paddingBottom: 36, paddingHorizontal: 50 }}>
      <Text style={{ fontFamily: "SourceSerif4", fontSize: 25, fontWeight: 700, color: c.accent, letterSpacing: 1.5, textTransform: "uppercase", lineHeight: 1.15 }}>
        {cv.name || "Your Name"}
      </Text>
      {cv.title ? <Text style={{ fontFamily: "SourceSerif4", fontSize: 12, fontStyle: "italic", color: c.muted, marginTop: 3 }}>{cv.title}</Text> : null}
      <View style={{ height: 1.5, backgroundColor: c.rule, marginTop: 10, marginBottom: 7 }} />
      <ContactLine cv={cv} p={p} itemStyle={{ fontSize: 8.5, color: c.muted }} separator="   |   " />
      <View style={{ marginTop: 2 }}>
        <CvSections cv={cv} p={p} s={s} options={{ orgFirst: true, titles: { summary: "Executive Profile", experience: "Career History" } }} />
      </View>
    </Page>
  );
}
