import { useState } from "react";
import ContentCard from "./ContentCard";

function ResultsCard() {
  // Example data
  const projects = [
    {
      projectId: 1,
      owner: "Ricardo",
      region: "Rogaland",
      title: "Campus Food Delivery App",
      sector: "Teknisk",
    },
    {
      projectId: 2,
      owner: "John Doe",
      region: "Oslo",
      title: "Green Energy Optimization",
      sector: "Helse",
    },
    {
      projectId: 3,
      owner: "Maria Hansen",
      region: "Vestland",
      title: "Smart Home Automation",
      sector: "Teknisk",
    },
    {
      projectId: 4,
      owner: "Emma Olsen",
      region: "Trøndelag",
      title: "Arctic Wildlife Conservation",
      sector: "Social og Velferd",
    },
    {
      projectId: 5,
      owner: "Lars Eriksen",
      region: "Nordland",
      title: "Fjord Tourism Platform",
      sector: "Samferdsel",
    },
    {
      projectId: 6,
      owner: "Sofia Andersen",
      region: "Troms og Finnmark",
      title: "Northern Lights Photography Hub",
      sector: "Oppvekst",
    },
    {
      projectId: 7,
      owner: "Kasper Nielsen",
      region: "Innlandet",
      title: "Rural Agriculture Innovation",
      sector: "Social og Velferd",
    },
    {
      projectId: 8,
      owner: "Elise Johansen",
      region: "Agder",
      title: "Coastal Cleanup Initiative",
      sector: "Teknisk",
    },
    {
      projectId: 9,
      owner: "Henrik Pedersen",
      region: "Møre og Romsdal",
      title: "Offshore Wind Energy Development",
      sector: "Helse",
    },
    {
      projectId: 10,
      owner: "Anna Berg",
      region: "Viken",
      title: "Urban Mobility Solutions",
      sector: "Samferdsel",
    },
  ];

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  // Track the selected project
  const [selectedProject, setSelectedProject] = useState(null);

  // Handle filtering
  const filteredProjects = projects.filter((project) => {
    return (
      (selectedRegion === "" || project.region === selectedRegion) &&
      (selectedSector === "" || project.sector === selectedSector) &&
      (searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / pageSize);
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Handle row click
  const handleRowClick = (project) => {
    setSelectedProject(project);
  };

  // Close the content card
  const handleCloseCard = () => {
    setSelectedProject(null);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedRegion("");
    setSelectedSector("");
    setCurrentPage(0);
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      {/* Filter component */}
      <div className="w-full">
        <div className="flex items-center gap-4 p-4 w-full max-w-5xl mx-auto flex-wrap">
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
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">Fylke</option>
            <option>Rogaland</option>
            <option>Oslo</option>
            <option>Vestland</option>
            <option>Trøndelag</option>
            <option>Nordland</option>
            <option>Troms og Finnmark</option>
            <option>Innlandet</option>
            <option>Agder</option>
            <option>Møre og Romsdal</option>
            <option>Viken</option>
          </select>
          <input
            type="text"
            placeholder="Søk"
            className="input input-bordered flex-1"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn w-full p-2" onClick={handleResetFilters}>
            Nullstill
          </button>
        </div>
      </div>

      {/* Table or ContentCard */}
      {!selectedProject && (
        <div className="card card-compact bg-base-100 w-full h-full p-0 shadow-xl">
          <div className="card-body w-full h-full">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr>
                    <th>Prosjektnavn</th>
                    <th>Fylke</th>
                    <th>Sektor</th>
                    <th>Eier</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProjects.map((project) => (
                    <tr
                      key={project.projectId}
                      onClick={() => handleRowClick(project)}
                      className="hover:bg-gray-100 cursor-pointer"
                    >
                      <td>{project.title}</td>
                      <td>{project.region}</td>
                      <td>{project.sector}</td>
                      <td>{project.owner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Pagination Controls */}
          <div className="join grid grid-cols-3 gap-2 p-4">
            <button
              className="join-item btn btn-outline"
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            <div className="flex items-center justify-center">
              Page {currentPage + 1} of {totalPages}
            </div>
            <button
              className="join-item btn btn-outline"
              onClick={() =>
                setCurrentPage((p) => Math.min(p + 1, totalPages - 1))
              }
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {selectedProject && (
        <ContentCard project={selectedProject} onClose={handleCloseCard} />
      )}
    </div>
  );
}

export default ResultsCard;
