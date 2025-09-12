import { useEffect, useState } from "react"
export default function DataPreviewTable({ caption = "Data Preview", data, location, latitude, longitude }) {
  const [tableRow, setTableRow] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const header = Object.keys(data[0]);
      setTableRow(header);
      setTableData(data);
    } else {
      setTableRow([]);
      setTableData([]);
    }
  }, [data]);



  return (
    <section aria-labelledby="preview-title" className="space-y-3">
      <h2 id="preview-title" className="text-sm sm:text-base font-semibold text-gray-900">
        {caption}
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
        <div className="max-h-[400px] overflow-y-auto">
          <table className="min-w-full text-left text-[11px] sm:text-sm">
            <caption className="sr-only">{caption}</caption>

            {/* Sticky Table Header */}
            <thead className="bg-blue-100 text-gray-700 sticky top-0 z-10">
              <tr className="[&>th]:px-4 [&>th]:py-3 [&>th]:font-medium">
                {tableRow.length > 0 &&
                  tableRow.map((row, index) => (
                    <th key={index} className="bg-blue-100">{row}</th>
                  ))}
              </tr>
            </thead>

            {/* Scrollable Table Body */}
            <tbody className="divide-y divide-gray-100 text-gray-800">
              {tableData.length > 0 ? (
                tableData.map((row, index) => (
                  <tr key={index} className="[&>td]:px-4 [&>td]:py-3">
                    {Object.values(row).map((value, idx) => (
                      <td key={idx}>{value ? value : "–"}</td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr className="[&>td]:px-4 [&>td]:py-3">
                  {Array(10)
                    .fill("–")
                    .map((v, i) => (
                      <td key={i}>{v}</td>
                    ))}
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>


    </section>
  )
}
