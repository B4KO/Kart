import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import fylkeData from "./Forenklet_Fylker.json";

function MapView() {
  console.log(fylkeData);

  return (
    <>
      <MapContainer
        center={[64, 12]} // Center over Norway
        zoom={5}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {fylkeData && <GeoJSON data={fylkeData.features} />}
      </MapContainer>
    </>
  );
}

export default MapView;
