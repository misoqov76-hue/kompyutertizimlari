import React, { useState, useEffect } from 'react';
import { TERMS_DATABASE, TermItem } from '../data/termsData';
import { Terminal, Zap, BookOpen, Check, X, RotateCcw, Award, Lightbulb, Quote } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TermsMasterProps {
  onAddScore: (points: number) => void;
}

export const TermsMasterGame: React.FC<TermsMasterProps> = ({ onAddScore }) => {
  const [activeMode, setActiveMode] = useState<'flashcards' | 'speedTest'>('flashcards');
  const [selectedCategory, setSelectedCategory] = useState<string>('Barchasi');

  // Flashcard state
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Speed Challenge state
  const [quizIndex, setQuizIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [challengeScore, setChallengeScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [selectedOpt, setSelectedOpt] = useState<"A" | "B" | "C" | null>(null);
  const [showAnswerFeedback, setShowAnswerFeedback] = useState<boolean>(false);

  const categories = ['Barchasi', 'Protsessor', 'Xotira', 'Tizim va Shina', 'Mikrodastur', 'Quvvat'];

  const filteredTerms = selectedCategory === 'Barchasi'
    ? TERMS_DATABASE
    : TERMS_DATABASE.filter(t => t.category === selectedCategory);

  const currentTerm = filteredTerms[activeCardIndex] || filteredTerms[0];
  const challengeQuestion = TERMS_DATABASE[quizIndex % TERMS_DATABASE.length];

  // Timer countdown for speed test
  useEffect(() => {
    let timer: any;
    if (isTimerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setIsGameOver(true);
      onAddScore(challengeScore);
      if (challengeScore >= 50) {
        confetti({ particleCount: 70, spread: 60 });
      }
    }
    return () => clearInterval(timer);
  }, [isTimerRunning, timeLeft, challengeScore, onAddScore]);

  const startChallenge = () => {
    setQuizIndex(0);
    setTimeLeft(60);
    setChallengeScore(0);
    setStreak(0);
    setIsGameOver(false);
    setSelectedOpt(null);
    setShowAnswerFeedback(false);
    setIsTimerRunning(true);
  };

  const handleAnswerChallenge = (choice: "A" | "B" | "C") => {
    if (showAnswerFeedback || !isTimerRunning) return;

    setSelectedOpt(choice);
    setShowAnswerFeedback(true);

    const isCorrect = choice === challengeQuestion.correctOption;

    if (isCorrect) {
      const bonus = streak >= 3 ? 15 : 10;
      setChallengeScore((prev) => prev + bonus);
      setStreak((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setSelectedOpt(null);
      setShowAnswerFeedback(false);
      setQuizIndex((prev) => prev + 1);
    }, 1000);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setActiveCardIndex((prev) => (prev + 1) % filteredTerms.length);
  };

  const prevCard = () => {
    setIsFlipped(false);
    setActiveCardIndex((prev) => (prev - 1 + filteredTerms.length) % filteredTerms.length);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Game Header */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 rounded-2xl p-6 border border-amber-800/40 mb-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-xs font-semibold border border-amber-500/30 mb-2">
              <Terminal className="w-3.5 h-3.5" />
              <span>Kompyuter Tizimlari Atamalari va Qisqartmalari</span>
            </div>
            <h2 className="text-2xl font-black text-slate-100 tracking-tight">
              "Atamalarni Top" Interaktiv O'yini
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              RAM, ROM, CPU, BIOS, POST, ALU, CMOS, PCIe, DMA va boshqa barcha fundamental apparat qisqartmalarini yod oling va sinovdan o'ting!
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveMode('flashcards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeMode === 'flashcards'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Karta Mashqi (Flashcards)</span>
            </button>
            <button
              onClick={() => setActiveMode('speedTest')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeMode === 'speedTest'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-yellow-300" />
              <span>60s Tezkor Sinov</span>
            </button>
          </div>
        </div>
      </div>

      {activeMode === 'flashcards' ? (
        /* MODE 1: Interactive Flip Flashcards */
        <div className="space-y-6">
          {/* Category Filter Pills */}
          <div className="flex items-center flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveCardIndex(0);
                  setIsFlipped(false);
                }}
                className={`text-xs px-3 py-1.5 rounded-lg border transition ${
                  selectedCategory === cat
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Flashcard container */}
          <div className="max-w-2xl mx-auto">
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="min-h-[360px] bg-slate-900/90 rounded-2xl p-8 border border-slate-700 shadow-2xl cursor-pointer hover:border-amber-500/50 transition duration-300 flex flex-col justify-between relative group"
            >
              {/* Card Header */}
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
                <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  {currentTerm.category}
                </span>
                <span>
                  {activeCardIndex + 1} / {filteredTerms.length}
                </span>
              </div>

              {/* Card Body */}
              <div className="py-6 text-center">
                {!isFlipped ? (
                  <div className="space-y-4">
                    <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase">
                      Qisqartma (Acronym):
                    </span>
                    <h3 className="text-5xl font-black text-amber-400 tracking-wider">
                      {currentTerm.acronym}
                    </h3>
                    <p className="text-xs text-slate-400 mt-2">
                      Kengaytmasi va vazifasini eslang, so'ng kartani bosing!
                    </p>
                    <div className="inline-flex items-center gap-1.5 text-xs text-amber-400/80 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-500/30">
                      <Lightbulb className="w-3.5 h-3.5" />
                      <span>Javobni ochish uchun cherting</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 text-left animate-in fade-in zoom-in-95 duration-200">
                    <div className="text-center pb-2 border-b border-slate-800">
                      <span className="text-2xl font-black text-amber-400">
                        {currentTerm.acronym}
                      </span>
                      <div className="text-xs font-semibold text-slate-200 mt-0.5">
                        {currentTerm.fullNameEn}
                      </div>
                      <div className="text-xs text-cyan-400 font-medium">
                        ({currentTerm.fullNameUz})
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 leading-relaxed pt-1">
                      <strong className="text-slate-100">Vazifasi: </strong>
                      {currentTerm.definition}
                    </div>

                    <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-xs text-amber-200/90 italic">
                      "{currentTerm.analogyOrTip}"
                    </div>

                    <div className="text-[11px] text-indigo-300 flex items-start gap-1.5 pt-1">
                      <Quote className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                      <span>{currentTerm.teacherNote}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Card Footer controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
                <span className="text-[11px] text-slate-500">
                  Aylantirish uchun kartaga bosing
                </span>
                <span className="text-amber-400 font-semibold group-hover:underline">
                  {isFlipped ? "Qaytadan yashirish ↑" : "Tushuntirishni ko'rish ↓"}
                </span>
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between gap-4 mt-4">
              <button
                onClick={prevCard}
                className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition"
              >
                ← Oldingi Atama
              </button>
              <button
                onClick={nextCard}
                className="flex-1 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-amber-600/20 transition"
              >
                Keyingi Atama →
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* MODE 2: 60-Second Speed Quiz Challenge */
        <div className="max-w-2xl mx-auto space-y-6">
          {!isTimerRunning && !isGameOver ? (
            <div className="bg-slate-900/90 rounded-2xl p-8 border border-slate-700 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/40">
                <Zap className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-xl font-bold text-slate-100">
                60 Soniyalik Tezkor Atama Sinovi
              </h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                60 soniya ichida imkon qadar ko'p kompyuter atamalari va qisqartmalarining to'g'ri variantini (A, B, C) toping! Har bir ketma-ket to'g'ri javob streak ball beradi.
              </p>
              <button
                onClick={startChallenge}
                className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-amber-600/30 transition active:scale-95"
              >
                Sinovni Boshlash! (60s)
              </button>
            </div>
          ) : isGameOver ? (
            <div className="bg-slate-900/90 rounded-2xl p-8 border border-slate-700 text-center space-y-4 animate-in zoom-in-95">
              <Award className="w-14 h-14 text-yellow-400 mx-auto" />
              <h3 className="text-xl font-bold text-slate-100">
                Vaqt Tugadi! Sinov Natijasi
              </h3>
              <div className="text-3xl font-black text-amber-400">
                +{challengeScore} Ball To'pladingiz!
              </div>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Ustozingiz Isoqov Muzaffar: "Atamalarni tez va to'g'ri ajrata olishingiz apparat arxitekturasini qanchalik chuqur o'zlashtirganingizni ko'rsatadi!"
              </p>
              <button
                onClick={startChallenge}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-xl border border-slate-700 mx-auto transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Qaytadan Sinab Ko'rish</span>
              </button>
            </div>
          ) : (
            <div className="bg-slate-900/90 rounded-2xl p-6 border border-slate-700 space-y-6">
              {/* Challenge Status Bar */}
              <div className="flex items-center justify-between text-xs font-mono border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Vaqt:</span>
                  <span
                    className={`font-black text-sm px-2 py-0.5 rounded ${
                      timeLeft <= 10
                        ? 'bg-rose-950 text-rose-400 border border-rose-500 animate-ping'
                        : 'bg-slate-800 text-amber-300'
                    }`}
                  >
                    {timeLeft} soniya
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-slate-400">
                    Streak: <strong className="text-yellow-400">x{streak}</strong>
                  </span>
                  <span className="bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30 font-bold">
                    {challengeScore} Ball
                  </span>
                </div>
              </div>

              {/* Question */}
              <div className="space-y-2">
                <div className="text-xs font-mono text-cyan-400">
                  Savol #{quizIndex + 1} • {challengeQuestion.acronym}
                </div>
                <h4 className="text-sm font-bold text-slate-100 leading-snug">
                  {challengeQuestion.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {challengeQuestion.options.map((opt) => {
                  const isSelected = selectedOpt === opt.id;
                  const isCorrect = challengeQuestion.correctOption === opt.id;

                  let optStyle = 'bg-slate-950 border-slate-800 hover:bg-slate-900 text-slate-200';

                  if (showAnswerFeedback) {
                    if (isCorrect) {
                      optStyle = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'bg-rose-950/70 border-rose-500 text-rose-200 font-bold';
                    } else {
                      optStyle = 'bg-slate-950/40 border-slate-900 opacity-40 text-slate-500';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleAnswerChallenge(opt.id)}
                      disabled={showAnswerFeedback}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition flex items-start gap-2.5 ${optStyle}`}
                    >
                      <span className="w-5 h-5 rounded-md bg-slate-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 text-slate-200">
                        {opt.id}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt.text}</span>
                      {showAnswerFeedback && isCorrect && (
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      )}
                      {showAnswerFeedback && isSelected && !isCorrect && (
                        <X className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
