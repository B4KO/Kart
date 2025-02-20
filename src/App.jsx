import { DataProvider } from "./DataContext.jsx";
import Dashboard from "./Dashboard.jsx"; // New component that consumes the context

function App() {
    return (
        <DataProvider>
            <Dashboard />
        </DataProvider>
    );
}

export default App;
