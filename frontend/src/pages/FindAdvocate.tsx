import React, { useState } from 'react';
import { 
  Search, 
  Star, 
  MapPin, 
  Award, 
  Scale, 
  PhoneCall, 
  Mail, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  X, 
  ShieldCheck, 
  Building2, 
  Video, 
  FileText,
  UserCheck
} from 'lucide-react';

interface AdvocateProfile {
  id: number;
  name: string;
  type: 'NALSA Empanelled (Free Legal Aid)' | 'Private Senior Counsel' | 'Private Legal Practitioner';
  barCouncilNumber: string;
  specialty: string;
  court: string;
  city: string;
  experience: string;
  rating: number;
  consultationFee: string;
  languages: string[];
  casesHandled: number;
  description: string;
  isFree: boolean;
  phone: string;
  email: string;
}

export const FindAdvocate = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedAdvocate, setSelectedAdvocate] = useState<AdvocateProfile | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<any | null>(null);

  // Booking Form State
  const [clientName, setClientName] = useState('Rajesh Sharma');
  const [clientPhone, setClientPhone] = useState('+91 98765 43210');
  const [consultType, setConsultType] = useState<'video' | 'chamber' | 'written'>('video');
  const [consultDate, setConsultDate] = useState('2026-10-12');
  const [consultTime, setConsultTime] = useState('11:30 AM');
  const [caseSummary, setCaseSummary] = useState('');

  const advocates: AdvocateProfile[] = [
    {
      id: 1,
      name: "Adv. Vikramaditya Seth",
      type: "Private Senior Counsel",
      barCouncilNumber: "BCI Reg: D/1482/2018",
      specialty: "Criminal Defense, Bail (BNSS 483), BNS Statutes",
      court: "High Court of Delhi & Tis Hazari Courts",
      city: "Delhi NCR",
      experience: "16 Years",
      rating: 4.9,
      consultationFee: "₹2,500 / Session",
      languages: ["Hindi", "English", "Punjabi"],
      casesHandled: 340,
      description: "Specialist in anticipatory bail under BNSS 482, criminal appeals, and chargesheet loophole audits under Section 173 BNSS.",
      isFree: false,
      phone: "+91 11 2394 8812",
      email: "v.seth@delhibar.in"
    },
    {
      id: 2,
      name: "Adv. Ananya Deshmukh",
      type: "Private Legal Practitioner",
      barCouncilNumber: "BCI Reg: MAH/3902/2015",
      specialty: "Property Law, Land Disputes, Order 39 CPC Injunctions",
      court: "High Court of Bombay & City Civil Court Mumbai",
      city: "Mumbai",
      experience: "11 Years",
      rating: 4.8,
      consultationFee: "₹2,000 / Session",
      languages: ["Marathi", "Hindi", "English"],
      casesHandled: 215,
      description: "Expert in title deed verification, illegal dispossession, builder fraud under RERA, and commercial civil litigation.",
      isFree: false,
      phone: "+91 22 2267 9410",
      email: "a.deshmukh@bombaybar.in"
    },
    {
      id: 3,
      name: "Adv. Rajeshwar Upadhyay",
      type: "NALSA Empanelled (Free Legal Aid)",
      barCouncilNumber: "BCI Reg: UP/6712/2010",
      specialty: "Undertrial Rights (Sec 479 BNSS), Bail, Police Harassment",
      court: "Allahabad High Court (Lucknow Bench)",
      city: "Lucknow / UP",
      experience: "15 Years",
      rating: 4.9,
      consultationFee: "100% FREE (Article 39A NALSA)",
      languages: ["Hindi", "English", "Bhojpuri"],
      casesHandled: 480,
      description: "Empanelled with District Legal Services Authority. Successfully secured statutory release for over 120 undertrials under Section 479 BNSS.",
      isFree: true,
      phone: "+91 522 2618 903",
      email: "r.upadhyay@upbarcouncil.org"
    },
    {
      id: 4,
      name: "Adv. Fatima Zehra",
      type: "Private Legal Practitioner",
      barCouncilNumber: "BCI Reg: KAR/4120/2014",
      specialty: "Cyber Crime, IT Act 66D, Electronic Evidence (Sec 63 BSA)",
      court: "High Court of Karnataka, Bengaluru",
      city: "Bengaluru",
      experience: "10 Years",
      rating: 4.9,
      consultationFee: "₹1,800 / Session",
      languages: ["English", "Kannada", "Hindi", "Urdu"],
      casesHandled: 190,
      description: "Specialized defense counsel for banking scams, online phishing, crypto fraud, and Section 63 BSA electronic hash authentication.",
      isFree: false,
      phone: "+91 80 2297 3411",
      email: "f.zehra@karnatakabar.in"
    },
    {
      id: 5,
      name: "Adv. Harpreet Singh Gill",
      type: "Private Senior Counsel",
      barCouncilNumber: "BCI Reg: P&H/891/2012",
      specialty: "Narcotics NDPS, Regular Bail, Motor Vehicle Accidents",
      court: "Punjab & Haryana High Court, Chandigarh",
      city: "Chandigarh",
      experience: "14 Years",
      rating: 4.8,
      consultationFee: "₹2,200 / Session",
      languages: ["Punjabi", "Hindi", "English"],
      casesHandled: 290,
      description: "High-volume trial advocate in Sessions and Appellate courts with deep expertise in NDPS search & seizure protocols and MACT claims.",
      isFree: false,
      phone: "+91 172 2741 892",
      email: "h.gill@phbar.org"
    },
    {
      id: 6,
      name: "Adv. Meenakshi Sundaram",
      type: "NALSA Empanelled (Free Legal Aid)",
      barCouncilNumber: "BCI Reg: TN/2104/2016",
      specialty: "Domestic Violence Act, Dowry Harassment (BNS 85), Matrimonial",
      court: "Madras High Court & Family Courts Chennai",
      city: "Chennai",
      experience: "9 Years",
      rating: 4.9,
      consultationFee: "100% FREE (Article 39A NALSA)",
      languages: ["Tamil", "English", "Hindi"],
      casesHandled: 230,
      description: "Dedicated to representing women and underprivileged families in domestic cruelty, Stridhan recovery, and interim maintenance petitions.",
      isFree: true,
      phone: "+91 44 2534 1928",
      email: "m.sundaram@madrasbar.org"
    },
    {
      id: 7,
      name: "Adv. Somnath Chatterjee",
      type: "Private Legal Practitioner",
      barCouncilNumber: "BCI Reg: WB/3412/2011",
      specialty: "Cheque Bounce (Sec 138 NI Act), Commercial Contracts",
      court: "High Court of Calcutta & City Civil Court Kolkata",
      city: "Kolkata",
      experience: "13 Years",
      rating: 4.7,
      consultationFee: "₹1,500 / Session",
      languages: ["Bengali", "English", "Hindi"],
      casesHandled: 310,
      description: "Represents MSMEs and individuals in Section 138 NI Act prosecutions, summary recovery suits under Order 37 CPC, and debt settlements.",
      isFree: false,
      phone: "+91 33 2248 7019",
      email: "s.chatterjee@calcuttahc.gov.in"
    },
    {
      id: 8,
      name: "Adv. Pooja Kulkarni",
      type: "NALSA Empanelled (Free Legal Aid)",
      barCouncilNumber: "BCI Reg: MAH/7812/2019",
      specialty: "Consumer Protection Act 2019, Labor & Wage Disputes",
      court: "District Consumer Commission & District Courts Pune",
      city: "Mumbai",
      experience: "6 Years",
      rating: 4.8,
      consultationFee: "100% FREE (NALSA DLSA Pune)",
      languages: ["Marathi", "Hindi", "English"],
      casesHandled: 145,
      description: "Empanelled DLSA advocate aiding aggrieved consumers, defrauded buyers, and laborers in unpaid salary claims before statutory tribunals.",
      isFree: true,
      phone: "+91 20 2612 8840",
      email: "p.kulkarni@dlsa.gov.in"
    }
  ];

  const filteredAdvocates = advocates.filter(adv => {
    const matchesSearch = 
      adv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adv.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      adv.court.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = selectedCity === 'All' || adv.city === selectedCity;
    const matchesSpecialty = 
      selectedSpecialty === 'All' || 
      adv.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());

    return matchesSearch && matchesCity && matchesSpecialty;
  });

  const handleOpenBooking = (adv: AdvocateProfile) => {
    setSelectedAdvocate(adv);
    setBookingSuccess(null);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAdvocate) return;

    const token = `NYS-CONSULT-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    setBookingSuccess({
      token,
      advocate: selectedAdvocate,
      date: consultDate,
      time: consultTime,
      type: consultType,
      fee: selectedAdvocate.consultationFee
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16 font-sans">
      
      {/* Top Header Card */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0C2340]/10 text-[#0C2340] text-xs font-bold mb-2">
            <UserCheck className="h-3.5 w-3.5" />
            Bar Council of India Verified Directory
          </div>
          <h2 className="text-2xl font-black text-[#0C2340] tracking-tight">
            Find an Advocate & Legal Counsel
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Connect directly with verified Indian High Court practitioners and NALSA pro-bono legal aid advocates under Article 39A.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search BNS, Bail, Cheque, Court..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#0C2340] text-slate-800 placeholder-slate-400"
          />
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center gap-2.5 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
        <span className="text-xs font-bold text-slate-700 mr-2 flex items-center gap-1">
          <MapPin className="h-3.5 w-3.5 text-[#0C2340]" /> Jurisdiction:
        </span>
        {['All', 'Delhi NCR', 'Mumbai', 'Lucknow / UP', 'Bengaluru', 'Chandigarh', 'Chennai', 'Kolkata'].map((city) => (
          <button
            key={city}
            onClick={() => setSelectedCity(city)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              selectedCity === city
                ? 'bg-[#0C2340] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {city}
          </button>
        ))}

        <div className="w-full sm:w-auto sm:ml-auto flex items-center gap-2 mt-2 sm:mt-0">
          <span className="text-xs font-bold text-slate-700">Domain:</span>
          <select 
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="text-xs bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-700 focus:outline-none font-medium cursor-pointer"
          >
            <option value="All">All Domains</option>
            <option value="Bail">Bail & Undertrials (Sec 479)</option>
            <option value="Criminal">Criminal Defense (BNS)</option>
            <option value="Property">Property & Land Disputes</option>
            <option value="Cyber">Cybercrime (IT Act / Sec 63 BSA)</option>
            <option value="Domestic">Domestic Violence & Matrimonial</option>
            <option value="Cheque">Cheque Bounce (Sec 138 NI Act)</option>
          </select>
        </div>
      </div>

      {/* Advocate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredAdvocates.map((adv) => (
          <div 
            key={adv.id} 
            className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:border-[#0C2340]/60 hover:shadow-md transition-all flex flex-col justify-between p-6 group"
          >
            <div>
              
              {/* Header with Name & Rating */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3.5">
                  <div className="h-12 w-12 rounded-xl bg-[#0C2340] text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                    {adv.name.split(' ').slice(1).map(n => n[0]).join('') || 'AD'}
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0C2340] group-hover:text-blue-900 transition flex items-center gap-1.5">
                      {adv.name}
                      <span title="Bar Council Verified" className="inline-flex">
                        <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                      </span>
                    </h3>
                    <p className="text-[11px] font-mono text-slate-500 font-semibold mt-0.5">
                      {adv.barCouncilNumber}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md text-xs font-bold text-amber-800 shrink-0">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span>{adv.rating}</span>
                </div>
              </div>

              {/* Status Badge & Fee */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5">
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  adv.isFree 
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                    : 'bg-blue-50 text-blue-900 border border-blue-200'
                }`}>
                  {adv.type}
                </span>

                <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                  {adv.consultationFee}
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                {adv.description}
              </p>

              {/* Detail Pills */}
              <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
                <p className="flex items-center gap-2">
                  <Scale className="h-3.5 w-3.5 text-[#0C2340] shrink-0" />
                  <span className="font-semibold text-slate-800">Specialty:</span> {adv.specialty}
                </p>
                <p className="flex items-center gap-2">
                  <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-800">Courts:</span> {adv.court}
                </p>
                <p className="flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-800">Experience:</span> {adv.experience} ({adv.casesHandled}+ matters)
                </p>
                <p className="flex items-center gap-2 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Languages:</span> {adv.languages.join(', ')}
                </p>
              </div>

            </div>

            {/* Actions Bar */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2.5">
              <button 
                onClick={() => handleOpenBooking(adv)}
                className="flex-1 bg-[#0C2340] hover:bg-[#1A365D] text-white py-2.5 rounded-xl font-bold text-xs transition shadow-xs flex items-center justify-center gap-1.5"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>Book Legal Consultation</span>
              </button>

              <a 
                href={`tel:${adv.phone}`}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition flex items-center justify-center"
                title={`Call Chamber: ${adv.phone}`}
              >
                <PhoneCall className="h-4 w-4" />
              </a>

              <a 
                href={`mailto:${adv.email}`}
                className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition flex items-center justify-center"
                title={`Email: ${adv.email}`}
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>

          </div>
        ))}
      </div>

      {/* INTERACTIVE BOOKING MODAL */}
      {selectedAdvocate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-[#0C2340] text-white p-5 flex items-center justify-between border-b-2 border-[#D4AF37]">
              <div>
                <h3 className="text-base font-bold flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-amber-400" />
                  Schedule Consultation with {selectedAdvocate.name}
                </h3>
                <p className="text-[11px] text-slate-300">
                  {selectedAdvocate.court} • {selectedAdvocate.barCouncilNumber}
                </p>
              </div>
              <button 
                onClick={() => setSelectedAdvocate(null)}
                className="text-slate-400 hover:text-white p-1 rounded-full transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-xs">
              
              {!bookingSuccess ? (
                <form onSubmit={handleConfirmBooking} className="space-y-4">
                  
                  {/* Mode Selector */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1.5">
                      Consultation Mode
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setConsultType('video')}
                        className={`p-2.5 rounded-lg border text-center transition flex flex-col items-center gap-1 ${
                          consultType === 'video'
                            ? 'border-[#0C2340] bg-blue-50/50 text-[#0C2340] font-bold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Video className="h-4 w-4" />
                        <span className="text-[11px]">Video Link</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setConsultType('chamber')}
                        className={`p-2.5 rounded-lg border text-center transition flex flex-col items-center gap-1 ${
                          consultType === 'chamber'
                            ? 'border-[#0C2340] bg-blue-50/50 text-[#0C2340] font-bold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Building2 className="h-4 w-4" />
                        <span className="text-[11px]">In-Chamber</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setConsultType('written')}
                        className={`p-2.5 rounded-lg border text-center transition flex flex-col items-center gap-1 ${
                          consultType === 'written'
                            ? 'border-[#0C2340] bg-blue-50/50 text-[#0C2340] font-bold'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <FileText className="h-4 w-4" />
                        <span className="text-[11px]">Legal Opinion</span>
                      </button>
                    </div>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Preferred Date
                      </label>
                      <input 
                        type="date"
                        value={consultDate}
                        onChange={(e) => setConsultDate(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0C2340]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Time Slot
                      </label>
                      <select
                        value={consultTime}
                        onChange={(e) => setConsultTime(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0C2340] cursor-pointer"
                      >
                        <option>10:30 AM (Morning Session)</option>
                        <option>11:30 AM (Court Recess)</option>
                        <option>02:30 PM (Afternoon Session)</option>
                        <option>04:30 PM (Chamber Hours)</option>
                        <option>06:00 PM (Evening Hours)</option>
                      </select>
                    </div>
                  </div>

                  {/* Client Details */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Your Full Name
                      </label>
                      <input 
                        type="text"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0C2340]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Mobile Number
                      </label>
                      <input 
                        type="text"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0C2340]"
                        required
                      />
                    </div>
                  </div>

                  {/* Case Brief */}
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Case Brief / Grievance Summary
                    </label>
                    <textarea 
                      rows={2}
                      value={caseSummary}
                      onChange={(e) => setCaseSummary(e.target.value)}
                      placeholder="Briefly state FIR number, BNS section, or legal notice issue..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#0C2340] resize-none"
                    />
                  </div>

                  {/* Fee Disclosure */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                    <span className="text-slate-600 font-medium">Statutory Fee / Scheme:</span>
                    <span className="font-bold text-[#0C2340]">{selectedAdvocate.consultationFee}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#0C2340] hover:bg-[#1A365D] text-white py-3 rounded-xl font-bold text-xs transition shadow-md flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    <span>Confirm Consultation Appointment</span>
                  </button>

                </form>
              ) : (
                /* Booking Success Voucher */
                <div className="space-y-4 animate-in fade-in duration-300 text-center py-4">
                  <div className="h-14 w-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-xs">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900">
                      Consultation Successfully Booked!
                    </h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      A confirmation SMS with secure courtroom video link has been sent.
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2 text-xs">
                    <div className="flex justify-between border-b pb-1.5">
                      <span className="text-slate-500">Appointment Token:</span>
                      <span className="font-mono font-bold text-[#0C2340]">{bookingSuccess.token}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1.5">
                      <span className="text-slate-500">Advocate:</span>
                      <span className="font-bold text-slate-800">{bookingSuccess.advocate.name}</span>
                    </div>
                    <div className="flex justify-between border-b pb-1.5">
                      <span className="text-slate-500">Date & Slot:</span>
                      <span className="font-bold text-slate-800">{bookingSuccess.date} at {bookingSuccess.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Mode:</span>
                      <span className="font-bold text-emerald-700 capitalize">{bookingSuccess.type} Consultation</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedAdvocate(null)}
                    className="w-full bg-[#0C2340] text-white py-2.5 rounded-xl font-bold text-xs hover:bg-[#1A365D] transition"
                  >
                    Close & Return to Directory
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
