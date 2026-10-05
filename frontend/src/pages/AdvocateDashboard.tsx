import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  Clock, 
  ArrowRight, 
  Gavel, 
  FileText, 
  CheckCircle2, 
  Sparkles, 
  Calendar, 
  AlertCircle, 
  ShieldCheck, 
  Check, 
  X, 
  MapPin, 
  FileSignature, 
  ShieldAlert, 
  Scale 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdvocateDashboard = () => {
  const navigate = useNavigate();

  // Incoming Requests State with live accept/decline actions
  const [requests, setRequests] = useState([
    {
      id: "req-1",
      name: "Rahul Verma",
      issue: "Workplace Harassment (Sec 74 BNS / 354 IPC)",
      type: "NALSA Pro-Bono Legal Aid",
      time: "2 hours ago",
      location: "Dwarka Sector 12, Delhi",
      facts: "Complainant was physically touched by senior manager in office premises. HR refused action."
    },
    {
      id: "req-2",
      name: "Anita Devi",
      issue: "Property Encroachment (Sec 329 BNS / 441 IPC)",
      type: "Private Client",
      time: "5 hours ago",
      location: "Pitampura, North-West Delhi",
      facts: "Neighbor demolished shared boundary wall and threatened with assault."
    },
    {
      id: "req-3",
      name: "Manish Aggarwal",
      issue: "Cheque Bounce (Sec 138 NI Act - ₹4,50,000)",
      type: "Private Client",
      time: "1 day ago",
      location: "Connaught Place, Central Delhi",
      facts: "Commercial invoice unpaid, memo received from HDFC Bank with remarks 'Funds Insufficient'."
    }
  ]);

  const [toastMsg, setToastMsg] = useState("");

  const handleAcceptRequest = (id: string, name: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    setToastMsg(`Case for ${name} accepted! Brief added to 'My Matters'.`);
    setTimeout(() => setToastMsg(""), 4000);
  };

  const handleDeclineRequest = (id: string, name: string) => {
    setRequests(prev => prev.filter(r => r.id !== id));
    setToastMsg(`Declined consultation for ${name}.`);
    setTimeout(() => setToastMsg(""), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Toast Alert */}
      {toastMsg && (
        <div className="bg-slate-900 text-white px-5 py-3 rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-top-4 duration-300 border border-slate-700">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            <p className="font-bold text-xs">{toastMsg}</p>
          </div>
          <button onClick={() => setToastMsg("")} className="text-slate-400 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Advocate Banner */}
      <div className="bg-gradient-to-r from-[#1a2a40] via-slate-900 to-blue-950 rounded-2xl p-8 text-white shadow-lg flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Bar Council of Delhi • D/1482/2012
            </span>
            <span className="bg-blue-500/20 text-blue-200 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-400/30">
              NALSA Empaneled Advocate
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Advocate Rajesh Sharma</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl font-medium">
            Trial & Appellate Litigation Chambers • Tis Hazari, Dwarka & High Court of Delhi
          </p>
        </div>
        <div className="hidden md:flex bg-white/10 p-5 rounded-2xl items-center justify-center border border-white/10">
          <Gavel className="h-10 w-10 text-orange-400" />
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="bg-blue-50 p-3 rounded-lg"><Briefcase className="h-6 w-6 text-blue-600" /></div>
          <div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Active Briefs</p><p className="text-2xl font-black text-slate-800">14</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="bg-orange-50 p-3 rounded-lg"><Users className="h-6 w-6 text-orange-600" /></div>
          <div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Pending Inquiries</p><p className="text-2xl font-black text-slate-800">{requests.length}</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="bg-emerald-50 p-3 rounded-lg"><CheckCircle2 className="h-6 w-6 text-emerald-600" /></div>
          <div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Pro-Bono Hours</p><p className="text-2xl font-black text-slate-800">128h</p></div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
          <div className="bg-purple-50 p-3 rounded-lg"><Clock className="h-6 w-6 text-purple-600" /></div>
          <div><p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Today's Cause List</p><p className="text-2xl font-black text-slate-800">3 Cases</p></div>
        </div>
      </div>

      {/* AI SUITE QUICK LAUNCHBAR */}
      <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-orange-100/60 border border-orange-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-orange-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">New Capability</span>
          <h3 className="text-lg font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-orange-600" /> Gemini-Powered AI Legal Suite
          </h3>
          <p className="text-xs text-slate-600 font-medium">Auto-draft court pleadings, audit FIR procedural loopholes, and build cross-examination blueprints.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => navigate('/tools')} 
            className="bg-white hover:bg-slate-50 border border-orange-300 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-lg transition shadow-xs flex items-center gap-1.5"
          >
            <FileSignature className="h-4 w-4 text-blue-600" /> AI Drafter
          </button>
          <button 
            onClick={() => navigate('/tools')} 
            className="bg-white hover:bg-slate-50 border border-orange-300 text-slate-800 text-xs font-bold px-3.5 py-2 rounded-lg transition shadow-xs flex items-center gap-1.5"
          >
            <ShieldAlert className="h-4 w-4 text-red-600" /> FIR Loophole Auditor
          </button>
          <button 
            onClick={() => navigate('/tools')} 
            className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-sm flex items-center gap-1.5"
          >
            <Scale className="h-4 w-4" /> Open Suite <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* TWO COLUMN GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN (2 Cols): Daily Cause List & Pending Inquiries */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* DAILY CAUSE LIST WIDGET */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" /> Today's Daily Cause List
                </h3>
                <p className="text-[11px] text-slate-400">Hearings listed for today across Delhi Courts</p>
              </div>
              <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">
                Today: 04 Oct 2026
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {[
                { item: "Item 14", time: "10:30 AM", court: "Courtroom 14, Tis Hazari", judge: "Sh. A.K. Pathak (ACMM)", matter: "State vs. Vikram Malhotra", purpose: "Prosecution Evidence", urgency: "High" },
                { item: "Item 28", time: "12:00 PM", court: "Courtroom 4, Dwarka", judge: "Ms. Sunita Rao (ASJ)", matter: "Rahul Verma vs. State", purpose: "Regular Bail Arguments", urgency: "Critical" },
                { item: "Item 42", time: "02:15 PM", court: "Courtroom 7, Saket", judge: "Sh. M.P. Singh (SCJ)", matter: "Anita Devi vs. Rameshwar", purpose: "Interim Injunction Hearing", urgency: "Medium" }
              ].map((cause, i) => (
                <div key={i} className="p-4 hover:bg-slate-50/80 transition flex items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-slate-100 text-slate-700 font-mono font-bold text-xs p-2 rounded-lg text-center shrink-0 min-w-16">
                      {cause.item}
                      <span className="block text-[10px] text-slate-400 font-sans font-normal">{cause.time}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{cause.matter}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{cause.court} • {cause.judge}</p>
                      <p className="text-[11px] font-bold text-blue-700 mt-1 flex items-center gap-1">
                        <Gavel className="h-3 w-3" /> Purpose: {cause.purpose}
                      </p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider shrink-0 ${
                    cause.urgency === 'Critical' ? 'bg-red-100 text-red-700 border border-red-200' :
                    cause.urgency === 'High' ? 'bg-orange-100 text-orange-700 border border-orange-200' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {cause.urgency}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* INCOMING CLIENT REQUESTS */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Users className="h-4 w-4 text-orange-600" /> Incoming Citizen Consultation Requests
                </h3>
                <p className="text-[11px] text-slate-400">Direct inquiries from NyayaSetu Citizen Portal & NALSA</p>
              </div>
              <span className="text-xs font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                {requests.length} Pending
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {requests.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  All incoming consultation inquiries have been addressed!
                </div>
              ) : (
                requests.map((req) => (
                  <div key={req.id} className="p-5 hover:bg-slate-50/80 transition space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-900">{req.name}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            req.type.includes('NALSA') ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {req.type}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                          <span>{req.time}</span> • <span>{req.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-3 rounded-lg text-xs">
                      <p className="font-bold text-slate-800 text-[11px] mb-1">{req.issue}</p>
                      <p className="text-slate-600 italic">"{req.facts}"</p>
                    </div>

                    <div className="flex justify-end gap-2 pt-1">
                      <button 
                        onClick={() => handleDeclineRequest(req.id, req.name)}
                        className="px-3 py-1.5 border border-slate-200 text-slate-600 hover:bg-slate-100 text-xs font-bold rounded-lg transition"
                      >
                        Decline
                      </button>
                      <button 
                        onClick={() => handleAcceptRequest(req.id, req.name)}
                        className="px-4 py-1.5 bg-[#1a2a40] hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition shadow-xs flex items-center gap-1.5"
                      >
                        <Check className="h-3.5 w-3.5" /> Accept Brief & Add to Matters
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN (1 Col): Limitation Clocks & Chambers Resources */}
        <div className="space-y-6">
          
          {/* STATUTORY LIMITATION CLOCK WIDGET */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Clock className="h-4 w-4 text-red-500" />
              <h3 className="font-bold text-slate-900 text-sm">Limitation Act Deadlines</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-tight">
              Statutory countdowns under Limitation Act 1963 and BNSS defaults.
            </p>

            <div className="space-y-3">
              <div className="bg-red-50/70 border border-red-200 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-red-900">Vikram Malhotra (Default Bail)</span>
                  <span className="text-[10px] font-bold bg-red-600 text-white px-1.5 py-0.5 rounded">
                    4 Days Left
                  </span>
                </div>
                <p className="text-[11px] text-red-800 mt-1">
                  60-day police investigation deadline expiring under Sec 187(3) BNSS.
                </p>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-amber-900">M/s Apex Logistics (WS Filing)</span>
                  <span className="text-[10px] font-bold bg-amber-600 text-white px-1.5 py-0.5 rounded">
                    11 Days Left
                  </span>
                </div>
                <p className="text-[11px] text-amber-800 mt-1">
                  30-day statutory period to file Written Statement under Order VIII Rule 1 CPC.
                </p>
              </div>

              <div className="bg-blue-50/70 border border-blue-200 p-3 rounded-lg">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold text-blue-900">Anita Devi (Certified Copy)</span>
                  <span className="text-[10px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded">
                    Ready
                  </span>
                </div>
                <p className="text-[11px] text-blue-800 mt-1">
                  Certified copy of site inspection report ready at Saket Registry.
                </p>
              </div>
            </div>
          </div>

          {/* CODE CONVERSION QUICK CHEAT-SHEET */}
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-6 rounded-xl text-white shadow-xs space-y-3">
            <h4 className="font-bold text-sm flex items-center gap-2 text-orange-400">
              <Scale className="h-4 w-4" /> 2024 New Law Transition
            </h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Quick reference for converting former IPC/CrPC provisions to BNS & BNSS:
            </p>
            <div className="space-y-1.5 text-xs font-mono text-slate-200">
              <div className="bg-white/10 p-2 rounded flex justify-between">
                <span>IPC 302 (Murder)</span>
                <span className="text-orange-400 font-bold">➜ BNS 103</span>
              </div>
              <div className="bg-white/10 p-2 rounded flex justify-between">
                <span>IPC 420 (Cheating)</span>
                <span className="text-orange-400 font-bold">➜ BNS 318(4)</span>
              </div>
              <div className="bg-white/10 p-2 rounded flex justify-between">
                <span>CrPC 439 (Bail)</span>
                <span className="text-orange-400 font-bold">➜ BNSS 483</span>
              </div>
              <div className="bg-white/10 p-2 rounded flex justify-between">
                <span>CrPC 482 (Quashing)</span>
                <span className="text-orange-400 font-bold">➜ BNSS 528</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
