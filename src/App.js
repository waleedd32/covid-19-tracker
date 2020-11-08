import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core"
import InfoBox from './InfoBox';
import Map from './Map';

import './App.css';


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide")
  //all countries: https://disease.sh/v3/covid-19/countries

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
          setCountries(countries)

        })
    }
    getCountriesData();

  }, [])

  const onCountryChange = (event) => {
    const countryCode = event.target.value;
    console.log("I'm working >>>>>", countryCode)
    setCountry(countryCode);
  }


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
          <InfoBox title="Coronavirus Cases" cases={456} total={3000} />
          <InfoBox title="Recovered" cases={789} total={7000} />
          <InfoBox title="Deaths" cases={65544} total={5000} />

        </div>


        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          {/* Table (list of countries and cases) */}
          <h3>worldwide new cases</h3>

          {/* Graph */}
        </CardContent>

      </Card>
    </div>
  );
}
export default App;
