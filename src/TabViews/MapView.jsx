import { useState } from "react";
import Map from "../Components/Map.jsx";
import ResultsCard from "../Components/ResultsCard.jsx";
import geojson from "../../data/Forenklet_Fylker.json";



function MapView() {


  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedRegion("");
    setSelectedSector("");
    setSelectedStatus("");
  };

  const handleRegionClick = (regionName) => {
    setSelectedRegion(regionName); // Update filter
  };

  return (
      <div className="flex flex-col gap-4 p-4 grow">
        {/* Filter Component */}
        <div className="w-full">
          <div className="flex items-center gap-4 p-4 w-full max-w-5xl mx-auto">
            <select
                className="select select-bordered flex-1"
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
            >
              <option value="">Sektor</option>
              <option>Helse</option>
              <option>Oppvekst</option>
              <option>Teknisk</option>
              <option>Social og Velferd</option>
              <option>Samferdsel</option>
            </select>
            <select
                className="select select-bordered flex-1"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Status</option>
              <option>I utvikling</option>
              <option>Avsluttet</option>
              <option>Pilot</option>
              <option>I drift</option>
            </select>
            <select
                className="select select-bordered flex-1"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
            >
              <option value="">Fylke</option>
              <option value="Møre og Romsdal">Møre og Romsdal</option>
              <option value="Telemark">Telemark</option>
              <option value="Innlandet">Innlandet</option>
              <option value="Buskerud">Buskerud</option>
              <option value="Vestland">Vestland</option>
              <option value="Vestfold">Vestfold</option>
              <option value="Rogaland">Rogaland</option>
              <option value="Agder">Agder</option>
              <option value="Oslo">Oslo</option>
              <option value="Østfold">Østfold</option>
              <option value="Akershus">Akershus</option>
              <option value="Finnmark - Finnmárku - Finmarkku">
                Finnmark - Finnmárku - Finmarkku
              </option>
              <option value="Troms - Romsa - Tromssa">Troms - Romsa - Tromssa</option>
              <option value="Trøndelag - Trööndelage">Trøndelag - Trööndelage</option>
              <option value="Nordland - Nordlánnda">Nordland - Nordlánnda</option>
            </select>

            <input
                type="text"
                placeholder="Søk"
                className="input input-bordered flex-1"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="btn w-3/12 p-2" onClick={handleResetFilters}>
              Nullstill
            </button>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-3 gap-4 grow relative h-screen">
          <div className="col-span-2 rounded shadow-md grow relative h-screen">
            <Map geojson={ geojson } onRegionClick={handleRegionClick} />
          </div>
          <div className="flex rounded shadow-md justify-center grow relative h-screen">
            <ResultsCard
                searchTerm={searchTerm}
                selectedRegion={selectedRegion}
                selectedSector={selectedSector}
                selectedStatus={selectedStatus}
            />
          </div>
        </div>
      </div>
  );
}

export default MapView;
