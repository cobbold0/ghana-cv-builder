import { expect, test } from "@playwright/test";

test.describe("SEO", () => {
  test.skip(({ isMobile }) => isMobile, "Same markup on every device");

  test("every sitemap page is indexable with one h1, a canonical URL and metadata", async ({ page, request }) => {
    const xml = await (await request.get("/sitemap.xml")).text();
    const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
    expect(paths.length).toBeGreaterThan(15);
    expect(paths).not.toContain("/builder");

    const titles = new Set<string>();
    for (const path of paths) {
      const res = await page.goto(path);
      expect(res?.status(), path).toBe(200);
      await expect(page.locator("h1"), path).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]'), path).toHaveCount(1);
      await expect(page.locator('meta[name="robots"][content*="noindex"]'), path).toHaveCount(0);
      await expect(page.locator('meta[property="og:image"]'), path).toHaveCount(1);
      const description = await page.locator('meta[name="description"]').getAttribute("content");
      expect(description?.length ?? 0, path).toBeGreaterThan(50);
      const title = await page.title();
      expect(titles.has(title), `duplicate title on ${path}`).toBe(false);
      titles.add(title);
    }
  });

  test("builder is noindex and robots.txt points to the sitemap", async ({ page, request }) => {
    await page.goto("/builder");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
    const robots = await (await request.get("/robots.txt")).text();
    expect(robots).toContain("Sitemap:");
    expect(robots).not.toMatch(/Disallow: \/\s*$/m);
  });

  test("unknown pages return 404", async ({ page }) => {
    const res = await page.goto("/does-not-exist");
    expect(res?.status()).toBe(404);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
  });
});
