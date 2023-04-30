import React, { Component } from "react";
import L from "leaflet";
import { Modal, Button } from "react-bootstrap";

import "leaflet/dist/leaflet.css";

const icon = L.icon({
  iconUrl: "/images/location-pin.png",
  iconSize: [20, 20],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      marker: null,
      coords: [-1.9300352, 30.14656],
      zoom: 20,
    };
  }

  componentDidMount() {
    const map = L.map("map").setView(this.state.coords, this.state.zoom);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data &copy; OpenStreetMap contributors",
    }).addTo(map);
    const marker = L.marker(this.state.coords, { icon: icon }).addTo(map);
    this.setState({ map, marker });
  }

  render() {
    return <div id="map" style={{ width: "100%", height: "500px" }}></div>;
  }
}

export default Map;
