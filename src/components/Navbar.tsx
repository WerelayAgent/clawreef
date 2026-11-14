import React, { useState, useEffect } from 'react';
import { Terminal, Shield, Sparkles, ExternalLink, Activity, ChevronDown, Check, Copy } from 'lucide-react';

interface NavbarProps {
  onOpenScope: () => void;
  walletConnected: boolean;
  onToggleWallet: () => void;
  walletAddress: string;
  walletBalance: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenScope,
  walletConnected,
  onToggleWallet,
  walletAddress,
  walletBalance,
}) => {
  const [currentSlot, setCurrentSlot] = useState(31928420);
  const [copied, setCopied] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlot((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#071518]/85 border-b border-[#16484e]/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-900/40 border border-teal-500/40 flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(20,184,166,0.25)] group-hover:border-teal-400 transition-all">
              <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-teal-400 group-hover:scale-105 transition-transform" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity="0.2" fill="currentColor"/>
                <path d="m14 18 4-4-4-4" />
                <path d="m10 6-4 4 4 4" />
                <circle cx="12" cy="12" r="3" fill="currentColor" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white font-sans group-hover:text-teal-300 transition-colors">
                  Claw<span className="text-teal-400">reef</span>
                </span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Fable 5.2
                </span>
              </div>
              <span className="text-[10px] text-teal-400/60 font-mono hidden sm:inline">
                5 AUTONOMOUS TRADING CRITTERS
              </span>
            </div>
          </a>

          {/* Slot Badge */}
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#0b242a] border border-[#16484e] text-xs font-mono text-[#94a9ab]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Slot #{currentSlot.toLocaleString()}</span>
            <span className="text-[#5e7b80]">•</span>
            <span className="text-teal-400">1-Slot Fill</span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#94a9ab]">
          <a href="#tidepool" className="hover:text-teal-300 transition-colors flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
            Tide Pool
          </a>
          <a href="#squad" className="hover:text-teal-300 transition-colors">
            01 The Squad
          </a>
          <a href="#workflow" className="hover:text-teal-300 transition-colors">
            02 Workflow
          </a>
          <a href="#dossier" className="hover:text-teal-300 transition-colors">
            03 Hunter Dossier
          </a>
          <a href="#flywheel" className="hover:text-teal-300 transition-colors flex items-center gap-1">
            04 Buyback & Burn
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          {/* Scope Terminal Button */}
          <button
            onClick={onOpenScope}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0b242a] hover:bg-[#10343c] border border-teal-500/40 text-teal-300 text-xs sm:text-sm font-mono transition-all shadow-[0_0_12px_rgba(20,184,166,0.15)] active:scale-95"
          >
            <Terminal className="w-4 h-4 text-teal-400" />
            <span>Scope</span>
            <span className="hidden sm:inline text-[10px] px-1 py-0.2 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
              CLI
            </span>
          </button>

          {/* Connect Phantom Wallet Button */}
          {walletConnected ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-mono hover:bg-teal-500/20 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>{walletAddress.slice(0, 4)}...{walletAddress.slice(-4)}</span>
                <span className="text-teal-400/70 font-semibold">{walletBalance.toFixed(2)} SOL</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#092226] border border-[#16484e] shadow-2xl p-2 z-50 text-xs font-mono">
                  <div className="p-2 border-b border-[#16484e]/60 mb-1">
                    <div className="text-[#94a9ab]">Connected Account</div>
                    <div className="text-white font-medium truncate">{walletAddress}</div>
                    <div className="mt-1 flex items-center justify-between text-teal-400">
                      <span>Balance:</span>
                      <span className="font-bold">{walletBalance.toFixed(3)} SOL</span>
                    </div>
                  </div>
                  <button
                    onClick={copyAddress}
                    className="w-full flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-teal-500/10 text-[#94a9ab] hover:text-white transition-colors"
                  >
                    <span>{copied ? 'Copied!' : 'Copy Address'}</span>
                    {copied ? <Check className="w-3.5 h-3.5 text-teal-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={() => {
                      onToggleWallet();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded text-rose-400 hover:bg-rose-500/10 transition-colors mt-1"
                  >
                    Disconnect Wallet
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onToggleWallet}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-[#071518] font-bold text-xs sm:text-sm font-sans transition-all shadow-[0_0_15px_rgba(20,184,166,0.3)] active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>Connect</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
