export default function Card({ title, children, footer, className = "" }) {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}>
      {title && (
        <div className="border-b border-gray-200 px-4 py-3">
          <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="px-4 py-4">{children}</div>
      {footer && <div className="border-t border-gray-200 px-4 py-3">{footer}</div>}
    </div>
  )
}
