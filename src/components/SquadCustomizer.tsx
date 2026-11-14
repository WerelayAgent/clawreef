import React, { useState } from 'react';
import { CRITTERS } from '../data/critters';
import { CritterAvatar } from './CritterAvatar';
import { CritterId } from '../types';
import { Palette, Check, RotateCcw, Sparkles } from 'lucide-react';

export const SquadCustomizer: React.FC = () => {
  const [nicknames, setNicknames] = useState<Record<CritterId, string>>({
    dig: 'Dig',
    tide: 'Tide',
    pinch: 'Pinch',
    shell: 'Shell',
    scuttle: 'Scuttle',
  });

  const [colorThemes, setColorThemes] = useState<Record<CritterId, string>>({
    dig: '#14b8a6', // Teal
    tide: '#06b6d4', // Cyan
    pinch: '#f97316', // Coral
    shell: '#10b981', // Emerald
    scuttle: '#a855f7', // Purple
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const availableColors = [
    { label: 'Reef Teal', hex: '#14b8a6' },
    { label: 'Cyan Tide', hex: '#06b6d4' },
    { label: 'Coral Flame', hex: '#f97316' },
    { label: 'Shell Guard', hex: '#10b981' },
    { label: 'Abyss Purple', hex: '#a855f7' },
    { label: 'Amber Gold', hex: '#eab308' },
    { label: 'Rose Pearl', hex: '#f43f5e' },
  ];

  const handleNameChange = (id: CritterId, name: string) => {
    setNicknames((prev) => ({ ...prev, [id]: name }));
  };

  const handleColorChange = (id: CritterId, color: string) => {
    setColorThemes((prev) => ({ ...prev, [id]: color }));
  };

  const handleReset = () => {
    setNicknames({
      dig: 'Dig',
      tide: 'Tide',
      pinch: 'Pinch',
      shell: 'Shell',
      scuttle: 'Scuttle',
    });
    setColorThemes({
      dig: '#14b8a6',
      tide: '#06b6d4',
      pinch: '#f97316',
      shell: '#10b981',
      scuttle: '#a855f7',
    });
    setSavedSuccess(false);
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <section id="customizer" className="py-20 bg-[#06181b] border-t border-[#16484e]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#16484e]/60 pb-6">
          <div>
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs uppercase tracking-wider mb-2">
              <Palette className="w-3.5 h-3.5" />
              <span>04 Customization Chamber</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Personalize Your Critter Squad
            </h2>
          </div>
          <p className="text-sm text-[#94a9ab] max-w-md mt-4 md:mt-0 font-mono leading-relaxed">
            Name your trading agents, adjust bio-luminescence shades, and tailor the squad to your personal Solana desk aesthetics.
          </p>
        </div>

        {/* Customization Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {CRITTERS.map((critter) => (
            <div
              key={critter.id}
              className="bg-[#092226] border border-[#16484e] rounded-2xl p-4 flex flex-col items-center text-center shadow-lg hover:border-teal-500/40 transition-colors"
            >
              <div className="p-3 mb-3 relative">
                <div
                  className="absolute inset-0 rounded-full blur-md opacity-30 transition-all"
                  style={{ backgroundColor: colorThemes[critter.id] }}
                />
                <CritterAvatar id={critter.id} size="lg" isAnimated={true} />
              </div>

              {/* Editable Name */}
              <div className="w-full mb-3">
                <label className="block text-[10px] font-mono text-[#5e7b80] mb-1">
                  CRITTER NAME
                </label>
                <input
                  type="text"
                  value={nicknames[critter.id]}
                  onChange={(e) => handleNameChange(critter.id, e.target.value)}
                  className="w-full bg-[#07191c] border border-[#16484e] rounded-lg px-2.5 py-1.5 text-center text-sm font-bold text-white font-sans focus:outline-none focus:border-teal-400 font-mono"
                  placeholder={critter.name}
                />
                <span className="text-[10px] text-teal-300 font-mono mt-1 block">
                  {critter.role}
                </span>
              </div>

              {/* Color Swatches */}
              <div className="w-full pt-2 border-t border-[#16484e]/60">
                <label className="block text-[10px] font-mono text-[#5e7b80] mb-1.5">
                  SHELL PIGMENT
                </label>
                <div className="flex items-center justify-center gap-1.5 flex-wrap">
                  {availableColors.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => handleColorChange(critter.id, c.hex)}
                      title={c.label}
                      className={`w-5 h-5 rounded-full transition-transform ${
                        colorThemes[critter.id] === c.hex ? 'scale-125 ring-2 ring-white' : 'hover:scale-110 opacity-70 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#092226] border border-[#16484e]">
          <div className="flex items-center gap-2 font-mono text-xs text-[#94a9ab]">
            <Sparkles className="w-4 h-4 text-teal-400" />
            <span>Squad configuration persists to your local Solana wallet session.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-[#07191c] hover:bg-[#10343c] border border-[#16484e] text-[#94a9ab] hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-[#071518] font-sans text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(20,184,166,0.3)] transition-all active:scale-95"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4 text-[#071518]" />
                  <span>Config Saved!</span>
                </>
              ) : (
                <>
                  <span>Save Squad Preset</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
