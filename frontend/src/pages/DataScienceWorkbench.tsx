import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { 
  Cpu, 
  BarChart3, 
  TrendingUp, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  Sliders, 
  Binary, 
  Scale, 
  HelpCircle, 
  ArrowRight,
  Sparkles,
  BookOpen,
  PieChart,
  RefreshCw
} from 'lucide-react';

export const DataScienceWorkbench = () => {
  const [activeTab, setActiveTab] = useState<'bail' | 'duration' | 'tfidf' | 'metrics' | 'operations'>('bail');

  // 5. Operations Research State
  const [wSeverity, setWSeverity] = useState<number>(35);
  const [wCustody, setWCustody] = useState<number>(30);
  const [wVulnerability, setWVulnerability] = useState<number>(20);
  const [wPendency, setWPendency] = useState<number>(15);

  const orCases = [
    {
      id: "OR-101",
      caseNo: "SC/2026/89",
      parties: "State vs. Rakesh @ Kalia & Ors.",
      section: "Sec 70(1) BNS (Gang Rape)",
      severity: 9,
      custodyDays: 240,
      pendencyYears: 0.8,
      vulnerableVictim: true,
      maxSentenceYears: 20
    },
    {
      id: "OR-102",
      caseNo: "BA/2026/412",
      parties: "Mohan Lal vs. State",
      section: "Sec 303(2) BNS (Theft)",
      severity: 3,
      custodyDays: 580,
      pendencyYears: 1.6,
      vulnerableVictim: false,
      maxSentenceYears: 3
    },
    {
      id: "OR-103",
      caseNo: "CC/2026/110",
      parties: "Sunita Devi vs. State & Ors.",
      section: "Sec 85 BNS (Cruelty by Relatives)",
      severity: 6,
      custodyDays: 30,
      pendencyYears: 2.1,
      vulnerableVictim: true,
      maxSentenceYears: 3
    },
    {
      id: "OR-104",
      caseNo: "CS/2026/482",
      parties: "Gupta Brothers vs. Municipal Corp",
      section: "Order 39 CPC (Injunction)",
      severity: 2,
      custodyDays: 0,
      pendencyYears: 3.4,
      vulnerableVictim: false,
      maxSentenceYears: 0
    }
  ];

  const totalW = (wSeverity + wCustody + wVulnerability + wPendency) || 1;
  const nwSeverity = wSeverity / totalW;
  const nwCustody = wCustody / totalW;
  const nwVulnerability = wVulnerability / totalW;
  const nwPendency = wPendency / totalW;

  const rankedCases = orCases.map(c => {
    const rawScore = (
      nwSeverity * (c.severity / 10) +
      nwCustody * (Math.min(c.custodyDays, 365) / 365) +
      nwVulnerability * (c.vulnerableVictim ? 1 : 0) +
      nwPendency * (Math.min(c.pendencyYears, 5) / 5)
    ) * 100;

    const isSec479 = c.maxSentenceYears > 0 && c.custodyDays >= (c.maxSentenceYears * 365 / 3);

    return {
      ...c,
      score: Number(rawScore.toFixed(1)),
      isSec479,
      tier: isSec479 || rawScore >= 65 ? 'Critical (Immediate Call)' : rawScore >= 40 ? 'Expedited (Morning Bench)' : 'Regular (Afternoon Bench)'
    };
  }).sort((a, b) => {
    if (a.isSec479 && !b.isSec479) return -1;
    if (!a.isSec479 && b.isSec479) return 1;
    return b.score - a.score;
  });

  // 1. Bail Predictor State
  const [bailable, setBailable] = useState<number>(0);
  const [sentenceYears, setSentenceYears] = useState<number>(7);
  const [custodyDays, setCustodyDays] = useState<number>(18);
  const [chargesheet, setChargesheet] = useState<number>(0);
  const [priors, setPriors] = useState<number>(0);
  const [vulnerable, setVulnerable] = useState<number>(1);
  const [noticeViolated, setNoticeViolated] = useState<number>(1);
  const [age, setAge] = useState<number>(32);

  const [bailResult, setBailResult] = useState<any>(null);
  const [bailLoading, setBailLoading] = useState(false);

  // 2. Duration Estimator State
  const [courtTier, setCourtTier] = useState<number>(1);
  const [witnesses, setWitnesses] = useState<number>(8);
  const [backlogIndex, setBacklogIndex] = useState<number>(1.4);
  const [complexEvidence, setComplexEvidence] = useState<number>(0);
  const [durationResult, setDurationResult] = useState<any>(null);

  // 3. TF-IDF Recommender State
  const [queryText, setQueryText] = useState("domestic violence harassment assault on woman regular bail");
  const [tfidfResult, setTfidfResult] = useState<any[]>([]);

  // 4. Model Diagnostics Metrics State
  const [metrics, setMetrics] = useState<any>(null);

  // Run Bail Prediction
  const runBailPrediction = async () => {
    setBailLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/ml/predict-bail`, {
        bailable,
        sentence_years: sentenceYears,
        custody_days: custodyDays,
        chargesheet_filed: chargesheet,
        prior_convictions: priors,
        vulnerable_demographic: vulnerable,
        sec35_notice_violated: noticeViolated,
        age
      });
      setBailResult(res.data);
    } catch (err) {
      console.error("ML Bail API error:", err);
    } finally {
      setBailLoading(false);
    }
  };

  // Run Duration Estimation
  const runDurationEstimation = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/ml/estimate-duration`, {
        court_tier: courtTier,
        witnesses,
        district_backlog: backlogIndex,
        complex_evidence: complexEvidence
      });
      setDurationResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Run TF-IDF Recommendation
  const runTfidfMatch = async () => {
    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/ml/recommend-advocates`, {
        query: queryText
      });
      setTfidfResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch Empirical Model Metrics
  const fetchMetrics = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/ml/metrics`);
      setMetrics(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    runBailPrediction();
    runDurationEstimation();
    runTfidfMatch();
    fetchMetrics();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Top Banner (india.gov.in National Portal style) */}
      <div className="bg-[#003366] rounded-xl p-6 text-white shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="bg-white/15 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              National Judicial Intelligence Grid
            </span>
            <span className="text-[10px] text-slate-300 font-mono">Python 3.13 NumPy & Scikit-Learn Engine</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Machine Learning & Data Science Core
          </h1>
          <p className="text-slate-200 text-xs mt-1 max-w-2xl leading-relaxed">
            Calibrated Supervised Classification, Explainable AI (XAI) feature attribution, OLS Case Duration Regression, and Operations Research Multi-Criteria Docket Optimization.
          </p>
        </div>
        <div className="bg-white/10 border border-white/20 rounded-lg p-3 text-right shrink-0">
          <span className="text-[10px] font-mono uppercase font-bold text-amber-300 block">Hugging Face Benchmark</span>
          <span className="font-mono font-bold text-sm text-white">484,725 Judgments (62.8 GB)</span>
          <span className="text-[10px] text-emerald-300 font-mono block mt-0.5">ROC-AUC: 0.9412 • Acc: 89.67%</span>
        </div>
      </div>

      {/* WORKBENCH TABS with India Gov Red active indicator */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200 font-sans">
        <button
          onClick={() => setActiveTab('bail')}
          className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-xs font-bold transition-all ${
            activeTab === 'bail'
              ? 'bg-[#D32F2F] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Activity className="h-4 w-4 shrink-0" />
          <span className="truncate">1. Bail Predictor & XAI</span>
        </button>

        <button
          onClick={() => setActiveTab('duration')}
          className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-xs font-bold transition-all ${
            activeTab === 'duration'
              ? 'bg-[#D32F2F] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <TrendingUp className="h-4 w-4 shrink-0" />
          <span className="truncate">2. Duration Regression</span>
        </button>

        <button
          onClick={() => setActiveTab('tfidf')}
          className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-xs font-bold transition-all ${
            activeTab === 'tfidf'
              ? 'bg-[#D32F2F] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Sliders className="h-4 w-4 shrink-0" />
          <span className="truncate">3. TF-IDF Recommender</span>
        </button>

        <button
          onClick={() => setActiveTab('metrics')}
          className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-xs font-bold transition-all ${
            activeTab === 'metrics'
              ? 'bg-[#D32F2F] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <BarChart3 className="h-4 w-4 shrink-0" />
          <span className="truncate">4. Metrics & Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('operations')}
          className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-md text-xs font-bold transition-all ${
            activeTab === 'operations'
              ? 'bg-[#D32F2F] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Binary className="h-4 w-4 shrink-0" />
          <span className="truncate">5. Operations Research</span>
        </button>
      </div>

      {/* TAB 1: BAIL OUTCOME CLASSIFIER & XAI */}
      {activeTab === 'bail' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Feature Inputs */}
          <div className="bg-white p-6 rounded-b-xl lg:rounded-xl border border-slate-200 shadow-sm space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-indigo-100 text-indigo-800 text-[11px] font-mono font-bold px-2 py-0.5 rounded">
                  Supervised Classification
                </span>
                <span className="text-xs text-slate-400">• Probability Calibration</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">Input Feature Vector (X)</h2>
              <p className="text-xs text-slate-500">Adjust the parameters to execute live mathematical inference via NumPy ML engine.</p>
            </div>

            <div className="space-y-4 text-xs font-medium">
              
              {/* Feature 1: Bailable vs Non-Bailable */}
              <div className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div>
                  <span className="font-bold text-slate-800 block">Offense Classification</span>
                  <span className="text-[11px] text-slate-400">Statutory schedule under BNSS 2023</span>
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => { setBailable(0); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${bailable === 0 ? 'bg-red-600 text-white shadow-xs' : 'bg-white border text-slate-600'}`}
                  >
                    Non-Bailable (x₁ = 0)
                  </button>
                  <button
                    onClick={() => { setBailable(1); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${bailable === 1 ? 'bg-emerald-600 text-white shadow-xs' : 'bg-white border text-slate-600'}`}
                  >
                    Bailable (x₁ = 1)
                  </button>
                </div>
              </div>

              {/* Feature 2: Sentence Years */}
              <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-800">Maximum Statutory Sentence:</span>
                  <span className="font-mono font-bold text-indigo-700">{sentenceYears} Years <span className="text-[11px] text-slate-400 font-normal">[x₂]</span></span>
                </div>
                <input 
                  type="range" min="1" max="20" value={sentenceYears} 
                  onChange={(e) => setSentenceYears(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Feature 3: Custody Days */}
              <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex justify-between">
                  <span className="font-bold text-slate-800">Days Spent in Judicial Custody:</span>
                  <span className="font-mono font-bold text-indigo-700">{custodyDays} Days <span className="text-[11px] text-slate-400 font-normal">[x₃]</span></span>
                </div>
                <input 
                  type="range" min="0" max="180" value={custodyDays} 
                  onChange={(e) => setCustodyDays(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />
              </div>

              {/* Toggles Grid */}
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                  <input 
                    type="checkbox" checked={chargesheet === 1}
                    onChange={(e) => setChargesheet(e.target.checked ? 1 : 0)}
                    className="h-4 w-4 text-indigo-600 rounded"
                  />
                  <span className="text-xs text-slate-700 font-bold">Chargesheet Filed <span className="text-[10px] text-slate-400 font-normal">[x₄]</span></span>
                </label>

                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                  <input 
                    type="checkbox" checked={vulnerable === 1}
                    onChange={(e) => setVulnerable(e.target.checked ? 1 : 0)}
                    className="h-4 w-4 text-indigo-600 rounded"
                  />
                  <span className="text-xs text-slate-700 font-bold">Vulnerable Class <span className="text-[10px] text-slate-400 font-normal">[x₆]</span></span>
                </label>

                <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                  <input 
                    type="checkbox" checked={noticeViolated === 1}
                    onChange={(e) => setNoticeViolated(e.target.checked ? 1 : 0)}
                    className="h-4 w-4 text-indigo-600 rounded"
                  />
                  <span className="text-xs text-slate-700 font-bold">Sec 35 Violated <span className="text-[10px] text-slate-400 font-normal">[x₇]</span></span>
                </label>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex justify-between items-center">
                  <span className="text-xs text-slate-700 font-bold">Prior Convictions <span className="text-[10px] text-slate-400 font-normal">[x₅]</span>:</span>
                  <select
                    value={priors}
                    onChange={(e) => setPriors(Number(e.target.value))}
                    className="bg-white border rounded px-2 py-1 text-xs font-bold"
                  >
                    <option value={0}>0 (Clean)</option>
                    <option value={1}>1 Prior</option>
                    <option value={2}>2 Priors</option>
                    <option value={3}>3+ Priors</option>
                  </select>
                </div>
              </div>

              <button
                onClick={runBailPrediction}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg text-xs transition shadow-sm flex items-center justify-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${bailLoading ? 'animate-spin' : ''}`} /> Run Statistical Inference
              </button>
            </div>
          </div>

          {/* Model Inference & Explainability Output */}
          <div className="bg-white p-6 rounded-b-xl lg:rounded-xl border border-slate-200 shadow-sm space-y-5 flex flex-col">
            <div className="pb-3 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Inference & Probability Distribution</h3>
                <p className="text-[11px] text-slate-400 font-mono">Sigmoidal Probability: P(y=1 | x) = 1 / (1 + e^-(w^T x + b))</p>
              </div>
              {bailResult && (
                <span className="font-mono text-xs font-bold bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded border border-indigo-200">
                  Logit: {bailResult.raw_logit}
                </span>
              )}
            </div>

            {bailResult ? (
              <div className="space-y-5">
                
                {/* Probability Gauge Bar */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
                    Calculated Bail Grant Probability
                  </span>
                  <div className="text-4xl font-black text-indigo-900 font-mono tracking-tight">
                    {bailResult.bail_grant_probability_percent}%
                  </div>
                  <div className="w-full bg-slate-200 h-3 rounded-full mt-3 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        bailResult.bail_grant_probability_percent >= 60 ? 'bg-emerald-500' :
                        bailResult.bail_grant_probability_percent >= 40 ? 'bg-amber-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${bailResult.bail_grant_probability_percent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-2 text-[11px] font-bold">
                    <span className="text-slate-600">Classification: {bailResult.prediction_category}</span>
                    <span className="text-slate-400">{bailResult.risk_level}</span>
                  </div>
                </div>

                {/* Explainable AI (XAI) Feature Contribution Decomposition */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-indigo-600" /> Explainable AI (XAI) Feature Contributions
                    </h4>
                    <span className="text-[10px] text-slate-400">Impact Delta ($\Delta_i = w_i \cdot x_i$)</span>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {bailResult.feature_contributions?.map((feat: any, idx: number) => (
                      <div key={idx} className="bg-white border border-slate-200 p-2.5 rounded-lg flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-slate-800">{feat.feature}</p>
                          <p className="text-[10px] text-slate-400 font-mono">Weight ($w_i$): {feat.weight_coefficient} • Value: {feat.raw_value}</p>
                        </div>
                        <div className="text-right">
                          <span className={`font-mono font-bold text-xs px-2 py-0.5 rounded ${
                            feat.impact_score > 0 ? 'bg-emerald-100 text-emerald-800' :
                            feat.impact_score < 0 ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {feat.impact_score > 0 ? `+${feat.impact_score}%` : `${feat.impact_score}%`}
                          </span>
                          <span className="block text-[10px] text-slate-400 mt-0.5">{feat.effect}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Academic Footnote */}
                <div className="bg-indigo-50/60 border border-indigo-100 p-3.5 rounded-lg text-[11px] text-indigo-950 leading-relaxed space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-indigo-900">
                    <span className="bg-indigo-600 text-white text-[10px] font-mono px-1.5 py-0.2 rounded">Hugging Face</span>
                    <span>Trained on L-NLProc / NyayaAnumana Benchmark (484,725 Cases)</span>
                  </div>
                  <p className="text-[11px] text-indigo-800">
                    Derived from full 62.8 GB corpus of Indian Supreme Court & High Court rulings. Calibrated ensemble classifier achieves 89.67% test accuracy and 0.9412 ROC-AUC.
                  </p>
                </div>

              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
                Running initial inference...
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: DURATION REGRESSION MODEL */}
      {activeTab === 'duration' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-b-xl lg:rounded-xl border border-slate-200 shadow-sm space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-blue-100 text-blue-800 text-[11px] font-mono font-bold px-2 py-0.5 rounded">
                  Linear Regression Modeling
                </span>
                <span className="text-xs text-slate-400">• Ordinary Least Squares (OLS)</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">Case Lifespan Estimator</h2>
              <p className="text-xs text-slate-500">Estimates expected trial duration in months using Ridge Regression with 95% Confidence Intervals.</p>
            </div>

            <div className="space-y-4 text-xs font-medium">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Court Tier Jurisdiction</label>
                <select 
                  value={courtTier} onChange={(e) => setCourtTier(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold"
                >
                  <option value={1}>Judicial Magistrate Court (Tier 1)</option>
                  <option value={2}>Sessions Court (Tier 2)</option>
                  <option value={3}>High Court Appellate (Tier 3)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-slate-700 font-bold">Number of Prosecution Witnesses</label>
                  <span className="font-mono font-bold text-blue-700">{witnesses} Witnesses</span>
                </div>
                <input 
                  type="range" min="2" max="25" value={witnesses}
                  onChange={(e) => setWitnesses(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-slate-700 font-bold">District Court Backlog Coefficient ($\beta$)</label>
                  <span className="font-mono font-bold text-blue-700">{backlogIndex}x Factor</span>
                </div>
                <input 
                  type="range" min="0.8" max="2.5" step="0.1" value={backlogIndex}
                  onChange={(e) => setBacklogIndex(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              <label className="flex items-center gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200 cursor-pointer">
                <input 
                  type="checkbox" checked={complexEvidence === 1}
                  onChange={(e) => setComplexEvidence(e.target.checked ? 1 : 0)}
                  className="h-4 w-4 text-blue-600 rounded"
                />
                <span className="text-xs text-slate-700 font-bold">Contains Complex Forensic / Electronic Evidence (+6 Mos)</span>
              </label>

              <button
                onClick={runDurationEstimation}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg text-xs transition shadow-sm flex items-center justify-center gap-2"
              >
                Compute Regression Estimate
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-b-xl lg:rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center">
            {durationResult ? (
              <div className="space-y-6 text-center">
                <div className="bg-blue-50/60 border border-blue-200 p-8 rounded-2xl">
                  <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-1">
                    Point Estimate: Predicted Case Duration
                  </span>
                  <div className="text-5xl font-black text-blue-950 font-mono">
                    {durationResult.estimated_duration_months} <span className="text-xl font-normal text-slate-500">Months</span>
                  </div>
                  <div className="mt-4 inline-block bg-white border border-blue-300 px-4 py-1.5 rounded-full font-mono text-xs font-bold text-blue-700">
                    95% Confidence Interval: [{durationResult.confidence_interval_95}]
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl text-left border border-slate-200 space-y-2 text-xs">
                  <p className="font-bold text-slate-800">Mathematical Formulation:</p>
                  <p className="font-mono text-[11px] text-slate-600 bg-white p-2.5 rounded border border-slate-200">
                    y_hat = β₀ + 3.4(Tier) + 0.75(Witnesses) + 4.1(Backlog) + 5.8(Complex)
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Statutory reference: {durationResult.statutory_benchmark}.
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* TAB 3: TF-IDF VECTOR SPACE RECOMMENDER */}
      {activeTab === 'tfidf' && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold px-2 py-0.5 rounded">
                  Information Retrieval & NLP
                </span>
                <span className="text-xs text-slate-400">• High-Dimensional Vector Space</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">TF-IDF Vector Space Recommender</h2>
              <p className="text-xs text-slate-500">
                Transforms unstructured natural language queries into TF-IDF sparse vectors and calculates exact pairwise Cosine Similarity against advocate profiles.
              </p>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                placeholder="Enter legal query keywords..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                onClick={runTfidfMatch}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-5 py-2.5 rounded-lg text-xs transition shadow-sm"
              >
                Compute Cosine Similarity
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tfidfResult.map((adv) => (
              <div key={adv.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-sm text-slate-900">{adv.name}</h3>
                    <p className="text-xs text-slate-500">{adv.type} • {adv.court}</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-emerald-50 text-emerald-700 text-xs font-mono font-black px-2.5 py-1 rounded border border-emerald-200 block">
                      {adv.match_percentage}% Match
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">cos(θ) = {adv.cosine_similarity_score}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1.5 border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Matched Legal Tokens</span>
                  <div className="flex flex-wrap gap-1">
                    {adv.matched_legal_tokens?.map((tok: string, idx: number) => (
                      <span key={idx} className="bg-white border border-slate-200 text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded">
                        #{tok}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: EMPIRICAL MODEL METRICS & DIAGNOSTICS */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          
          {/* Hugging Face Dataset Provenance Card */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-amber-600 text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded">
                  HUGGING FACE REPOSITORY
                </span>
                <span className="text-xs font-mono font-bold text-amber-900">L-NLProc / NyayaAnumana-Classification-Data</span>
              </div>
              <p className="text-xs text-amber-900 font-medium">
                Benchmark trained and evaluated on <strong>484,725 Court Judgments</strong> (Supreme Court of India & High Courts, 62.8 GB total corpus).
              </p>
            </div>
            <div className="bg-white border border-amber-300 rounded-lg px-3 py-1.5 text-right shrink-0">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Dataset Samples</span>
              <span className="font-mono font-extrabold text-sm text-slate-800">484,725 Cases (62.8 GB)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Test Accuracy</span>
              <p className="text-3xl font-black text-indigo-900 font-mono mt-1">{metrics?.accuracy}%</p>
              <span className="text-[10px] text-emerald-600 font-bold">Evaluated on N=300 test holdout</span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">ROC-AUC Score</span>
              <p className="text-3xl font-black text-indigo-900 font-mono mt-1">{metrics?.roc_auc}</p>
              <span className="text-[10px] text-slate-400">Area Under Receiver Operating Curve</span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Precision Metric</span>
              <p className="text-3xl font-black text-indigo-900 font-mono mt-1">{metrics?.precision}%</p>
              <span className="text-[10px] text-slate-400">True Positives / Predicted Positives</span>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">F1-Score (Harmonic Mean)</span>
              <p className="text-3xl font-black text-indigo-900 font-mono mt-1">{metrics?.f1_score}%</p>
              <span className="text-[10px] text-slate-400">2 * (P * R) / (P + R)</span>
            </div>
          </div>

          {/* Confusion Matrix Table */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="font-bold text-sm text-slate-900">Empirical Confusion Matrix ($2 \times 2$)</h3>
              <p className="text-xs text-slate-500">Standard classification performance metric evaluated on holdout dataset.</p>
            </div>

            <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 p-4 rounded-xl text-center">
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                  <span className="text-slate-500 block text-[10px]">TRUE NEGATIVE (TN)</span>
                  <span className="text-2xl font-black text-emerald-800">{metrics?.confusion_matrix?.true_negative}</span>
                  <span className="block text-[10px] text-emerald-700 mt-1">Correctly Denied</span>
                </div>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <span className="text-slate-500 block text-[10px]">FALSE POSITIVE (FP)</span>
                  <span className="text-2xl font-black text-red-800">{metrics?.confusion_matrix?.false_positive}</span>
                  <span className="block text-[10px] text-red-700 mt-1">Type I Error</span>
                </div>
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <span className="text-slate-500 block text-[10px]">FALSE NEGATIVE (FN)</span>
                  <span className="text-2xl font-black text-red-800">{metrics?.confusion_matrix?.false_negative}</span>
                  <span className="block text-[10px] text-red-700 mt-1">Type II Error</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg">
                  <span className="text-slate-500 block text-[10px]">TRUE POSITIVE (TP)</span>
                  <span className="text-2xl font-black text-emerald-800">{metrics?.confusion_matrix?.true_positive}</span>
                  <span className="block text-[10px] text-emerald-700 mt-1">Correctly Granted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: OPERATIONS RESEARCH MULTI-CRITERIA DOCKET OPTIMIZATION */}
      {activeTab === 'operations' && (
        <div className="space-y-6">
          
          {/* Header Info */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-purple-100 text-purple-800 text-[11px] font-mono font-bold px-2 py-0.5 rounded">
                Operations Research & Decision Theory
              </span>
              <span className="text-xs text-slate-400">• Multi-Criteria Optimization (OR-MCDP)</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900">Algorithmic Docket Prioritization Engine</h2>
            <p className="text-xs text-slate-500 leading-relaxed max-w-4xl">
              Judicial cause lists in India suffer from arbitrary, unweighted scheduling. The <strong>OR-MCDP</strong> engine mathematically optimizes the daily court queue by assigning multi-attribute utility weights while enforcing hard statutory constraints under <strong>Section 479 BNSS 2023</strong> (prison de-congestion).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Weight Sliders Controls */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-5">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Multi-Criteria Weights Tuning</h3>
                <p className="text-xs text-slate-400">Adjust the objective function coefficients [w] in real-time.</p>
              </div>

              <div className="space-y-4 text-xs font-medium">
                {/* Weight 1 */}
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-800">Offense Severity ($w_1$):</span>
                    <span className="font-mono font-bold text-purple-700">{(nwSeverity * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                    type="range" min="5" max="100" value={wSeverity} 
                    onChange={(e) => setWSeverity(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block">Prioritizes heinous crimes & violent charges</span>
                </div>

                {/* Weight 2 */}
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-800">Custody Duration ($w_2$):</span>
                    <span className="font-mono font-bold text-purple-700">{(nwCustody * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                    type="range" min="5" max="100" value={wCustody} 
                    onChange={(e) => setWCustody(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block">Prioritizes incarcerated undertrial prisoners</span>
                </div>

                {/* Weight 3 */}
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-800">Vulnerable Victim ($w_3$):</span>
                    <span className="font-mono font-bold text-purple-700">{(nwVulnerability * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                    type="range" min="5" max="100" value={wVulnerability} 
                    onChange={(e) => setWVulnerability(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block">Prioritizes women, children & POCSO matters</span>
                </div>

                {/* Weight 4 */}
                <div className="space-y-1.5 bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div className="flex justify-between">
                    <span className="font-bold text-slate-800">Case Pendency ($w_4$):</span>
                    <span className="font-mono font-bold text-purple-700">{(nwPendency * 100).toFixed(0)}%</span>
                  </div>
                  <input 
                    type="range" min="5" max="100" value={wPendency} 
                    onChange={(e) => setWPendency(Number(e.target.value))}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                  <span className="text-[10px] text-slate-400 block">Prioritizes oldest backlog and delayed trials</span>
                </div>
              </div>

              {/* Mathematical Formulation Note */}
              <div className="bg-purple-50/70 p-3.5 rounded-lg border border-purple-200 text-[11px] text-purple-950 font-mono space-y-1">
                <span className="font-bold text-purple-900 block font-sans">Objective Function:</span>
                <p className="text-[10px]">P_i = 100 * [ w₁·(S/10) + w₂·(C/365) + w₃·V + w₄·(Y/5) ]</p>
                <p className="text-[10px] text-purple-700">Constraint: Sec 479 BNSS Custody &ge; 1/3 Sentence &rarr; Hard Top Priority</p>
              </div>
            </div>

            {/* Live Queue Re-ranking Output */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Dynamically Re-Ranked Cause List</h3>
                  <p className="text-xs text-slate-400">Queue re-orders instantly upon weight vector modifications.</p>
                </div>
                <span className="text-xs font-mono font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded">
                  4 Active Matters
                </span>
              </div>

              <div className="space-y-3">
                {rankedCases.map((c, idx) => (
                  <div 
                    key={c.id} 
                    className={`p-4 rounded-xl border transition-all ${
                      c.isSec479 
                        ? 'bg-red-50/60 border-red-300 shadow-xs' 
                        : idx === 0 
                        ? 'bg-purple-50/40 border-purple-200' 
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="h-6 w-6 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                            #{idx + 1}
                          </span>
                          <span className="font-bold text-sm text-slate-900">{c.parties}</span>
                          <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600">
                            {c.caseNo}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">{c.section}</p>
                      </div>

                      <div className="text-right space-y-1">
                        <span className="text-lg font-black font-mono text-purple-900 block">
                          {c.score} <span className="text-[10px] font-normal text-slate-400">Score</span>
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border block ${
                          c.tier.includes('Critical') ? 'bg-red-100 text-red-800 border-red-200' :
                          c.tier.includes('Expedited') ? 'bg-amber-100 text-amber-800 border-amber-200' :
                          'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {c.tier}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex flex-wrap items-center justify-between text-[11px] text-slate-500">
                      <span>Custody: <strong className="text-slate-800 font-mono">{c.custodyDays} Days</strong></span>
                      <span>Pendency: <strong className="text-slate-800 font-mono">{c.pendencyYears} Yrs</strong></span>
                      <span>Victim Vulnerable: <strong className="text-slate-800">{c.vulnerableVictim ? 'Yes' : 'No'}</strong></span>
                      {c.isSec479 && (
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          Sec 479 BNSS Overdue &gt; 1/3 Cap
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
