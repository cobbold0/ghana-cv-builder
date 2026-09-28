import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const PAGES = ["/", "/cv-templates", "/cv-examples", "/cv-examples/graduate", "/cv-guides", "/how-to-write-a-cv", "/work-experience-on-cv", "/builder", "/builder?example=accountant"];

for (const path of PAGES) {
  test(`no detectable accessibility violations on ${path}`, async ({ page }) => {
    await page.goto(path);
    await page.waitForLoadState("networkidle");
    const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    const summary = results.violations.map((v) => `${v.id}: ${v.nodes.length} × ${v.help} — ${v.nodes[0]?.target.join(" ")}`);
    expect(summary).toEqual([]);
  });
}
