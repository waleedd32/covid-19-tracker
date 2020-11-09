import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core"
import InfoBox from './InfoBox';
import Map from './Map';
import './App.css';
import Table from './Table';
import { sortData } from './util'
import LineGraph from './LineGraph';
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 })
  const [mapZoom, setMapZoom] = useState(3)
  //all countries: https://disease.sh/v3/covid-19/countries

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      });
  }, [])

  // using fetch to get countries data (name, value), then set to setCountries(countries)
  useEffect(() => {
    const getCountriesData = () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2
            }));
          let sortedData = sortData(data)

          // set table data to the sorted version
          setTableData(sortedData);

          setCountries(countries)
        })
    }
    getCountriesData();

  }, [])

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);
    // here is used backtick `` because it allows us to use javascript
    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      });
  };


  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header" >
          <h2>Lets build Coronavirus tracker !</h2>
          <FormControl className="app__dropdown" >
            <Select variant="outlined" onChange={onCountryChange} value={country} >

              <MenuItem value="worldwide">Worldwide</MenuItem>

              {/* looping through every country and show list of options as a drop down */}
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name} </MenuItem>

              ))}


            </Select>

          </FormControl>
        </div>

        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />

        </div>


        <Map center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table (list of countries and cases) */}
          <Table countries={tableData} />
          <h3>worldwide new cases</h3>
          <LineGraph />

        </CardContent>

      </Card>
    </div>
  );
}
export default App;
