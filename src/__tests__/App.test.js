import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

describe("<App />", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("renders InfoBoxes with correct data", async () => {
    // Mocking data to mimic the response from the API
    const mockCountryInfo = {
      todayCases: 100,
      cases: 1000,
      todayRecovered: 50,
      recovered: 500,
      todayDeaths: 10,
      deaths: 101,
    };

    // Mocking fetch to return the mocked data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockCountryInfo),
        ok: true,
      })
    );

    const { findByText } = render(<App />);
    //  screen.debug(undefined, Infinity);
    // Check for "100.0" as today's cases
    const casesElement = await findByText("100.0");
    expect(casesElement).toBeInTheDocument();

    // Check for "1.0k" as the total cases
    const totalCasesElement = await findByText("1.0k Total");
    expect(totalCasesElement).toBeInTheDocument();

    // Check for "50.0" as today's recovered
    const recoveredElement = await findByText("50.0");
    expect(recoveredElement).toBeInTheDocument();

    // Check for "500" as the total recovered
    const totalRecoveredElement = await findByText("500.0 Total");
    expect(totalRecoveredElement).toBeInTheDocument();

    // Check for "10.0" as today's deaths
    const deathsElement = await findByText("10.0");
    expect(deathsElement).toBeInTheDocument();

    // Check for "100" as the total deaths
    const totalDeathsElement = await findByText("101.0 Total");
    expect(totalDeathsElement).toBeInTheDocument();

    // screen.debug(undefined, Infinity);
  });

  it("changes typeofCase when InfoBox is clicked", () => {
    const { getByText } = render(<App />);

    const newCases = getByText("worldwide new cases");
    fireEvent.click(getByText("Cases"));
    expect(newCases).toBeInTheDocument();

    fireEvent.click(getByText("Recovered"));
    const newRecovered = getByText("worldwide new recovered");
    expect(newRecovered).toBeInTheDocument();

    fireEvent.click(getByText("Deaths"));
    const newDeaths = getByText("worldwide new deaths");
    expect(newDeaths).toBeInTheDocument();
    // screen.debug(undefined, Infinity);
  });
  it("should display global data error component when fetching global data fails", async () => {
    // Mock fetch to simulate an error response for global data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 400,
      })
    );

    render(<App />);

    const errorComponentForGlobalData = await screen.findByTestId(
      "globalDataErrorComponent"
    );
    expect(errorComponentForGlobalData).toBeInTheDocument();
  });

  it("should display table data error component when fetching table data fails", async () => {
    // Mock fetch to simulate an error response for table data
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
        status: 400,
      })
    );

    render(<App />);

    const errorComponentForTableData = await screen.findByTestId(
      "tableDataErrorComponent"
    );
    expect(errorComponentForTableData).toBeInTheDocument();
  });

  it("should have 'Worldwide' as the default option in dropdown", async () => {
    render(<App />);
    const dropdownElement = screen.getByRole("option", { name: /Worldwide/i });
    expect(dropdownElement).toBeInTheDocument();
  });

  it("should change the country when a different option is selected", async () => {
    // Seting up mock data for the country-specific information.
    const mockCountryInfo = {
      todayCases: 100,
      cases: 1000,
      todayRecovered: 50,
      recovered: 500,
      todayDeaths: 10,
      deaths: 101,
    };

    // Seting up mock data for the list of countries.
    const mockCountriesData = [
      {
        country: "USA",
        countryInfo: {
          iso2: "US",
        },
      },
    ];

    // Mocking the global fetch function to return appropriate mock data based on the endpoint being accessed.
    global.fetch = jest.fn((url) => {
      // If the URL targets global data, return the mock country info.
      if (url.includes("/all")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockCountryInfo),
          ok: true,
        });
      }
      // If the URL targets country data, return the mock countries list.
      else if (url.includes("/countries")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockCountriesData),
          ok: true,
        });
      }
    });

    render(<App />);
    const user = userEvent.setup();

    // Check if the default value (worldwide) is selected
    expect(
      screen.getByRole("option", { name: /worldwide/i }).selected
    ).toBeTruthy();

    // this one can be used if you dont want to use testId (country-option)
    // const usaOption = await screen.findByRole("option", { name: /usa/i });

    // Waiting for the country options to populate in the dropdown.
    const usaOption = await waitFor(() => screen.getByTestId("country-option"));

    // Simulating a user action to select the "USA" option from the dropdown.
    user.selectOptions(screen.getByRole("combobox"), usaOption.value);

    // Debugging line to inspect rendered elements.
    screen.debug(undefined, Infinity);

    // Confirming that the "USA" option is now the selected option in the dropdown.
    await waitFor(() => {
      expect(screen.getByTestId("country-option").selected).toBeTruthy();

      // expect(usaOption.selected).toBeTruthy();
    });
  });
});
