import { useState } from "react";
import {ProjectInterface} from "../Types/types";

export type TableViewPorps = {
    projects: ProjectInterface[];
}

function TableView({ projects }: TableViewPorps): JSX.Element {

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;


  // Calculate total pages
  const totalPages = Math.ceil(projects.length / pageSize);

  // Calculate the slice for the current page
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProjects = projects.slice(startIndex, endIndex);

  const [selectedProject, setSelectedProject] = useState<ProjectInterface | null>(null);

  return (
      <div className="w-full">

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
            {currentProjects.map((project: ProjectInterface, index) => (
                <tr key={index}>
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
                  <td>{project.ownership}</td>
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
                      alt="Types Image"
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
