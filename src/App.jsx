import { useState } from "react";
import LayoutAnalytics from "./LayoutAnalytics.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faFlask, faTable } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import "leaflet/dist/leaflet.css";

import TableView from "./TableView";
import Layout from "./Layout.jsx";

function App() {
  const [activeTab, setActiveTab] = useState("map");

  return (
    <div className="h-screen bg-base-100 text-base-content">
      {/* Tabs Header */}
      <div className="tabs tabs-boxed tabs-lg">
        <a
          className={`tab ${activeTab === "map" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("map")}
        >
          <FontAwesomeIcon icon={ faMap } />
          <p className="ml-1 text-lg">
            Kart
          </p>
        </a>
        <a
          className={`tab ${
            activeTab === "analytics" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("analytics")}
        >
          <FontAwesomeIcon icon={ faFlask } />
          <p className="ml-1 text-lg">
            Analytikk
          </p>
        </a>
        <a
          className={`tab ${activeTab === "table" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("table")}
        >
          <FontAwesomeIcon icon={ faTable } />
          <p className="ml-1 text-lg">
            Tabell
          </p>
        </a>
      </div>

      {/* Tab Content */}
      <div className="border border-base-300 rounded-lg">
        {activeTab === "map" && <Layout />}
        {activeTab === "analytics" && <LayoutAnalytics />}
        {activeTab === "table" && <TableView />}
      </div>
      {/* Tabs end */}
    </div>
  );
}

export default App;
