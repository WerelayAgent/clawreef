export type CritterId = 'dig' | 'tide' | 'pinch' | 'shell' | 'scuttle';

export interface Critter {
  id: CritterId;
  name: string;
  role: string;
  specialty: string;
  model: string;
  stateWord: string;
  description: string;
  activeStatus: string;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  stats: {
    label: string;
    value: string;
  }[];
  samplePrompts: string[];
  recentAction: string;
  slotLatency: string;
}

export interface Cardlet {
  id: string;
  critterId: CritterId;
  title: string;
  prompt: string;
  targetCriteria: string;
  executionRules: string[];
  status: 'draft' | 'approved' | 'executing' | 'filled';
  timestamp: string;
  slotNumber?: number;
  estReturn?: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'DEGEN';
}

export interface OperationReceipt {
  id: string;
  critterId: CritterId;
  critterName: string;
  action: 'BUY' | 'SELL' | 'SNIPE' | 'PROTECT' | 'FLAG';
  tokenSymbol: string;
  tokenName: string;
  tokenAddress: string;
  solAmount: number;
  tokensAmount: string;
  slot: number;
  latencyMs: number;
  pnl?: string;
  pnlPositive?: boolean;
  timeAgo: string;
  hash: string;
}

export interface DossierEntry {
  id: string;
  tokenName: string;
  tokenSymbol: string;
  ca: string;
  entryMc: string;
  peakMc: string;
  multiplier: string;
  discoveredSlot: number;
  firstInsiderWallet: string;
  narrative: string;
  date: string;
  chartData: number[];
}
