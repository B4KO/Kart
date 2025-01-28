import Filter from "./Filter.jsx";
import MapView from "./MapView.jsx";
import Statistics from "./Statistics.jsx";
import ContentCard from "./ContentCard.jsx";
import ResultsCard from "./ResultsCard.jsx";
import Chart from "./Chart.jsx";
import ChartTwo from "./ChartTwo.jsx";

function Layout() {
  return (
    <>
      <div className="flex flex-col gap-4 p-4">
        {/* Row 1: Wide Element */}
        <div className="p-4 rounded shadow-md">
          <Filter />
        </div>

        {/* Row 2: Map and Card */}
        <div className="grid grid-cols-3 gap-4">
          {/* Map */}
          <div className="col-span-2 rounded shadow-md h-[500px]">
            <ChartTwo />
          </div>

          {/* Card */}
          <div className="flex rounded shadow-md justify-evenly flex-col h-[500px]">
            <Chart />
          </div>
        </div>
      </div>
      <Statistics />
    </>
  );
}

export default Layout;
