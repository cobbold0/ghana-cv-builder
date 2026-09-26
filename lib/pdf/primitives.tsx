import { Image, Link, Page, Text, View, type Styles } from "@react-pdf/renderer";
import { flattenStyle, type Primitives, type StyleProp } from "@/components/templates/primitives";

const s = (style: StyleProp) => flattenStyle(style) as Styles[string];

export const pdfPrimitives: Primitives = {
  Page: ({ style, children }) => (
    <Page size="A4" style={s(style)}>
      {children}
    </Page>
  ),
  // Only forward layout hints that are set: react-pdf treats an explicit
  // `wrap={undefined}` as "don't wrap", which breaks pagination.
  View: ({ style, children, ...hints }) => (
    <View style={s(style)} {...Object.fromEntries(Object.entries(hints).filter(([, v]) => v !== undefined))}>
      {children}
    </View>
  ),
  Text: ({ style, children }) => <Text style={s(style)}>{children}</Text>,
  Link: ({ href, style, children }) => (
    <Link src={href} style={s([{ textDecoration: "none" }, style])}>
      {children}
    </Link>
  ),
  // eslint-disable-next-line jsx-a11y/alt-text
  Image: ({ src, style }) => <Image src={src} style={s(style)} />,
};
