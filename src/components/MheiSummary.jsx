import React from 'react'

import { useState } from "react"
import { Plus, Minus, Info, BarChart3, PieChart, TrendingUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react"


const MheiSummary = ({ computationData }) => {
    const { processData, S1, IdealValues } = computationData
    // console.log(processData);


    const [isMinimized, setIsMinimized] = useState(false)
    const [minimizedTables, setMinimizedTables] = useState({
        rankings: false,
        metalAnalysis: false,
    })
    const [hoveredInfo, setHoveredInfo] = useState(null)

    const total_location = processData.length;

    const goodLocations = processData
        ?.filter(location =>
            location.waterQuality === "Good" || location.waterQuality === "Excellent"
        )
        .map(location => location.location);

    const badLocations = processData?.filter(location => location.waterQuality === "Poor" || location.waterQuality === 'Unsuitable').map(location => location.location);


    function getHighestMHEIPerLocation(processData) {
        const highestMheiMetal = [];

        processData.forEach((location) => {
            const locationMhei = location.MheiPerMetal;

            if (!locationMhei || typeof locationMhei !== 'object') {
                highestMheiMetal.push(null); // Optional: can skip or push null
                return;
            }

            const highestMetal = Object.keys(locationMhei).reduce((a, b) =>
                locationMhei[a] > locationMhei[b] ? a : b
            );

            highestMheiMetal.push(highestMetal);
        });

        // Count frequency of each metal
        const freqMap = {};
        highestMheiMetal.forEach(metal => {
            if (metal) {
                freqMap[metal] = (freqMap[metal] || 0) + 1;
            }
        });

        // Find max frequency
        const maxFreq = Math.max(...Object.values(freqMap));

        // Get all metals with max frequency
        const dominantMetals = Object.entries(freqMap)
            .filter(([metal, count]) => count === maxFreq)
            .map(([metal]) => metal);

        return {
            dominantMetals     // e.g. [ 'As' ]
        };
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



    // const dominantPollutant = getHighestMHEIPerLocation(processData);
    // // console.log(dominantPollutant.dominantMetals);



    // console.log(badLocations.length)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-md md:text-lg font-semibold text-gray-900">Results Summary</h3>
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
                            <div className="rounded-lg border border-gray-500 bg-white p-4  relative">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-[12px] md:text-sm font-medium text-gray-600">Total Locations</h4>

                                    </div>
                                    <div className="text-xl md:text-2xl font-semibold text-gray-900">{total_location}</div>
                                    <p className="text-[12px] md:text-sm text-gray-500">Analyzed for MHEI</p>
                                </div>
                            </div>



                            {/* Most Polluted Card */}
                            <div className="rounded-lg border-1 border-red-400 bg-red-50 p-4 relative">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium text-red-700">Concerned Location</h4>

                                    </div>
                                    <div className="text-2xl font-semibold text-red-600">{badLocations.length}</div>
                                    <p className="text-xs text-gray-800">{` Location with Poor/Unsuitable water quality`}</p>
                                </div>
                            </div>

                            {/* Safest Location Card */}
                            <div className="rounded-lg border bg-green-50 border-green-800 p-4 relative">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium text-green-600">Safe Locations</h4>
                                    </div>
                                    <div className="text-2xl font-semibold text-green-600">{goodLocations.length}</div>
                                    <p className="text-xs text-gray-700">{` Location with Excelletn/Good water quality`}</p>
                                </div>
                            </div>

                            <div className="rounded-lg border bg-gray-100 border-gray-800 p-4 relative">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-medium text-gray-600">Most Common Pollutant</h4>
                                    </div>
                                    <div className="text-2xl font-semibold text-gray-600">{getHighestMHEIPerLocation(processData).dominantMetals}</div>
                                    <p className="text-xs text-gray-700">{`Appeared the most in Sites`}</p>
                                </div>
                            </div>


                        </div>
                    </section>

                    <section className="space-y-4">
                        <div className="space-y-6">
                            {/* Location Rankings Table */}
                            <div className="rounded-lg border border-gray-200 bg-white">
                                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                                    <h4 className="text-sm sm:text-lg font-semibold text-gray-900">Location Rankings</h4>
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
                                                    <th className="px-2 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                                                        Sl no.
                                                    </th>
                                                    <th className="px-2 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                                                        Location Name
                                                    </th>
                                                    <th className="px-2 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                                                        NEI Score
                                                    </th>
                                                    <th className="px-2 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">PEI Score</th>
                                                    <th className="px-2 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                                                        Classification
                                                    </th>
                                                    <th className="px-2 sm:px-4 py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase">
                                                        Dominant Pollutants
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200">
                                                {processData.map((row, i) => (
                                                    // console.log(row),
                                                    <tr key={i}>
                                                        <td className="px-2 sm:px-4 py-3 text-[10px] sm:text-sm text-gray-900 font-semibold">{i+1}</td>
                                                        <td className="px-2 sm:px-4 py-3 text-[10px] sm:text-sm text-gray-900 font-semibold">{row.location}</td>
                                                        <td className={`px-2 sm:px-4 py-3 text-[10px] sm:text-sm text-gray-900`}>{row.NEI.toFixed(2)}</td>
                                                        <td className={`px-2 sm:px-4 py-3 text-[10px] sm:text-sm text-gray-900`}>{row.PEI.toFixed(2)}</td>
                                                        <td className="px-2 sm:px-4 py-3">
                                                            <span className={`px-2 py-1 text-[10px] sm:text-xs font-medium rounded-full ${getCategoryColor(row.waterQuality)}`}>
                                                                {row.waterQuality}
                                                            </span>
                                                        </td>
                                                        <td className="px-2 sm:px-4 py-3 text-[10px] sm:text-sm font-medium text-gray-900">{getTopPollutant(row.MheiPerMetal, row.Metals)}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>




                                    </div>
                                )}
                            </div>




                        </div>
                    </section>

                    <section className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900">Visual Analysis</h3>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {/* HMPI Comparison Chart */}
                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <BarChart3 className="text-blue-600" size={20} />
                                    <h4 className="font-semibold text-gray-900">MHEI Comparison</h4>
                                </div>
                                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                    <div className="text-center text-gray-500">
                                        <BarChart3 size={32} className="mx-auto mb-2" />
                                        <p className="text-sm">Bar Chart Placeholder</p>
                                        <p className="text-xs">Location MHEI Comparison</p>
                                    </div>
                                </div>
                            </div>

                            {/* Category Distribution */}
                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <PieChart className="text-green-600" size={20} />
                                    <h4 className="font-semibold text-gray-900">Category Distribution</h4>
                                </div>
                                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                    <div className="text-center text-gray-500">
                                        <PieChart size={32} className="mx-auto mb-2" />
                                        <p className="text-sm">Pie Chart Placeholder</p>
                                        <p className="text-xs">Pollution Category Distribution</p>
                                    </div>
                                </div>
                            </div>

                            {/* Top Problematic Metals */}
                            <div className="rounded-lg border border-gray-200 bg-white p-6">
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendingUp className="text-red-600" size={20} />
                                    <h4 className="font-semibold text-gray-900">Top Problematic Metals</h4>
                                </div>
                                <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                                    <div className="text-center text-gray-500">
                                        <TrendingUp size={32} className="mx-auto mb-2" />
                                        <p className="text-sm">Horizontal Bar Chart</p>
                                        <p className="text-xs">Most Problematic Metals</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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

export default MheiSummary
