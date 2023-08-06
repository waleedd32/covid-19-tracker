import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries }) {
  return (
    <div className="table">
      {/* here we have done destructuring(split it a part) */}
      {countries.map(({ country, cases, countryInfo }) => (
        <tr>
          <td>
            <div>
              {" "}
              <img
                src={countryInfo.flag}
                style={{ height: "23px", width: "35px" }}
              />
            </div>
          </td>
          <td>{country} </td>
          <td>
            <strong> {numeral(cases).format("0,0")} </strong>
          </td>{" "}
        </tr>
      ))}
    </div>
  );
}

export default Table;
