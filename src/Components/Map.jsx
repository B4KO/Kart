import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map({ geojson, onFylkeClick }) {

    const handleFylkeClick = (event) => {
        const fylkeName = event.target.feature.properties.fylkesnavn; // Adjust based on your GeoJSON
        onFylkeClick(fylkeName);
    };

    return (
        <MapContainer
            center={[63, 10]} // Default center
            zoom={5} // Default zoom
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GeoJSON data={geojson} onEachFeature={(feature, layer) => layer.on('click', handleFylkeClick)}  />

        </MapContainer>
    );
}

export default Map;
