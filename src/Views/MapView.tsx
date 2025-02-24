import Map from "../Components/Map";
import ResultsCard from "../Components/ResultsCard";
import geoJsonData from "../../data/Forenklet_Fylker.json";
import {FylkeFeatureCollection, ProjectInterface} from "../Types/types";

export type MapViewProps = {
    projects: ProjectInterface[];
    onFylkeClick: (fylkeName: string) => void;
}

function MapView({ projects, onFylkeClick } : MapViewProps) : JSX.Element {
    // @ts-ignore
    const geojson: FylkeFeatureCollection = geoJsonData;
  const handleFylkeClick = (fylkeName : string) => {
    onFylkeClick(fylkeName); // Update filter
  };

  return (
      <div className="flex flex-col gap-4 p-4 grow">
        {/* Main Layout */}
        <div className="grid grid-cols-3 gap-4 grow relative h-screen">
          <div className="col-span-2 rounded shadow-md grow relative h-screen">
            <Map geojson={ geojson } onFylkeClick={handleFylkeClick} />
          </div>
          <div className="flex rounded shadow-md justify-center grow relative h-screen">
            <ResultsCard
                projects={projects}
            />
          </div>
        </div>
      </div>
  );
}

export default MapView;
