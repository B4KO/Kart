import ContentCard from "./ContentCard.jsx";
import {useState} from "react";

// eslint-disable-next-line react/prop-types
function ResultsCard({ searchTerm, selectedRegion, selectedSector, selectedStatus }) {
  const projects = [
    {
      projectId: 1,
      owner: "Ricardo",
      region: "Rogaland",
      title: "Campus Food Delivery App",
      sector: "Teknisk",
      status: "I utvikling",
    },
    {
      projectId: 2,
      owner: "John Doe",
      region: "Oslo",
      title: "Green Energy Optimization",
      sector: "Helse",
      status: "Avsluttet",
    },
    {
      projectId: 3,
      owner: "Maria Hansen",
      region: "Vestland",
      title: "Smart Home Automation",
      sector: "Teknisk",
      status: "Pilot",
    },
    {
      projectId: 4,
      owner: "Emma Olsen",
      region: "Trøndelag",
      title: "Arctic Wildlife Conservation",
      sector: "Social og Velferd",
      status: "I drift",
    },
    {
      projectId: 5,
      owner: "Lars Eriksen",
      region: "Nordland",
      title: "Fjord Tourism Platform",
      sector: "Samferdsel",
      status: "Avsluttet",
    },
    {
      projectId: 6,
      owner: "Sofia Andersen",
      region: "Troms og Finnmark",
      title: "Northern Lights Photography Hub",
      sector: "Oppvekst",
      status: "Pilot",
    },
    {
      projectId: 7,
      owner: "Kasper Nielsen",
      region: "Innlandet",
      title: "Rural Agriculture Innovation",
      sector: "Social og Velferd",
      status: "I utvikling",
    },
    {
      projectId: 8,
      owner: "Elise Johansen",
      region: "Agder",
      title: "Coastal Cleanup Initiative",
      sector: "Teknisk",
      status: "I drift",
    },
    {
      projectId: 9,
      owner: "Henrik Pedersen",
      region: "Møre og Romsdal",
      title: "Offshore Wind Energy Development",
      sector: "Helse",
      status: "I utvikling",
    },
    {
      projectId: 10,
      owner: "Anna Berg",
      region: "Viken",
      title: "Urban Mobility Solutions",
      sector: "Samferdsel",
      status: "I drift",
    },
  ];


  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  // Track the selected project
  const [selectedProject, setSelectedProject] = useState(null);

  // Handle filtering
  const filteredProjects = projects.filter((project) => {
    return (
        (selectedRegion === "" || project.region === selectedRegion) &&
        (selectedSector === "" || project.sector === selectedSector) &&
        (selectedStatus === "" || project.status === selectedStatus) &&
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

  return (
      <div className="flex flex-col items-center w-full h-full">
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
                      <th>Status</th>
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
                          <td>{project.status}</td>
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
