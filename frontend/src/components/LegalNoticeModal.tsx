import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Printer, FileText, Scale, Clock, ShieldCheck, RefreshCw, Send, Sparkles } from 'lucide-react';
import { LionStambh } from './LionStambh';
import { IndianFlag } from './IndianFlag';

interface LegalNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  initialCaseText?: string;
  initialClientName?: string;
  initialAmount?: string;
  initialJurisdiction?: string;
}

export const LegalNoticeModal: React.FC<LegalNoticeModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'Cheque Dishonour / Financial Default',
  initialCaseText = '',
  initialClientName = 'Sh. Rajesh K. Sharma',
  initialAmount = '₹14,50,000',
  initialJurisdiction = 'New Delhi',
}) => {
  const [clientName, setClientName] = useState(initialClientName);
  const [opposingParty, setOpposingParty] = useState('Apex Infrastructure & Commercial Ventures LLP');
  const [claimAmount, setClaimAmount] = useState(initialAmount);
  const [incidentDate, setIncidentDate] = useState('18-August-2026');
  const [jurisdiction, setJurisdiction] = useState(initialJurisdiction);
  const [lawyerName, setLawyerName] = useState('Adv. Vikram Seth (Advocate on Record)');
  const [barCouncilId, setBarCouncilId] = useState('D/1482/2018 (Bar Council of Delhi)');
  const [statutoryPeriod, setStatutoryPeriod] = useState('15 Days');

  const [copied, setCopied] = useState(false);
  const [noticeText, setNoticeText] = useState('');

  const generateStatutoryNotice = () => {
    const text = `REGISTERED SPEED POST WITH ACKNOWLEDGEMENT DUE / LEGAL NOTICE
LEGAL DEMAND NOTICE UNDER INDIAN STATUTORY LAWS
(Issued under the Advocates Act, 1961 read with Section 138 NI Act 1881 / Bharatiya Nagarik Suraksha Sanhita, 2023)

Date: ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
Place: ${jurisdiction}

TO,
${opposingParty}
Principal Address / Registered Corporate Office,
Jurisdiction: ${jurisdiction}, India.

UNDER INSTRUCTIONS FROM AND ON BEHALF OF MY CLIENT:
${clientName}, Residing at / Having office at ${jurisdiction}, India (hereinafter referred to as "MY CLIENT"):

I, ${lawyerName}, Advocate, enrolled with ${barCouncilId}, do hereby serve upon you this formal STATUTORY LEGAL DEMAND NOTICE:

1. FACTUAL BACKGROUND & TRANSACTIONAL PRIVITY:
That My Client had legitimate business and legal dealings with you, the Noticee. In discharge of your legally enforceable debt, liability, and contractual commitment, financial obligations arose amounting to ${claimAmount || 'an ascertained sum'}.

2. DEFAULT & INFRINGEMENT:
That on or around ${incidentDate}, you committed persistent breach, default, and statutory contravention. The grievance details on record:
"${initialCaseText || 'The respondent failed to discharge lawful dues despite repeated communications, presenting dishonoured banking instruments and causing substantial pecuniary injury and mental agony to my client.'}"

3. STATUTORY BREACH & CRIMINAL LIABILITY:
That your actions constitute intentional dishonesty and default, rendering you liable under:
- Section 138 and 141 of the Negotiable Instruments Act, 1881;
- Section 318(4) and Section 316 of the Bharatiya Nyaya Sanhita (BNS), 2023 for cheating and criminal breach of trust;
- Mandatory procedural summons under Section 173/223 of Bharatiya Nagarik Suraksha Sanhita (BNSS), 2023.

4. PEREMPTORY STATUTORY DEMAND:
Now therefore, through this Legal Notice, My Client hereby calls upon you to pay the entire outstanding sum of ${claimAmount || 'the claimed amount'} together with interest @ 18% per annum from the date of default within a period of ${statutoryPeriod} from the receipt of this Notice.

TAKE FURTHER NOTICE that in the event of your failure or neglect to comply with the aforesaid demand within the stipulated period of ${statutoryPeriod}, My Client has given me peremptory instructions to initiate appropriate Civil and Criminal proceedings against you, including filing a Criminal Complaint before the competent Judicial Magistrate, holding you strictly liable for all consequential costs and damages.

A copy of this Legal Notice is retained in my Chamber Archives for production before the Hon'ble Court.

Yours faithfully,

___________________________
${lawyerName}
Advocate & Legal Counsel
Chamber No. 412, Lawyers Chambers Block,
High Court / District Court Grid, ${jurisdiction}
Enrollment No: ${barCouncilId}`;

    setNoticeText(text);
  };

  useEffect(() => {
    if (isOpen) {
      setClientName(initialClientName || 'Sh. Rajesh K. Sharma');
      setClaimAmount(initialAmount || '₹14,50,000');
      setJurisdiction(initialJurisdiction || 'New Delhi');
      generateStatutoryNotice();
    }
  }, [isOpen, initialCaseText, initialCategory]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(noticeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Statutory Legal Demand Notice - NyayaSetu</title>
          <style>
            body { font-family: 'Times New Roman', serif; font-size: 12pt; line-height: 1.6; margin: 40px; color: #111; }
            h2 { text-align: center; font-size: 14pt; text-decoration: underline; margin-bottom: 25px; }
            pre { white-space: pre-wrap; font-family: 'Times New Roman', serif; font-size: 11pt; }
            .header-emblem { text-align: center; margin-bottom: 15px; }
            .footer { margin-top: 40px; font-size: 9pt; color: #666; border-top: 1px solid #ccc; padding-top: 8px; }
          </style>
        </head>
        <body>
          <div class="header-emblem">
            <h3>LEGAL NOTICE OF STATUTORY DEMAND</h3>
            <p>Advocate Chambers Network • Section 30 Advocates Act 1961</p>
          </div>
          <pre>${noticeText}</pre>
          <div class="footer">
            Generated via NyayaSetu Judicial Decision Support System • Compliant with Section 63 BSA 2023 Electronic Evidence Standards
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0C2340] text-white p-4 px-6 flex items-center justify-between border-b-2 border-[#D4AF37]">
          <div className="flex items-center gap-3">
            <LionStambh size={30} monochrome className="text-amber-400" />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">
                  Statutory Legal Notice Generator
                </h3>
                <IndianFlag width={20} height={13} />
              </div>
              <p className="text-[11px] text-slate-300">
                Formal Pre-Litigation Notice under BNS / BNSS / NI Act 1881 • Section 30 Advocates Act
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-white/20 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleCopy}
              className="bg-[#D4AF37] hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-full hover:bg-white/10 transition ml-2 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 flex-1 overflow-hidden">
          {/* Controls Column */}
          <div className="p-5 border-r border-slate-200 bg-slate-50/70 overflow-y-auto space-y-3.5 text-xs">
            <h4 className="font-bold text-[#0C2340] uppercase tracking-wider text-[11px] border-b pb-1.5 flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-amber-600" />
              <span>Case & Notice Parameters</span>
            </h4>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Client / Aggrieved Litigant</label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#0C2340]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Noticee / Defaulting Party</label>
              <input
                type="text"
                value={opposingParty}
                onChange={(e) => setOpposingParty(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-[#0C2340]"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Claim Amount</label>
                <input
                  type="text"
                  value={claimAmount}
                  onChange={(e) => setClaimAmount(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white font-mono font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Statutory Window</label>
                <select
                  value={statutoryPeriod}
                  onChange={(e) => setStatutoryPeriod(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white cursor-pointer"
                >
                  <option>15 Days (NI Act)</option>
                  <option>30 Days (Civil/RERA)</option>
                  <option>7 Days (Urgent)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Jurisdiction / Court Seat</label>
              <input
                type="text"
                value={jurisdiction}
                onChange={(e) => setJurisdiction(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Issuing Counsel / Chamber</label>
              <input
                type="text"
                value={lawyerName}
                onChange={(e) => setLawyerName(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Bar Council Roll No.</label>
              <input
                type="text"
                value={barCouncilId}
                onChange={(e) => setBarCouncilId(e.target.value)}
                className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg bg-white font-mono"
              />
            </div>

            <button
              type="button"
              onClick={generateStatutoryNotice}
              className="w-full bg-[#0C2340] hover:bg-[#1A365D] text-white py-2 rounded-lg font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer shadow-xs mt-2"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate Legal Notice</span>
            </button>
          </div>

          {/* Legal Document Preview Column */}
          <div className="lg:col-span-2 p-6 overflow-y-auto bg-white font-serif text-slate-900 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between text-xs font-sans text-slate-500 font-medium">
                <span>Formal Draft Preview (Court-Admissible Format)</span>
                <span className="flex items-center gap-1 text-emerald-700 font-bold">
                  <ShieldCheck className="w-4 h-4" /> Valid Legal Template
                </span>
              </div>

              <pre className="whitespace-pre-wrap font-serif text-xs leading-relaxed text-slate-800 bg-slate-50/50 p-4 rounded-xl border border-slate-200 select-all shadow-inner">
                {noticeText}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 p-3 px-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Statutory Pre-Condition for Section 138 NI Act & Commercial Court Act 2015
          </span>
          <span className="font-mono text-[10px] text-slate-500">
            NyayaSetu Section 63 BSA Compliant
          </span>
        </div>
      </div>
    </div>
  );
};
