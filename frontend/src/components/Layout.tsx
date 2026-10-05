import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Disclaimer } from './Disclaimer';
import { LionStambh } from './LionStambh';
import { IndianFlag } from './IndianFlag';
import { LogOut, Home, Briefcase, Scale, Search, Users, Cpu, Gavel, Clock, BookOpen } from 'lucide-react';

export const Layout = () => {
  const { role, user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  if (!role) {
    return <Outlet />;
  }

  return (
    <div className="flex h-screen bg-[#f4f6f8] font-sans text-slate-900 overflow-hidden">
      
      {/* Sidebar for logged-in users */}
      {role && (
        <div className="w-64 bg-[#0C2340] text-slate-300 flex flex-col shadow-xl z-10 border-r border-[#D4AF37]/30">
          <div className="p-5 border-b border-slate-700/60 flex items-center gap-3 text-white tracking-wide">
            <LionStambh size={32} monochrome className="text-amber-400 shrink-0" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-black tracking-tight">NyayaSetu</span>
                <IndianFlag width={18} height={12} />
              </div>
              <span className="text-[10px] text-amber-400/90 font-serif font-semibold">सत्यमेव जयते</span>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-1.5 mt-4 overflow-y-auto">
            {role !== 'judge' && (
              <Link 
                to="/dashboard" 
                className={`flex items-center gap-3 p-3 rounded-lg transition group border-l-4 ${
                  isActive('/dashboard') 
                    ? 'bg-white/15 text-white border-orange-500 font-semibold' 
                    : 'border-transparent text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Home className={`h-5 w-5 ${isActive('/dashboard') ? 'text-orange-500' : 'group-hover:text-orange-500'} transition`} /> Dashboard
              </Link>
            )}
            
            {role === 'citizen' && (
              <>
                <Link 
                  to="/search" 
                  className={`flex items-center gap-3 p-3 rounded-lg transition group border-l-4 ${
                    isActive('/search') 
                      ? 'bg-white/15 text-white border-orange-500 font-semibold' 
                      : 'border-transparent text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Search className={`h-5 w-5 ${isActive('/search') ? 'text-orange-500' : 'group-hover:text-orange-500'} transition`} /> AI Legal Search
                </Link>
                <Link 
                  to="/tracker" 
                  className={`flex items-center gap-3 p-3 rounded-lg transition group border-l-4 ${
                    isActive('/tracker') 
                      ? 'bg-white/15 text-white border-orange-500 font-semibold' 
                      : 'border-transparent text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Scale className={`h-5 w-5 ${isActive('/tracker') ? 'text-orange-500' : 'group-hover:text-orange-500'} transition`} /> Case Tracker
                </Link>
                <Link 
                  to="/advocates" 
                  className={`flex items-center gap-3 p-3 rounded-lg transition group border-l-4 ${
                    isActive('/advocates') 
                      ? 'bg-white/15 text-white border-orange-500 font-semibold' 
                      : 'border-transparent text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Users className={`h-5 w-5 ${isActive('/advocates') ? 'text-orange-500' : 'group-hover:text-orange-500'} transition`} /> Find Advocate
                </Link>
              </>
            )}
            
            {role === 'advocate' && (
              <>
                <Link 
                  to="/matters" 
                  className={`flex items-center gap-3 p-3 rounded-lg transition group border-l-4 ${
                    isActive('/matters') 
                      ? 'bg-white/15 text-white border-blue-500 font-semibold' 
                      : 'border-transparent text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Briefcase className={`h-5 w-5 ${isActive('/matters') ? 'text-blue-400' : 'group-hover:text-blue-400'} transition`} /> My Matters
                </Link>
                <Link 
                  to="/tools" 
                  className={`flex items-center gap-3 p-3 rounded-lg transition group border-l-4 ${
                    isActive('/tools') 
                      ? 'bg-white/15 text-white border-blue-500 font-semibold' 
                      : 'border-transparent text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Scale className={`h-5 w-5 ${isActive('/tools') ? 'text-blue-400' : 'group-hover:text-blue-400'} transition`} /> AI Legal Suite
                </Link>
              </>
            )}
            
            {role === 'judge' && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center gap-3 p-3 rounded-lg transition group border-l-4 ${
                    isActive('/dashboard') 
                      ? 'bg-white/15 text-white border-amber-400 font-semibold' 
                      : 'border-transparent text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Home className={`h-5 w-5 ${isActive('/dashboard') ? 'text-amber-400' : 'group-hover:text-amber-400'} transition`} /> Chambers Dashboard
                </Link>
                <Link 
                  to="/docket" 
                  className={`flex items-center gap-3 p-3 rounded-lg transition group border-l-4 ${
                    isActive('/docket') 
                      ? 'bg-white/15 text-white border-amber-400 font-semibold' 
                      : 'border-transparent text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Gavel className={`h-5 w-5 ${isActive('/docket') ? 'text-amber-400' : 'group-hover:text-amber-400'} transition`} /> Smart Docket & Cause List
                </Link>
                <Link 
                  to="/undertrials" 
                  className={`flex items-center gap-3 p-3 rounded-lg transition group border-l-4 ${
                    isActive('/undertrials') 
                      ? 'bg-white/15 text-white border-amber-400 font-semibold' 
                      : 'border-transparent text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Clock className={`h-5 w-5 ${isActive('/undertrials') ? 'text-amber-400' : 'group-hover:text-amber-400'} transition`} /> Sec 479 Undertrial Triage
                </Link>
                <Link 
                  to="/judge-tools" 
                  className={`flex items-center gap-3 p-3 rounded-lg transition group border-l-4 ${
                    isActive('/judge-tools') 
                      ? 'bg-white/15 text-white border-amber-400 font-semibold' 
                      : 'border-transparent text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <BookOpen className={`h-5 w-5 ${isActive('/judge-tools') ? 'text-amber-400' : 'group-hover:text-amber-400'} transition`} /> Bench AI & Orders
                </Link>
              </>
            )}

            {/* Universal Data Science Core Link */}
            <div className="pt-2 border-t border-slate-700/40">
              <Link 
                to="/analytics" 
                className={`flex items-center gap-3 p-3 rounded-lg transition group border-l-4 ${
                  isActive('/analytics') 
                    ? 'bg-indigo-900/60 text-white border-indigo-400 font-semibold' 
                    : 'border-transparent bg-indigo-950/40 text-indigo-200 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Cpu className="h-5 w-5 group-hover:text-indigo-400 text-indigo-400 transition" /> ML Analytics & XAI
              </Link>
            </div>
          </nav>
          
          <div className="p-4 border-t border-slate-700/50">
            <button 
              onClick={logout} 
              className="flex items-center gap-3 p-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg w-full transition"
            >
              <LogOut className="h-5 w-5" /> Sign Out
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Disclaimer />
        
        <header className="bg-white border-b border-slate-200 p-4 px-8 flex justify-between items-center shadow-xs z-0">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-[#1a2a40] capitalize tracking-tight">
              {role ? `${role} Portal` : 'Welcome to NyayaSetu'}
            </h1>
            <span className="hidden sm:inline-block text-[11px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              e-Courts Phase III
            </span>
          </div>
          {role && (
            <div className="flex items-center gap-3">
              {user && (
                <div className="hidden md:flex flex-col text-right">
                  <span className="text-xs font-bold text-slate-800">{user.name}</span>
                  <span className="text-[10px] font-mono text-emerald-700 font-semibold flex items-center justify-end gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {user.idNumber} • Verified
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full text-xs font-bold text-slate-700">
                <IndianFlag width={20} height={13} />
                <span className="capitalize">{role}</span>
              </div>
              <div className="h-9 w-9 rounded-full bg-[#0C2340] flex items-center justify-center text-white font-bold shadow-sm">
                {role.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
        </header>
        
        <main className="flex-1 overflow-y-auto p-8 bg-[#f4f6f8]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
