import React from 'react';

interface DiagramProps {
  type: string;
  className?: string;
}

export const HardwareSvgDiagram: React.FC<DiagramProps> = ({ type, className = "w-full h-48" }) => {
  switch (type) {
    case 'cpu-socket':
      return (
        <div className={`relative bg-slate-950 rounded-xl p-4 border border-cyan-500/30 flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
            SCHEMATIC: LGA SOCKET (TOP VIEW)
          </div>
          <svg viewBox="0 0 300 220" className="w-full h-full max-h-56">
            {/* Motherboard PCB base */}
            <rect x="10" y="10" width="280" height="200" rx="8" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
            <path d="M 25 30 L 70 30 L 90 50 L 130 50" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" fill="none" />
            <path d="M 25 190 L 120 190 L 140 170" stroke="#0ea5e9" strokeWidth="1" opacity="0.3" fill="none" />

            {/* Socket Base Housing */}
            <rect x="50" y="25" width="200" height="170" rx="6" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            {/* Retention metal frame */}
            <rect x="65" y="38" width="170" height="144" rx="4" fill="#090d16" stroke="#94a3b8" strokeWidth="2" />

            {/* Pin Grid array simulation */}
            <g opacity="0.85">
              {Array.from({ length: 9 }).map((_, r) => (
                <g key={r}>
                  {Array.from({ length: 14 }).map((_, c) => {
                    // Leave center notch open
                    if (r >= 3 && r <= 5 && c >= 5 && c <= 8) return null;
                    return (
                      <circle
                        key={c}
                        cx={82 + c * 10}
                        cy={56 + r * 13}
                        r="2"
                        fill="#f59e0b"
                        className="animate-pulse"
                        style={{ animationDelay: `${(r * c * 30) % 1500}ms` }}
                      />
                    );
                  })}
                </g>
              ))}
            </g>

            {/* Gold Triangle Orientation Notch */}
            <polygon points="68,41 82,41 68,55" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
            <text x="75" y="65" fill="#facc15" fontSize="8" fontWeight="bold">▲ PIN 1</text>

            {/* Side Key notches */}
            <rect x="63" y="105" width="5" height="10" rx="1" fill="#475569" />
            <rect x="232" y="105" width="5" height="10" rx="1" fill="#475569" />

            {/* Metal Retention Lever */}
            <path d="M 240 32 L 252 32 L 252 185 L 260 190" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" fill="none" />
            <circle cx="260" cy="190" r="4" fill="#38bdf8" />
          </svg>
        </div>
      );

    case 'ram-slot':
      return (
        <div className={`relative bg-slate-950 rounded-xl p-4 border border-cyan-500/30 flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
            SCHEMATIC: DDR DIMM SLOTS
          </div>
          <svg viewBox="0 0 320 180" className="w-full h-full max-h-56">
            {/* Motherboard PCB */}
            <rect x="10" y="10" width="300" height="160" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            {/* Slot 1 (Channel A2) */}
            <rect x="40" y="45" width="240" height="24" rx="3" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
            <line x1="48" y1="57" x2="160" y2="57" stroke="#0284c7" strokeWidth="4" strokeDasharray="3 2" />
            {/* Notch */}
            <rect x="160" y="52" width="6" height="10" fill="#0f172a" />
            <line x1="166" y1="57" x2="272" y2="57" stroke="#0284c7" strokeWidth="4" strokeDasharray="3 2" />
            {/* Latches */}
            <polygon points="35,42 42,48 42,66 35,72" fill="#64748b" stroke="#94a3b8" />
            <polygon points="285,42 278,48 278,66 285,72" fill="#64748b" stroke="#94a3b8" />
            <text x="48" y="40" fill="#94a3b8" fontSize="8" fontFamily="monospace">DIMM_A2 (CHANNEL A)</text>

            {/* Slot 2 (Channel B2) */}
            <rect x="40" y="95" width="240" height="24" rx="3" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
            <line x1="48" y1="107" x2="160" y2="107" stroke="#38bdf8" strokeWidth="4" strokeDasharray="3 2" />
            {/* Notch */}
            <rect x="160" y="102" width="6" height="10" fill="#0f172a" />
            <line x1="166" y1="107" x2="272" y2="107" stroke="#38bdf8" strokeWidth="4" strokeDasharray="3 2" />
            {/* Latches */}
            <polygon points="35,92 42,98 42,116 35,122" fill="#0284c7" stroke="#38bdf8" />
            <polygon points="285,92 278,98 278,116 285,122" fill="#0284c7" stroke="#38bdf8" />
            <text x="48" y="90" fill="#38bdf8" fontSize="8" fontFamily="monospace">DIMM_B2 (CHANNEL B) - RECOMMENDED</text>

            {/* Notch pointer label */}
            <line x1="163" y1="120" x2="163" y2="148" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="2 2" />
            <circle cx="163" cy="110" r="4" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
            <text x="120" y="160" fill="#f59e0b" fontSize="9" fontWeight="bold">NOTCH (KALIT) TIRQISHI</text>
          </svg>
        </div>
      );

    case 'm2-slot':
      return (
        <div className={`relative bg-slate-950 rounded-xl p-4 border border-cyan-500/30 flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
            SCHEMATIC: M.2 NVMe SSD 2280
          </div>
          <svg viewBox="0 0 320 180" className="w-full h-full max-h-56">
            <rect x="10" y="10" width="300" height="160" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            {/* M.2 Connector Slot on Left */}
            <rect x="30" y="60" width="22" height="60" rx="2" fill="#1e293b" stroke="#64748b" strokeWidth="1.5" />
            <rect x="34" y="66" width="14" height="48" rx="1" fill="#090d16" />
            {/* Key notch in connector */}
            <rect x="34" y="76" width="6" height="5" fill="#ca8a04" />
            <text x="24" y="52" fill="#94a3b8" fontSize="8" fontFamily="monospace">M-KEY CONNECTOR</text>

            {/* Installed SSD PCB (semi-transparent outline) */}
            <rect x="52" y="64" width="210" height="52" rx="3" fill="#047857" fillOpacity="0.4" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 2" />
            {/* NAND Flash chips on SSD */}
            <rect x="85" y="70" width="35" height="40" rx="2" fill="#022c22" stroke="#10b981" strokeWidth="1" />
            <text x="90" y="93" fill="#a7f3d0" fontSize="7" fontFamily="monospace">NAND 1</text>
            <rect x="130" y="70" width="35" height="40" rx="2" fill="#022c22" stroke="#10b981" strokeWidth="1" />
            <text x="135" y="93" fill="#a7f3d0" fontSize="7" fontFamily="monospace">NAND 2</text>
            {/* Controller chip */}
            <rect x="180" y="74" width="30" height="32" rx="2" fill="#134e4a" stroke="#2dd4bf" strokeWidth="1" />
            <text x="184" y="93" fill="#ccfbf1" fontSize="6" fontFamily="monospace">CTRL</text>

            {/* Semicircle notch at end of SSD */}
            <path d="M 262 82 A 8 8 0 0 1 262 98 L 262 82" fill="#0f172a" />

            {/* Standoff screw post */}
            <circle cx="262" cy="90" r="7" fill="#64748b" stroke="#cbd5e1" strokeWidth="2" />
            <circle cx="262" cy="90" r="3" fill="#0f172a" />
            <line x1="259" y1="90" x2="265" y2="90" stroke="#cbd5e1" strokeWidth="1" />
            <line x1="262" y1="87" x2="262" y2="93" stroke="#cbd5e1" strokeWidth="1" />

            <text x="235" y="125" fill="#f59e0b" fontSize="8" fontWeight="bold">STANDOFF VINTI (2280)</text>
          </svg>
        </div>
      );

    case 'cmos-battery':
      return (
        <div className={`relative bg-slate-950 rounded-xl p-4 border border-cyan-500/30 flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
            SCHEMATIC: CMOS RTC COIN CELL
          </div>
          <svg viewBox="0 0 300 180" className="w-full h-full max-h-56">
            <rect x="10" y="10" width="280" height="160" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            {/* Battery Socket Housing */}
            <circle cx="140" cy="90" r="62" fill="#1e293b" stroke="#475569" strokeWidth="2" />
            <circle cx="140" cy="90" r="54" fill="#090d16" />

            {/* CR2032 Battery */}
            <circle cx="140" cy="90" r="50" fill="#94a3b8" stroke="#e2e8f0" strokeWidth="2" />
            <circle cx="140" cy="90" r="46" fill="#cbd5e1" />
            <text x="110" y="80" fill="#1e293b" fontSize="16" fontWeight="bold" fontFamily="monospace">+ CR2032</text>
            <text x="126" y="98" fill="#334155" fontSize="12" fontWeight="bold" fontFamily="monospace">3 VOLTS</text>
            <text x="115" y="112" fill="#475569" fontSize="8" fontFamily="monospace">LITHIUM CELL</text>

            {/* Metal Eject Latch */}
            <rect x="190" y="80" width="14" height="20" rx="2" fill="#e2e8f0" stroke="#64748b" />
            <line x1="197" y1="83" x2="197" y2="97" stroke="#475569" strokeWidth="2" />

            {/* Clear CMOS Jumper pins nearby */}
            <rect x="220" y="60" width="40" height="60" rx="4" fill="#1e293b" stroke="#334155" />
            <circle cx="230" cy="90" r="3" fill="#f59e0b" />
            <circle cx="240" cy="90" r="3" fill="#f59e0b" />
            <circle cx="250" cy="90" r="3" fill="#f59e0b" />
            {/* 2-pin shorted jumper cap */}
            <rect x="226" y="82" width="18" height="16" rx="2" fill="#0284c7" stroke="#38bdf8" />
            <text x="218" y="52" fill="#38bdf8" fontSize="7" fontFamily="monospace">CLR_CMOS</text>
            <text x="220" y="132" fill="#94a3b8" fontSize="7" fontFamily="monospace">1-2: NORMAL</text>
          </svg>
        </div>
      );

    case 'pcie-slot':
      return (
        <div className={`relative bg-slate-950 rounded-xl p-4 border border-cyan-500/30 flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
            SCHEMATIC: PCIe x16 GPU SLOT
          </div>
          <svg viewBox="0 0 320 180" className="w-full h-full max-h-56">
            <rect x="10" y="10" width="300" height="160" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            {/* PCIe x16 Slot body */}
            <rect x="30" y="70" width="240" height="32" rx="4" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
            {/* Metal Armor Shield */}
            <rect x="28" y="68" width="244" height="36" rx="4" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="6 3" />

            {/* 11-pin Key division */}
            <rect x="36" y="80" width="30" height="12" fill="#090d16" />
            <line x1="40" y1="86" x2="62" y2="86" stroke="#ca8a04" strokeWidth="2" strokeDasharray="2 1" />
            {/* Key separator */}
            <rect x="68" y="76" width="6" height="20" fill="#334155" />
            {/* Long x16 data section */}
            <rect x="76" y="80" width="186" height="12" fill="#090d16" />
            <line x1="80" y1="86" x2="258" y2="86" stroke="#ca8a04" strokeWidth="2" strokeDasharray="3 1" />

            {/* Retention Wing Latch on Right */}
            <path d="M 270 65 L 292 75 L 292 97 L 270 107 Z" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
            <circle cx="282" cy="86" r="3" fill="#ffffff" />

            <text x="32" y="58" fill="#94a3b8" fontSize="8" fontFamily="monospace">PCIe 4.0 / 5.0 x16 EXPANSION SLOT</text>
            <text x="240" y="125" fill="#38bdf8" fontSize="8" fontWeight="bold">OG'IR GPU QULFI (LATCH)</text>
          </svg>
        </div>
      );

    case 'vrm-phases':
      return (
        <div className={`relative bg-slate-950 rounded-xl p-4 border border-cyan-500/30 flex items-center justify-center overflow-hidden ${className}`}>
          <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/40">
            SCHEMATIC: VRM CHOKES & HEATSINK
          </div>
          <svg viewBox="0 0 320 180" className="w-full h-full max-h-56">
            <rect x="10" y="10" width="300" height="160" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />

            {/* Aluminum Fin Heatsink representation */}
            <rect x="30" y="30" width="50" height="110" rx="3" fill="#334155" stroke="#94a3b8" strokeWidth="1.5" />
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1="32" y1={40 + i * 12} x2="78" y2={40 + i * 12} stroke="#64748b" strokeWidth="2" />
            ))}
            <text x="35" y="152" fill="#94a3b8" fontSize="7" fontFamily="monospace">HEATSINK</text>

            {/* VRM Chokes (Ferrite Core cubes) */}
            {Array.from({ length: 5 }).map((_, i) => (
              <g key={i}>
                <rect x="95" y={35 + i * 22} width="18" height="16" rx="2" fill="#1e293b" stroke="#e2e8f0" strokeWidth="1.5" />
                <rect x="98" y={38 + i * 22} width="12" height="10" rx="1" fill="#090d16" />
                <text x="99" y={46 + i * 22} fill="#38bdf8" fontSize="5" fontFamily="monospace">R15</text>

                {/* Solid Capacitor next to choke */}
                <circle cx="125" cy={43 + i * 22} r="6" fill="#64748b" stroke="#cbd5e1" strokeWidth="1" />
                <circle cx="125" cy={43 + i * 22} r="4" fill="#334155" />
              </g>
            ))}

            {/* CPU Socket hint on right */}
            <rect x="155" y="35" width="130" height="105" rx="4" fill="#1e293b" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
            <text x="185" y="90" fill="#64748b" fontSize="10" fontFamily="monospace">CPU SOCKET</text>

            <text x="90" y="25" fill="#38bdf8" fontSize="8" fontWeight="bold">DROSSEL VA VRM FAZALARI (12V -&gt; ~1.2V)</text>
          </svg>
        </div>
      );

    default:
      return null;
  }
};
