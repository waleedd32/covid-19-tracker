import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ApiErrorComponent from "../ApiErrorComponent";

describe("<ApiErrorComponent />", () => {
  const mockOnRetry = jest.fn();
  const mockOnToggleDetails = jest.fn();

  beforeEach(() => {
    render(
      <ApiErrorComponent
        onRetry={mockOnRetry}
        onToggleDetails={mockOnToggleDetails}
        isDetailsVisible={false}
        errorMsg="We couldn't fetch the data. Please try again."
      />
    );
  });

  it("renders error message correctly", () => {
    const errorMsg = screen.getByText(
      "We couldn't fetch the data. Please try again."
    );
    expect(errorMsg).toBeInTheDocument();
  });

  it("displays the correct title 'Oops! Something went wrong.'", () => {
    expect(screen.getByText("Oops! Something went wrong.")).toBeInTheDocument();
  });

  it("shows detailed message when isDetailsVisible is true", () => {
    render(
      <ApiErrorComponent
        onRetry={mockOnRetry}
        onToggleDetails={mockOnToggleDetails}
        isDetailsVisible={true}
        errorMsg="We couldn't fetch the data. Please try again."
      />
    );

    const detailedMsg = screen.getByText(
      "It looks like we're experiencing a server/API issue."
    );
    expect(detailedMsg).toBeInTheDocument();
  });

  it("does not show detailed message when isDetailsVisible is false", () => {
    render(
      <ApiErrorComponent
        onRetry={mockOnRetry}
        onToggleDetails={mockOnToggleDetails}
        isDetailsVisible={false}
        errorMsg="We couldn't fetch the data. Please try again."
      />
    );

    const detailedMsg = screen.queryByText(
      "It looks like we're experiencing a server/API issue."
    );
    expect(detailedMsg).not.toBeInTheDocument();
  });

  it("toggles error details visibility when 'Show Details' or 'Hide Details' is clicked", () => {
    const showDetailsBtn = screen.getByText("Show Details");
    fireEvent.click(showDetailsBtn);
    expect(mockOnToggleDetails).toHaveBeenCalledTimes(1);

    // Assuming you rerender with isDetailsVisible as true
    render(
      <ApiErrorComponent
        onRetry={mockOnRetry}
        onToggleDetails={mockOnToggleDetails}
        isDetailsVisible={true}
        errorMsg="We couldn't fetch the data. Please try again."
      />
    );
    const hideDetailsBtn = screen.getByText("Hide Details");
    fireEvent.click(hideDetailsBtn);
    expect(mockOnToggleDetails).toHaveBeenCalledTimes(2);
  });

  it("triggers onRetry callback when 'Try Again' is clicked", () => {
    const tryAgainBtn = screen.getByText("Try Again");
    fireEvent.click(tryAgainBtn);
    expect(mockOnRetry).toHaveBeenCalledTimes(1);
  });
});
