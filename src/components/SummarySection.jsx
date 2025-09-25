"use client"

import { useState, useEffect } from "react"
import { Plus, Minus, Info, BarChart3, TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react"
import { ResponsiveContainer, BarChart, Pie, PieChart, LabelList, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Label } from 'recharts';
const colorCategoryMap = { High: "#FF2F08", Low: "#BEC22B", Moderate: "#FFD700", Critical: "#BF0000", Safe: "#9BFF8C" };
const colorMap = { As: "#FF6384", Cd: "#36A2EB", Cr: "#FFCE56", Cu: "#4BC0C0", Mn: "#9966FF", Ni: "#FF9F40", Pb: "#8B0000", Se: "#00CED1", Zn: "#7CFC00" };



export default function SummarySection({ computationData }) {
  const { processData, S1, IdealValues } = computationData


  // console.log(processData);

  const [isMinimized, setIsMinimized] = useState(false)
  const [minimizedTables, setMinimizedTables] = useState({
    rankings: false,
    metalAnalysis: false,
    visualAnalysis: false,
  })
  const [hoveredInfo, setHoveredInfo] = useState(null)


  const total_location = processData.length;


  // Calculate summary statistics
  const hmpiValues = processData?.map((location) => location.HMPI).filter((val) => val !== null) || []
  const avgHmpi = hmpiValues.length > 0 ? hmpiValues.reduce((a, b) => a + b, 0) / hmpiValues.length : 0
  const maxHmpi = hmpiValues.length > 0 ? Math.max(...hmpiValues) : 0
  const minHmpi = hmpiValues.length > 0 ? Math.min(...hmpiValues) : 0;

  const attentionHmpi = hmpiValues.length > 0 ? hmpiValues.filter((val) => val > 100).length : 0
  const maxHmpiLocation = processData?.find((location) => location.HMPI === maxHmpi).location;

  const safeLocation = minHmpi <= 50 ? processData?.find((location) => location.HMPI === minHmpi).location : 'none';
  const safeHmpi = minHmpi <= 50 ? minHmpi : '< 50';




  // const minHmpiLocation = processData?.find((location)=> location.HMPI === minHmpi).location;
  const getCategoryColor = (categoryName) => {
    switch (categoryName) {
      case "Safe":
        return "text-green-700 bg-green-100 border-green-200"
      case "Low":
        return "text-yellow-700 bg-yellow-100 border-yellow-200"
      case "Moderate":
        return "text-orange-700 bg-orange-100 border-orange-200"
      case "High":
        return "text-red-700 bg-red-100 border-red-700"
      case "Critical":
        return "text-red-900 bg-red-300 border-red-800"
      default:
        return "text-gray-700 bg-gray-100 border-gray-200"
    }
  }

  const getContaminationColor = (cd) => {
    if (cd < 6) {
      return "text-green-700"
    } else if (cd < 12) {
      return "text-yellow-700 "
    } else if (cd < 24) {
      return "text-orange-800 "
    } else {
      return "text-red-800 "
    }
  }

  const getHMPIMessage = (value) => {
    if (value === null || value === undefined) return "No data";
    if (value <= 50) return "Low";
    if (value <= 100) return "Moderate";
    if (value <= 200) return "High";
    return "Very High";
  }

  const getTopPollutant = (obj, Metals) => {
    if (!obj || typeof obj !== "object") return null;

    // Convert object to array of [key, value] pairs
    const entries = Object.entries(obj);

    // Find the entry with the maximum value
    const [topMetal, topValue] = entries.reduce((max, current) =>
      current[1] > max[1] ? current : max
    );

    return Metals[topMetal];
  };

  const getCategoryDistribution = (processData) => {
    const categoryDistribution = {
      Safe: 0,
      Low: 0,
      Moderate: 0,
      High: 0,
      Critical: 0,
    };

    if (!Array.isArray(processData)) {
      console.warn("Expected processData to be an array.");
      return categoryDistribution;
    }

    processData.forEach((locationObj) => {
      const level = locationObj?.category?.level;

      if (level && categoryDistribution.hasOwnProperty(level)) {
        categoryDistribution[level]++;
      }
    });

    return categoryDistribution;
  };

  const getMetalTopPollutantFrequencies = (processData) => {
    const metalSet = new Set();

    // First, collect all metals from all locations
    processData.forEach(location => {
      const metalContributions = location.metalContributions;
      if (metalContributions && typeof metalContributions === "object") {
        Object.keys(metalContributions).forEach(metal => {
          metalSet.add(metal);
        });
      }
    });

    // Initialize frequency object with all metals set to 0
    const frequency = {};
    metalSet.forEach(metal => {
      frequency[metal] = 0;
    });

    // Now, find the top metal for each location and increment its count
    processData.forEach(location => {
      const metalContributions = location.metalContributions;
      if (!metalContributions || typeof metalContributions !== "object") return;

      const entries = Object.entries(metalContributions);
      if (entries.length === 0) return;

      const [topMetal] = entries.reduce((max, current) =>
        current[1] > max[1] ? current : max
      );

      frequency[topMetal] += 1;
    });

    return frequency;
  };

  const leadingCounts = getMetalTopPollutantFrequencies(processData);

  const toggleTable = (tableName) => {
    // here add toggle table functionality
    setMinimizedTables((prev) => ({
      ...prev,
      [tableName]: !prev[tableName],
    }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Results Summary</h3>
        <button
          onClick={() => setIsMinimized(!isMinimized)} // here add minimize toggle functionality
          className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
        >
          {isMinimized ? (
            <>
              <Plus size={16} />
              Expand
            </>
          ) : (
            <>
              <Minus size={16} />
              Minimize
            </>
          )}
        </button>
      </div>

      {!isMinimized && (
        <div className="space-y-6">
          <section className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {/* Total Locations Card */}
              <div className="rounded-lg border border-gray-200 bg-white p-2 md:p-4 relative">
                <div className="md:space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] md:text-sm font-medium text-gray-600">Total Locations</h4>
                    <div className="relative">
                      <button
                        onMouseEnter={() => setHoveredInfo("total")}
                        onMouseLeave={() => setHoveredInfo(null)}
                        className="text-gray-400 hover:text-gray-600"
                      // // onClick={() => window.open('#', '_blank')}
                      >
                        <Info size={14} />
                      </button>
                      {hoveredInfo === "total" && (
                        <div className="absolute top-6 right-0 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                          Number of locations analyzed
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xl md:text-2xl font-semibold text-gray-900">{total_location}</div>
                  <p className="text-[10px] md:text-sm text-gray-500">Analyzed for HMPI</p>
                </div>
              </div>

              {/* Average HMPI Card */}
              <div className="rounded-lg border border-gray-200 bg-white p-2 md:p-4 relative">
                <div className="md:space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] md:text-sm font-medium text-gray-600">Average HMPI</h4>
                    <div className="relative">
                      <button
                        onMouseEnter={() => setHoveredInfo("average")}
                        onMouseLeave={() => setHoveredInfo(null)}
                        className="text-gray-400 hover:text-gray-600"
                      // onClick={() => window.open('#', '_blank')}
                      >
                        <Info size={14} />
                      </button>
                      {hoveredInfo === "average" && (
                        <div className="absolute top-6 right-0 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                          Mean HMPI across all locations
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xm md:text-2xl font-semibold text-orange-600">{`${avgHmpi.toFixed(2)} -${getHMPIMessage(avgHmpi.toFixed(2))}`}</div>
                  <p className="text-[10px] md:text-sm text-gray-500">Across all locations</p>
                </div>
              </div>

              {/* Most Polluted Card */}
              <div className="rounded-lg border border-gray-200 bg-white p-2 md:p-4 relative">
                <div className="md:space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] md:text-sm font-medium text-gray-600">Most Polluted</h4>
                    <div className="relative">
                      <button
                        onMouseEnter={() => setHoveredInfo("polluted")}
                        onMouseLeave={() => setHoveredInfo(null)}
                        className="text-gray-400 hover:text-gray-600"
                      // onClick={() => window.open('#', '_blank')}
                      >
                        <Info size={14} />
                      </button>
                      {hoveredInfo === "polluted" && (
                        <div className="absolute top-6 left-0 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                          Location with highest HMPI score
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xm md:text-2xl font-semibold text-red-600">{maxHmpiLocation}</div>
                  <p className="text-[10px] md:text-sm text-gray-500">{`HMPI - ${maxHmpi.toFixed(2)}`}</p>
                </div>
              </div>

              {/* Safest Location Card */}
              <div className="rounded-lg border border-gray-200 bg-white p-2 md:p-4 relative">
                <div className="md:space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] md:text-sm font-medium text-gray-600">Safest Location</h4>
                    <div className="relative">
                      <button
                        onMouseEnter={() => setHoveredInfo("safest")}
                        onMouseLeave={() => setHoveredInfo(null)}
                        className="text-gray-400 hover:text-gray-600"
                      // onClick={() => window.open('#', '_blank')}
                      >
                        <Info size={14} />
                      </button>
                      {hoveredInfo === "safest" && (
                        <div className="absolute top-6 left-0 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                          Location with lowest HMPI score
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xm md:text-2xl font-semibold text-green-600">{safeLocation}</div>
                  <p className="text-[10px] md:text-sm text-gray-500">{`HMPI - ${safeHmpi}`}</p>
                </div>
              </div>

              {/* Attention Required Card */}
              <div className="rounded-lg border border-gray-200 bg-white p-2 md:p-4 relative">
                <div className="md:space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[10px] md:text-sm font-medium text-gray-600">Need Attention</h4>
                    <div className="relative">
                      <button
                        onMouseEnter={() => setHoveredInfo("attention")}
                        onMouseLeave={() => setHoveredInfo(null)}
                        className="text-gray-400 hover:text-gray-600"
                      // onClick={() => window.open('#', '_blank')}
                      >
                        <Info size={14} />
                      </button>
                      {hoveredInfo === "attention" && (
                        <div className="absolute top-6 left-0 bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                          Locations requiring immediate action
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-xmmd:text-2xl font-semibold text-red-600">{`${attentionHmpi} Locations`}</div>
                  <p className="text-xs text-gray-500">Critical levels</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="space-y-6">
              {/* Location Rankings Table */}
              <div className="rounded-lg border border-gray-200 bg-white">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h4 className="text-xm md:text-lg font-semibold text-gray-900">Location Rankings</h4>
                  <button
                    onClick={() => toggleTable("rankings")}
                    className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                  >
                    {minimizedTables.rankings ? <Plus size={16} /> : <Minus size={16} />}
                  </button>
                </div>
                {!minimizedTables.rankings && (
                  <div className="max-h-80 overflow-y-auto">


                    <table className="w-full">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          <th className=" px-3 md:px-4 py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase">
                            SL No.
                          </th>
                          <th className=" px-3 md:px-4 py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase">
                            Location Name
                          </th>
                          <th className=" px-3 md:px-4 py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase">
                            HMPI Score
                          </th>
                          <th className=" px-3 md:px-4 py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase">Category</th>
                          <th className=" px-3 md:px-4 py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase">
                            Top Pollutant
                          </th>
                          <th className=" px-3 md:px-4 py-3 text-left text-[10px] md:text-xs font-medium text-gray-500 uppercase">
                            Contamination Degree
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {processData.map((row, i) => (
                          console.log(),
                          <tr key={i}>
                            <td className="px-3 md:px-4 py-3 text-[10px] md:text-sm text-gray-900 font-semibold">{i + 1}</td>
                            <td className="px-3 md:px-4 py-3 text-[10px] md:text-sm text-gray-900 font-semibold">{row.location}</td>
                            <td className={`px-3 md:px-4 py-3 text-[10px] md:text-sm text-gray-900`}>{row.HMPI.toFixed(2)}</td>
                            <td className="px-3 md:px-4 py-3">
                              <span className={`md:px-2 px-1 py-1 text-[10px] md:text-xs font-medium rounded-full ${getCategoryColor(row.category.level)}`}>
                                {row.category.level}
                              </span>
                            </td>
                            <td className="px-3 md:px-4 py-3 text-[10px] md:text-sm font-medium text-gray-900">{getTopPollutant(row.metalContributions, row.Metals)}</td>
                            <td className={`px-3 md:px-4 py-3 text-[10px] md:text-sm font-medium ${getContaminationColor(row.contaminationDegree)}`}>{row.contaminationDegree.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>




                  </div>
                )}
              </div>

              {/* Metal Analysis Summary Table */}


            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-lg bg-white">
              <h3 className="text-md md:text-lg font-semibold text-gray-900">Visual Analysis</h3>
              <button
                onClick={() => toggleTable("visualAnalysis")}
                className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                {minimizedTables.visualAnalysis ? <Plus size={16} /> : <Minus size={16} />}
              </button>
            </div>

            {!minimizedTables.visualAnalysis && (
              <div className="grid gap-6">
                {/* HMPI Comparison Chart */}
                <div className="rounded-lg border border-gray-200 bg-white p-2 md:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="text-blue-600" size={20} />
                    <h4 className="text-sm md:text-md font-semibold text-gray-900">HMPI Comparison</h4>
                  </div>
                  <div className="w-full  bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg px-0 py-2 md:p-6">
                    <HMPIBarChart processData={processData} />
                  </div>
                  <div className="text-sm font-semibold text-gray-700 md:text-md">Better View on large Screen for - large datasets</div>
                </div>

                {/* Category Distribution */}
                <div className="rounded-lg border border-gray-200 bg-white p-2 md:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <PieChart className="text-green-600" size={20} />
                    <h4 className="text-sm md:text-md  font-semibold text-gray-900">Category Distribution</h4>
                  </div>
                  <div className="w-full  bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg px-0 py-2 md:p-6">
                    <PieChartComponent
                      location="Pollution Category Distribution"
                      percentageComposition={getCategoryDistribution(processData)}
                    />

                  </div>
                </div>

                {/* Top Problematic Metals */}
                <div className="rounded-lg border border-gray-200 bg-white p-2 md:p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="text-red-600" size={20} />
                    <h4 className="font-semibold text-gray-900">Top Problematic Metals</h4>
                  </div>
                  <div className="w-full  bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg px-0 py-2 md:p-6">
                    <LeadingPollutantChart leadingCounts={leadingCounts} />
                  </div>
                </div>

                {/* Map PLaceholder */}
                <div className="rounded-lg border  border-gray-200 bg-white p-2 md:p-6">
                  <div className="w-full h-[300px] text-center  bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg px-0 py-2 md:p-6">
                    <p className="text-lg md:text-lg font-semibold text-gray-500" >Map Placeholder</p>
                  </div>
                </div>


              </div>
            )}
          </section>



          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Download Report</h3>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                onClick={() => alert("PDF download functionality would be implemented here")} // here add PDF download functionality
              >
                Download PDF
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
                onClick={() => alert("CSV export functionality would be implemented here")} // here add CSV export functionality
              >
                Export CSV
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}




const HMPIBarChart = ({ processData }) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Initial set
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const axisFontSize = windowWidth < 640 ? 10 : windowWidth < 768 ? 12 : 14;

  const getHMPICategory = (value) => {
    if (value < 50) return { label: "Low", color: "#7CFC00" };       // Green
    if (value < 150) return { label: "Moderate", color: "#FFD700" }; // Yellow
    return { label: "High", color: "#FF6347" };                       // Red
  };

  if (!Array.isArray(processData) || processData.length === 0) {
    return (
      <div className="w-full text-center p-4">
        <p className="text-red-600">⚠ No HMPI data available</p>
      </div>
    );
  }

  const chartData = processData.map((entry) => {
    const category = getHMPICategory(entry.HMPI || 0);
    return {
      location: entry.location?.replace(/_/g, " ") || "Unknown",
      hmpi: entry.HMPI || 0,
      category: category.label,
      color: category.color,
    };
  });

  return (
    <div className="w-full max-w-full mx-auto p-2 sm:p-4">
      <h2 className="md:text-lg text-sm font-semibold mb-4 text-center">
        HMPI vs Location
      </h2>

      <div className="w-full h-[280px] sm:h-[360px] md:h-[400px]">
        <div className="text-xs text-slate-600 mb-2 text-center sm:text-left">
          HMPI (mg/l)
        </div>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="location"
              tickLine={false}
              angle={-65}
              textAnchor="end"
              interval={0}
              height={60}
              tick={{ fontSize: axisFontSize }}
            >
              <Label
                value="Location"
                position="insideBottom"
                offset={-60}
                fontSize={12}
              />
            </XAxis>

            <YAxis
              tick={{ fontSize: axisFontSize }}>

            </YAxis>

            <Tooltip
              formatter={(value, name, props) => {
                const category = props?.payload?.category || "Unknown";
                return [`${value} (${category})`, "HMPI"];
              }}
              labelFormatter={(label) => `Location: ${label}`}
            />

            <Bar dataKey="hmpi" name="HMPI" barSize={windowWidth < 640 ? 4 : 28}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const PieChartComponent = ({ location, percentageComposition }) => {
  if (!percentageComposition || Object.keys(percentageComposition).length === 0) {
    return (
      <div className="w-full mx-auto p-4 text-center">
        <p className="text-red-600 mt-4">
          ⚠ No metal contribution data available for <strong>{location}</strong>
        </p>
      </div>
    );
  }

  const total = Object.values(percentageComposition).reduce(
    (sum, val) => sum + (Number(val) || 0),
    0
  );

  const chartData = Object.entries(percentageComposition).map(([metal, value]) => {
    const numeric = Number(value) || 0;
    const percentage = total > 0 ? (numeric / total) * 100 : 0;
    return {
      name: metal,
      value: numeric,
      percentage: Number(percentage.toFixed(2)),
    };
  });

  if (total === 0) {
    return (
      <div className="w-full mx-auto p-4 text-center">
        <p className="text-yellow-600 mt-4">
          ⚠ Measurements for "{location}" sum to 0 — nothing to display.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <h2 className="text-sm md:text-xl font-semibold mb-4 text-center">
        {String(location).replace(/_/g, " ")}
      </h2>

      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="45%"
              outerRadius="70%"
              dataKey="value"
              nameKey="name"
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}-${index}`}
                  fill={colorCategoryMap[entry.name] || "#888478"}
                />
              ))}
              <LabelList
                dataKey="percentage"
                position="outside"
                formatter={(val, entry) => {
                  const name = entry?.payload?.name;
                  return val > 2 && name ? `${name}: ${val}%` : "";
                }}
              />
            </Pie>

            <Tooltip
              formatter={(value, name) => {
                return [`${Number(value)}`, name];
              }}
            />

            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: "12px" }}
              formatter={(value) => {
                const match = chartData.find((item) => item.name === value);
                return match ? `${value} (${match.value})` : value;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


const LeadingPollutantChart = ({ leadingCounts }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  // Get frequency object from the function
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Initial set
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const axisFontSize = windowWidth < 640 ? 10 : windowWidth < 768 ? 12 : 14;




  const chartData = Object.entries(leadingCounts).map(([metal, count]) => ({
    name: metal,
    value: count,
  }));



  return (
    <div className="w-full max-w-full mx-auto p-2 sm:p-4">
      <h2 className="md:text-lg text-sm font-semibold mb-4 text-center">
        Leading Pollutants across Locations
      </h2>

      <div className="w-full h-[280px] sm:h-[360px] md:h-[400px]">
        <div className="text-xs text-slate-600 mb-2 text-center sm:text-left">
          {windowWidth < 640 ? "No. of Locations" : "No. of Locations (Leading Pollutant)"}
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <BarChart

            data={chartData}
            margin={{ top: 20, right: 30, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tickLine={false}
              angle={-25}
              textAnchor="end"
              interval={0}
              height={60}
              tick={{ fontSize: axisFontSize }} />
            <YAxis tick={{ fontSize: axisFontSize }}>

            </YAxis>
            <Tooltip />

            <Bar dataKey="value" name="No. of Locations" barSize={windowWidth < 640 ? 10 : 28}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colorMap[entry.name] || "#8884d8"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};