import React, { useState, useRef } from 'react';
import { UploadCloud, FileText, CheckCircle2, Copy, Check, ShieldCheck, FileCheck, Layers, Sparkles, Scale, ExternalLink } from 'lucide-react';
import { parseLegalDocument, type ParsedLegalDocument } from '../utils/documentParser';
import { IndianFlag } from './IndianFlag';

interface DocumentUploadZoneProps {
  onDocumentLoaded?: (text: string, metadata: ParsedLegalDocument) => void;
  className?: string;
}

export const PRESET_SAMPLE_DOCUMENTS = [
  {
    name: 'Sample_FIR_Cyber_Phishing_Sec66D.txt',
    label: 'Cyber Phishing FIR (IT Act 66D / BNS 318)',
    type: 'First Information Report (FIR)',
    text: `FIRST INFORMATION REPORT (Under Section 173 BNSS 2023 / Section 154 CrPC)
Police Station: Cyber Crime Cell, New Delhi / Bengaluru
Complainant: Rajesh K. Verma (Aadhaar: 4892 1902 3341, PAN: ABCDE1234F)
Accused: Unknown Cyber Impersonators operating fraudulent banking domain
Incident Details:
On 14/09/2026 at approximately 14:30 hrs, complainant received SMS alleging imminent electricity meter disconnection. Complainant clicked on embedded URL which prompted downloading of an APK file. Within 20 minutes, unauthorized debits totaling Rs 7,85,000/- were fraudulently transferred from complainant's bank account via IMPS. Complainant notified National Cyber Crime helpline 1930 within 45 minutes of debit. Offence under Section 66C and 66D of Information Technology Act 2000 and Section 318(4) Bharatiya Nyaya Sanhita (BNS) 2023.`,
  },
  {
    name: 'Dishonour_Memo_Section_138_NI_Act.txt',
    label: 'Cheque Dishonour Memo (Sec 138 NI Act)',
    type: 'Section 138 NI Act Cheque Dishonour Notice',
    text: `FORMAL NOTICE OF CHEQUE DISHONOUR UNDER SECTION 138 NEGOTIABLE INSTRUMENTS ACT 1881
Payee: Mehta Engineering Supplies Pvt Ltd
Drawer: Apex Infrastructure Solutions (Proprietor: Anand Swamy)
Instrument Details: Cheque No. 660921 dated 05/08/2026 for sum of Rs 14,50,000/- drawn on State Bank of India, Commercial Branch.
Dishonour Reason: Cheque presented on 18/08/2026 was returned unpaid with Banker's Return Memo dated 19/08/2026 endorsed with remarks: "FUNDS INSUFFICIENT".
Legal Notice: Demand is hereby made to pay the full cheque amount of Rs 14,50,000/- within statutory 15 days of notice receipt, failing which criminal complaint under Section 138 & 142 NI Act shall be instituted before the Metropolitan Magistrate.`,
  },
  {
    name: 'RERA_Delayed_Possession_Agreement.txt',
    label: 'RERA Delay Petition (Sec 18 RERA 2016)',
    type: 'RERA Real Estate Agreement Dispute',
    text: `PETITION BEFORE REAL ESTATE REGULATORY AUTHORITY (RERA) UNDER SECTION 18 & 31
Allottee: Sunita Deshmukh, Unit 1404, Tower B, 'Skyline Residency'
Promoter: GreenTerra Infratech Developers LLP (RERA Reg No: PRM/KA/RERA/1251/2020)
Factual Grievance:
Allottee booked residential flat in October 2020 with total consideration of Rs 88,00,000/-, having paid Rs 82,50,000/- across construction milestones. As per Clause 14 of registered Agreement for Sale, promoter committed handover of possession on or before 30th June 2023. Construction at site has stalled with only structural skeleton complete. No Occupancy Certificate obtained. Promoter has delayed possession by over 38 months. Allottee claims full refund of Rs 82,50,000/- along with statutory interest @ SBI MCLR + 2% per annum under Section 18 of RERA 2016.`,
  },
];

