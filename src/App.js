import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select } from "@material-ui/core"
import './App.css';

function App() {

  return (
    <div className="app">
      <h2>Lets build Coronairus tracker !</h2>
      <FormControl className="app__dropdown" >
        <Select variant="outlined"
          value="cde" >
          <MenuItem value="worldwide">Worldwide </MenuItem>
          <MenuItem value="worldwide">chosen 1 </MenuItem>
          <MenuItem value="worldwide">chosen 2 </MenuItem>
          <MenuItem value="worldwide">Yeees </MenuItem>

        </Select>

      </FormControl>
      {/* Header */}
      {/* Title + select input dropdown field */}
      {/* InfoBoxs these contain stats*/}
      {/* InfoBoxs */}
      {/* InfoBoxs */}
      {/* Table (list of countries and cases) */}
      {/* Graph */}
      {/* Map */}

    </div>
  );
}
export default App;
