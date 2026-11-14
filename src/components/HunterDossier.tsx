import React, { useState } from 'react';
import { HUNTER_DOSSIER } from '../data/critters';
import { DossierEntry } from '../types';
import { Compass, TrendingUp, ExternalLink, Calendar, CheckCircle, ShieldAlert } from 'lucide-react';
import { CritterAvatar } from './CritterAvatar';

export const HunterDossier: React.FC = () => {
  const [selectedEntry, setSelectedEntry] = useState<DossierEntry>(HUNTER_DOSSIER[0]);

  // Mini SVG chart renderer
  const renderChart = (data: number[]) => {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    const width = 360;
    const height = 110;
    const points = data
      .map((val, i) => {
        const x = (i / (data.length - 1)) * (width - 20) + 10;
        const y = height - 15 - ((val - min) / range) * (height - 30);
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-28 overflow-visible">
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <polyline
          fill="none"
          stroke="#14b8a6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={points}
        />
        {/* Entry dot */}
        <circle cx="10" cy={height - 20} r="4" fill="#f97316" stroke="#fff" strokeWidth="1.5" />
        <text x="14" y={height - 24} fill="#fb923c" fontSize="9" fontFamily="monospace">
          Dig Entry ({selectedEntry.entryMc})
        </text>
        {/* Peak dot */}
        <circle cx={width - 15} cy="15" r="5" fill="#10b981" stroke="#fff" strokeWidth="2" className="animate-pulse" />
        <text x={width - 90} y="18" fill="#34d399" fontSize="10" fontWeight="bold" fontFamily="monospace">
          Peak ({selectedEntry.peakMc})
        </text>
      </svg>
    );
  };

  return (
    <section id="dossier" className="py-20 bg-[#071518] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#16484e]/60 pb-6">
          <div>
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5" />
              <span>03 Verified Evidence</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Hunter's Dossier: Dig's Best Catches
            </h2>
          </div>
          <p className="text-sm text-[#94a9ab] max-w-md mt-4 md:mt-0 font-mono leading-relaxed">
            Case studies of insider clusters uncovered in the mempool before pump.fun bonding curves graduated.
          </p>
        </div>

        {/* Dossier Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Entry List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono text-[#5e7b80] uppercase tracking-wider block mb-2">
              Select Case Study:
            </span>
            {HUNTER_DOSSIER.map((entry) => {
              const isSelected = selectedEntry.id === entry.id;
              return (
                <div
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#0b282e] border-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.2)]'
                      : 'bg-[#092226]/80 border-[#16484e]/70 hover:border-teal-500/40 hover:bg-[#0c2a30]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-base font-sans">{entry.tokenName}</span>
                      <span className="font-mono text-teal-300 text-xs px-2 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
                        {entry.tokenSymbol}
                      </span>
                    </div>
                    <span className="text-base font-black font-mono text-emerald-400">
                      {entry.multiplier}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#94a9ab] mb-2">
                    <div>
                      <span className="text-[#5e7b80] block text-[10px]">ENTRY MC</span>
                      <strong className="text-white">{entry.entryMc}</strong>
                    </div>
                    <div>
                      <span className="text-[#5e7b80] block text-[10px]">PEAK MC</span>
                      <strong className="text-emerald-400">{entry.peakMc}</strong>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-[#5e7b80] pt-2 border-t border-[#16484e]/40">
                    <span>Discovered: Slot #{entry.discoveredSlot}</span>
                    <span>{entry.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Detailed Dossier Inspect Card (7 cols) */}
          <div className="lg:col-span-7 bg-[#092226] border border-teal-500/40 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-[#16484e]">
              <div className="flex items-center gap-3">
                <CritterAvatar id="dig" size="md" isAnimated={true} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-black text-white font-sans">{selectedEntry.tokenName}</h3>
                    <span className="px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-mono text-xs font-bold border border-teal-500/40">
                      {selectedEntry.tokenSymbol}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#5e7b80]">
                    CA: <code className="text-teal-400 font-mono">{selectedEntry.ca}</code>
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-[#5e7b80] uppercase block">TOTAL GAIN</span>
                <span className="text-2xl font-black font-mono text-emerald-400">{selectedEntry.multiplier}</span>
              </div>
            </div>

            {/* Interactive Chart Canvas */}
            <div className="bg-[#06181b] p-4 rounded-xl border border-[#16484e]/70 mb-6">
              <div className="flex items-center justify-between text-xs font-mono text-[#94a9ab] mb-2">
                <span className="flex items-center gap-1.5 text-teal-300">
                  <TrendingUp className="w-3.5 h-3.5" />
                  Mempool Detection to Graduation Trajectory
                </span>
                <span className="text-[11px] text-[#5e7b80]">Normalized Bonding Curve</span>
              </div>
              {renderChart(selectedEntry.chartData)}
            </div>

            {/* On-chain Details breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5 font-mono text-xs">
              <div className="p-3 rounded-lg bg-[#07191c] border border-[#16484e]/60">
                <span className="text-[#5e7b80] text-[10px] block">FLAGGED INSIDER SOURCE</span>
                <span className="text-white font-bold">{selectedEntry.firstInsiderWallet}</span>
              </div>
              <div className="p-3 rounded-lg bg-[#07191c] border border-[#16484e]/60">
                <span className="text-[#5e7b80] text-[10px] block">DISCOVERY SLOT</span>
                <span className="text-teal-300 font-bold">#{selectedEntry.discoveredSlot.toLocaleString()}</span>
              </div>
            </div>

            {/* Narrative Breakdown */}
            <div className="p-4 rounded-xl bg-[#0b282e] border border-teal-500/20 text-xs font-mono mb-5">
              <div className="flex items-center gap-2 text-teal-300 font-bold mb-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Hunter Verification Log</span>
              </div>
              <p className="text-[#94a9ab] leading-relaxed">
                {selectedEntry.narrative}
              </p>
            </div>

            {/* Solscan CTA button */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-mono text-[#5e7b80]">
                All data verified against Solana Ledger RPC
              </span>
              <a
                href={`https://pump.fun`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#07191c] hover:bg-[#10343c] border border-[#16484e] hover:border-teal-400 text-teal-300 font-mono text-xs font-bold transition-all"
              >
                <span>View on pump.fun</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
