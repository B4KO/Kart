import {useContext, useState} from "react";
import Map from "../Components/Map.jsx";
import ResultsCard from "../Components/ResultsCard.jsx";
import geojson from "../../data/Forenklet_Fylker.json";
import {DataContext} from "../DataContext.jsx";


function MapView() {

  const projects = useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFylke, setSelectedFylke] = useState("");
  const [selectedSektor, setSelectedSektor] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedFylke("");
    setSelectedSektor("");
    setSelectedStatus("");
  };

  const handleFylkeClick = (fylkeName) => {
    setSelectedFylke(fylkeName); // Update filter
  };

  return (
      <div className="flex flex-col gap-4 p-4 grow">
        {/* Filter Component */}
        <div className="w-full">
          <div className="flex items-center gap-4">
            <select
                className="select select-bordered flex-1"
                value={selectedSektor}
                onChange={(e) => setSelectedSektor(e.target.value)}
            >
              <option value="">Sektor</option>
              {[...new Set(projects.map((p) => p.sector))].map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
              ))}
            </select>
            <select
                className="select select-bordered flex-1"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Status</option>
              {[...new Set(projects.map((p) => p.status))].map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
              ))}
            </select>
            <select
                className="select select-bordered flex-1"
                value={selectedFylke}
                onChange={(e) => setSelectedFylke(e.target.value)}
            >
              <option value="">Fylke</option>
              {[...new Set(projects.map((p) => p.region))].map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
              ))}
            </select>

            <input
                type="text"
                placeholder="Søk"
                className="input input-bordered flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn" onClick={handleResetFilters}>
              Nullstill
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-3 gap-4 grow relative h-screen">
          <div className="col-span-2 rounded shadow-md grow relative h-screen">
            <Map geojson={ geojson } onFylkeClick={handleFylkeClick} />
          </div>
          <div className="flex rounded shadow-md justify-center grow relative h-screen">
            <ResultsCard
                searchTerm={searchTerm}
                selectedFylke={selectedFylke}
                selectedSektor={selectedSektor}
                selectedStatus={selectedStatus}
            />
          </div>
        </div>
      </div>
  );
}

export default MapView;
