import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Users, Scale, FileText, ArrowRight, Shield, BookOpen, AlertTriangle } from 'lucide-react';

export const CitizenOverview = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in duration-500">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#1a2a40] to-slate-800 rounded-2xl p-8 text-white shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, Citizen!</h1>
          <p className="text-slate-300">Your AI-powered legal empowerment control center.</p>
        </div>
        <div className="hidden md:flex bg-white/10 p-5 rounded-full items-center justify-center">
          <Shield className="h-10 w-10 text-orange-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: Main Widgets */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Quick Actions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/search')}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-orange-500 hover:shadow-md transition group text-left"
            >
              <div className="bg-orange-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Search className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">New AI Legal Search</h3>
              <p className="text-sm text-slate-500">Analyze a new legal problem instantly.</p>
            </button>

            <button 
              onClick={() => navigate('/advocates')}
              className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:border-blue-500 hover:shadow-md transition group text-left"
            >
              <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-1">Find Pro-Bono Advocate</h3>
              <p className="text-sm text-slate-500">Connect with NALSA verified lawyers.</p>
            </button>
          </div>

          {/* Recent AI Reports */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <FileText className="h-5 w-5 text-slate-400" /> Recent AI Analyses
              </h3>
            </div>
            <div className="divide-y divide-slate-100">
              <div className="p-5 hover:bg-slate-50 transition flex justify-between items-center cursor-pointer group">
                <div>
                  <h4 className="font-bold text-slate-700 group-hover:text-orange-600 transition">Workplace Harassment Analysis</h4>
                  <p className="text-xs text-slate-500 mt-1">Oct 4, 2026 • Detected: BNS 74 (Outraging Modesty)</p>
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">NALSA Eligible</span>
              </div>
              <div className="p-5 hover:bg-slate-50 transition flex justify-between items-center cursor-pointer group">
                <div>
                  <h4 className="font-bold text-slate-700 group-hover:text-orange-600 transition">Property Encroachment</h4>
                  <p className="text-xs text-slate-500 mt-1">Sep 28, 2026 • Detected: BNS 329 (Criminal Trespass)</p>
                </div>
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">Civil Dispute</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Sidebar Widgets */}
        <div className="space-y-6">
          
          {/* Mini Case Tracker */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50/50 rounded-bl-full -z-10"></div>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Scale className="h-5 w-5 text-orange-500" /> Active Case Status
            </h3>
            
            <div className="mb-4">
              <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Case ID: NY-2026-8492</p>
              <p className="font-bold text-slate-700 text-sm">FIR Registered (BNS 74)</p>
            </div>
            
            <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg mb-5 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-orange-800">Police Investigation</p>
                <p className="text-xs text-orange-600 mt-1 font-medium">Status: In Progress</p>
              </div>
            </div>

            <button 
              onClick={() => navigate('/tracker')}
              className="w-full bg-slate-50 hover:bg-slate-100 hover:border-slate-300 text-slate-700 border border-slate-200 py-2.5 rounded-lg text-sm font-bold transition flex items-center justify-center gap-2 group"
            >
              View Full Timeline <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Know Your Rights - Educational Widget */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm">
            <h3 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" /> Know Your Rights
            </h3>
            <p className="text-sm text-blue-800 font-medium leading-relaxed">
              <strong>Article 39A of the Indian Constitution</strong> ensures that justice is not denied to any citizen by reason of economic disabilities. Women, children, and low-income citizens are entitled to 100% free legal representation.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
