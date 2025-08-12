import { render, screen } from "@testing-library/react"
import App from "../src/App"
import { vi } from "vitest"
import axios from "axios"

vi.mock("axios")
describe("the phonebook", () => {
  test("fetches data", async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ id: 1, name: "Ada Lovelace", number: "044-1234567" }],
    })
    render(<App />)
    expect(
      await screen.findByText("Ada Lovelace 044-1234567")
    ).toBeInTheDocument()
  })
})
