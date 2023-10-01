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
import ApiErrorComponent from "./ApiErrorComponent";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapcountries] = useState([]);
  const [selectedCaseType, setSelectedCaseType] = useState("cases");
  const [globalDataStatus, setGlobalDataStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [isGlobalDataDetailsVisible, setIsGlobalDataDetailsVisible] =
    useState(false); // Initialize state
  const [tableApiStatus, setTableApiStatus] = useState("loading"); // 'loading', 'success', 'error'
  const [isTableDetailsVisible, setIsTableDetailsVisible] = useState(false); // Initialize state

  //all countries: https://disease.sh/v3/covid-19/countries

  const fetchData = async () => {
    try {
      const response = await fetch("https://disease.sh/v3/covid-19/all");
      if (!response.ok) {
        console.error(`HTTP Error: ${response.status}`);
        setGlobalDataStatus("error");
        return;
      }
      const data = await response.json();
      setCountryInfo(data);
      setGlobalDataStatus("success");
    } catch (error) {
      console.error("An error occurred while fetching global data:", error);
      setGlobalDataStatus("error");
    }
  };

  // using fetch to get countries data (name, value), then set to setCountries(countries)
  const getCountriesData = async () => {
    try {
      const response = await fetch("https://disease.sh/v3/covid-19/countries");
      if (!response.ok) {
        console.error(`HTTP Error: ${response.status}`);
        setTableApiStatus("error");

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
      setTableApiStatus("success");
    } catch (error) {
      console.error("An error occurred while fetching countries:", error);
      setTableApiStatus("error");
    }
  };

  useEffect(() => {
    fetchData();
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
          {globalDataStatus === "error" ? (
            <ApiErrorComponent
              data-testid="globalDataErrorComponent"
              onRetry={fetchData}
              onToggleDetails={() =>
                setIsGlobalDataDetailsVisible(!isGlobalDataDetailsVisible)
              }
              isDetailsVisible={isGlobalDataDetailsVisible}
              errorMsg="We couldn't fetch the data. Please try again."
            />
          ) : (
            <>
              <InfoBox
                globalDataStatus={globalDataStatus}
                isRed
                active={selectedCaseType === "cases"}
                onClick={(e) => setSelectedCaseType("cases")}
                title="Cases"
                cases={prettyPrintStat(countryInfo.todayCases)}
                total={prettyPrintStat(countryInfo.cases)}
              />
              <InfoBox
                globalDataStatus={globalDataStatus}
                isGreen
                active={selectedCaseType === "recovered"}
                onClick={(e) => setSelectedCaseType("recovered")}
                title="Recovered"
                cases={prettyPrintStat(countryInfo.todayRecovered)}
                total={prettyPrintStat(countryInfo.recovered)}
              />
              <InfoBox
                globalDataStatus={globalDataStatus}
                isRed
                activetored={selectedCaseType === "deaths"}
                onClick={(e) => setSelectedCaseType("deaths")}
                title="Deaths"
                cases={prettyPrintStat(countryInfo.todayDeaths)}
                total={prettyPrintStat(countryInfo.deaths)}
              />
            </>
          )}
        </div>
        <Map
          selectedCaseType={selectedCaseType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live Cases by Country</h3>

            <div>
              {tableApiStatus === "error" ? (
                <ApiErrorComponent
                  data-testid="tableDataErrorComponent"
                  onRetry={getCountriesData}
                  onToggleDetails={() =>
                    setIsTableDetailsVisible(!isTableDetailsVisible)
                  }
                  isDetailsVisible={isTableDetailsVisible}
                  errorMsg="We couldn't fetch the data for the table. Please try again."
                />
              ) : (
                <Table countries={tableData} />
              )}
            </div>
            <h3 className="app__graph__title">
              worldwide new {selectedCaseType}
            </h3>
            <LineGraph
              className="app__graph"
              selectedCaseType={selectedCaseType}
            />
          </CardContent>
        </Card>
        <Footer />
      </div>
    </div>
  );
}
export default App;
