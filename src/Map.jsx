import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import ZoomToRegion from "./ZoomToRegion.jsx";

function Map({ geojson, selectedRegion, onRegionClick }) {

    const handleRegionClick = (event) => {
        const regionName = event.target.feature.properties.fylkesnavn; // Adjust based on your GeoJSON
        onRegionClick(regionName);
    };

    return (
        <MapContainer
            center={[63, 10]} // Default center
            zoom={5} // Default zoom
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GeoJSON data={geojson} onEachFeature={(feature, layer) => layer.on('click', handleRegionClick)}  />
            <ZoomToRegion geojson={geojson} selectedRegion={selectedRegion} />
        </MapContainer>
    );
}

export default Map;
