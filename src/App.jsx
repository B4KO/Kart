import { useState } from "react";
import AnalyticsView from "./AnalyticsView";
import "./App.css";
import "leaflet/dist/leaflet.css";

import TableView from "./TableView";
import Layout from "./Layout.jsx";


function App() {
    const [activeTab, setActiveTab] = useState("map");

    return (
        <div className="min-h-screen bg-base-100 text-base-content p-12">



            {/* Tabs Header */}
            <div className="tabs tabs-boxed">
                <a
                    className={`tab tabs-lg ${activeTab === "map" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("map")}
                >
                    Map
                </a>
                <a
                    className={`tab tabs-lg ${activeTab === "analytics" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("analytics")}
                >
                    Analytics
                </a>
                <a
                    className={`tab tabs-lg ${activeTab === "table" ? "tab-active" : ""}`}
                    onClick={() => setActiveTab("table")}
                >
                    Table
                </a>
            </div>



            {/* Tab Content */}
            <div className="p-12 border border-base-300 rounded-lg">
                {activeTab === "map" && <Layout />}
                {activeTab === "analytics" && <AnalyticsView />}
                {activeTab === "table" && <TableView />}
            </div>

        </div>
    );
}

export default App;
