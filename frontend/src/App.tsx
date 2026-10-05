import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth, type Role } from './context/AuthContext';
import { Layout } from './components/Layout';
import { LionStambh } from './components/LionStambh';
import { IndianFlag } from './components/IndianFlag';
import { AuthModal } from './components/AuthModal';
import { 
  User, 
  Briefcase, 
  Gavel, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2, 
  Search, 
  Calendar, 
  ExternalLink,
  Cpu,
  Clock,
  Sparkles,
  Lock,
  Building2,
  FileText
} from 'lucide-react';

import { CitizenDashboard } from './pages/CitizenDashboard';
import { CaseTracker } from './pages/CaseTracker';
import { FindAdvocate } from './pages/FindAdvocate';
import { CitizenOverview } from './pages/CitizenOverview';
import { AdvocateDashboard } from './pages/AdvocateDashboard';
import { AdvocateMatters } from './pages/AdvocateMatters';
import { AdvocateTools } from './pages/AdvocateTools';
import { DataScienceWorkbench } from './pages/DataScienceWorkbench';
import { JudgeOverview } from './pages/JudgeOverview';
import { JudgeDashboard } from './pages/JudgeDashboard';
import { JudgeUndertrials } from './pages/JudgeUndertrials';
import { JudgeTools } from './pages/JudgeTools';

