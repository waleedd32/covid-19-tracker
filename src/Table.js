import React from "react";
import "./Table.css";
import numeral from "numeral";
import fallbackImage from "./countries.png";

function Table({ countries }) {
  return (
    <div className="table">
      <table>
        <tbody>
          {countries.map(({ country, cases, countryInfo }) => (
            <tr key={country}>
              <td>
                <div>
                  <img
                    src={countryInfo.flag}
                    alt={`${country}'s flag`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackImage;
                    }}
                    style={{ height: "23px", width: "35px" }}
                  />
                </div>
              </td>
              <td>{country}</td>
              <td>
                <strong>{numeral(cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
