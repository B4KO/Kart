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

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF", "#FF6384", "#36A2EB", "#4BC0C0"];

  const [selectedRegion, setSelectedRegion] = useState("");
            const [selectedStatus, setSelectedStatus] = useState("");
            const [selectedSector, setSelectedSector] = useState("");

            const [hideUndefined, setHideUndefined] = useState(true);
            const [activeTab, setActiveTab] = useState("Overview");

            const handleTabClick = (tab) => {
              setActiveTab(tab);
            };

            const filteredProjects = projects.filter(
            (project) =>
            (selectedRegion === "" || project.region === selectedRegion) &&
            (selectedStatus === "" || project.status === selectedStatus) &&
            (selectedSector === "" || project.sector === selectedSector)
            );

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
              <div className="flex justify-center items-center gap-6 p-0">
                <button
                    onClick={() => handleTabClick("Overview")}
                    className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${activeTab === "Overview" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}
                >
                  Overview
                </button>
                <button
                    onClick={() => handleTabClick("Status")}
                    className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${activeTab === "Status" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}
                >
                  Status
                </button>
                <button
                    onClick={() => handleTabClick("Region")}
                    className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${activeTab === "Region" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}
                >
                  Region
                </button>
                <button
                    onClick={() => handleTabClick("Departement")}
                    className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${activeTab === "Departement" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}
                >
                  Departement
                </button>
                <button
                    onClick={() => handleTabClick("Prosjekteier")}
                    className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${activeTab === "Prosjekteier" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}
                >
                  Prosjekteier
                </button>
                <button
                    onClick={() => handleTabClick("Tidslinje")}
                    className={`px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${activeTab === "Tidslinje" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-100"}`}
                >
                  Tidslinje
                </button>

                <label className="flex items-center gap-2">
                  <input
                      type="checkbox"
                      checked={hideUndefined}
                      onChange={(e) => setHideUndefined(e.target.checked)}
                      className="checkbox"
                  />
                  Hide Undefined Projects
                </label>
              </div>

              <div className={`grid ${activeTab === "Overview" ? "grid-cols-2" : "grid-cols-1"} gap-4`}>
                {(activeTab === "Status" || activeTab === "Overview") && (
                    <div className="card bg-base-100 shadow-xl p-4">
                      <h2 className="text-lg font-bold">Project Completion Rate</h2>
                      <ResponsiveContainer width="100%" height={activeTab === "Overview" ? 300 : 600}>
                        <PieChart>
                          <Pie
                              data={aggregateData("status")}
                              dataKey="value"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={activeTab === "Overview" ? 100 : 200}
                          >
                            {aggregateData("status").map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                )}

                {(activeTab === "Region" || activeTab === "Overview") && (
                    <div className="card bg-base-100 shadow-xl p-4">
                      <h2 className="text-lg font-bold">Prosjekter utifra fylker</h2>
                      <ResponsiveContainer width="100%" height={activeTab === "Overview" ? 300 : 600}>
                        <BarChart data={aggregateData("region")}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value">
                            {aggregateData("region").map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                )}

                {(activeTab === "Departement" || activeTab === "Overview") && (
                    <div className="card bg-base-100 shadow-xl p-4">
                      <h2 className="text-lg font-bold">Prosjekter utifra department</h2>
                      <ResponsiveContainer width="100%" height={activeTab === "Overview" ? 500 : 600}>
                        <BarChart layout="vertical" data={aggregateData("sector")}>
                          <XAxis type="number" />
                          <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="value" fill="#00C49F">
                            {aggregateData("sector").map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                )}

                {(activeTab === "Prosjekteier" || activeTab === "Overview") && (
                    <div className="card bg-base-100 shadow-xl p-4">
            <h2 className="text-lg font-bold">Prosjekter utifra prosjektereiere</h2>
            <ResponsiveContainer width="100%" height={activeTab === "Overview" ? 500 : 600}>
              <BarChart layout="vertical" data={aggregateData("owner")} barGap={5} barSize={10}>
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          )}

          {(activeTab === "Tidslinje" || activeTab === "Overview") && (
          <div className="card bg-base-100 shadow-xl p-4 col-span-2">
            <h2 className="text-lg font-bold">Prosjekt tidslinje</h2>
            <ResponsiveContainer width="100%" height={3000}>
              <BarChart layout="vertical" data={projects.map((p) => {
                const start = parseInt(p.start, 10);
                const end = parseInt(p.end, 10) === 0 ? new Date().getFullYear() : parseInt(p.end, 10);
                return {
                  name: p.title,
                  start: start,
                  end: end,
                  duration: end - start
                };
              })} barGap={5} barSize={10}>
                <XAxis type="number" domain={['dataMin', 'dataMax']} />
                <YAxis dataKey="name" type="category" width={300} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="duration" fill="#00C49F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          )}

        </div>
      </div>
    );
    
}

export default AnalyticsView;
