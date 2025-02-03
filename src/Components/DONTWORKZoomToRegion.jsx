import { useMap } from "react-leaflet";
import { useEffect } from "react";

const ZoomToRegion = ({ selectedRegion, geojson }) => {
    const map = useMap();

    useEffect(() => {
        console.log("useEffect triggered!");
        console.log("Selected Region:", selectedRegion);
        console.log("GeoJSON Data:", geojson);

        if (selectedRegion && geojson) {
            // Log all available region names for debugging
            const availableRegions = geojson.features.map(feature => feature.properties.fylkesnavn);
            console.log("Available Regions:", availableRegions);

            // Find the feature in the GeoJSON based on fylkesnavn
            const region = geojson.features.find(
                (feature) => feature.properties.fylkesnavn === selectedRegion
            );

            if (region) {
                console.log("Region Found:", region);

                // Extract coordinates and calculate bounds
                const coordinates = region.geometry.coordinates[0];

                if (!coordinates || coordinates.length === 0) {
                    console.warn("No coordinates found for region:", selectedRegion);
                    return;
                }

                const bounds = coordinates.map(([lng, lat]) => [lat, lng]);
                console.log("Bounds Calculated:", bounds);

                // Fit the map to the bounds
                map.fitBounds(bounds);
            } else {
                console.warn(`Region not found for: ${selectedRegion}`);
            }
        }
    }, [selectedRegion, geojson, map]);

    return null; // This component doesn't render anything visually
};

export default ZoomToRegion;
