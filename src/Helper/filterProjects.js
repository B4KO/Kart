// This a helper function takes in an array of projects and an object of filters
// and returns a filtered array of projects.
export function filterProjects(projects = [], filters) {
    return projects.filter((project) => {
        const matchesStatus =
            !filters.selectedStatus || project.status === filters.selectedStatus;
        const matchesSektor =
            !filters.selectedSektor || project.sector === filters.selectedSektor;
        const matchesFylke =
            !filters.selectedFylke || project.region === filters.selectedFylke;
        const matchesSearchTerm =
            !filters.searchTerm ||
            project.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

        return matchesStatus && matchesSektor && matchesFylke && matchesSearchTerm;
    });
}
