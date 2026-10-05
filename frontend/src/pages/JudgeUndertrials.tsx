import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Clock, 
  CheckCircle2, 
  FileText, 
  AlertTriangle, 
  ArrowRight, 
  Building2, 
  Gavel, 
  Scale, 
  Search,
  Check,
  X
} from 'lucide-react';

interface InmateRecord {
  id: string;
  name: string;
  prison: string;
  caseNo: string;
  cnr: string;
  offense: string;
  maxSentenceYears: number;
  custodyDays: number;
  status: 'Critical Eligible' | 'Eligible (One-Third Cap)' | 'Monitoring';
  firstTimeOffender: boolean;
}

export const JudgeUndertrials = () => {
  const [search, setSearch] = useState('');
  const [successToast, setSuccessToast] = useState('');

  const [inmates, setInmates] = useState<InmateRecord[]>([
    {
      id: "inm-1",
      name: "Mohan Lal",
      prison: "Central Jail No. 4, Tihar, New Delhi",
      caseNo: "BA/2026/412",
      cnr: "DLSW01-009182-2026",
      offense: "Sec 303(2) BNS (Theft - Max 3 Years)",
      maxSentenceYears: 3,
      custodyDays: 580,
      status: "Critical Eligible",
      firstTimeOffender: true
    },
    {
      id: "inm-2",
      name: "Rameshwar Dayal",
      prison: "District Jail, Rohini, Delhi",
      caseNo: "CC/2025/891",
      cnr: "DLNW01-004312-2025",
      offense: "Sec 318(2) BNS (Cheating - Max 3 Years)",
      maxSentenceYears: 3,
      custodyDays: 410,
      status: "Critical Eligible",
      firstTimeOffender: true
    },
    {
      id: "inm-3",
      name: "Shyam Sundar",
      prison: "Mandoli Jail Complex, Delhi",
      caseNo: "SC/2025/319",
      cnr: "DLE01-002194-2025",
      offense: "Sec 115(2) BNS (Simple Hurt - Max 1 Year)",
      maxSentenceYears: 1,
      custodyDays: 140,
      status: "Eligible (One-Third Cap)",
      firstTimeOffender: true
    },
    {
      id: "inm-4",
      name: "Vikram Malhotra",
      prison: "Central Jail No. 1, Tihar",
      caseNo: "SC/2026/89",
      cnr: "DLCT02-004312-2025",
      offense: "Sec 70(1) BNS (Heinous Crime - Life Sentence)",
      maxSentenceYears: 20,
      custodyDays: 240,
      status: "Monitoring",
      firstTimeOffender: false
    }
  ]);

  const handleGrantBond = (name: string, id: string) => {
    setInmates(prev => prev.filter(i => i.id !== id));
    setSuccessToast(`Statutory Bail Order issued for ${name} under Section 479 BNSS! Transmitted to Jail Superintendent.`);
    setTimeout(() => setSuccessToast(''), 5000);
  };

  const filtered = inmates.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase()) || 
    i.caseNo.toLowerCase().includes(search.toLowerCase()) ||
    i.prison.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Toast Alert */}
      {successToast && (
        <div className="bg-emerald-600 text-white px-5 py-3.5 rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="h-5 w-5 text-emerald-200" />
            <p className="font-bold text-xs">{successToast}</p>
          </div>
          <button onClick={() => setSuccessToast('')} className="text-emerald-200 hover:text-white">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-indigo-950 rounded-2xl p-8 text-white shadow-xl flex justify-between items-center border border-red-900/40">
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="bg-red-500/20 text-red-300 text-xs font-mono font-bold px-3 py-0.5 rounded-full border border-red-500/30 flex items-center gap-1.5">
              <ShieldAlert className="h-3.5 w-3.5 text-red-400" /> Section 479 BNSS Jail De-congestion Monitor
            </span>
            <span className="text-xs text-slate-300 font-mono">Tihar & Mandoli Jail Live Telemetry</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Undertrial Prisoner Statutory Triage</h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl font-medium">
            Enforcing Parliament's statutory mandate under Section 479 of the Bharatiya Nagarik Suraksha Sanhita (BNSS, 2023) to release undertrials who have served 1/3rd or 1/2 of their sentence.
          </p>
        </div>
        <div className="hidden md:flex bg-red-400/10 p-5 rounded-2xl items-center justify-center border border-red-400/20">
          <Building2 className="h-10 w-10 text-red-400" />
        </div>
      </div>

      {/* PRISON STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Undertrials in Custody</span>
          <p className="text-3xl font-black text-slate-900 font-mono mt-1">142 Inmates</p>
          <span className="text-[11px] text-slate-500">Central District Jurisdiction</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Sec 479 Mandatory Releases</span>
          <p className="text-3xl font-black text-red-600 font-mono mt-1">{inmates.filter(i => i.status.includes('Eligible')).length} Due</p>
          <span className="text-[11px] text-red-700 font-bold">Passed Statutory Sentence Cap</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Bonds Granted This Month</span>
          <p className="text-3xl font-black text-emerald-600 font-mono mt-1">38 Prisoners</p>
          <span className="text-[11px] text-emerald-700 font-bold">Released on PR Bond</span>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Prison Occupancy Index</span>
          <p className="text-3xl font-black text-amber-600 font-mono mt-1">174%</p>
          <span className="text-[11px] text-amber-700 font-bold">Severe Overcrowding Alert</span>
        </div>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex justify-between items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search inmate name, prison, or case no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-red-500 focus:outline-none font-medium"
          />
        </div>
      </div>

      {/* INMATES LIST */}
      <div className="space-y-4">
        {filtered.map((inmate) => {
          const maxDays = inmate.maxSentenceYears * 365;
          const halfCapDays = maxDays / 2;
          const pctServed = Math.min(100, Math.round((inmate.custodyDays / maxDays) * 100));

          return (
            <div 
              key={inmate.id}
              className={`bg-white rounded-xl border p-6 shadow-xs transition ${
                inmate.status === 'Critical Eligible' ? 'border-red-300 ring-1 ring-red-200 bg-red-50/10' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {inmate.cnr}
                    </span>
                    <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {inmate.caseNo}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      inmate.status === 'Critical Eligible' ? 'bg-red-600 text-white font-black' :
                      inmate.status.includes('Eligible') ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {inmate.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{inmate.name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{inmate.prison}</p>
                </div>

                <div className="flex gap-2">
                  {inmate.status.includes('Eligible') ? (
                    <button
                      onClick={() => handleGrantBond(inmate.name, inmate.id)}
                      className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition shadow-xs flex items-center gap-1.5 active:scale-95"
                    >
                      <Gavel className="h-4 w-4" /> Issue Sec 479 Bail Order
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-2 rounded-lg">
                      Trial Ongoing
                    </span>
                  )}
                </div>
              </div>

              {/* Custody Duration Bar */}
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-medium">
                    Offense: <strong className="text-slate-800">{inmate.offense}</strong>
                  </span>
                  <span className="font-mono font-bold text-slate-800">
                    {inmate.custodyDays} Days in Jail / {halfCapDays} Days (50% Sentence Cap)
                  </span>
                </div>

                <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${
                      pctServed >= 50 ? 'bg-red-600' : pctServed >= 33 ? 'bg-amber-500' : 'bg-blue-600'
                    }`}
                    style={{ width: `${pctServed}%` }}
                  />
                </div>

                <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                  <span>0 Days</span>
                  <span className="font-bold text-amber-700">33.3% (First-Timer Release Cap)</span>
                  <span className="font-bold text-red-700">50% Mandatory Release Cap</span>
                  <span>100% Full Sentence</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
