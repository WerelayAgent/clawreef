import React, { useState } from 'react';
import { CRITTERS } from '../data/critters';
import { Critter, CritterId, Cardlet } from '../types';
import { CritterAvatar } from './CritterAvatar';
import { Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Zap, Sliders, Play, AlertCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HeroSectionProps {
  onCardletCreated: (cardlet: Cardlet) => void;
  onOpenScope: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onCardletCreated, onOpenScope }) => {
  const [selectedCritterId, setSelectedCritterId] = useState<CritterId>('dig');
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCardlet, setGeneratedCardlet] = useState<Cardlet | null>(null);
  const [isApproved, setIsApproved] = useState(false);

  const activeCritter = CRITTERS.find((c) => c.id === selectedCritterId) || CRITTERS[0];

  const handleSelectCritter = (id: CritterId) => {
    setSelectedCritterId(id);
    const critter = CRITTERS.find((c) => c.id === id);
    if (critter && critter.samplePrompts.length > 0) {
      setPromptInput(critter.samplePrompts[0]);
    }
    setGeneratedCardlet(null);
    setIsApproved(false);
  };

  const handleGenerateCardlet = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!promptInput.trim()) return;

    setIsGenerating(true);
    setIsApproved(false);

    setTimeout(() => {
      const newCardlet: Cardlet = {
        id: `crd-${Date.now().toString().slice(-5)}`,
        critterId: activeCritter.id,
        title: `${activeCritter.name} Execution Plan #${Math.floor(Math.random() * 800 + 100)}`,
        prompt: promptInput,
        targetCriteria: `Token < $25k MC • Mint Authority Revoked • Top 10 < 18%`,
        executionRules: [
          `Max Capital: 0.50 SOL per burst`,
          `Slippage Cap: 3.5% with custom Jito tip 0.03 SOL`,
          `Auto take-profit at +150% • Stop-loss at -30%`,
          `Target slot execution latency: <= 1 slot`,
        ],
        status: 'draft',
        timestamp: 'Just now',
        slotNumber: 31928435 + Math.floor(Math.random() * 50),
        estReturn: '+180% to +450%',
        riskLevel: activeCritter.id === 'shell' ? 'LOW' : activeCritter.id === 'pinch' ? 'DEGEN' : 'MEDIUM',
      };

      setGeneratedCardlet(newCardlet);
      setIsGenerating(false);
    }, 600);
  };

  const handleApproveCardlet = () => {
    if (!generatedCardlet) return;
    setIsApproved(true);
    
    // Confetti celebration
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#14b8a6', '#06b6d4', '#f97316', '#34d399'],
    });

    const approvedCardlet: Cardlet = {
      ...generatedCardlet,
      status: 'approved',
    };

    onCardletCreated(approvedCardlet);
  };

  return (
    <section id="tidepool" className="relative pt-8 pb-16 overflow-hidden reef-grid">
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[550px] tide-glow pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 tide-glow-coral pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Tag */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0b242a] border border-teal-500/30 text-teal-300 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping"></span>
            <span>CLAWREEF ENGINE V5.2 ACTIVE</span>
            <span className="text-[#5e7b80]">•</span>
            <span className="text-white">Powered by Claude Fable 5.2</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-xs font-mono">
            <span>50% Fee Buyback & Burn every 60 min</span>
          </div>
        </div>

        {/* Hero Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.1] mb-4">
            Say it. Approve it.{' '}
            <span className="bg-gradient-to-r from-teal-300 via-cyan-400 to-teal-200 bg-clip-text text-transparent">
              Watch it.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-[#94a9ab] max-w-2xl mx-auto leading-relaxed">
            5 autonomous AI trading critters patrolling Solana mempools. Formulate strategies in plain English, approve modular cardlets, and execute in 1-slot precision.
          </p>
        </div>

        {/* Living Tide Pool & Critter Command Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Interactive Tide Pool Selector (5 cols) */}
          <div className="lg:col-span-5 bg-[#092226]/90 border border-[#16484e] rounded-2xl p-5 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#16484e]/70">
              <div className="flex items-center gap-2 font-mono text-xs text-[#94a9ab]">
                <span className="w-2 h-2 rounded-full bg-teal-400"></span>
                <span className="font-bold text-white uppercase">The Living Reef Pool</span>
              </div>
              <span className="text-[11px] font-mono text-teal-400">5 Critters Active</span>
            </div>

            {/* Critter selection grid */}
            <div className="grid grid-cols-5 gap-2 mb-5">
              {CRITTERS.map((critter) => {
                const isSelected = critter.id === selectedCritterId;
                return (
                  <button
                    key={critter.id}
                    onClick={() => handleSelectCritter(critter.id)}
                    className={`flex flex-col items-center p-2 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-[#10343c] border-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.25)] scale-105'
                        : 'bg-[#081a1d] border-[#16484e]/60 hover:border-teal-500/50 hover:bg-[#0c262c]'
                    }`}
                  >
                    <CritterAvatar id={critter.id} size="sm" isAnimated={isSelected} />
                    <span className="mt-1.5 text-xs font-bold text-white font-sans">{critter.name}</span>
                    <span className="text-[9px] font-mono text-[#94a9ab] truncate max-w-full">
                      {critter.role.replace('The ', '')}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Critter Focus Card */}
            <div className="bg-[#0b282e] border border-teal-500/30 rounded-xl p-4 mb-4">
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <CritterAvatar id={activeCritter.id} size="md" isAnimated={true} />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white font-sans">{activeCritter.name}</span>
                      <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${activeCritter.badgeBg} ${activeCritter.badgeBorder} ${activeCritter.badgeText} border`}>
                        {activeCritter.stateWord}
                      </span>
                    </div>
                    <span className="text-xs text-teal-300 font-mono">{activeCritter.role} • {activeCritter.specialty}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-[#5e7b80] block">LATENCY</span>
                  <span className="text-xs font-mono font-bold text-emerald-400">{activeCritter.slotLatency}</span>
                </div>
              </div>

              <p className="text-xs text-[#94a9ab] leading-relaxed mb-3">
                {activeCritter.description}
              </p>

              {/* Stats Bar */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#16484e]/60">
                {activeCritter.stats.map((st, i) => (
                  <div key={i} className="bg-[#07191c] p-2 rounded-lg text-center border border-[#16484e]/40">
                    <span className="text-[10px] text-[#5e7b80] font-mono block">{st.label}</span>
                    <span className="text-xs font-mono font-bold text-teal-300">{st.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Live Trigger */}
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#07191c] border border-[#16484e]/50 text-xs font-mono text-[#94a9ab]">
              <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="text-[11px] truncate">
                <strong className="text-white">Recent:</strong> {activeCritter.recentAction}
              </span>
            </div>
          </div>

          {/* Right Column: Prompt to Cardlet Generator & Approval Stage (7 cols) */}
          <div className="lg:col-span-7 bg-[#092226]/90 border border-[#16484e] rounded-2xl p-5 shadow-xl backdrop-blur-sm">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#16484e]/70">
              <div className="flex items-center gap-2 font-mono text-xs text-[#94a9ab]">
                <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                <span className="font-bold text-white uppercase">Prompt to Cardlet Engine</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-teal-400">
                <span>Model: {activeCritter.model}</span>
              </div>
            </div>

            {/* Natural language input */}
            <form onSubmit={handleGenerateCardlet} className="mb-4">
              <label className="block text-xs font-mono text-[#94a9ab] mb-1.5">
                Instruction for <span className="text-teal-300 font-bold">{activeCritter.name}</span> (Natural Language):
              </label>
              <div className="relative">
                <textarea
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder={`Tell ${activeCritter.name} what to watch, snipe, or guard on Solana...`}
                  rows={3}
                  className="w-full rounded-xl bg-[#07181b] border border-[#16484e] p-3 text-sm text-white placeholder-[#5e7b80] focus:outline-none focus:border-teal-400 font-mono transition-colors resize-none"
                />
                <button
                  type="submit"
                  disabled={isGenerating || !promptInput.trim()}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-[#071518] text-xs font-bold font-sans flex items-center gap-1.5 transition-all shadow-[0_0_10px_rgba(20,184,166,0.3)]"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Synthesizing...</span>
                    </>
                  ) : (
                    <>
                      <span>Generate Cardlet</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Suggestions */}
            <div className="mb-5">
              <span className="text-[11px] font-mono text-[#5e7b80] block mb-1.5">Preset Prompts for {activeCritter.name}:</span>
              <div className="flex flex-wrap gap-1.5">
                {activeCritter.samplePrompts.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setPromptInput(p);
                      setGeneratedCardlet(null);
                      setIsApproved(false);
                    }}
                    className="text-left text-[11px] px-2.5 py-1 rounded bg-[#0b282e] hover:bg-[#10343c] border border-[#16484e]/70 text-[#94a9ab] hover:text-teal-300 transition-colors font-mono truncate max-w-full"
                  >
                    "{p.length > 55 ? p.slice(0, 55) + '...' : p}"
                  </button>
                ))}
              </div>
            </div>

            {/* Cardlet Preview Box (Approve it step) */}
            <div className="border border-dashed border-[#16484e] rounded-xl p-4 bg-[#07191c]">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#16484e]/50">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                    {generatedCardlet ? 'Generated Cardlet' : 'Cardlet Blueprint Preview'}
                  </span>
                  {generatedCardlet && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                      isApproved ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    }`}>
                      {isApproved ? 'APPROVED & ARMED' : 'PENDING APPROVAL'}
                    </span>
                  )}
                </div>
                {generatedCardlet && (
                  <span className="text-xs font-mono text-[#94a9ab]">
                    Target Slot: <strong className="text-teal-300">#{generatedCardlet.slotNumber}</strong>
                  </span>
                )}
              </div>

              {generatedCardlet ? (
                <div>
                  <div className="mb-3">
                    <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                      <span>{generatedCardlet.title}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                        {generatedCardlet.riskLevel} RISK
                      </span>
                    </h4>
                    <p className="text-xs text-[#94a9ab] italic font-mono bg-[#092226] p-2 rounded border border-[#16484e]/40">
                      "{generatedCardlet.prompt}"
                    </p>
                  </div>

                  <div className="space-y-1.5 mb-4 font-mono text-xs">
                    <div className="text-[11px] text-[#5e7b80] uppercase tracking-wider">Synthesized Execution Rules:</div>
                    {generatedCardlet.executionRules.map((rule, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-teal-200 bg-[#092226]/60 px-2.5 py-1 rounded">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                        <span>{rule}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#16484e]/60">
                    <div className="text-xs font-mono text-[#94a9ab]">
                      Estimated Alpha: <span className="text-emerald-400 font-bold">{generatedCardlet.estReturn}</span>
                    </div>

                    {!isApproved ? (
                      <button
                        onClick={handleApproveCardlet}
                        className="px-4 py-2 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#071518] font-bold text-xs sm:text-sm font-sans flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all active:scale-95"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Approve Cardlet</span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Armed on Slot #{generatedCardlet.slotNumber} • Patrolling Jito bundle</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-[#5e7b80] font-mono text-xs">
                  <Sliders className="w-8 h-8 mx-auto mb-2 opacity-40 text-teal-400" />
                  <p>Type a natural language instruction above and click <span className="text-teal-300">Generate Cardlet</span>.</p>
                  <p className="text-[11px] mt-1 text-[#5e7b80]">Cardlets isolate risk, enforce stop-loss criteria, and lock in slot-exact execution.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Live Protocol Value Propositions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="p-4 rounded-xl bg-[#092226] border border-[#16484e] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-mono">1-Slot Latency</div>
              <div className="text-xs text-[#94a9ab]">Sub-second 390ms Jito tip bundles</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#092226] border border-[#16484e] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-mono">50% Hourly Burn</div>
              <div className="text-xs text-[#94a9ab]">Automated $REEF buyback on pump.fun</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#092226] border border-[#16484e] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-mono">0% Fee Tier</div>
              <div className="text-xs text-[#94a9ab]">Hold 1,000,000 $REEF for zero fee</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#092226] border border-[#16484e] flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Play className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-mono">Fable 5.2 LLM</div>
              <div className="text-xs text-[#94a9ab]">Deep-trace mempool parser</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
