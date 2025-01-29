import MapView from "./MapView.jsx";
import ResultsCard from "./ResultsCard.jsx";

function Layout() {
  return (
    <div className="flex flex-col gap-4 p-4 grow">
      {/* Row 2: Map and Card */}
      <div className="grid grid-cols-3 gap-4 grow relative h-screen">
        {/* Map */}
        <div className="col-span-2 rounded shadow-md grow relative h-screen">
          <MapView />
        </div>

        {/* Card */}
        <div className="flex rounded shadow-md justify-center grow relative h-screen">
          <ResultsCard />
        </div>
      </div>
    </div>
  );
}

export default Layout;
