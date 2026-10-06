import React from 'react';
import { 
  FileText, 
  PenTool, 
  Code2, 
  Cpu, 
  Binary, 
  Activity, 
  Presentation, 
  BookOpen, 
  GraduationCap, 
  Briefcase,
  ArrowRight
} from 'lucide-react';
import { INITIAL_SERVICES } from '../../data/mockData';
import { ServiceCategory } from '../../types';

interface ServicesSectionProps {
  onSelectService: (category: ServiceCategory) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const getIcon = (category: ServiceCategory) => {
    switch (category) {
      case 'Assignments': return FileText;
      case 'Handwritten Work': return PenTool;
      case 'Coding Projects': return Code2;
      case 'Hardware Projects': return Cpu;
      case 'DLD Projects': return Binary;
      case 'Multisim': return Activity;
      case 'Presentations': return Presentation;
      case 'Reports & Documentation': return BookOpen;
      case 'Final Year Projects': return GraduationCap;
      case 'Internship Projects': return Briefcase;
      default: return FileText;
    }
  };

  return (
    <section id="services" className="py-20 sm:py-28 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
            01. Academic & Engineering Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Comprehensive Services Tailored for Every University Course
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            From intricate breadboard digital logic to full-stack software development, technical lab files, and defense presentations.
          </p>
        </div>

        {/* Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INITIAL_SERVICES.map((service, idx) => {
            const Icon = getIcon(service.category);
            const indexNumber = String(idx + 1).padStart(2, '0');

            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service.category)}
                className="group relative rounded-2xl glass-panel p-6 sm:p-7 transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-slate-900/90 hover:shadow-2xl hover:shadow-cyan-500/10 cursor-pointer flex flex-col justify-between"
              >
                <div>
                  {/* Top row: Icon and Index Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-inner"
                      style={{
                        backgroundColor: `${service.accentColor}18`,
                        border: `1px solid ${service.accentColor}40`,
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: service.accentColor }} />
                    </div>
                    <span className="font-mono text-xs text-slate-500 group-hover:text-cyan-400 transition-colors">
                      {indexNumber}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-200 transition-colors">
                    {service.title}
                  </h3>
                  <div className="text-xs font-medium text-slate-400 mt-1 mb-3">
                    {service.subtitle}
                  </div>

                  <p className="text-sm text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Sub-items bullet list */}
                  <ul className="space-y-1.5 mb-5 border-t border-slate-800/80 pt-3">
                    {service.subItems.slice(0, 3).map((item, itemIdx) => (
                      <li key={itemIdx} className="text-xs text-slate-400 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-cyan-400 shrink-0" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Bottom row: Technologies (Zero-pill text) & CTA link */}
                <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <div className="text-[11px] text-slate-400 font-mono truncate max-w-[70%]">
                    {service.technologies.slice(0, 3).join(' · ')}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 group-hover:translate-x-1 transition-all">
                    <span>Request</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
