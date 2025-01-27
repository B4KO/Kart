
import Filter from "./Filter.jsx";
import MapView from "./MapView.jsx";
import ContentCard from "./ContentCard.jsx";
import ResultsCard from "./ResultsCard.jsx";

function Layout() {
    return (
        <div className="flex flex-col gap-4 p-4">
            {/* Row 1: Wide Element */}
            <div className="p-4 rounded shadow-md">
                <Filter />
            </div>

            {/* Row 2: Map and Card */}
            <div className="grid grid-cols-3 gap-4">
                {/* Map */}
                <div className="col-span-2 rounded shadow-md">
                    <MapView />
                </div>

                {/* Card */}
                <div className="flex rounded shadow-md justify-center">
                <ResultsCard />
                </div>
            </div>
        </div>
    );
}

export default Layout;
