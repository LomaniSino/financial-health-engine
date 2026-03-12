import React from "react";
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    Cell, ResponsiveContainer
} from "recharts";

export default function DistressBar({ data, colors }) {
    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-2">
                Top 10 Most At-Risk JSE Companies
            </h2>
            <p className="text-sm text-gray-500 mb-4">
                Based on latest available year — sorted by distress probability
            </p>
            <ResponsiveContainer width="100%" height={360}>
                <BarChart data={data} layout="vertical"
                          margin={{ left: 110, right: 40, top: 10, bottom: 10 }}>
                    <XAxis type="number" domain={[0, 1]}
                           tickFormatter={v => `${(v * 100).toFixed(0)}%`} />
                    <YAxis type="category" dataKey="company_name" width={105} />
                    <Tooltip
                        formatter={(v) => [`${(v * 100).toFixed(1)}%`, "Distress Probability"]} />
                    <Bar dataKey="distress_prob">
                        {data.map((d, i) => (
                            <Cell key={i} fill={colors[d.score_label] || "#94a3b8"} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}