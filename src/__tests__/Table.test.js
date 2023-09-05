import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"; // this is for the "toBeInTheDocument" matcher
import Table from "../Table";
import fallbackImage from "../countries.png";

describe("Table Component", () => {
  const mockCountries = [
    {
      country: "USA",
      cases: 1000,
      countryInfo: {
        flag: "https://example.com/usa-flag.png",
      },
    },
    {
      country: "UK",
      cases: 500,
      countryInfo: {
        flag: "https://example.com/uk-flag.png",
      },
    },
  ];

  test("renders fallback image when flag image loading fails", () => {
    const { getAllByRole } = render(<Table countries={mockCountries} />);

    // Getting the images in the document
    const images = getAllByRole("img");

    // Triggering an error on the first image
    fireEvent.error(images[0]);

    // Checking if the src of the image is updated to the fallback image
    expect(images[0]).toHaveAttribute("src", fallbackImage);
  });

  test("renders Table component with countries data", () => {
    const { getByText, getAllByRole } = render(
      <Table countries={mockCountries} />
    );

    // Check if the countries' names are rendered correctly
    expect(getByText("USA")).toBeInTheDocument();
    expect(getByText("UK")).toBeInTheDocument();

    // Check if cases are displayed correctly
    expect(getByText("1,000")).toBeInTheDocument();
    expect(getByText("500")).toBeInTheDocument();

    // Check if country flags are rendered
    const images = getAllByRole("img");
    expect(images[0]).toHaveAttribute(
      "src",
      "https://example.com/usa-flag.png"
    );
    expect(images[1]).toHaveAttribute("src", "https://example.com/uk-flag.png");
  });
});
