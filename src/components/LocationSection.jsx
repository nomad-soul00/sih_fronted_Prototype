"use client"

import { MapPin, BarChart3, Info, AlertTriangle, ChevronDown, ChevronUp, ExternalLink, ExternalLinkIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { ResponsiveContainer, BarChart, Pie, PieChart, LabelList, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Label } from 'recharts';

const colorMap = { As: "#FF6384", Cd: "#36A2EB", Cr: "#FFCE56", Cu: "#4BC0C0", Mn: "#9966FF", Ni: "#FF9F40", Pb: "#8B0000", Se: "#00CED1", Zn: "#7CFC00" };
// import InfoBox from "./InfoBox.jsx"
import DynamicTable from "./DynamicTable.jsx"

export default function LocationSection({ locationData, idealvalues, standard, standardName }) {
  const {
    location,
    coordinates,
    HMPI,
    Qi,
    Wi,
    metalContributions,
    percentageComposition,
    contaminationDegree,
    category,
    notes,
    Metals,
    concentrations,
  } = locationData
  // console.log(Metals);
  const [isTable1Minimized, setIsTable1Minimized] = useState(false)
  const [isTable2Minimized, setIsTable2Minimized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [hoveredCard, setHoveredCard] = useState(null)
  const [hoveredInfo, setHoveredInfo] = useState(null)


  const metalKeys = Object.keys(metalContributions)

  const categoryName = category?.level

  // console.log(locationData);

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

  const getHMPIColor = (value) => {
    if (!value) return "bg-gray-100 text-gray-700"
    if (value <= 50) return "bg-green-100 text-green-800"
    if (value <= 100) return "bg-lime-100 text-lime-800"
    if (value <= 200) return "bg-yellow-100 text-yellow-800"
    if (value <= 300) return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }



  const getAllertMessage = (value) => {
    if (value > 100) {
      return "Monitoring Required"
    } else {
      return "Some Actions Required"
    }
  }

  const getContaminationMessage = (cd) => {
    if (cd < 1) {
      return "Low";
    } else if (cd < 3) {
      return "Moderate";
    } else if (cd < 6) {
      return "Considerable";
    } else if (cd < 12) {
      return "High";
    } else if (cd < 24) {
      return "Very high";
    } else {
      return "Ultra–high";
    }
  };

  const getContaminationColor = (cd) => {
    if (cd < 1) {
      return "text-green-700 bg-green-100 border-green-200";
    } else if (cd < 3) {
      return "text-lime-700 bg-lime-100 border-lime-200";
    } else if (cd < 6) {
      return "text-yellow-700 bg-yellow-100 border-yellow-200";
    } else if (cd < 12) {
      return "text-amber-700 bg-amber-100 border-amber-200";
    } else if (cd < 24) {
      return "text-orange-800 bg-orange-100 border-orange-800";
    } else {
      return "text-red-800 bg-red-100 border-red-800";
    }
  };

  function formatCoords(lat, lon) {
    const latHem = lat >= 0 ? "N" : "S"
    const lonHem = lon >= 0 ? "E" : "W"
    const absLat = Math.abs(lat).toFixed(4)
    const absLon = Math.abs(lon).toFixed(4)
    return `${absLat}°${latHem}, ${absLon}°${lonHem}`
  }

  const getStatus = (metal) => {
    if (!concentrations[metal] || !standardName[metal]) return "No Data"
    return concentrations[metal] > standardName[metal] ? "Exceeded" : "Within Limit"
  }

  const getStatusColorClass = (status) => {
    return status === "Exceeded"
      ? "bg-red-100 text-red-800"
      : status === "Within Limit"
        ? "bg-green-100 text-green-800"
        : "bg-gray-100 text-gray-700"
  }




  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 md:px-6 px-1 py-4 border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h3 className="md:text-xl text-sm  font-semibold text-slate-900 flex items-center gap-1">
            <MapPin className="w-5 h-5 text-blue-600" />
            {location}
          </h3>
          <div className="flex items-center gap-3">
            <span className={`${getCategoryColor(categoryName)} px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-medium`}>
              {categoryName}
            </span>
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-slate-200 rounded-lg transition-colors duration-200 text-slate-600 hover:text-slate-900"
              aria-label={isMinimized ? "Maximize section" : "Minimize section"}
            >
              {isMinimized ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {!isMinimized && (
        <div className="p-2 md:p-6 space-y-6">
          {/* Summary Cards Section */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-4">

            <div
              className={`${getHMPIColor(HMPI)} md:p-4 p-2 rounded-lg border-2 relative cursor-pointer transition-all duration-200 hover:shadow-md`}
              onMouseEnter={() => setHoveredCard("hmpi")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
                target="_blank"
                onMouseEnter={(e) => {
                  e.stopPropagation()
                  setHoveredInfo("hmpi")
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation()
                  setHoveredInfo(null)
                }}
              // onClick={(e) => e.preventDefault()}
              >
                <Info className="w-4 h-4 opacity-70 hover:opacity-100" />
              </div>

              <div className="md:text-xs text-[10px] font-medium uppercase tracking-wide mb-1">HMPI Score</div>
              <div className="md:text-2xl text-md font-bold">{`${HMPI} -${categoryName.split(" ")[0]}`}</div>
              <div className="md:text-xs text-[10px]  mt-1">Heavy Metal Pollution Index</div>

              {hoveredInfo === "hmpi" && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-xl p-4 z-50">
                  <h5 className="font-semibold text-slate-900 mb-2">Heavy Metal Pollution Index (HMPI)</h5>
                  <p className="text-sm text-slate-600 mb-3">
                    Comprehensive index measuring overall heavy metal contamination levels in water samples.
                  </p>

                </div>
              )}
            </div>

            {/* Contamination Degree Card  */}
            <div
              className={`${getContaminationColor(contaminationDegree)} md:p-4 p-2 rounded-lg border relative cursor-pointer transition-all duration-200 hover:shadow-md`}
              onMouseEnter={() => setHoveredCard("contamination")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                href="#"
                target="_blank"
                className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
                onMouseEnter={(e) => {
                  e.stopPropagation()
                  setHoveredInfo("contamination")
                }}
                onMouseLeave={(e) => {
                  e.stopPropagation()
                  setHoveredInfo(null)
                }}

              >
                <Info className="w-4 h-4 opacity-70 hover:opacity-100" />
              </div>

              <div className="md:text-xs text-[10px]  font-medium uppercase tracking-wide mb-1">Contamination Degree</div>
              <div className="md:text-xl text-md font-semibold">{`${getContaminationMessage(contaminationDegree)} (${contaminationDegree})`}</div>
              <div className="md:text-xs text-[10px]  mt-1">Cd Classification</div>

              {hoveredInfo === "contamination" && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-xl p-4 z-50">
                  <h5 className="font-semibold text-slate-900 mb-2">Contamination Degree (Cd)</h5>
                  <p className="text-sm text-slate-600 mb-3">
                    Represents the overall level of pollution in a water sample based on combined contaminant concentrations.
                  </p>

                </div>
              )}
            </div>

            {/* Pollution Category Card - Replace {getCategoryColor(category)} with static class and {parameters.alertStatus} with static text */}
            <div className="md:p-4 p-2 rounded-lg border text-amber-700 bg-amber-100 border-amber-200">
              <div className="text-xs font-medium uppercase tracking-wide text-amber-700 mb-1 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Alert Status
              </div>
              <div className="text-sm font-medium text-amber-800">{getAllertMessage(HMPI)}</div>
              <div className="text-xs text-amber-600 mt-1">Requires monitoring</div>
            </div>

            {/* Location Info Card - Replace {location} and {parameters.coordinates} with static text */}
            <div className="md:p-4 p-2 rounded-lg border border-blue-200 bg-blue-50">
              <div className="text-xs font-medium uppercase tracking-wide text-blue-700 mb-1">Location Info</div>
              <div className="text-sm font-medium text-blue-900">{location}</div>
              <div className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {`Coordinates:${formatCoords(coordinates.latitude, coordinates.longitude)}`}
              </div>
            </div>

            {/* Status Notes Card - Replace {parameters.statusNotes} and {parameters.lastUpdated} with static text */}
            <div className="md:p-4 p-2 rounded-lg border border-slate-200 bg-slate-50">
              <div className="text-xs font-medium uppercase tracking-wide text-slate-600 mb-1">Status Notes</div>
              <div className="text-md text-slate-800 font-bold">{notes}</div>
              <div className="text-xs text-slate-500 mt-1">Last updated:---</div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex flex-col gap-6">
            {/* Left Column - Tables (60% width) */}
            <div className="space-y-6">
              {/* Metal Concentrations Table */}

              <DynamicTable
                title="Metal Concentrations Analysis"
                type="concentration"
                minimized={isTable1Minimized}
                setMinimized={setIsTable1Minimized}
                Metals={Metals}
                concentrations={concentrations}
                standard={standard}
                idealvalues={idealvalues}
                standardName={standardName}
              />

              {/* HMPI Components Table */}
              <DynamicTable
                title="HMPI Components Breakdown"
                type="hmpi"
                minimized={isTable2Minimized}
                setMinimized={setIsTable2Minimized}
                Metals={Metals}
                Qi={Qi}
                Wi={Wi}
                percentageComposition={percentageComposition}
                metalContributions={metalContributions}
              />

            </div>

            {/* Charts Section - Now below tables */}
            <div className="space-y-4">

              {/* Charts Grid */}
              <div className="flex flex-col gap-6 items-center w-full">
                {/* Metal Contribution Chart */}
                <div className="w-full  bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg px-0 py-2 md:p-6">
                  <BarChartComponent location={location} metalContributions={metalContributions} />
                </div>

                {/* Composition Distribution Chart */}
                 <div className="w-full  bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg px-0 py-2 md:p-6">
                  <PieChartComponent location={location} percentageComposition={percentageComposition} />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section - Replace {parameters.analysisMethod} and {parameters.sampleDate} with static text */}
          <div className="border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between text-sm text-slate-600">
              <div className="flex items-center gap-4">
                <span>Sample Date: {new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span>Hover over values for detailed information</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}





const BarChartComponent = ({ location, metalContributions }) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Initial set
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const axisFontSize = windowWidth < 640 ? 10 : windowWidth < 768 ? 12 : 14;



  if (!metalContributions || Object.keys(metalContributions).length === 0) {
    return (
      <div className="w-full mx-auto p-4 text-center">
        <p className="text-red-600 mt-4">
          ⚠ No metal contribution data available for <strong>{location}</strong>
        </p>
      </div>
    );
  }

  const chartData = Object.entries(metalContributions).map(([metal, value]) => ({
    name: metal,
    value,
  }));

  return (
    <div className="w-full max-w-full mx-auto p-2 sm:p-4">
      <h2 className="md:text-lg text-sm font-semibold mb-4 text-center">
        HMPI Contributions – {location.replace(/_/g, " ")}
      </h2>

      <div className="w-full h-[280px] sm:h-[360px] md:h-[400px]">

        <div className="text-xs text-slate-600 mb-2 text-center sm:text-left">
          {windowWidth < 640 ? "HMPI (mg/l)" : "Contribution to HMPI (mg/l)"}
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
              tick={{ fontSize: axisFontSize }}
            />

            <YAxis
              tick={{ fontSize: axisFontSize }}
            >
             
            </YAxis>

            <Tooltip />
            <Bar dataKey="value" name="Contribution (mg/l)" barSize={windowWidth < 640 ? 10 : 28}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colorMap[entry.name] || "#8884d8"} />
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
        % Distribution of Metal Pollution – {String(location).replace(/_/g, " ")}
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
                  fill={colorMap[entry.name] || "#8884d8"}
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
              formatter={(value, name, props) => {
                const pct = props?.payload?.percentage;
                return [`${Number(value).toFixed(2)}  (${pct}%)`, name];
              }}
            />

            <Legend
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              wrapperStyle={{ fontSize: "12px" }}
              formatter={(value) => {
                const match = chartData.find((item) => item.name === value);
                return match ? `${value} (${match.percentage}%)` : value;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


