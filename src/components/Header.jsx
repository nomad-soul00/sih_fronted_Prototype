"use client"

import { useEffect, useRef, useState } from "react"
import { NavLink } from "react-router-dom"

const navItems = [
  { to: "/", label: "Home" },
  { to: "/hmpi", label: "HMPI" },
  { to: "/mhei", label: "MHEI" },
  { to: "/cancer-risk", label: "Carcinogenic Risk Assessment" },
  { to: "/about", label: "About" },
  { to: "/help", label: "Help/Contact" },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const closeBtnRef = useRef(null)
  const [language, setLanguage] = useState("English")

  const close = () => setOpen(false)

  useEffect(() => {
    // close on Escape
    const onKey = (e) => {
      if (e.key === "Escape") close()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [])

  useEffect(() => {
    // prevent body scroll when menu is open
    if (open) {
      document.body.style.overflow = "hidden"
      setTimeout(() => {
        try {
          closeBtnRef.current?.focus()
        } catch {}
      }, 0)
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header className="border-b border-gray-200 bg-[#2E333A]">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div aria-hidden="true" className="h-9 w-9 rounded bg-blue-400" title="App logo" />
            <div className="text-white">
              <h1 className="text-lg font-semibold text-white text-pretty">Groundwater Analysis Portal</h1>
              <p className="text-sm text-gray-50">HMPI • MHEI • Cancer Risk</p>
            </div>
          </div>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden md:flex md:items-center md:gap-4">
            <ul className="flex flex-wrap items-center gap-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      [
                        "inline-block rounded px-3 py-2 text-sm transition-colors",
                        isActive ? "bg-blue-50 text-blue-800" : "text-white hover:bg-gray-100 hover:text-gray-900",
                      ].join(" ")
                    }
                    end={item.to === "/"}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Language Selector */}
            <div>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="ml-4 rounded border border-gray-300 bg-white px-2 py-1 text-sm"
                aria-label="Select language"
              >
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
              </select>
            </div>
          </nav>

          {/* Mobile hamburger button */}
          <div className="flex justify-end md:hidden">
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-controls="mobile-menu"
              aria-expanded={open ? "true" : "false"}
              aria-label="Open menu"
              className="inline-flex items-center gap-2 rounded px-3 py-2 text-sm text-white hover:bg-gray-100"
            >
              {/* Icon: Hamburger */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
              <span>Menu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        onClick={close}
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 ease-out md:hidden",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden="true"
      />

      {/* Mobile slide-in panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        className={[
          "fixed inset-y-0 right-0 z-50 w-72 bg-white shadow-xl md:hidden",
          "transform transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 id="mobile-menu-title" className="text-sm font-semibold text-gray-900">
            Menu
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={close}
            aria-label="Close menu"
            className="rounded p-2 text-gray-700 hover:bg-gray-100"
          >
            {/* Icon: X */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile" className="px-2 py-3">
          <ul className="flex flex-col gap-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={close}
                  className={({ isActive }) =>
                    [
                      "block rounded px-3 py-2 text-sm",
                      isActive ? "bg-blue-50 text-blue-800" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                    ].join(" ")
                  }
                  end={item.to === "/"}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Language Selector in Mobile Menu */}
          <div className="mt-4 px-3">
            <label htmlFor="mobile-language-select" className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              id="mobile-language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded border border-gray-300 bg-white px-2 py-1 text-sm"
              aria-label="Select language"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
            </select>
          </div>
        </nav>
      </div>
    </header>
  )
}
