import React from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { CheckCircle2, Shield, Award, Sparkles, Terminal, FileCode2 } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 sm:py-28 relative border-t border-slate-800/80 bg-[#070B18]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Brand Emblem & Visual Anchor (5 cols) */}
          <div className="lg:col-span-5 text-center lg:text-left flex flex-col items-center lg:items-start">
            <BrandLogo variant="badge" size="xl" className="mb-6" />

            <div className="space-y-2 max-w-sm">
              <h3 className="text-2xl font-bold text-white font-display">
                Project In The Making
              </h3>
              <p className="font-script text-xl text-amber-300 font-semibold">
                Your Work, Our Responsibility!
              </p>
              <p className="text-xs text-slate-400 font-mono pt-1">
                From Idea to Final Submission.
              </p>
            </div>

            {/* Quick Guarantees Box */}
            <div className="mt-8 p-4 rounded-xl glass-panel border border-slate-800 w-full max-w-sm space-y-2 text-xs text-left">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Strict Plagiarism-Free Academic Writing</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Live Breadboard Hardware Testing</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span>Free Revisions as per Teacher Feedback</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Mission (7 cols) */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              05. About Our Studio
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Built by Engineers, Dedicated to University Academic Success
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-slate-300 leading-relaxed">
              <p>
                <strong className="text-white font-semibold">Project In The Making</strong> provides specialized academic project, engineering, and documentation services for university students across computer science, electrical, software, and mechanical disciplines.
              </p>
              <p>
                We work across all fundamental academic milestones: from intricate theory assignments and handwritten laboratory manuals to Digital Logic Design (DLD) breadboard circuits, Multisim simulations, verified codebases, thesis reports, and defense presentations.
              </p>
              <p>
                Unlike generic online tutoring or automated generators, our platform is rooted in a <strong className="text-cyan-300">transparent portfolio philosophy</strong>: students inspect our previous breadboards, code repositories, and physical paper files before submitting requirements. We accompany you through your final viva questions so you step into grading with total confidence.
              </p>
            </div>

            {/* Core Values Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-xs font-bold text-white mb-1 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span>Real Code & Physical Hardware</span>
                </div>
                <p className="text-xs text-slate-400">
                  Every circuit is wired, every program is compiled, and videos of active functioning are delivered to you.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                <div className="text-xs font-bold text-white mb-1 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Confidentiality Guaranteed</span>
                </div>
                <p className="text-xs text-slate-400">
                  Your university identity, project rubrics, and deliverables are 100% confidential under our privacy standards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
