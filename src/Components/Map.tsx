import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import {FylkeFeatureCollection} from "../Types/types";
import { useState } from "react";

type MapProps = {
    geojson: FylkeFeatureCollection;
    onFylkeClick: (fylkeName: string) => void;
}

function Map({ geojson, onFylkeClick }: MapProps): JSX.Element {
    var balls = useState<any>(null);
    const [hoveredFeature, setHoveredFeature] = useState<any>(null);
    const handleFylkeClick = (event) => {
        const fylkeName = event.target.feature.properties.fylkesnavn; // Adjust based on your GeoJSON
        onFylkeClick(fylkeName);
        //
        /*
        event.target.setStyle({
            fillColor: "#ffff88", // Highlight color
            weight: 5,
            opacity: 1,
            fillOpacity: 0.7
        });
        balls = event.target;
        */
    };
    const handleMouseOver = (event) => {
        // When hovering over a feature, only show that one
        setHoveredFeature(event.target);

        // Optionally, add a highlight style to make the hover effect clearer
        event.target.setStyle({
            fillColor: "#ff7800", // Highlight color
            weight: 5,
            opacity: 1,
            fillOpacity: 0.7
        });
    };
    const handleMouseOut = (event) => {
        // Reset the feature style when the mouse leaves
        /*
        if (event.target == balls)
            return;
        */
        event.target.setStyle({
            fillColor: "#3388ff", // Highlight color
            weight: 3,
            opacity: 1,
            fillOpacity: 0.4
        });
    };
    
    //geojson.features = geojson.features.filter((feature) => feature.properties.fylkesnavn === "Agder");

    // @ts-ignore

    return (
        // @ts-ignore
        <MapContainer
            center={[63, 10]} // Default center
            zoom={5} // Default zoom
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <GeoJSON 
                data={geojson} // Directly passing the mutated geojson
                onEachFeature={(feature, layer) => {
                    layer.on('click', handleFylkeClick);
                    layer.on('mouseover', handleMouseOver); // Show feature on hover
                    layer.on('mouseout', handleMouseOut);   // Reset on mouseout
                }} 
            />
        </MapContainer>
    );
}

export default Map;
