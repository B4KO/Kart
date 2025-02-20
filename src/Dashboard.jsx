import {DataContext} from "./DataContext.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faFlask, faTable } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import "leaflet/dist/leaflet.css";

import TableView from "./TabViews/TableView.jsx";
import MapView from "./TabViews/MapView.jsx";
import AnalyticsView from "./TabViews/AnalyticsView.jsx";

import Tabs from "./Components/Tabs.jsx";
import {useContext, useMemo, useState} from "react";
import FilterForm from "./Components/FilterForm.jsx";
import {filterProjects} from "./filterProjects.js";

function Dashboard() {

  const projects = useContext(DataContext);

  const [activeTab, setActiveTab] = useState("map");

  const [filters, setFilters] = useState({
    searchTerm: "",
    selectedFylke: "",
    selectedSektor: "",
    selectedStatus: "",
  });

  const handleResetFilters = () => {
    setFilters({
      searchTerm: "",
      selectedFylke: "",
      selectedSektor: "",
      selectedStatus: "",
    });
  };

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Filter the projects once, only when `projects` or `filters` change
  const filteredProjects = useMemo(() => {
    return filterProjects(projects, filters);
  }, [projects, filters]);


  const tabs = [
    {
      id: "map",
      label: "Kart",
      icon: <FontAwesomeIcon icon={faMap} />,
      component: <MapView projects={filteredProjects} onFylkeClick={(fylkeName) => handleFilterChange("selectedFylke", fylkeName)} />,
    },
    {
      id: "analytics",
      label: "Analytikk",
      icon: <FontAwesomeIcon icon={faFlask} />,
      component: <AnalyticsView />,
    },
    {
      id: "table",
      label: "Tabell",
      icon: <FontAwesomeIcon icon={faTable} />,
      component: <TableView projects={filteredProjects} />,
    },
  ];

  return (
    <div className="h-screen bg-base-100 text-base-content">
     <Tabs tabs={tabs} activeTab={activeTab} onTabChange={(tabId) => setActiveTab(tabId)}/>
      <FilterForm projects={projects} filters={filters} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />

      <div className="mt-4">
        {activeTab === "map" && <MapView projects={filteredProjects} onFylkeClick={(fylkeName) => handleFilterChange("selectedFylke", fylkeName)} />}
        {activeTab === "analytics" && <AnalyticsView />}
        {activeTab === "table" && <TableView projects={filteredProjects} />}
      </div>
    </div>
  );
}

export default Dashboard;
