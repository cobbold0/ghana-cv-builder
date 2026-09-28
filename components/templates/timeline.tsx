import { baseSectionStyles, ContactLine, CvSections, type TemplateProps } from "./shared";

const c = { text: "#111827", muted: "#4b5563", accent: "#4338ca", rule: "#c7d2fe" };

const s = baseSectionStyles(c, {
  section: { marginTop: 10 },
  sectionTitle: { fontSize: 11, fontWeight: 700, color: c.accent, marginBottom: 3 },
  titleRule: { height: 1, backgroundColor: c.rule, marginBottom: 8 },
  entryDates: { fontSize: 8.5, color: c.accent, fontWeight: 600, paddingTop: 1.5 },
});

export default function TimelineTemplate({ cv, p }: TemplateProps) {
  const { Page, View, Text } = p;
  return (
    <Page style={{ fontFamily: "Inter", fontSize: 9.5, lineHeight: 1.45, color: "#1f2937", paddingTop: 34, paddingBottom: 34, paddingHorizontal: 44 }}>
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 23, fontWeight: 700, color: c.text, lineHeight: 1.15 }}>{cv.name || "Your Name"}</Text>
          {cv.title ? <Text style={{ fontSize: 11.5, color: c.accent, marginTop: 3 }}>{cv.title}</Text> : null}
        </View>
      </View>
      <ContactLine cv={cv} p={p} style={{ marginTop: 7 }} itemStyle={{ fontSize: 8.5, color: c.muted }} />
      <CvSections cv={cv} p={p} s={s} options={{ datesColumn: 82 }} />
    </Page>
  );
}
