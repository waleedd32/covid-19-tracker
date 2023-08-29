import React from "react";
import "./Map.css";
import { Map as LeafletMap, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./util";

function Map({ countries, center, zoom, typeofCase }) {
  return (
    <div className="map">
      <LeafletMap center={center} zoom={zoom}>
        {/* TileLayer is standard thing to include */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Looping through countries and drawing circles on the map */}
        {showDataOnMap(countries, typeofCase)}
      </LeafletMap>
    </div>
  );
}

export default Map;
