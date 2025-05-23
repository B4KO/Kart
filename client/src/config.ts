import {faFlask, faMap, faTable} from "@fortawesome/free-solid-svg-icons";
import {FilterInterface, TabOptions, TabsInterface} from "./Types/types";



// Dashboard.tsx configuration

// Default active tab (overridden by URL params)
// Accepted values: "map", "analytics", "table"
export const DEFAULT_ACTIVE_TAB : TabOptions = "map";

// Default filters (overridden by URL params)
// Accepted values: searchTerm, selectedFylke, selectedSektor, selectedStatus
// Todo do implement the types for the dropdowns
export const DEFAULT_FILTERS : FilterInterface = {
    searchTerm: "",
    selectedFylke: [""],
    selectedSektor: [""],
    selectedStatus: [""],
};

// Default tab configuration
export const DEFAULT_TABS_CONFIG: TabsInterface[] = [
    {
        id: "map",
        label: "Kart",
        icon: faMap
    },
    {
        id: "analytics",
        label: "Analytikk",
        icon: faFlask
    },
    {
        id: "table",
        label: "Tabell",
        icon: faTable
    },
];



// Get URL params
// The params are searchTerm, selectedFylke, selectedSektor, selectedStatus, tab
// Example: https://localhost:PORT/?tab=DAR&searchTerm=FOO&selectedFylke=BAR&selectedSektor=BAZ&selectedStatus=QUX
export const urlParams = new URLSearchParams(window.location.search);

export const INITIAL_ACTIVE_TAB : TabOptions = <"map" | "analytics" | "table">urlParams.get("tab") || DEFAULT_ACTIVE_TAB;

export const INITIAL_FILTERS = {
    searchTerm: urlParams.get("searchTerm") || DEFAULT_FILTERS.searchTerm,
    selectedFylke: urlParams.get("selectedFylke") || DEFAULT_FILTERS.selectedFylke,
    selectedSektor: urlParams.get("selectedSektor") || DEFAULT_FILTERS.selectedSektor,
    selectedStatus: urlParams.get("selectedStatus") || DEFAULT_FILTERS.selectedStatus,
};