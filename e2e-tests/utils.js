export async function waitForPerson(page, name, timeout = 3000) {
  const start = Date.now()
  while (Date.now() - start < timeout) {
    const response = await page.request.get("/api/persons")
    const persons = await response.json()
    const person = persons.find((p) => p.name.includes(name.trim()))
    if (person) return person
    await page.waitForTimeout(200)
  }
  throw new Error(`Person "${name}" not found after ${timeout}ms`)
}
