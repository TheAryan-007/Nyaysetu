import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { 
  BookOpen, 
  FileText, 
  Sparkles, 
  Gavel, 
  Scale, 
  Loader2, 
  Copy, 
  Check, 
  Printer, 
  HelpCircle,
  ShieldCheck,
  Building2
} from 'lucide-react';

export const JudgeTools = () => {
  const [activeTab, setActiveTab] = useState<'memo' | 'order'>('memo');

  // Memo State
  const [caseTitle, setCaseTitle] = useState("State (Govt of NCT) vs. Rakesh @ Kalia & Ors.");
  const [cnr, setCnr] = useState("DLCT02-004312-2025");
  const [charges, setCharges] = useState("Sec 70(1) BNS (Gang Rape) & Sec 115(2) Assault");
  const [prosecution, setProsecution] = useState("Accused in custody for 240 days. State opposes bail alleging heinous nature of crime and threat to victim. Investigation complete.");
  const [defense, setDefense] = useState("Co-accused already admitted to bail. Accused has clean antecedents. No forensic DNA match established. Undertrial custody excessive.");
  const [memoResult, setMemoResult] = useState<any>(null);
  const [memoLoading, setMemoLoading] = useState(false);

  // Order Sheet State
  const [orderType, setOrderType] = useState("Regular Bail Order (Section 483 BNSS)");
  const [orderCourt, setOrderCourt] = useState("Court of Additional Sessions Judge, Tis Hazari Courts, Delhi");
  const [orderJudge, setOrderJudge] = useState("Sh. Anand Vardhan, DHJS (Ld. ASJ)");
  const [orderReasons, setOrderReasons] = useState("Investigation is concluded and charge sheet stands filed. No recovery remains to be effected. Co-accused on bail. Undertrial detention cannot be prolonged indefinitely.");
  const [orderResult, setOrderResult] = useState<any>(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate Memo
  const handleGenerateMemo = async (e: React.FormEvent) => {
    e.preventDefault();
    setMemoLoading(true);
    setMemoResult(null);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/judge/generate-bench-memo`, {
        case_title: caseTitle,
        cnr,
        charge_sections: charges,
        prosecution_case: prosecution,
        defense_plea: defense
      });
      setMemoResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setMemoLoading(false);
    }
  };

  // Generate Order Sheet
  const handleGenerateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderLoading(true);
    setOrderResult(null);

    try {
      const res = await axios.post(`${API_BASE_URL}/api/v1/judge/compose-order`, {
        order_type: orderType,
        case_title: caseTitle,
        cnr,
        court_name: orderCourt,
        magistrate_name: orderJudge,
        operative_reasons: orderReasons,
        directions: [
          "Accused admitted to regular bail on furnishing personal bond in sum of Rs. 30,000/- with one local surety.",
          "Surrender original passport to the Court registry within 48 hours.",
          "Not to contact or approach the complainant directly or indirectly."
        ]
      });
      setOrderResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setOrderLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 rounded-2xl p-8 text-white shadow-xl flex justify-between items-center border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="bg-amber-500/20 text-amber-300 text-xs font-mono font-bold px-3 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-amber-400" /> Judicial AI Chambers Suite
            </span>
            <span className="text-xs text-slate-300 font-mono">Powered by Gemini 3.8 Flash</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Bench Intelligence & Order Sheet Composer</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl font-medium">
            Confidential pre-bench research memorandum generator and formal court order drafting for judicial officers.
          </p>
        </div>
        <div className="hidden md:flex bg-amber-400/10 p-5 rounded-2xl items-center justify-center border border-amber-400/20 shadow-inner">
          <Scale className="h-10 w-10 text-amber-400" />
        </div>
      </div>

      {/* TABS */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-xl px-4 pt-2 gap-2 shadow-xs">
        <button
          onClick={() => setActiveTab('memo')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition ${
            activeTab === 'memo'
              ? 'border-indigo-600 text-indigo-700 bg-indigo-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="h-4 w-4" /> AI Judicial Law Clerk (Bench Memo)
        </button>

        <button
          onClick={() => setActiveTab('order')}
          className={`flex items-center gap-2 px-5 py-3 text-sm font-bold border-b-2 transition ${
            activeTab === 'order'
              ? 'border-indigo-600 text-indigo-700 bg-indigo-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-50'
          }`}
        >
          <FileText className="h-4 w-4" /> Daily Order Sheet Composer
        </button>
      </div>

      {/* TAB 1: BENCH MEMORANDUM */}
      {activeTab === 'memo' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-b-xl lg:rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Pre-Hearing Case Brief</h2>
              <p className="text-xs text-slate-500">Law clerk synthesizes core legal issues, Apex Court precedents, and questions for counsels.</p>
            </div>

            <form onSubmit={handleGenerateMemo} className="space-y-4 text-xs font-medium">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Case Title</label>
                <input 
                  type="text" value={caseTitle} onChange={(e) => setCaseTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-medium focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-bold block mb-1">CNR Number</label>
                  <input 
                    type="text" value={cnr} onChange={(e) => setCnr(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold block mb-1">Sections Invoked</label>
                  <input 
                    type="text" value={charges} onChange={(e) => setCharges(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Prosecution / State Submissions</label>
                <textarea 
                  rows={3} value={prosecution} onChange={(e) => setProsecution(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs resize-none"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Defense Arguments & Grounds</label>
                <textarea 
                  rows={3} value={defense} onChange={(e) => setDefense(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={memoLoading}
                className="w-full bg-indigo-900 hover:bg-slate-900 text-white font-bold py-3 rounded-lg text-xs transition shadow-sm flex items-center justify-center gap-2"
              >
                {memoLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4 text-amber-400" />}
                {memoLoading ? "Synthesizing Bench Memorandum..." : "Generate Judicial Bench Memorandum"}
              </button>
            </form>
          </div>

          {/* MEMO OUTPUT */}
          <div className="bg-white p-6 rounded-b-xl lg:rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="pb-3 border-b border-slate-100 flex justify-between items-center mb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Judicial Law Clerk Memo</h3>
                <p className="text-[11px] text-slate-400">Strictly Confidential • For Presiding Officer</p>
              </div>
              {memoResult && (
                <span className="text-xs font-mono font-bold bg-amber-50 text-amber-800 px-2.5 py-1 rounded border border-amber-200">
                  Bench Ready
                </span>
              )}
            </div>

            {memoLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-center space-y-3">
                <Loader2 className="h-10 w-10 text-indigo-600 animate-spin" />
                <p className="font-bold text-sm text-slate-800">Synthesizing High Court & Supreme Court Precedents...</p>
                <p className="text-xs text-slate-400 max-w-xs">Extracting binding ratios on bail and constitutional custody caps.</p>
              </div>
            ) : memoResult ? (
              <div className="space-y-4 overflow-y-auto max-h-[460px] pr-1 text-xs">
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Executive Summary</span>
                  <p className="text-slate-800 leading-relaxed">{memoResult.executive_summary}</p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <HelpCircle className="h-4 w-4 text-indigo-600" /> Core Issues for Determination
                  </h4>
                  <ul className="space-y-1 list-disc pl-4 text-slate-700">
                    {memoResult.legal_issues_for_determination?.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-indigo-50/50 border border-indigo-100 p-3.5 rounded-xl space-y-2">
                  <h4 className="font-bold text-indigo-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
                    <BookOpen className="h-4 w-4 text-indigo-600" /> Binding Apex Court Rulings
                  </h4>
                  {memoResult.landmark_precedents?.map((prec: any, i: number) => (
                    <div key={i} className="bg-white p-2.5 rounded border border-indigo-200">
                      <p className="font-bold text-indigo-900">{prec.citation}</p>
                      <p className="text-slate-600 text-[11px] mt-0.5">{prec.ratio}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-50/60 border border-amber-200 p-3.5 rounded-xl">
                  <h4 className="font-bold text-amber-950 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Gavel className="h-4 w-4 text-amber-700" /> Questions to Pose to Counsels
                  </h4>
                  <ul className="space-y-1 list-disc pl-4 text-amber-900 text-[11px]">
                    {memoResult.recommended_bench_inquiry?.map((q: string, i: number) => (
                      <li key={i}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-center space-y-2 text-slate-400">
                <BookOpen className="h-12 w-12 stroke-[1.5]" />
                <p className="font-bold text-sm text-slate-600">No Bench Memo Generated</p>
                <p className="text-xs max-w-xs">Fill in case facts on the left and click 'Generate' to synthesize research.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: ORDER SHEET COMPOSER */}
      {activeTab === 'order' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-b-xl lg:rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Order Parameters & Dictation</h2>
              <p className="text-xs text-slate-500">Dictate judicial findings; AI generates official Court Order Sheet format.</p>
            </div>

            <form onSubmit={handleGenerateOrder} className="space-y-4 text-xs font-medium">
              <div>
                <label className="text-slate-700 font-bold block mb-1">Order Type</label>
                <select 
                  value={orderType} onChange={(e) => setOrderType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-bold"
                >
                  <option>Regular Bail Order (Section 483 BNSS)</option>
                  <option>Remand Extension / Judicial Custody Order</option>
                  <option>Notice to Public Prosecutor & Case Diary Production</option>
                  <option>Bailable Warrants for Attendance of Hostile Witness</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Court Designation</label>
                <input 
                  type="text" value={orderCourt} onChange={(e) => setOrderCourt(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Presiding Judicial Officer</label>
                <input 
                  type="text" value={orderJudge} onChange={(e) => setOrderJudge(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="text-slate-700 font-bold block mb-1">Operative Judicial Reasoning</label>
                <textarea 
                  rows={4} value={orderReasons} onChange={(e) => setOrderReasons(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={orderLoading}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-lg text-xs transition shadow-sm flex items-center justify-center gap-2"
              >
                {orderLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                {orderLoading ? "Composing Court Order Sheet..." : "Generate Official Order Sheet"}
              </button>
            </form>
          </div>

          {/* ORDER SHEET OUTPUT */}
          <div className="bg-white p-6 rounded-b-xl lg:rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="pb-3 border-b border-slate-100 flex justify-between items-center mb-3">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Court Order Sheet Preview</h3>
                <p className="text-[11px] text-slate-400">Delhi District Court Standard Judicial Format</p>
              </div>
              {orderResult && (
                <button
                  onClick={() => copyToClipboard(orderResult.formal_order_text)}
                  className="flex items-center gap-1 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied ? "Copied" : "Copy Order Sheet"}
                </button>
              )}
            </div>

            {orderLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-center space-y-3">
                <Loader2 className="h-10 w-10 text-slate-700 animate-spin" />
                <p className="font-bold text-sm text-slate-800">Formatting Official Order Sheet...</p>
                <p className="text-xs text-slate-400">Structuring appearances, operative reasoning, and bond directions.</p>
              </div>
            ) : orderResult ? (
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs text-slate-800 whitespace-pre-wrap max-h-[460px] overflow-y-auto leading-relaxed shadow-inner">
                {orderResult.formal_order_text}
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-center space-y-2 text-slate-400">
                <FileText className="h-12 w-12 stroke-[1.5]" />
                <p className="font-bold text-sm text-slate-600">No Order Sheet Composed</p>
                <p className="text-xs max-w-xs">Fill in order parameters and click 'Generate' to draft the court order.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
