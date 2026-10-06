import React from 'react';
import { Send, MessageSquareText, Wrench, PackageCheck, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onRequestClick: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onRequestClick }) => {
  const steps = [
    {
      number: '01',
      title: 'Send Requirements',
      description: 'Upload your problem statement, rubric, syllabus guidelines, and deadline date.',
      icon: Send,
      accent: 'text-cyan-400',
      borderAccent: 'border-cyan-400/30',
    },
    {
      number: '02',
      title: 'Discuss & Quote',
      description: 'Quick WhatsApp or chat discussion on scope, architecture, deliverables, and student-friendly pricing.',
      icon: MessageSquareText,
      accent: 'text-purple-400',
      borderAccent: 'border-purple-400/30',
    },
    {
      number: '03',
      title: 'Development & Testing',
      description: 'Work is prepared, simulated, and tested. Progress updates and demo clips are shared.',
      icon: Wrench,
      accent: 'text-amber-400',
      borderAccent: 'border-amber-400/30',
    },
    {
      number: '04',
      title: 'Final Delivery & Viva Prep',
      description: 'Receive all code, physical circuits, reports, and explanation notes ready for submission.',
      icon: PackageCheck,
      accent: 'text-emerald-400',
      borderAccent: 'border-emerald-400/30',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 text-left">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            03. Straightforward Process
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How It Works
          </h2>
          <p className="mt-3 text-base text-slate-300">
            A transparent four-step workflow built to relieve submission pressure with guaranteed quality and confidentiality.
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative">
          {/* Desktop connecting glowing line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-500 -translate-y-8 opacity-40 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl glass-panel p-6 sm:p-7 flex flex-col justify-between hover:-translate-y-2 hover:border-cyan-400/40 transition-all duration-300 group shadow-lg"
                >
                  <div>
                    {/* Top step indicator */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className={`w-5 h-5 ${step.accent}`} />
                      </div>
                      <span className="text-2xl font-black font-display text-slate-600 group-hover:text-cyan-400 transition-colors">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    <span>Phase {step.number} Verified</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg font-bold text-white">Have a strict deadline coming up?</h4>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Share your assignment prompt right now to receive a customized milestone breakdown.
            </p>
          </div>
          <button
            onClick={onRequestClick}
            className="px-6 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-amber-500/20 shrink-0"
          >
            <span>Start Step 01</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </div>
    </section>
  );
};
