import React, { useState } from 'react';
import { CheckCircle2, Clock, FileText, Gavel, Scale, AlertCircle, Building2, UploadCloud, X, Check, ShieldCheck, Eye, Trash2, FileCheck } from 'lucide-react';

interface UploadedDoc {
  id: string;
  name: string;
  category: string;
  timestamp: string;
  bsaCertified: boolean;
  size: string;
}

export const CaseTracker = () => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [docCategory, setDocCategory] = useState("WhatsApp Chat / Audio Recording");
  const [docTitle, setDocTitle] = useState("");
  const [bsaCompliance, setBsaCompliance] = useState(true);
  const [uploadSuccessToast, setUploadSuccessToast] = useState(false);

  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([
    {
      id: "doc-1",
      name: "WhatsApp_Threat_Chats_Export.pdf",
      category: "WhatsApp Chat / Audio Recording",
      timestamp: "16 Oct 2026, 04:30 PM",
      bsaCertified: true,
      size: "2.4 MB"
    }
  ]);

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;

    const newDoc: UploadedDoc = {
      id: `doc-${Date.now()}`,
      name: docTitle.endsWith('.pdf') ? docTitle : `${docTitle}.pdf`,
      category: docCategory,
      timestamp: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      bsaCertified: bsaCompliance,
      size: `${(Math.random() * 3 + 1).toFixed(1)} MB`
    };

    setUploadedDocs(prev => [newDoc, ...prev]);
    setShowUploadModal(false);
    setDocTitle("");
    setUploadSuccessToast(true);
    setTimeout(() => setUploadSuccessToast(false), 5000);
  };

  const handleDeleteDoc = (id: string) => {
    setUploadedDocs(prev => prev.filter(doc => doc.id !== id));
  };

  const caseSteps = [
    {
      id: 1,
      title: "FIR Registered",
      date: "12 Oct 2026",
      status: "completed",
      description: "First Information Report (FIR) successfully filed at Local Police Station under BNS 74 (Assault / Outraging Modesty).",
      icon: <FileText className="h-5 w-5 text-white" />,
      color: "bg-green-500"
    },
    {
      id: 2,
      title: "Police Investigation & Evidence",
      date: "15 Oct 2026 - Present",
      status: "active",
      description: "Investigating Officer (IO) is collecting electronic evidence, witness statements under Sec 180 BNSS, and site panchnama.",
      icon: <AlertCircle className="h-5 w-5 text-white" />,
      color: "bg-orange-500"
    },
    {
      id: 3,
      title: "Chargesheet Filed",
      date: "Expected: Nov 2026",
      status: "pending",
      description: "Police will submit the final investigation report under Section 193 BNSS to the Judicial Magistrate.",
      icon: <Building2 className="h-5 w-5 text-white" />,
      color: "bg-slate-300"
    },
    {
      id: 4,
      title: "First Court Hearing & Charges",
      date: "Pending Schedule",
      status: "pending",
      description: "Magistrate takes cognizance of the chargesheet, summons the accused, and hears arguments on charge framing.",
      icon: <Gavel className="h-5 w-5 text-white" />,
      color: "bg-slate-300"
    },
    {
      id: 5,
      title: "Final Trial & Judgment",
      date: "TBD",
      status: "pending",
      description: "Court examines prosecution and defense witnesses under BSA 2023, followed by final oral arguments and verdict.",
      icon: <Scale className="h-5 w-5 text-white" />,
      color: "bg-slate-300"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* Toast Notification */}
      {uploadSuccessToast && (
        <div className="bg-emerald-600 text-white px-5 py-4 rounded-xl shadow-lg flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-6 w-6 text-emerald-200" />
            <div>
              <p className="font-bold text-sm">Evidence Uploaded Successfully!</p>
              <p className="text-xs text-emerald-100">Document cryptographically linked to Case File NY-2026-8492 with BSA Sec 63 compliance check.</p>
            </div>
          </div>
          <button onClick={() => setUploadSuccessToast(false)} className="text-emerald-200 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex justify-between items-start mb-8 border-b pb-6 flex-col sm:flex-row gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-orange-200">Live Case Tracking</span>
              <span className="text-xs text-slate-400">• Updated 1 hour ago</span>
            </div>
            <h2 className="text-2xl font-bold text-[#1a2a40] tracking-tight">Active Case Proceedings</h2>
            <p className="text-slate-500 font-medium text-sm mt-1">Official timeline registered with District Legal Services Authority (DLSA).</p>
          </div>
          <div className="text-left sm:text-right">
            <span className="bg-slate-900 text-white font-mono font-bold px-4 py-2 rounded-lg text-sm tracking-wide inline-block shadow-sm">
              CNR: DLDN01-008492-2026
            </span>
            <p className="text-xs text-emerald-600 font-bold mt-2 flex items-center sm:justify-end gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> NALSA Free Legal Aid Active
            </p>
          </div>
        </div>

        {/* VERTICAL TIMELINE UI */}
        <div className="relative border-l-4 border-slate-100 ml-6 md:ml-8 space-y-12 pb-8">
          {caseSteps.map((step) => (
            <div key={step.id} className="relative pl-8 md:pl-12">
              {/* Timeline Dot/Icon */}
              <div 
                className={`absolute -left-[22px] top-0 h-10 w-10 rounded-full border-4 border-white shadow-md flex items-center justify-center ${step.color} ${step.status === 'active' ? 'ring-4 ring-orange-100' : ''}`}
              >
                {step.status === 'completed' ? <CheckCircle2 className="h-5 w-5 text-white" /> : step.icon}
              </div>

              {/* Content Card */}
              <div className={`bg-white p-6 rounded-xl border ${step.status === 'active' ? 'border-orange-300 shadow-md bg-orange-50/20 ring-1 ring-orange-200' : 'border-slate-200 shadow-sm'} transition-all duration-300 hover:shadow-md`}>
                <div className="flex justify-between items-start flex-col md:flex-row md:items-center mb-2">
                  <h3 className={`font-bold text-lg ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-800'}`}>
                    {step.title}
                  </h3>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full mt-2 md:mt-0 ${
                    step.status === 'completed' ? 'bg-green-100 text-green-700 border border-green-200' :
                    step.status === 'active' ? 'bg-orange-100 text-orange-700 border border-orange-200 font-extrabold' :
                    'bg-slate-100 text-slate-500'
                  }`}>
                    {step.status === 'active' ? '● CURRENT STAGE' : step.status.toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 text-sm font-medium mb-3">
                  <Clock className={`h-4 w-4 ${step.status === 'pending' ? 'text-slate-300' : 'text-slate-500'}`} />
                  <span className={step.status === 'pending' ? 'text-slate-400' : 'text-slate-600'}>{step.date}</span>
                </div>
                
                <p className={`text-sm ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                  {step.description}
                </p>
                
                {/* ACTIVE STAGE ACTIONS & SUBMITTED EVIDENCE */}
                {step.status === 'active' && (
                  <div className="mt-5 pt-5 border-t border-orange-200/80 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h4 className="font-bold text-sm text-slate-800">Submitted Case Evidence Locker</h4>
                        <p className="text-xs text-slate-500">Documents submitted directly to assigned NALSA Advocate & IO.</p>
                      </div>
                      <button 
                        onClick={() => setShowUploadModal(true)}
                        className="bg-orange-600 hover:bg-orange-700 text-white text-sm font-bold px-4 py-2.5 rounded-lg transition shadow flex items-center gap-2 active:scale-95"
                      >
                        <UploadCloud className="h-4 w-4" /> Upload Evidence Document
                      </button>
                    </div>

                    {/* Evidence List */}
                    <div className="space-y-2 mt-2">
                      {uploadedDocs.length === 0 ? (
                        <p className="text-xs text-slate-400 italic py-2">No documents uploaded yet. Upload supporting chats, photos, or medical receipts.</p>
                      ) : (
                        uploadedDocs.map(doc => (
                          <div key={doc.id} className="bg-white border border-slate-200 rounded-lg p-3 flex items-center justify-between hover:border-slate-300 transition shadow-xs">
                            <div className="flex items-center gap-3">
                              <div className="bg-blue-50 p-2 rounded text-blue-600">
                                <FileCheck className="h-5 w-5" />
                              </div>
                              <div>
                                <p className="font-bold text-xs text-slate-800 flex items-center gap-2">
                                  {doc.name}
                                  {doc.bsaCertified && (
                                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-0.5">
                                      <ShieldCheck className="h-3 w-3" /> BSA §63 Certified
                                    </span>
                                  )}
                                </p>
                                <p className="text-[11px] text-slate-400 mt-0.5">
                                  {doc.category} • {doc.size} • Uploaded {doc.timestamp}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => alert(`Viewing document: ${doc.name}\nCompliant with BSA Section 63 electronic record certificates.`)}
                                className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded" 
                                title="Preview"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteDoc(doc.id)}
                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded" 
                                title="Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* UPLOAD EVIDENCE MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Upload Case Evidence</h3>
                  <p className="text-xs text-slate-500">Securely submit to Case File: NY-2026-8492</p>
                </div>
              </div>
              <button 
                onClick={() => setShowUploadModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="space-y-4 mt-5">
              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                  Evidence Category
                </label>
                <select 
                  value={docCategory}
                  onChange={(e) => setDocCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option>WhatsApp Chat / Audio Recording</option>
                  <option>CCTV Footage / Video Evidence</option>
                  <option>Medical Examination Report (MLC)</option>
                  <option>Bank / UPI Transaction Statement</option>
                  <option>Photograph / Physical Evidence</option>
                  <option>Written Witness Statement</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block mb-1.5">
                  Document Title / Description
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g., Office_CCTV_Footage_Oct12.mp4 or Doctor_Prescription.pdf"
                  value={docTitle}
                  onChange={(e) => setDocTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Statutory Legal Compliance Check */}
              <div className="bg-amber-50/70 border border-amber-200 p-3.5 rounded-xl">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={bsaCompliance}
                    onChange={(e) => setBsaCompliance(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-amber-900 block">
                      Auto-generate Section 63 BSA Electronic Certificate
                    </span>
                    <span className="text-[11px] text-amber-800 leading-tight block mt-0.5">
                      Under Bharatiya Sakshya Adhiniyam, 2023 (former 65B Evidence Act), electronic records are only admissible in Indian courts when accompanied by a signed device certificate.
                    </span>
                  </div>
                </label>
              </div>

              {/* Drag Drop Area */}
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-orange-400 transition bg-slate-50/50 cursor-pointer">
                <UploadCloud className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">Click to browse or drop file here</p>
                <p className="text-[11px] text-slate-400 mt-1">PDF, JPG, PNG, MP4, MP3 up to 50MB</p>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-2.5 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-bold shadow-md transition"
                >
                  Verify & Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
