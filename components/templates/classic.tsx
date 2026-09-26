import { baseSectionStyles, ContactLine, CvSections, type TemplateProps } from "./shared";

const c = { text: "#111111", muted: "#404040", accent: "#111111", rule: "#111111" };

const s = baseSectionStyles(c, {
  section: { marginTop: 11 },
  sectionTitle: { fontSize: 10.5, fontWeight: 700, color: c.accent, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 },
  titleRule: { height: 0.75, backgroundColor: c.rule, marginBottom: 7 },
  entryTitle: { flex: 1, fontSize: 10.5, fontWeight: 700, color: c.text },
  entrySub: { fontSize: 10, fontStyle: "italic", color: c.muted, marginTop: 0 },
  entryDates: { marginLeft: 12, fontSize: 9.5, color: c.muted },
  bulletDot: { width: 10, color: c.text },
});

export default function ClassicTemplate({ cv, p }: TemplateProps) {
  const { Page, View, Text } = p;
  return (
    <Page style={{ fontFamily: "SourceSerif4", fontSize: 10, lineHeight: 1.38, color: "#1a1a1a", paddingTop: 40, paddingBottom: 40, paddingHorizontal: 52 }}>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 22, fontWeight: 700, color: c.text, textAlign: "center", lineHeight: 1.15 }}>{cv.name || "Your Name"}</Text>
        {cv.title ? <Text style={{ fontSize: 11.5, color: c.muted, marginTop: 3, textAlign: "center" }}>{cv.title}</Text> : null}
        <ContactLine cv={cv} p={p} style={{ marginTop: 6, justifyContent: "center" }} itemStyle={{ fontSize: 9.5, color: c.muted }} separator="  |  " />
      </View>
      <CvSections cv={cv} p={p} s={s} options={{ orgFirst: true }} />
    </Page>
  );
}
