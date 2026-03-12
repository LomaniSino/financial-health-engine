import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    Cell, ResponsiveContainer, ReferenceLine
} from "recharts";

const barColor = (score) =>
    score >= 4 ? "#16a34a" : score >= 3 ? "#ca8a04" : "#dc2626";

export default function SectorBar({ data }) {
    const sorted = [...data].sort((a, b) => b.avg_score - a.avg_score);

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
                Average Health Score by JSE Sector
            </h2>
            <ResponsiveContainer width="100%" height={360}>
                <BarChart data={sorted} layout="vertical"
                          margin={{ left: 100, right: 30, top: 10, bottom: 10 }}>
                    <XAxis type="number" domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} />
                    <YAxis type="category" dataKey="sector" width={95} />
                    <Tooltip formatter={(v) => [v.toFixed(2), "Avg Score"]} />
                    <ReferenceLine x={3} stroke="#94a3b8"
                                   strokeDasharray="4 4" label="Neutral" />
                    <Bar dataKey="avg_score">
                        {sorted.map((d, i) => (
                            <Cell key={i} fill={barColor(d.avg_score)} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}