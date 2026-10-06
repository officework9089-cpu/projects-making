import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, Check, ArrowUpRight, MessageCircle } from 'lucide-react';
import { ServiceCategory } from '../../types';

interface FloatingChatProps {
  onStartProjectRequest: (service?: ServiceCategory) => void;
}

export const FloatingChat: React.FC<FloatingChatProps> = ({ onStartProjectRequest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'bot' | 'user'; text: string }>>([
    {
      sender: 'bot',
      text: 'Hi! What do you need help with today? Select a service below or type your project topic.',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const quickOptions = [
    'Assignment',
    'Coding Project',
    'DLD / Hardware',
    'Handwritten Work',
    'FYP Capstone',
    'Report / SRS',
    'Presentation PPT',
  ];

  const handleSelectOption = (opt: string) => {
    setSelectedService(opt);
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: `I need help with: ${opt}` },
      {
        sender: 'bot',
        text: `Got it! We have dedicated engineers for ${opt}. What is your submission deadline and university? Or click below to start your direct WhatsApp chat or complete requirement request.`,
      },
    ]);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = inputText.trim();
    setInputText('');
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg },
      {
        sender: 'bot',
        text: 'Received! Our team can assemble this for you. Let’s confirm your detailed rubric and contact details.',
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group p-4 rounded-full bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-500 text-white shadow-2xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-cyan-400/40 cursor-pointer"
          aria-label="Open Project Assistant Chat"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full blur-md opacity-70 group-hover:opacity-100 transition animate-pulse-glow" />
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-6 h-6 fill-white text-transparent" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 border-2 border-[#050816] rounded-full" />
          </div>
        </button>
      )}

      {/* Expanded Chat Widget */}
      {isOpen && (
        <div className="w-[340px] sm:w-[380px] rounded-2xl glass-panel-elevated border border-cyan-500/40 shadow-2xl overflow-hidden flex flex-col h-[520px] transition-all">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-slate-900 via-cyan-950/60 to-slate-900 border-b border-cyan-500/20 flex items-center justify-between text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white leading-tight font-display">
                  Project In The Making
                </h4>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · 15m Response Time</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-left">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-cyan-600 text-white rounded-br-none shadow-md'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none shadow-md'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {/* Quick Option Buttons */}
            {messages.length <= 3 && (
              <div className="pt-2">
                <div className="text-[11px] font-mono text-slate-400 mb-2">
                  Select requirement:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {quickOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => handleSelectOption(opt)}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-cyan-400/50 text-[11px] font-medium text-slate-200 transition-colors"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Direct WhatsApp & Request Project Actions */}
          <div className="p-3 bg-slate-950/80 border-t border-slate-800/80 flex items-center gap-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onStartProjectRequest(
                  selectedService ? (selectedService as ServiceCategory) : undefined
                );
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <span>Full Request Form</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <a
              href="https://wa.me/923000000000?text=Hi%20Project%20In%20The%20Making!%20I%20have%20an%20academic%20project%20requirement."
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
            </a>
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask a question or topic..."
              className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950"
              aria-label="Send Message"
            >
              <Send className="w-3.5 h-3.5 text-slate-950" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
