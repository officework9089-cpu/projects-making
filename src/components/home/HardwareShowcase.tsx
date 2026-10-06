import React, { useRef } from 'react';
import { Cpu, ChevronLeft, ChevronRight, Zap, Play, CheckCircle2, ArrowRight } from 'lucide-react';
import { HARDWARE_IMAGE } from '../../data/mockData';
import { ProjectItem } from '../../types';

interface HardwareShowcaseProps {
  onSelectProjectBySlug?: (slug: string) => void;
  onRequestHardware: () => void;
}

export const HardwareShowcase: React.FC<HardwareShowcaseProps> = ({
  onSelectProjectBySlug,
  onRequestHardware,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const hardwareItems = [
    {
      title: 'MOD-10 Decade Counter on Breadboard',
      category: 'DLD Hardware',
      ics: '74LS90, 74LS47, NE555',
      features: '0–9 synchronous counting, reset switch, potentiometer frequency trim',
      slug: 'mod-10-decade-counter',
      status: 'Tested & Verified',
    },
    {
      title: '4-Way Intelligent Traffic Light Controller',
      category: 'Sequential Logic',
      ics: '74LS74 (D-FF), 74LS08, 74LS32',
      features: 'Full state machine sequence, pedestrian override button, yellow delay',
      slug: 'traffic-light-controller-dld',
      status: 'Tested & Verified',
    },
    {
      title: 'Digital 24-Hour Clock (Hours : Mins)',
      category: 'Cascade Counters',
      ics: '74LS390, 74LS48, 1Hz Crystal',
      features: 'Cascaded MOD-6 and MOD-10 counters with dual 7-segment displays',
      slug: 'mod-10-decade-counter',
      status: 'Tested & Verified',
    },
    {
      title: '4-Bit Binary Arithmetic Adder / Subtractor',
      category: 'Combinational Logic',
      ics: '74LS83, 74LS86 (XOR)',
      features: '2s-complement subtraction, overflow detection LED, DIP switch inputs',
      slug: 'mod-10-decade-counter',
      status: 'Tested & Verified',
    },
    {
      title: 'Priority Encoder & 7-Segment Multiplexer',
      category: 'DLD Lab Work',
      ics: '74LS148, 74LS138, Common Anode',
      features: 'High speed digit scanning, zero flicker, active-low strobe',
      slug: 'mod-10-decade-counter',
      status: 'Tested & Verified',
    },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="hardware-lab" className="py-20 sm:py-28 relative bg-[#070B18]/70 border-y border-slate-800/80 overflow-hidden">
      {/* Decorative neon circuit lines */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl text-left">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>DLD & Electronics Specialization</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              DLD & Hardware Lab
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Clean breadboard wiring, logic gates, counters, and 7-segment displays. Fully assembled, rigorously tested, and supplied with step-by-step Viva defense explanations.
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scroll('left')}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/40 transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-400/40 transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={onRequestHardware}
              className="ml-2 px-4 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5"
            >
              <span>Request Hardware Circuit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Horizontal Scrolling Card Track */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar"
        >
          {hardwareItems.map((item, idx) => (
            <div
              key={idx}
              className="w-[320px] sm:w-[380px] shrink-0 rounded-2xl glass-panel p-6 flex flex-col justify-between hover:border-cyan-400/50 hover:bg-slate-900/90 transition-all duration-300 group shadow-xl"
            >
              <div>
                {/* Circuit Image Banner */}
                <div className="relative h-44 rounded-xl overflow-hidden bg-slate-950 mb-5 border border-slate-800">
                  <img
                    src={HARDWARE_IMAGE}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-70" />
                  
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                    {item.category}
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-emerald-400 font-mono bg-slate-950/90 px-2.5 py-1 rounded border border-emerald-500/30">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {item.status}
                    </span>
                    <span className="text-slate-400">Breadboard</span>
                  </div>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-200 transition-colors">
                  {item.title}
                </h3>

                <div className="mt-3 space-y-2 text-xs">
                  <div className="flex items-start gap-2 text-slate-300">
                    <span className="font-mono text-cyan-400 shrink-0">ICs:</span>
                    <span className="text-slate-200 font-mono">{item.ics}</span>
                  </div>
                  <p className="text-slate-400 line-clamp-2 leading-relaxed">
                    {item.features}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => onSelectProjectBySlug?.(item.slug)}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <span>View Schematics</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onRequestHardware}
                  className="px-3 py-1.5 text-[11px] font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors"
                >
                  Order Circuit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
