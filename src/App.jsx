import { useState } from "react";
import LayoutAnalytics from "./LayoutAnalytics.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import "leaflet/dist/leaflet.css";

import TableView from "./TableView";
import Layout from "./Layout.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("map");

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      {/* Tabs Header */}
      <div className="tabs tabs-boxed">
        <a
          className={`tab tabs-lg ${activeTab === "map" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("map")}
        >
          <FontAwesomeIcon icon="fa-solid fa-map" /> Kart
        </a>
        <a
          className={`tab tabs-lg ${
            activeTab === "analytics" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("analytics")}
        >
          <FontAwesomeIcon icon="fa-solid fa-flask" /> Analytikk
        </a>
        <a
          className={`tab tabs-lg ${activeTab === "table" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("table")}
        >
          <FontAwesomeIcon icon="fa-solid fa-table" /> Tabell
        </a>
      </div>

      {/* Tab Content */}
      <div className="border border-base-300 rounded-lg">
        {activeTab === "map" && <Layout />}
        {activeTab === "analytics" && <LayoutAnalytics />}
        {activeTab === "table" && <TableView />}
      </div>
    </div>
  );
}

export default App;
