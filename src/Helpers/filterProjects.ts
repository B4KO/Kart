// This a helper function takes in an array of projects and an object of filters
// and returns a filtered array of projects.
import {FilterInterface, ProjectInterface} from "../Types/types";

export function filterProjects(projects: Array<ProjectInterface> = [], filters: FilterInterface): ProjectInterface[] {
    return projects.filter((project: ProjectInterface): boolean => {
        const matchesStatus: boolean =
            !filters.selectedStatus || project.status === filters.selectedStatus;
        const matchesSektor: boolean =
            !filters.selectedSektor || project.sector === filters.selectedSektor;
        const matchesFylke: boolean =
            !filters.selectedFylke || project.region === filters.selectedFylke;
        const matchesSearchTerm: boolean =
            !filters.searchTerm || project.title.toLowerCase().includes(filters.searchTerm.toLowerCase());

        return matchesStatus && matchesSektor && matchesFylke && matchesSearchTerm;
    });
}
