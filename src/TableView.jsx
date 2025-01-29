import { useState } from "react";
import Filter from "./Filter.jsx";
// import testData from "./test_data.json"; // or define locally

function TableView() {
  // Example: load the data locally or via an import
  const testData = {
        "projects": [
          {
            "projectId": 1,
            "owner": "Ricardo",
            "region": "Rogaland",
            "title": "Campus Food Delivery App",
            "description": "A food delivery app for campus, similar to Foodora, built with ASP.NET Core and Entity Framework Core.",
            "status": "In Progress",
            "contact": {
              "email": "ricardo@example.com",
              "phone": "+47 123 456 78"
            }
          },
          {
            "projectId": 2,
            "owner": "John Doe",
            "region": "Oslo",
            "title": "Green Energy Optimization",
            "description": "A project focused on optimizing renewable energy production using AI and machine learning.",
            "status": "Completed",
            "contact": {
              "email": "john.doe@example.com",
              "phone": "+47 987 654 32"
            }
          },
          {
            "projectId": 3,
            "owner": "Maria Hansen",
            "region": "Vestland",
            "title": "Smart Home Automation",
            "description": "Developing an IoT-based smart home automation system with enhanced security and energy-saving features.",
            "status": "In Progress",
            "contact": {
              "email": "maria.hansen@example.com",
              "phone": "+47 456 789 01"
            }
          },
          {
            "projectId": 4,
            "owner": "Emma Olsen",
            "region": "Trøndelag",
            "title": "Arctic Wildlife Conservation",
            "description": "A research initiative to track and protect endangered arctic wildlife using drone technology.",
            "status": "Planning",
            "contact": {
              "email": "emma.olsen@example.com",
              "phone": "+47 654 321 09"
            }
          },
          {
            "projectId": 5,
            "owner": "Lars Eriksen",
            "region": "Nordland",
            "title": "Fjord Tourism Platform",
            "description": "An app to promote tourism in Norwegian fjords by providing booking services and local guides.",
            "status": "In Progress",
            "contact": {
              "email": "lars.eriksen@example.com",
              "phone": "+47 321 654 98"
            }
          },
          {
            "projectId": 6,
            "owner": "Sofia Andersen",
            "region": "Troms og Finnmark",
            "title": "Northern Lights Photography Hub",
            "description": "A community-driven platform for sharing and learning about Northern Lights photography.",
            "status": "Completed",
            "contact": {
              "email": "sofia.andersen@example.com",
              "phone": "+47 789 123 45"
            }
          },
          {
            "projectId": 7,
            "owner": "Kasper Nielsen",
            "region": "Innlandet",
            "title": "Rural Agriculture Innovation",
            "description": "A project to introduce smart farming techniques in rural Norwegian agricultural communities.",
            "status": "In Progress",
            "contact": {
              "email": "kasper.nielsen@example.com",
              "phone": "+47 654 987 32"
            }
          },
          {
            "projectId": 8,
            "owner": "Elise Johansen",
            "region": "Agder",
            "title": "Coastal Cleanup Initiative",
            "description": "A volunteer-based initiative to clean up Norway's coastal areas and track waste sources.",
            "status": "Planning",
            "contact": {
              "email": "elise.johansen@example.com",
              "phone": "+47 456 789 65"
            }
          },
          {
            "projectId": 9,
            "owner": "Henrik Pedersen",
            "region": "Møre og Romsdal",
            "title": "Offshore Wind Energy Development",
            "description": "A project focusing on the development of offshore wind farms to boost renewable energy capacity.",
            "status": "In Progress",
            "contact": {
              "email": "henrik.pedersen@example.com",
              "phone": "+47 123 456 33"
            }
          },
          {
            "projectId": 10,
            "owner": "Anna Berg",
            "region": "Viken",
            "title": "Urban Mobility Solutions",
            "description": "Developing smart urban mobility solutions for reducing traffic congestion in Norwegian cities.",
            "status": "In Progress",
            "contact": {
              "email": "anna.berg@example.com",
              "phone": "+47 789 654 12"
            }
          }
        ]
      };

  // Pagination states
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(5);

  // The complete data array
  const projects = testData.projects;

  // Calculate total pages
  const totalPages = Math.ceil(projects.length / pageSize);

  // Calculate the slice for the current page
  const startIndex = currentPage * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProjects = projects.slice(startIndex, endIndex);

  return (
      <div className="overflow-x-auto">
        {/* Optional filter component */}
        <Filter />

        <table className="table">
          <thead>
          <tr>
            <th>Prosjektnavn</th>
            <th>Fylke</th>
            <th>Eier</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
          {/* Map only the projects for the current page */}
          {currentProjects.map((project) => (
              <tr key={project.projectId}>
                <td>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold">{project.title}</span>
                    <span className="text-sm opacity-60">{project.description}</span>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col gap-1">
                    <span>{project.region}</span>
                    <span className="badge badge-ghost badge-sm">{project.status}</span>
                  </div>
                </td>
                <td>{project.owner}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">Details</button>
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
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
              disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
        </div>
  );
}

export default TableView;
