import { baseSectionStyles, ContactLine, CvSections, type TemplateProps } from "./shared";

const c = { text: "#111827", muted: "#4b5563", accent: "#9a3412", rule: "#e5e7eb" };
const band = "#1f2937";

const s = baseSectionStyles(c, {
  section: { marginTop: 12 },
  entryTitle: { flex: 1, fontSize: 10, fontWeight: 700, color: c.text },
});

export default function ProfessionalTemplate({ cv, p }: TemplateProps) {
  const { Page, View, Text, Image: Photo } = p;
  const title = (t: string) => (
    <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 7 }}>
      <View style={{ width: 3, height: 11, backgroundColor: c.accent, marginRight: 7 }} />
      <Text style={{ fontFamily: "SourceSerif4", fontSize: 12, fontWeight: 700, color: c.text }}>{t}</Text>
    </View>
  );
  return (
    <Page style={{ fontFamily: "Inter", fontSize: 9.5, lineHeight: 1.45, color: "#1f2937", paddingTop: 36, paddingBottom: 40, paddingHorizontal: 42 }}>
      <View
        style={{
          paddingHorizontal: 22,
          paddingVertical: 20,
          borderRadius: 3,
          backgroundColor: band,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {cv.photo ? <Photo src={cv.photo} style={{ width: 70, height: 70, borderRadius: 35, marginRight: 18 }} /> : null}
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: "SourceSerif4", fontSize: 24, fontWeight: 700, color: "#ffffff", lineHeight: 1.15 }}>
            {cv.name || "Your Name"}
          </Text>
          {cv.title ? <Text style={{ fontSize: 11, color: "#fdba74", marginTop: 3, fontWeight: 600 }}>{cv.title}</Text> : null}
          <ContactLine cv={cv} p={p} style={{ marginTop: 8 }} itemStyle={{ fontSize: 8.5, color: "#e5e7eb" }} />
        </View>
      </View>
      <View style={{ marginTop: 4 }}>
        <CvSections cv={cv} p={p} s={s} options={{ renderTitle: title }} />
      </View>
    </Page>
  );
}
