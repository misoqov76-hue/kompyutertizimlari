import React, { useState } from 'react';
import { DETECTIVE_CASES, DetectiveCase } from '../data/detectiveCases';
import { playBeepPattern } from '../utils/audioBeep';
import { ShieldAlert, Volume2, Sparkles, CheckCircle2, XCircle, Wrench, Quote, RotateCcw, HelpCircle, Activity, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DetectiveGameProps {
  onAddScore: (points: number) => void;
  onCaseSolved: () => void;
}

export const DetectiveGame: React.FC<DetectiveGameProps> = ({ onAddScore, onCaseSolved }) => {
  const [casesList, setCasesList] = useState<DetectiveCase[]>(DETECTIVE_CASES);
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<"A" | "B" | "C" | null>(null);
  const [customAnswer, setCustomAnswer] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isGeneratingAiCase, setIsGeneratingAiCase] = useState<boolean>(false);
  const [feedbackData, setFeedbackData] = useState<{
    isCorrect: boolean;
    score: number;
    feedback: string;
    practicalFix: string;
    teacherPraise: string;
  } | null>(null);

  const currentCase = casesList[activeCaseIndex] || casesList[0];

  const handlePlaySound = async () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);
    await playBeepPattern(currentCase.beepPattern);
    setIsPlayingAudio(false);
  };

  const handleSelectCase = (index: number) => {
    setActiveCaseIndex(index);
    setSelectedOption(null);
    setCustomAnswer('');
    setIsSubmitted(false);
    setShowHint(false);
    setFeedbackData(null);
  };

  const handleCheckDiagnosis = async () => {
    if (!selectedOption && !customAnswer.trim()) {
      alert("Iltimos, variantlardan birini (A, B, C) tanlang yoki o'z tashxisingizni yozing!");
      return;
    }

    setIsSubmitted(true);

    const isOptionCorrect = selectedOption === currentCase.correctOption;
    let studentText = selectedOption
      ? `${selectedOption}-variant: ${currentCase.options.find(o => o.id === selectedOption)?.text}`
      : customAnswer;

    // Check with backend or local fallback
    try {
      const res = await fetch('/api/detective/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseTitle: currentCase.title,
          symptoms: currentCase.symptoms,
          studentAnswer: studentText,
          correctOption: currentCase.correctOption,
          options: currentCase.options,
        })
      });

      const result = await res.json();
      setFeedbackData({
        isCorrect: result.isCorrect ?? isOptionCorrect,
        score: result.score ?? (isOptionCorrect ? 100 : 35),
        feedback: result.feedback || (isOptionCorrect ? "Tashxis mutlaqo to'g'ri qo'yildi!" : "Tashxisda noaniqlik mavjud."),
        practicalFix: result.practicalFix || currentCase.practicalFix,
        teacherPraise: result.teacherPraise || currentCase.teacherAdvice,
      });

      if (result.isCorrect ?? isOptionCorrect) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        onAddScore(50);
        onCaseSolved();
      } else {
        onAddScore(15);
      }
    } catch {
      // Local fallback
      const correct = isOptionCorrect;
      setFeedbackData({
        isCorrect: correct,
        score: correct ? 100 : 30,
        feedback: correct
          ? `Ofarin! Siz muammoni aniq topdingiz.`
          : `Tashxis noto'g'ri. To'g'ri javob: ${currentCase.correctOption}-variant.`,
        practicalFix: currentCase.practicalFix,
        teacherPraise: currentCase.teacherAdvice,
      });
      if (correct) {
        onAddScore(50);
        onCaseSolved();
      }
    }
  };

  const handleGenerateAiCase = async () => {
    try {
      setIsGeneratingAiCase(true);
      const res = await fetch('/api/detective/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty: "o'rta" })
      });

      const newCaseData = await res.json();
      if (newCaseData.title && newCaseData.options) {
        const generatedCase: DetectiveCase = {
          id: `ai-case-${Date.now()}`,
          caseNumber: casesList.length + 1,
          title: newCaseData.title,
          difficulty: "O'rta",
          systemSpecs: newCaseData.systemSpecs || "PC Core i5 / DDR4 / Ona plata",
          symptoms: newCaseData.symptoms,
          beepPattern: "3-short",
          beepDescription: "Diagnostika signallari",
          postCode: "DEBUG POST ERROR",
          visualClue: newCaseData.labObservations || "Laboratoriya ko'rigi",
          question: newCaseData.question || "Muammo qaysi apparat qismida?",
          hint: newCaseData.hint || "Elektr zanjiri va kontaktlarni tekshiring.",
          options: newCaseData.options,
          correctOption: newCaseData.correctOption || "A",
          detailedExplanation: newCaseData.detailedExplanation || "Texnik tahlil",
          practicalFix: "Apparat qismini tozalash va to'g'ri o'rnatish.",
          teacherAdvice: newCaseData.teacherAdvice || "Ustoz Isoqov Muzaffar: 'Amaliy ko'nikma barcha muammolarni yechish kalitidir!'"
        };

        setCasesList(prev => [generatedCase, ...prev]);
        setActiveCaseIndex(0);
        setSelectedOption(null);
        setCustomAnswer('');
        setIsSubmitted(false);
        setFeedbackData(null);
      }
    } catch (e) {
      console.error(e);
      alert("AI holat yaratishda xatolik yuz berdi. Iltimos mavjud holatlardan foydalaning.");
    } finally {
      setIsGeneratingAiCase(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 rounded-2xl p-6 border border-rose-800/40 mb-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 text-xs font-semibold border border-rose-500/30 mb-2">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Interaktiv Diagnostika Simulyatori</span>
            </div>
            <h2 className="text-2xl font-black text-slate-100 tracking-tight flex items-center gap-2">
              <span>"Kompyuter Detektivi"</span>
              <span className="text-xs font-mono font-normal bg-rose-950 text-rose-300 px-2 py-0.5 rounded border border-rose-600/40">
                Nosozlikni Qidirish
              </span>
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Kompyuterdagi apparat nosozliklarini audio BIOS beep tovushlari, POST xato kodlari va vizual belgilar orqali fosh qiling.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleGenerateAiCase}
              disabled={isGeneratingAiCase}
              className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-rose-600/20 transition active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>{isGeneratingAiCase ? "Yangi holat yaratilmoqda..." : "Yangi AI Detektiv Ishi"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Case Selector */}
        <div className="lg:col-span-4 space-y-2">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Detektiv Ishlar ({casesList.length})
            </span>
            <span className="text-[11px] text-rose-400 font-mono">
              Isoqov Muzaffar Ustaxonasi
            </span>
          </div>

          <div className="space-y-2 max-h-[750px] overflow-y-auto pr-1">
            {casesList.map((c, idx) => {
              const isSelected = idx === activeCaseIndex;
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectCase(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex items-start gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-rose-500 shadow-lg shadow-rose-950/40 text-white'
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/60 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-rose-600 text-white font-black'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    #{c.caseNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono text-rose-400">
                        Qiyinlik: {c.difficulty}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
                      )}
                    </div>
                    <div className="text-xs font-bold text-slate-100 line-clamp-1 mt-0.5">
                      {c.title}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {c.symptoms}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Case Details & Investigation */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
            {/* Case Title & System Specs */}
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                  ISH #{currentCase.caseNumber} • {currentCase.difficulty} DARAJA
                </span>
                <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  {currentCase.systemSpecs}
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-slate-100">
                {currentCase.title}
              </h3>
            </div>

            {/* Diagnostic Clue Board */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Audio Beep Simulator */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-mono uppercase text-slate-400">
                      Birlamchi Tovush (Speaker Beep)
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="text-xs font-semibold text-slate-200">
                    {currentCase.beepDescription}
                  </div>
                </div>

                <button
                  onClick={handlePlaySound}
                  disabled={isPlayingAudio}
                  className="w-full py-2.5 px-3 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-cyan-600/20 transition active:scale-95"
                >
                  <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'animate-bounce text-yellow-300' : ''}`} />
                  <span>{isPlayingAudio ? "Signal yangramoqda..." : "Speaker Signalini Tinglash"}</span>
                </button>
              </div>

              {/* POST Code and Visual Observation */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div>
                  <div className="text-xs font-mono uppercase text-slate-400 mb-1">
                    POST Indikator / Hex Karta
                  </div>
                  <div className="inline-block bg-slate-900 border border-red-500/40 px-3 py-1 rounded text-red-400 font-mono font-black text-sm tracking-widest shadow-inner">
                    {currentCase.postCode}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase text-slate-400 mb-1">
                    Vizual Ko'zdan Kechirish (Lab Clue)
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2 rounded border border-slate-800/80">
                    {currentCase.visualClue}
                  </p>
                </div>
              </div>
            </div>

            {/* Symptoms Description */}
            <div className="bg-rose-950/20 border border-rose-500/30 rounded-xl p-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-1.5 flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-rose-400" />
                <span>Mijozning Shikoyati va Alomatlar:</span>
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                "{currentCase.symptoms}"
              </p>
            </div>

            {/* Hint toggler */}
            <div>
              {!showHint ? (
                <button
                  onClick={() => setShowHint(true)}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Maslahat va yo'naltiruvchi shifobaxsh faktni ko'rish</span>
                </button>
              ) : (
                <div className="text-xs bg-amber-950/30 border border-amber-500/40 text-amber-200 p-3 rounded-xl">
                  <strong>Yo'naltiruvchi Maslahat:</strong> {currentCase.hint}
                </div>
              )}
            </div>

            {/* Question & 3-Choice Options (A, B, C) */}
            <div className="space-y-4 pt-2 border-t border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-slate-100">
                  {currentCase.question}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  ⚠️ Qoida: To'g'ri tashxis faqat siz javob bergach ochiladi va baholanadi.
                </p>
              </div>

              <div className="space-y-2.5">
                {currentCase.options.map((opt) => {
                  const isOptSelected = selectedOption === opt.id;
                  const isThisCorrect = currentCase.correctOption === opt.id;

                  let optClass = 'bg-slate-950 border-slate-800 hover:bg-slate-900 text-slate-300';

                  if (!isSubmitted) {
                    if (isOptSelected) {
                      optClass = 'bg-rose-950/70 border-rose-500 text-rose-200 font-semibold shadow-md';
                    }
                  } else {
                    if (isThisCorrect) {
                      optClass = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isOptSelected && !isThisCorrect) {
                      optClass = 'bg-rose-950/70 border-rose-500 text-rose-200 font-bold';
                    } else {
                      optClass = 'bg-slate-950/40 border-slate-850 opacity-50 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => !isSubmitted && setSelectedOption(opt.id)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs transition flex items-start gap-3 ${optClass}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 text-slate-200">
                        {opt.id}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Or freeform custom diagnosis */}
              {!isSubmitted && (
                <div className="pt-2">
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    Yoki o'z amaliy tashxisingizni yozing:
                  </label>
                  <input
                    type="text"
                    value={customAnswer}
                    onChange={(e) => setCustomAnswer(e.target.value)}
                    placeholder="Masalan: RAM kontaktlari changlangan, tozalash va almashtirish kerak..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              )}

              {/* Action Buttons */}
              {!isSubmitted ? (
                <button
                  onClick={handleCheckDiagnosis}
                  className="w-full py-3 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-rose-600/20 transition active:scale-95"
                >
                  Tashxisni Tekshirish va Ishni Yopish
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setSelectedOption(null);
                    setCustomAnswer('');
                    setFeedbackData(null);
                  }}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Qayta diagnostika qilish</span>
                </button>
              )}
            </div>

            {/* Diagnostic Result & Feedback (Strictly after submit) */}
            {isSubmitted && feedbackData && (
              <div
                className={`p-5 rounded-2xl border space-y-4 animate-in fade-in duration-300 ${
                  feedbackData.isCorrect
                    ? 'bg-emerald-950/30 border-emerald-500/50'
                    : 'bg-rose-950/30 border-rose-500/50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {feedbackData.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-400" />
                    )}
                    <div>
                      <h4 className="text-sm font-bold text-slate-100">
                        {feedbackData.isCorrect
                          ? "Tashxis To'g'ri Qo'yildi!"
                          : "Tashxisda Xatolik Mavjud"}
                      </h4>
                      <span className="text-xs font-mono text-slate-400">
                        Baholash: <strong>{feedbackData.score} / 100 Ball</strong>
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {feedbackData.feedback}
                </p>

                {/* Technical breakdown */}
                <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2">
                  <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5" />
                    <span>Ustaxonada Ta'mirlash Algoritmi (Practical Fix):</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {feedbackData.practicalFix}
                  </p>
                </div>

                {/* Teacher's Praise Quote */}
                <div className="bg-indigo-950/30 border border-indigo-500/30 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-indigo-200">
                  <Quote className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="italic leading-relaxed">
                    "{feedbackData.teacherPraise}"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
