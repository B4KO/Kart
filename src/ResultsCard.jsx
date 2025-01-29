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
        },
        {
            projectId: 2,
            owner: "John Doe",
            region: "Oslo",
            title: "Green Energy Optimization",
        },
        {
            projectId: 3,
            owner: "Maria Hansen",
            region: "Vestland",
            title: "Smart Home Automation",
        },
        {
            projectId: 4,
            owner: "Emma Olsen",
            region: "Trøndelag",
            title: "Arctic Wildlife Conservation",
        },
        {
            projectId: 5,
            owner: "Lars Eriksen",
            region: "Nordland",
            title: "Fjord Tourism Platform",
        },
        {
            projectId: 6,
            owner: "Sofia Andersen",
            region: "Troms og Finnmark",
            title: "Northern Lights Photography Hub",
        },
        {
            projectId: 7,
            owner: "Kasper Nielsen",
            region: "Innlandet",
            title: "Rural Agriculture Innovation",
        },
        {
            projectId: 8,
            owner: "Elise Johansen",
            region: "Agder",
            title: "Coastal Cleanup Initiative",
        },
        {
            projectId: 9,
            owner: "Henrik Pedersen",
            region: "Møre og Romsdal",
            title: "Offshore Wind Energy Development",
        },
        {
            projectId: 10,
            owner: "Anna Berg",
            region: "Viken",
            title: "Urban Mobility Solutions",
        },
    ];

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 5;
    const totalPages = Math.ceil(projects.length / pageSize);
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    const currentProjects = projects.slice(startIndex, endIndex);

    // Track the selected project
    const [selectedProject, setSelectedProject] = useState(null);

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
            {/* If no project is selected, show the table & pagination */}
            {!selectedProject && (
                <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
                    <div className="card-body w-full h-full">
                        <div className="overflow-x-auto">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>Prosjektnavn</th>
                                    <th>Fylke</th>
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

            {/* If a project is selected, show the ContentCard */}
            {selectedProject && (
                <ContentCard project={selectedProject} onClose={handleCloseCard} />
            )}
        </div>
    );
}

export default ResultsCard;
