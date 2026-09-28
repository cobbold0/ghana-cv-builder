import { expect, test } from "@playwright/test";

test("template filters narrow the list and can be cleared", async ({ page }) => {
  await page.goto("/cv-templates");
  const cards = page.getByRole("link", { name: /^Use the .+ template$/ });
  await expect(page.getByText("Showing 10 of 10 templates")).toBeVisible();
  await expect(cards).toHaveCount(10);

  await page.getByRole("group", { name: "Style" }).getByText("Creative", { exact: true }).click();
  await expect(page.getByText("Showing 2 of 10 templates")).toBeVisible();
  await expect(page.getByRole("link", { name: "Use the Sidebar template" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Use the Bold template" })).toBeVisible();

  await page.getByLabel("Single column (best for job portals)").check();
  await expect(page.getByText("Showing 1 of 10 templates")).toBeVisible();
  await expect(page.getByRole("link", { name: "Use the Sidebar template" })).toHaveCount(0);

  await page.getByRole("group", { name: "Style" }).getByText("Simple", { exact: true }).click();
  await page.getByLabel("With photo").check();
  await expect(page.getByText("No templates match those filters.")).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(cards).toHaveCount(10);

  await page.getByRole("link", { name: "Use the Timeline template" }).click();
  if ((page.viewportSize()?.width ?? 1000) < 1024) await page.getByRole("tab", { name: "Preview" }).click();
  await expect(page.getByRole("radio", { name: "Timeline" })).toBeChecked();
});
