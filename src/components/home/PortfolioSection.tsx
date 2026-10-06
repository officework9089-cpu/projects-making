import React, { useState, useMemo } from 'react';
import { Search, Eye, Play, Sparkles, Filter, CheckCircle } from 'lucide-react';
import { ProjectItem, ServiceCategory } from '../../types';

interface PortfolioSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'DLD Projects',
    'Hardware Projects',
    'Coding Projects',
    'Handwritten Work',
    'Multisim',
    'Final Year Projects',
    'Reports & Documentation',
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === 'All' || project.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.subject.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q)) ||
        project.summary.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [projects, activeCategory, searchQuery]);

  return (
    <section id="our-work" className="py-20 sm:py-28 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl text-left">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">
              02. Proven Track Record
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Our Work
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Explore real university project examples, breadboard circuits, tested software codebases, and academic journals.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, DLD, React..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar (Functional segmented buttons) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/60 text-slate-300 border border-slate-800 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800">
            <Filter className="w-10 h-10 text-slate-500 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-white">No projects found</h3>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your search query or category filter.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-medium text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/10"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl glass-panel overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10 flex flex-col justify-between"
              >
                {/* Image Container */}
                <div 
                  className="relative h-56 overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => onSelectProject(project)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80" />

                  {/* Category unboxed tag inside overlay */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-cyan-500/30 text-[11px] font-mono text-cyan-300">
                    {project.category}
                  </div>

                  {project.demoAvailable && (
                    <div className="absolute top-3 right-3 px-2 py-1 rounded-md bg-purple-950/80 backdrop-blur-md border border-purple-500/30 text-[11px] font-mono text-purple-300 flex items-center gap-1">
                      <Play className="w-2.5 h-2.5 fill-purple-300" />
                      <span>Demo</span>
                    </div>
                  )}

                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <span className="px-3.5 py-1.5 text-xs font-semibold text-white bg-cyan-600/90 rounded-lg flex items-center gap-1.5 shadow-lg">
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Project</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-xs text-slate-400 font-mono mb-1.5 flex items-center gap-2">
                      <span>{project.subject}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.date}</span>
                    </div>

                    <h3 
                      onClick={() => onSelectProject(project)}
                      className="text-lg font-bold text-white group-hover:text-cyan-200 transition-colors cursor-pointer line-clamp-1"
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-300 mt-2 line-clamp-3 leading-relaxed">
                      {project.summary}
                    </p>
                  </div>

                  {/* Deliverables & Technology line */}
                  <div className="mt-5 pt-4 border-t border-slate-800/80">
                    <div className="text-[11px] text-slate-400 font-mono mb-3 truncate">
                      {project.technologies.slice(0, 4).join(' · ')}
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => onSelectProject(project)}
                        className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                      >
                        <span>Explore Case Study</span>
                        <span>→</span>
                      </button>

                      {project.clientUniversity && (
                        <span className="text-[10px] text-slate-500 truncate max-w-[140px]" title={project.clientUniversity}>
                          {project.clientUniversity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
