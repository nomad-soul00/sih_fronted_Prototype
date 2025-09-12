export default function Footer() {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-white">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div aria-hidden="true" className="h-8 w-8 rounded bg-blue-700" />
              <span className="text-sm font-semibold text-gray-900">Groundwater Analysis Portal</span>
            </div>
            {/* Placeholder for official logo and links. */}
            <p className="text-sm text-gray-600"></p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900">Legal</h3>
           
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900">Contact</h3>
            <p className="text-sm text-gray-600">
              For assistance, see Help/Contact 
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Groundwater Analysis Portal
        </div>
      </div>
    </footer>
  )
}
