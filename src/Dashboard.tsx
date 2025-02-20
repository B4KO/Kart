import {DataContext} from "./DataContext";

import "./App.css";
import "leaflet/dist/leaflet.css";

import { INITIAL_FILTERS, INITIAL_ACTIVE_TAB, DEFAULT_TABS_CONFIG } from "./config";
import TableView from "./Views/TableView";
import MapView from "./Views/MapView";
import AnalyticsView from "./Views/AnalyticsView";

import Tabs from "./Components/Tabs";
import {useContext, useMemo, useState} from "react";
import FilterForm from "./Components/FilterForm";
import {filterProjects} from "./Helpers/filterProjects";
import {TabOptions, FilterOptions} from "./Types/types";



function Dashboard(): JSX.Element {

  const projects = useContext(DataContext);

  const [activeTab, setActiveTab] = useState(INITIAL_ACTIVE_TAB);

  const [filters, setFilters] = useState(INITIAL_FILTERS);

  const handleResetFilters = () => setFilters(INITIAL_FILTERS);

  const handleFilterChange = (field: FilterOptions, value: string): void => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // Filter the projects once, only when `projects` or `filters` change
  const filteredProjects = useMemo(
      () => filterProjects(projects, filters)
  , [projects, filters]);

  return (
    <div className="h-screen bg-base-100 text-base-content">
     <Tabs tabs={DEFAULT_TABS_CONFIG} activeTab={activeTab} onTabChange={(tabName : TabOptions) => setActiveTab(tabName)}/>
      <FilterForm projects={projects} filters={filters} onFilterChange={handleFilterChange} onResetFilters={handleResetFilters} />

      <div className="mt-4">
        {activeTab === "map" && <MapView projects={filteredProjects} onFylkeClick={(fylkeName: string): void => handleFilterChange("selectedFylke", fylkeName)} />}
        {activeTab === "analytics" && <AnalyticsView />}
        {activeTab === "table" && <TableView projects={filteredProjects} />}
      </div>
    </div>
  );
}

export default Dashboard;
