import Map from "../Components/Map.jsx";
import ResultsCard from "../Components/ResultsCard.jsx";
import geojson from "../../data/Forenklet_Fylker.json";


function MapView({ projects, onFylkeClick }) {

  const handleFylkeClick = (fylkeName) => {
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
