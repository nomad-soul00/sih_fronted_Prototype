import { Routes, Route } from "react-router-dom"
import Header from "./components/Header.jsx"
import Footer from "./components/Footer.jsx"

import Home from "./screens/Home.jsx"
import HMPI from "./screens/HMPI.jsx"
import MHEI from "./screens/MHEI.jsx"
import CancerRisk from "./screens/CancerRisk.jsx"
import About from "./screens/About.jsx"
import Help from "./screens/Help.jsx"

export default function App() {
  return (
    <div className="min-h-full flex bg-[#F5F7FA] flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto max-w-6xl px-4 py-8 space-y-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hmpi" element={<HMPI />} />
            <Route path="/mhei" element={<MHEI />} />
            <Route path="/cancer-risk" element={<CancerRisk />} />
            <Route path="/about" element={<About />} />
            <Route path="/help" element={<Help />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  )
}
