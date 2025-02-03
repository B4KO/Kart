import { useContext, useState } from "react";
import { DataContext } from "../DataContext";

function TableView() {
  // State for filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  // Get projects from context.
  // (Assume that your DataContext provides an array of objects as shown in your JSON)
  const projects = useContext(DataContext);
  console.log(projects);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  // Note: In your JSON, you have keys like:
  // - Prosjekttittel          → title
  // - Beskrivelse av prosjekt  → description
  // - Prosjekteier             → owner
  // - Region                   → region
  // - Eiertype                 → sector (or you may choose another field)
  // - Status                   → status
  // If your JSON objects do not have a unique id, you might use the title or index as key.

  // Filtered data based on search term, region, status, and sector.
  // (Adjust the filter criteria as needed.)
  const filteredProjects = projects.filter((project) => {
    return (
        (selectedRegion === "" || project.Region === selectedRegion) &&
        (selectedStatus === "" || project.Status === selectedStatus) &&
        (selectedSector === "" || project["Eiertype"] === selectedSector) &&
        (searchTerm === "" ||
            project.Prosjekttittel.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project["Beskrivelse av prosjekt"].toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / pageSize);

  // Calculate the slice for the current page
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Reset filters
  const handleResetFilters = () => {
    setSearchTerm("");
    setSelectedRegion("");
    setSelectedStatus("");
    setSelectedSector("");
    setCurrentPage(0);
  };

  const [selectedProject, setSelectedProject] = useState(null);

  return (
      <div className="w-full">
        {/* Filter section */}
        <div className="flex items-center gap-4 p-4">
          <select
              className="select select-bordered flex-1"
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">Region</option>
            {/* Adjust these options to match the regions in your data */}
            <option value="Agder">Agder</option>
            <option value="Akershus">Akershus</option>
            <option value="Oslo">Oslo</option>
            <option value="Vestland">Vestland</option>
            <option value="Nordland">Nordland</option>
          </select>
          <select
              className="select select-bordered flex-1"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">Status</option>
            {/* Update these to match the Status values in your JSON */}
            <option value="Pågår">Pågår</option>
            <option value="Avsluttet">Avsluttet</option>
            <option value="Planlagt">Planlagt</option>
            {/* If needed, add other status values */}
          </select>
          <select
              className="select select-bordered flex-1"
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
          >
            <option value="">Sektor</option>
            {/* In your JSON, "Eiertype" contains values like "Annet", "Statlig selskap", etc.
              Update the options as needed. */}
            <option value="Annet">Annet</option>
            <option value="Statlig selskap">Statlig selskap</option>
            <option value="Statlig virksomhet">Statlig virksomhet</option>
            <option value="Kommunal sektor">Kommunal sektor</option>
          </select>
          <input
              type="text"
              placeholder="Search"
              className="input input-bordered flex-1"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn" onClick={handleResetFilters}>
            Nullstill
          </button>
        </div>

        {/* Table section */}
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
            <tr>
              <th>Prosjektnavn</th>
              <th>Region</th>
              <th>Eier</th>
              <th>Sektor</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            {currentProjects.map((project, index) => (
                <tr key={index}>
                  <td>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold">{project.Prosjekttittel}</span>
                      <span className="text-sm opacity-60">
                      {project["Beskrivelse av prosjekt"]}
                    </span>
                    </div>
                  </td>
                  <td>{project.Region}</td>
                  <td>{project.Prosjekteier}</td>
                  <td>{project["Eiertype"]}</td>
                  <td>
                    <button
                        className="btn btn-ghost btn-xs"
                        onClick={() => setSelectedProject(project)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>

          {/* Pagination controls */}
          <div className="join flex items-center justify-between mt-4">
            <button
                className="join-item btn btn-outline"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                disabled={currentPage === 0}
            >
              Previous
            </button>
            <span>
            Page {currentPage + 1} of {totalPages}
          </span>
            <button
                className="join-item btn btn-outline"
                onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))
                }
                disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>

        {/* Modal for project details */}
        {selectedProject && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="card lg:card-side bg-base-100 shadow-xl w-2/3 p-6">
                <figure>
                  <img
                      src="https://img.daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.webp"
                      alt="Project Image"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{selectedProject.Prosjekttittel}</h2>
                  <p className="text-gray-600">
                    {selectedProject["Beskrivelse av prosjekt"]}
                  </p>
                  <div className="mt-4">
                    <p>
                      <strong>Eier:</strong> {selectedProject.Prosjekteier}
                    </p>
                    <p>
                      <strong>Region:</strong> {selectedProject.Region}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedProject.Status}
                    </p>
                    <p>
                      <strong>Sektor:</strong> {selectedProject["Eiertype"]}
                    </p>
                  </div>
                  <div className="card-actions justify-end">
                    <button
                        className="btn btn-error"
                        onClick={() => setSelectedProject(null)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
  );
}

export default TableView;
