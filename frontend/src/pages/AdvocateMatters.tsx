import React, { useState } from 'react';
import { Briefcase, Search, Filter, Calendar, MapPin, Gavel, User, FileText, Plus, ChevronRight, CheckCircle2, Clock, AlertTriangle, ShieldCheck, X, Scale } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CaseMatter {
  id: string;
  cnr: string;
  caseNo: string;
  parties: string;
  court: string;
  judge: string;
  sections: string;
  stage: string;
  category: 'Criminal' | 'Civil' | 'Bail' | 'Commercial';
  ndoh: string; // Next Date of Hearing
  purpose: string;
  clientType: 'Private' | 'NALSA Pro-Bono';
  notes: string[];
}

export const AdvocateMatters = () => {
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCase, setSelectedCase] = useState<CaseMatter | null>(null);
  const [newNote, setNewNote] = useState('');

  const [matters, setMatters] = useState<CaseMatter[]>([
    {
      id: "mat-1",
      cnr: "DLCT02-004312-2025",
      caseNo: "CC/4312/2025",
      parties: "State (Govt of NCT) vs. Vikram Malhotra & Ors.",
      court: "Courtroom 14, Tis Hazari District Courts, Delhi",
      judge: "Sh. A.K. Pathak, Ld. ACMM",
      sections: "Sec 115(2), 351(2) BNS 2023 (Voluntarily Causing Hurt & Intimidation)",
      stage: "Prosecution Evidence (PE)",
      category: "Criminal",
      ndoh: "08 Nov 2026",
      purpose: "Cross-examination of Investigating Officer (PW-1)",
      clientType: "Private",
      notes: [
        "IO failed to seize CCTV under Sec 105 BNSS videography rules. Prepare contradiction questions.",
        "Accused has clean antecedents; furnish medical MLC showing superficial abrasions only."
      ]
    },
    {
      id: "mat-2",
      cnr: "DLSW01-009182-2026",
      caseNo: "BA/9182/2026",
      parties: "Rahul Verma vs. State (PS Dwarka South)",
      court: "Courtroom 4, Dwarka District Courts, New Delhi",
      judge: "Ms. Sunita Rao, Ld. Sessions Judge",
      sections: "Sec 74 BNS 2023 (Assault to outrage modesty)",
      stage: "Bail Arguments",
      category: "Bail",
      ndoh: "06 Oct 2026",
      purpose: "Arguments on Regular Bail under Sec 483 BNSS",
      clientType: "NALSA Pro-Bono",
      notes: [
        "NALSA legal aid assigned. Income affidavit filed under Art 39A.",
        "Notice under Sec 35 BNSS was not given before coercive detention."
      ]
    },
    {
      id: "mat-3",
      cnr: "DLHC01-012903-2026",
      caseNo: "CS(OS)/1290/2026",
      parties: "M/s Apex Logistics Pvt Ltd vs. Horizon Retail Corp",
      court: "Courtroom 32, High Court of Delhi",
      judge: "Hon'ble Mr. Justice R.K. Gauba",
      sections: "Commercial Courts Act & Sec 138 NI Act",
      stage: "Framing of Issues",
      category: "Commercial",
      ndoh: "14 Nov 2026",
      purpose: "Admission / Denial of Electronic Invoices and Bank Ledgers",
      clientType: "Private",
      notes: [
        "Certificate under Section 63 BSA 2023 filed in support of ledger printouts."
      ]
    },
    {
      id: "mat-4",
      cnr: "DLSE02-003841-2026",
      caseNo: "RCA/384/2026",
      parties: "Anita Devi vs. Rameshwar Dayal & Ors.",
      court: "Courtroom 7, Saket District Courts, Delhi",
      judge: "Sh. M.P. Singh, Ld. Senior Civil Judge",
      sections: "Sec 38 Specific Relief Act (Permanent Injunction)",
      stage: "Final Arguments",
      category: "Civil",
      ndoh: "22 Oct 2026",
      purpose: "Final Arguments on Application under Order XXXIX Rule 1 & 2 CPC",
      clientType: "Private",
      notes: [
        "Interim status quo granted on 12 Sep 2026. Local commissioner report is favorable."
      ]
    }
  ]);

  const filteredMatters = matters.filter(m => {
    const matchesFilter = selectedFilter === 'All' || m.category === selectedFilter || (selectedFilter === 'Pro-Bono' && m.clientType.includes('NALSA'));
    const matchesSearch = m.parties.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.caseNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.sections.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedCase) return;

    setMatters(prev => prev.map(m => {
      if (m.id === selectedCase.id) {
        return { ...m, notes: [newNote, ...m.notes] };
      }
      return m;
    }));

    setSelectedCase(prev => prev ? { ...prev, notes: [newNote, ...prev.notes] } : null);
    setNewNote('');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
              Case Briefs Repository
            </span>
            <span className="text-xs text-slate-400">• Total Active: {matters.length}</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1a2a40] tracking-tight">Active Client Matters</h1>
          <p className="text-slate-500 text-sm mt-0.5 font-medium">Digital case dossiers, stage tracking, and hearing logs.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/tools')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2.5 rounded-xl shadow-sm transition flex items-center gap-2"
          >
            <Gavel className="h-4 w-4" /> Open AI Legal Tools
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {['All', 'Criminal', 'Bail', 'Civil', 'Commercial', 'Pro-Bono'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedFilter(tab)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedFilter === tab 
                  ? 'bg-[#1a2a40] text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by party, case no, or sections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>
      </div>

      {/* Case Matters List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredMatters.map((matter) => (
          <div 
            key={matter.id} 
            className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 border-b border-slate-100 pb-4 mb-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {matter.cnr}
                  </span>
                  <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {matter.caseNo}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                    matter.clientType.includes('NALSA') ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {matter.clientType}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition">
                  {matter.parties}
                </h3>
              </div>

              {/* NDOH Badge */}
              <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-2 text-left lg:text-right shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-orange-700 block">Next Hearing Date (NDOH)</span>
                <span className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5 lg:justify-end mt-0.5">
                  <Calendar className="h-4 w-4 text-orange-600" /> {matter.ndoh}
                </span>
              </div>
            </div>

            {/* Matter Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-medium text-slate-600">
              <div>
                <span className="text-slate-400 block mb-0.5">Court & Presiding Officer</span>
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-400 shrink-0" /> {matter.court}
                </p>
                <p className="text-slate-500 text-[11px] mt-0.5 pl-5">{matter.judge}</p>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Invoked Sections & Law</span>
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Scale className="h-3.5 w-3.5 text-blue-600 shrink-0" /> {matter.sections}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block mb-0.5">Current Stage & Purpose</span>
                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Gavel className="h-3.5 w-3.5 text-orange-600 shrink-0" /> {matter.stage}
                </p>
                <p className="text-slate-500 text-[11px] mt-0.5 pl-5">{matter.purpose}</p>
              </div>
            </div>

            {/* Card Actions */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap justify-between items-center gap-3">
              <span className="text-xs text-slate-400 font-medium">
                {matter.notes.length} internal brief notes recorded
              </span>
              <div className="flex gap-2">
                <button 
                  onClick={() => navigate('/tools')}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3 py-2 rounded-lg transition flex items-center gap-1.5"
                >
                  <FileText className="h-3.5 w-3.5" /> Launch AI Drafter
                </button>
                <button 
                  onClick={() => setSelectedCase(matter)}
                  className="bg-[#1a2a40] hover:bg-slate-800 text-white text-xs font-bold px-4 py-2 rounded-lg transition flex items-center gap-1.5 shadow-xs"
                >
                  View Full Dossier <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CASE DOSSIER MODAL */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
                  {selectedCase.cnr}
                </span>
                <h3 className="font-bold text-slate-900 text-lg mt-1.5">{selectedCase.parties}</h3>
                <p className="text-xs text-slate-500">{selectedCase.caseNo} • {selectedCase.court}</p>
              </div>
              <button 
                onClick={() => setSelectedCase(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-5 mt-5">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block">Next Date of Hearing</span>
                  <p className="font-extrabold text-slate-800 text-sm mt-0.5">{selectedCase.ndoh}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block">Proceedings Purpose</span>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedCase.purpose}</p>
                </div>
              </div>

              {/* Case Strategy Notes */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-blue-600" /> Case Diary & Legal Strategy Notes
                </h4>
                
                <div className="space-y-2 mb-3">
                  {selectedCase.notes.map((note, index) => (
                    <div key={index} className="bg-amber-50/60 border border-amber-200 p-3 rounded-lg text-xs text-amber-950 font-medium">
                      • {note}
                    </div>
                  ))}
                </div>

                <form onSubmit={handleAddNote} className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="Add tactical defense note or precedent reference..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                  <button 
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-3.5 py-2 rounded-lg transition"
                  >
                    Add Note
                  </button>
                </form>
              </div>

              {/* Statutory Compliance Checklist */}
              <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl">
                <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-blue-600" /> Statutory Filings Checklist
                </h4>
                <div className="space-y-1.5 text-xs text-blue-900">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Vakalatnama attested with Bar Council Welfare Fund Stamp
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Advance Service of Copy to Public Prosecutor / Opposing Counsel
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" /> Certified Copy of Impugned Order / FIR attached
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  onClick={() => setSelectedCase(null)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-50"
                >
                  Close Dossier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
