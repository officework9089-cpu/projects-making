import React from 'react';
import { Star, MessageSquarePlus, CheckCircle, ShieldCheck } from 'lucide-react';
import { ReviewItem } from '../../types';

interface ReviewsSectionProps {
  reviews: ReviewItem[];
  onOpenSubmitModal: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onOpenSubmitModal,
}) => {
  const approvedReviews = reviews.filter((r) => r.status === 'Approved');

  return (
    <section id="reviews" className="py-20 sm:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl text-left">
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Verified Student Experiences</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Student Reviews & Feedback
            </h2>
            <p className="mt-3 text-base text-slate-300">
              Honest testimonials from university students who trusted us with their semester coursework, breadboards, and final Capstones.
            </p>
          </div>

          <button
            onClick={onOpenSubmitModal}
            className="px-5 py-3 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-cyan-400/30 rounded-xl transition-all whitespace-nowrap flex items-center gap-2 shadow-md hover:border-cyan-400/60"
          >
            <MessageSquarePlus className="w-4 h-4 text-cyan-400" />
            <span>Submit Your Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {approvedReviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl glass-panel p-6 sm:p-7 flex flex-col justify-between hover:border-cyan-400/40 transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Header: Stars & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {rev.date}
                  </span>
                </div>

                {/* Review Body */}
                <p className="text-sm text-slate-200 leading-relaxed mb-6 italic">
                  "{rev.review}"
                </p>
              </div>

              {/* Student Footer info */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-purple-600 flex items-center justify-center font-bold text-xs text-white shadow-md">
                    {rev.initials}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      <span className="w-1 h-1 rounded-full bg-emerald-400" />
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {rev.department} · {rev.university}
                    </div>
                  </div>
                </div>

                <div className="text-[11px] font-mono text-cyan-400 hidden sm:block">
                  {rev.service}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Transparent notice */}
        <div className="mt-8 text-center text-xs text-slate-400 font-mono">
          * Reviews are submitted by verified students and reviewed prior to publication to maintain privacy and integrity.
        </div>
      </div>
    </section>
  );
};
