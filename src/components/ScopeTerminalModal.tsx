import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, CornerDownLeft, Shield, Cpu, RefreshCw } from 'lucide-react';
import { CRITTERS } from '../data/critters';

interface ScopeTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  walletAddress: string;
  walletBalance: number;
}

interface CommandLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

export const ScopeTerminalModal: React.FC<ScopeTerminalModalProps> = ({
  isOpen,
  onClose,
  walletAddress,
  walletBalance,
}) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: '1',
      type: 'system',
      text: 'CLAWREEF SCOPE TERMINAL v5.2.0 [Solana Jito Engine]',
    },
    {
      id: '2',
      type: 'system',
      text: 'Type "help" for a list of available commands or "status" to inspect active critters.',
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newLogs: CommandLog[] = [
      ...history,
      { id: Date.now().toString(), type: 'input', text: `reef> ${cmd}` },
    ];

    const lower = cmd.toLowerCase();

    if (lower === 'help') {
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `AVAILABLE COMMANDS:
  status        - Check Solana RPC, current slot, and active critter states
  critters      - List all 5 critters and their current telemetry
  dossier       - Show recent insider wallet catches discovered by Dig
  burn          - Display next 60-min buyback & burn schedule
  balance       - Inspect connected wallet SOL & $CLAWR balance
  cardlets      - Show currently armed Cardlets
  clear         - Clear terminal display buffer
  exit          - Close Scope terminal`,
      });
    } else if (lower === 'status') {
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `[SYSTEM STATUS]
  RPC:          Solana Mainnet-Beta (Jito Block Engine)
  SLOT:         #31,928,442 (1-Slot confirmation confirmed)
  LATENCY:      385ms roundtrip
  CRITTERS:     5/5 Online (Dig, Tide, Pinch, Shell, Scuttle)
  MEMPOOL:      Clear • 0 dropped bundles`,
      });
    } else if (lower === 'critters') {
      const critterText = CRITTERS.map(
        (c) => `  * ${c.name.padEnd(8)} [${c.stateWord.padEnd(8)}] - ${c.role} (${c.slotLatency})`
      ).join('\n');
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `ACTIVE SQUAD TELEMETRY:\n${critterText}`,
      });
    } else if (lower === 'balance') {
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `CONNECTED ACCOUNT: ${walletAddress}\n  SOL Balance:   ${walletBalance.toFixed(3)} SOL\n  $CLAWR Balance: 1,500,000 $CLAWR (Tier: 0% Free Trading Fee)`,
      });
    } else if (lower === 'burn') {
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `[HOURLY BUYBACK ENGINE]
  Next Burn In:    23m 42s
  Accumulated Pot: 14.85 SOL
  Total Burned:    142.5M $CLAWR
  Protocol Fee:    1% (50% to burn, 50% to treasury)`,
      });
    } else if (lower === 'dossier') {
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'output',
        text: `[HUNTER'S DOSSIER LATEST]
  1. $TIDE  - 250x | CA: Tid3pL8...pump | Discovered Slot #31784912
  2. $CLAW  - 69x  | CA: Claw99...pump | Discovered Slot #31690184
  3. $BARN  - 41x  | CA: Bar88...pump  | Discovered Slot #31548201`,
      });
    } else if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (lower === 'exit') {
      onClose();
      return;
    } else {
      newLogs.push({
        id: (Date.now() + 1).toString(),
        type: 'error',
        text: `Command not recognized: "${cmd}". Type "help" for a list of available commands.`,
      });
    }

    setHistory(newLogs);
    setInputVal('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-3xl rounded-2xl bg-[#051113] border border-teal-500/50 shadow-[0_0_50px_rgba(20,184,166,0.25)] flex flex-col h-[520px] overflow-hidden relative">
        {/* Top Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#081e22] border-b border-[#16484e]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5 mr-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block cursor-pointer" onClick={onClose}></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
            </div>
            <Terminal className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-mono font-bold text-white tracking-wider">
              CLAWREEF SCOPE TERMINAL (JITO-MEV)
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-[#0e333a] text-[#94a9ab] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Console Log Area */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2 scanlines text-teal-200/90 selection:bg-teal-500/30">
          {history.map((log) => (
            <div key={log.id} className="leading-relaxed">
              {log.type === 'input' ? (
                <div className="text-white font-bold">{log.text}</div>
              ) : log.type === 'system' ? (
                <div className="text-[#5e7b80] italic">{log.text}</div>
              ) : log.type === 'error' ? (
                <div className="text-rose-400">{log.text}</div>
              ) : (
                <pre className="text-teal-300 font-mono whitespace-pre-wrap">{log.text}</pre>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleCommand} className="flex items-center px-4 py-3 bg-[#07191c] border-t border-[#16484e]">
          <span className="text-teal-400 font-mono text-xs font-bold mr-2">reef&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help', 'status', 'critters'..."
            className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-[#5e7b80]"
          />
          <button
            type="submit"
            className="p-1 text-teal-400 hover:text-teal-300 transition-colors"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
