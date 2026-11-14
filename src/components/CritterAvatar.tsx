import React from 'react';
import { CritterId } from '../types';

interface CritterAvatarProps {
  id: CritterId;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isAnimated?: boolean;
}

export const CritterAvatar: React.FC<CritterAvatarProps> = ({
  id,
  size = 'md',
  className = '',
  isAnimated = false,
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20',
    xl: 'w-32 h-32',
  };

  const getSvg = () => {
    switch (id) {
      case 'dig': // Hermit Crab Hunter with Sonar
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="#0f2e34" stroke="#14b8a6" strokeWidth="2.5" strokeDasharray="4 2" />
            {/* Shell spiral */}
            <path d="M50 20C66 20 78 32 78 48C78 62 66 74 52 74C40 74 32 64 32 52C32 42 40 36 48 36C54 36 58 40 58 46" stroke="#2dd4bf" strokeWidth="3" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="38" cy="30" r="5" fill="#14b8a6" className={isAnimated ? 'animate-ping' : ''} />
            <circle cx="38" cy="30" r="2.5" fill="#ffffff" />
            <circle cx="62" cy="30" r="5" fill="#14b8a6" />
            <circle cx="62" cy="30" r="2.5" fill="#ffffff" />
            {/* Claws */}
            <path d="M24 50C18 42 16 34 22 28C28 22 34 28 32 38" stroke="#14b8a6" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M76 50C82 42 84 34 78 28C72 22 66 28 68 38" stroke="#14b8a6" strokeWidth="3.5" strokeLinecap="round" />
            {/* Sonar rings */}
            <circle cx="50" cy="50" r="14" stroke="#5eead4" strokeWidth="1.5" strokeOpacity="0.4" />
            <circle cx="50" cy="50" r="26" stroke="#5eead4" strokeWidth="1" strokeOpacity="0.2" />
          </svg>
        );

      case 'tide': // Flowing Manta / Tidal Jelly
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="#0b242e" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="3 3" />
            {/* Manta Wings */}
            <path d="M50 22C30 35 15 48 20 62C26 74 42 66 50 82C58 66 74 74 80 62C85 48 70 35 50 22Z" fill="#0891b2" fillOpacity="0.3" stroke="#06b6d4" strokeWidth="2.5" />
            {/* Wave crest inside */}
            <path d="M35 48C42 42 48 54 55 48C62 42 66 52 70 48" stroke="#67e8f9" strokeWidth="2" strokeLinecap="round" />
            {/* Glowing Flow Eyes */}
            <circle cx="44" cy="38" r="3" fill="#67e8f9" />
            <circle cx="56" cy="38" r="3" fill="#67e8f9" />
            {/* Sub-second ripple tail */}
            <path d="M50 82C48 88 52 92 50 96" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'pinch': // High-voltage Red/Coral Crab with Sniping Pincer
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="#26150b" stroke="#f97316" strokeWidth="2.5" />
            {/* Crab Body */}
            <ellipse cx="50" cy="54" rx="24" ry="18" fill="#ea580c" fillOpacity="0.25" stroke="#f97316" strokeWidth="2.5" />
            {/* Large Sniping Pincer Left */}
            <path d="M28 44C16 38 10 24 18 16C26 8 32 20 30 34" stroke="#fb923c" strokeWidth="4" strokeLinecap="round" />
            <path d="M22 22L12 18" stroke="#fdba74" strokeWidth="2.5" strokeLinecap="round" />
            {/* Smaller Pincer Right */}
            <path d="M72 48C80 44 86 36 82 28C78 20 72 26 70 36" stroke="#f97316" strokeWidth="3" strokeLinecap="round" />
            {/* Laser Eye Scope */}
            <circle cx="43" cy="45" r="4" fill="#fb923c" />
            <circle cx="43" cy="45" r="1.5" fill="#fff" />
            <circle cx="57" cy="45" r="5" fill="#ef4444" className={isAnimated ? 'animate-pulse' : ''} />
            <circle cx="57" cy="45" r="2" fill="#fef08a" />
            {/* Reticle Lines */}
            <line x1="57" y1="36" x2="57" y2="40" stroke="#f87171" strokeWidth="1.5" />
            <line x1="62" y1="45" x2="66" y2="45" stroke="#f87171" strokeWidth="1.5" />
            {/* Legs */}
            <path d="M30 65L20 75M70 65L80 75M36 70L28 82M64 70L72 82" stroke="#ea580c" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );

      case 'shell': // Armored Nautilus Shell Guard
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="#0b291d" stroke="#10b981" strokeWidth="2.5" />
            {/* Hexagonal Shield Plate */}
            <polygon points="50,22 75,36 75,64 50,78 25,64 25,36" fill="#059669" fillOpacity="0.25" stroke="#10b981" strokeWidth="2.5" />
            {/* Inner concentric protection lock */}
            <polygon points="50,32 66,42 66,60 50,70 34,60 34,42" stroke="#34d399" strokeWidth="1.5" strokeDasharray="3 2" />
            {/* Guard Core Lock */}
            <circle cx="50" cy="51" r="7" fill="#10b981" />
            <path d="M47 51L49 53L53 49" stroke="#071518" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            {/* Safety Perimeter sparks */}
            <circle cx="50" cy="22" r="2.5" fill="#6ee7b7" />
            <circle cx="75" cy="50" r="2.5" fill="#6ee7b7" />
            <circle cx="25" cy="50" r="2.5" fill="#6ee7b7" />
            <circle cx="50" cy="78" r="2.5" fill="#6ee7b7" />
          </svg>
        );

      case 'scuttle': // Spider Crab Scout with Radar Antenna
        return (
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <circle cx="50" cy="50" r="46" fill="#201131" stroke="#a855f7" strokeWidth="2.5" />
            {/* Scout Body */}
            <ellipse cx="50" cy="55" rx="18" ry="15" fill="#9333ea" fillOpacity="0.25" stroke="#a855f7" strokeWidth="2" />
            {/* Long Antennas */}
            <path d="M44 42L32 18M32 18L26 22M32 18L30 12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
            <path d="M56 42L68 18M68 18L74 22M68 18L70 12" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" />
            {/* Radar Wave */}
            <path d="M24 16C36 6 64 6 76 16" stroke="#e9d5ff" strokeWidth="1.5" strokeDasharray="3 3" />
            {/* Eyes */}
            <circle cx="44" cy="50" r="3.5" fill="#d8b4fe" />
            <circle cx="44" cy="50" r="1.5" fill="#3b0764" />
            <circle cx="56" cy="50" r="3.5" fill="#d8b4fe" />
            <circle cx="56" cy="50" r="1.5" fill="#3b0764" />
            {/* Multiple Spidery legs */}
            <path d="M32 50L18 45M32 56L16 60M34 62L22 74M68 50L82 45M68 56L84 60M66 62L78 74" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
    }
  };

  return (
    <div className={`relative flex items-center justify-center shrink-0 ${sizeMap[size]} ${className}`}>
      {getSvg()}
    </div>
  );
};
