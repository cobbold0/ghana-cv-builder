import type { SectionKey } from "./shared";
import { baseSectionStyles, CvSections, type TemplateProps } from "./shared";

const c = { text: "#0f172a", muted: "#475569", accent: "#0f6848", rule: "#cfe3db" };
const PANEL = "#eef4f1";
const SIDE = 176;

const main = baseSectionStyles(c, {
  section: { marginTop: 14 },
  sectionTitle: { fontSize: 10, fontWeight: 700, color: c.accent, letterSpacing: 1, textTransform: "uppercase", marginBottom: 3 },
  titleRule: { height: 0.75, backgroundColor: c.rule, marginBottom: 7 },
});

const side = baseSectionStyles(c, {
  section: { marginTop: 16 },
  sectionTitle: { fontSize: 9, fontWeight: 700, color: c.accent, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 },
  inline: { fontSize: 8.8, lineHeight: 1.4 },
  strong: { fontWeight: 600, color: c.text },
});

const SIDE_SECTIONS: SectionKey[] = ["skills", "languages", "certifications"];
const MAIN_SECTIONS: SectionKey[] = ["summary", "experience", "education", "projects", "references"];

const CONTACT_LABELS = { email: "Email", phone: "Phone", location: "Location", linkedin: "LinkedIn", website: "Website" } as const;

export default function SidebarTemplate({ cv, p }: TemplateProps) {
  const { Page, View, Text, Link, Image: Photo } = p;
  return (
    <Page style={{ fontFamily: "Inter", fontSize: 9.5, lineHeight: 1.45, color: "#1e293b", paddingTop: 36, paddingBottom: 36 }}>
      {/* Side panel background, repeated on every page. */}
      <View fixed style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: SIDE, backgroundColor: PANEL }} />
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: SIDE, paddingHorizontal: 18 }}>
          {cv.photo ? <Photo src={cv.photo} style={{ width: 96, height: 96, borderRadius: 48, marginBottom: 14, alignSelf: "center" }} /> : null}
          {cv.contacts.length > 0 ? (
            <View>
              <Text style={side.sectionTitle}>Contact</Text>
              {cv.contacts.map((ct) => (
                <View key={ct.kind} style={{ marginBottom: 5 }}>
                  <Text style={{ fontSize: 7.5, color: c.muted, textTransform: "uppercase", letterSpacing: 0.6 }}>{CONTACT_LABELS[ct.kind]}</Text>
                  {ct.href ? (
                    <Link href={ct.href} style={{ fontSize: 8.6, color: c.text }}>
                      {ct.text}
                    </Link>
                  ) : (
                    <Text style={{ fontSize: 8.6, color: c.text }}>{ct.text}</Text>
                  )}
                </View>
              ))}
            </View>
          ) : null}
          <CvSections cv={cv} p={p} s={side} options={{ order: SIDE_SECTIONS, listStyle: "stacked" }} />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 26 }}>
          <Text style={{ fontSize: 24, fontWeight: 700, color: c.text, lineHeight: 1.15 }}>{cv.name || "Your Name"}</Text>
          {cv.title ? <Text style={{ fontSize: 12, color: c.accent, fontWeight: 600, marginTop: 3 }}>{cv.title}</Text> : null}
          <CvSections cv={cv} p={p} s={main} options={{ order: MAIN_SECTIONS }} />
        </View>
      </View>
    </Page>
  );
}
