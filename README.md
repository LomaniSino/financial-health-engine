# JSE Financial Health Scoring Engine

An end-to-end machine learning project that ingests 5 years of financial statements for 23 JSE-listed South African companies, engineers 42 financial features, trains an XGBoost classifier to predict a 1–5 health score, and presents results in an interactive React dashboard.

---

## 🚀 Live Dashboard

> **[View Live Dashboard →](https://LomaniSino.github.io/financial-health-engine)**


---

##  Dashboard Preview

| Tab | Chart | Description |
|---|---|---|
| Overview | Scatter Plot | Debt-to-Equity vs Interest Coverage, colour-coded by health score |
| Sectors | Bar Chart | Average health score by JSE sector |
| Trends | Line Chart | Score over time per company — shows Pick n Pay's decline |
| Risk Table | Heatmap | All companies × key ratios with red/yellow/green cells |
| Top At-Risk | Bar Chart | Top 10 most distressed companies by distress probability |

---

##  Key Finding

The model flagged **Pick n Pay** as the most at-risk JSE company — consistent with their real-world **R4 billion emergency rights issue in 2024**. Anglo American was scored as **Distressed in 2024** with a **92.5% distress probability**, aligning with their period of major asset writedowns and shareholder pressure.

---

## 🏗 Project Architecture

```
financial-health-engine/
  ├── notebooks/
  │   ├── 01_data_collection.ipynb       # yfinance API → SQLite
  │   ├── 02_feature_engineering.ipynb   # 42 financial features
  │   ├── 03_model_training.ipynb        # XGBoost + model comparison
  │   └── 04_export_dashboard.ipynb      # JSON export for React
  ├── data/
  │   ├── raw/                           # SQLite database
  │   └── processed/                     # features.csv + dashboard_export.json
  ├── dashboard/                         # React + Recharts app
  │   └── src/components/
  │       ├── ScoreScatter.jsx
  │       ├── SectorBar.jsx
  │       ├── CompanyTrend.jsx
  │       ├── RiskTable.jsx
  │       └── DistressBar.jsx
  └── requirements.txt
  │
  └── README.md
  
```

---

##  Model Results

| Model | F1 (Macro) | Accuracy |
|---|---|---|
| Logistic Regression | 0.175 | 58% |
| Random Forest | **0.569** | 83% |
| XGBoost | 0.542 | 83% |

**Random Forest** achieved the best F1 score. Moderate scores reflect the small dataset size (60 records) and heavy class imbalance — most large JSE companies are financially healthy.

---

##  JSE Companies Covered (23)

| Sector | Companies |
|---|---|
| Banking | FirstRand, Standard Bank, Absa, Nedbank, Capitec |
| Insurance | Sanlam, Discovery, Old Mutual |
| Retail | Shoprite, Pick n Pay, Woolworths |
| FMCG | Tiger Brands |
| Telecoms | MTN Group, Vodacom |
| Tech | Naspers |
| Mining | Anglo American, AngloGold, Gold Fields, Implats |
| Energy | Sasol |
| Industrial | Bidvest |
| Holdings | Remgro |
| Luxury | Richemont |

---

## ️ Features Engineered (42 Total)

- **14 Financial Ratios** — liquidity, leverage, profitability, cash flow
- **14 Delta Features** — year-on-year change per ratio (catches deterioration)
- **14 Sector Z-Scores** — ratio normalised relative to sector peers

---

##  Tech Stack

| Layer | Technology |
|---|---|
| IDE | IntelliJ IDEA |
| Language | Python 3.13 |
| Data Source | yfinance (free, no API key) |
| Database | SQLite via SQLAlchemy |
| ML | scikit-learn, XGBoost |
| Visualisation | React + Recharts + Tailwind CSS |
| Deployment | GitHub Pages |

---

##  How to Run

### Python (ML Pipeline)

```bash
# 1. Clone the repo
git clone https://github.com/LomaniSino/financial-health-engine.git
cd financial-health-engine

# 2. Create and activate virtual environment
python -m venv .venv
.venv\Scripts\activate       # Windows
source .venv/bin/activate    # Mac/Linux

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run notebooks in order
# Open in IntelliJ or Jupyter:
# 01_data_collection.ipynb
# 02_feature_engineering.ipynb
# 03_model_training.ipynb
# 04_export_dashboard.ipynb
```

### React Dashboard

```bash
cd dashboard
npm install
npm start
# Opens at http://localhost:3000
```

---

##  Documentation

Full build journal including all 13 problems encountered and solutions:
[JSE_Project_Documentation.docx](./JSE_Project_Documentation.docx)

---

##  Author

Built as a data science portfolio project demonstrating end-to-end ML pipeline development,
financial domain knowledge, and full-stack data visualisation.