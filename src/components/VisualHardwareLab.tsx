import React, { useState } from 'react';
import { VISUAL_TASKS, VisualTask } from '../data/visualHardwareData';
import { HardwareSvgDiagram } from './HardwareSvgDiagrams';
import { Eye, CheckCircle2, XCircle, RotateCcw, Wrench, Quote, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VisualHardwareLabProps {
  onAddScore: (points: number) => void;
}

export const VisualHardwareLab: React.FC<VisualHardwareLabProps> = ({ onAddScore }) => {
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | "C" | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const currentTask: VisualTask = VISUAL_TASKS[activeTaskIndex] || VISUAL_TASKS[0];

  const handleSelectTask = (index: number) => {
    setActiveTaskIndex(index);
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption) {
      alert("Iltimos, avval variantlardan birini (A, B, C) tanlang!");
      return;
    }

    setIsSubmitted(true);
    const isCorrect = selectedOption === currentTask.correctOption;

    if (isCorrect) {
      confetti({ particleCount: 80, spread: 60 });
      onAddScore(35);
    } else {
      onAddScore(10);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-2xl p-6 border border-purple-800/40 mb-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-semibold border border-purple-500/30 mb-2">
              <Eye className="w-3.5 h-3.5" />
              <span>Vizual va Tasviriy Qurilma Laboratoriyasi</span>
            </div>
            <h2 className="text-2xl font-black text-slate-100 tracking-tight">
              Rasmli va Tasviriy Topshiriqlar
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Kompyuter apparat qismlarining sxematik tuzilishi va fizik tasviriga qarab qaysi qurilma ekanini aniqlang. Javoblar faqat topshiriq topshirilgach izohlanadi!
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Tasks Selector */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 px-2 block mb-2">
            Topshiriqlar ({VISUAL_TASKS.length})
          </span>

          <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1">
            {VISUAL_TASKS.map((task, idx) => {
              const isSelected = idx === activeTaskIndex;
              return (
                <button
                  key={task.id}
                  onClick={() => handleSelectTask(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex items-start gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-purple-500 shadow-lg shadow-purple-950/40 text-white'
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/60 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-purple-600 text-white font-black'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    #{task.taskNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono text-purple-400">
                      {task.category}
                    </div>
                    <div className="text-xs font-bold text-slate-100 line-clamp-1 mt-0.5">
                      {task.title}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Visual Task */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
            {/* Header */}
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-purple-400">
                  {currentTask.category} • Topshiriq #{currentTask.taskNumber}
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-0.5">
                  {currentTask.title}
                </h3>
              </div>
            </div>

            {/* Interactive Visual Schematic SVG */}
            <HardwareSvgDiagram type={currentTask.svgType} className="w-full h-56" />

            {/* Visual Description & Clues */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 block mb-1">
                  Apparat Tafsiloti va Tasavvur:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed italic bg-slate-900/40 p-2.5 rounded-lg border border-slate-850">
                  "{currentTask.description}"
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                  Ko'zga Tashlanadigan Belgilar (Clues):
                </span>
                <ul className="space-y-1">
                  {currentTask.visualClues.map((c, i) => (
                    <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Question & Options */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-slate-100">
                  {currentTask.question}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  ⚠️ Qoida: To'g'ri javob faqat tekshirish tugmasi bosilgach ochiladi.
                </p>
              </div>

              <div className="space-y-2">
                {currentTask.options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  const isThisCorrect = currentTask.correctOption === opt.id;

                  let style = 'bg-slate-950 border-slate-800 hover:bg-slate-900 text-slate-300';

                  if (!isSubmitted) {
                    if (isSelected) {
                      style = 'bg-purple-950/70 border-purple-500 text-purple-200 font-semibold shadow-md';
                    }
                  } else {
                    if (isThisCorrect) {
                      style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected && !isThisCorrect) {
                      style = 'bg-rose-950/70 border-rose-500 text-rose-200 font-bold';
                    } else {
                      style = 'bg-slate-950/40 border-slate-900 opacity-50 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => !isSubmitted && setSelectedOption(opt.id)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition flex items-start gap-3 ${style}`}
                    >
                      <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 text-slate-200">
                        {opt.id}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {!isSubmitted ? (
                <button
                  onClick={handleCheckAnswer}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-600/20 transition active:scale-95"
                >
                  Topshiriqni Tekshirish
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Qayta urinish</span>
                </button>
              )}
            </div>

            {/* Feedback & Detailed Answer (strictly after submit) */}
            {isSubmitted && (
              <div
                className={`p-5 rounded-2xl border space-y-3 animate-in fade-in duration-300 ${
                  selectedOption === currentTask.correctOption
                    ? 'bg-emerald-950/30 border-emerald-500/50'
                    : 'bg-rose-950/30 border-rose-500/50'
                }`}
              >
                <div className="flex items-center gap-2">
                  {selectedOption === currentTask.correctOption ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-rose-400" />
                  )}
                  <h4 className="text-sm font-bold text-slate-100">
                    {selectedOption === currentTask.correctOption
                      ? "To'g'ri topdingiz (+35 Ball)!"
                      : `Noto'g'ri. To'g'ri javob: ${currentTask.correctOption}-variant`}
                  </h4>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentTask.detailedAnswer}
                </p>

                <div className="bg-indigo-950/30 border border-indigo-500/30 p-3 rounded-xl flex items-start gap-2 text-xs text-indigo-200">
                  <Quote className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="italic">{currentTask.teacherTip}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
