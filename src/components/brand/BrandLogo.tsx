import React from 'react';
import { EMBLEM_IMAGE } from '../../data/mockData';

interface BrandLogoProps {
  variant?: 'full' | 'mark' | 'badge' | 'footer';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'mark',
  size = 'md',
  className = '',
}) => {
  // Stylized Pencil "P" Vector Icon faithful to the uploaded brand identity
  const PencilPLogo = ({ iconSize }: { iconSize: number }) => (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-[0_0_12px_rgba(250,204,21,0.5)]"
    >
      <defs>
        <linearGradient id="pBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="45%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>
        <linearGradient id="pTrimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0F172A" />
          <stop offset="100%" stopColor="#1E293B" />
        </linearGradient>
        <linearGradient id="glowRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#F43F5E" />
        </linearGradient>
      </defs>

      {/* Outer subtle glow rim */}
      <circle cx="60" cy="60" r="56" stroke="url(#glowRing)" strokeWidth="2.5" opacity="0.4" strokeDasharray="6 4" />
      
      {/* Background circle badge for contrast */}
      <circle cx="60" cy="60" r="50" fill="#070B19" />

      {/* Pencil Upper & Loop forming "P" */}
      {/* The main outer loop of P */}
      <path
        d="M 38 92 L 38 28 C 38 24 41 22 45 22 L 74 22 C 90 22 100 32 100 48 C 100 64 89 74 74 74 L 56 74 L 56 92 Z"
        fill="url(#pBodyGrad)"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />

      {/* Inner cutout of P */}
      <path
        d="M 56 36 L 72 36 C 81 36 86 41 86 48 C 86 55 81 60 72 60 L 56 60 Z"
        fill="#070B19"
        stroke="#FFFFFF"
        strokeWidth="2.5"
      />

      {/* Pencil Sharpened Tip pointing down at bottom-left */}
      <path
        d="M 38 78 L 38 98 L 26 108 L 30 88 Z"
        fill="#FEF08A"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      {/* Graphite Lead Tip */}
      <polygon points="26,108 24,112 28,110" fill="#18181B" />

      {/* Pencil Stripes / Facets */}
      <line x1="47" y1="23" x2="47" y2="73" stroke="#F59E0B" strokeWidth="2.5" opacity="0.6" />
      <line x1="52" y1="23" x2="52" y2="73" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8" />
      <line x1="38" y1="78" x2="56" y2="78" stroke="#1E293B" strokeWidth="3" />
    </svg>
  );

  if (variant === 'badge') {
    return (
      <div className={`relative group inline-block ${className}`}>
        <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-70 group-hover:opacity-100 transition duration-500 animate-pulse-glow" />
        <img
          src={EMBLEM_IMAGE}
          alt="Project In The Making Official Emblem"
          referrerPolicy="no-referrer"
          className="relative rounded-full w-28 h-28 sm:w-36 sm:h-36 object-cover border-2 border-cyan-400/50 shadow-2xl"
        />
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="relative">
          <PencilPLogo iconSize={size === 'lg' ? 44 : 36} />
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1 font-display tracking-tight text-white font-bold leading-none text-base sm:text-lg">
            <span>Project<span className="text-cyan-400">In</span>The<span className="text-amber-400">Making</span></span>
          </div>
          <span className="font-script text-xs sm:text-sm text-cyan-300 font-semibold tracking-wide mt-0.5 leading-none">
            Your Work, Our Responsibility!
          </span>
        </div>
      </div>
    );
  }

  // Mark variant - Single-element Brand Zone compliant with Top Bar Contract
  const iconDimensions = size === 'sm' ? 28 : size === 'lg' ? 40 : 34;

  return (
    <div className={`inline-flex items-center gap-2.5 font-display font-bold tracking-tight text-white select-none group ${className}`}>
      <PencilPLogo iconSize={iconDimensions} />
      <span className="text-base sm:text-lg tracking-tight group-hover:text-cyan-200 transition-colors">
        Project<span className="text-cyan-400">In</span>The<span className="text-amber-400">Making</span>
      </span>
    </div>
  );
};
