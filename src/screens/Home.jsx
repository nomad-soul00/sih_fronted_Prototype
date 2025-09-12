import { Link } from "react-router-dom"
import Alert from "../components/Alert.jsx"

export default function Home() {
  return (
    <div className="space-y-10 bg-[#F5F7FA]">
      <Alert
        title="Prototype Notice"
        children="This application is a work-in-progress prototype. Some features are limited or not yet available."
        variant="danger"
      />


      <section className="space-y-4">
        <h2 className="text-3xl font-semibold text-gray-900 text-balance">Groundwater Analysis Portal</h2>
        <p className="text-gray-700 leading-relaxed max-w-2xl">
          Analyze groundwater quality using three established scientific models: <span className="font-bold"> Heavy Metal Pollution Index (HMPI)</span>,
          <span className="font-bold">Metal Health Effect Index (MHEI)</span>, and a <span className="font-bold">Cancer Risk Model</span>. Upload your data, preview it, and view results and
          reports. 
        </p>
      </section>



      <section className="space-y-4">
        <h3 className="text-lg font-semibold text-blue-800">Quick Links</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <CardLink color="#B8860B" to="/hmpi" title="HMPI & CD" desc="Heavy Metal Pollution Index And Contamination Degree" />
          <CardLink color="#1B8855" to="/mhei" title="MHEI" desc="Metal Health Effect Index" />
          <CardLink color="#d42424" to="/cancer-risk" title="Carcinogenic Risk Assessment" desc="Risk assessment" />

        </div>
      </section>
    </div>
  )
}

function CardLink({ color, to, title, desc }) {
  return (
    <Link
      to={to}
      className="block rounded-lg min-h-[120px] border border-gray-200 p-5 hover:border-gray-600 hover:shadow-lg transition"
      style={{ backgroundColor: color }}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h4 className="text-2xl font-semibold text-white">{title}</h4>
          <p className="text-sm text-gray-100">{desc}</p>
        </div>
        <span aria-hidden="true" className="text-white">
          →
        </span>
      </div>
    </Link>
  )
}
