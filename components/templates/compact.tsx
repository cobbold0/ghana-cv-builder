import { baseSectionStyles, CvSections, type TemplateProps } from "./shared";

const c = { text: "#111827", muted: "#4b5563", accent: "#1f2937", rule: "#e5e7eb" };

const s = baseSectionStyles(c, {
  section: { marginTop: 9 },
  sectionTitle: {
    fontSize: 8.5,
    fontWeight: 700,
    color: c.accent,
    letterSpacing: 1,
    textTransform: "uppercase",
    backgroundColor: "#f1f5f9",
    paddingVertical: 2.5,
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  entry: { marginBottom: 6 },
  entryTitle: { flex: 1, fontSize: 9.2, fontWeight: 700, color: c.text },
  entryDates: { marginLeft: 10, fontSize: 8, color: c.muted },
  entrySub: { fontSize: 8.5, color: c.muted, marginTop: 0 },
  paragraph: { marginTop: 2 },
  bulletRow: { flexDirection: "row", marginTop: 1 },
  bulletDot: { width: 8, color: c.muted },
});

export default function CompactTemplate({ cv, p }: TemplateProps) {
  const { Page, View, Text, Link } = p;
  return (
    <Page style={{ fontFamily: "Inter", fontSize: 8.8, lineHeight: 1.35, color: "#1f2937", paddingTop: 30, paddingBottom: 30, paddingHorizontal: 36 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ flex: 1, paddingRight: 16 }}>
          <Text style={{ fontSize: 19, fontWeight: 700, color: c.text, lineHeight: 1.15 }}>{cv.name || "Your Name"}</Text>
          {cv.title ? <Text style={{ fontSize: 10, color: c.muted, marginTop: 2 }}>{cv.title}</Text> : null}
        </View>
        <View style={{ alignItems: "flex-end" }}>
          {cv.contacts.map((ct) =>
            ct.href ? (
              <Link key={ct.kind} href={ct.href} style={{ fontSize: 8, color: c.muted, textAlign: "right" }}>
                {ct.text}
              </Link>
            ) : (
              <Text key={ct.kind} style={{ fontSize: 8, color: c.muted, textAlign: "right" }}>
                {ct.text}
              </Text>
            ),
          )}
        </View>
      </View>
      <CvSections cv={cv} p={p} s={s} />
    </Page>
  );
}
