import React from 'react';
import { Cpu, Terminal, ShieldAlert, Award, BookOpen, Sparkles, User, BrainCircuit, Eye } from 'lucide-react';

interface HeaderProps {
  activeTab: 'curriculum' | 'detective' | 'terms' | 'quiz' | 'visual' | 'chat';
  setActiveTab: (tab: 'curriculum' | 'detective' | 'terms' | 'quiz' | 'visual' | 'chat') => void;
  studentName: string;
  studentGroup: string;
  totalScore: number;
  solvedCasesCount: number;
  onOpenProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  studentName,
  studentGroup,
  totalScore,
  solvedCasesCount,
  onOpenProfile,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-cyan-950 via-slate-900 to-indigo-950 border-b border-cyan-800/30 px-4 py-1.5 text-xs text-slate-300 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            Texnikum Ta'limi
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="font-medium text-slate-200">
            Fani: <strong className="text-cyan-400 font-semibold">Kompyuter tizimlari</strong>
          </span>
          <span className="hidden sm:inline text-slate-400">|</span>
          <span className="text-slate-300">
            O'qituvchi: <strong className="text-indigo-300 font-semibold">Isoqov Muzaffar</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenProfile}
            className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2.5 py-1 rounded-md border border-slate-700 transition"
          >
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span className="font-semibold text-slate-100">{studentName || "O'quvchi"}</span>
            <span className="text-slate-400">({studentGroup})</span>
          </button>

          <div className="flex items-center gap-1.5 text-xs font-mono bg-cyan-950/60 text-cyan-300 px-2.5 py-1 rounded-md border border-cyan-500/30">
            <Award className="w-3.5 h-3.5 text-yellow-400" />
            <span>{totalScore} Ball</span>
          </div>
        </div>
      </div>

      {/* Main navigation & title */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('curriculum')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 text-white font-bold ring-2 ring-cyan-400/30">
            <Cpu className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-100 tracking-tight">
                Kompyuter Tizimlari
              </h1>
              <span className="text-[10px] font-mono uppercase bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded border border-cyan-500/40">
                Virtual Repetitor
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Interaktiv darslar, detektiv o'yinlar va aqlli repetitor
            </p>
          </div>
        </div>

        {/* Tab buttons */}
        <nav className="flex items-center flex-wrap gap-1 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('curriculum')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'curriculum'
                ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Mavzular</span>
          </button>

          <button
            onClick={() => setActiveTab('detective')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition relative ${
              activeTab === 'detective'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-300" />
            <span>Kompyuter Detektivi</span>
            {solvedCasesCount > 0 && (
              <span className="bg-rose-950 text-rose-300 text-[10px] font-mono px-1.5 py-0.2 rounded-full border border-rose-500/40">
                {solvedCasesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'terms'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-4 h-4 text-amber-300" />
            <span>Atamalarni Top</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'quiz'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-4 h-4 text-emerald-300" />
            <span>3-Variantli Testlar</span>
          </button>

          <button
            onClick={() => setActiveTab('visual')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'visual'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Eye className="w-4 h-4 text-purple-300" />
            <span>Rasmli Topshiriqlar</span>
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'chat'
                ? 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40'
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>AI Repetitor</span>
            <Sparkles className="w-3 h-3 text-yellow-300" />
          </button>
        </nav>
      </div>
    </header>
  );
};
