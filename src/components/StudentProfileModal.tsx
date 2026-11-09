import React, { useState } from 'react';
import { X, User, Award, ShieldAlert, BookOpen, Check, Trophy } from 'lucide-react';

interface StudentProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  setStudentName: (name: string) => void;
  studentGroup: string;
  setStudentGroup: (group: string) => void;
  totalScore: number;
  solvedCasesCount: number;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  isOpen,
  onClose,
  studentName,
  setStudentName,
  studentGroup,
  setStudentGroup,
  totalScore,
  solvedCasesCount,
}) => {
  const [tempName, setTempName] = useState(studentName);
  const [tempGroup, setTempGroup] = useState(studentGroup);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setStudentName(tempName.trim() || "O'quvchi");
    setStudentGroup(tempGroup.trim() || "Texnikum guruh");
    onClose();
  };

  // Rank calculation
  let rankTitle = "Kichik Texnik";
  if (totalScore >= 300) rankTitle = "Bosh Kompyuter Muhandisi";
  else if (totalScore >= 180) rankTitle = "Usta Diagnost";
  else if (totalScore >= 80) rankTitle = "Apparat Mutaxassisi";

  const badges = [
    { title: "Boshlang'ich Qadam", desc: "Tizimga kirish", earned: true },
    { title: "Detektiv Yechuvchi", desc: "Kamida 1 ta holatni yechish", earned: solvedCasesCount >= 1 },
    { title: "Apparat Bilimdoni", desc: "100+ ball to'plash", earned: totalScore >= 100 },
    { title: "Tizim Eksperti", desc: "250+ ball to'plash", earned: totalScore >= 250 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl relative space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-100 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-600 to-indigo-600 flex items-center justify-center text-white">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">
              O'quvchi Profili
            </h3>
            <span className="text-xs font-mono text-cyan-400">
              Daraja: {rankTitle}
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">
              To'plangan Ball
            </span>
            <span className="text-xl font-black text-amber-400">
              {totalScore}
            </span>
          </div>
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] font-mono text-slate-400 block uppercase">
              Yechilgan Detektiv Ishlar
            </span>
            <span className="text-xl font-black text-rose-400">
              {solvedCasesCount} ta
            </span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="space-y-3">
          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">
              Ism va Familiyangiz:
            </label>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Masalan: Azizbek Karimov"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-300 block mb-1">
              Texnikum Guruh Raqami:
            </label>
            <input
              type="text"
              value={tempGroup}
              onChange={(e) => setTempGroup(e.target.value)}
              placeholder="Masalan: 21-guruh 'Kompyuter injiniringi'"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Badges preview */}
          <div>
            <span className="text-xs font-mono text-slate-400 uppercase block mb-1.5">
              Nishonlar va Yutuqlar:
            </span>
            <div className="grid grid-cols-2 gap-2">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg border text-[11px] flex items-center gap-2 ${
                    b.earned
                      ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                      : 'bg-slate-950/40 border-slate-850 opacity-40 text-slate-500'
                  }`}
                >
                  <Trophy className="w-4 h-4 shrink-0" />
                  <div className="min-w-0">
                    <div className="font-bold truncate">{b.title}</div>
                    <div className="text-[9px] truncate opacity-80">{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              Ma'lumotlarni Saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
