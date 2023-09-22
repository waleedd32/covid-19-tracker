import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import "./InfoBox.css";
import { Card, CardContent, Typography } from "@material-ui/core";

function InfoBox({
  title,
  cases,
  isRed,
  active,
  activetored,
  total,
  globalDataStatus,
  ...props
}) {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} 
            ${activetored && "infoBox--selectedtored"}
            ${isRed && "infoBox--red"} `}
    >
      <CardContent>
        {/* here comes titles */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>
        {globalDataStatus === "loading" ? (
          <Skeleton variant="rect" />
        ) : globalDataStatus === "success" ? (
          <>
            {/* here comes cases */}
            <h2
              className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}
            >
              {cases}
            </h2>
            {/* here comes total */}
            <Typography className="infoBox__total" color="textSecondary">
              {total} Total
            </Typography>
          </>
        ) : (
          "Error"
        )}
      </CardContent>
    </Card>
  );
}

export default InfoBox;
