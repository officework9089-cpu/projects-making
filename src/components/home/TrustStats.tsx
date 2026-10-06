import React from 'react';
import { Award, Layers, GraduationCap, Zap, CheckCircle2 } from 'lucide-react';

export const TrustStats: React.FC = () => {
  const stats = [
    {
      value: '100+',
      label: 'Projects & Assignments',
      subtext: 'Delivered across CS, EE, SE, & BBA',
      icon: Award,
      accent: 'text-amber-400',
      borderGlow: 'hover:border-amber-400/40',
    },
    {
      value: '10',
      label: 'Specialized Categories',
      subtext: 'Hardware, Coding, DLD, Reports & Docs',
      icon: Layers,
      accent: 'text-cyan-400',
      borderGlow: 'hover:border-cyan-400/40',
    },
    {
      value: '25+',
      label: 'Universities Served',
      subtext: 'Strict compliance with rubrics & formats',
      icon: GraduationCap,
      accent: 'text-purple-400',
      borderGlow: 'hover:border-purple-400/40',
    },
    {
      value: '15m',
      label: 'Fast Requirement Response',
      subtext: 'Instant scope assessment & quotes',
      icon: Zap,
      accent: 'text-pink-400',
      borderGlow: 'hover:border-pink-400/40',
    },
  ];

  return (
    <section className="relative -mt-6 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`glass-panel p-5 sm:p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${stat.borderGlow} group shadow-lg shadow-black/40`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className={`w-5 h-5 ${stat.accent} group-hover:scale-110 transition-transform`} />
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  Verified
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums font-display">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-1">
                {stat.label}
              </div>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {stat.subtext}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
