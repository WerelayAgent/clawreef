import React, { useState } from 'react';
import { OperationReceipt, CritterId } from '../types';
import { ExternalLink, Filter, Play, Pause, ArrowUpRight, Zap } from 'lucide-react';
import { CritterAvatar } from './CritterAvatar';

interface OperationTapeProps {
  receipts: OperationReceipt[];
}

export const OperationTape: React.FC<OperationTapeProps> = ({ receipts }) => {
  const [filterCritter, setFilterCritter] = useState<CritterId | 'all'>('all');
  const [isLive, setIsLive] = useState(true);

  const filteredReceipts = filterCritter === 'all'
    ? receipts
    : receipts.filter((r) => r.critterId === filterCritter);

  return (
    <section className="bg-[#061517] border-y border-[#16484e]/70 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isLive ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}`}></span>
              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                Live Operation Tape (Solana Mempool)
              </h3>
            </div>
            <button
              onClick={() => setIsLive(!isLive)}
              className="px-2 py-0.5 rounded bg-[#0b242a] border border-[#16484e] text-[11px] font-mono text-[#94a9ab] hover:text-white flex items-center gap-1"
            >
              {isLive ? <Pause className="w-3 h-3 text-emerald-400" /> : <Play className="w-3 h-3 text-amber-400" />}
              <span>{isLive ? 'Live' : 'Paused'}</span>
            </button>
          </div>

          {/* Critter Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            <span className="text-[11px] font-mono text-[#5e7b80] mr-1 hidden sm:inline">Filter:</span>
            {(['all', 'dig', 'tide', 'pinch', 'shell', 'scuttle'] as const).map((id) => (
              <button
                key={id}
                onClick={() => setFilterCritter(id)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono capitalize transition-colors ${
                  filterCritter === id
                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40 font-bold'
                    : 'bg-[#081b1e] text-[#94a9ab] border border-[#16484e]/40 hover:text-white'
                }`}
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Live Ticker Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredReceipts.slice(0, 6).map((item) => (
            <div
              key={item.id}
              className="bg-[#092226] border border-[#16484e]/80 hover:border-teal-500/40 rounded-xl p-3.5 transition-all hover:bg-[#0c2a30] text-xs font-mono group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CritterAvatar id={item.critterId} size="sm" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white font-sans">{item.critterName}</span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                        item.action === 'SNIPE'
                          ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                          : item.action === 'BUY'
                          ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                          : item.action === 'PROTECT'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                      }`}>
                        {item.action}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#5e7b80]">{item.timeAgo} • Slot #{item.slot}</span>
                  </div>
                </div>

                {item.pnl && (
                  <div className={`px-2 py-0.5 rounded font-bold text-[11px] ${
                    item.pnlPositive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                  }`}>
                    {item.pnl}
                  </div>
                )}
              </div>

              <div className="bg-[#06181b] p-2 rounded-lg border border-[#16484e]/40 mb-2 flex items-center justify-between">
                <div>
                  <div className="text-white font-bold">{item.tokenSymbol}</div>
                  <div className="text-[10px] text-[#5e7b80] truncate max-w-[140px]">{item.tokenName}</div>
                </div>
                <div className="text-right">
                  <div className="text-teal-300 font-bold">{item.solAmount > 0 ? `${item.solAmount} SOL` : item.tokensAmount}</div>
                  <div className="text-[10px] text-[#94a9ab]">{item.solAmount > 0 ? item.tokensAmount : 'Inspected'}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-[#5e7b80] pt-1 border-t border-[#16484e]/30">
                <div className="flex items-center gap-1 text-emerald-400">
                  <Zap className="w-3 h-3" />
                  <span>Latency: {item.latencyMs}ms</span>
                </div>
                <a
                  href={`https://solscan.io/tx/${item.hash}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-teal-300 transition-colors"
                >
                  <span>tx: {item.hash}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
