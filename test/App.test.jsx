import { render, screen } from "@testing-library/react"
import App from "../src/App"
import { vi } from "vitest"
import axios from "axios"
//import userEvent from "@testing-library/user-event"

vi.mock("axios")
describe("the phonebook", () => {
  test("fetches data", async () => {
    axios.get.mockResolvedValueOnce({
      data: [{ id: 1, name: "John Doe", number: "044-123456" }],
    })
    render(<App />)
    expect(await screen.findByText("John Doe 044-123456")).toBeInTheDocument()
  })
  test("posts data", async () => {
    // post mock
    axios.post.mockResolvedValueOnce({
      data: { id: 2, name: "John Doe", number: "044-123456" },
    })

    // get mock after posting
    axios.get.mockResolvedValueOnce({
      data: [{ id: 2, name: "John Doe", number: "044-123456" }],
    })
    render(<App />)
    expect(await screen.findByText("John Doe 044-123456")).toBeInTheDocument()
  })
  test("deletes data", async () => {
    // Initial GET returns John Doe
    axios.get.mockResolvedValueOnce({
      data: [{ id: 2, name: "John Doe", number: "044-123456" }],
    })
    // DELETE resolves successfully
    axios.delete.mockResolvedValueOnce({ status: 204 })
    // GET after deletion returns empty list
    axios.get.mockResolvedValueOnce({ data: [] })

    render(<App />)
    expect(
      await screen.queryByText("John Doe 044-123456")
    ).not.toBeInTheDocument()
  })
})
