import { baseSectionStyles, ContactLine, CvSections, type TemplateProps } from "./shared";

const c = { text: "#111827", muted: "#4b5563", accent: "#0f766e", rule: "#99d5cf" };

const s = baseSectionStyles(c, {
  section: { marginTop: 13 },
  sectionTitle: { fontSize: 9.5, fontWeight: 700, color: c.accent, letterSpacing: 1.2, textTransform: "uppercase", marginBottom: 3 },
  titleRule: { height: 1.5, width: 28, backgroundColor: c.accent, marginBottom: 6 },
});

export default function ModernTemplate({ cv, p }: TemplateProps) {
  const { Page, View, Text, Image } = p;
  return (
    <Page style={{ fontFamily: "Inter", fontSize: 9.5, lineHeight: 1.45, color: "#1f2937", paddingTop: 36, paddingBottom: 36, paddingHorizontal: 46 }}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 24, fontWeight: 700, color: c.text, lineHeight: 1.15 }}>{cv.name || "Your Name"}</Text>
          {cv.title ? <Text style={{ fontSize: 12, color: c.accent, fontWeight: 600, marginTop: 3 }}>{cv.title}</Text> : null}
          <ContactLine cv={cv} p={p} style={{ marginTop: 8 }} itemStyle={{ fontSize: 8.5, color: c.muted }} />
        </View>
        {cv.photo ? <Image src={cv.photo} style={{ width: 68, height: 68, borderRadius: 34, marginLeft: 16 }} /> : null}
      </View>
      <View style={{ height: 1, backgroundColor: "#e5e7eb", marginTop: 12 }} />
      <CvSections cv={cv} p={p} s={s} />
    </Page>
  );
}
