export default function SummaryCard({ title, value, hint }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <p className="text-md uppercase tracking-wide font-bold text-gray-800">{title}</p>
      <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-gray-500">{hint}</p> : null}
    </div>
  )
}
