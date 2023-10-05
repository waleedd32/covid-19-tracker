import React from "react";
import { render } from "@testing-library/react";
import Footer from "../Footer";
import "@testing-library/jest-dom/extend-expect";

describe("<Footer />", () => {
  it("renders the Footer component", () => {
    const { container } = render(<Footer />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("displays text content", () => {
    const { getByText } = render(<Footer />);
    expect(getByText("Made by Valid |")).toBeInTheDocument();
  });
});
