import React from "react";
import { Button } from "@material-ui/core";

const ApiErrorComponent = ({
  onRetry,
  onToggleDetails,
  isDetailsVisible,
  errorMsg,
}) => {
  return (
    <div className="app__tableError">
      <h2>Oops! Something went wrong.</h2>
      <p>{errorMsg}</p>
      <div className="button-container">
        <Button variant="outlined" color="primary" onClick={onToggleDetails}>
          {isDetailsVisible ? "Hide Details" : "Show Details"}
        </Button>
        {isDetailsVisible && (
          <p>It looks like we're experiencing a server/API issue.</p>
        )}
        <Button variant="contained" color="secondary" onClick={onRetry}>
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ApiErrorComponent;
