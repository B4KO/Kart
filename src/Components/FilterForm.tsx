import {FilterInterface, FilterOptions, ProjectInterface} from "../Types/types";

type FilterFormProps = {
    projects: ProjectInterface[];
    filters: FilterInterface;
    onFilterChange: (key: FilterOptions, value: string) => void;
    onResetFilters: () => void;
}

export default function FilterForm({ projects, filters, onFilterChange, onResetFilters }: FilterFormProps) : JSX.Element {
    return (
        <div className="w-full">
            <div className="flex items-center gap-4 m-4">
                <select
                    className="select select-bordered flex-1"
                    value={filters.selectedSektor}
                    onChange={(e) => onFilterChange("selectedSektor", e.target.value)}
                >
                    <option value="">Sektor</option>
                    {[...new Set(projects.map((p) => p.sector))].map((sector) => (
                        <option key={sector} value={sector}>
                            {sector}
                        </option>
                    ))}
                </select>
                <select
                    className="select select-bordered flex-1"
                    value={filters.selectedStatus}
                    onChange={(e) => onFilterChange("selectedStatus", e.target.value)}
                >
                    <option value="">Status</option>
                    {[...new Set(projects.map((p) => p.status))].map((status) => (
                        <option key={status} value={status}>
                            {status}
                        </option>
                    ))}
                </select>
                <select
                    className="select select-bordered flex-1"
                    value={filters.selectedFylke}
                    onChange={(e) => onFilterChange("selectedFylke", e.target.value)}
                >
                    <option value="">Fylke</option>
                    {[...new Set(projects.map((p) => p.region))].map((region) => (
                        <option key={region} value={region}>
                            {region}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    placeholder="Søk"
                    className="input input-bordered flex-1"
                    value={filters.searchTerm}
                    onChange={(e) => onFilterChange("searchTerm", e.target.value)}
                />
                <button className="btn" onClick={onResetFilters}>
                    Nullstill
                </button>
            </div>
        </div>
    );
}
