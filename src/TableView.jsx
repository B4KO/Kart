import { useState } from "react";

function TableView() {
  // Example: load the data locally or via an import
  const testData = {
    projects: [
      {
        projectId: 1,
        owner: "Ricardo",
        region: "Rogaland",
        title: "Campus Food Delivery App",
        description:
          "A food delivery app for campus, similar to Foodora, built with ASP.NET Core and Entity Framework Core.",
        status: "In Progress",
        sector: "Teknisk",
        contact: {
          email: "ricardo@example.com",
          phone: "+47 123 456 78",
        },
      },
      {
        projectId: 2,
        owner: "John Doe",
        region: "Oslo",
        title: "Green Energy Optimization",
        description:
          "A project focused on optimizing renewable energy production using AI and machine learning.",
        status: "Completed",
        sector: "Helse",
        contact: {
          email: "john.doe@example.com",
          phone: "+47 987 654 32",
        },
      },
      {
        projectId: 3,
        owner: "Maria Hansen",
        region: "Vestland",
        title: "Smart Home Automation",
        description:
          "Developing an IoT-based smart home automation system with enhanced security and energy-saving features.",
        status: "In Progress",
        sector: "Teknisk",
        contact: {
          email: "maria.hansen@example.com",
          phone: "+47 456 789 01",
        },
      },
      {
        projectId: 4,
        owner: "Emma Olsen",
        region: "Trøndelag",
        title: "Arctic Wildlife Conservation",
        description:
          "A research initiative to track and protect endangered arctic wildlife using drone technology.",
        status: "Planning",
        sector: "Social og Velferd",
        contact: {
          email: "emma.olsen@example.com",
          phone: "+47 654 321 09",
        },
      },
      {
        projectId: 5,
        owner: "Lars Eriksen",
        region: "Nordland",
        title: "Fjord Tourism Platform",
        description:
          "An app to promote tourism in Norwegian fjords by providing booking services and local guides.",
        status: "In Progress",
        sector: "Samferdsel",
        contact: {
          email: "lars.eriksen@example.com",
          phone: "+47 321 654 98",
        },
      },
      {
        projectId: 6,
        owner: "Sofia Andersen",
        region: "Troms og Finnmark",
        title: "Northern Lights Photography Hub",
        description:
          "A community-driven platform for sharing and learning about Northern Lights photography.",
        status: "Completed",
        sector: "Oppvekst",
        contact: {
          email: "sofia.andersen@example.com",
          phone: "+47 789 123 45",
        },
      },
    ],
  };

  // State for filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(5);

  // The complete data array
  const projects = testData.projects;

  // Filtered data based on search term, region, status, and sector
  const filteredProjects = projects.filter((project) => {
    return (
      (selectedRegion === "" || project.region === selectedRegion) &&
      (selectedStatus === "" || project.status === selectedStatus) &&
      (selectedSector === "" || project.sector === selectedSector) &&
      (searchTerm === "" ||
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()))
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
          <option value="Rogaland">Rogaland</option>
          <option value="Oslo">Oslo</option>
          <option value="Vestland">Vestland</option>
          <option value="Trøndelag">Trøndelag</option>
          <option value="Nordland">Nordland</option>
          <option value="Troms og Finnmark">Troms og Finnmark</option>
        </select>
        <select
          className="select select-bordered flex-1"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">Status</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Planning">Planning</option>
        </select>
        <select
          className="select select-bordered flex-1"
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
        >
          <option value="">Sektor</option>
          <option value="Helse">Helse</option>
          <option value="Oppvekst">Oppvekst</option>
          <option value="Teknisk">Teknisk</option>
          <option value="Social og Velferd">Social og Velferd</option>
          <option value="Samferdsel">Samferdsel</option>
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
              <th>Fylke</th>
              <th>Eier</th>
              <th>Sektor</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project) => (
              <tr key={project.projectId}>
                <td>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold">{project.title}</span>
                    <span className="text-sm opacity-60">
                      {project.description}
                    </span>
                  </div>
                </td>
                <td>{project.region}</td>
                <td>{project.owner}</td>
                <td>{project.sector}</td>
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
              <p className="text-gray-600">{selectedProject.description}</p>
              <div className="mt-4">
                <p>
                  <strong>Owner:</strong> {selectedProject.owner}
                </p>
                <p>
                  <strong>Region:</strong> {selectedProject.region}
                </p>
                <p>
                  <strong>Status:</strong> {selectedProject.status}
                </p>
                <p>
                  <strong>Sector:</strong> {selectedProject.sector}
                </p>
                <p>
                  <strong>Contact:</strong> {selectedProject.contact.email} |{" "}
                  {selectedProject.contact.phone}
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
