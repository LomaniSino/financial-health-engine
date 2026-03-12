import React, { useState } from "react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip,
    ResponsiveContainer, ReferenceLine
} from "recharts";

const LABELS = ["Distressed", "Weak", "Neutral", "Good", "Excellent"];

export default function CompanyTrend({ data }) {
    const companies = [...new Set(data.map(d => d.company_name))].sort();
    const [company, setCompany] = useState("Pick n Pay");

    const filtered = data
        .filter(d => d.company_name === company)
        .sort((a, b) => a.year - b.year);

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-4 mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                    Health Score Trend Over Time
                </h2>
                <select value={company} onChange={e => setCompany(e.target.value)}
                        className="border rounded px-3 py-1 text-sm">
                    {companies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
            </div>
            <ResponsiveContainer width="100%" height={360}>
                <LineChart data={filtered}
                           margin={{ top: 10, right: 30, bottom: 10, left: 20 }}>
                    <XAxis dataKey="year" />
                    <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]}
                           tickFormatter={v => LABELS[v - 1]} width={90} />
                    <Tooltip
                        formatter={(v) => [LABELS[v - 1], "Score"]} />
                    <ReferenceLine y={2.5} stroke="#f87171"
                                   strokeDasharray="4 4" label="Danger Zone" />
                    <Line type="monotone" dataKey="predicted_score"
                          stroke="#1E6CA6" strokeWidth={2} dot={{ r: 5 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}