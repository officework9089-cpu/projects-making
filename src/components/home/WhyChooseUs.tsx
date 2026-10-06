import React from 'react';
import { 
  ShieldCheck, 
  MessageCircle, 
  Clock, 
  FileCheck2, 
  Layers, 
  Lock, 
  CheckCircle2, 
  FileCode2 
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      title: 'Guaranteed Quality Work',
      description: 'Zero AI shortcuts. Every circuit is simulated or breadboarded, every code module runs without errors, and reports cite legitimate academic literature.',
      icon: ShieldCheck,
      color: 'text-cyan-400',
    },
    {
      title: 'Clear & Direct WhatsApp Communication',
      description: 'Direct contact with engineers and subject experts. No opaque ticket systems; instant progress screenshots and live status updates.',
      icon: MessageCircle,
      color: 'text-emerald-400',
    },
    {
      title: 'Fast Turnaround & Urgent Support',
      description: 'Capable of meeting short 24-48 hour turnaround windows for semester crunch periods without compromising accuracy.',
      icon: Clock,
      color: 'text-amber-400',
    },
    {
      title: 'Organized Academic Documentation',
      description: 'Formats precisely matched to IEEE, APA, Harvard, or your specific university thesis rubric. Complete with UML, ERD, and circuit schematics.',
      icon: FileCheck2,
      color: 'text-purple-400',
    },
    {
      title: '10+ Multi-Domain Categories',
      description: 'One trusted destination for DLD, Arduino hardware, C++, Java, Python, Web, Multisim simulations, and PowerPoint slide decks.',
      icon: Layers,
      color: 'text-blue-400',
    },
    {
      title: '100% Academic Confidentiality',
      description: 'Your identity, student portal credentials, and assignment prompts are strictly confidential and encrypted.',
      icon: Lock,
      color: 'text-pink-400',
    },
    {
      title: 'Transparent Real Portfolio',
      description: 'Inspect our real breadboard hardware prototypes, code repositories, and physical handwritten samples prior to committing.',
      icon: FileCode2,
      color: 'text-teal-400',
    },
    {
      title: 'Requirement-Based Milestone Workflow',
      description: 'Milestone checkpoints and video verification before final delivery, with free revisions based on original specifications.',
      icon: CheckCircle2,
      color: 'text-yellow-400',
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative bg-[#070B18]/50 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16 text-left">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            04. The Standard of Excellence
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Why University Students Choose Project In The Making
          </h2>
          <p className="mt-3 text-base text-slate-300">
            We operate as an engineering and academic support lab, treating every student assignment as a serious professional milestone.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl glass-panel p-6 flex flex-col justify-between hover:border-cyan-400/40 hover:-translate-y-1 transition-all duration-300 group shadow-md"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                    <Icon className={`w-6 h-6 ${pillar.color}`} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
