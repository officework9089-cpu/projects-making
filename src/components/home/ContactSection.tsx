import React, { useState } from 'react';
import { MessageCircle, Mail, Instagram, Facebook, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { ProjectRequest } from '../../types';

interface ContactSectionProps {
  onQuickSubmit: (data: { name: string; whatsapp: string; need: string; message: string }) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onQuickSubmit }) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [need, setNeed] = useState('DLD / Hardware Project');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !whatsapp.trim()) return;

    onQuickSubmit({ name, whatsapp, need, message });
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setWhatsapp('');
      setMessage('');
      setSubmitted(false);
    }, 3000);
  };

  const channels = [
    {
      title: 'WhatsApp Direct',
      detail: '+92 300 0000000',
      action: 'Chat Now',
      href: 'https://wa.me/923000000000',
      icon: MessageCircle,
      color: 'text-emerald-400',
      borderColor: 'hover:border-emerald-500/40',
    },
    {
      title: 'Official Email',
      detail: 'submissions@projectinthemaking.com',
      action: 'Send Email',
      href: 'mailto:submissions@projectinthemaking.com',
      icon: Mail,
      color: 'text-cyan-400',
      borderColor: 'hover:border-cyan-500/40',
    },
    {
      title: 'Instagram',
      detail: '@projectinthemaking.official',
      action: 'Follow & DM',
      href: 'https://instagram.com',
      icon: Instagram,
      color: 'text-pink-400',
      borderColor: 'hover:border-pink-500/40',
    },
    {
      title: 'Facebook Page',
      detail: 'Project In The Making',
      action: 'Visit Page',
      href: 'https://facebook.com',
      icon: Facebook,
      color: 'text-blue-400',
      borderColor: 'hover:border-blue-500/40',
    },
  ];

  return (
    <section id="contact" className="py-20 sm:py-28 relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Contact Channels (5 cols) */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
              06. Reach Our Team
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Get in Touch
            </h2>
            <p className="text-base text-slate-300">
              Have questions about your project scope, deadline, or circuit components? Reach out through any channel below for a rapid response.
            </p>

            <div className="space-y-3 pt-2">
              {channels.map((ch, idx) => {
                const Icon = ch.icon;
                return (
                  <a
                    key={idx}
                    href={ch.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`p-4 rounded-xl glass-panel border border-slate-800 flex items-center justify-between transition-all duration-300 ${ch.borderColor} group hover:-translate-x-1`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        <Icon className={`w-5 h-5 ${ch.color}`} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-200 transition-colors">
                          {ch.title}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          {ch.detail}
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1">
                      <span>{ch.action}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: Quick Request Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-panel-elevated p-6 sm:p-9 border border-cyan-500/30 text-left shadow-2xl relative">
              <div className="mb-6">
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest">
                  Fast Direct Inquiry
                </span>
                <h3 className="text-2xl font-bold text-white font-display mt-1">
                  Quick Requirement Dispatch
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Leave your details and what you need; our coordinator will ping your WhatsApp instantly.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Inquiry Dispatched!</h4>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto">
                    We’ve received your note and will message you on WhatsApp shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Asad Mahmood"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      What do you need help with?
                    </label>
                    <select
                      value={need}
                      onChange={(e) => setNeed(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option>DLD / Hardware Project</option>
                      <option>Coding Project (C++/Python/Web)</option>
                      <option>Handwritten Assignment / Lab Manual</option>
                      <option>Multisim Simulation</option>
                      <option>Final Year Project (FYP)</option>
                      <option>Project Report / Technical SRS</option>
                      <option>Presentation Deck (PPT)</option>
                      <option>Other Subject Work</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Quick Message / Deadline
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Brief details about your university topic, deadline, or questions..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 hover:from-amber-300 hover:to-yellow-300 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Send Quick Request</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
