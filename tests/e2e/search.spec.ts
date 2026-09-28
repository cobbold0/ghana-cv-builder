import { expect, test } from "@playwright/test";

test("global search finds and opens a page", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("banner").getByRole("button", { name: "Search" }).click();
  const dialog = page.getByRole("dialog", { name: "Search the site" });
  const input = dialog.getByRole("combobox");
  await expect(input).toBeFocused();
  await expect(dialog.getByText("Popular")).toBeVisible();

  await input.fill("nurse");
  await expect(dialog.getByRole("option").first()).toContainText("Nurse CV example");
  await input.press("Enter");
  await expect(page).toHaveURL(/\/cv-examples\/nurse$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Nurse CV example");
});

test("keyboard shortcut, arrow keys, no-results and Escape", async ({ page, isMobile }) => {
  test.skip(isMobile, "Keyboard shortcuts are for desktop");
  await page.goto("/cv-guides");
  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog", { name: "Search the site" });
  const input = dialog.getByRole("combobox");
  await expect(input).toBeFocused();

  await input.fill("xyzzy");
  await expect(dialog.getByText(/No results for/)).toBeVisible();

  await input.fill("cv");
  await input.press("ArrowDown");
  await expect(dialog.getByRole("option").nth(1)).toHaveAttribute("aria-selected", "true");

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();

  await page.keyboard.press("/");
  await expect(dialog).toBeVisible();
});
