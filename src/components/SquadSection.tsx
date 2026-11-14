import React from 'react';
import { CRITTERS } from '../data/critters';
import { CritterAvatar } from './CritterAvatar';
import { CritterId } from '../types';
import { Cpu, Terminal, ArrowUpRight, Zap, Shield, Target, Compass, Waves } from 'lucide-react';

interface SquadSectionProps {
  onSelectCritterForHero: (id: CritterId) => void;
}

export const SquadSection: React.FC<SquadSectionProps> = ({ onSelectCritterForHero }) => {
  const getCritterIcon = (id: CritterId) => {
    switch (id) {
      case 'dig':
        return <Compass className="w-4 h-4 text-teal-400" />;
      case 'tide':
        return <Waves className="w-4 h-4 text-cyan-400" />;
      case 'pinch':
        return <Target className="w-4 h-4 text-orange-400" />;
      case 'shell':
        return <Shield className="w-4 h-4 text-emerald-400" />;
      case 'scuttle':
        return <Zap className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <section id="squad" className="py-20 relative bg-[#071518]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#16484e]/60 pb-6">
          <div>
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              <span>01 The Squad</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Meet the 5 Critters of the Reef
            </h2>
          </div>
          <p className="text-sm text-[#94a9ab] max-w-md mt-4 md:mt-0 leading-relaxed font-mono">
            Autonomous specialized sub-agents powered by Claude Fable 5.2. Each critter handles a distinct phase of the on-chain Solana trading cycle.
          </p>
        </div>

        {/* Critters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CRITTERS.map((critter) => (
            <div
              key={critter.id}
              className="bg-[#092226] border border-[#16484e] hover:border-teal-500/50 rounded-2xl p-6 transition-all hover:bg-[#0c2a30] flex flex-col justify-between group shadow-lg"
            >
              <div>
                {/* Header row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <CritterAvatar id={critter.id} size="md" isAnimated={true} />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white font-sans group-hover:text-teal-300 transition-colors">
                          {critter.name}
                        </h3>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${critter.badgeBg} ${critter.badgeBorder} ${critter.badgeText} font-bold`}>
                          {critter.stateWord}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-teal-300/80 font-mono mt-0.5">
                        {getCritterIcon(critter.id)}
                        <span>{critter.role}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-[#06181b] text-emerald-400 border border-[#16484e]">
                    {critter.slotLatency}
                  </span>
                </div>

                {/* Specialty Banner */}
                <div className="bg-[#07191c] px-3 py-1.5 rounded-lg border border-[#16484e]/60 mb-3 text-xs font-mono text-[#94a9ab]">
                  <strong className="text-white">Specialty:</strong> {critter.specialty}
                </div>

                {/* Description */}
                <p className="text-xs text-[#94a9ab] leading-relaxed mb-5">
                  {critter.description}
                </p>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {critter.stats.map((st, idx) => (
                    <div key={idx} className="bg-[#07181a] p-2.5 rounded-xl border border-[#16484e]/40 text-center">
                      <span className="text-[10px] text-[#5e7b80] font-mono block leading-tight">{st.label}</span>
                      <span className="text-xs font-bold text-teal-300 font-mono mt-0.5 block">{st.value}</span>
                    </div>
                  ))}
                </div>

                {/* Model tag */}
                <div className="flex items-center gap-2 text-[11px] font-mono text-[#5e7b80] mb-4">
                  <Cpu className="w-3.5 h-3.5 text-teal-400" />
                  <span>Model: <strong className="text-white">{critter.model}</strong></span>
                </div>
              </div>

              {/* Bottom Trigger Action */}
              <button
                onClick={() => {
                  onSelectCritterForHero(critter.id);
                  const el = document.getElementById('tidepool');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-[#0b282e] hover:bg-teal-500 hover:text-[#071518] text-teal-300 border border-teal-500/30 font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all group-hover:border-teal-400 shadow-sm"
              >
                <span>Write to {critter.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* 6th Card: Squad customizer teaser & collective alpha */}
          <div className="bg-gradient-to-br from-[#0c2a30] via-[#092226] to-[#071518] border border-teal-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-teal-500/20 text-teal-300 font-mono text-xs font-bold mb-4">
                <Zap className="w-3.5 h-3.5 text-teal-400" />
                <span>COMBINED ALPHA PIPELINE</span>
              </div>
              <h3 className="text-xl font-bold text-white font-sans mb-2">
                All 5 Critters in Unison
              </h3>
              <p className="text-xs text-[#94a9ab] leading-relaxed mb-4">
                When you deploy a squad, <strong className="text-teal-300">Scuttle</strong> spots the narrative, <strong className="text-teal-300">Dig</strong> traces the deployer wallet, <strong className="text-teal-300">Pinch</strong> executes the snipe, <strong className="text-teal-300">Tide</strong> mirrors secondary whale inflows, and <strong className="text-teal-300">Shell</strong> locks in the gains before any liquidity pull.
              </p>

              <div className="space-y-2 font-mono text-xs text-[#94a9ab] mb-4">
                <div className="flex items-center justify-between p-2 rounded bg-[#07181a] border border-[#16484e]/50">
                  <span>Cross-Critter Synchronization:</span>
                  <span className="text-emerald-400 font-bold">Active</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[#07181a] border border-[#16484e]/50">
                  <span>Mempool Reorg Defense:</span>
                  <span className="text-teal-300 font-bold">100% Jito Protected</span>
                </div>
              </div>
            </div>

            <a
              href="#customizer"
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-[#071518] font-bold font-sans text-xs flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-[0_0_15px_rgba(20,184,166,0.25)]"
            >
              <span>Customize Squad Colors & Names</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
