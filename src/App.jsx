import {DataProvider} from "./DataContext.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMap, faFlask, faTable } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import "leaflet/dist/leaflet.css";

import TableView from "./TabViews/TableView.jsx";
import MapView from "./TabViews/MapView.jsx";
import AnalyticsView from "./TabViews/AnalyticsView.jsx";

import Tabs from "./Components/Tabs.jsx";

function App() {

  const tabs = [
    {
      id: "map",
      label: "Kart",
      icon: <FontAwesomeIcon icon={faMap} />,
      component: <MapView />,
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
      component: <TableView />,
    },
  ];

  const defaultActiveTab = "map";

  return (
      <DataProvider>
    <div className="h-screen bg-base-100 text-base-content">
     <Tabs tabs={tabs} defaultActiveTab={defaultActiveTab} />
    </div>
      </DataProvider>
  );
}

export default App;
