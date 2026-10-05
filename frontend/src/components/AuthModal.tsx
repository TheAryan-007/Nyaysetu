import React, { useState } from 'react';
import { useAuth, type Role, type UserProfile } from '../context/AuthContext';
import { LionStambh } from './LionStambh';
import { IndianFlag } from './IndianFlag';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Briefcase, 
  Gavel, 
  User, 
  Fingerprint, 
  Building2, 
  ArrowRight, 
  Zap, 
  KeyRound,
  AlertCircle
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: Role;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialRole = 'citizen'
}) => {
  const { login } = useAuth();
  
  const [selectedRole, setSelectedRole] = useState<'citizen' | 'advocate' | 'judge'>(
    initialRole && initialRole !== null ? initialRole : 'citizen'
  );
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  
  // Citizen form state
  const [citizenIdType, setCitizenIdType] = useState<'aadhaar' | 'corporate'>('aadhaar');
  const [citizenName, setCitizenName] = useState('Rajesh Sharma');
  const [aadhaarNumber, setAadhaarNumber] = useState('4892-7104-3381');
  const [corporateId, setCorporateId] = useState('NS-CORP-94812');
  const [citizenPhone, setCitizenPhone] = useState('+91 98765 43210');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('7842');
  const [otpVerified, setOtpVerified] = useState(true);
  const [otpTimer, setOtpTimer] = useState(0);

  // Advocate form state
  const [advocateName, setAdvocateName] = useState('Adv. Vikram Seth');
  const [barCouncil, setBarCouncil] = useState('Bar Council of Delhi');
  const [barNumber, setBarNumber] = useState('D/1482/2018');
  const [advocateEmail, setAdvocateEmail] = useState('v.seth@delhibar.in');

  // Judge form state
  const [judgeName, setJudgeName] = useState("Hon'ble Sh. Anand Vardhan");
  const [judicialCadre, setJudicialCadre] = useState('Delhi Higher Judicial Service (DHJS)');
  const [cadreId, setCadreId] = useState('DHJS-2016-084');
  const [judgeGovEmail, setJudgeGovEmail] = useState('a.vardhan@indiancourts.nic.in');

  if (!isOpen) return null;

  // Format Aadhaar number with hyphens as user types
  const handleAadhaarChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 12);
    const parts = [];
    for (let i = 0; i < raw.length; i += 4) {
      parts.push(raw.slice(i, i + 4));
    }
    setAadhaarNumber(parts.join('-'));
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtpVerified(false);
    setOtpTimer(30);
    const interval = setInterval(() => {
      setOtpTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otpCode.length >= 4) {
      setOtpVerified(true);
    }
  };

  const handleRoleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    let profile: UserProfile;

    if (selectedRole === 'citizen') {
      if (citizenIdType === 'aadhaar') {
        profile = {
          name: citizenName || 'Rajesh Sharma',
          idNumber: `Aadhaar: ${aadhaarNumber || '4892-7104-3381'}`,
          idType: 'Aadhaar Card',
          verified: true
        };
      } else {
        profile = {
          name: citizenName || 'Citizen User',
          idNumber: `Corp ID: ${corporateId || 'NS-CORP-94812'}`,
          idType: 'Corporate Legal ID',
          verified: true
        };
      }
    } else if (selectedRole === 'advocate') {
      profile = {
        name: advocateName || 'Adv. Vikram Seth',
        idNumber: `BCI Reg: ${barNumber || 'D/1482/2018'}`,
        idType: 'Bar Council Enrollment',
        verified: true
      };
    } else {
      profile = {
        name: judgeName || "Hon'ble Judge",
        idNumber: `Cadre: ${cadreId || 'DHJS-2016-084'}`,
        idType: 'Judicial Cadre Token',
        verified: true
      };
    }

    login(selectedRole, profile);
    onClose();
  };

  const handleQuickDemo = (role: 'citizen' | 'advocate' | 'judge') => {
    setSelectedRole(role);
    login(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Banner (Deep Navy Blue Official Palette) */}
        <div className="bg-[#0C2340] text-white p-5 px-6 relative flex items-center justify-between border-b-2 border-[#D4AF37]">
          <div className="flex items-center gap-3.5">
            <div className="bg-white/10 p-1.5 rounded-lg border border-white/20">
              <LionStambh size={36} monochrome className="text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-1.5">
                  NyayaSetu <span className="text-amber-400 text-xs font-serif font-normal">न्यायसेतु</span>
                </h3>
                <IndianFlag width={22} height={15} />
              </div>
              <p className="text-xs text-slate-300 font-medium">
                National Legal Intelligence & Judicial Decision Support System
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 3 Portal Selection Tabs */}
        <div className="bg-slate-100/80 p-2 border-b border-slate-200 grid grid-cols-3 gap-1.5">
          <button
            type="button"
            onClick={() => setSelectedRole('citizen')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
              selectedRole === 'citizen'
                ? 'bg-[#0C2340] text-white shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            <User className="h-3.5 w-3.5" />
            Citizen Portal
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('advocate')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
              selectedRole === 'advocate'
                ? 'bg-[#0C2340] text-white shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            <Briefcase className="h-3.5 w-3.5" />
            Advocate Chambers
          </button>

          <button
            type="button"
            onClick={() => setSelectedRole('judge')}
            className={`py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2 ${
              selectedRole === 'judge'
                ? 'bg-[#0C2340] text-white shadow-sm'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            }`}
          >
            <Gavel className="h-3.5 w-3.5" />
            Judicial Bench
          </button>
        </div>

        {/* Sign In vs Sign Up Toggle */}
        <div className="flex border-b border-slate-200 px-6 pt-3 pb-0 bg-slate-50/50">
          <button
            type="button"
            onClick={() => setAuthMode('signin')}
            className={`pb-2.5 text-xs font-bold mr-6 relative transition ${
              authMode === 'signin'
                ? 'text-[#0C2340] border-b-2 border-[#0C2340]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Sign In with Verified Identity
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('signup')}
            className={`pb-2.5 text-xs font-bold relative transition ${
              authMode === 'signup'
                ? 'text-[#0C2340] border-b-2 border-[#0C2340]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Register / New e-KYC Enrollment
          </button>
        </div>

        {/* Modal Body Form */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* Quick Demo Access Bar */}
          <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 bg-amber-500 text-white rounded-md shrink-0">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">
                  Quick Evaluation Demo Mode
                </p>
                <p className="text-[11px] text-slate-600">
                  Instant one-click access with pre-verified credentials.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleQuickDemo(selectedRole)}
              className="bg-[#0C2340] hover:bg-[#1A365D] text-white text-xs font-bold px-3.5 py-1.5 rounded-lg transition shadow-xs flex items-center gap-1.5 shrink-0"
            >
              <span>Instant Enter</span>
              <ArrowRight className="h-3 w-3" />
            </button>
          </div>

          <form onSubmit={handleRoleSubmit} className="space-y-4">
            
            {/* ROLE 1: CITIZEN FORM */}
            {selectedRole === 'citizen' && (
              <div className="space-y-3.5">
                
                {/* ID Type Switcher */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Identity Verification Method
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setCitizenIdType('aadhaar')}
                      className={`p-2.5 rounded-lg border text-left text-xs transition flex items-center gap-2.5 ${
                        citizenIdType === 'aadhaar'
                          ? 'border-[#0C2340] bg-blue-50/50 text-[#0C2340] font-bold ring-1 ring-[#0C2340]'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Fingerprint className="h-4 w-4 text-[#0C2340]" />
                      <div>
                        <div>Govt Aadhaar (UIDAI)</div>
                        <div className="text-[10px] text-slate-500 font-normal">12-Digit Biometric ID</div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCitizenIdType('corporate')}
                      className={`p-2.5 rounded-lg border text-left text-xs transition flex items-center gap-2.5 ${
                        citizenIdType === 'corporate'
                          ? 'border-[#0C2340] bg-blue-50/50 text-[#0C2340] font-bold ring-1 ring-[#0C2340]'
                          : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <Building2 className="h-4 w-4 text-[#0C2340]" />
                      <div>
                        <div>Private / Enterprise ID</div>
                        <div className="text-[10px] text-slate-500 font-normal">Digital Org Token</div>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Legal Name (as per Govt ID)
                  </label>
                  <input
                    type="text"
                    value={citizenName}
                    onChange={(e) => setCitizenName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C2340] bg-slate-50/50"
                    required
                  />
                </div>

                {/* Aadhaar or Corporate ID Field */}
                {citizenIdType === 'aadhaar' ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      12-Digit Aadhaar Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={aadhaarNumber}
                        onChange={(e) => handleAadhaarChange(e.target.value)}
                        placeholder="XXXX-XXXX-XXXX"
                        maxLength={14}
                        className="w-full px-3 py-2 text-xs font-mono tracking-widest border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C2340] bg-slate-50/50 pr-28"
                        required
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="absolute right-1 top-1 bottom-1 px-3 bg-slate-200 hover:bg-slate-300 text-slate-800 text-[10px] font-bold rounded-md transition"
                      >
                        {otpTimer > 0 ? `Resend (${otpTimer}s)` : 'Send OTP'}
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-1 flex items-center gap-1">
                      <ShieldCheck className="h-3 w-3 text-emerald-600" />
                      Encrypted via UIDAI 2048-bit RSA e-Pramaan Gateway
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Corporate / Enterprise Legal ID
                    </label>
                    <input
                      type="text"
                      value={corporateId}
                      onChange={(e) => setCorporateId(e.target.value)}
                      placeholder="e.g. NS-CORP-94812"
                      className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C2340] bg-slate-50/50"
                      required
                    />
                  </div>
                )}

                {/* Phone & OTP row */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      value={citizenPhone}
                      onChange={(e) => setCitizenPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C2340] bg-slate-50/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center justify-between">
                      <span>4-Digit OTP Code</span>
                      {otpVerified && (
                        <span className="text-emerald-600 text-[10px] font-bold flex items-center gap-0.5">
                          <CheckCircle2 className="h-3 w-3" /> Verified
                        </span>
                      )}
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        placeholder="7842"
                        maxLength={6}
                        className="flex-1 px-3 py-2 text-xs font-mono text-center tracking-widest border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C2340] bg-slate-50/50"
                      />
                      <button
                        type="button"
                        onClick={handleVerifyOtp}
                        className="px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-[11px] font-bold rounded-lg transition"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* ROLE 2: ADVOCATE FORM */}
            {selectedRole === 'advocate' && (
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Advocate Full Name
                  </label>
                  <input
                    type="text"
                    value={advocateName}
                    onChange={(e) => setAdvocateName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C2340] bg-slate-50/50"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      State Bar Council
                    </label>
                    <select
                      value={barCouncil}
                      onChange={(e) => setBarCouncil(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C2340] bg-slate-50/50 cursor-pointer"
                    >
                      <option>Bar Council of Delhi</option>
                      <option>Bar Council of Maharashtra & Goa</option>
                      <option>Karnataka State Bar Council</option>
                      <option>Bar Council of Uttar Pradesh</option>
                      <option>Bar Council of West Bengal</option>
                      <option>Bar Council of Tamil Nadu</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      BCI Enrollment Number
                    </label>
                    <input
                      type="text"
                      value={barNumber}
                      onChange={(e) => setBarNumber(e.target.value)}
                      placeholder="D/1482/2018"
                      className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C2340] bg-slate-50/50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Bar / Chamber Email
                  </label>
                  <input
                    type="email"
                    value={advocateEmail}
                    onChange={(e) => setAdvocateEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C2340] bg-slate-50/50"
                    required
                  />
                </div>

                <div className="p-2.5 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2 text-xs text-blue-900">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] leading-snug">
                    BCI Roll Verified: Active practitioner in good standing. Section 30 Advocates Act 1961 authorized.
                  </span>
                </div>
              </div>
            )}

            {/* ROLE 3: JUDICIAL BENCH FORM */}
            {selectedRole === 'judge' && (
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hon'ble Judicial Officer Designation
                  </label>
                  <input
                    type="text"
                    value={judgeName}
                    onChange={(e) => setJudgeName(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C2340] bg-slate-50/50"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Judicial Service Cadre
                    </label>
                    <select
                      value={judicialCadre}
                      onChange={(e) => setJudicialCadre(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C2340] bg-slate-50/50 cursor-pointer"
                    >
                      <option>Delhi Higher Judicial Service (DHJS)</option>
                      <option>UP Higher Judicial Service (UPHJS)</option>
                      <option>Maharashtra State Judicial Service</option>
                      <option>High Court Judicial Service</option>
                      <option>National Company Law Tribunal (NCLT)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Judicial Officer Cadre Token
                    </label>
                    <input
                      type="text"
                      value={cadreId}
                      onChange={(e) => setCadreId(e.target.value)}
                      placeholder="DHJS-2016-084"
                      className="w-full px-3 py-2 text-xs font-mono font-bold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C2340] bg-slate-50/50"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official e-Courts Judicial Email
                  </label>
                  <input
                    type="email"
                    value={judgeGovEmail}
                    onChange={(e) => setJudgeGovEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0C2340] bg-slate-50/50"
                    required
                  />
                </div>

                <div className="p-2.5 bg-slate-100 border border-slate-300 rounded-lg flex items-center gap-2 text-xs text-slate-800">
                  <KeyRound className="h-4 w-4 text-[#0C2340] shrink-0" />
                  <span className="text-[11px] leading-snug">
                    Hardware PKI Security Token & Biometric DSC verified via National Judicial Data Grid (NJDG).
                  </span>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#0C2340] hover:bg-[#1A365D] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition shadow-md flex items-center justify-center gap-2"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>
                  {authMode === 'signin' ? `Authenticate & Enter ${selectedRole} Portal` : `Enroll & Access ${selectedRole} Portal`}
                </span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

          </form>

        </div>

        {/* Modal Footer Note */}
        <div className="bg-slate-50 p-3 px-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            e-Pramaan & Bar Registry Live
          </span>
          <span className="font-mono text-[10px]">NyayaSetu Sec 63 BSA Compliant</span>
        </div>

      </div>
    </div>
  );
};
