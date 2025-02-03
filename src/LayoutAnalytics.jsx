import { useState } from "react";
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

import projects from "./projectsData";

function LayoutAnalytics() {
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedSector, setSelectedSector] = useState("");

  const filteredProjects = projects.filter(
    (project) =>
      (selectedRegion === "" || project.region === selectedRegion) &&
      (selectedStatus === "" || project.status === selectedStatus) &&
      (selectedSector === "" || project.sector === selectedSector)
  );

  const aggregateData = (key) =>
    Object.entries(
      filteredProjects.reduce((acc, project) => {
        acc[project[key]] = (acc[project[key]] || 0) + 1;
        return acc;
      }, {})
    ).map(([name, value]) => ({ name, value }));

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <select
          className="select select-bordered"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">All Regions</option>
          {[...new Set(projects.map((p) => p.region))].map(
            (region) => (
              <option key={region} value={region}>
                {region}
              </option>
            )
          )}
        </select>
        <select
          className="select select-bordered"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="">All Status</option>
          {[...new Set(projects.map((p) => p.status))].map(
            (status) => (
              <option key={status} value={status}>
                {status}
              </option>
            )
          )}
        </select>
        <select
          className="select select-bordered"
          value={selectedSector}
          onChange={(e) => setSelectedSector(e.target.value)}
        >
          <option value="">All Sectors</option>
          {[...new Set(projects.map((p) => p.sector))].map(
            (sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            )
          )}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {["status", "region", "sector", "owner"].map((key) => (
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
                data={aggregateData("status")}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
              >
                {aggregateData("status").map((entry, index) => (
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

export default LayoutAnalytics;
