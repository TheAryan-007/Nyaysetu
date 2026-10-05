import React, { useState } from 'react';
import { Search, AlertCircle, Clock, Scale, ArrowRight, Activity, ShieldCheck, HeartHandshake, Loader2, Mic, PhoneCall, HelpCircle, Home, Users, Banknote, ShieldAlert } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const CitizenDashboard = () => {
  const [problemText, setProblemText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  // New States for Advanced Features
  const [isListening, setIsListening] = useState(false);
  const [showGuidedUI, setShowGuidedUI] = useState(false);

  // FEATURE 1: Web Speech API (Voice to Text in Hindi/English)
  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser. Please use Google Chrome.");
      return;
    }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'hi-IN'; // Prioritize Hindi for social impact

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
      const res = await axios.post(`${API_BASE_URL}/api/v1/analyze-problem`, {
        text: textToAnalyze,
        language: "auto"
      });
      setResult(res.data);
    } catch (error) {
      console.error("Error analyzing problem:", error);
      alert("Error connecting to the AI backend.");
    } finally {
      setLoading(false);
    }
  };

  // FEATURE 2: Guided Visual Categories
  const guidedCategories = [
    { title: "Property & Land", icon: <Home className="h-8 w-8 mb-2" />, prompt: "Someone is trying to illegally occupy my land or property." },
    { title: "Domestic Abuse / Dowry", icon: <Users className="h-8 w-8 mb-2" />, prompt: "My in-laws and husband are harassing me for dowry." },
    { title: "Financial Fraud", icon: <Banknote className="h-8 w-8 mb-2" />, prompt: "Someone ran a scam and cheated me out of my money." },
    { title: "Physical Threat", icon: <ShieldAlert className="h-8 w-8 mb-2" />, prompt: "Someone pulled a weapon and is threatening to hurt me." }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main Input Area */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm transition-all duration-300">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-[#1a2a40] flex items-center gap-2 tracking-tight">
                <Scale className="h-6 w-6 text-orange-500" /> 
                Apni Problem Batayein (AI Legal Assistant)
              </h2>
              <button 
                onClick={() => setShowGuidedUI(!showGuidedUI)}
                className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-full transition"
              >
                <HelpCircle className="h-4 w-4" /> 
                {showGuidedUI ? "Switch to Text Box" : "Need Help Explaining?"}
              </button>
            </div>

            {!showGuidedUI ? (
              <>
                <p className="text-sm text-slate-500 mb-5 font-medium">
                  Type your problem, or click the Microphone to speak in Hindi/English.
                </p>
                <div className="flex flex-col gap-3 relative">
                  <textarea 
                    className="w-full border border-slate-300 rounded-lg p-4 pr-16 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none text-slate-800 text-lg shadow-inner"
                    rows={3}
                    placeholder="e.g., Mera padosi mujhe dhamki de raha hai..."
                    value={problemText}
                    onChange={(e) => setProblemText(e.target.value)}
                  />
                  
                  {/* MIC BUTTON INJECTED INTO TEXTAREA */}
                  <button 
                    onClick={startListening}
                    className={`absolute right-3 top-3 p-3 rounded-full transition shadow-sm ${isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    title="Speak your problem"
                  >
                    <Mic className="h-5 w-5" />
                  </button>

                  <div className="flex justify-end mt-2">
                    <button 
                      onClick={() => handleAnalyze()}
                      disabled={loading || !problemText.trim()}
                      className="bg-[#1a2a40] text-white px-8 py-3 rounded-lg font-bold hover:bg-slate-800 transition flex items-center gap-2 shadow-md disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                      {loading ? "Analyzing..." : "Analyze My Problem"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              // FEATURE 2: THE GUIDED UI
              <div className="animate-in fade-in duration-300">
                <p className="text-sm text-slate-600 font-medium mb-4">Select the category that best matches your problem. Our AI will automatically generate the legal context.</p>
                <div className="grid grid-cols-2 gap-4">
                  {guidedCategories.map((cat, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setProblemText(cat.prompt);
                        handleAnalyze(cat.prompt);
                      }}
                      className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-200 rounded-xl hover:border-orange-500 hover:bg-orange-50 transition text-slate-700 hover:text-orange-700"
                    >
                      {cat.icon}
                      <span className="font-bold">{cat.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* DYNAMIC RESULTS */}
          {result && (
            <div className="bg-white rounded-xl border-2 border-orange-200 shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-orange-50 border-b border-orange-200 p-5 flex items-center justify-between">
                <h3 className="text-xl font-bold text-orange-800 flex items-center gap-2">
                  <ShieldCheck className="h-6 w-6" />
                  Official AI Legal Empowerment Report
                </h3>
                <span className="text-sm font-bold bg-white text-orange-600 px-3 py-1 rounded-full border border-orange-200">
                  Detected: {result.detected_language}
                </span>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 border-b pb-2">Applicable Laws</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.recommended_sections.map((sec: any, idx: number) => (
                      <div key={idx} className="bg-white border border-slate-200 rounded-lg p-4 hover:border-blue-300">
                        <div className="flex justify-between items-start mb-2">
                          <span className="bg-[#1a2a40] text-white text-xs font-bold px-2 py-1 rounded">{sec.section_code}</span>
                          <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200">
                            {Math.round(sec.confidence_score * 100)}% Match
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-800 mb-1">{sec.title}</h5>
                        <p className="text-xs text-slate-600 bg-slate-50 p-2 rounded">{sec.simplified_explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center gap-4">
                      <Clock className="h-8 w-8 text-slate-400" />
                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase">Court Duration</p>
                        <p className="text-lg font-extrabold text-slate-800">{result.risk_assessment.estimated_duration_months} Months</p>
                      </div>
                    </div>
                    
                    {result.risk_assessment.eligible_for_nalsa_free_aid ? (
                      <div className="flex-[2] bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-4">
                        <HeartHandshake className="h-8 w-8 text-green-600" />
                        <div>
                          <p className="text-xs text-green-700 font-bold uppercase tracking-wider">NALSA Legal Aid Approved</p>
                          <p className="text-md font-bold text-green-800">Est. Cost: {result.risk_assessment.estimated_cost_inr}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-[2] bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-4">
                        <Activity className="h-8 w-8 text-red-600" />
                        <div>
                          <p className="text-xs text-red-700 font-bold uppercase tracking-wider">Financial Risk Level</p>
                          <p className="text-md font-bold text-red-800">{result.risk_assessment.financial_risk_level}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Permanent Sidebar Widgets */}
        <div className="space-y-6">
          
          {/* FEATURE 3: Permanent SOS Help Card */}
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

          {!result && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">Your Dashboard</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Saved Precedents</span>
                  <span className="bg-slate-100 px-2 py-1 rounded font-bold">8</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-500 font-medium">Active Consultations</span>
                  <span className="bg-orange-50 text-orange-600 border border-orange-200 px-2 py-1 rounded font-bold">1</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
