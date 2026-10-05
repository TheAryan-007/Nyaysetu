import React from 'react';
import { 
  Gavel, 
  Scale, 
  Calendar, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  ShieldAlert, 
  Users, 
  BookOpen, 
  Sparkles,
  Building2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const JudgeOverview = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* JUDICIAL BENCH BANNER */}
      <div className="bg-[#090e1a] rounded-2xl p-8 text-white shadow-xl flex justify-between items-center border border-slate-800/90 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600" />
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="bg-amber-500/15 text-amber-300 text-[11px] font-mono font-bold px-3 py-0.5 rounded border border-amber-500/30 flex items-center gap-1.5 uppercase tracking-wider">
              <Scale className="h-3.5 w-3.5 text-amber-400" /> Delhi Higher Judicial Service (DHJS)
            </span>
            <span className="bg-emerald-500/15 text-emerald-300 text-[11px] font-mono font-bold px-2.5 py-0.5 rounded border border-emerald-500/30">
              Courtroom 14 • Session 2026-II
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Hon'ble Bench of Sh. Anand Vardhan
          </h1>
          <p className="text-stone-300 text-sm mt-1.5 max-w-2xl font-sans">
            Chambers of Additional Sessions Judge • Central District, Tis Hazari Court Complex
          </p>
        </div>
        <div className="hidden md:flex bg-amber-400/10 p-5 rounded-2xl items-center justify-center border border-amber-400/20 shadow-inner">
          <Gavel className="h-9 w-9 text-amber-400" />
        </div>
      </div>

      {/* BENCH METRICS ROW */}
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
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Reserved Judgments</span>
            <FileText className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-3xl font-black text-amber-600 font-mono mt-1">3 Orders</p>
          <span className="text-[11px] text-amber-700 font-bold">Pronouncements Due This Week</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sec 479 Bail Triggers</span>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </div>
          <p className="text-3xl font-black text-red-600 font-mono mt-1">2 Inmates</p>
          <span className="text-[11px] text-red-700 font-bold">Eligible for Statutory Personal Bond</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Disposal Clearance Rate</span>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </div>
          <p className="text-3xl font-black text-emerald-600 font-mono mt-1">94.8%</p>
          <span className="text-[11px] text-emerald-700 font-bold">Target met under National Grid</span>
        </div>
      </div>

      {/* QUICK WORKSPACE NAVIGATION TILES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tile 1: Smart Docket */}
        <div 
          onClick={() => navigate('/docket')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="bg-amber-50 p-3 rounded-xl w-fit text-amber-700 mb-4 group-hover:scale-110 transition">
              <Gavel className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-800 transition">
              Smart Cause List & Docket
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Launch the Operations Research AI Queue Optimizer to automatically prioritize violent crimes and urgent bail hearings over procedural paperwork.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-amber-700 group-hover:gap-2.5 transition-all">
            Open Cause List <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        {/* Tile 2: Sec 479 Undertrial Triage */}
        <div 
          onClick={() => navigate('/undertrials')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-red-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="bg-red-50 p-3 rounded-xl w-fit text-red-600 mb-4 group-hover:scale-110 transition">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-700 transition">
              Section 479 Undertrial Triage
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Automated prison de-congestion monitor. Identifies undertrial prisoners who have served half of their sentence and mandate release on personal bond.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-red-600 group-hover:gap-2.5 transition-all">
            Inspect Jail Inmates <ArrowRight className="h-4 w-4" />
          </div>
        </div>

        {/* Tile 3: Bench AI & Order Composer */}
        <div 
          onClick={() => navigate('/judge-tools')}
          className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-400 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="bg-indigo-50 p-3 rounded-xl w-fit text-indigo-600 mb-4 group-hover:scale-110 transition">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-800 transition">
              Bench AI & Order Sheet Composer
            </h3>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              Generate AI Bench Memorandums with Supreme Court precedents before taking the bench, and dictate formal court orders with standard High Court formatting.
            </p>
          </div>
          <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-indigo-600 group-hover:gap-2.5 transition-all">
            Open Judicial AI Suite <ArrowRight className="h-4 w-4" />
          </div>
        </div>

      </div>

      {/* CHAMBERS DIARY & RESERVED ORDERS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Reserved Judgments Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <FileText className="h-4 w-4 text-amber-600" /> Reserved Judgments for Pronouncement
              </h3>
              <p className="text-[11px] text-slate-400">Statutory 30-day pronouncement deadline tracking under CPC / BNSS</p>
            </div>
            <span className="text-xs font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded">
              3 Pending
            </span>
          </div>

          <div className="space-y-3">
            {[
              { caseNo: "SC/2025/119", parties: "State vs. Harish Chander & Ors.", nature: "Final Judgment on Charge (Sec 103 BNS)", reservedDate: "14 Sep 2026", deadline: "Today (04 Oct 2026)", status: "Draft Finalized" },
              { caseNo: "CS/2026/892", parties: "Apex Realty Ltd vs. Union of India", nature: "Order on Interim Injunction (Order 39 CPC)", reservedDate: "21 Sep 2026", deadline: "08 Oct 2026", status: "Under Review" },
              { caseNo: "BA/2026/301", parties: "Vikram Malhotra vs. State", nature: "Bail Order under Sec 483 BNSS", reservedDate: "29 Sep 2026", deadline: "06 Oct 2026", status: "Order Dictated" }
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-xs space-y-1 hover:border-slate-300 transition">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-slate-900">{item.parties}</span>
                  <span className="font-mono text-[10px] bg-white border px-1.5 py-0.5 rounded text-slate-600">{item.caseNo}</span>
                </div>
                <p className="text-[11px] text-slate-500">{item.nature}</p>
                <div className="flex justify-between items-center pt-1.5 border-t border-slate-200/60 mt-1">
                  <span className="text-[10px] text-slate-400">Reserved: {item.reservedDate}</span>
                  <span className="font-bold text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Deadline: {item.deadline}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Courtroom 14 Bench Schedule */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" /> Courtroom 14 Sitting Schedule
              </h3>
              <p className="text-[11px] text-slate-400">Bench calendar for Tuesday, 04 Oct 2026</p>
            </div>
            <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
              Active Sitting
            </span>
          </div>

          <div className="space-y-3">
            <div className="border-l-4 border-emerald-500 pl-3 py-1 bg-emerald-50/40 rounded-r-lg">
              <span className="text-[10px] font-mono font-bold text-emerald-800">10:30 AM - 11:30 AM</span>
              <p className="font-bold text-xs text-slate-900">Urgent Mentioning & Fresh Bail Applications</p>
              <p className="text-[11px] text-slate-500">First-call matters and Section 479 undertrial release pleas.</p>
            </div>

            <div className="border-l-4 border-indigo-500 pl-3 py-1 bg-indigo-50/40 rounded-r-lg">
              <span className="text-[10px] font-mono font-bold text-indigo-800">11:30 AM - 01:15 PM</span>
              <p className="font-bold text-xs text-slate-900">Prosecution Evidence & Doctor / Expert Cross-Examination</p>
              <p className="text-[11px] text-slate-500">State vs. Rakesh (PW-4 Forensic Doctor examination in Session trial).</p>
            </div>

            <div className="border-l-4 border-slate-300 pl-3 py-1 bg-slate-50 rounded-r-lg">
              <span className="text-[10px] font-mono font-bold text-slate-600">01:15 PM - 02:00 PM</span>
              <p className="font-bold text-xs text-slate-700">Lunch Recess & Chambers Conference</p>
            </div>

            <div className="border-l-4 border-amber-500 pl-3 py-1 bg-amber-50/40 rounded-r-lg">
              <span className="text-[10px] font-mono font-bold text-amber-800">02:00 PM - 04:30 PM</span>
              <p className="font-bold text-xs text-slate-900">Final Arguments, Pronouncements & Procedural Roll Call</p>
              <p className="text-[11px] text-slate-500">Pronouncement of reserved orders and written statements in civil dockets.</p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
