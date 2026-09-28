import { expect, test } from "@playwright/test";

// Production builds load GA and AdSense by default, so the banner appears.
const consentUpdates = (page: import("@playwright/test").Page) =>
  page.evaluate(() => ((window as unknown as { dataLayer: IArguments[] }).dataLayer ?? []).filter((a) => a[0] === "consent").map((a) => Array.from(a)));

test("cookie banner asks about personalised ads and analytics, and remembers the choice", async ({ page }) => {
  await page.route(/googletagmanager|google-analytics|googlesyndication/, (route) => route.fulfill({ status: 200, body: "" }));
  await page.goto("/how-to-write-a-cv");
  const banner = page.getByRole("dialog", { name: /Cookies for analytics and personalised ads/ });
  await expect(banner).toBeVisible();
  expect(await page.evaluate(() => window.adsbygoogle?.requestNonPersonalizedAds)).toBe(1);

  await banner.getByRole("button", { name: "No thanks" }).click();
  await expect(banner).toBeHidden();
  expect(await consentUpdates(page)).toContainEqual(["consent", "update", { ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" }]);

  await page.reload();
  await expect(banner).toBeHidden();

  await page.getByRole("button", { name: "Cookie settings" }).click();
  await banner.getByRole("button", { name: "Accept" }).click();
  expect(await page.evaluate(() => window.adsbygoogle?.requestNonPersonalizedAds)).toBe(0);
  expect(await consentUpdates(page)).toContainEqual(["consent", "update", { ad_user_data: "granted", ad_personalization: "granted", analytics_storage: "granted", ad_storage: "granted" }]);
});

test("cookie banner never covers the builder", async ({ page }) => {
  await page.goto("/builder");
  await expect(page.getByRole("dialog", { name: /Cookies/ })).toHaveCount(0);
});
