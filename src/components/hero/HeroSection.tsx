import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageSquare, Terminal, Cpu, FileText, CheckCircle2, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { HERO_IMAGE, EMBLEM_IMAGE } from '../../data/mockData';

interface HeroSectionProps {
  onViewWorkClick: () => void;
  onRequestClick: () => void;
  onChatClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewWorkClick,
  onRequestClick,
  onChatClick,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden tech-grid">
      {/* Dynamic ambient lights & neon glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-gradient-to-tr from-cyan-600/15 via-purple-600/15 to-pink-600/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle circuit line decorative SVG in background */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuits" x="0" y="0" width="160" height="160" patternUnits="userSpaceOnUse">
            <path d="M 10 10 L 80 10 L 80 80 M 150 20 L 150 120 L 120 120 M 20 140 L 90 140" fill="none" stroke="#38bdf8" strokeWidth="0.8" />
            <circle cx="80" cy="80" r="3" fill="#a855f7" />
            <circle cx="10" cy="10" r="2.5" fill="#38bdf8" />
            <circle cx="120" cy="120" r="2.5" fill="#ec4899" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuits)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & CTAs (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-6">
            {/* Subtle Brand Slogan Header Banner inspired by uploaded badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-500/30 text-xs font-medium text-cyan-300 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-script text-base text-amber-300 font-bold tracking-wider">
                Your Work, Our Responsibility!
              </span>
              <span className="text-slate-500 hidden sm:inline">|</span>
              <span className="text-slate-300 hidden sm:inline">Academic Engineering Studio</span>
            </div>

            {/* 3D-styled Primary Headline */}
            <div 
              className="space-y-2 transition-transform duration-200 ease-out"
              style={{
                transform: `perspective(1000px) rotateX(${mousePos.y * -3}deg) rotateY(${mousePos.x * 3}deg)`,
              }}
            >
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] [text-wrap:balance]">
                YOUR UNIVERSITY WORK, <br />
                <span className="bg-gradient-to-r from-cyan-400 via-purple-300 to-amber-300 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.25)]">
                  FROM IDEA TO FINAL SUBMISSION.
                </span>
              </h1>
            </div>

            {/* Supporting text */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Assignments, handwritten lab work, university coding projects, DLD hardware breadboard circuits, reports, presentations, and complete FYP documentation.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onViewWorkClick}
                className="px-6 py-3.5 text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-xl shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>View Our Work</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={onRequestClick}
                className="px-6 py-3.5 text-sm font-semibold text-white bg-slate-900/90 hover:bg-slate-800 border border-cyan-400/30 hover:border-cyan-400/60 rounded-xl shadow-md transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <span>Request a Project</span>
              </button>

              <button
                onClick={onChatClick}
                className="px-5 py-3.5 text-sm font-medium text-cyan-300 hover:text-cyan-200 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/20 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                <span>Chat With Us</span>
              </button>
            </div>

            {/* Quick Trust Badges extracted from uploaded emblem */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-800/80 max-w-xl">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="font-medium">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span className="font-medium">Quality Work</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="font-medium">100% Confidential</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Interactive Academic Studio Visual (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div
              className="relative mx-auto max-w-lg lg:max-w-none transition-transform duration-300 ease-out"
              style={{
                transform: `perspective(1000px) rotateY(${mousePos.x * 6}deg) rotateX(${mousePos.y * -6}deg) translateY(${mousePos.y * 8}px)`,
              }}
            >
              {/* Outer Glowing Glass Frame */}
              <div className="relative rounded-2xl p-2.5 bg-gradient-to-b from-cyan-500/20 via-purple-500/10 to-pink-500/20 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)] group">
                <div className="relative rounded-xl overflow-hidden bg-[#070B18]">
                  <img
                    src={HERO_IMAGE}
                    alt="Project In The Making Academic Technology Workspace"
                    referrerPolicy="no-referrer"
                    className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Dark Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80 pointer-events-none" />

                  {/* Brand Emblem Stamp at the top right */}
                  <div className="absolute top-4 right-4 z-20">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-amber-400/80 shadow-lg shadow-amber-500/30 overflow-hidden bg-[#050816]">
                      <img
                        src={EMBLEM_IMAGE}
                        alt="Emblem"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Overlay HUD: Interactive breadboard & circuit indicators */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-900/85 backdrop-blur-md p-3.5 rounded-xl border border-cyan-500/20 shadow-lg">
                    <div className="flex items-center justify-between text-xs text-slate-300 pb-2 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-mono text-cyan-300">DLD & Hardware Lab Ready</span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Active Queue
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono text-slate-400">
                      <div>
                        <span className="text-slate-500 block text-[9px]">LOGIC ICS</span>
                        <span className="text-white">74LSxx Series</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">LANGUAGES</span>
                        <span className="text-white">C++ / Python / JS</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[9px]">FORMATS</span>
                        <span className="text-white">IEEE / LaTeX</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Code Snippet 1 (Left side) */}
              <div
                className="absolute -top-4 -left-6 z-30 hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-purple-500/40 text-[11px] font-mono text-purple-300 shadow-xl backdrop-blur-md transition-transform duration-200"
                style={{
                  transform: `translate(${mousePos.x * -12}px, ${mousePos.y * -12}px)`,
                }}
              >
                <Terminal className="w-3.5 h-3.5 text-purple-400" />
                <span>const build = true;</span>
              </div>

              {/* Floating Code Snippet 2 (Bottom right) */}
              <div
                className="absolute -bottom-5 -right-4 z-30 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900/90 border border-cyan-500/40 text-[11px] font-mono text-cyan-300 shadow-xl backdrop-blur-md transition-transform duration-200"
                style={{
                  transform: `translate(${mousePos.x * 14}px, ${mousePos.y * 14}px)`,
                }}
              >
                <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                <span>digitalLogic(MOD10_Counter);</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
