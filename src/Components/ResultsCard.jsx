import ContentCard from "./ContentCard.jsx";
import {useContext, useState} from "react";
import {DataContext} from "../DataContext.jsx";

// eslint-disable-next-line react/prop-types
function ResultsCard({ searchTerm, selectedFylke, selectedSektor, selectedStatus }) {

  const projects = useContext(DataContext);

  // State for pagination
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  // Track the selected project
  const [selectedProject, setSelectedProject] = useState(null);

  // Handle filtering
  const filteredProjects = projects.filter((project) => {
    return (
        (selectedFylke === "" || project.region === selectedFylke) &&
        (selectedSektor === "" || project.sector === selectedSektor) &&
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

  const badgesBasedOnStatus = (projectStatus) => {
      var styleClass = "badge font-bold badge-lg ";
      switch (projectStatus) {
        case 'Utvikles':        
        case 'Pilot':
          styleClass += "badge-warning";
          break;
        case 'I drift':
          styleClass += "badge-info";
          break;
        case 'Avsluttet':
          styleClass += "badge-success";
          break;
        default:
          break;
      };

      return styleClass;
  }


  const badgesBasedOnSektor = (projectSektor) => {
    var styleClass = "badge font-bold badge-lg ";
    switch (projectSektor) {
      case 'Helse':  
        styleClass += "badge-error";
        break;       
      case 'Teknisk':
        styleClass += "badge-primary";
        break;
      case 'Social':
        styleClass += "badge-warning";
        break;
      case 'Oppvekst':
        styleClass += "badge-success";
        break;
      case 'Samferdsel':
        styleClass += "badge-secondary";
        break;
      default:
        break;
    };

    return styleClass;
}

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
                          <td><div className={badgesBasedOnSektor(project.sector)}>{project.sector}</div></td>
                          <td><div className={badgesBasedOnStatus(project.status)}>{project.status}</div></td>
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
