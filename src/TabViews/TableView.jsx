import {useEffect, useState} from "react";
import axios from "axios";

function TableView() {
  // State for filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSector, setSelectedSector] = useState("");


  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    console.log("useEffect running in DataProvider (axios version)");

    axios.get('http://localhost:5000/api/v1/read-projects')
        .then(response => {
          console.log("Fetched data:", response.data);
          setProjects(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          // If available, log additional details:
          if (error.response) {
            console.error("Response error data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          } else if (error.request) {
            console.error("No response received. Request was:", error.request);
          } else {
            console.error("Error", error.message);
          }
        }, []);
  });

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
            {[...new Set(projects.map((p) => p.region))].map((region) => (
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
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
          >
            <option value="">Sektor</option>
            {[...new Set(projects.map((p) => p.sector))].map((sector) => (
                <option key={sector} value={sector}>
                  {sector}
                </option>
            ))}
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
                  <h2 className="card-title">{selectedProject.title}</h2>
                  <p className="text-gray-600">
                    {selectedProject.description}
                  </p>
                  <div className="mt-4">
                    <p>
                      <strong>Eier:</strong> {selectedProject.owner}
                    </p>
                    <p>
                      <strong>Region:</strong> {selectedProject.region}
                    </p>
                    <p>
                      <strong>Status:</strong> {selectedProject.status}
                    </p>
                    <p>
                      <strong>Sektor:</strong> {selectedProject.sector}
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
