import React, { useState } from 'react';
import { 
  Search, AlertCircle, Clock, Scale, ArrowRight, Activity, ShieldCheck, 
  HeartHandshake, Loader2, Mic, PhoneCall, HelpCircle, Home, Users, 
  Banknote, ShieldAlert, CheckCircle2, ChevronRight, FileText, Sparkles,
  ExternalLink, Flag, AlertTriangle, Info, Check, Shield, Lock, ArrowUpRight
} from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { 
  analyzeLegalProblemLocal, 
  type LegalAnalysisResult, 
  type LegalSectionDetail, 
  type ProceduralAction, 
  type OfficialPortal 
} from '../utils/legalAiEngine';

export const CitizenDashboard: React.FC = () => {
  const [problemText, setProblemText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<LegalAnalysisResult | null>(null);
  const [flaggedSections, setFlaggedSections] = useState<Record<string, boolean>>({});
  
  // States for Advanced Input Features
  const [isListening, setIsListening] = useState(false);
  const [showGuidedUI, setShowGuidedUI] = useState(false);

  // Web Speech API (Voice to Text in Hindi/English)
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please use Google Chrome.");
      return;
    }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'hi-IN';

    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((res: any) => res[0].transcript)
        .join('');
      setProblemText(transcript);
    };
    
    recognition.onerror = (event: any) => {
      console.error(event.error);
      setIsListening(false);
    };
    
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  const handleAnalyze = async (textToAnalyze = problemText) => {
    if (!textToAnalyze.trim()) return;
    
    setLoading(true);
    setResult(null);
    setShowGuidedUI(false);
    
    try {
      // 1. Attempt connection to live FastAPI backend if available
      const res = await axios.post(`${API_BASE_URL}/api/v1/analyze-problem`, {
        text: textToAnalyze,
        language: "auto"
      }, { timeout: 3500 });
      
      if (res.data && res.data.recommended_sections) {
        setResult(res.data);
        setLoading(false);
        return;
      }
    } catch {
      // Backend offline or timeout - activate high-precision Local Legal AI Engine
    }

    // 2. High-Precision Local Indian Legal AI Engine (BNS, BNSS, BSA 2023)
    const localResult = analyzeLegalProblemLocal(textToAnalyze);
    setResult(localResult);
    setLoading(false);
  };

  const toggleFlagSection = (sectionCode: string) => {
    setFlaggedSections(prev => ({
      ...prev,
      [sectionCode]: !prev[sectionCode]
    }));
  };

  // Guided Visual Categories
  const guidedCategories = [
    { title: "Online Payment Fraud", icon: <Banknote className="h-8 w-8 mb-2 text-amber-500" />, prompt: "I transferred ₹25,000 through UPI for a product. The recipient blocked me and never delivered it. What should I do?" },
    { title: "Defective Goods & E-Commerce", icon: <FileText className="h-8 w-8 mb-2 text-blue-500" />, prompt: "I bought a brand new refrigerator with a 1-year warranty. It stopped cooling within 3 days and the service center refuses replacement." },
    { title: "Property & Land Encroachment", icon: <Home className="h-8 w-8 mb-2 text-emerald-500" />, prompt: "Someone is trying to illegally occupy my ancestral land and threatening me with forged papers." },
    { title: "Domestic Abuse / Dowry", icon: <Users className="h-8 w-8 mb-2 text-rose-500" />, prompt: "My in-laws and husband are physically harassing me and making continuous demands for dowry." },
    { title: "Criminal Threats & Extortion", icon: <ShieldAlert className="h-8 w-8 mb-2 text-red-500" />, prompt: "A criminal called demanding ₹5 Lakhs extortion money and threatened to shoot me if I don't pay." },
    { title: "Contractual Dispute", icon: <Scale className="h-8 w-8 mb-2 text-indigo-500" />, prompt: "I signed a contract with a contractor who completed 60% of renovation work but delayed the rest due to material costs." }
  ];

  // Helper for Status Badge Styling
  const getApplicabilityBadge = (status?: string) => {
    switch (status) {
      case 'Directly Applicable':
        return <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-300 flex items-center gap-1"><Check className="h-3.5 w-3.5 text-emerald-600" /> Directly Applicable</span>;
      case 'Conditional on Missing Facts':
        return <span className="text-xs font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-300 flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5 text-amber-600" /> Conditional (Facts Needed)</span>;
      case 'Alternative Civil Remedy':
        return <span className="text-xs font-bold text-blue-800 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-300 flex items-center gap-1"><Scale className="h-3.5 w-3.5 text-blue-600" /> Alternative Civil Remedy</span>;
      case 'Procedural Safeguard':
        return <span className="text-xs font-bold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-300 flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-purple-600" /> Procedural Safeguard</span>;
      default:
        return <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300">Potentially Relevant</span>;
    }
  };

  // Helper for Category Badge Styling
  const getCategoryBadge = (cat?: string) => {
    switch (cat) {
      case 'Substantive Criminal Offence':
        return <span className="text-[11px] font-bold text-rose-800 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">Substantive Offence</span>;
      case 'Cyber Crime Offence':
        return <span className="text-[11px] font-bold text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-200">IT & Cyber Law</span>;
      case 'Consumer & Civil Remedy':
        return <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Consumer & Civil Redressal</span>;
      case 'Procedural Safeguard':
        return <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-300">Procedural Provision</span>;
      default:
        return <span className="text-[11px] font-bold text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">{cat || 'Statutory Provision'}</span>;
    }
  };

  // Helper for Action Type Badges
  const getActionTypeBadge = (type?: string) => {
    switch (type) {
      case 'emergency_golden_hour':
        return <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider animate-pulse">🚨 Urgent (Golden Hour)</span>;
      case 'legally_required':
        return <span className="bg-[#0C2340] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">⚖️ Legally Required</span>;
      case 'recommended_practical':
        return <span className="bg-blue-100 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">💡 Recommended Step</span>;
      case 'optional_escalation':
        return <span className="bg-purple-100 text-purple-900 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">↗️ Optional Escalation</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Action</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main Input Area & Structured Legal Report */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#0C2340] flex items-center gap-2 tracking-tight">
                <Scale className="h-6 w-6 text-orange-500" /> 
                Apni Problem Batayein (AI Statutory Assistant)
              </h2>
              <button 
                onClick={() => setShowGuidedUI(!showGuidedUI)}
                className="text-sm font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full transition"
              >
                <HelpCircle className="h-4 w-4" /> 
                {showGuidedUI ? "Switch to Text Box" : "Need Example Queries?"}
              </button>
            </div>

            {!showGuidedUI ? (
              <>
                <p className="text-sm text-slate-500 mb-5 font-medium">
                  Describe what happened in simple English or Hinglish. Include key details like dates, amounts, and actions taken.
                </p>
                <div className="flex flex-col gap-3 relative">
                  <textarea 
                    className="w-full border border-slate-300 rounded-lg p-4 pr-16 focus:outline-none focus:ring-2 focus:ring-[#0C2340] resize-none text-slate-800 text-base shadow-inner leading-relaxed"
                    rows={4}
                    placeholder="e.g., A person sent ₹25,000 through UPI to someone for a product. The recipient took the money, blocked the buyer, and never delivered the product..."
                    value={problemText}
                    onChange={(e) => setProblemText(e.target.value)}
                  />
                  
                  {/* MIC BUTTON INJECTED INTO TEXTAREA */}
                  <button 
                    onClick={startListening}
                    className={`absolute right-3 top-3 p-3 rounded-full transition shadow-sm ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    title="Speak your problem in Hindi/English"
                  >
                    <Mic className="h-5 w-5" />
                  </button>

                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-slate-400 font-medium">
                      🔒 Zero-Retention Privacy: Sensitive complaint text is processed securely.
                    </span>
                    <button 
                      onClick={() => handleAnalyze()}
                      disabled={loading || !problemText.trim()}
                      className="bg-[#0C2340] text-white px-7 py-3 rounded-lg font-bold hover:bg-slate-900 transition flex items-center gap-2 shadow-md disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                      {loading ? "Verifying Laws..." : "Analyze Legal Issue"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // GUIDED EXAMPLES UI
              <div className="animate-in fade-in duration-300">
                <p className="text-sm text-slate-600 font-medium mb-4">Click an example scenario to test the verified statutory matching pipeline:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {guidedCategories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setProblemText(cat.prompt);
                        handleAnalyze(cat.prompt);
                      }}
                      className="flex flex-col items-start p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-[#0C2340] hover:bg-slate-100 transition text-left"
                    >
                      <div className="flex items-center gap-2 font-bold text-slate-900 text-sm mb-1">
                        {cat.icon}
                        <span>{cat.title}</span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-2">{cat.prompt}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DYNAMIC VERIFIED STATUTORY REPORT */}
          {result && (
            <div className="bg-white rounded-xl border-2 border-[#0C2340]/40 shadow-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Header Bar */}
              <div className="bg-[#0C2340] text-white p-5 flex flex-wrap items-center justify-between gap-3 border-b-4 border-[#D4AF37]">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-7 w-7 text-emerald-400 shrink-0" />
                  <div>
                    <h3 className="text-lg font-black tracking-tight flex items-center gap-2">
                      Official AI Legal Empowerment & Statutory Triage Report
                    </h3>
                    {result.detected_category && (
                      <p className="text-xs text-amber-300 font-semibold mt-0.5">
                        Domain: {result.detected_category}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="bg-emerald-950/80 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40 font-mono text-[11px] font-bold">
                    ✓ Grounded in India Code
                  </span>
                  <span className="bg-white/10 text-slate-200 px-3 py-1 rounded-full border border-white/20 font-mono">
                    {result.detected_language}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                
                {/* 1. Emergency Safety Banner (If Active Threat) */}
                {result.status === 'emergency_safety' && (
                  <div className="bg-red-50 border-2 border-red-500 rounded-xl p-4 flex items-start gap-3 animate-pulse">
                    <ShieldAlert className="h-7 w-7 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-black text-red-900 uppercase tracking-wide">
                        🚨 IMMEDIATE ACTION REQUIRED: Threat to Personal Safety
                      </h4>
                      <p className="text-xs text-red-800 mt-1 leading-relaxed font-bold">
                        Do NOT confront an armed intruder or wait for court filings. Lock doors, move to a secure room, and Dial 112 immediately.
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. Critical Safety / Anti-Scam Guidance */}
                {result.urgent_safety_guidance && result.urgent_safety_guidance.length > 0 && (
                  <div className="bg-amber-50 border border-amber-300 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Lock className="h-4 w-4 text-amber-600" />
                      Critical Security & Scam-Prevention Warnings
                    </h4>
                    <ul className="space-y-1.5">
                      {result.urgent_safety_guidance.map((tip, sIdx) => (
                        <li key={sIdx} className="text-xs text-amber-950 flex items-start gap-2">
                          <span className="text-amber-600 font-bold">•</span>
                          <span className="font-medium">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 3. Actionable Legal Advice Box */}
                {result.actionable_advice && (
                  <div className="bg-blue-50/90 border border-blue-200 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-blue-600" />
                      Immediate Actionable Legal Advice
                    </h4>
                    <p className="text-xs text-slate-800 leading-relaxed font-medium whitespace-pre-line">
                      {result.actionable_advice}
                    </p>
                  </div>
                )}

                {/* 4. Factual Grounding: Supporting Facts vs Missing Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Supporting Facts */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-emerald-600" />
                      Facts Identified from Your Input
                    </h5>
                    {result.supporting_facts && result.supporting_facts.length > 0 ? (
                      <ul className="space-y-1">
                        {result.supporting_facts.map((fact, idx) => (
                          <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{fact}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-500 italic">No specific facts confirmed.</p>
                    )}
                  </div>

                  {/* Missing Facts / Conditions */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Info className="h-4 w-4 text-amber-600" />
                      Missing Information & Legal Conditions
                    </h5>
                    {result.missing_facts && result.missing_facts.length > 0 ? (
                      <ul className="space-y-1">
                        {result.missing_facts.map((mf, idx) => (
                          <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                            <span className="text-amber-500 font-bold">?</span>
                            <span>{mf}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-500 italic">All primary statutory prerequisites identified.</p>
                    )}
                  </div>
                </div>

                {/* 5. Applicable Statutes Grid (Ranked by Evidence Grounding) */}
                <div>
                  <div className="flex flex-wrap justify-between items-center mb-3.5 border-b pb-2">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                      <Scale className="h-4 w-4 text-[#0C2340]" />
                      Applicable Indian Statutes (BNS / BNSS / BSA / Special Acts)
                    </h4>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Categorized by Statutory Element Matching
                    </span>
                  </div>
                  
                  {result.recommended_sections && result.recommended_sections.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {result.recommended_sections.map((sec: LegalSectionDetail, idx: number) => {
                        const isFlagged = flaggedSections[sec.section_code];
                        return (
                          <div 
                            key={idx} 
                            className={`bg-white border rounded-xl p-4 transition shadow-xs flex flex-col justify-between ${
                              isFlagged ? 'border-amber-400 bg-amber-50/30' : 'border-slate-200 hover:border-[#0C2340]/40'
                            }`}
                          >
                            <div>
                              {/* Header Bar of Card */}
                              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                                <span className="bg-[#0C2340] text-white text-xs font-bold px-2.5 py-1 rounded-md font-mono">
                                  {sec.section_code}
                                </span>
                                {getApplicabilityBadge(sec.applicability_status)}
                              </div>

                              <div className="mb-2">
                                {getCategoryBadge(sec.statutory_category)}
                              </div>

                              <h5 className="font-bold text-sm text-slate-900 mb-1.5 leading-snug">
                                {sec.title}
                              </h5>
                              
                              {/* Relevance Explanation */}
                              {sec.relevance_explanation && (
                                <p className="text-xs text-slate-700 bg-blue-50/50 p-2.5 rounded-lg border border-blue-100 leading-relaxed mb-2.5 font-medium">
                                  <span className="font-bold text-blue-900">Why this applies: </span>
                                  {sec.relevance_explanation}
                                </p>
                              )}

                              {/* Plain Language Explanation */}
                              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-100 leading-relaxed mb-3">
                                {sec.simplified_explanation}
                              </p>

                              {/* Legal Elements */}
                              {sec.legal_elements && sec.legal_elements.length > 0 && (
                                <div className="mb-3">
                                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Essential Statutory Elements:</p>
                                  <ul className="space-y-0.5">
                                    {sec.legal_elements.map((el, elIdx) => (
                                      <li key={elIdx} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                                        <span className="text-slate-400">•</span>
                                        <span>{el}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              {/* Exceptions or Conditions */}
                              {sec.exceptions_or_conditions && (
                                <p className="text-[11px] text-amber-800 bg-amber-50/60 p-2 rounded border border-amber-200 mb-3">
                                  <span className="font-bold">Conditions: </span>{sec.exceptions_or_conditions}
                                </p>
                              )}
                            </div>

                            {/* Card Footer: Verified Source Link & Statutory Badges */}
                            <div className="pt-3 border-t border-slate-100 space-y-2.5">
                              <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-bold">
                                <div className="flex items-center gap-1.5">
                                  {sec.bailable !== undefined && (
                                    <span className={`px-2 py-0.5 rounded-full ${sec.bailable ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                      {sec.bailable ? 'Bailable' : 'Non-Bailable'}
                                    </span>
                                  )}
                                  {sec.cognizable !== undefined && (
                                    <span className={`px-2 py-0.5 rounded-full ${sec.cognizable ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'}`}>
                                      {sec.cognizable ? 'Cognizable' : 'Non-Cognizable'}
                                    </span>
                                  )}
                                  {sec.max_punishment && (
                                    <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                                      {sec.max_punishment}
                                    </span>
                                  )}
                                </div>

                                <button
                                  onClick={() => toggleFlagSection(sec.section_code)}
                                  className={`flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded transition ${
                                    isFlagged 
                                      ? 'bg-amber-100 text-amber-800 font-bold' 
                                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                                  }`}
                                  title="Flag provision if you believe it is inapplicable to your facts"
                                >
                                  <Flag className="h-3 w-3" />
                                  {isFlagged ? "Flagged for Review" : "Flag Law"}
                                </button>
                              </div>

                              {/* Official Source Link */}
                              {sec.official_source_url && (
                                <a 
                                  href={sec.official_source_url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between text-[11px] text-blue-600 hover:text-blue-800 bg-blue-50/50 hover:bg-blue-100/60 p-2 rounded-lg border border-blue-200 transition"
                                >
                                  <span className="font-semibold flex items-center gap-1">
                                    <ExternalLink className="h-3.5 w-3.5" />
                                    Official Source: India Code
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-normal">Ministry of Law & Justice</span>
                                </a>
                              )}
                            </div>

                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-center">
                      <Info className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                      <p className="text-sm font-bold text-slate-800">No Specific Penal Sections Inferred</p>
                      <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                        Because essential facts are missing or the dispute lacks actionable legal grounds, our system transparently avoids inventing criminal provisions.
                      </p>
                    </div>
                  )}
                </div>

                {/* 6. Procedural Checklist (What to do next) */}
                {result.procedural_actions && result.procedural_actions.length > 0 ? (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Verified Procedural Checklist (What to do next)
                    </h4>
                    <div className="space-y-2.5">
                      {result.procedural_actions.map((pa: ProceduralAction, sIdx: number) => (
                        <div key={sIdx} className="bg-white border border-slate-200 rounded-lg p-3 text-xs text-slate-800 shadow-xs">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="h-5 w-5 rounded-full bg-[#0C2340] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                                {pa.step_number || sIdx + 1}
                              </span>
                              {getActionTypeBadge(pa.action_type)}
                            </div>
                            {pa.statutory_deadline && (
                              <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                                ⏱ Deadline: {pa.statutory_deadline}
                              </span>
                            )}
                          </div>
                          <p className="leading-relaxed pl-7 font-medium text-slate-800">{pa.action}</p>
                          {pa.authority_or_portal && (
                            <p className="text-[11px] text-slate-500 pl-7 mt-1">
                              <span className="font-semibold text-slate-700">Authority:</span> {pa.authority_or_portal}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ) : result.procedural_steps && result.procedural_steps.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Statutory Procedural Checklist
                    </h4>
                    <div className="space-y-2">
                      {result.procedural_steps.map((step: string, sIdx: number) => (
                        <div key={sIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                          <span className="h-5 w-5 rounded-full bg-[#0C2340] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                            {sIdx + 1}
                          </span>
                          <span className="leading-snug pt-0.5">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. Official Government Portals & Grievance Channels */}
                {result.official_portals && result.official_portals.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <ExternalLink className="h-4 w-4 text-[#0C2340]" />
                      Official Government Complaint Portals & Hotlines
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {result.official_portals.map((portal: OfficialPortal, pIdx: number) => (
                        <a
                          key={pIdx}
                          href={portal.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white border border-slate-200 hover:border-[#0C2340] rounded-xl p-3.5 transition flex flex-col justify-between group shadow-xs"
                        >
                          <div>
                            <div className="flex justify-between items-start gap-2 mb-1">
                              <h5 className="font-bold text-xs text-slate-900 group-hover:text-blue-700 transition">
                                {portal.name}
                              </h5>
                              <ArrowUpRight className="h-4 w-4 text-slate-400 group-hover:text-blue-700 shrink-0" />
                            </div>
                            <p className="text-[11px] text-slate-500 leading-snug mb-2">
                              {portal.description}
                            </p>
                          </div>
                          {portal.phone && (
                            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded w-fit border border-emerald-200">
                              <PhoneCall className="h-3 w-3" />
                              <span>Helpline: {portal.phone}</span>
                            </div>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8. Risk Assessment Bar */}
                {result.risk_assessment && (
                  <div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                      
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center gap-3">
                        <Clock className="h-7 w-7 text-slate-500 shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Estimated Trial Duration</p>
                          <p className="text-base font-black text-slate-900">{result.risk_assessment.estimated_duration_months} Months</p>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 flex items-center gap-3">
                        <Scale className="h-7 w-7 text-[#0C2340] shrink-0" />
                        <div>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Bail / Dispute Status</p>
                          <p className="text-xs font-black text-slate-900 leading-tight">
                            {result.risk_assessment.bail_status || 'Subject to Judicial Discretion'}
                          </p>
                        </div>
                      </div>

                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-3">
                        <HeartHandshake className="h-7 w-7 text-emerald-600 shrink-0" />
                        <div>
                          <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider">NALSA Legal Aid Status</p>
                          <p className="text-xs font-black text-emerald-900">
                            {result.risk_assessment.eligible_for_nalsa_free_aid ? 'Approved (Free State Legal Aid)' : 'Paid / Private Counsel'}
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 9. Statutory Responsible AI Disclaimer */}
                <div className="bg-slate-100/70 border border-slate-200 rounded-lg p-3 text-[11px] text-slate-500 leading-relaxed">
                  <span className="font-bold text-slate-700">Informational Disclaimer:</span> This analysis is provided for legal empowerment and educational guidance based on official Central and State Indian statutes. It does not establish an advocate-client relationship. If you require representation in a Court of Law or police station, please consult an advocate empanelled with the Bar Council of India or approach the District Legal Services Authority (DLSA).
                </div>

              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Permanent Sidebar Widgets */}
        <div className="space-y-6">
          
          {/* Permanent SOS Help Card */}
          <div className="bg-gradient-to-br from-red-600 to-red-700 p-6 rounded-xl border border-red-800 shadow-md text-white text-center flex flex-col items-center group hover:shadow-lg transition">
            <div className="bg-white/20 p-4 rounded-full mb-4 group-hover:scale-110 transition">
              <PhoneCall className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Emergency Legal Help</h3>
            <p className="text-sm text-red-100 mb-4 font-medium">
              If you are in immediate danger or cannot use the app, call the National Legal Aid SOS Helpline.
            </p>
            <div className="bg-white text-red-700 w-full py-3 rounded-lg font-extrabold text-2xl tracking-widest shadow-inner">
              15100
            </div>
            <p className="text-xs text-red-200 mt-3 font-medium">Toll-Free • 24/7 • All India</p>
          </div>

          {/* Quick Cybercrime Emergency Card */}
          <div className="bg-gradient-to-br from-slate-900 to-[#0C2340] p-5 rounded-xl border border-slate-800 text-white shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Lock className="h-5 w-5 text-amber-400" />
              <h4 className="text-sm font-bold">UPI / Cyber Fraud Helpline</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Lost money via UPI, NetBanking, or QR code scam? Report within the first 2 hours to freeze recipient accounts.
            </p>
            <div className="flex items-center justify-between bg-white/10 p-2.5 rounded-lg border border-white/20">
              <span className="text-xs font-mono font-bold text-amber-300">Dial 1930</span>
              <a 
                href="https://cybercrime.gov.in/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-white hover:text-amber-300 flex items-center gap-1 font-semibold"
              >
                cybercrime.gov.in <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {!result && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                Verified Legal Guarantee
              </h3>
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Statutory provisions matched to official India Code legislation.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>No fabricated percentages or unverified deadlines.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Immediate Golden Hour reporting guidance for online financial fraud.</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
