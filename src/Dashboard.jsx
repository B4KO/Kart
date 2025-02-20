import {DataContext} from "./DataContext.jsx";

import "./App.css";
import "leaflet/dist/leaflet.css";

import { INITIAL_FILTERS, DEFAULT_ACTIVE_TAB, TABS_CONFIG } from "./config.js";
import TableView from "./TabViews/TableView.jsx";
import MapView from "./TabViews/MapView.jsx";
import AnalyticsView from "./TabViews/AnalyticsView.jsx";

import Tabs from "./Components/Tabs.jsx";
import {useContext, useMemo, useState} from "react";
import FilterForm from "./Components/FilterForm.jsx";
import {filterProjects} from "./Helper/filterProjects.js";

function Dashboard() {

  const projects = useContext(DataContext);

  const [activeTab, setActiveTab] = useState(DEFAULT_ACTIVE_TAB);

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleResetFilters = () => setFilters(INITIAL_FILTERS);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Filter the projects once, only when `projects` or `filters` change
  const filteredProjects = useMemo(
      () => filterProjects(projects, filters)
  , [projects, filters]);

  return (
    <div className="h-screen bg-base-100 text-base-content">
     <Tabs tabs={TABS_CONFIG} activeTab={activeTab} onTabChange={(tabId) => setActiveTab(tabId)}/>
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
