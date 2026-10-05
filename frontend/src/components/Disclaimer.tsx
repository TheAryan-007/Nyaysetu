import React from 'react';
import { ShieldCheck, Scale } from 'lucide-react';

export const Disclaimer = () => (
  <div className="bg-white border-b border-slate-200 text-slate-600 text-[11px] py-1.5 px-6 flex items-center justify-between font-sans">
    <div className="flex items-center gap-2 max-w-5xl mx-auto text-center justify-center">
      <span className="bg-[#D32F2F] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">STATUTORY NOTICE</span>
      <span>
        NyayaSetu Decision Support System complies with Section 63 BSA 2023 electronic evidentiary standards. Inferences are advisory for legal aid and court management.
      </span>
    </div>
    <div className="hidden lg:flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold shrink-0">
      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
      <span>Government of India e-Courts Grid</span>
    </div>
  </div>
);
