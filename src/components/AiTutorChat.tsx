import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, HelpCircle, Terminal, ShieldAlert, BookOpen, Quote } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
}

interface AiTutorChatProps {
  initialTopicQuery?: string;
  studentName: string;
}

export const AiTutorChat: React.FC<AiTutorChatProps> = ({ initialTopicQuery, studentName }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'tutor',
      text: `Assalomu alaykum, aziz o'quvchim ${studentName || ""}! Men — "Kompyuter tizimlari" fani bo'yicha sizning shaxsiy aqlli repetitoringizman. Faningiz o'qituvchisi — Isoqov Muzaffar.

Siz bilan kompyuter arxitekturasi, mikroprotsessorlar, xotira iyerarxiyasi, shinalar, BIOS/UEFI, ona plata va barcha apparat qismlarini o'rganamiz, qiziqarli detektiv holatlarni yechamiz va testlar o'tkazamiz.

Qaysi mavzudan boshlaymiz yoki qanday savolingiz bor?

— Ustozingiz Isoqov Muzaffar: "Bilim va amaliy ko'nikma — muhandislik kelajagingizning eng mustahkam poydevoridir!"`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (initialTopicQuery) {
      sendMessage(`Ustoz, menga "${initialTopicQuery}" mavzusini sodda, hayotiy misol va amaliy maslahatlar bilan tushuntirib bering.`);
    }
  }, [initialTopicQuery]);

  const sendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history,
        }),
      });

      const data = await res.json();
      const replyText = data.reply || "Uzr, javobni shakllantirishda xatolik yuz berdi.";

      const tutorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, tutorMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `tutor-${Date.now()}`,
        sender: 'tutor',
        text: `Tarmoq bilan aloqada uzilish bo'ldi. Iltimos qaytadan urinib ko'ring.\n\n— Ustozingiz Isoqov Muzaffar: "Hech qachon qiyinchilik oldida to'xtamang, qayta urinish muvaffaqiyat sari qadamdir!"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickPrompts = [
    { label: "Mavzu: RAM va ROM farqi", text: "Ustoz, RAM va ROM xotirasining farqini hayotiy misol bilan tushuntirib bering." },
    { label: "Detektiv vazifa ber", text: "Menga kompyuterdagi yangi nosozlik holatini (detektiv topshiriq) bering, faqat javobini darhol aytmang!" },
    { label: "3 ta A,B,C test ber", text: "Kompyuter arxitekturasi bo'yicha 3 ta A, B, C variantli test bering (javoblarini aytmang, o'zim yozaman)." },
    { label: "BIOS va UEFI farqi", text: "Eski BIOS va zamonaviy UEFI mikrodasturlarining eng asosiy farqlari nimalardan iborat?" },
    { label: "VRM nima?", text: "Ona platadagi VRM fazalari nima vazifani bajaradi va nega ular qizib ketadi?" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 border border-indigo-800/40 mb-4 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-cyan-600/30">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-slate-100">
                Isoqov Muzaffar — Virtual Repetitor
              </h2>
              <span className="flex items-center gap-1 text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Jonli AI
              </span>
            </div>
            <p className="text-xs text-slate-300">
              "Kompyuter tizimlari" fani o'qituvchisi. Mavzularni tushuntirish, test olish va detektiv o'yinlar.
            </p>
          </div>
        </div>
      </div>

      {/* Chat Messages Card */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl flex flex-col h-[600px] overflow-hidden">
        {/* Messages feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => {
            const isTutor = msg.sender === 'tutor';
            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isTutor ? 'justify-start' : 'justify-end'}`}
              >
                {isTutor && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shrink-0 mt-1 shadow-md shadow-indigo-600/30">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed shadow-md ${
                    isTutor
                      ? 'bg-slate-950/90 border border-slate-800 text-slate-200'
                      : 'bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-medium ml-auto'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1 border-b border-slate-800/60 pb-1 text-[10px] font-mono text-slate-400">
                    <span className="font-semibold text-slate-300">
                      {isTutor ? "Ustoz Isoqov Muzaffar (Repetitor)" : (studentName || "O'quvchi")}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="whitespace-pre-line text-slate-200">
                    {msg.text}
                  </div>
                </div>

                {!isTutor && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                    <User className="w-4 h-4 text-cyan-400" />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-md">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-cyan-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-bounce text-cyan-400" />
                <span>Ustoz Isoqov Muzaffar o'ylamoqda va javob yozmoqda...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompt chips */}
        <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/50 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-mono text-slate-400 shrink-0">
            Tezkor:
          </span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(p.text)}
              disabled={isLoading}
              className="text-[11px] whitespace-nowrap bg-slate-800 hover:bg-slate-700 hover:text-cyan-300 text-slate-300 px-2.5 py-1 rounded-full border border-slate-700 transition shrink-0"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input box */}
        <div className="p-3 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ustozga savol bering, mavzu so'rang yoki test javobingizni (masalan: 1-A, 2-B) yozing..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className="bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 disabled:opacity-50 text-white p-2.5 rounded-xl transition shadow-md shadow-cyan-600/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
