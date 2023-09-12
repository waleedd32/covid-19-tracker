import React, { useState, useEffect } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
  Button,
} from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import "./App.css";
import Table from "./Table";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";
import Footer from "./Footer";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapcountries] = useState([]);
  const [typeofCase, setTypeofCase] = useState("cases");
  const [apiStatus, setApiStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [showDetails, setShowDetails] = useState(false); // Initialize state

  //all countries: https://disease.sh/v3/covid-19/countries

  const fetchData = async () => {
    try {
      const response = await fetch("https://disease.sh/v3/covid-19/all");
      if (!response.ok) {
        console.error(`HTTP Error: ${response.status}`);
        setApiStatus("error");
        return;
      }
      const data = await response.json();
      setCountryInfo(data);
      setApiStatus("success");
    } catch (error) {
      console.error("An error occurred while fetching global data:", error);
      setApiStatus("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // using fetch to get countries data (name, value), then set to setCountries(countries)
  useEffect(() => {
    const getCountriesData = async () => {
      try {
        const response = await fetch(
          "https://disease.sh/v3/covid-19/countries"
        );
        if (!response.ok) {
          console.error(`HTTP Error: ${response.status}`);
          return;
        }
        const data = await response.json();
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        const sortedData = sortData(data);
        setTableData(sortedData);
        setMapcountries(data);
        setCountries(countries);
      } catch (error) {
        console.error("An error occurred while fetching countries:", error);
      }
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`HTTP Error: ${response.status}`);
        return;
      }
      const data = await response.json();
      setCountryInfo(data);

      if (countryCode !== "worldwide") {
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      } else {
        setMapCenter({ lat: 20.5937, lng: 78.9629 });
        setMapZoom(3);
      }
    } catch (error) {
      console.error(
        `An error occurred while fetching data for ${countryCode}:`,
        error
      );
    }
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>CORONAVIRUS LIVE</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country, index) => (
                <MenuItem key={index} value={country.value}>
                  {country.name}{" "}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          {apiStatus === "error" ? (
            <div>
              <h2>Oops! Something went wrong.</h2>
              <p>We couldn't fetch the data. Please try again.</p>
              <div className="button-container">
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? "Hide Details" : "Show Details"}
                </Button>
                {showDetails && (
                  <p>It looks like we're experiencing a server/API issue.</p>
                )}
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={fetchData}
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : (
            <>
              <InfoBox
                apiStatus={apiStatus}
                isRed
                active={typeofCase === "cases"}
                onClick={(e) => setTypeofCase("cases")}
                title="Cases"
                cases={prettyPrintStat(countryInfo.todayCases)}
                total={prettyPrintStat(countryInfo.cases)}
              />
              <InfoBox
                apiStatus={apiStatus}
                isGreen
                active={typeofCase === "recovered"}
                onClick={(e) => setTypeofCase("recovered")}
                title="Recovered"
                cases={prettyPrintStat(countryInfo.todayRecovered)}
                total={prettyPrintStat(countryInfo.recovered)}
              />
              <InfoBox
                apiStatus={apiStatus}
                isRed
                activetored={typeofCase === "deaths"}
                onClick={(e) => setTypeofCase("deaths")}
                title="Deaths"
                cases={prettyPrintStat(countryInfo.todayDeaths)}
                total={prettyPrintStat(countryInfo.deaths)}
              />
            </>
          )}
        </div>
        <Map
          typeofCase={typeofCase}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live Cases by Country</h3>
            {/* Table (list of countries and cases) */}
            <Table countries={tableData} />
            <h3 className="app__graph__title">worldwide new {typeofCase}</h3>
            <LineGraph className="app__graph" typeofCase={typeofCase} />
          </CardContent>
        </Card>
        <Footer />
      </div>
    </div>
  );
}
export default App;
