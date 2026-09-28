import { baseSectionStyles, ContactLine, CvSections, type TemplateProps } from "./shared";

const c = { text: "#111111", muted: "#4b5563", accent: "#b91c1c", rule: "#fecaca" };

const s = baseSectionStyles(c, {
  section: { marginTop: 14 },
  entryTitle: { flex: 1, fontSize: 10.5, fontWeight: 700, color: c.text },
  entryDates: { marginLeft: 12, fontSize: 8.5, color: c.accent, fontWeight: 600, paddingTop: 1 },
  bulletDot: { width: 10, color: c.accent },
});

export default function BoldTemplate({ cv, p }: TemplateProps) {
  const { Page, View, Text, Image: Photo } = p;
  const title = (t: string) => (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 7 }}>
      <Text style={{ fontSize: 13, fontWeight: 700, color: c.text, textTransform: "uppercase", letterSpacing: 0.5 }}>{t}</Text>
      <View style={{ flex: 1, height: 2, backgroundColor: c.accent, marginLeft: 8 }} />
    </View>
  );
  return (
    <Page style={{ fontFamily: "Inter", fontSize: 9.5, lineHeight: 1.45, color: "#1f2937", paddingTop: 38, paddingBottom: 38, paddingLeft: 52, paddingRight: 44 }}>
      <View fixed style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 10, backgroundColor: c.accent }} />
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 30, fontWeight: 700, color: c.text, lineHeight: 1.05, letterSpacing: -0.5 }}>{cv.name || "Your Name"}</Text>
          {cv.title ? <Text style={{ fontSize: 13, color: c.accent, fontWeight: 700, marginTop: 5 }}>{cv.title}</Text> : null}
          <ContactLine cv={cv} p={p} style={{ marginTop: 8 }} itemStyle={{ fontSize: 8.5, color: c.muted }} />
        </View>
        {cv.photo ? <Photo src={cv.photo} style={{ width: 76, height: 76, borderRadius: 6, marginLeft: 16 }} /> : null}
      </View>
      <View style={{ marginTop: 4 }}>
        <CvSections cv={cv} p={p} s={s} options={{ renderTitle: title }} />
      </View>
    </Page>
  );
}
