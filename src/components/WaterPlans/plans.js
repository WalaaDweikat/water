import "./plans.css";

import RoutingMachine from "./RoutineMachine";
import { useState } from "react";
import { MapContainer, TileLayer, Circle, useMapEvents } from "react-leaflet";
const a = [];
const Markers = () => {
  const [points, setPoints] = useState(a);
  const [position, setPosition] = useState("");
  const map = useMapEvents({
    click(e) {
      a.push(e.latlng);
      setPoints(a);
      console.log(points);
      setPosition(e.latlng);
    },
  });

  return position ? (
    <Circle
      center={{ lat: position.lat, lng: position.lng }}
      fillColor="blue"
      radius={5}
    />
  ) : null;
};
export default function WaterPlans() {
  return (
    <MapContainer
      center={[32.131596, 35.205]}
      zoom={17}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Markers />
      <RoutingMachine />
    </MapContainer>
  );
}