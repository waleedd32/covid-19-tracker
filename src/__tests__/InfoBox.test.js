import React from "react";
import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import InfoBox from "../InfoBox";

afterEach(cleanup); // Clean up on exiting

describe("<InfoBox />", () => {
  it("renders the InfoBox component with provided props", () => {
    const props = {
      title: "Cases",
      cases: "100",
      total: "500",
      isRed: true,
      active: true,
      globalDataStatus: "success",
    };

    const { getByText } = render(<InfoBox {...props} />);

    // Check if title, cases, and total are rendered correctly
    expect(getByText("Cases")).toBeInTheDocument();
    expect(getByText("100")).toBeInTheDocument();
    expect(getByText("500 Total")).toBeInTheDocument();
  });

  it('applies the "infoBox--red" class when isRed is true', () => {
    const { container } = render(<InfoBox isRed={true} />);

    expect(container.firstChild).toHaveClass("infoBox--red");
  });

  it('applies the "infoBox--selected" class when active is true', () => {
    const { container, debug } = render(<InfoBox active={true} />);
    debug();

    expect(container.firstChild).toHaveClass("infoBox--selected");
  });

  it('applies the "infoBox--selectedtored" class when activetored is true', () => {
    const { container } = render(<InfoBox activetored={true} />);
    // screen.debug(undefined, Infinity);
    expect(container.firstChild).toHaveClass("infoBox--selectedtored");
  });
});
