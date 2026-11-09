import React, { useState } from 'react';
import { CURRICULUM_TOPICS, Topic } from '../data/curriculumData';
import { BookOpen, Lightbulb, CheckCircle2, HelpCircle, Wrench, Sparkles, ChevronRight, Check, X, Quote, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CurriculumViewProps {
  onAddScore: (points: number) => void;
  onOpenChatWithTopic: (topicTitle: string) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({ onAddScore, onOpenChatWithTopic }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(CURRICULUM_TOPICS[0].id);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [deepExplanation, setDeepExplanation] = useState<string | null>(null);
  const [loadingDeep, setLoadingDeep] = useState<boolean>(false);

  const currentTopic: Topic = CURRICULUM_TOPICS.find((t) => t.id === selectedTopicId) || CURRICULUM_TOPICS[0];

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
    setUserAnswers({});
    setIsSubmitted(false);
    setDeepExplanation(null);
  };

  const handleSelectAnswer = (qIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [qIndex]: optionIndex,
    }));
  };

  const handleSubmitQuiz = () => {
    if (Object.keys(userAnswers).length < currentTopic.selfCheckQuestions.length) {
      alert("Iltimos, avval barcha 3 ta savolga o'z javobingizni tanlang!");
      return;
    }

    setIsSubmitted(true);

    let correctCount = 0;
    currentTopic.selfCheckQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    if (correctCount === currentTopic.selfCheckQuestions.length) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      onAddScore(30);
    } else if (correctCount > 0) {
      onAddScore(correctCount * 10);
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
  };

  const handleAskDeepExplanation = async () => {
    try {
      setLoadingDeep(true);
      const res = await fetch('/api/explain-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicTitle: currentTopic.title,
          studentQuestion: "Ushbu mavzuning eng muhim amaliy va nazariy sirlarini texnikum o'quvchisi uchun sodda qilib tushuntirib bering."
        })
      });

      const data = await res.json();
      if (data.explanation) {
        setDeepExplanation(data.explanation);
      } else {
        setDeepExplanation("Ustoz bilan bog'lanishda uzilish bo'ldi. O'ng tarafdagi AI Repetitor chatidan foydalanishingiz mumkin.");
      }
    } catch (err) {
      console.error(err);
      setDeepExplanation("Tarmoq xatosi. Iltimos qaytadan urinib ko'ring yoki AI Repetitor chatiga yozing.");
    } finally {
      setLoadingDeep(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Hero topic banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 rounded-2xl p-6 border border-slate-700/80 mb-6 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-cyan-500/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold border border-cyan-500/30 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>O'quv Dasturi Modullari: 8 ta Asosiy Mavzu</span>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight">
              Kompyuter Tizimlari Nazariyasi va Amaliyoti
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Fon Neyman arxitekturasidan tortib zamonaviy PCIe, VRM va xotira iyerarxiyasigacha. Har bir mavzuda Isoqov Muzaffar tavsiyalari va sinov testlari mavjud.
            </p>
          </div>

          <button
            onClick={() => onOpenChatWithTopic(currentTopic.title)}
            className="self-start md:self-auto flex items-center gap-2 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-cyan-600/20 transition active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Mavzu bo'yicha savol berish (AI)</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Topic Selector List */}
        <div className="lg:col-span-4 space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 px-2 mb-2">
            Mavzular Mundarijasi
          </h3>
          <div className="space-y-1.5 max-h-[750px] overflow-y-auto pr-1">
            {CURRICULUM_TOPICS.map((topic) => {
              const isSelected = topic.id === selectedTopicId;
              return (
                <button
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic.id)}
                  className={`w-full text-left p-3 rounded-xl border transition flex items-start gap-3 ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-md shadow-cyan-500/10 text-white'
                      : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/40 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 font-black'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {topic.number}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono text-cyan-400/90 truncate">
                        {topic.category}
                      </span>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping shrink-0" />
                      )}
                    </div>
                    <div className="text-xs font-semibold text-slate-100 line-clamp-1">
                      {topic.title}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                      {topic.summary}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Topic Detailed Content */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900/80 rounded-2xl p-6 border border-slate-800 shadow-xl space-y-6">
            {/* Header */}
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span>{currentTopic.number}-Mavzu</span>
                <span>•</span>
                <span>{currentTopic.category}</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-100">
                {currentTopic.title}
              </h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                {currentTopic.summary}
              </p>
            </div>

            {/* Real life analogy */}
            <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1">
                  Hayotiy Misol va Analogiya
                </h4>
                <p className="text-xs text-amber-100/90 leading-relaxed italic">
                  "{currentTopic.analogy}"
                </p>
              </div>
            </div>

            {/* Core concepts */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400">
                Asosiy Tushunchalar va Mexanizmlar
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentTopic.coreConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 hover:border-slate-700 transition"
                  >
                    <div className="text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      {concept.term}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {concept.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Practical tips from teacher Isoqov Muzaffar */}
            <div className="bg-slate-950/80 rounded-xl p-4 border border-indigo-500/30 space-y-2">
              <div className="flex items-center gap-2 text-indigo-300 font-bold text-xs uppercase tracking-wider">
                <Wrench className="w-4 h-4 text-indigo-400" />
                <span>Ustoz Isoqov Muzaffardan Amaliy Tavsiyalar</span>
              </div>
              <ul className="space-y-1.5">
                {currentTopic.practicalTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <ChevronRight className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ask Deep live explanation */}
            <div className="pt-2">
              {!deepExplanation ? (
                <button
                  onClick={handleAskDeepExplanation}
                  disabled={loadingDeep}
                  className="w-full py-2.5 px-4 rounded-xl border border-cyan-500/40 bg-cyan-950/30 hover:bg-cyan-900/40 text-cyan-300 text-xs font-semibold flex items-center justify-center gap-2 transition"
                >
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span>
                    {loadingDeep
                      ? "Ustoz Isoqov Muzaffar tushuntirish tayyorlamoqda..."
                      : "Ushbu mavzuni yanada chuqurroq tushuntirishni so'rash (AI)"}
                  </span>
                </button>
              ) : (
                <div className="bg-slate-950 p-4 rounded-xl border border-cyan-500/40 text-xs text-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-cyan-400 font-bold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Ustoz Isoqov Muzaffarning Kengaytirilgan Tushuntirishi:
                    </span>
                    <button
                      onClick={() => setDeepExplanation(null)}
                      className="text-slate-400 hover:text-slate-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="whitespace-pre-line leading-relaxed text-slate-300 pt-1">
                    {deepExplanation}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive 3-Choice Self-Check Test */}
            <div className="border-t border-slate-800 pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-cyan-400" />
                    O'z-o'zini Tekshirish Uchun 3-Variantli Test (A, B, C)
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    ⚠️ Qoida: Javoblar oldindan ko'rsatilmaydi! Barcha variantlarni belgilab, so'ngra "Tekshirish" tugmasini bosing.
                  </p>
                </div>

                {isSubmitted && (
                  <button
                    onClick={handleResetQuiz}
                    className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 transition"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Qayta urinish</span>
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {currentTopic.selfCheckQuestions.map((q, qIndex) => {
                  const selectedOpt = userAnswers[qIndex];
                  const hasAnswered = selectedOpt !== undefined;
                  const isCorrect = hasAnswered && selectedOpt === q.correctIndex;

                  return (
                    <div
                      key={qIndex}
                      className={`p-4 rounded-xl border transition ${
                        isSubmitted
                          ? isCorrect
                            ? 'bg-emerald-950/20 border-emerald-500/40'
                            : 'bg-rose-950/20 border-rose-500/40'
                          : 'bg-slate-950/50 border-slate-800'
                      }`}
                    >
                      <div className="text-xs font-semibold text-slate-200 mb-3 flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">
                          {qIndex + 1}
                        </span>
                        <span>{q.question}</span>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt, optIndex) => {
                          const isOptionSelected = selectedOpt === optIndex;
                          const isThisCorrect = q.correctIndex === optIndex;

                          let btnStyle = 'bg-slate-900 border-slate-800 hover:bg-slate-850 text-slate-300';

                          if (!isSubmitted) {
                            if (isOptionSelected) {
                              btnStyle = 'bg-cyan-950/70 border-cyan-500 text-cyan-200 font-medium shadow-sm';
                            }
                          } else {
                            if (isThisCorrect) {
                              btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                            } else if (isOptionSelected && !isThisCorrect) {
                              btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 font-semibold';
                            } else {
                              btnStyle = 'bg-slate-900/60 border-slate-800 opacity-60 text-slate-400';
                            }
                          }

                          return (
                            <button
                              key={optIndex}
                              onClick={() => handleSelectAnswer(qIndex, optIndex)}
                              disabled={isSubmitted}
                              className={`text-left text-xs p-3 rounded-lg border transition flex items-center justify-between ${btnStyle}`}
                            >
                              <span>{opt}</span>
                              {isSubmitted && isThisCorrect && (
                                <Check className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                              )}
                              {isSubmitted && isOptionSelected && !isThisCorrect && (
                                <X className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation displayed ONLY after submit */}
                      {isSubmitted && (
                        <div className="mt-3 pt-3 border-t border-slate-800 text-xs">
                          <div className="text-slate-400 font-semibold mb-0.5 flex items-center gap-1.5">
                            {isCorrect ? (
                              <span className="text-emerald-400 flex items-center gap-1">
                                <CheckCircle2 className="w-3.5 h-3.5" /> To'g'ri topdingiz (+10 Ball)!
                              </span>
                            ) : (
                              <span className="text-rose-400 flex items-center gap-1">
                                <X className="w-3.5 h-3.5" /> Noto'g'ri. To'g'ri javob: {q.options[q.correctIndex]}
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

              {!isSubmitted && (
                <button
                  onClick={handleSubmitQuiz}
                  className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition active:scale-95"
                >
                  Javoblarni Tekshirish va Baholash
                </button>
              )}
            </div>

            {/* Teacher Quote */}
            <div className="pt-4 border-t border-slate-800 flex items-center gap-3 text-xs text-indigo-300 bg-indigo-950/20 p-3.5 rounded-xl border border-indigo-900/40">
              <Quote className="w-5 h-5 text-indigo-400 shrink-0" />
              <p className="italic">
                "{currentTopic.teacherQuote}" — <strong className="text-indigo-200">Ustoz Isoqov Muzaffar</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
