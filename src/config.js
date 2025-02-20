import {faFlask, faMap, faTable} from "@fortawesome/free-solid-svg-icons";

// Used in Dashboard.jsx

// Default active tab
// Values: "map", "analytics", "table"
export const DEFAULT_ACTIVE_TAB = "map";

// Initial filters
// Values: searchTerm, selectedFylke, selectedSektor, selectedStatus
export const INITIAL_FILTERS = {
    searchTerm: "",
    selectedFylke: "",
    selectedSektor: "",
    selectedStatus: "",
};

// Tab configuration
export const TABS_CONFIG = [
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