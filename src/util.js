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
    const sortedData = [...data]
    //sort the array in descending order
    sortedData.sort((a, b) => {
        return b.cases - a.cases
    }
    );
    return sortedData;
}
// drawing circles on map
export const showDataOnMap = (data, typeofCase = 'cases') => (
    data.map(nation => (
        <Circle center={[nation.countryInfo.lat, nation.countryInfo.long]}
            fillOpacity={0.4}
            color={typeofCaseColors[typeofCase].hex}
            fillColor={typeofCaseColors[typeofCase].hex}
            radius={
                Math.sqrt(nation[typeofCase]) * typeofCaseColors[typeofCase].multiplier
            }
        >
            <Popup>
                <h2>popup</h2>
            </Popup>
        </Circle>
    )))
