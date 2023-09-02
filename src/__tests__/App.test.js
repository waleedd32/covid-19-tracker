import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";

describe("<App />", () => {
  it("renders InfoBoxes with correct data", async () => {
    // Mock the countryInfo data
    const mockCountryInfo = {
      todayCases: 100,
      cases: 1000,
      todayRecovered: 50,
      recovered: 500,
      todayDeaths: 10,
      deaths: 101,
    };

    // here I'm using jest to mock fetch function and return mockCountryInfo
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCountryInfo),
        ok: true,
      })
    );

    const { findByText } = render(<App />);

    // Check for "100.0" as today's cases
    const casesElement = await findByText("100.0");
    expect(casesElement).toBeInTheDocument();
  });
});
