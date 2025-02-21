import { DataProvider } from "./DataContext";
import Dashboard from "./Dashboard"; // New component that consumes the context

function App() {
    return (
        <DataProvider>
            <Dashboard />
        </DataProvider>
    );
}

export default App;
