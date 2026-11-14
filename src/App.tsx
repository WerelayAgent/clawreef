import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { OperationTape } from './components/OperationTape';
import { SquadSection } from './components/SquadSection';
import { WorkflowSection } from './components/WorkflowSection';
import { HunterDossier } from './components/HunterDossier';
import { SquadCustomizer } from './components/SquadCustomizer';
import { BuybackSection } from './components/BuybackSection';
import { Footer } from './components/Footer';
import { ScopeTerminalModal } from './components/ScopeTerminalModal';
import { INITIAL_RECEIPTS, CRITTERS } from './data/critters';
import { Cardlet, OperationReceipt, CritterId } from './types';

export function App() {
  const [receipts, setReceipts] = useState<OperationReceipt[]>(INITIAL_RECEIPTS);
  const [cardlets, setCardlets] = useState<Cardlet[]>([]);
  const [scopeModalOpen, setScopeModalOpen] = useState(false);
  
  // Wallet simulation state
  const [walletConnected, setWalletConnected] = useState(true);
  const [walletAddress] = useState('7kP9z8aXW9e4dM3s2L1r5Q6t7Y8u9I0oP');
  const [walletBalance, setWalletBalance] = useState(24.85);

  const handleToggleWallet = () => {
    setWalletConnected((prev) => !prev);
  };

  const handleCardletCreated = (newCardlet: Cardlet) => {
    setCardlets((prev) => [newCardlet, ...prev]);

    // Also simulate an on-chain execution receipt added to the live Operation Tape!
    const critter = CRITTERS.find((c) => c.id === newCardlet.critterId) || CRITTERS[0];
    const newReceipt: OperationReceipt = {
      id: `rec-${Date.now().toString().slice(-4)}`,
      critterId: newCardlet.critterId,
      critterName: critter.name,
      action: newCardlet.critterId === 'pinch' ? 'SNIPE' : newCardlet.critterId === 'shell' ? 'PROTECT' : 'BUY',
      tokenSymbol: 'REEF-AI',
      tokenName: 'Clawreef Strategy Execution',
      tokenAddress: 'Reef...pump',
      solAmount: 0.50,
      tokensAmount: '14,200,000',
      slot: newCardlet.slotNumber || 31928445,
      latencyMs: Math.floor(Math.random() * 120 + 130),
      pnl: '+24% (Initial)',
      pnlPositive: true,
      timeAgo: 'Just now',
      hash: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`,
    };

    setReceipts((prev) => [newReceipt, ...prev]);
    setWalletBalance((prev) => Math.max(0, prev - 0.50));
  };

  const handleSelectCritterForHero = (_id: CritterId) => {
    const el = document.getElementById('tidepool');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#071518] text-[#f1f8f8] flex flex-col font-sans selection:bg-teal-500/30 selection:text-teal-200">
      {/* Top Navbar */}
      <Navbar
        onOpenScope={() => setScopeModalOpen(true)}
        walletConnected={walletConnected}
        onToggleWallet={handleToggleWallet}
        walletAddress={walletAddress}
        walletBalance={walletBalance}
      />

      <main className="flex-1">
        {/* Living Tide Pool Hero Section */}
        <HeroSection
          onCardletCreated={handleCardletCreated}
          onOpenScope={() => setScopeModalOpen(true)}
        />

        {/* Live Slot Execution Tape */}
        <OperationTape receipts={receipts} />

        {/* 01 The Squad */}
        <SquadSection onSelectCritterForHero={handleSelectCritterForHero} />

        {/* 02 Say it. Approve it. Watch it. */}
        <WorkflowSection />

        {/* 03 Hunter's Dossier */}
        <HunterDossier />

        {/* 04 Squad Customizer */}
        <SquadCustomizer />

        {/* 05 60-Minute Buyback & Burn */}
        <BuybackSection />
      </main>

      {/* Footer */}
      <Footer onOpenScope={() => setScopeModalOpen(true)} />

      {/* Scope CLI Terminal Modal */}
      <ScopeTerminalModal
        isOpen={scopeModalOpen}
        onClose={() => setScopeModalOpen(false)}
        walletAddress={walletAddress}
        walletBalance={walletBalance}
      />
    </div>
  );
}

export default App;
