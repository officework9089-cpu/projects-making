import React, { useState } from 'react';
import { X, Star, CheckCircle, ShieldAlert } from 'lucide-react';
import { ServiceCategory, ReviewItem } from '../../types';

interface SubmitReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: Omit<ReviewItem, 'id' | 'date' | 'status'>) => void;
}

export const SubmitReviewModal: React.FC<SubmitReviewModalProps> = ({
  isOpen,
  onClose,
  onSubmitReview,
}) => {
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');
  const [department, setDepartment] = useState('');
  const [service, setService] = useState<ServiceCategory>('DLD Projects');
  const [rating, setRating] = useState<number>(5);
  const [review, setReview] = useState('');
  const [permission, setPermission] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !university.trim() || !review.trim()) {
      setError('Please fill in your name, university, and review text.');
      return;
    }
    setError('');

    // Generate clean initials
    const words = name.trim().split(' ');
    const initials = words.length > 1
      ? `${words[0][0]}${words[1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();

    onSubmitReview({
      name,
      initials,
      university,
      department: department || 'General Engineering',
      service,
      rating,
      review,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  const servicesList: ServiceCategory[] = [
    'Assignments',
    'Handwritten Work',
    'Coding Projects',
    'Hardware Projects',
    'DLD Projects',
    'Multisim',
    'Presentations',
    'Reports & Documentation',
    'Final Year Projects',
    'Internship Projects',
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg rounded-2xl glass-panel-elevated p-6 sm:p-8 border border-cyan-500/30 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white">Review Received!</h3>
            <p className="text-sm text-slate-300 max-w-xs mx-auto">
              Thank you for sharing your experience. Your feedback is sent to the moderation queue and will appear publicly once approved.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6 text-left">
              <h3 className="text-xl font-bold text-white">Submit Your Review</h3>
              <p className="text-xs text-slate-400 mt-1">
                Your feedback helps us continuously elevate our academic quality.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Name or Initials *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Hamza K."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    University *
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="e.g. NUST / FAST"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    placeholder="e.g. EE / CS"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Service Completed
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value as ServiceCategory)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                >
                  {servicesList.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Rating
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 transition-colors ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs text-slate-400 ml-2 font-mono">{rating} of 5</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Your Review *
                </label>
                <textarea
                  rows={3}
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Tell us about the project quality, communication, and submission results..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="permission"
                  checked={permission}
                  onChange={(e) => setPermission(e.target.checked)}
                  className="rounded border-slate-700 text-cyan-500 focus:ring-cyan-400"
                />
                <label htmlFor="permission" className="text-xs text-slate-400">
                  I give permission to publish this review anonymously.
                </label>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-md shadow-amber-500/20"
                >
                  Submit for Approval
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
