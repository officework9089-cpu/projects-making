import React from 'react';
import { BrandLogo } from '../brand/BrandLogo';
import { MessageCircle, Instagram, Facebook, ShieldCheck, Mail, ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavClick: (href: string) => void;
  onRequestClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick, onRequestClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#040612] border-t border-slate-800/80 pt-16 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1 & 2: Brand Lockup & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo variant="full" size="md" />
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Premium academic project, coding, hardware, and documentation studio for university students. From initial concept and breadboard circuit assembly to final teacher evaluation and defense.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/923000000000"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 hover:border-emerald-500/50 hover:bg-slate-800 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-pink-400 hover:border-pink-500/50 hover:bg-slate-800 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-blue-400 hover:border-blue-500/50 hover:bg-slate-800 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="mailto:submissions@projectinthemaking.com"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400 hover:border-cyan-500/50 hover:bg-slate-800 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavClick('#our-work')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Our Work Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('#services')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  All 10 Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('#hardware-lab')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  DLD & Hardware Lab
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('#how-it-works')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('#reviews')}
                  className="hover:text-cyan-300 transition-colors"
                >
                  Student Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Key Specialties */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 mb-4">
              Specialties
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><span className="hover:text-white">DLD Breadboard Circuits</span></li>
              <li><span className="hover:text-white">Full-Stack & C++/Java Coding</span></li>
              <li><span className="hover:text-white">Handwritten Lab Work</span></li>
              <li><span className="hover:text-white">NI Multisim Simulations</span></li>
              <li><span className="hover:text-white">IEEE Technical Reports & SRS</span></li>
              <li><span className="hover:text-white">Final Year Projects (FYP)</span></li>
            </ul>
          </div>

          {/* Col 5: Direct Action */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-300 mb-4">
              Need Assistance?
            </h4>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Send your rubrics now for a rapid evaluation and milestone plan.
            </p>
            <button
              onClick={onRequestClick}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all"
            >
              Request a Project
            </button>
          </div>
        </div>

        {/* Bottom row: Quiet copyright and back to top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Project In The Making. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Confidentiality Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
