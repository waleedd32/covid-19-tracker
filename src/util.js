import React from "react";
import { Circle, Popup } from "react-leaflet";
import numeral from "numeral";

const typeofCaseColors = {
  cases: {
    hex: "darkblue",
    rgb: "rgb(204, 16, 52)",
    half_op: "rgba(204, 16, 52, 0.5)",
    multiplier: 800,
  },
  recovered: {
    hex: "#7dd71d",
    multiplier: 1200,
  },
  deaths: {
    hex: "#fb4443",
    multiplier: 2000,
  },
};

export const sortData = (data) => {
  const sortedData = [...data];
  //sort the array in descending order
  sortedData.sort((a, b) => {
    return b.cases - a.cases;
  });
  return sortedData;
};
export const prettyPrintStat = (stat) =>
  stat ? `${numeral(stat).format("0.0a")}` : "0";

// drawing circles on map
export const showDataOnMap = (data, typeofCase = "cases") =>
  data
    .filter(
      (nation) =>
        nation.countryInfo && nation.countryInfo.lat && nation.countryInfo.long
    )
    .map((nation) => (
      <Circle
        key={nation.country}
        center={[nation.countryInfo.lat, nation.countryInfo.long]}
        fillOpacity={0.4}
        color={typeofCaseColors[typeofCase].hex}
        fillColor={typeofCaseColors[typeofCase].hex}
        radius={
          Math.sqrt(nation[typeofCase]) *
          typeofCaseColors[typeofCase].multiplier
        }
      >
        <Popup>
          <div className="info-container">
            <div
              className="info-flag"
              style={{ backgroundImage: `url(${nation.countryInfo.flag})` }}
            />
            <div className="info-name">{nation.country} </div>
            <div className="info-confirmed">
              Cases:{numeral(nation.cases).format("0")}{" "}
            </div>
            <div className="info-recovered">
              Recovered: {numeral(nation.recovered).format("0,0")}
            </div>
            <div className="info-deaths">
              Deaths: {numeral(nation.deaths).format("0,0")}
            </div>
          </div>
        </Popup>
      </Circle>
    ));
