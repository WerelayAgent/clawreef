import React, { useState, useEffect } from 'react';
import { Flame, Clock, ShieldCheck, ArrowRight, Zap, RefreshCw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const BuybackSection: React.FC = () => {
  const [secondsLeft, setSecondsLeft] = useState(1458); // ~24 mins
  const [totalBurned, setTotalBurned] = useState(142580000);
  const [totalValueUsd, setTotalValueUsd] = useState(148200);
  const [isBurning, setIsBurning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 3600));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSimulateBurn = () => {
    setIsBurning(true);
    setTimeout(() => {
      setTotalBurned((prev) => prev + 2500000);
      setTotalValueUsd((prev) => prev + 2650);
      setSecondsLeft(3600);
      setIsBurning(false);

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f97316', '#ea580c', '#fb923c', '#14b8a6'],
      });
    }, 1200);
  };

  return (
    <section id="flywheel" className="py-20 bg-[#071518] relative overflow-hidden">
      {/* Background radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs uppercase tracking-wider mb-3">
            <Flame className="w-3.5 h-3.5 fill-current animate-pulse" />
            <span>05 Deflationary Flywheel</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            The 60-Minute Buyback & Burn Engine
          </h2>
          <p className="text-sm sm:text-base text-[#94a9ab] font-mono leading-relaxed">
            50% of all critter trading fees flow automatically into public buybacks and permanent token burns on pump.fun.
          </p>
        </div>

        {/* Live Engine Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-12">
          {/* Left: Live Countdown & Stats (7 cols) */}
          <div className="lg:col-span-7 bg-[#092226] border border-orange-500/30 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#16484e]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping"></span>
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  Automated Solana Cron Daemon
                </span>
              </div>
              <span className="text-xs font-mono text-orange-400 font-bold">
                Cycle #814
              </span>
            </div>

            <div className="py-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs font-mono text-[#5e7b80] uppercase tracking-wider block mb-1">
                  Next Execution In
                </span>
                <div className="text-5xl sm:text-6xl font-black font-mono text-white tracking-tight flex items-baseline gap-2">
                  <span>{formatTime(secondsLeft)}</span>
                  <span className="text-base text-[#5e7b80] font-normal">MIN:SEC</span>
                </div>
                <span className="text-xs font-mono text-teal-300 mt-2 block">
                  Pending Pot: <strong className="text-white">14.85 SOL</strong> (~$2,970 ready for market sweep)
                </span>
              </div>

              <div className="shrink-0">
                <button
                  onClick={handleSimulateBurn}
                  disabled={isBurning}
                  className="px-5 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-[#071518] font-black font-sans text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(249,115,22,0.35)] transition-all active:scale-95 disabled:opacity-50"
                >
                  {isBurning ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Burning Tokens...</span>
                    </>
                  ) : (
                    <>
                      <Flame className="w-4 h-4 fill-current" />
                      <span>Trigger Mock Burn</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Metrics Ticker */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-[#16484e]">
              <div className="p-3 rounded-xl bg-[#06181b] border border-[#16484e]/60 font-mono">
                <span className="text-[10px] text-[#5e7b80] block">TOTAL $REEF BURNED</span>
                <span className="text-sm sm:text-base font-bold text-orange-400">
                  {(totalBurned / 1000000).toFixed(1)}M REEF
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#06181b] border border-[#16484e]/60 font-mono">
                <span className="text-[10px] text-[#5e7b80] block">USD EQUIVALENT</span>
                <span className="text-sm sm:text-base font-bold text-emerald-400">
                  ${totalValueUsd.toLocaleString()}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#06181b] border border-[#16484e]/60 font-mono col-span-2 sm:col-span-1">
                <span className="text-[10px] text-[#5e7b80] block">CIRCULATING REDUCED</span>
                <span className="text-sm sm:text-base font-bold text-teal-300">
                  14.2% Supply
                </span>
              </div>
            </div>
          </div>

          {/* Right: Fee Architecture & 0% Tier Card (5 cols) */}
          <div className="lg:col-span-5 bg-[#092226] border border-[#16484e] rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider mb-3">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>Tiered Fee Schedule</span>
              </div>

              <h3 className="text-2xl font-black text-white font-sans mb-3">
                Hold $REEF to Trade with 0% Fee
              </h3>

              <p className="text-xs text-[#94a9ab] font-mono leading-relaxed mb-6">
                All platform trades carry a nominal 1% fee. If you hold 1,000,000 or more $REEF in your connected Solana wallet, your fee drops to exactly 0%.
              </p>

              <div className="space-y-3 font-mono text-xs mb-6">
                <div className="p-3 rounded-xl bg-[#07191c] border border-[#16484e]/60 flex items-center justify-between">
                  <div>
                    <span className="text-white font-bold block">Standard Tier</span>
                    <span className="text-[#5e7b80] text-[11px]">&lt; 1,000,000 $REEF</span>
                  </div>
                  <span className="text-white font-bold text-sm">1.0% Fee</span>
                </div>

                <div className="p-3 rounded-xl bg-[#0b282e] border border-teal-500/40 flex items-center justify-between">
                  <div>
                    <span className="text-teal-300 font-bold block">Reef Whale Tier</span>
                    <span className="text-teal-400/70 text-[11px]">&gt;= 1,000,000 $REEF</span>
                  </div>
                  <span className="text-emerald-400 font-bold text-sm">0.0% Fee (Free)</span>
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#07191c] border border-[#16484e]/60 text-xs font-mono text-[#94a9ab] flex items-center gap-2">
              <Zap className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Burn transactions route via Raydium & pump.fun bonding curves.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
