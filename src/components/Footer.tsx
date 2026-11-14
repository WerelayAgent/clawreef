import React from 'react';
import { ExternalLink, Terminal, Shield, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onOpenScope: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenScope }) => {
  return (
    <footer className="bg-[#051113] border-t border-[#16484e]/70 pt-16 pb-12 text-[#94a9ab] font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-500/40 flex items-center justify-center p-1 text-teal-400">
                <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" opacity="0.2" fill="currentColor"/>
                  <path d="m14 18 4-4-4-4" />
                  <path d="m10 6-4 4 4 4" />
                </svg>
              </div>
              <span className="font-extrabold text-xl text-white font-sans tracking-tight">
                Claw<span className="text-teal-400">reef</span>
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-300 border border-teal-500/20">
                $REEF
              </span>
            </div>

            <p className="text-xs text-[#94a9ab] max-w-md leading-relaxed font-mono">
              5 autonomous AI trading critters patrolling Solana mempools. Natural language prompts compiled into hard-bounded Cardlets. Powered by Claude Fable 5.2.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={onOpenScope}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#092226] hover:bg-[#0d3137] border border-[#16484e] text-teal-300 transition-colors"
              >
                <Terminal className="w-3.5 h-3.5 text-teal-400" />
                <span>Launch Scope CLI</span>
              </button>
              <a
                href="https://pump.fun"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#092226] hover:bg-[#0d3137] border border-[#16484e] text-orange-400 transition-colors"
              >
                <span>Live on pump.fun</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Critters Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              The 5 Critters
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#tidepool" className="hover:text-teal-300 transition-colors">
                  Dig (The Hunter)
                </a>
              </li>
              <li>
                <a href="#tidepool" className="hover:text-teal-300 transition-colors">
                  Tide (The Copier)
                </a>
              </li>
              <li>
                <a href="#tidepool" className="hover:text-teal-300 transition-colors">
                  Pinch (The Sniper)
                </a>
              </li>
              <li>
                <a href="#tidepool" className="hover:text-teal-300 transition-colors">
                  Shell (The Guard)
                </a>
              </li>
              <li>
                <a href="#tidepool" className="hover:text-teal-300 transition-colors">
                  Scuttle (The Scout)
                </a>
              </li>
            </ul>
          </div>

          {/* Protocol Links */}
          <div>
            <h4 className="font-bold text-white uppercase tracking-wider mb-3 text-xs">
              Protocol & Docs
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#workflow" className="hover:text-teal-300 transition-colors">
                  Cardlet Architecture
                </a>
              </li>
              <li>
                <a href="#flywheel" className="hover:text-teal-300 transition-colors">
                  60-min Buyback & Burn
                </a>
              </li>
              <li>
                <a href="#customizer" className="hover:text-teal-300 transition-colors">
                  Squad Customizer
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/WerelayAgent/clawreef"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-teal-300 transition-colors flex items-center gap-1"
                >
                  <span>GitHub Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & disclaimer */}
        <div className="pt-8 border-t border-[#16484e]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#5e7b80]">
          <div>
            &copy; {new Date().getFullYear()} Clawreef Protocol. Built with Claude Fable 5.2 on Solana.
          </div>
          <div>
            1-Slot Jito Sub-second Execution • No MEV Collisions
          </div>
        </div>
      </div>
    </footer>
  );
};
