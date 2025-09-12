"use client"

import { useState } from "react"

export default function About() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsSidebarOpen(false)
    }
  }
  const data = [
    {
      location: "Vijayawada_Rural",
      latitude: 16.501508,
      longitude: 80.676725,
      Pb: 0.012,
      As: 0.046,
      Cr: 0.002,
      Cd: 0.001,
      Se: 0.008,
      Ni: 0.21,
      Mn: 0.09,
      Zn: 0.025,
      Cu: 0.022,
    },
    {
      location: "Nellore_City",
      latitude: 14.442598,
      longitude: 79.986457,
      Pb: 0.019,
      As: 0.073,
      Cr: 0.004,
      Cd: 0.002,
      Se: 0.012,
      Ni: 0.44,
      Mn: 0.12,
      Zn: 0.018,
      Cu: 0.019,
    },
  ];

  const BIShmpiLevel = [
    { range: "< 50", level: "Safe" },
    { range: "50 - 99", level: "Low" },
    { range: "100 - 200", level: "Moderate" },
    { range: "201 - 300", level: "High" },
    { range: "> 300", level: "Critical" },
  ];

  const WHOhmpiLevel = [
    { range: "< 50", level: "Safe" },
    { range: "50 - 99", level: "Moderate" },
    { range: "≥ 100", level: "Critical" },
  ];

  const contaminationLevels = [
    { range: "< 1", message: "Low contamination" },
    { range: "1 - 2.99", message: "Moderate contamination" },
    { range: "3 - 5.99", message: "Considerable contamination" },
    { range: "6 - 11.99", message: "High contamination" },
    { range: "12 - 23.99", message: "Very high contamination" },
    { range: "≥ 24", message: "Ultra–high contamination" },
  ];

  const waterQualityData = [
    {
      NEI: "−100 ≤ NEI ≤ 0",
      PEI: "PEI = 0",
      Quality: "Excellent",
    },
    {
      NEI: "−100 < NEI ≤ 0",
      PEI: "0 < PEI ≤ 50",
      Quality: "Good",
    },
    {
      NEI: "−100 < NEI ≤ 0",
      PEI: "50 < PEI ≤ 100",
      Quality: "Moderate",
    },
    {
      NEI: "−100 < NEI ≤ 0",
      PEI: "PEI > 100",
      Quality: "Poor",
    },
    {
      NEI: "NEI = 0",
      PEI: "PEI > 100",
      Quality: "Unsuitable",
    },
    {
      NEI: "Other values",
      PEI: "Other values",
      Quality: "Invalid values or no classification available",
    },
  ];


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
        >
          <div className="flex flex-col gap-1">
            <div className="w-5 h-0.5 bg-current"></div>
            <div className="w-5 h-0.5 bg-current"></div>
            <div className="w-5 h-0.5 bg-current"></div>
          </div>
          <span className="text-sm font-medium">Table of Contents</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        <aside
          className={`
          fixed inset-0 z-50 bg-black bg-opacity-50 lg:bg-transparent lg:relative lg:inset-auto lg:z-auto
          ${isSidebarOpen ? "block" : "hidden"} lg:block
        `}
        >
          <div
            className={`
            bg-white h-full w-full lg:w-64 lg:h-fit lg:flex-shrink-0 lg:sticky lg:top-4
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
            overflow-y-auto lg:overflow-visible
          `}
          >
            <div className="p-4 lg:p-4">
              <div className="flex items-center justify-between mb-4 lg:mb-3">
                <h4 className="font-semibold text-gray-900">Table of Contents</h4>
                <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-700">
                  <div className="w-6 h-6 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-current transform rotate-45"></div>
                      <div className="w-4 h-0.5 bg-current transform -rotate-45"></div>
                    </div>
                  </div>
                </button>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => scrollToSection("overview")}
                  className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                >
                  About the Models
                </button>
                <button
                  onClick={() => scrollToSection("hmpi-methodology")}
                  className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                >
                  HMPI Methodology
                </button>
                <button
                  onClick={() => scrollToSection("contamination-degree")}
                  className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                >
                  Contamination Degree
                </button>
                <button
                  onClick={() => scrollToSection("mhei-methodology")}
                  className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                >
                  MHEI Methodology
                </button>
                <button
                  onClick={() => scrollToSection("cancer-risk-model")}
                  className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                >
                  Cancer Risk Model
                </button>
                <button
                  onClick={() => scrollToSection("bis-who-references")}
                  className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                >
                  BIS/WHO References
                </button>
                <button
                  onClick={() => scrollToSection("faqs")}
                  className="block w-full text-left text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-2 py-1 rounded transition-colors"
                >
                  FAQs
                </button>
              </nav>
            </div>
          </div>
        </aside>

        <main className="flex-1 space-y-8 lg:space-y-10 min-w-0">
          <header id="overview" className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 text-balance">About the Models</h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Our application leverages robust, research-backed models to comprehensively assess heavy metal contamination in groundwater. Three primary models form the backbone of our analysis:
            </p>
          </header>

          {/* hmpi */}

          <section id="hmpi-methodology" className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">HMPI Methodology</h3>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div>
                <div>
                  <p className="text-md text-gray-700">
                    <span className="font-semibold text-gray-900 text-md">Purpose: </span>
                    HMPI provides a single, composite score that reflects the overall level of heavy metal pollution in water samples.
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-md text-gray-700">
                    <span className="font-semibold text-gray-900 text-md">How it Works: </span>
                    The model aggregates concentrations of selected heavy metals, applies standardized weights, and compares them against recommended safety thresholds (e.g., <strong>WHO</strong>, <strong>BIS</strong>).
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-md text-gray-700">
                    <span className="font-semibold text-gray-900 text-md">Interpretation: </span>
                    Resulting HMPI values are classified into pollution categories (<strong>low</strong>, <strong>medium</strong>, <strong>high</strong>), helping users quickly gauge water safety and identify areas of concern.
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-md text-gray-700">
                    <span className="font-semibold text-gray-900 text-md">Application: </span>
                    Widely used by researchers and agencies for rapid screening and spatial comparison of water quality.
                  </p>
                </div>
              </div>

              {/* inputs */}

              <div className="mt-7">
                <hr />
                <div className="mt-3">
                  <h2 className="text-xl font-medium">Input Format (mg/l)</h2>
                  <div className="overflow-x-auto p-4">
                    <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
                      <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
                        <tr>
                          <th className="border px-4 py-2">Location</th>
                          <th className="border px-4 py-2">Latitude</th>
                          <th className="border px-4 py-2">Longitude</th>
                          <th className="border px-4 py-2">Pb</th>
                          <th className="border px-4 py-2">As</th>
                          <th className="border px-4 py-2">Cr</th>
                          <th className="border px-4 py-2">Cd</th>
                          <th className="border px-4 py-2">Se</th>
                          <th className="border px-4 py-2">Ni</th>
                          <th className="border px-4 py-2">Mn</th>
                          <th className="border px-4 py-2">Zn</th>
                          <th className="border px-4 py-2">Cu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((row, idx) => (
                          <tr key={idx} className="bg-white hover:bg-gray-50">
                            <td className="border px-4 py-2">{row.location}</td>
                            <td className="border px-4 py-2">{row.latitude}</td>
                            <td className="border px-4 py-2">{row.longitude}</td>
                            <td className="border px-4 py-2">{row.Pb}</td>
                            <td className="border px-4 py-2">{row.As}</td>
                            <td className="border px-4 py-2">{row.Cr}</td>
                            <td className="border px-4 py-2">{row.Cd}</td>
                            <td className="border px-4 py-2">{row.Se}</td>
                            <td className="border px-4 py-2">{row.Ni}</td>
                            <td className="border px-4 py-2">{row.Mn}</td>
                            <td className="border px-4 py-2">{row.Zn}</td>
                            <td className="border px-4 py-2">{row.Cu}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* interpretation */}
              <div className="mt-7">
                <hr />
                <div className="mt-3">
                  <h2 className="text-xl font-medium">Interpretations: </h2>
                  <div className="mt-2">
                    <h2 className="font-medium text-md">(BIS):</h2>
                    <div className="overflow-x-auto p-4">
                      <table className="min-w-md border border-gray-300 text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
                          <tr>
                            <th className="border px-4 py-2">HMPI Range</th>
                            <th className="border px-4 py-2">Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          {BIShmpiLevel.map((item, idx) => (
                            <tr key={idx} className="bg-white hover:bg-gray-50">
                              <td className="border px-4 py-2">{item.range}</td>
                              <td className="border px-4 py-2">{item.level}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="mt-2">
                    <h2 className="font-medium text-md">(WHO):</h2>
                    <div className="overflow-x-auto p-4">
                      <table className="min-w-md border border-gray-300 text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
                          <tr>
                            <th className="border px-4 py-2">HMPI Range</th>
                            <th className="border px-4 py-2">Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          {WHOhmpiLevel.map((item, idx) => (
                            <tr key={idx} className="bg-white hover:bg-gray-50">
                              <td className="border px-4 py-2">{item.range}</td>
                              <td className="border px-4 py-2">{item.level}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formula used */}
              <div className="mt-7">
                <hr />
                <div className="mt-3">
                  <h2 className="text-xl font-medium">Important Formulas</h2>
                  <div className="mt-2">
                    <div className="bg-gray-100 p-6 rounded-md shadow-sm text-sm text-gray-800 font-mono">
                      <p className="mb-2 font-semibold text-gray-900">Heavy Metal Pollution Index (HMPI):</p>

                      <p className="mb-2">
                        <span className="font-semibold">HMPI</span> = (Σ (Q<sub>i</sub> × W<sub>i</sub>)) / (Σ W<sub>i</sub>)
                      </p>

                      <p className="mb-1"><span className="font-semibold">Where:</span></p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Q<sub>i</sub> = ((M<sub>i</sub> - I<sub>i</sub>) / (S<sub>i</sub> - I<sub>i</sub>)) × 100</li>
                        <li>M<sub>i</sub> = Measured concentration of heavy metal <i>i</i></li>
                        <li>I<sub>i</sub> = Ideal value (usually 0)</li>
                        <li>S<sub>i</sub> = Standard permissible value of heavy metal <i>i</i></li>
                        <li>W<sub>i</sub> = 1 / S<sub>i</sub> (weightage)</li>
                        <li><i>n</i> = Number of heavy metals</li>
                      </ul>
                    </div>

                    <div className="bg-gray-100 p-6 rounded-md mt-4 shadow-sm text-sm text-gray-800 font-mono">
                      <p className="mb-2 font-semibold text-gray-900">Percentage Composition Formula:</p>

                      <p className="mb-2">
                        <span className="font-semibold">Percentage Composition of metal <sub>i</sub></span> = ((W<sub>i</sub> × Q<sub>i</sub>) / (Σ (W<sub>j</sub> × Q<sub>j</sub>))) × 100
                      </p>

                      <p className="mb-1"><span className="font-semibold">Where:</span></p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>W<sub>i</sub> = Weightage assigned to metal <i>i</i></li>
                        <li>Q<sub>i</sub> = Quality rating or concentration value of metal <i>i</i></li>
                        <li>Σ (W<sub>j</sub> × Q<sub>j</sub>) = Sum of weightage × quality for all metals</li>
                        <li><i>n</i> = Number of heavy metals</li>
                      </ul>
                    </div>

                    <div className="bg-gray-100 p-6 rounded-md mt-4 shadow-sm text-sm text-gray-800 font-mono">
                      <p className="mb-2 font-semibold text-gray-900">HMPI Contribution per Metal:</p>

                      <p className="mb-2">
                        <span className="font-semibold">Contribution of metal <sub>i</sub></span> = W<sub>i</sub> × Q<sub>i</sub>
                      </p>

                      <p className="mb-1"><span className="font-semibold">Where:</span></p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>W<sub>i</sub> = Weightage assigned to metal <i>i</i></li>
                        <li>Q<sub>i</sub> = Quality rating or concentration value of metal <i>i</i></li>
                      </ul>
                    </div>


                  </div>
                </div>
                <div>

                </div>
              </div>

            </div>
          </section>

          {/* contamination degree */}

          <section id="contamination-degree">
            <h3 className="text-lg font-semibold text-gray-900">Contamination Degree</h3>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div>
                <p className="text-md text-gray-700">
                  {/* <span className="font-semibold text-gray-900 text-[16px]"> Intro: </span> */}
                  <strong>Contamination Degree (Cd)</strong>  is a quantitative assessment tool that measures the overall level of heavy metal contamination by combining the individual contamination factors of all detected metals in a water sample.
                </p>
              </div>

              <div className="mt-3">
                <p className="text-md text-gray-700">
                  <span className="font-semibold text-gray-900 text-md">Purpose and Application: </span>

                  Provides a single numerical value representing the cumulative contamination impact of all heavy metals present

                  Enables systematic categorization of contamination levels from low to high

                  Facilitates comparison against established contamination thresholds and guidelines

                  Helps identify locations requiring immediate intervention or monitoring
                </p>
              </div>

              {/* interpretations */}
              <div className="mt-7">
                <hr />
                <div className="mt-3">
                  <h2 className="text-xl font-medium">Interpretations: </h2>
                  <div className="mt-2">
                    <p className="text-sm">Note:- The Contamination Degree (Cd) classification itself  is a generic framework and does not change based on <strong>BIS</strong> or <strong>WHO</strong> limits</p>
                    <div className="overflow-x-auto p-4">
                      <table className="min-w-md border border-gray-300 text-sm text-left text-gray-700">
                        <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
                          <tr>
                            <th className="border px-4 py-2">Contamination Degree (CD) Range</th>
                            <th className="border px-4 py-2">Message</th>
                          </tr>
                        </thead>
                        <tbody>
                          {contaminationLevels.map(({ range, message }, idx) => (
                            <tr key={idx} className="bg-white hover:bg-gray-50">
                              <td className="border px-4 py-2">{range}</td>
                              <td className="border px-4 py-2">{message}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                  </div>

                </div>
              </div>

              {/* Formula used */}
              <div className="mt-7">
                <hr />
                <div className="mt-3">
                  <h2 className="text-xl font-medium">Important Formulas</h2>
                  <div className="mt-2">

                    <div className="bg-gray-100 p-6 rounded-md shadow-sm text-sm text-gray-800 font-mono">
                      <p className="mb-2 font-semibold text-gray-900">Contamination Degree (CD) Formula:</p>

                      <p className="mb-2">
                        <span className="font-semibold">CD</span> = Σ (C<sub>i</sub> / S<sub>i</sub>)
                      </p>

                      <p className="mb-1"><span className="font-semibold">Where:</span></p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>C<sub>i</sub> = Measured concentration of metal <i>i</i></li>
                        <li>S<sub>i</sub> = Standard permissible limit of metal <i>i</i></li>
                        <li>Σ = Sum over all metals analyzed</li>
                      </ul>
                    </div>


                  </div>
                </div>
                <div>

                </div>
              </div>

            </div>
          </section>

          {/* mhei */}

          <section id="mhei-methodology" className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">MHEI Methodology</h3>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div>


                <div>
                  <p className="text-md text-gray-700">
                    {/* <span className="font-semibold text-gray-900 text-[16px]"> Intro: </span> */}
                    This new approach is developed based on the most frequently used methods for indexing heavy metals pollution in water. It is created in order to avoid the weaknesses of the current indexing systems. As per the new indexing approach, heavy metal contamination in water samples is evaluated by two types of indices: the <strong>negative evaluation index (NEI)</strong> and <strong>positive evaluation index (PEI)</strong>
                  </p>
                </div>

                <div className="mt-3">
                  <p className="text-md text-gray-700">
                    <span className="font-semibold text-gray-900 text-md">How it Works: </span>
                    How it Works: This model considers not only the magnitude of pollution but also the toxicological significance of each metal, incorporating sub-indices such as NEI (Negative Effect Index) and PEI (Positive Effect Index).
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-md text-gray-700 ">
                    <span className="font-semibold text-gray-900 text-md">Interpretation: </span>
                    Interpretation: Enables detailed classification of samples (Excellent,Good,Moderate,
                    Poor,Unsuitable) and pinpointing of dominant pollutant sources.
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-md text-gray-700">
                    <span className="font-semibold text-gray-900 text-md"> Benefits: </span>
                    Offers greater diagnostic power for site-specific assessment and regulatory compliance.
                  </p>
                </div>
              </div>

              {/* inputs */}

              <div className="mt-7">
                <hr />
                <div className="mt-3">
                  <h2 className="text-xl font-medium">Input Format (mg/l)</h2>
                  <div className="overflow-x-auto p-4">
                    <table className="min-w-full border border-gray-300 text-sm text-left text-gray-700">
                      <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
                        <tr>
                          <th className="border px-4 py-2">Location</th>
                          <th className="border px-4 py-2">Latitude</th>
                          <th className="border px-4 py-2">Longitude</th>
                          <th className="border px-4 py-2">Pb</th>
                          <th className="border px-4 py-2">As</th>
                          <th className="border px-4 py-2">Cr</th>
                          <th className="border px-4 py-2">Cd</th>
                          <th className="border px-4 py-2">Se</th>
                          <th className="border px-4 py-2">Ni</th>
                          <th className="border px-4 py-2">Mn</th>
                          <th className="border px-4 py-2">Zn</th>
                          <th className="border px-4 py-2">Cu</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((row, idx) => (
                          <tr key={idx} className="bg-white hover:bg-gray-50">
                            <td className="border px-4 py-2">{row.location}</td>
                            <td className="border px-4 py-2">{row.latitude}</td>
                            <td className="border px-4 py-2">{row.longitude}</td>
                            <td className="border px-4 py-2">{row.Pb}</td>
                            <td className="border px-4 py-2">{row.As}</td>
                            <td className="border px-4 py-2">{row.Cr}</td>
                            <td className="border px-4 py-2">{row.Cd}</td>
                            <td className="border px-4 py-2">{row.Se}</td>
                            <td className="border px-4 py-2">{row.Ni}</td>
                            <td className="border px-4 py-2">{row.Mn}</td>
                            <td className="border px-4 py-2">{row.Zn}</td>
                            <td className="border px-4 py-2">{row.Cu}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              </div>

              {/* interpretation */}
              <div className="mt-7">
                <hr />
                <div className="mt-3">
                  <h2 className="text-xl font-medium">Interpretations: </h2>
                  <div className="overflow-x-auto p-4">
                    <table className="min-w-md border border-gray-300 text-sm text-left text-gray-700">
                      <thead className="bg-gray-100 text-xs uppercase font-semibold text-gray-600">
                        <tr>
                          <th className="border px-4 py-2">NEI Range</th>
                          <th className="border px-4 py-2">PEI Range</th>
                          <th className="border px-4 py-2">Water Quality</th>
                        </tr>
                      </thead>
                      <tbody>
                        {waterQualityData.map(({ NEI, PEI, Quality }, idx) => (
                          <tr key={idx} className="bg-white hover:bg-gray-50">
                            <td className="border px-4 py-2">{NEI}</td>
                            <td className="border px-4 py-2">{PEI}</td>
                            <td className="border px-4 py-2">{Quality}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Formula used */}
              <div className="mt-7">
                <hr />
                <div className="mt-3">
                  <h2 className="text-xl font-medium">Important Formulas</h2>
                  <div className="mt-2">
                    <div className="bg-gray-100 p-6 rounded-md shadow-sm text-sm text-gray-800 font-mono">
                      <p className="mb-2 font-semibold text-gray-900">Modified Heavy Metal Evaluation Index (MHEI) – Formulas:</p>

                      <p className="mb-2">
                        <span className="font-semibold">1. Unit Weight Factor (W<sub>i</sub>):</span><br />
                        W<sub>i</sub> = k / MAC<sub>i</sub>, where k = 1
                      </p>

                      <p className="mb-2">
                        <span className="font-semibold">2. Relative Weight (ω<sub>i</sub>):</span><br />
                        ω<sub>i</sub> = W<sub>i</sub> / Σ W<sub>j</sub>
                      </p>

                      <p className="mb-2">
                        <span className="font-semibold">3. Sub-index (Q<sub>i</sub>):</span><br />
                        Q<sub>i</sub> = ((M<sub>i</sub> − I<sub>i</sub>) / (S<sub>i</sub> − I<sub>i</sub>)) × 100
                      </p>

                      <p className="mb-2">
                        <span className="font-semibold">4. MHEI:</span><br />
                        MHEI = Σ (ω<sub>i</sub> × Q<sub>i</sub>)
                      </p>

                      <p className="mb-2">
                        <span className="font-semibold">5. Negative Evaluation Index (NEI):</span><br />
                        NEI = Σ Q<sub>i</sub> for metals where M<sub>i</sub> ≤ I<sub>i</sub>
                      </p>

                      <p className="mb-2">
                        <span className="font-semibold">6. Positive Evaluation Index (PEI):</span><br />
                        PEI = Σ Q<sub>i</sub> for metals where M<sub>i</sub> &gt; I<sub>i</sub>
                      </p>
                    </div>


                  </div>
                </div>
                <div>

                </div>
              </div>

            </div>
          </section>

          <section id="cancer-risk-model" className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Cancer Risk Model</h3>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <p className="text-md text-gray-700">
                Placeholder description of the cancer risk calculations, assumptions, and interpretation guidance.
              </p>
            </div>
          </section>

          <section id="bis-who-references" className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">BIS/WHO References</h3>
            <div className="rounded-lg border border-gray-200 bg-white p-4">
              <div className="mt-7">

                <div className="mt-3">
                  <h2 className="text-xl font-medium">BIS Limits(mg/l)</h2>
                  <p className="text-gray-800 mt-3 mb-3">Pb: 0.01|
                    Cd: 0.003|
                    Hg: 0.001|
                    As: 0.05|
                    Cr: 0.05|
                    Cu: 1.5|
                    Zn: 15|
                    Ni: 0.02|
                    Fe: 0.3|
                    Mn: 0.3|
                    Se: 0.01
                  </p>
                  <a target="_blank" className="text-blue-500 underline" href="https://cpcb.nic.in/wqm/BIS_Drinking_Water_Specification.pdf">Reference: Cpcb.nic</a>
                </div>

                <div className="mt-3">
                  <hr />
                  <h2 className="text-xl mt-3 font-medium">WHO Limits(mg/l)</h2>
                  <p className="text-gray-800 mt-3 mb-3">Cd: 0.003 |
                    Pb: 0.01 |
                    Hg: 0.006 |
                    As: 0.01 |
                    Cr: 0.05 |
                    Cu: 2.0 |
                    Zn: 0.0 |
                    Ni: 0.07 |
                    Fe: 0.0 |
                    Mn: 0.4 |
                    Se: 0.01

                  </p>
                  <a target="_blank" className="text-blue-500 underline" href="https://cpcb.nic.in/who-guidelines-for-drinking-water-quality/">Reference: Central Pollution Control Board</a>
                </div>

                <div className="mt-3">
                  <hr />
                  <h2 className="text-xl mt-3 font-medium">Ideal values(mg/l)</h2>
                  <p className="text-gray-800 mt-3 mb-3">As: 0.01 |
                    Pb: 0 |
                    Cr: 0 |
                    Cd: 0 |
                    Se: 0 |
                    Ni: 0 |
                    Mn: 0.1 |
                    Zn: 5 |
                    Cu: 0.05 |
                    Fe: 0 |
                    Hg: 0


                  </p>
                  <a target="_blank" className="text-blue-500 underline" href="https://www.cgwb.gov.in/cgwbpnm/public/uploads/documents/1706797421273160673file.pdf">Reference: </a>
                </div>


              </div>

              {/* <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                <li>Placeholder for BIS standards reference</li>
                <li>Placeholder for WHO guidelines reference</li>
                <li>Additional regulatory references as needed</li>
              </ul> */}
            </div>
          </section>

          <section id="faqs" className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">FAQs</h3>
            <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
              <div>
                <p className="font-medium text-gray-900">What data formats are supported?</p>
                <p className="text-sm text-gray-700">CSV/Excel (placeholder only in this demo).</p>
              </div>
              <div>
                <p className="font-medium text-gray-900">Are results computed here?</p>
                <p className="text-sm text-gray-700">No; this UI is a static prototype.</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