export const DocumentUploadZone: React.FC<DocumentUploadZoneProps> = ({
  onDocumentLoaded,
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [parsedDoc, setParsedDoc] = useState<ParsedLegalDocument | null>(null);
  const [error, setError] = useState('');
  const [copiedHash, setCopiedHash] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      setError('File size exceeds the 25 MB limit.');
      return;
    }

    setParsing(true);
    setError('');

    try {
      const doc = await parseLegalDocument(file);
      setParsedDoc(doc);
      if (onDocumentLoaded) {
        onDocumentLoaded(doc.extractedText, doc);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to parse document. Please check the file format.');
    } finally {
      setParsing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectPreset = (preset: typeof PRESET_SAMPLE_DOCUMENTS[0]) => {
    const dummyFile = new File([preset.text], preset.name, { type: 'text/plain' });
    handleFile(dummyFile);
  };

  const handleCopyHash = () => {
    if (!parsedDoc?.sha256Hash) return;
    navigator.clipboard.writeText(parsedDoc.sha256Hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  const handleClear = () => {
    setParsedDoc(null);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
          isDragging
            ? 'border-[#D4AF37] bg-amber-50/50 scale-[1.01]'
            : 'border-slate-300 hover:border-[#0C2340] bg-white hover:bg-slate-50/60 shadow-xs'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.txt,.doc,.docx,.rtf"
          onChange={(e) => e.target.files && handleFile(e.target.files[0])}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-3">
          <div className="w-12 h-12 rounded-xl bg-[#0C2340]/10 text-[#0C2340] flex items-center justify-center shadow-2xs">
            {parsing ? (
              <span className="w-5 h-5 border-2 border-[#0C2340] border-t-transparent rounded-full animate-spin" />
            ) : (
              <UploadCloud className="w-6 h-6 text-[#0C2340]" />
            )}
          </div>

          <div>
            <p className="text-sm font-bold text-[#0C2340]">
              Upload FIR, Agreement, Notice or Affidavit
            </p>
            <p className="text-xs text-slate-500 mt-0.5">
              Drag & drop PDF, TXT or DOCX (Max 25 MB) • Instant SHA-256 Hash Verification
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-[10px] text-slate-700 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Section 63 BSA 2023 Compliant Electronic Record Audit</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
          {error}
        </div>
      )}

      {/* Preset Legal Instruments (One-click Evaluation Samples) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-600 font-semibold px-1">
          <span className="flex items-center gap-1.5 text-[#0C2340]">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Or test with benchmark evidentiary samples:</span>
          </span>
          <span className="text-[11px] font-mono text-slate-400">1-Click Legal Load</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {PRESET_SAMPLE_DOCUMENTS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectPreset(preset)}
              className="text-left p-3 rounded-xl bg-white border border-slate-200 hover:border-[#0C2340] hover:bg-slate-50 transition-all text-xs group shadow-2xs"
            >
              <div className="flex items-center gap-2 font-bold text-slate-900 group-hover:text-[#0C2340]">
                <FileText className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">{preset.label}</span>
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-1 truncate">
                {preset.name}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Parsed Certificate Card */}
      {parsedDoc && (
        <div className="p-5 rounded-2xl bg-white border-2 border-[#0C2340]/20 shadow-md space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0C2340] flex items-center gap-2">
                  <span>{parsedDoc.fileName}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Sec 63 BSA Verified
                  </span>
                </h4>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  {parsedDoc.detectedDocType} • {parsedDoc.fileSizeFormatted} • {parsedDoc.wordCount} Words
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className="text-xs text-slate-500 hover:text-rose-600 font-medium px-2 py-1 rounded transition"
            >
              Clear
            </button>
          </div>

          {/* Cryptographic Hash Badge */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
              <span className="flex items-center gap-1.5 text-[#0C2340]">
                <Scale className="w-3.5 h-3.5 text-amber-600" />
                <span>Section 63 BSA Cryptographic SHA-256 Digest</span>
              </span>
              <button
                type="button"
                onClick={handleCopyHash}
                className="flex items-center gap-1 text-[11px] font-mono font-bold text-[#0C2340] hover:text-blue-800 transition"
              >
                {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedHash ? 'Hash Copied' : 'Copy Hash'}</span>
              </button>
            </div>
            <p className="font-mono text-[11px] text-slate-800 break-all bg-white p-2 rounded-lg border border-slate-200 select-all">
              {parsedDoc.sha256Hash}
            </p>
            <p className="text-[10px] text-slate-500">
              {parsedDoc.bsaCompliance.legalAdmissibility}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
