import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {FylkeFeatureCollection} from "../Types/types";

type MapProps = {
    geojson: FylkeFeatureCollection;
    onFylkeClick: (fylkeName: string) => void;
}

function Map({ geojson, onFylkeClick }: MapProps): JSX.Element {

    const handleFylkeClick = (event) => {
        const fylkeName = event.target.feature.properties.fylkesnavn; // Adjust based on your GeoJSON
        onFylkeClick(fylkeName);
    };

    // @ts-ignore

    return (
        <MapContainer
            center={[63, 10]} // Default center
            zoom={5} // Default zoom
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GeoJSON data={geojson} onEachFeature={(feature, layer) => layer.on('click', handleFylkeClick)}></GeoJSON>

        </MapContainer>
    );
}

export default Map;
