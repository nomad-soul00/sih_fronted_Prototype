import UploadBox from "../components/UploadBox.jsx"
import DataPreviewTable from "../components/DataPreviewTable.jsx"
import SummaryCard from "../components/SummaryCard.jsx"

export default function CancerRisk() {
  return (
    <div className="space-y-10">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold text-gray-900 text-balance">Cancer Risk Model</h2>
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          Evaluate total and individual risk metrics. This page includes placeholders for risk outputs and
          visualizations.
        </p>
      </header>

      <UploadBox title="Upload CSV/Excel" />
      <DataPreviewTable caption="Data Preview (Cancer Risk)" />

      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            Run Calculation
          </button>
          <span className="text-sm text-gray-600">No computation occurs in this demo.</span>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Risk Metrics</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard title="Total Risk" value="—" hint="Awaiting data" />
          <SummaryCard title="Pb Risk" value="—" hint="Individual risk" />
          <SummaryCard title="As Risk" value="—" hint="Individual risk" />
          <SummaryCard title="Cr Risk" value="—" hint="Individual risk" />
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-4">
          <h4 className="font-medium text-gray-900">Risk Table</h4>
          <p className="mt-1 text-sm text-gray-700">Placeholder for computed risk by site/metal.</p>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Visualization</h3>
          <div className="h-56 rounded-lg border border-gray-200 bg-white grid place-items-center text-gray-500">
            Chart Placeholder
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900">Map</h3>
          <div className="h-56 rounded-lg border border-gray-200 bg-white grid place-items-center text-gray-500">
            Map Placeholder
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Download</h3>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
          >
            Download Report
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50"
          >
            Export Data
          </button>
        </div>
      </section>
    </div>
  )
}
