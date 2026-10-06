import React, { useState, useEffect } from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { Menu, X, ArrowUpRight, MessageCircle, ShieldCheck, UserCheck } from 'lucide-react';

interface NavbarProps {
  onRequestClick: () => void;
  onPortalClick: () => void;
  currentView: 'home' | 'student-portal' | 'admin-portal';
  onViewChange: (view: 'home' | 'student-portal' | 'admin-portal') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onRequestClick,
  onPortalClick,
  currentView,
  onViewChange,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Our Work', href: '#our-work' },
    { label: 'Services', href: '#services' },
    { label: 'Hardware Lab', href: '#hardware-lab' },
    { label: 'How It Works', href: '#how-it-works' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      onViewChange('home');
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050816]/85 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-lg shadow-black/40'
          : 'bg-transparent py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Zone 1: Brand Wordmark (Single Element Contract) */}
          <button
            onClick={() => {
              onViewChange('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg text-left"
          >
            <BrandLogo variant="mark" size="md" />
          </button>

          {/* Zone 2: 4-6 Clean Text Navigation Links (Single Line, No Pills) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="hover:text-cyan-300 transition-colors whitespace-nowrap focus:outline-none focus-visible:underline"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 Primary Actions */}
          <div className="hidden sm:flex items-center gap-3">
            {/* View switcher between Website & Portals */}
            <button
              onClick={onPortalClick}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border flex items-center gap-1.5 whitespace-nowrap ${
                currentView !== 'home'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40'
                  : 'bg-slate-900/60 text-slate-300 border-slate-700/60 hover:text-white hover:border-slate-600'
              }`}
              title="Toggle Student & Admin Workspace"
            >
              <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentView === 'admin-portal' ? 'Admin Portal' : currentView === 'student-portal' ? 'Student Portal' : 'Portals'}</span>
            </button>

            {/* Primary conversion CTA */}
            <button
              onClick={onRequestClick}
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 rounded-lg shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>Request a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onRequestClick}
              className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-amber-400 rounded-lg whitespace-nowrap"
            >
              Request
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#070B18]/95 backdrop-blur-xl border-b border-cyan-500/20 px-5 pt-3 pb-6 mt-3 space-y-4 shadow-2xl">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="text-base font-medium text-slate-200 hover:text-cyan-300 py-1 border-b border-slate-800/60"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onPortalClick();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-cyan-300 bg-slate-900 border border-cyan-500/30 rounded-lg flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Open Student & Admin Portals</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onRequestClick();
              }}
              className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <span>Request a Project Now</span>
              <ArrowUpRight className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
