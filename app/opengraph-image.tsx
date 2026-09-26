import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Ghana CV Builder — Create a professional CV in minutes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [regular, bold] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/inter-400.ttf")),
    readFile(join(process.cwd(), "public/fonts/inter-700.ttf")),
  ]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#ffffff", fontFamily: "Inter" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", width: 64, height: 64, borderRadius: 14, background: "#0f6848", color: "#fff", fontSize: 26, fontWeight: 700, alignItems: "center", justifyContent: "center" }}>
              CV
            </div>
            <div style={{ fontSize: 34, fontWeight: 700, color: "#0f172a" }}>Ghana CV Builder</div>
          </div>
          <div style={{ fontSize: 68, fontWeight: 700, color: "#0f172a", marginTop: 40, lineHeight: 1.1 }}>Create a professional CV in minutes</div>
          <div style={{ fontSize: 30, color: "#475569", marginTop: 24 }}>Free templates · No sign-up · Download as PDF</div>
        </div>
        <div style={{ display: "flex", width: 24, background: "#e8b73a" }} />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: regular, weight: 400, style: "normal" },
        { name: "Inter", data: bold, weight: 700, style: "normal" },
      ],
    },
  );
}
