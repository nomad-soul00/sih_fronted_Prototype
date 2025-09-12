"use client"

import { useState } from "react"

export default function StandardSelector({ onChange }) {
  const [selectedStandard, setSelectedStandard] = useState("BIS")

  const standards = [
    { value: "BIS", label: "BIS (Bureau of Indian Standards)", description: "Indian water quality standards" },
    { value: "WHO", label: "WHO (World Health Organization)", description: "International guidelines" },
    
  ]

  const handleChange = (value) => {
    setSelectedStandard(value)
    onChange(value)
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm md:text-lg font-semibold text-gray-900">Select Standard</h3>
      <div className="space-y-2">
        {standards.map((standard) => (
          <label
            key={standard.value}
            className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <input
              type="radio"
              name="standard"
              value={standard.value}
              checked={selectedStandard === standard.value}
              onChange={(e) => handleChange(e.target.value)}
              className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <div className="flex-1">
              <div className="text-[12px] md:text-sm font-medium text-gray-900">{standard.label}</div>
              <div className="text-[12px] md:text-sm text-gray-500">{standard.description}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  )
}
