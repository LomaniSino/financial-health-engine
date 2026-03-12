import React, { useState } from "react";
import {
    ScatterChart, Scatter, XAxis, YAxis,
    Tooltip, ResponsiveContainer, Cell
} from "recharts";

export default function ScoreScatter({ data, colors }) {
    const years   = [...new Set(data.map(d => d.year))].sort();
    const [year, setYear] = useState(Math.max(...years));
    const filtered = data.filter(d => d.year === year);

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                    Debt-to-Equity vs Interest Coverage
                </h2>
                <select value={year} onChange={e => setYear(+e.target.value)}
                        className="border rounded px-3 py-1 text-sm">
                    {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>
            <div className="flex gap-4 mb-4 flex-wrap">
                {Object.entries(colors).map(([label, color]) => (
                    <div key={label} className="flex items-center gap-1 text-sm">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}/>
                        <span>{label}</span>
                    </div>
                ))}
            </div>
            <ResponsiveContainer width="100%" height={420}>
                <ScatterChart margin={{ top:20, right:30, bottom:40, left:20 }}>
                    <XAxis dataKey="debt_to_equity" name="Debt/Equity"
                           label={{ value: "Debt-to-Equity", position: "insideBottom", offset: -10 }}/>
                    <YAxis dataKey="interest_coverage" name="Interest Coverage"
                           label={{ value: "Interest Coverage", angle: -90, position: "insideLeft" }}/>
                    <Tooltip cursor={{ strokeDasharray: "3 3" }}
                             content={({ payload }) => {
                                 if (!payload?.length) return null;
                                 const d = payload[0].payload;
                                 return (
                                     <div className="bg-white border rounded-lg shadow p-3 text-sm">
                                         <p className="font-bold">{d.company_name}</p>
                                         <p>Score: <span style={{ color: colors[d.score_label] }}>{d.score_label}</span></p>
                                         <p>D/E: {d.debt_to_equity}</p>
                                         <p>Coverage: {d.interest_coverage}</p>
                                         <p>EBITDA Margin: {d.ebitda_margin}</p>
                                     </div>
                                 );
                             }}/>
                    <Scatter data={filtered} name="Companies">
                        {filtered.map((d, i) => (
                            <Cell key={i} fill={colors[d.score_label] || "#94a3b8"} />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </div>
    );
}