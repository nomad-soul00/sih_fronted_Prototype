import React from 'react'
import { MapPin, BarChart3, Info, AlertTriangle, ChevronDown, ChevronUp, ExternalLink, ExternalLinkIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { ResponsiveContainer, BarChart, Pie, PieChart, LabelList, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Cell, Label } from 'recharts';
import DynamicTable from './DynamicTable.jsx'


const colorMap = { As: "#FF6384", Cd: "#36A2EB", Cr: "#FFCE56", Cu: "#4BC0C0", Mn: "#9966FF", Ni: "#FF9F40", Pb: "#8B0000", Se: "#00CED1", Zn: "#7CFC00" };
const MheiLocation = ({ locationData, idealvalues, standard, standardName }) => {
    const {
        Metals,
        MheiPerMetal,
        NEI,
        PEI,
        PEI_NEI_category,
        Qi,
        Wi,
        concentrations,
        location,
        coordinates,
        relative_Wi,
        percentageContributions

    } = locationData

    // console.log(PEI_NEI_category)


    const [isTable1Minimized, setIsTable1Minimized] = useState(false)
    const [isTable2Minimized, setIsTable2Minimized] = useState(false)
    const [isMinimized, setIsMinimized] = useState(true)
    const [hoveredCard, setHoveredCard] = useState(null)
    const [hoveredInfo, setHoveredInfo] = useState(null)

    function getWaterQuality(NEI, PEI) {
        if (NEI >= -100 && NEI <= 0 && PEI === 0) {
            return "Excellent";
        } else if (NEI > -100 && NEI <= 0 && PEI > 0 && PEI <= 50) {
            return "Good";
        } else if (NEI > -100 && NEI <= 0 && PEI > 50 && PEI <= 100) {
            return "Moderate";
        } else if (NEI === 0 && PEI > 100) {
            return "Unsuitable";  // Moved up
        } else if (NEI > -100 && NEI <= 0 && PEI > 100) {
            return "Poor";
        } else {
            return "Invalid values or no classification available";
        }
    }


    const getCategoryColor = (categoryName) => {
        switch (categoryName) {
            case "Excellent":
                return "text-green-700 bg-green-100 border-green-800"
            case "Good":
                return "text-yellow-700 bg-yellow-100 border-yellow-800"
            case "Moderate":
                return "text-orange-700 bg-orange-100 border-orange-800"
            case "Poor":
                return "text-red-700 bg-red-100 border-red-700"
            case "Unsuitable":
                return "text-red-900 bg-red-300 border-red-800"
            default:
                return "text-gray-700 bg-gray-100 border-gray-200"
        }
    }

    function getNEIColor(NEI) {
        if (NEI >= -100 && NEI <= 0) {
            return "bg-green-100 text-green-800";
        } else if (NEI > 0 && NEI <= 50) {
            return "bg-yellow-100 text-yellow-800";
        } else if (NEI > 50 && NEI <= 100) {
            return "bg-orange-100 text-orange-800";
        } else if (NEI > 100) {
            return "bg-red-100 text-red-800";
        } else {
            return "bg-gray-100 text-gray-700";
        }
    }

    const getNEICategory = (NEI) => {
        if (NEI >= -100 && NEI <= 0) {
            return "Safe";
        } else if (NEI > 0 && NEI <= 100) {
            return "Moderate";
        } else if (NEI > 100) {
            return "Unsafe";
        } else {
            return "Unknown";
        }
    }

    const getPEIColor = (PEI) => {
        if (PEI === 0) {
            return "bg-green-100 text-green-800";
        } else if (PEI > 0 && PEI <= 50) {
            return "bg-yellow-100 text-yellow-800";
        } else if (PEI > 50 && PEI <= 100) {
            return "bg-orange-100 text-orange-800";
        } else if (PEI > 100) {
            return "bg-red-100 text-red-800";
        } else {
            return "bg-gray-100 text-gray-700";
        }
    };

    function formatCoords(lat, lon) {
        const latHem = lat >= 0 ? "N" : "S"
        const lonHem = lon >= 0 ? "E" : "W"
        const absLat = Math.abs(lat).toFixed(4)
        const absLon = Math.abs(lon).toFixed(4)
        return `${absLat}°${latHem}, ${absLon}°${lonHem}`
    }

    const getHighestMHEIMetal = (MheiPerMetal, Metals) => {
        if (!MheiPerMetal || Object.keys(MheiPerMetal).length === 0) return "—";

        let maxMetal = null;
        let maxValue = -Infinity;

        for (const metal in MheiPerMetal) {
            if (MheiPerMetal[metal] > maxValue) {
                maxMetal = metal;
                maxValue = MheiPerMetal[metal];
            }
        }

        const metalLabel = Metals?.[maxMetal] ?? maxMetal;

        return `${metalLabel} (${maxValue.toFixed(2)})`;
    };



    return (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-slate-50 px-3 md:px-6 py-2 md:py-4 border-b border-slate-200">
                <div className="flex items-center justify-between">
                    <h3 className="text-sm md:text-xl font-semibold text-slate-900 flex items-center gap-2">
                        <MapPin className="w-3 md:w-5 h-5 text-blue-600" />
                        {location}
                    </h3>
                    <div className="flex items-center gap-2 md:gap-3">
                        <span className={`${getCategoryColor(getWaterQuality(NEI, PEI))} px-3 py-1 rounded-full text-[11px] md:text-sm font-medium`}>
                            {getWaterQuality(NEI, PEI)}
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 md:gap-4">

                        <div
                            className={`${getNEIColor(NEI)} md:p-4 p-2 rounded-lg border relative cursor-pointer transition-all duration-200 hover:shadow-md`}
                            onMouseEnter={() => setHoveredCard("nei")}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <a
                                href="#"
                                className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
                                target="_blank"
                                onMouseEnter={(e) => {
                                    e.stopPropagation()
                                    setHoveredInfo("nei")
                                }}
                                onMouseLeave={(e) => {
                                    e.stopPropagation()
                                    setHoveredInfo(null)
                                }}
                            // onClick={(e) => e.preventDefault()}
                            >
                                <Info className="w-4 h-4 opacity-70 hover:opacity-100" />
                            </a>

                            <div className="md:text-xs text-[10px] font-medium uppercase tracking-wide mb-1">NEI Score</div>
                            <div className="md:text-2xl text-md font-bold">{`${NEI}`}</div>
                            <div className="md:text-xs text-[10px] mt-1">Negative Evaluation Index</div>

                            {hoveredInfo === "nei" && (
                                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-xl p-4 z-50">
                                    <h5 className="font-semibold text-slate-900 mb-2">Negative Evaluation Index (NEI)</h5>
                                    <p className="text-sm text-slate-600 mb-3">
                                    </p>

                                </div>
                            )}
                        </div>

                        {/* PEI  */}
                        <div
                            className={`${getPEIColor(PEI)} md:p-4 p-2 rounded-lg border relative cursor-pointer transition-all duration-200 hover:shadow-md`}
                            onMouseEnter={() => setHoveredCard("pei")}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <a
                                href="#"
                                target="_blank"
                                className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
                                onMouseEnter={(e) => {
                                    e.stopPropagation()
                                    setHoveredInfo("pei")
                                }}
                                onMouseLeave={(e) => {
                                    e.stopPropagation()
                                    setHoveredInfo(null)
                                }}

                            >
                                <Info className="w-4 h-4 opacity-70 hover:opacity-100" />
                            </a>

                            <div className="md:text-xs text-[10px] font-medium uppercase tracking-wide mb-1">PEI Score</div>
                            <div className="md:text-xl text-md font-semibold">{`${PEI}`}</div>
                            <div className="md:text-xs text-[10px] mt-1">Positive Evaluation Index</div>

                            {hoveredInfo === "pei" && (
                                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-xl p-4 z-50">
                                    <h5 className="font-semibold text-slate-900 mb-2">Positive Evaluation Index (PEI)</h5>
                                    <p className="text-sm text-slate-600 mb-3">
                                    </p>

                                </div>
                            )}
                        </div>

                        {/* MEHI classification */}
                        <div
                            className={`${getCategoryColor(getWaterQuality(NEI, PEI))} p-2 md:p-4 rounded-lg border-2 relative cursor-pointer transition-all duration-200 hover:shadow-md`}
                            onMouseEnter={() => setHoveredCard("mhei")}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <a
                                href="#"
                                target="_blank"
                                className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
                                onMouseEnter={(e) => {
                                    e.stopPropagation()
                                    setHoveredInfo("mhei")
                                }}
                                onMouseLeave={(e) => {
                                    e.stopPropagation()
                                    setHoveredInfo(null)
                                }}

                            >
                                <Info className="w-4 h-4 opacity-70 hover:opacity-100" />
                            </a>

                            <div className="md:text-xs text-[10px] font-medium uppercase tracking-wide mb-1">MHEI Classification</div>
                            <div className="md:text-xl text-md font-semibold">{`${getWaterQuality(NEI, PEI)}`}</div>
                            <div className="md:text-xs text-[10px] mt-1">Modified Heavy Metal Evaluation Index </div>

                            {hoveredInfo === "mhei" && (
                                <div className="absolute top-full left-0 mt-2 w-72 bg-white border border-slate-200 rounded-lg shadow-xl p-4 z-50">
                                    <h5 className="font-semibold text-slate-900 mb-2">Modified Heavy Metal Evaluation Index (MHEI)</h5>
                                    <p className="text-sm text-slate-600 mb-3">
                                    </p>

                                </div>
                            )}
                        </div>

                        {/* dominant pllution */}
                        <div className="p-2 md:p-4 rounded-lg border border-slate-200 bg-slate-50">
                            <div className="md:text-xs text-[10px] font-medium uppercase tracking-wide text-slate-600 mb-1">Dominant Pollutants</div>
                            <div className="md:text-md text-sm text-slate-800 font-bold">{getHighestMHEIMetal(MheiPerMetal, Metals)}</div>
                            <div className="md:text-xs text-[10px] text-slate-500 mt-1">Last updated:---</div>
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


                    </div>

                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                        {/* Left Column - Tables (60% width) */}
                        <div className="lg:col-span-3 space-y-6">
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

                            {/* Mhei Components Table */}
                            <DynamicTable
                                title="Weighting, Indexes, and Classifications"
                                type="mhei"
                                minimized={isTable2Minimized}
                                setMinimized={setIsTable2Minimized}
                                Metals={Metals}
                                Qi={Qi}
                                Wi={Wi}
                                relative_Wi={relative_Wi}
                                MheiPerMetal={MheiPerMetal}
                                PEI_NEI_category={PEI_NEI_category}
                            />


                        </div>

                        {/* Right Column - Map and Charts (40% width) */}
                        <div className="lg:col-span-2 space-y-6">


                            {/* Charts Section */}
                            <div className="space-y-4">
                                {/* Metal Contribution Chart */}
                                <div className="w-full  bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg px-0 py-2 md:p-6">
                                    <BarChartComponent location={location} metalContributions={MheiPerMetal} />
                                </div>

                                {/* Composition Distribution Chart */}
                                <div className="w-full  bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg px-0 py-2 md:p-6">
                                    <PieChartComponent location={location} percentageComposition={percentageContributions} />

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Section - Replace {parameters.analysisMethod} and {parameters.sampleDate} with static text */}
                    <div className="border-t border-slate-200 pt-4">
                        <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
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

export default MheiLocation



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
                MHEI Contributions – {location.replace(/_/g, " ")}
            </h2>

            <div className="w-full h-[280px] sm:h-[360px] md:h-[400px]">

                <div className="text-xs text-slate-600 mb-2 text-center sm:text-left">
                    {windowWidth < 640 ? "MHEI (mg/l)" : "Contribution to MHEI (mg/l)"}
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
                PEI Contribution or Dominant Pollutant Metals – {String(location).replace(/_/g, " ")}
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
