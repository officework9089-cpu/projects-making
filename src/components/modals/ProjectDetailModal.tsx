import React, { useState } from 'react';
import { X, CheckCircle2, Cpu, Calendar, Clock, School, ArrowRight, Share2, Play } from 'lucide-react';
import { ProjectItem } from '../../types';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onRequestSimilar: (project: ProjectItem) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onRequestSimilar,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  if (!project) return null;

  const images = project.gallery && project.gallery.length > 0 ? project.gallery : [project.image];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl glass-panel-elevated p-6 sm:p-9 border border-cyan-500/30 shadow-2xl my-6 text-left max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg transition-colors z-20 bg-slate-900/60"
          aria-label="Close case study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Metadata */}
        <div className="mb-6 space-y-2">
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-cyan-400">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.subject}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">{project.type}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            {project.title}
          </h2>
        </div>

        {/* Media Gallery */}
        <div className="mb-8 space-y-3">
          <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src={images[activeImageIndex]}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

            {project.demoAvailable && (
              <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-purple-500/40 text-xs font-mono text-purple-300 flex items-center gap-2 backdrop-blur-md">
                <Play className="w-3.5 h-3.5 fill-purple-400 text-purple-400" />
                <span>Tested Physical Demo Verified</span>
              </div>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIndex === idx
                      ? 'border-cyan-400 scale-105'
                      : 'border-slate-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Breakdown Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8 border-b border-slate-800">
          {/* Main Description & Features (2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-2">
                Project Overview
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-3">
                Key Technical Features
              </h3>
              <ul className="space-y-2">
                {project.features.map((feat, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-mono text-cyan-400 uppercase tracking-wider mb-2">
                Technologies & Tools Applied
              </h3>
              <div className="text-xs font-mono text-slate-300">
                {project.technologies.join(' · ')}
              </div>
            </div>
          </div>

          {/* Metadata Sidebar (1 col) */}
          <div className="rounded-xl glass-panel p-5 space-y-5">
            <div>
              <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3 pb-2 border-b border-slate-800">
                What Was Included?
              </h4>
              <ul className="space-y-2 text-xs text-slate-300">
                {project.deliverables.map((del, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 font-bold">✓</span>
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-800 space-y-2.5 text-xs">
              {project.clientUniversity && (
                <div className="flex items-center gap-2 text-slate-400">
                  <School className="w-4 h-4 text-purple-400 shrink-0" />
                  <span className="truncate">{project.clientUniversity}</span>
                </div>
              )}
              {project.completionTime && (
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Turnaround: {project.completionTime}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-slate-400">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Completed: {project.date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-400">
            Need this exact circuit or a customized variation for your submission?
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
            >
              Back to Portfolio
            </button>
            <button
              onClick={() => {
                onClose();
                onRequestSimilar(project);
              }}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>Request a Similar Project</span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
