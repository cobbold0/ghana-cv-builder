import { expect, test, type Page } from "@playwright/test";
import { readFile } from "node:fs/promises";

const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1000) < 1024;

async function download(page: Page) {
  const button = isMobile(page) ? page.getByRole("navigation", { name: "Builder" }).getByRole("button", { name: /PDF/ }) : page.getByRole("banner").getByRole("button", { name: "Download PDF" });
  const [file] = await Promise.all([page.waitForEvent("download"), button.click()]);
  return file;
}

test("visitor creates a CV and downloads a PDF", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Create a professional CV in minutes");
  await page.getByRole("main").getByRole("link", { name: "Create my CV" }).first().click();
  await expect(page).toHaveURL(/\/builder$/);

  await page.getByLabel("Full name").fill("Akosua Mensah");
  await page.getByLabel("Professional title").fill("Customer Service Officer");
  await page.getByLabel(/^Email/).fill("akosua@example.com");
  await page.getByLabel(/^Phone/).fill("+233 24 123 4567");

  await page.getByRole("button", { name: /Work experience/ }).click();
  await page.getByRole("button", { name: "Add experience" }).click();
  await page.getByLabel("Job title").fill("Customer Service Officer");
  await page.getByLabel("Company or organisation").fill("Example Bank");
  await page.getByLabel("Start date year").selectOption("2022");
  await page.getByLabel("I currently work here").check();
  await page.getByLabel("Achievements and responsibilities").fill("Resolved customer enquiries\nTrained new staff");

  await page.getByRole("button", { name: /^Skills/ }).click();
  await page.getByRole("button", { name: "Add skill" }).click();
  await page.getByLabel("Skill 1", { exact: true }).fill("Customer service");

  if (isMobile(page)) await page.getByRole("tab", { name: "Preview" }).click();
  await page.getByText("Classic", { exact: true }).click();
  const preview = page.getByRole("img", { name: "CV preview" });
  await expect(preview).toContainText("Akosua Mensah");
  await expect(preview).toContainText("Example Bank");
  await expect(preview).toContainText("Present");

  const file = await download(page);
  expect(file.suggestedFilename()).toBe("Akosua-Mensah-CV.pdf");
  const bytes = await readFile((await file.path())!);
  expect(bytes.subarray(0, 5).toString()).toBe("%PDF-");
  expect(bytes.length).toBeGreaterThan(5_000);
  await expect(page.getByRole("status").filter({ hasText: "downloaded" })).toBeVisible();

  // Work survives a reload.
  await page.reload();
  await expect(page.getByLabel("Full name")).toHaveValue("Akosua Mensah");
  if (isMobile(page)) await page.getByRole("tab", { name: "Preview" }).click();
  await expect(page.getByRole("radio", { name: "Classic" })).toBeChecked();
});

test("invalid details block the download with a clear message", async ({ page }) => {
  await page.goto("/builder");
  await page.getByLabel(/^Email/).fill("not-an-email");
  const button = isMobile(page) ? page.getByRole("navigation", { name: "Builder" }).getByRole("button", { name: /PDF/ }) : page.getByRole("banner").getByRole("button", { name: "Download PDF" });
  await button.click();
  await expect(page.getByRole("alert").filter({ hasText: "before downloading" })).toContainText("2 problems");
  await expect(page.getByLabel("Full name")).toBeFocused();
  await expect(page.getByText("Enter a valid email address")).toBeVisible();
});

test("an example can be opened and edited", async ({ page }) => {
  await page.goto("/cv-examples/graduate");
  await page.getByRole("link", { name: "Edit this example" }).first().click();
  await expect(page.getByLabel("Full name")).toHaveValue("Kwabena Asare Boateng");
  if (isMobile(page)) await page.getByRole("tab", { name: "Preview" }).click();
  await expect(page.getByRole("radio", { name: "Graduate" })).toBeChecked();
});

test("the builder has no horizontal overflow in edit or preview", async ({ page }) => {
  await page.goto("/builder?example=software-developer");
  const overflow = () => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(await overflow()).toBeLessThanOrEqual(0);
  if (isMobile(page)) {
    await page.getByRole("tab", { name: "Preview" }).click();
    await expect(page.getByRole("img", { name: "CV preview" })).toBeVisible();
    expect(await overflow()).toBeLessThanOrEqual(0);
  }
});
