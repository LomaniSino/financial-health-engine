import React, { useState } from "react";

const cellColor = (col, val) => {
    if (val == null) return "bg-gray-100";
    if (col === "interest_coverage")
        return val < 1.5 ? "bg-red-100" : val > 5 ? "bg-green-100" : "bg-yellow-50";
    if (col === "debt_to_ebitda")
        return val > 5 ? "bg-red-100" : val < 2 ? "bg-green-100" : "bg-yellow-50";
    if (col === "ebitda_margin")
        return val < 0 ? "bg-red-100" : val > 0.2 ? "bg-green-100" : "bg-yellow-50";
    if (col === "cf_to_debt")
        return val < 0 ? "bg-red-100" : val > 0.2 ? "bg-green-100" : "bg-yellow-50";
    if (col === "gross_margin")
        return val < 0.1 ? "bg-red-100" : val > 0.3 ? "bg-green-100" : "bg-yellow-50";
    if (col === "roe")
        return val < 0 ? "bg-red-100" : val > 0.15 ? "bg-green-100" : "bg-yellow-50";
    return "bg-white";
};

const COLS = [
    "interest_coverage", "debt_to_ebitda", "ebitda_margin",
    "cf_to_debt", "gross_margin", "roe"
];

const SCORE_COLORS = {
    "Excellent":  "text-green-700",
    "Good":       "text-lime-600",
    "Neutral":    "text-yellow-600",
    "Weak":       "text-orange-600",
    "Distressed": "text-red-700"
};

export default function RiskTable({ data }) {
    const years  = [...new Set(data.map(d => d.year))].sort();
    const [year, setYear] = useState(Math.max(...years));

    const rows = data
        .filter(d => d.year === year)
        .sort((a, b) => a.predicted_score - b.predicted_score);

    return (
        <div className="bg-white rounded-xl shadow p-6 overflow-x-auto">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                    Ratio Heatmap — All Companies
                </h2>
                <select value={year} onChange={e => setYear(+e.target.value)}
                        className="border rounded px-3 py-1 text-sm">
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>
            <table className="text-xs w-full border-collapse">
                <thead>
                <tr className="bg-blue-900 text-white">
                    <th className="p-2 text-left">Company</th>
                    <th className="p-2 text-center">Score</th>
                    {COLS.map(c => (
                        <th key={c} className="p-2 text-center">{c}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {rows.map((d, i) => (
                    <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="p-2 font-medium">{d.company_name}</td>
                        <td className={`p-2 text-center font-bold ${SCORE_COLORS[d.score_label]}`}>
                            {d.score_label}
                        </td>
                        {COLS.map(c => (
                            <td key={c}
                                className={`p-2 text-center ${cellColor(c, d[c])}`}>
                                {d[c] != null ? d[c].toFixed(2) : "—"}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}