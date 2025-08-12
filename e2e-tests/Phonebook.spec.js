const { test, expect, beforeEach, describe } = require("@playwright/test")
const { waitForPerson } = require("./utils")

describe("Phonebook", () => {
  beforeEach(async ({ page }) => {
    await page.goto("")
    // clear john doe before each test
    const response = await page.request.get("/api/persons")
    const persons = await response.json()
    const person = persons.find((p) => p.name === "John Doe")
    if (person) {
      page.once("dialog", (dialog) => dialog.accept())
      await page.getByTestId(`${person.id}-delete`).click()
    }
  })

  test("can add a new person", async ({ page }) => {
    await page.getByTestId("name").fill("John Doe")
    await page.getByTestId("number").fill("044-123456")
    await page.getByTestId("submit-btn").click()
    await expect(page.getByText("John Doe 044-123456")).toBeVisible()
  })

  test("can delete a person", async ({ page }) => {
    // add a person first
    await page.getByTestId("name").fill("John Doe")
    await page.getByTestId("number").fill("044-123456")
    await page.getByTestId("submit-btn").click()
    await expect(page.getByText("John Doe 044-123456")).toBeVisible()

    // get id from api /api/persons where name is john doe
    const response = await page.request.get("/api/persons")
    const persons = await response.json()
    console.log("persons", persons)
    const person = await waitForPerson(page, "John Doe")
    console.log("person", person)
    page.once("dialog", (dialog) => dialog.accept())

    await page.getByTestId(`${person.id}-delete`).click()

    // Assert the person is deleted
    await expect(page.getByText("John Doe 044-123456")).not.toBeVisible()
  })
})
