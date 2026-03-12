import React, { useState } from "react";
import data from "./data/dashboard_export.json";
import ScoreScatter  from "./components/ScoreScatter";
import SectorBar     from "./components/SectorBar";
import CompanyTrend  from "./components/CompanyTrend";
import RiskTable     from "./components/RiskTable";
import DistressBar   from "./components/DistressBar";

const TABS = ["Overview", "Sectors", "Trends", "Risk Table", "Top At-Risk"];

const SCORE_COLORS = {
  "Excellent":  "#16a34a",
  "Good":       "#65a30d",
  "Neutral":    "#ca8a04",
  "Weak":       "#ea580c",
  "Distressed": "#dc2626"
};

export default function App() {
  const [tab, setTab] = useState(0);
  return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-blue-900 text-white px-8 py-5 shadow-lg">
          <h1 className="text-2xl font-bold">JSE Financial Health Scoring Engine</h1>
          <p className="text-blue-200 text-sm mt-1">
            {data.meta.companies} JSE Companies · {data.meta.years_range[0]}–{data.meta.years_range[1]} · XGBoost ML Model
          </p>
        </header>
        <nav className="bg-white border-b flex px-8">
          {TABS.map((t, i) => (
              <button key={i} onClick={() => setTab(i)}
                      className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors
              ${tab===i ? "border-blue-600 text-blue-700" : "border-transparent text-gray-500 hover:text-gray-700"}`}>
                {t}
              </button>
          ))}
        </nav>
        <main className="p-8">
          {tab===0 && <ScoreScatter data={data.records} colors={SCORE_COLORS} />}
          {tab===1 && <SectorBar    data={data.sector_avg} />}
          {tab===2 && <CompanyTrend data={data.records} />}
          {tab===3 && <RiskTable    data={data.records} />}
          {tab===4 && <DistressBar  data={data.top_risk} colors={SCORE_COLORS} />}
        </main>
      </div>
  );
}