// Clean, Dignified Navy Blue Landing Page with Exactly 3 Portals & Authentic Identification
const Landing = () => {
  const { role, login } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [targetRole, setTargetRole] = useState<Role>('citizen');

  if (role) return <Navigate to="/dashboard" replace />;

  const handleOpenAuth = (r: 'citizen' | 'advocate' | 'judge') => {
    setTargetRole(r);
    setModalOpen(true);
  };

  const handleDirectDemo = (r: 'citizen' | 'advocate' | 'judge', e: React.MouseEvent) => {
    e.stopPropagation();
    login(r);
  };

  return (
    <div className="w-full bg-[#0A192F]/[0.02] min-h-screen font-sans flex flex-col justify-between -m-8 text-slate-800">
      
      {/* Top Official National Bar */}
      <div className="bg-[#0C2340] text-white border-b-2 border-[#D4AF37] px-6 py-3 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Left: Lion Stambh + NyayaSetu + Indian Flag */}
          <div className="flex items-center gap-3.5">
            <div className="bg-white/10 p-1.5 rounded-lg border border-white/20 shadow-xs flex items-center justify-center">
              <LionStambh size={38} monochrome className="text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black text-white tracking-tight">NyayaSetu</span>
                <span className="text-amber-400 font-serif font-bold text-sm tracking-wide">न्यायसेतु</span>
                <IndianFlag width={26} height={17} />
              </div>
              <p className="text-[11px] text-slate-300 font-medium tracking-wide">
                National Legal Intelligence & Judicial Decision Support System • Government of India
              </p>
            </div>
          </div>

          {/* Right: Date, Security Status & Sign In Button */}
          <div className="flex items-center gap-4 text-xs">
            <div className="hidden md:flex items-center gap-2 text-slate-300">
              <Calendar className="h-3.5 w-3.5 text-amber-400" />
              <span className="text-[11px] font-mono">04-Oct-2026</span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                e-Courts Phase III Live
              </span>
            </div>

            <button
              onClick={() => handleOpenAuth('citizen')}
              className="bg-[#1E3A8A] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg font-bold text-xs transition shadow-xs flex items-center gap-2 border border-blue-400/40"
            >
              <Lock className="h-3.5 w-3.5 text-amber-300" />
              <span>Sign In / Register</span>
            </button>
          </div>

        </div>
      </div>

      {/* Hero Header Section */}
      <div className="max-w-5xl mx-auto px-6 pt-10 pb-6 text-center">
        
        {/* Dignified Subheading */}
        <div className="inline-flex items-center gap-2 bg-[#0C2340]/10 border border-[#0C2340]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0C2340] mb-4 shadow-2xs">
          <ShieldCheck className="h-4 w-4 text-[#0C2340]" />
          <span>Statutory Compliance: Bharatiya Nyaya Sanhita (BNS) & Section 63 BSA 2023</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-[#0C2340] tracking-tight leading-tight">
          Unified Judicial Decision Support & Legal Intelligence
        </h1>
        
        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto mt-3 leading-relaxed">
          Select your authorized portal below. Authenticate with official Government credentials (Aadhaar e-KYC, Bar Council Enrollment ID, or Judicial Cadre Token).
        </p>

      </div>

      {/* EXACTLY 3 LOGIN CARDS SECTION */}
      <div className="max-w-6xl mx-auto px-6 py-6 w-full">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* CARD 1: CITIZEN PORTAL */}
          <div 
            onClick={() => handleOpenAuth('citizen')}
            className="group bg-white rounded-2xl border-2 border-slate-200 hover:border-[#0C2340] shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer relative"
          >
            {/* Top Accent Strip */}
            <div className="h-2 bg-[#0C2340] w-full" />
            
            <div className="p-7 flex-1 flex flex-col">
              
              {/* Badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="h-14 w-14 rounded-xl bg-[#0C2340]/10 text-[#0C2340] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#0C2340] group-hover:text-white transition-all duration-200 shadow-2xs">
                  <User className="h-7 w-7" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-[#0C2340] border border-blue-200/80 px-2.5 py-1 rounded-full">
                  Citizen e-KYC
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl font-bold text-[#0C2340] group-hover:text-blue-900 transition">
                Citizen Portal
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Litigants, Undertrial Kin & Public Legal Aid
              </p>

              <p className="text-xs text-slate-600 mt-4 leading-relaxed flex-1">
                Access simplified legal rights information, check BNS criminal sections, evaluate bail probabilities with NyayaAnumana AI, and discover NALSA empanelled advocates.
              </p>

              {/* ID Verification Feature Bullets */}
              <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-[11px] text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>12-Digit Aadhaar Card / UIDAI OTP</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>BNS vs IPC Statutory Search Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Limitation Countdown & Case Tracker</span>
                </div>
              </div>

            </div>

            {/* Card Footer Actions */}
            <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => handleOpenAuth('citizen')}
                className="w-full bg-[#0C2340] hover:bg-[#1A365D] text-white py-2.5 px-4 rounded-xl font-bold text-xs transition shadow-xs flex items-center justify-center gap-2 group-hover:bg-[#0C2340]"
              >
                <span>Aadhaar Sign In / Register</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={(e) => handleDirectDemo('citizen', e)}
                className="w-full text-[11px] text-slate-500 hover:text-[#0C2340] py-1 font-semibold transition flex items-center justify-center gap-1 hover:underline"
              >
                <span>⚡ Instant Demo Access (Skip Verification)</span>
              </button>
            </div>

          </div>

          {/* CARD 2: ADVOCATE CHAMBERS */}
          <div 
            onClick={() => handleOpenAuth('advocate')}
            className="group bg-white rounded-2xl border-2 border-slate-200 hover:border-[#1E3A8A] shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer relative"
          >
            {/* Top Accent Strip */}
            <div className="h-2 bg-[#1E3A8A] w-full" />
            
            <div className="p-7 flex-1 flex flex-col">
              
              {/* Badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="h-14 w-14 rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#1E3A8A] group-hover:text-white transition-all duration-200 shadow-2xs">
                  <Briefcase className="h-7 w-7" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-[#1E3A8A] border border-indigo-200/80 px-2.5 py-1 rounded-full">
                  BCI Verified
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl font-bold text-[#0C2340] group-hover:text-blue-900 transition">
                Advocate Chambers
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Practicing Advocates & Legal Counsels
              </p>

              <p className="text-xs text-slate-600 mt-4 leading-relaxed flex-1">
                Automate drafting of anticipatory bail petitions, audit FIRs & chargesheets for procedural loopholes under BNSS 2023, and generate Sec 63 BSA electronic evidence certificates.
              </p>

              {/* ID Verification Feature Bullets */}
              <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-[11px] text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Bar Council of India Enrollment ID</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>AI Legal Pleading Drafting Suite</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>FIR & Chargesheet Procedural Loophole Audit</span>
                </div>
              </div>

            </div>

            {/* Card Footer Actions */}
            <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => handleOpenAuth('advocate')}
                className="w-full bg-[#1E3A8A] hover:bg-[#1E40AF] text-white py-2.5 px-4 rounded-xl font-bold text-xs transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Bar Council Sign In / Register</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={(e) => handleDirectDemo('advocate', e)}
                className="w-full text-[11px] text-slate-500 hover:text-[#1E3A8A] py-1 font-semibold transition flex items-center justify-center gap-1 hover:underline"
              >
                <span>⚡ Instant Demo Access (Skip Verification)</span>
              </button>
            </div>

          </div>

          {/* CARD 3: JUDICIAL BENCH */}
          <div 
            onClick={() => handleOpenAuth('judge')}
            className="group bg-white rounded-2xl border-2 border-slate-200 hover:border-[#0F172A] shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer relative"
          >
            {/* Top Accent Strip */}
            <div className="h-2 bg-[#D4AF37] w-full" />
            
            <div className="p-7 flex-1 flex flex-col">
              
              {/* Badge & Icon */}
              <div className="flex items-center justify-between mb-5">
                <div className="h-14 w-14 rounded-xl bg-amber-500/10 text-[#0C2340] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#0C2340] group-hover:text-amber-300 transition-all duration-200 shadow-2xs">
                  <Gavel className="h-7 w-7" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-full">
                  Judicial Cadre Token
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-xl font-bold text-[#0C2340] group-hover:text-blue-900 transition">
                Judicial Bench
              </h3>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                Hon'ble Judges, Magistrates & NJDG Registrars
              </p>

              <p className="text-xs text-slate-600 mt-4 leading-relaxed flex-1">
                Courtroom Chambers decision support, Section 479 BNSS undertrial prison de-congestion monitoring, and OR-MCDP automated cause list prioritization.
              </p>

              {/* ID Verification Feature Bullets */}
              <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-[11px] text-slate-600">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Judicial Cadre Hardware Security Token</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>Sec 479 BNSS Undertrial Prison Release Triage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>OR-MCDP Automated Cause List Optimizer</span>
                </div>
              </div>

            </div>

            {/* Card Footer Actions */}
            <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex flex-col gap-2.5">
              <button
                onClick={() => handleOpenAuth('judge')}
                className="w-full bg-[#0C2340] hover:bg-[#1A365D] text-amber-300 py-2.5 px-4 rounded-xl font-bold text-xs transition shadow-xs flex items-center justify-center gap-2"
              >
                <span>Judicial Cadre Authentication</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={(e) => handleDirectDemo('judge', e)}
                className="w-full text-[11px] text-slate-500 hover:text-[#0C2340] py-1 font-semibold transition flex items-center justify-center gap-1 hover:underline"
              >
                <span>⚡ Instant Demo Access (Skip Verification)</span>
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Official Statistics Bar (Navy Blue & Slate) */}
      <div className="bg-[#0C2340] text-white py-6 border-y border-[#D4AF37]/50 mt-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            
            <div className="p-2">
              <div className="text-2xl font-black text-amber-400">484,725+</div>
              <div className="text-[11px] text-slate-300 font-medium mt-1">Court Judgments Analyzed</div>
              <div className="text-[10px] text-slate-400 font-mono">62.8 GB Corpus Benchmark</div>
            </div>

            <div className="p-2 border-l border-slate-700/60">
              <div className="text-2xl font-black text-emerald-400">0.9412</div>
              <div className="text-[11px] text-slate-300 font-medium mt-1">ROC-AUC Bail Precision</div>
              <div className="text-[10px] text-slate-400 font-mono">Calibrated ML Probability</div>
            </div>

            <div className="p-2 border-l border-slate-700/60">
              <div className="text-2xl font-black text-blue-300">BNSS Sec 479</div>
              <div className="text-[11px] text-slate-300 font-medium mt-1">Mandatory Prison Release</div>
              <div className="text-[10px] text-slate-400 font-mono">1/3 & 1/2 Cap Automated Triage</div>
            </div>

            <div className="p-2 border-l border-slate-700/60">
              <div className="text-2xl font-black text-amber-300">Sec 63 BSA</div>
              <div className="text-[11px] text-slate-300 font-medium mt-1">Electronic Evidence Engine</div>
              <div className="text-[10px] text-slate-400 font-mono">Cryptographic Hash Verification</div>
            </div>

          </div>
        </div>
      </div>

      {/* Dignified Government Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 px-6 text-xs">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <LionStambh size={24} monochrome className="text-slate-400" />
            <div>
              <span className="font-bold text-slate-200">NyayaSetu Decision Support System</span>
              <p className="text-[10px] text-slate-400">Department of Justice • Supreme Court of India e-Committee Grid</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="text-slate-700">•</span>
            <span className="hover:text-white cursor-pointer">Hyperlinking Policy</span>
            <span className="text-slate-700">•</span>
            <span className="text-emerald-400 font-mono">UIDAI e-KYC & NJDG Connected</span>
          </div>
        </div>
      </footer>

      {/* Identity Verification & Auth Modal */}
      <AuthModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialRole={targetRole}
      />

    </div>
  );
};

// Dynamic Dashboard Router based on active role
const Dashboard = () => {
  const { role } = useAuth();
  if (!role) return <Navigate to="/" replace />;
  
  if (role === 'citizen') {
    return <CitizenOverview />;
  }
  if (role === 'advocate') {
    return <AdvocateDashboard />;
  }
  if (role === 'judge') {
    return <JudgeOverview />;
  }
  
  return <Navigate to="/" replace />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Landing />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="search" element={<CitizenDashboard />} />
            <Route path="tracker" element={<CaseTracker />} />
            <Route path="advocates" element={<FindAdvocate />} />
            <Route path="matters" element={<AdvocateMatters />} />
            <Route path="tools" element={<AdvocateTools />} />
            <Route path="docket" element={<JudgeDashboard />} />
            <Route path="undertrials" element={<JudgeUndertrials />} />
            <Route path="judge-tools" element={<JudgeTools />} />
            <Route path="analytics" element={<DataScienceWorkbench />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}
