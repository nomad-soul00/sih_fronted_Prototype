export default function UploadBox({ title = "Upload Data" }) {
  return (
    <section aria-labelledby="upload-title" className="space-y-3">
      <h2 id="upload-title" className="text-base font-semibold text-gray-900">
        {title}
      </h2>
      <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="h-12 w-12 rounded-full bg-blue-50 text-blue-700 grid place-items-center">
            <span className="text-xl" aria-hidden="true">
              ⬆︎
            </span>
          </div>
          <p className="text-sm text-gray-700">Drag and drop CSV/Excel files here, or click to upload.</p>
          <p className="text-xs text-gray-500">No data uploaded yet. This is a static placeholder.</p>
          <button
            type="button"
            className="mt-2 inline-flex items-center justify-center rounded bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2"
          >
            Choose File
          </button>
        </div>
      </div>
    </section>
  )
}
