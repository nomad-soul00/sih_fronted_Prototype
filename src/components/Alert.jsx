const variants = {
  info: "border-blue-200 bg-blue-50 text-blue-900",
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  warning: "border-amber-200 bg-amber-50 text-amber-900",
  danger: "border-red-200 bg-red-100 text-red-900",
}

export default function Alert({ title, children, variant = "info" }) {
  return (
    <div className={`rounded-md border px-4 py-3 ${variants[variant] || variants.info}`}>
      {title && <div className="mb-1 text-sm font-semibold">{title}</div>}
      <div className="text-sm">{children}</div>
    </div>
  )
}
