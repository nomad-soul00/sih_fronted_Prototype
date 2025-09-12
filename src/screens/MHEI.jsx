import UploadBox from "../components/UploadBox.jsx"
import DataPreviewTable from "../components/DataPreviewTable.jsx"
import SummaryCard from "../components/SummaryCard.jsx"
import Alert from "../components/Alert.jsx"
import Form from '../components/Form.jsx'
import StandardSelector from "../components/StandardSelector.jsx"

import { useState, useEffect } from "react"
import MheiLocation from "../components/MheiLocation.jsx"
import MheiSummary from "../components/MheiSummary.jsx"

export default function MHEI() {
  const [uploadedData, setUploadedData] = useState(null)
  const [computationData, setComputationData] = useState(null)
  const [tableData, setTableData] = useState([])
  const [standard, setStandard] = useState("BIS")
  const [year, setYear] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredLocations = computationData?.processData?.filter((loc) =>
    loc?.location?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // console.log(computationData);

  const handleStandardChange = (value) => {
    setStandard(value)
    setComputationData(null);
  }

  const handleCalculation = async () => {
    try {
      const response = await fetch("https://sih-backend-prototype.vercel.app/api/v1/compute/mhei", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          standard,
          data: uploadedData,
        }),
      })

      if (response.status === 200) {
        const Computationdata = await response.json()
        // console.log(Computationdata);
        setComputationData(Computationdata)
      }

    } catch (error) {
      console.log("Error fetching calculation data:", error)
    }
  }


  useEffect(() => {
    if (uploadedData && uploadedData.parsData && uploadedData.parsData.Sheet1) {
      setTableData(uploadedData.parsData.Sheet1)
      setYear(uploadedData.year)
    } else {
      setTableData(null)
      setStandard("BIS")
      setYear("")
    }
  }, [uploadedData])

  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900 text-balance">Metal Health Effect Index (MHEI)</h2>
        <p className="text-gray-900 leading-relaxed sm:text-lg max-w-4xl">
          Explore MHEI for <strong>Enhanced Diagnostic Power</strong>, <strong>More Granular Quality Assessment</strong>, <strong>International Best Practices</strong>
        </p>
        <p className="text-gray-800 leading-relaxed max-w-2xl">
          Unit accepted only <span className="font-bold"> mg/L</span>
        </p>
      </header>


      <Alert
        title="Prototype Notice"
        children={`Sample input data must match the template format: multiple locations for a single year. Click the 'Download Template' button for sample parameters || Limit - 20 Locations`}
        variant="danger"
      />



      <Form
        uploadUrl={`https://sih-backend-prototype.vercel.app/api/v1/data/mhei/upload`}
        storageKey="MHEI_UploadedData"
        onUploadSuccess={(data) => (data?.error ? console.error("Upload failed:", data.error) : setUploadedData(data),
          setComputationData(null))}
      />

      <DataPreviewTable data={tableData} caption="Data Preview-MHEI (mg/l)" />
      <StandardSelector onChange={handleStandardChange} />

      {/* Calculate */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            onClick={handleCalculation}
          >
            Run Calculation
          </button>
        </div>
      </section>

      {computationData && computationData.processData && (
        <div className="space-y-6">
          {/* 🔍 Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search location..."
              className="w-full max-w-md p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* 📦 Scrollable Location Section List */}
          <div
            className="space-y-6 bg-gray-300 overflow-y-auto px-2 py-2 rounded-lg pr-2"
            style={{ maxHeight: "900px" }} // Adjusted to roughly 10 cards worth of height
          >
            {filteredLocations?.length > 0 ? (
              filteredLocations.map((locationData, index) => (
                <MheiLocation
                  key={index}
                  locationData={locationData}
                  idealvalues={computationData.IdealValues}
                  standard={computationData.S1}
                  standardName={standard}
                />
              ))
            ) : (
              <p className="text-gray-500">No locations match your search.</p>
            )}
          </div>
        </div>
      )}

      {computationData && (
        <>
          {/* <SummarySection computationData={computationData} /> */}
          < MheiSummary computationData={computationData} />
        </>
      )}

    </div>
  )
}
