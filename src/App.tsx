import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { CurriculumView } from './components/CurriculumView';
import { DetectiveGame } from './components/DetectiveGame';
import { TermsMasterGame } from './components/TermsMasterGame';
import { QuizView } from './components/QuizView';
import { VisualHardwareLab } from './components/VisualHardwareLab';
import { AiTutorChat } from './components/AiTutorChat';
import { StudentProfileModal } from './components/StudentProfileModal';
import { Cpu, ShieldCheck, Heart, Sparkles, BookOpen, ShieldAlert, Terminal, Award, Eye, BrainCircuit } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'curriculum' | 'detective' | 'terms' | 'quiz' | 'visual' | 'chat'>('curriculum');
  const [chatTopicQuery, setChatTopicQuery] = useState<string>('');
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);

  // Student persistent state
  const [studentName, setStudentName] = useState<string>(() => {
    return localStorage.getItem('kt_student_name') || "Azizbek (O'quvchi)";
  });

  const [studentGroup, setStudentGroup] = useState<string>(() => {
    return localStorage.getItem('kt_student_group') || "21-guruh";
  });

  const [totalScore, setTotalScore] = useState<number>(() => {
    const saved = localStorage.getItem('kt_total_score');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [solvedCasesCount, setSolvedCasesCount] = useState<number>(() => {
    const saved = localStorage.getItem('kt_solved_cases');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('kt_student_name', studentName);
  }, [studentName]);

  useEffect(() => {
    localStorage.setItem('kt_student_group', studentGroup);
  }, [studentGroup]);

  useEffect(() => {
    localStorage.setItem('kt_total_score', totalScore.toString());
  }, [totalScore]);

  useEffect(() => {
    localStorage.setItem('kt_solved_cases', solvedCasesCount.toString());
  }, [solvedCasesCount]);

  const handleAddScore = (points: number) => {
    setTotalScore((prev) => prev + points);
  };

  const handleCaseSolved = () => {
    setSolvedCasesCount((prev) => prev + 1);
  };

  const handleOpenChatWithTopic = (topicTitle: string) => {
    setChatTopicQuery(topicTitle);
    setActiveTab('chat');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        studentName={studentName}
        studentGroup={studentGroup}
        totalScore={totalScore}
        solvedCasesCount={solvedCasesCount}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {activeTab === 'curriculum' && (
          <CurriculumView
            onAddScore={handleAddScore}
            onOpenChatWithTopic={handleOpenChatWithTopic}
          />
        )}

        {activeTab === 'detective' && (
          <DetectiveGame
            onAddScore={handleAddScore}
            onCaseSolved={handleCaseSolved}
          />
        )}

        {activeTab === 'terms' && (
          <TermsMasterGame
            onAddScore={handleAddScore}
          />
        )}

        {activeTab === 'quiz' && (
          <QuizView
            onAddScore={handleAddScore}
          />
        )}

        {activeTab === 'visual' && (
          <VisualHardwareLab
            onAddScore={handleAddScore}
          />
        )}

        {activeTab === 'chat' && (
          <AiTutorChat
            initialTopicQuery={chatTopicQuery}
            studentName={studentName}
          />
        )}
      </main>

      {/* Student Profile Modal */}
      <StudentProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        studentName={studentName}
        setStudentName={setStudentName}
        studentGroup={studentGroup}
        setStudentGroup={setStudentGroup}
        totalScore={totalScore}
        solvedCasesCount={solvedCasesCount}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950/80 backdrop-blur py-6 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-200">
                "Kompyuter tizimlari" Fani Bo'yicha Interaktiv Virtual Repetitor
              </div>
              <div className="text-[11px] text-slate-400">
                Texnikum ta'limi uchun maxsus ishlab chiqilgan dasturiy majmua
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            <div className="text-slate-300 font-medium">
              Fan o'qituvchisi: <strong className="text-indigo-300">Isoqov Muzaffar</strong>
            </div>
            <div className="text-[11px] text-indigo-400/90 italic mt-0.5">
              "Bilim va amaliy ko'nikma — muhandislik kelajagingizning poydevoridir!"
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
