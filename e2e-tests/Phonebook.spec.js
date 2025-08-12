const { test, expect, beforeEach, describe } = require("@playwright/test")

describe("Phonebook", () => {
  beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("can add a new person", async ({ page }) => {
    await page.getByTestId("name").fill("John Doe")
    await page.getByTestId("number").fill("044-123456")
    await page.getByTestId("submit-btn").click()
    await expect(page.getByText("John Doe 044-123456")).toBeVisible()
  })

  test("can delete a person", async ({ page }) => {
    await page.getByTestId("name").fill("John Doe")
    await page.getByTestId("number").fill("044-123456")
    await page.getByTestId("submit-btn").click()
    await expect(page.getByText("John Doe 044-123456")).toBeVisible()

    page.once("dialog", (dialog) => dialog.accept())
    await page.getByTestId("044-123456").click()
    await expect(page.getByText("John Doe 044-123456")).not.toBeVisible()
  })
})
