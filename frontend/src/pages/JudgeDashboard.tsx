import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { 
  Scale, 
  Gavel, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  FileText, 
  ShieldAlert, 
  Users, 
  ArrowUpRight, 
  Loader2, 
  Printer, 
  Copy, 
  Check, 
  X, 
  Sliders, 
  TrendingUp, 
  Building2,
  BookOpen,
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

interface DocketCase {
  id: string;
  item_no: number;
  optimized_item_no?: number;
  case_no: string;
  cnr: string;
  parties: string;
  sections: string;
  offense_severity: number;
  custody_days: number;
  max_sentence_months: number;
  is_vulnerable_victim: boolean;
  pendency_years: number;
  stage: string;
  priority_score?: number;
  urgency_tier?: string;
  tier_color?: string;
  sec479_statutory_bail_eligible?: boolean;
}

export const JudgeDashboard = () => {
  const [isOptimized, setIsOptimized] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [sec479Alerts, setSec479Alerts] = useState<any[]>([]);

  // Modals State
  const [selectedCaseForMemo, setSelectedCaseForMemo] = useState<DocketCase | null>(null);
  const [benchMemoData, setBenchMemoData] = useState<any>(null);
  const [benchMemoLoading, setBenchMemoLoading] = useState(false);

  const [selectedCaseForOrder, setSelectedCaseForOrder] = useState<DocketCase | null>(null);
  const [orderType, setOrderType] = useState("Regular Bail Order");
  const [orderReasons, setOrderReasons] = useState("Accused in custody for 110 days with no prior antecedents; investigation concluded and charge sheet submitted.");
  const [orderData, setOrderData] = useState<any>(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderCopied, setOrderCopied] = useState(false);

  // Initial Docket Cases (Traditional Unordered Registry Sequence)
  const [docket, setDocket] = useState<DocketCase[]>([
    {
      id: "c-4",
      item_no: 1,
      case_no: "CS/2026/482",
      cnr: "DLSE02-003841-2026",
      parties: "Gupta Brothers vs. Municipal Corp & Anr.",
      sections: "Civil Dispute (Permanent Injunction under CPC)",
      offense_severity: 1,
      custody_days: 0,
      max_sentence_months: 0,
      is_vulnerable_victim: false,
      pendency_years: 2.8,
      stage: "Written Statement / Procedural Adjournment",
      urgency_tier: "Procedural Adjournment (Afternoon)",
      priority_score: 18.2
    },
    {
      id: "c-2",
      item_no: 2,
      case_no: "BA/2026/412",
      cnr: "DLSW01-009182-2026",
      parties: "Mohan Lal (In Custody) vs. State",
      sections: "Sec 303(2) BNS (Theft - Max 3 Years)",
      offense_severity: 2,
      custody_days: 110,
      max_sentence_months: 36,
      is_vulnerable_victim: false,
      pendency_years: 0.3,
      stage: "Bail Arguments under Sec 483 BNSS",
      urgency_tier: "Regular Hearing",
      priority_score: 52.4
    },
    {
      id: "c-3",
      item_no: 3,
      case_no: "CC/2026/110",
      cnr: "DLCT01-008123-2024",
      parties: "Sunita Devi (Victim) vs. State & Ors.",
      sections: "Sec 85 BNS (Cruelty by Husband & In-Laws)",
      offense_severity: 3,
      custody_days: 30,
      max_sentence_months: 36,
      is_vulnerable_victim: true,
      pendency_years: 1.6,
      stage: "Cross-Examination of PW-1 (Victim)",
      urgency_tier: "Regular Hearing",
      priority_score: 61.8
    },
    {
      id: "c-1",
      item_no: 4,
      case_no: "SC/2026/89",
      cnr: "DLCT02-004312-2025",
      parties: "State (Govt of NCT) vs. Rakesh @ Kalia & Ors.",
      sections: "Sec 70(1) BNS (Gang Rape) & Sec 115(2) Assault",
      offense_severity: 5,
      custody_days: 240,
      max_sentence_months: 240,
      is_vulnerable_victim: true,
      pendency_years: 0.8,
      stage: "Prosecution Evidence (Forensic Doctor PW-4)",
      urgency_tier: "Unscheduled Trial",
      priority_score: 41.0
    }
  ]);

  // Execute Operations Research Docket Prioritization
  const handleOptimizeDocket = async () => {
    setOptimizing(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/judge/optimize-docket`, {});
      if (res.data && res.data.optimized_docket) {
        setDocket(res.data.optimized_docket);
        setSec479Alerts(res.data.sec479_alerts || []);
        setIsOptimized(true);
      }
    } catch (err) {
      console.error("Docket Optimization Error:", err);
    } finally {
      setOptimizing(false);
    }
  };

  // Generate Bench Memo via Gemini
  const handleOpenBenchMemo = async (c: DocketCase) => {
    setSelectedCaseForMemo(c);
    setBenchMemoLoading(true);
    setBenchMemoData(null);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/judge/generate-bench-memo`, {
        case_title: c.parties,
        cnr: c.cnr,
        charge_sections: c.sections,
        prosecution_case: `Accused in custody for ${c.custody_days} days. State opposes bail alleging flight risk and gravity of offense under ${c.sections}.`,
        defense_plea: `Applicant has clean antecedents. Investigation complete. Accused qualifies for release under Section 479 BNSS.`
      });
      setBenchMemoData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setBenchMemoLoading(false);
    }
  };

  // Compose Judicial Order Sheet via Gemini
  const handleGenerateOrder = async () => {
    if (!selectedCaseForOrder) return;
    setOrderLoading(true);
    setOrderData(null);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/judge/compose-order`, {
        order_type: orderType,
        case_title: selectedCaseForOrder.parties,
        cnr: selectedCaseForOrder.cnr,
        court_name: "In the Court of Additional Sessions Judge, Tis Hazari Courts, Delhi",
        magistrate_name: "Sh. Anand Vardhan, DHJS (Ld. ASJ)",
        operative_reasons: orderReasons,
        directions: [
          "Furnish personal bond of Rs. 25,000/- with one local surety.",
          "Surrender passport to the Investigating Officer.",
          "Appear before IO on every alternate Saturday at 11:00 AM."
        ]
      });
      setOrderData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* JUDICIAL BENCH BANNER (Institutional Slate & Gold) */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 rounded-2xl p-8 text-white shadow-xl flex justify-between items-center border border-slate-800 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="bg-amber-500/20 text-amber-300 text-xs font-mono font-bold px-3 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1.5">
              <Scale className="h-3.5 w-3.5 text-amber-400" /> Delhi Higher Judicial Service (DHJS)
            </span>
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Courtroom 14 • Session 2026-II
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Hon'ble Bench of Sh. Anand Vardhan</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl font-medium">
            Court of Additional Sessions Judge • Central District, Tis Hazari District Court Complex
          </p>
        </div>
        <div className="hidden md:flex bg-amber-400/10 p-5 rounded-2xl items-center justify-center border border-amber-400/20 shadow-inner">
          <Gavel className="h-10 w-10 text-amber-400" />
        </div>
      </div>

      {/* TOP JUDICIAL METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Today's Listed Matters</span>
            <Calendar className="h-4 w-4 text-slate-400" />
          </div>
          <p className="text-3xl font-black text-slate-900 font-mono mt-1">84 Cases</p>
          <span className="text-[11px] text-indigo-700 font-bold">Sitting: 10:30 AM - 04:30 PM</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sec 479 BNSS Bail Alerts</span>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-3xl font-black text-red-600 font-mono mt-1">2 Inmates</p>
          <span className="text-[11px] text-red-700 font-bold">Eligible for Statutory Personal Bond</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Case Clearance Rate</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-emerald-600 font-mono mt-1">94.8%</p>
          <span className="text-[11px] text-emerald-700 font-bold">Target met under National Grid</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Average Disposal Time</span>
            <Clock className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-3xl font-black text-purple-900 font-mono mt-1">14.6 Mos</p>
          <span className="text-[11px] text-purple-700 font-bold">Bench Lifespan Index</span>
        </div>
      </div>

      {/* OPERATIONS RESEARCH: SMART DOCKET OPTIMIZATION CONTROL BAR */}
      <div className="bg-gradient-to-r from-slate-900 to-indigo-950 border border-slate-800 rounded-2xl p-6 shadow-md text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-400 text-slate-950 text-[10px] font-mono font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Data Science Engine
            </span>
            <span className="text-xs font-mono text-indigo-300">Operations Research • Multi-Criteria Prioritization (OR-MCDP)</span>
          </div>
          <h3 className="text-lg font-bold text-white mt-1 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-400" /> Algorithmic Docket Prioritization
          </h3>
          <p className="text-xs text-slate-300 font-medium max-w-2xl">
            Solves court backlogs by analyzing 4 quantitative variables: <strong>Offense Severity (35%)</strong>, <strong>Custody Delay (30%)</strong>, <strong>Victim Vulnerability (20%)</strong>, and <strong>Pendency (15%)</strong>.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleOptimizeDocket}
            disabled={optimizing}
            className={`px-5 py-3 rounded-xl text-xs font-bold transition shadow-md flex items-center gap-2 active:scale-95 ${
              isOptimized 
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                : 'bg-amber-500 hover:bg-amber-600 text-slate-950 font-black'
            }`}
          >
            {optimizing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sliders className="h-4 w-4" />}
            {optimizing ? "Calculating Optimal Queue..." : isOptimized ? "Docket Optimized (Active)" : "Run AI Queue Optimization"}
          </button>
        </div>
      </div>

      {/* SECTION 479 BNSS MANDATORY BAIL TRIGGER ALERT */}
      {isOptimized && sec479Alerts.length > 0 && (
        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-5 shadow-xs animate-in slide-in-from-top-4 duration-300 space-y-3">
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-600" />
            <h4 className="font-extrabold text-sm text-red-950 uppercase tracking-wide">
              Statutory Undertrial Release Alert: Section 479 Bharatiya Nagarik Suraksha Sanhita (BNSS)
            </h4>
          </div>
          <p className="text-xs text-red-900 leading-relaxed font-medium">
            The optimization algorithm detected undertrial prisoners who have served <strong>half of their maximum statutory sentence</strong> in judicial custody without conclusion of trial. Under Section 479 BNSS, this Court has a statutory obligation to consider immediate release on personal bond:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {sec479Alerts.map((alert: any, idx: number) => (
              <div key={idx} className="bg-white border border-red-200 p-3.5 rounded-xl shadow-xs text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">{alert.parties}</span>
                  <span className="bg-red-100 text-red-800 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    {alert.case_no}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px]">
                  Custody: <strong className="text-red-700">{alert.custody_days} Days</strong> • Threshold: <strong>{alert.statutory_threshold}</strong>
                </p>
                <p className="text-emerald-700 font-bold text-[11px] pt-1 border-t border-slate-100">
                  {alert.action}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DAILY CAUSE LIST TABLE / CARDS */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 bg-slate-50/50">
          <div>
            <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
              <Calendar className="h-4 w-4 text-slate-600" /> Daily Cause List: Courtroom 14
            </h3>
            <p className="text-xs text-slate-400">
              {isOptimized 
                ? "Sorted by Operations Research Priority Score Φ (Urgent Matters Called First)" 
                : "Default Unsorted Registry Order (Traditional Clerk Queue)"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full ${
              isOptimized ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-200 text-slate-700'
            }`}>
              {isOptimized ? "● AI OPTIMIZED QUEUE" : "● STANDARD REGISTRY QUEUE"}
            </span>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {docket.map((c) => (
            <div 
              key={c.id} 
              className={`p-6 transition-all hover:bg-slate-50/80 ${
                c.sec479_statutory_bail_eligible ? 'bg-red-50/30' : ''
              }`}
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-3">
                <div className="flex items-center gap-3">
                  {/* Sequence Item Badge */}
                  <div className={`h-11 w-11 rounded-xl flex flex-col items-center justify-center font-mono font-black text-xs shrink-0 shadow-xs ${
                    isOptimized 
                      ? 'bg-indigo-900 text-amber-300 ring-2 ring-amber-400/50' 
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    <span className="text-[9px] uppercase font-sans text-slate-400 font-normal">ITEM</span>
                    <span>{isOptimized ? c.optimized_item_no : c.item_no}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {c.cnr}
                      </span>
                      <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                        {c.case_no}
                      </span>
                      {c.sec479_statutory_bail_eligible && (
                        <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                          <ShieldAlert className="h-3 w-3" /> Sec 479 BNSS Bail Mandatory
                        </span>
                      )}
                    </div>
                    <h4 className="text-base font-bold text-slate-900">{c.parties}</h4>
                  </div>
                </div>

                {/* Priority Score & Urgency Tier */}
                <div className="flex items-center gap-3">
                  {isOptimized && c.priority_score && (
                    <div className="text-right">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                        Priority Score (Φ)
                      </span>
                      <span className="font-mono font-black text-lg text-indigo-900">
                        {c.priority_score} <span className="text-xs text-slate-400 font-normal">/ 100</span>
                      </span>
                    </div>
                  )}

                  <span className={`text-xs font-bold px-3 py-1.5 rounded-lg shrink-0 ${
                    c.urgency_tier?.includes('Critical') ? 'bg-red-100 text-red-800 border border-red-200 font-black' :
                    c.urgency_tier?.includes('Expedited') ? 'bg-orange-100 text-orange-800 border border-orange-200' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {c.urgency_tier}
                  </span>
                </div>
              </div>

              {/* Case Attributes Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-medium text-slate-600 mt-4 bg-slate-50/70 p-3.5 rounded-xl border border-slate-200/60">
                <div>
                  <span className="text-slate-400 block mb-0.5 font-bold uppercase text-[10px]">Sections Invoked</span>
                  <p className="font-bold text-slate-800">{c.sections}</p>
                </div>

                <div>
                  <span className="text-slate-400 block mb-0.5 font-bold uppercase text-[10px]">Custody & Delay</span>
                  <p className="font-bold text-slate-800">
                    {c.custody_days > 0 ? `${c.custody_days} Days in Jail` : 'Civil / On Bail'}
                  </p>
                </div>

                <div>
                  <span className="text-slate-400 block mb-0.5 font-bold uppercase text-[10px]">Trial Stage</span>
                  <p className="font-bold text-slate-800">{c.stage}</p>
                </div>

                <div>
                  <span className="text-slate-400 block mb-0.5 font-bold uppercase text-[10px]">Victim Protection</span>
                  <p className="font-bold text-slate-800">
                    {c.is_vulnerable_victim ? 'Yes (Women / Minor Protection)' : 'Standard'}
                  </p>
                </div>
              </div>

              {/* Bench Actions */}
              <div className="mt-4 flex flex-wrap justify-end gap-2.5">
                <button
                  onClick={() => handleOpenBenchMemo(c)}
                  className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-1.5 border border-indigo-200 shadow-xs"
                >
                  <BookOpen className="h-3.5 w-3.5" /> Bench Memo (AI Law Clerk)
                </button>

                <button
                  onClick={() => {
                    setSelectedCaseForOrder(c);
                    setOrderReasons(`Arguments heard in matter ${c.parties}. Custody duration: ${c.custody_days} days. Investigation complete.`);
                  }}
                  className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-1.5 shadow-xs"
                >
                  <FileText className="h-3.5 w-3.5" /> Compose Order Sheet
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* BENCH MEMO MODAL (AI LAW CLERK) */}
      {selectedCaseForMemo && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  CONFIDENTIAL • JUDICIAL BENCH MEMORANDUM
                </span>
                <h3 className="font-bold text-slate-900 text-lg mt-1">{selectedCaseForMemo.parties}</h3>
                <p className="text-xs text-slate-500">{selectedCaseForMemo.cnr} • {selectedCaseForMemo.sections}</p>
              </div>
              <button 
                onClick={() => setSelectedCaseForMemo(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {benchMemoLoading ? (
              <div className="py-16 text-center space-y-3">
                <Loader2 className="h-10 w-10 text-indigo-600 animate-spin mx-auto" />
                <p className="font-bold text-sm text-slate-800">Synthesizing Judicial Precedents & Legal Questions...</p>
                <p className="text-xs text-slate-400">Reviewing High Court & Supreme Court ratios for presiding judge.</p>
              </div>
            ) : benchMemoData ? (
              <div className="space-y-4 text-xs font-medium">
                
                {/* Executive Summary */}
                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Executive Summary</span>
                  <p className="text-slate-800 leading-relaxed">{benchMemoData.executive_summary}</p>
                </div>

                {/* Substantive Legal Issues */}
                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <HelpCircle className="h-4 w-4 text-indigo-600" /> Core Legal Issues for Determination Today
                  </h4>
                  <ul className="space-y-1.5 pl-4 list-disc text-slate-700">
                    {benchMemoData.legal_issues_for_determination?.map((issue: string, idx: number) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </div>

                {/* Landmark Apex Court Precedents */}
                <div className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl space-y-2">
                  <h4 className="font-bold text-indigo-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-indigo-600" /> Binding Apex Court Authorities (Ratio Decidendi)
                  </h4>
                  <div className="space-y-2">
                    {benchMemoData.landmark_precedents?.map((prec: any, idx: number) => (
                      <div key={idx} className="bg-white p-2.5 rounded-lg border border-indigo-200 text-xs">
                        <span className="font-bold text-indigo-900 block">{prec.citation}</span>
                        <p className="text-slate-600 mt-0.5">{prec.ratio}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Probing Bench Inquiries */}
                <div className="bg-amber-50/60 border border-amber-200 p-4 rounded-xl space-y-2">
                  <h4 className="font-bold text-amber-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <Gavel className="h-4 w-4 text-amber-700" /> Recommended Bench Queries to Counsels
                  </h4>
                  <ul className="space-y-1.5 pl-4 list-disc text-amber-900">
                    {benchMemoData.recommended_bench_inquiry?.map((q: string, idx: number) => (
                      <li key={idx}><strong>Query:</strong> {q}</li>
                    ))}
                  </ul>
                </div>

                {/* Tentative Disposition Advice */}
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900">
                  <span className="font-bold uppercase tracking-wider text-[10px] block mb-0.5 text-emerald-950">
                    Tentative Order Recommendation:
                  </span>
                  <p className="text-xs">{benchMemoData.tentative_disposition_advice}</p>
                </div>

              </div>
            ) : null}

            <div className="pt-2 flex justify-end gap-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedCaseForMemo(null)}
                className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50"
              >
                Close Bench Memo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ORDER SHEET COMPOSER MODAL */}
      {selectedCaseForOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Judicial Order Sheet Composer</h3>
                <p className="text-xs text-slate-500">Case: {selectedCaseForOrder.parties} ({selectedCaseForOrder.case_no})</p>
              </div>
              <button 
                onClick={() => { setSelectedCaseForOrder(null); setOrderData(null); }}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  Order Nature
                </label>
                <select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold focus:ring-2 focus:ring-slate-900"
                >
                  <option>Regular Bail Order (Section 483 BNSS)</option>
                  <option>Remand Extension / Judicial Custody Order</option>
                  <option>Notice to Public Prosecutor & Case Diary Production</option>
                  <option>Bailable Warrants for Attendance of Hostile Witness</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1">
                  Operative Reasons Dictated from the Bench
                </label>
                <textarea
                  rows={3}
                  value={orderReasons}
                  onChange={(e) => setOrderReasons(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:ring-2 focus:ring-slate-900 resize-none"
                />
              </div>

              <button
                onClick={handleGenerateOrder}
                disabled={orderLoading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-lg text-xs transition shadow-sm flex items-center justify-center gap-2"
              >
                {orderLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                {orderLoading ? "Dictating Formal Order Sheet..." : "Generate Official Court Order Sheet"}
              </button>

              {orderData && (
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Formal Order Output</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(orderData.formal_order_text);
                        setOrderCopied(true);
                        setTimeout(() => setOrderCopied(false), 2000);
                      }}
                      className="text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1 rounded-lg flex items-center gap-1 transition"
                    >
                      {orderCopied ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                      {orderCopied ? "Copied" : "Copy Order"}
                    </button>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs text-slate-800 whitespace-pre-wrap max-h-60 overflow-y-auto leading-relaxed">
                    {orderData.formal_order_text}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
