import { useContext, useState } from "react";
import { DataContext } from "../DataContext";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function AnalyticsView() {
  const projects = useContext(DataContext);
  console.log(projects);

  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  const [hideUndefined, setHideUndefined] = useState(true);

  const filteredProjects = projects.filter(
    (project) =>
      (selectedRegion === "" || project.region === selectedRegion) &&
      (selectedStatus === "" || project.status === selectedStatus) &&
      (selectedSector === "" || project.sector === selectedSector)
  );

  const handleResetFilters = () => {
    setSelectedRegion("");
    setSelectedSector("");
    setSelectedStatus("");
  };

  const aggregateData = (key) => {
    return Object.entries(
      filteredProjects.reduce((acc, project) => {
        if (project[key] !== "Informasjon mangler" || !hideUndefined) {
          acc[project[key]] = (acc[project[key]] || 0) + 1;
        }
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value }));
  };

    return (
      <div className="flex flex-col gap-4 p-4 grow">
        <div className="flex gap-4 mb-4 w-full">
          <select
            className="select select-bordered flex-1"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="">All Regions</option>
            {[...new Set(projects.map((p) => p.region))].map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
          <select
            className="select select-bordered flex-1"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="">All Status</option>
            {[...new Set(projects.map((p) => p.status))].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <select
            className="select select-bordered flex-1"
            value={selectedSector}
            onChange={(e) => setSelectedSector(e.target.value)}
          >
            <option value="">All Sectors</option>
            {[...new Set(projects.map((p) => p.sector))].map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
          <button className="btn" onClick={handleResetFilters}>
            Nullstill
          </button>
        </div>
    
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={hideUndefined}
            onChange={(e) => setHideUndefined(e.target.checked)}
            className="checkbox"
          />
          Hide Undefined Projects
        </label>
    
        <div className="grid grid-cols-2 gap-4">
          {["Status", "Region", "Departement", "Prosjekteier"].map((key) => (
            <div key={key} className="card bg-base-100 shadow-xl p-4">
              <h2 className="text-lg font-bold">
                Projects by {key.charAt(0).toUpperCase() + key.slice(1)}
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={aggregateData(key)}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ))}
          <div className="card bg-base-100 shadow-xl p-4">
            <h2 className="text-lg font-bold">Project Completion Rate</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={aggregateData("Status")}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                >
                  {aggregateData("Status").map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={["#0088FE", "#00C49F", "#FFBB28"][index % 3]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
    
}

export default AnalyticsView;
