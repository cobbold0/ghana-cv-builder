import { adsTxtPublisherId } from "@/lib/ads";

export const dynamic = "force-static";

export function GET() {
  const pub = adsTxtPublisherId();
  if (!pub) return new Response("Not found", { status: 404 });
  // f08c47fec0942fa0 is Google's published certification authority ID for ads.txt.
  return new Response(`google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
