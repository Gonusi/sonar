import { render, screen } from "@testing-library/react";
import App_b from "./App";

test("renders learn react link", () => {
  render(<App_b />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
