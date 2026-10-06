import React, { useState } from 'react';
import { PenTool, CheckCircle, FileText, ArrowRight, ZoomIn } from 'lucide-react';
import { HANDWRITTEN_IMAGE } from '../../data/mockData';

interface HandwrittenShowcaseProps {
  onRequestHandwritten: () => void;
}

export const HandwrittenShowcase: React.FC<HandwrittenShowcaseProps> = ({
  onRequestHandwritten,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const samples = [
    {
      title: 'Circuit Analysis & Ohm’s Law Practical File',
      subject: 'Basic Electrical Engineering',
      type: 'Lab Practical File',
      features: 'Drawn circuit schematics, observational measurement table, percentage error formulas.',
      rotation: '-rotate-1 hover:rotate-0',
    },
    {
      title: 'Engineering Mathematics & Calculus Solutions',
      subject: 'Applied Mathematics II',
      type: 'Handwritten Assignment',
      features: 'Step-by-step differential equation steps, graphical sketches with ruler and technical pen.',
      rotation: 'rotate-1 hover:rotate-0',
    },
    {
      title: 'Digital Systems Truth Table & K-Map Journal',
      subject: 'Digital Logic Design',
      type: 'Lab Journal Manual',
      features: 'Color-accented K-map groupings, Boolean simplifications, pristine handwritten script.',
      rotation: '-rotate-2 hover:rotate-0',
    },
  ];

  return (
    <section className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl text-left">
            <div className="text-xs font-mono text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <PenTool className="w-4 h-4 text-amber-400" />
              <span>Authentic Physical Craftsmanship</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Handwritten Work & Lab Manuals
            </h2>
            <p className="mt-3 text-base text-slate-300">
              When professors demand strictly handwritten assignments or physical laboratory logs. Prepared with immaculate handwriting, technical drawings, and zero mess.
            </p>
          </div>

          <button
            onClick={onRequestHandwritten}
            className="px-5 py-3 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <span>Request Handwritten Work</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Paper-styled Desk Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {samples.map((sample, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl bg-[#0f172a] border border-amber-500/20 p-5 shadow-2xl transition-all duration-300 hover:-translate-y-3 hover:border-amber-400/50 hover:shadow-amber-500/10 ${sample.rotation} group`}
            >
              {/* Paper Image Frame */}
              <div 
                className="relative h-64 rounded-xl overflow-hidden bg-slate-950 mb-5 border border-slate-800 cursor-pointer"
                onClick={() => setSelectedImage(HANDWRITTEN_IMAGE)}
              >
                <img
                  src={HANDWRITTEN_IMAGE}
                  alt={sample.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded bg-amber-950/80 backdrop-blur-md border border-amber-500/40 text-[10px] font-mono text-amber-300">
                  {sample.type}
                </div>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-3 py-1.5 rounded-lg bg-slate-900/90 text-xs font-medium text-white flex items-center gap-1.5 border border-slate-700">
                    <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                    <span>Zoom Scan</span>
                  </span>
                </div>
              </div>

              {/* Information */}
              <div className="text-left space-y-2">
                <span className="text-[11px] font-mono text-slate-400">
                  {sample.subject}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                  {sample.title}
                </h3>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                  {sample.features}
                </p>
              </div>

              {/* Quality Checklist */}
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle className="w-3.5 h-3.5" />
                  300 DPI Scan + Hardcopy
                </span>
                <span className="text-amber-400 font-semibold">100% Plagiarism Free</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
        >
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-slate-700">
            <img
              src={selectedImage}
              alt="High Resolution Scan"
              referrerPolicy="no-referrer"
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
            />
            <div className="p-3 bg-slate-950 text-center text-xs text-slate-300 font-mono">
              Click anywhere to close full-size scan preview
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
