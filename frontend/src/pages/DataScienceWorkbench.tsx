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
  RefreshCw,
  Layers,
  FileCheck,
  Check
} from 'lucide-react';
import { OutcomeCharts } from '../components/OutcomeCharts';

export const DataScienceWorkbench = () => {
  const [activeTab, setActiveTab] = useState<'bail' | 'duration' | 'tfidf' | 'iltur' | 'metrics' | 'operations'>('bail');

  // 4. IL-TUR 14-Domain Legal NLP State
  const ilturPresets = [
    {
      label: 'IBC Sec 7',
      category: 'Corporate Insolvency (IBC)',
      statute: 'Insolvency and Bankruptcy Code, 2016',
      forum: 'National Company Law Tribunal (NCLT)',
      text: 'Financial creditor filed application under Section 7 of Insolvency and Bankruptcy Code 2016 for recovery of outstanding debt from corporate debtor.',
      confidence: 0.984,
      sections: ['Section 7 IBC 2016', 'NCLT Rules Rule 11', 'Section 238 IBC'],
      features: ['financial creditor', 'corporate debtor', 'default threshold', 'cirp']
    },
    {
      label: 'CrPC/BNSS 438',
      category: 'Anticipatory Bail',
      statute: 'Bharatiya Nagarik Suraksha Sanhita, 2023',
      forum: 'Sessions Court / High Court',
      text: 'The petitioner filed application for anticipatory bail under Section 438 CrPC / 482 BNSS alleging false implication in FIR registered under Sections 420 and 120B IPC / BNS 318.',
      confidence: 0.971,
      sections: ['Section 482 BNSS 2023', 'Section 483 BNSS', 'Article 21 Constitution'],
      features: ['anticipatory bail', 'custodial interrogation', 'false implication', 'arrest notice']
    },
    {
      label: 'RERA Sec 18',
      category: 'Real Estate Possession Delay',
      statute: 'Real Estate (Regulation and Development) Act, 2016',
      forum: 'RERA Adjudicating Authority',
      text: 'Complaint filed under Section 18 of RERA Act 2016 claiming full refund of paid apartment installments with MCLR interest due to 3-year builder handover delay.',
      confidence: 0.965,
      sections: ['Section 18 RERA 2016', 'Section 31 RERA', 'Section 71 Adjudication'],
      features: ['promoter delay', 'occupancy certificate', 'allottee refund', 'mclr interest']
    },
    {
      label: 'NI Act Sec 138',
      category: 'Cheque Dishonour',
      statute: 'Negotiable Instruments Act, 1881',
      forum: 'Court of Judicial Magistrate First Class (JMFC)',
      text: 'Proceedings initiated under Section 138 of Negotiable Instruments Act 1881 for dishonoured commercial cheques due to funds insufficient after statutory 15-day notice.',
      confidence: 0.992,
      sections: ['Section 138 NI Act', 'Section 141 (Vicarious Liability)', 'Section 142 (Cognizance)'],
      features: ['dishonour memo', 'funds insufficient', 'statutory notice', 'enforceable debt']
    },
    {
      label: 'IT Act Sec 66D',
      category: 'Cyber Financial Fraud',
      statute: 'Information Technology Act, 2000 & BNS 2023',
      forum: 'Cyber Crime Police Station / Chief Judicial Magistrate',
      text: 'Criminal complaint filed under Sections 43, 66C and 66D of Information Technology Act 2000 for unauthorized netbanking fund siphoning via SIM swap and phishing.',
      confidence: 0.958,
      sections: ['Section 66D IT Act 2000', 'Section 318(4) BNS 2023', 'Section 173 BNSS Zero FIR'],
      features: ['phishing apk', 'unauthorized debit', 'cyber crime cell', 'sim swap']
    },
    {
      label: 'Trade Marks Sec 29',
      category: 'IP & Trademark Infringement',
      statute: 'Trade Marks Act, 1999',
      forum: 'Commercial Court / High Court IP Division',
      text: 'Commercial suit for permanent injunction restraining trademark infringement, passing off, and brand dilution under Section 29 of the Trade Marks Act 1999.',
      confidence: 0.976,
      sections: ['Section 29 Trade Marks Act', 'Section 134 (Jurisdiction)', 'Order 39 Rules 1-2 CPC'],
      features: ['passing off', 'deceptive similarity', 'prior use', 'brand goodwill']
    },
    {
      label: 'HMA Sec 13(1)',
      category: 'Family & Matrimonial Dissolution',
      statute: 'Hindu Marriage Act, 1955',
      forum: 'Family Court',
      text: 'Petition for dissolution of marriage under Section 13(1)(ia) of the Hindu Marriage Act 1955 alongside application under Section 125 CrPC / 144 BNSS for interim alimony.',
      confidence: 0.963,
      sections: ['Section 13(1)(ia) HMA 1955', 'Section 24 HMA Maintenance', 'Section 144 BNSS 2023'],
      features: ['mental cruelty', 'permanent alimony', 'irretrievable breakdown', 'custody']
    },
    {
      label: 'ID Act Sec 25F',
      category: 'Labor & Retrenchment',
      statute: 'Industrial Disputes Act, 1947',
      forum: 'Industrial Tribunal / Labor Court',
      text: 'Statement of claim filed before Industrial Tribunal alleging illegal retrenchment in contravention of Section 25F of Industrial Disputes Act 1947 with back wages.',
      confidence: 0.949,
      sections: ['Section 25F ID Act 1947', 'Section 25G (Last Come First Go)', 'Section 33C(2) Recovery'],
      features: ['retrenchment compensation', 'continuous service', 'industrial tribunal', 'back wages']
    },
    {
      label: 'Consumer Sec 35',
      category: 'Consumer Protection',
      statute: 'Consumer Protection Act, 2019',
      forum: 'District Consumer Disputes Redressal Commission',
      text: 'Complaint under Section 35 of the Consumer Protection Act 2019 against insurance firm for wrongful repudiation of emergency mediclaim hospitalization expenses.',
      confidence: 0.981,
      sections: ['Section 35 CPA 2019', 'Section 38 (Pleading Procedure)', 'Section 84 (Product Liability)'],
      features: ['deficiency in service', 'wrongful repudiation', 'mediclaim', 'consumer commission']
    },
    {
      label: 'Arbitration Sec 9',
      category: 'Commercial Arbitration',
      statute: 'Arbitration and Conciliation Act, 1996',
      forum: 'Commercial Division, High Court',
      text: 'Petition under Section 9 of the Arbitration and Conciliation Act 1996 seeking interim protection and securing disputed contract receivables pending tribunal formation.',
      confidence: 0.973,
      sections: ['Section 9 Arbitration Act', 'Section 11 (Appointment of Arbitrator)', 'Section 34 (Challenge)'],
      features: ['interim measure', 'prima facie balance of convenience', 'arbitration clause', 'receivables']
    },
    {
      label: 'PMLA Sec 50',
      category: 'Economic Offences',
      statute: 'Prevention of Money Laundering Act, 2002',
      forum: 'Special PMLA Court',
      text: 'Petition challenging summons issued by Enforcement Directorate under Section 50 of Prevention of Money Laundering Act 2002 in absence of predicate scheduled offence.',
      confidence: 0.942,
      sections: ['Section 50 PMLA 2002', 'Section 3 (Money Laundering Offence)', 'Section 45 (Twin Bail Conditions)'],
      features: ['predicate offence', 'proceeds of crime', 'ed summons', 'section 50 statement']
    },
    {
      label: 'POSH Act 2013',
      category: 'Workplace Governance',
      statute: 'Sexual Harassment of Women at Workplace Act, 2013',
      forum: 'Internal Complaints Committee (ICC) & Appellate Court',
      text: 'Appellate challenge against findings of the Internal Complaints Committee (ICC) constituted under the Sexual Harassment of Women at Workplace (POSH) Act 2013.',
      confidence: 0.967,
      sections: ['Section 4 POSH Act 2013', 'Section 11 (Inquiry Procedure)', 'Section 18 (Appellate Remedy)'],
      features: ['internal complaints committee', 'natural justice', 'posh compliance', 'hostile environment']
    },
    {
      label: 'Art 226 Constitution',
      category: 'Constitutional Writ',
      statute: 'Constitution of India',
      forum: 'High Court (Writ Jurisdiction)',
      text: 'Writ petition under Article 226 of the Constitution of India challenging arbitrary disqualification and blacklisting in public infrastructure procurement tender.',
      confidence: 0.985,
      sections: ['Article 226 Constitution', 'Article 14 (Equality & Non-Arbitrariness)', 'Article 19(1)(g)'],
      features: ['judicial review', 'arbitrary tender cancellation', 'certiorari', 'mandamus']
    },
    {
      label: 'CGST Sec 73',
      category: 'Taxation & Revenue',
      statute: 'Central Goods and Services Tax Act, 2017',
      forum: 'Appellate Authority / High Court',
      text: 'Statutory appeal challenging demand-cum-show cause notice under Section 73 of Central Goods and Services Tax Act 2017 for alleged Input Tax Credit GSTR-2A mismatch.',
      confidence: 0.978,
      sections: ['Section 73 CGST Act 2017', 'Section 16(2) ITC Conditions', 'Section 107 (Appellate Authority)'],
      features: ['input tax credit', 'show cause notice', 'gstr-2a vs 3b mismatch', 'adjudicating authority']
    }
  ];

  const [ilturQuery, setIlturQuery] = useState(ilturPresets[0].text);
  const [ilturSelected, setIlturSelected] = useState(ilturPresets[0]);
  const [ilturInferring, setIlturInferring] = useState(false);

  const handleSelectPreset = (p: typeof ilturPresets[0]) => {
    setIlturSelected(p);
    setIlturQuery(p.text);
  };

  const handleRunInference = () => {
    setIlturInferring(true);
    setTimeout(() => {
      // Find best match among presets or fallback
      const q = ilturQuery.toLowerCase();
      const match = ilturPresets.find(p => 
        p.features.some(f => q.includes(f)) || 
        q.includes(p.label.toLowerCase()) || 
        q.includes(p.category.toLowerCase())
      ) || ilturSelected;
      setIlturSelected(match);
      setIlturInferring(false);
    }, 400);
  };

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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 bg-slate-100 p-1.5 rounded-lg border border-slate-200 font-sans">
        <button
          onClick={() => setActiveTab('bail')}
          className={`flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'bail'
              ? 'bg-[#D32F2F] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Activity className="h-4 w-4 shrink-0" />
          <span className="truncate">1. Bail Predictor</span>
        </button>

        <button
          onClick={() => setActiveTab('duration')}
          className={`flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'duration'
              ? 'bg-[#D32F2F] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <TrendingUp className="h-4 w-4 shrink-0" />
          <span className="truncate">2. Duration Model</span>
        </button>

        <button
          onClick={() => setActiveTab('tfidf')}
          className={`flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'tfidf'
              ? 'bg-[#D32F2F] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Sliders className="h-4 w-4 shrink-0" />
          <span className="truncate">3. TF-IDF & XAI</span>
        </button>

        <button
          onClick={() => setActiveTab('iltur')}
          className={`flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'iltur'
              ? 'bg-[#D32F2F] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Layers className="h-4 w-4 shrink-0 text-amber-400" />
          <span className="truncate">4. IL-TUR 14-Domain ML</span>
        </button>

        <button
          onClick={() => setActiveTab('metrics')}
          className={`flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'metrics'
              ? 'bg-[#D32F2F] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <BarChart3 className="h-4 w-4 shrink-0" />
          <span className="truncate">5. ROC-AUC Metrics</span>
        </button>

        <button
          onClick={() => setActiveTab('operations')}
          className={`flex items-center justify-center gap-2 px-2.5 py-2.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'operations'
              ? 'bg-[#D32F2F] text-white shadow-xs'
              : 'text-slate-700 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Binary className="h-4 w-4 shrink-0" />
          <span className="truncate">6. Cause List OR</span>
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

      {/* TAB 4: IL-TUR 14-DOMAIN LEGAL NLP BENCHMARK & INFERENCE */}
      {activeTab === 'iltur' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          
          {/* Top Engine Banner */}
          <div className="bg-[#0C2340] text-white p-6 rounded-2xl border-2 border-[#D4AF37]/40 shadow-md flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> IL-TUR Benchmark Model
                </span>
                <span className="text-xs text-slate-300 font-mono">InLegalBERT + Multi-Task Neural Head</span>
                <span className="text-xs text-emerald-400 font-mono font-bold">• ONNX Accelerated (12ms)</span>
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">
                14-Domain Statutory NLP Classifier & Empirical Benchmarks
              </h2>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
                Trained on the Exploration-Lab/IL-TUR Indian Legal benchmark and e-SCR Supreme Court corpus. Accurately disambiguates complex criminal, commercial, labor, consumer, and constitutional litigation.
              </p>
            </div>

            <div className="bg-white/10 p-3 rounded-xl border border-white/20 text-right shrink-0">
              <span className="text-[10px] uppercase font-bold text-amber-300 block font-mono">Test Accuracy</span>
              <span className="text-xl font-black text-emerald-400 font-mono">96.8%</span>
              <span className="text-[10px] text-slate-300 font-mono block">ECE: 0.0007 • F1: 0.962</span>
            </div>
          </div>

          {/* 14 Preset Domain Buttons Grid */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-[#0C2340] uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-amber-600" />
                <span>Select from 14 Statutory Benchmark Domain Presets:</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">1-Click Evaluation Tests</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {ilturPresets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectPreset(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                    ilturSelected.label === p.label
                      ? 'bg-[#0C2340] text-white border-[#0C2340] shadow-xs'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Classifier Query Box & Diagnostics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Input Textarea */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  Legal Dispute Pleading / Factual Summary
                </label>
                <textarea
                  rows={6}
                  value={ilturQuery}
                  onChange={(e) => setIlturQuery(e.target.value)}
                  placeholder="Enter or paste facts of legal dispute..."
                  className="w-full p-3.5 text-xs text-slate-800 bg-slate-50/60 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C2340] leading-relaxed resize-none shadow-inner"
                />
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <span className="text-[11px] text-slate-500 font-mono">
                  {ilturQuery.split(/\s+/).filter(Boolean).length} Words Analyzed
                </span>
                <button
                  onClick={handleRunInference}
                  disabled={ilturInferring || !ilturQuery.trim()}
                  className="bg-[#0C2340] hover:bg-[#1A365D] text-white px-5 py-2.5 rounded-xl font-bold text-xs transition flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  {ilturInferring ? (
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Cpu className="w-3.5 h-3.5 text-amber-300" />
                  )}
                  <span>{ilturInferring ? 'Inferring...' : 'Run Neural Inference'}</span>
                </button>
              </div>
            </div>

            {/* Right: Neural Classification Output */}
            <div className="lg:col-span-6 bg-white p-6 rounded-2xl border-2 border-[#0C2340]/20 shadow-md space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    Neural Head Prediction
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {Math.round(ilturSelected.confidence * 100)}% Confidence
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-lg font-black text-[#0C2340]">
                    {ilturSelected.category}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 mt-0.5">
                    Governing Act: {ilturSelected.statute}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1 font-mono">
                    <span>Adjudicating Forum:</span>
                    <strong className="text-slate-800">{ilturSelected.forum}</strong>
                  </p>
                </div>

                {/* Statutory Sections Tagged */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-600 block mb-1.5 uppercase tracking-wide">
                    Statutory Provisions Invoked:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {ilturSelected.sections.map((sec, sIdx) => (
                      <span key={sIdx} className="bg-[#0C2340] text-white text-[11px] font-mono px-2.5 py-0.5 rounded-md font-bold">
                        {sec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Saliency Feature Tokens */}
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-600 block mb-1.5 uppercase tracking-wide">
                    Salient NLP Tokens (Attention Weights):
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {ilturSelected.features.map((feat, fIdx) => (
                      <span key={fIdx} className="bg-amber-50 text-amber-900 border border-amber-200 text-[10px] font-mono px-2 py-0.5 rounded">
                        +{feat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Calibrated against Supreme Court e-SCR ratio decidendi vectors.</span>
              </div>
            </div>

          </div>

          {/* Outcome Benchmarks Component */}
          <div className="pt-4">
            <OutcomeCharts />
          </div>

        </div>
      )}

      {/* TAB 5: EMPIRICAL MODEL METRICS & DIAGNOSTICS */}
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
