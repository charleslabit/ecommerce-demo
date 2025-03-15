import { expect, test } from "@playwright/test";

test.describe("E-Commerce Demo Tests", () => {
  const baseUrl = "localhost:3000";

  // test("Homepage should load properly", async ({ page }) => {
  //   await page.goto(baseUrl);
  //   await expect(page.getByText("CK Mart").first()).toBeVisible();
  //   const cartIcon = page.getByTestId("cart-icon");
  //   await expect(cartIcon).toBeVisible();
  // });

  // test("Check your empty cart", async ({ page }) => {
  //   await page.goto(baseUrl);
  //   const cartIcon = page.getByTestId("cart-icon");
  //   await cartIcon.click();
  //   await expect(page.getByText("There are no items in this")).toBeVisible();
  //   await page.getByRole("button", { name: "Continue Shopping" }).click();
  //   await expect(
  //     page.getByText("There are no items in this")
  //   ).not.toBeVisible();
  //   await expect(page.getByText("Categories")).toBeVisible();
  // });

  test("Theme settings toggle should switch themes and persist", async ({
    page,
  }) => {
    await page.goto(baseUrl);

    const cartIcon = page.getByTestId("theme-settings");
    await cartIcon.click();

    await page.reload();

    //Dark mode is default of the app
    // Check if the dark mode is applied by verifying Mantine's attribute
    await expect(page.locator("html")).toHaveAttribute(
      "data-mantine-color-scheme",
      "light"
    );

    await cartIcon.click();
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute(
      "data-mantine-color-scheme",
      "dark"
    );
  });

  test("Home Button navigates back from Cart", async ({ page }) => {
    await page.goto(baseUrl);
    const cartIcon = page.getByTestId("cart-icon");
    await cartIcon.click();
    await expect(page).toHaveURL(/\/cart/);
    await page.getByTestId("home-button").first().click();
    await expect(page).not.toHaveURL(/\/cart/);
  });
});
