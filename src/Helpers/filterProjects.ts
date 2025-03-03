// This a helper function takes in an array of projects and an object of filters
// and returns a filtered array of projects.
import {FilterInterface, ProjectInterface} from "../Types/types";

export function filterProjects(
    projects: Array<ProjectInterface> = [],
    filters: FilterInterface
): ProjectInterface[] {
    return projects.filter((project: ProjectInterface): boolean => {
        const matchesStatus: boolean = 
            filters.selectedStatus.length == 1 || filters.selectedStatus.includes(project.status);

        const matchesSektor: boolean =
            filters.selectedSektor.length == 1 || filters.selectedSektor.includes(project.sector);

        const matchesFylke: boolean =
            filters.selectedFylke.length == 1 || filters.selectedFylke.includes(project.region);

        const matchesSearchTerm: boolean =
            !filters.searchTerm || 
            project.title.toLowerCase().includes(filters.searchTerm[0]) || 
            project.title.includes(filters.searchTerm[0]);

        return matchesStatus && matchesSektor && matchesFylke && matchesSearchTerm;
    });
}
