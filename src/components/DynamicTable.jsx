"use client"

import { ChevronDown, ChevronUp, Info } from "lucide-react"

export default function DynamicTable({
    title,
    type,
    minimized,
    setMinimized,
    Metals = {},
    concentrations = {},
    standard = {},
    standardName = "",
    idealvalues = {},
    Wi = {},
    Qi = {},
    percentageComposition = {},
    metalContributions = {},

    relative_Wi = {},
    MheiPerMetal = {},
    PEI_NEI_category = {},
}) {


    // console.log(calculateNormalizedWeights(Wi, MheiPerMetal));
    // console.log(MheiPerMetal);






    const getColumns = () => {
        if (type === "concentration") {
            return [
                { label: "Metal", key: "metal" },
                { label: "Conc. (mg/L)", key: "concentration" },
                { label: `${standardName} Limit (mg/L)`, key: "standard" },
                { label: "Ideal Value (mg/L)", key: "ideal" },
            ]
        } else if (type === "hmpi") {
            return [
                { label: "Metal", key: "metal" },
                { label: "Weight (WI)", key: "wi" },
                { label: "Sub-Index (QI)", key: "qi" },
                { label: "% Contribution", key: "percentage" },
                { label: "HMPI Contribution", key: "contribution" },
            ]
        } else if (type === "mhei") {
            return [
                { label: "Metal", key: "metal" },
                { label: "Weight (WI)", key: "wi" },
                { label: "RelativeWeight (rWI)", key: "rwi" },
                { label: "Sub-Index (QI)", key: "qi" },
                { label: "MHEI Contribution", key: "mhei" },
                { label: "NEI/PEI Classification", key: "pei_nei" },
            ]
        }

        return []
    }

    const columns = getColumns()

    // Generate rows based on type
    const getRowData = (metalKey) => {
        if (type === "concentration") {
            return {
                metal: Metals[metalKey],
                concentration: concentrations[metalKey] ?? "—",
                standard: standard[metalKey] ?? "—",
                ideal: idealvalues[metalKey] ?? "—",
            }
        } else if (type === "hmpi") {
            return {
                metal: Metals[metalKey],
                wi: Wi[metalKey]?.toFixed(2) ?? "—",
                qi: Qi[metalKey]?.toFixed(2) ?? "—",
                percentage: `${percentageComposition[metalKey]?.toFixed(2) ?? "—"}%`,
                contribution: metalContributions[metalKey]?.toFixed(2) ?? "—",
            }
        } else if (type === "mhei") {
            return {
                metal: Metals[metalKey],
                wi: Wi[metalKey]?.toFixed(2) ?? "—",
                rwi: relative_Wi[metalKey]?.toFixed(4) ?? "—",
                qi: Qi[metalKey]?.toFixed(2) ?? "—",
                mhei: MheiPerMetal[metalKey]?.toFixed(2) ?? "—",
                pei_nei: PEI_NEI_category[metalKey] ?? "—",
            }
        }

        return {}
    }


    return (
        <div className="bg-gray-200 rounded-lg sm:px-2 px-1 py-1">
            <div className="flex items-center justify-between mb-4">
                <h4 className="sm:text-lg text-md font-semibold text-slate-900 flex items-center gap-2">
                    {type === "concentration" && <Info className="w-5 h-5 text-blue-600" />}
                    {title}
                </h4>
                <button
                    onClick={() => setMinimized(!minimized)}
                    className="p-2 hover:bg-white rounded-lg transition-colors duration-200 text-slate-600 hover:text-slate-900"
                    aria-label={minimized ? "Maximize table" : "Minimize table"}
                >
                    {minimized ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </button>
            </div>

            {!minimized && (
                <div className="overflow-x-auto rounded-lg border border-slate-200 max-h-80 overflow-y-auto">
                    <table className="min-w-full">
                        <thead className="bg-slate-50 sticky top-0">
                            <tr>
                                {columns.map((col) => (
                                    <th
                                        key={col.key}
                                        className="px-2 sm:px-4 py-3 text-left sm:text-xs text-[9px] font-medium text-slate-600 uppercase tracking-wider"
                                    >
                                        {col.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {Object.keys(Metals).map((key, index) => {
                                const row = getRowData(key)
                                return (
                                    <tr key={key} className={index % 2 === 0 ? "bg-white" : "bg-slate-50"}>
                                        {columns.map((col) => (
                                            <td
                                                key={col.key}
                                                className="px-4 py-3 sm:text-sm text-[9px] font-semibold text-slate-700"
                                            >
                                                {row[col.key]}
                                            </td>
                                        ))}
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
