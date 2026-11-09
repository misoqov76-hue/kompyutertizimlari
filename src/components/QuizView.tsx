import React, { useState } from 'react';
import { QUIZ_PACKAGES, QuizPackage } from '../data/quizData';
import { Award, CheckCircle2, XCircle, RotateCcw, Clock, Quote, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizViewProps {
  onAddScore: (points: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ onAddScore }) => {
  const [activePackageId, setActivePackageId] = useState<string>(QUIZ_PACKAGES[0].id);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, "A" | "B" | "C">>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [resultScore, setResultScore] = useState<{
    correctCount: number;
    total: number;
    percentage: number;
    awardedPoints: number;
    gradeText: string;
    teacherComment: string;
  } | null>(null);

  const currentPackage: QuizPackage = QUIZ_PACKAGES.find(p => p.id === activePackageId) || QUIZ_PACKAGES[0];

  const handleSelectPackage = (id: string) => {
    setActivePackageId(id);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setResultScore(null);
  };

  const handleSelectOption = (questionId: number, optionKey: "A" | "B" | "C") => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionKey,
    }));
  };

  const handleSubmitTest = () => {
    const answeredCount = Object.keys(selectedAnswers).length;
    if (answeredCount < currentPackage.questions.length) {
      const confirmSubmit = window.confirm(
        `Siz ${currentPackage.questions.length} ta savoldan faqat ${answeredCount} tasiga javob berdingiz. Baribir tekshirishni xohlaysizmi?`
      );
      if (!confirmSubmit) return;
    }

    let correct = 0;
    currentPackage.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctKey) {
        correct++;
      }
    });

    const total = currentPackage.questions.length;
    const percentage = Math.round((correct / total) * 100);
    const awarded = correct * 10;

    let gradeText = "Qoniqarsiz";
    let comment = "Ustoz Isoqov Muzaffar: 'Natijadan xafa bo'lmang. Mavzular bo'limini qayta ko'rib chiqib, o'z ustingizda ishlang!'";

    if (percentage >= 85) {
      gradeText = "A'lo (5)";
      comment = "Ustozingiz Isoqov Muzaffar: 'Ofarin! Siz kompyuter tizimlari apparat ta'minotini mukammal o'zlashtiribsiz!'";
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } else if (percentage >= 70) {
      gradeText = "Yaxshi (4)";
      comment = "Ustozingiz Isoqov Muzaffar: 'Yaxshi natija! Bir nechta nozik nuqtalarga e'tibor qaratsangiz, a'lo darajaga erishasiz!'";
    } else if (percentage >= 50) {
      gradeText = "Qoniqarli (3)";
      comment = "Ustozingiz Isoqov Muzaffar: 'Baza bor, ammo amaliy bilim va atamalarni ko'proq takrorlash kerak.'";
    }

    setIsSubmitted(true);
    setResultScore({
      correctCount: correct,
      total,
      percentage,
      awardedPoints: awarded,
      gradeText,
      teacherComment: comment,
    });

    onAddScore(awarded);
  };

  const handleResetTest = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setResultScore(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 rounded-2xl p-6 border border-emerald-800/40 mb-6 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/30 mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>3-Variantli (A, B, C) Nazorat Testlari</span>
            </div>
            <h2 className="text-2xl font-black text-slate-100 tracking-tight">
              Kompyuter Tizimlari Test Markazi
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Mavzular bo'yicha saralangan 3 ta aniq variantli testlar. Javoblar aslo darhol ko'rsatilmaydi — o'zingiz mustaqil yechgach, to'liq tahlil va izohlarga ega bo'lasiz.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
            <Clock className="w-4 h-4 text-emerald-400" />
            <span>Tavsiya etilgan vaqt: {currentPackage.durationMinutes} daqiqa</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Package Selector */}
        <div className="lg:col-span-4 space-y-2">
          <span className="text-xs font-mono uppercase tracking-wider text-slate-400 px-2 block mb-2">
            Test Paketlari ({QUIZ_PACKAGES.length})
          </span>

          <div className="space-y-2">
            {QUIZ_PACKAGES.map((pkg) => {
              const isSelected = pkg.id === activePackageId;
              return (
                <button
                  key={pkg.id}
                  onClick={() => handleSelectPackage(pkg.id)}
                  className={`w-full text-left p-3.5 rounded-xl border transition flex items-start gap-3 ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 shadow-lg shadow-emerald-950/40 text-white'
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-900/60 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-emerald-600 text-white font-black'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {pkg.questions.length}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-mono text-emerald-400">
                      {pkg.category}
                    </div>
                    <div className="text-xs font-bold text-slate-100 line-clamp-1 mt-0.5">
                      {pkg.title}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {pkg.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Quiz Questions */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
            {/* Package details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {currentPackage.category}
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-1">
                  {currentPackage.title}
                </h3>
              </div>

              <div className="text-xs text-slate-400 font-mono">
                Belgilangan javoblar:{' '}
                <strong className="text-emerald-400">
                  {Object.keys(selectedAnswers).length} / {currentPackage.questions.length}
                </strong>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-5">
              {currentPackage.questions.map((q, idx) => {
                const userChoice = selectedAnswers[q.id];
                const isCorrect = userChoice === q.correctKey;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border transition ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-950/20 border-emerald-500/40'
                          : 'bg-rose-950/20 border-rose-500/40'
                        : 'bg-slate-950/60 border-slate-800'
                    }`}
                  >
                    <div className="text-xs font-semibold text-slate-100 mb-3 flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[11px] font-mono font-bold shrink-0 mt-0.5 text-slate-300">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{q.question}</span>
                    </div>

                    {/* Options (A, B, C) */}
                    <div className="space-y-2">
                      {q.options.map((opt) => {
                        const isChosen = userChoice === opt.key;
                        const isThisCorrect = q.correctKey === opt.key;

                        let style = 'bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-300';

                        if (!isSubmitted) {
                          if (isChosen) {
                            style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-semibold shadow-sm';
                          }
                        } else {
                          if (isThisCorrect) {
                            style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200 font-bold';
                          } else if (isChosen && !isThisCorrect) {
                            style = 'bg-rose-950/70 border-rose-500 text-rose-200 font-bold';
                          } else {
                            style = 'bg-slate-900/40 border-slate-900 opacity-50 text-slate-500';
                          }
                        }

                        return (
                          <button
                            key={opt.key}
                            onClick={() => handleSelectOption(q.id, opt.key)}
                            disabled={isSubmitted}
                            className={`w-full text-left p-3 rounded-lg border text-xs transition flex items-center justify-between ${style}`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-5 h-5 rounded bg-slate-800/80 flex items-center justify-center font-bold text-xs shrink-0 text-slate-300">
                                {opt.key}
                              </span>
                              <span>{opt.text}</span>
                            </div>

                            {isSubmitted && isThisCorrect && (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                            )}
                            {isSubmitted && isChosen && !isThisCorrect && (
                              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Answer explanation displayed strictly AFTER submit */}
                    {isSubmitted && (
                      <div className="mt-3 pt-3 border-t border-slate-800/80 text-xs">
                        <div className="text-[11px] font-semibold mb-1 flex items-center gap-1.5">
                          {isCorrect ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> To'g'ri tanlandi (+10 Ball)!
                            </span>
                          ) : (
                            <span className="text-rose-400 flex items-center gap-1">
                              <XCircle className="w-3.5 h-3.5" /> Sizning javobingiz: {userChoice || 'Belgilanmagan'} • To'g'ri javob: {q.correctKey}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Test Submit / Reset Actions */}
            {!isSubmitted ? (
              <div className="pt-2">
                <button
                  onClick={handleSubmitTest}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition active:scale-95"
                >
                  Javoblarni Tekshirish va Natijani Ko'rish
                </button>
              </div>
            ) : (
              <div className="pt-2">
                <button
                  onClick={handleResetTest}
                  className="flex items-center justify-center gap-2 w-full py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Testni Qaytadan Topshirish</span>
                </button>
              </div>
            )}

            {/* Result Board (Only after submission) */}
            {isSubmitted && resultScore && (
              <div className="bg-slate-950 p-5 rounded-2xl border border-emerald-500/40 space-y-4 animate-in fade-in duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase">
                      Test Bahosi:
                    </span>
                    <h4 className="text-2xl font-black text-emerald-400">
                      {resultScore.gradeText} ({resultScore.percentage}%)
                    </h4>
                  </div>

                  <div className="text-xs font-mono text-slate-300 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                    To'g'ri: <strong>{resultScore.correctCount} / {resultScore.total}</strong> • +{resultScore.awardedPoints} Ball
                  </div>
                </div>

                <div className="bg-indigo-950/30 border border-indigo-500/30 p-3.5 rounded-xl flex items-start gap-2.5 text-xs text-indigo-200">
                  <Quote className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <p className="italic leading-relaxed">
                    "{resultScore.teacherComment}"
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
