import { expect, test } from "@playwright/test";

test("example filters and search narrow the list", async ({ page }) => {
  await page.goto("/cv-examples");
  const cards = page.getByRole("main").getByRole("link", { name: /CV example/ });
  await expect(page.getByText("Showing 15 of 15 examples")).toBeVisible();

  await page.getByRole("group", { name: "Category" }).getByText("Health and education", { exact: true }).click();
  await expect(page.getByText("Showing 2 of 15 examples")).toBeVisible();
  await expect(page.getByRole("heading", { level: 2, name: "Students and graduates" })).toHaveCount(0);

  await page.getByRole("group", { name: "Category" }).getByText("All", { exact: true }).click();
  await page.getByRole("group", { name: "Experience" }).getByText("Entry level", { exact: true }).click();
  await expect(page.getByText("Showing 4 of 15 examples")).toBeVisible();

  await page.getByRole("group", { name: "Experience" }).getByText("Any", { exact: true }).click();
  await page.getByLabel("Search by job").fill("bank");
  await expect(page.getByText("Showing 1 of 15 examples")).toBeVisible();
  await expect(cards.filter({ hasText: "Bank teller" })).toHaveCount(1);

  await page.getByLabel("Search by job").fill("astronaut");
  await expect(page.getByText(/No examples match/)).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await expect(page.getByText("Showing 15 of 15 examples")).toBeVisible();
});
