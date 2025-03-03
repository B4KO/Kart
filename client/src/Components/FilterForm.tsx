import {FilterInterface, FilterOptions, ProjectInterface} from "../Types/types";

type FilterFormProps = {
    projects: ProjectInterface[];
    filters: FilterInterface;
    onFilterChange: (key: FilterOptions, value: string | string[]) => void;
    onResetFilters: () => void;
};

export default function FilterForm({ projects, filters, onFilterChange, onResetFilters }: FilterFormProps): JSX.Element {
    // Extract unique values for each category
    const sectors = [...new Set(projects.map((p) => p.sector))];
    const statuses = [...new Set(projects.map((p) => p.status))];
    const regions = [...new Set(projects.map((p) => p.region))];

    // Helper function to toggle checkbox selection
    const handleCheckboxChange = (key: FilterOptions, selectedValue: string) => {
        const currentValues = filters[key] as string[]; // Ensure it's an array
        const newValues = currentValues.includes(selectedValue)
            ? currentValues.filter((v) => v !== selectedValue) // Remove if already selected
            : [...currentValues, selectedValue]; // Add if not selected

        onFilterChange(key, newValues);
    };

    return (
        <div className="w-full">
            <div className="flex flex-row gap-4 m-4">
                {/* Sektor Filter */}
                <details className="border p-2 rounded">
                    <summary className="cursor-pointer font-semibold">Velg Sektor</summary>
                    <form className="p-2 flex flex-col gap-1">
                        {sectors.map((sector) => (
                            <label key={sector}>
                                <input
                                    type="checkbox"
                                    checked={filters.selectedSektor.includes(sector)}
                                    onChange={() => handleCheckboxChange("selectedSektor", sector)}
                                />
                                {sector}
                            </label>
                        ))}
                    </form>
                </details>

                {/* Status Filter */}
                <details className="border p-2 rounded">
                    <summary className="cursor-pointer font-semibold">Velg Status</summary>
                    <form className="p-2 flex flex-col gap-1">
                        {statuses.map((status) => (
                            <label key={status}>
                                <input
                                    type="checkbox"
                                    checked={filters.selectedStatus.includes(status)}
                                    onChange={() => handleCheckboxChange("selectedStatus", status)}
                                />
                                {status}
                            </label>
                        ))}
                    </form>
                </details>

                {/* Fylke Filter */}
                <details className="border p-2 rounded">
                    <summary className="cursor-pointer font-semibold">Velg Fylke</summary>
                    <form className="p-2 flex flex-col gap-1">
                        {regions.map((region) => (
                            <label key={region}>
                                <input
                                    type="checkbox"
                                    checked={filters.selectedFylke.includes(region)}
                                    onChange={() => handleCheckboxChange("selectedFylke", region)}
                                />
                                {region}
                            </label>
                        ))}
                    </form>
                </details>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Søk"
                    className="input input-bordered flex-1"
                    value={filters.searchTerm}
                    onChange={(e) => onFilterChange("searchTerm", e.target.value)}
                />

                {/* Reset Filters Button */}
                <button className="btn" onClick={onResetFilters}>
                    Nullstill
                </button>
            </div>
        </div>
    );
}
