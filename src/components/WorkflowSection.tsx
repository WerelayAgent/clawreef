import React, { useState } from 'react';
import { MessageSquare, ShieldCheck, Eye, ArrowRight, Check, Zap, Cpu } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(1);

  const steps = [
    {
      num: '01',
      title: 'Say it',
      subtitle: 'Natural Language Input',
      icon: MessageSquare,
      color: 'teal',
      borderColor: 'border-teal-500',
      badgeBg: 'bg-teal-500/20 text-teal-300',
      description: 'Speak or write in normal English. Tell your critters what narratives you care about, which smart money wallets to shadow, or what risk rules to enforce.',
      snippetTitle: 'User Prompt Example',
      snippet: `"Dig, look for insider wallets funded directly by Kraken that launch pump.fun coins within 15 minutes. Snipe 0.5 SOL with Pinch and tell Shell to set a 2x take-profit and 25% trailing stop."`,
    },
    {
      num: '02',
      title: 'Approve it',
      subtitle: 'Cardlet Synthesis & Risk Containment',
      icon: ShieldCheck,
      color: 'cyan',
      borderColor: 'border-cyan-500',
      badgeBg: 'bg-cyan-500/20 text-cyan-300',
      description: 'Claude Fable 5.2 transforms ambiguous prompts into deterministic, hard-bounded Cardlets. You verify slippage caps, max capital exposure, and auto-exit criteria before anything touches the chain.',
      snippetTitle: 'Compiled Cardlet Blueprint',
      snippet: `CARDLET_ID: #CRD-8941 | STATUS: ARMED
TARGET_CRITERIA: Inflow > 2 SOL from CEX Hot-Wallet
MAX_CAPITAL: 0.50 SOL | SLIPPAGE_CAP: 3.5%
TP: 100% (+2x) | TRAILING_SL: 25% Peak
JITO_TIP: 0.03 SOL (Bundle Slot Priority 0-1)`,
    },
    {
      num: '03',
      title: 'Watch it',
      subtitle: '1-Slot Execution & Live Receipts',
      icon: Eye,
      color: 'orange',
      borderColor: 'border-orange-500',
      badgeBg: 'bg-orange-500/20 text-orange-300',
      description: 'Your critters execute in the exact block of opportunity. Every trade produces an auditable cryptographic receipt with exact slot numbers, millisecond latency metrics, and real-time PnL tracking.',
      snippetTitle: 'Cryptographic Fill Receipt',
      snippet: `RECEIPT: tx_9xK8...4m2a | SLOT: #31,928,421
CRITTER: Pinch (The Sniper) | TOKEN: $CORAL
FILLED: 18,200,000 TOKENS @ 0.50 SOL
EXECUTION_LATENCY: 142ms (Slot 0 Landed)
CURRENT_PNL: +185% (Shell monitoring TP @ 2.0x)`,
    },
  ];

  return (
    <section id="workflow" className="py-20 bg-[#06181b] relative overflow-hidden border-t border-[#16484e]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-teal-400"></span>
            <span>02 The Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Say it. Approve it. Watch it.
          </h2>
          <p className="text-sm sm:text-base text-[#94a9ab] font-mono leading-relaxed">
            The friction of complex DEX routing and bot scripts, eliminated. Here is how your prompt turns into on-chain alpha in 3 simple steps.
          </p>
        </div>

        {/* Step Selector Pills */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-xl bg-[#092226] border border-[#16484e] gap-2">
            {steps.map((st, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i + 1)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                  activeStep === i + 1
                    ? 'bg-teal-500 text-[#071518] shadow-[0_0_15px_rgba(20,184,166,0.3)]'
                    : 'text-[#94a9ab] hover:text-white hover:bg-[#0c2a30]'
                }`}
              >
                <span>{st.num}</span>
                <span>{st.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3 Interactive Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {steps.map((st, index) => {
            const Icon = st.icon;
            const isCurrent = activeStep === index + 1;

            return (
              <div
                key={index}
                onClick={() => setActiveStep(index + 1)}
                className={`rounded-2xl p-6 border transition-all cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-[#092226] border-teal-400 shadow-[0_0_25px_rgba(20,184,166,0.2)] scale-[1.02]'
                    : 'bg-[#07191c]/80 border-[#16484e]/70 hover:border-teal-500/40 hover:bg-[#092226]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-teal-400 font-mono">{st.num}</span>
                      <div className={`p-2 rounded-xl bg-[#0b282e] border border-[#16484e]`}>
                        <Icon className="w-5 h-5 text-teal-400" />
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold ${st.badgeBg}`}>
                      {st.subtitle}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white font-sans mb-2">
                    {st.title}
                  </h3>

                  <p className="text-xs text-[#94a9ab] leading-relaxed mb-5">
                    {st.description}
                  </p>
                </div>

                {/* Code / Snippet Box */}
                <div>
                  <div className="flex items-center justify-between mb-1.5 text-[10px] font-mono text-[#5e7b80]">
                    <span>{st.snippetTitle}</span>
                    <span className="text-teal-400/80">Interactive</span>
                  </div>
                  <pre className="p-3 rounded-xl bg-[#041113] border border-[#16484e]/80 text-[11px] font-mono text-teal-200/90 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                    {st.snippet}
                  </pre>
                </div>
              </div>
            );
          })}
        </div>

        {/* Latency Guarantee Strip */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#092226] via-[#0b282e] to-[#092226] border border-[#16484e] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white font-sans">
                Deterministic 1-Slot Solana Pipeline
              </h4>
              <p className="text-xs text-[#94a9ab] font-mono">
                Transactions submit directly via private Jito validators with tip bundling to completely eradicate front-running and failed mempool collisions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right font-mono">
              <div className="text-xs text-[#5e7b80]">Average Execution Window</div>
              <div className="text-xl font-bold text-emerald-400">~385ms</div>
            </div>
            <div className="w-px h-8 bg-[#16484e]"></div>
            <div className="text-right font-mono">
              <div className="text-xs text-[#5e7b80]">Bundle Success Rate</div>
              <div className="text-xl font-bold text-teal-300">99.2%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
