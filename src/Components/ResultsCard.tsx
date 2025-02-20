import ContentCard from "./ContentCard";
import { useState } from "react";
import {ProjectInterface} from "../Types/types";

export type ResultCardProps = {
    projects: ProjectInterface[];
}

function ResultsCard({ projects }: ResultCardProps) : JSX.Element {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;
  const totalPages = Math.ceil(projects.length / pageSize);
  const startIndex = currentPage * pageSize;
  const currentProjects = projects.slice(startIndex, startIndex + pageSize);

  // Selected project state
  // @ts-ignore
  const [selectedProject, setSelectedProject]: [ProjectInterface, (value: ProjectInterface) => void] = useState(null);

  // Pagination helper functions
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  // Handle row click to select a project
  const handleRowClick = (project: ProjectInterface) => {
    setSelectedProject(project);
  };

  // Close the content card
  const handleCloseCard = () => {
    setSelectedProject(null);
  };

  // @ts-ignore
  return (
      <div className="flex flex-col items-center w-full h-full">
        {!selectedProject ? (
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
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                >
                  Previous
                </button>
                <div className="flex items-center justify-center">
                  Page {currentPage + 1} of {totalPages}
                </div>
                <button
                    className="join-item btn btn-outline"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages - 1}
                >
                  Next
                </button>
              </div>
            </div>
        ) : (
            <ContentCard project={selectedProject} onClose={handleCloseCard} />
        )}
      </div>
  );
}

export default ResultsCard;
