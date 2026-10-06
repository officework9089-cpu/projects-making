import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ArrowLeft, 
  Check, 
  X, 
  Clock, 
  Edit3, 
  MessageSquare, 
  FileText, 
  Sparkles,
  Layers,
  Star
} from 'lucide-react';
import { ProjectRequest, ReviewItem, ProjectStatus } from '../../types';

interface AdminDashboardProps {
  requests: ProjectRequest[];
  reviews: ReviewItem[];
  onBackToHome: () => void;
  onUpdateStatus: (id: string, newStatus: ProjectStatus, notes?: string) => void;
  onApproveReview: (id: string) => void;
  onRejectReview: (id: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  requests,
  reviews,
  onBackToHome,
  onUpdateStatus,
  onApproveReview,
  onRejectReview,
}) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'reviews'>('requests');
  const [selectedReq, setSelectedReq] = useState<ProjectRequest | null>(null);
  const [statusDraft, setStatusDraft] = useState<ProjectStatus>('In Progress');
  const [noteDraft, setNoteDraft] = useState('');

  const handleOpenReq = (req: ProjectRequest) => {
    setSelectedReq(req);
    setStatusDraft(req.status);
    setNoteDraft(req.adminNotes || '');
  };

  const handleSaveStatus = () => {
    if (selectedReq) {
      onUpdateStatus(selectedReq.id, statusDraft, noteDraft);
      setSelectedReq(null);
    }
  };

  const pendingReviews = reviews.filter((r) => r.status === 'Pending');

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#050816] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-4">
          <div>
            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Public Website</span>
            </button>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
                Admin Control Room
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-mono uppercase tracking-wider">
                Staff Only
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Review university briefs, dispatch quotations, update breadboard assembly status, and moderate reviews.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('requests')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'requests'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Requests ({requests.length})
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                activeTab === 'reviews'
                  ? 'bg-cyan-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Reviews ({reviews.length})
              {pendingReviews.length > 0 && (
                <span className="ml-1.5 px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold">
                  {pendingReviews.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Tab 1: Requests Management */}
        {activeTab === 'requests' && (
          <div className="space-y-6">
            <div className="rounded-2xl glass-panel-elevated border border-slate-800 overflow-hidden shadow-2xl">
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <h3 className="text-base font-bold text-white">
                  University Student Requirement Pipeline
                </h3>
                <span className="text-xs font-mono text-cyan-400">
                  {requests.filter((r) => r.status === 'New' || r.status === 'Reviewing').length} Pending Action
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-900/60 text-xs text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="px-6 py-3.5">ID / Student</th>
                      <th className="px-6 py-3.5">Service & Topic</th>
                      <th className="px-6 py-3.5">University</th>
                      <th className="px-6 py-3.5">Deadline</th>
                      <th className="px-6 py-3.5">Status</th>
                      <th className="px-6 py-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {requests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-900/40">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-white">{req.name}</div>
                          <div className="text-xs font-mono text-cyan-400">{req.whatsapp}</div>
                          <div className="text-[11px] font-mono text-slate-500">{req.id}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">{req.projectTitle}</div>
                          <div className="text-xs font-mono text-purple-400">{req.serviceType}</div>
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-300">
                          <div>{req.university}</div>
                          <div className="text-slate-500">{req.department}</div>
                        </td>
                        <td className="px-6 py-4 text-xs font-mono text-slate-300">
                          {req.deadline}
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs font-mono font-semibold text-amber-400">
                            {req.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => handleOpenReq(req)}
                            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-cyan-400"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Reviews Moderation */}
        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="rounded-2xl glass-panel-elevated border border-slate-800 p-6 shadow-2xl">
              <h3 className="text-base font-bold text-white mb-2">
                Student Reviews Moderation Queue
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Approve verified student submissions to publish them to the live homepage testimonial section.
              </p>

              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 max-w-2xl">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{rev.name}</span>
                        <span className="text-xs text-slate-400">({rev.university} · {rev.department})</span>
                        <div className="flex text-amber-400 text-xs ml-2">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-slate-300 italic">"{rev.review}"</p>
                      <div className="text-[11px] font-mono text-cyan-400">
                        Service: {rev.service} · Date: {rev.date} · Status: <span className={rev.status === 'Approved' ? 'text-emerald-400' : 'text-amber-400'}>{rev.status}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {rev.status !== 'Approved' && (
                        <button
                          onClick={() => onApproveReview(rev.id)}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1 hover:bg-emerald-500/30"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Publish</span>
                        </button>
                      )}
                      {rev.status !== 'Rejected' && (
                        <button
                          onClick={() => onRejectReview(rev.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 border border-red-500/30 text-xs font-semibold flex items-center gap-1 hover:bg-red-500/30"
                        >
                          <X className="w-3.5 h-3.5" />
                          <span>Reject</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Update Request Status Modal */}
        {selectedReq && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg rounded-2xl glass-panel-elevated p-6 sm:p-8 border border-cyan-500/30 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div>
                  <span className="text-xs font-mono text-cyan-400">{selectedReq.id}</span>
                  <h3 className="text-lg font-bold text-white">{selectedReq.projectTitle}</h3>
                </div>
                <button
                  onClick={() => setSelectedReq(null)}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Update Pipeline Status
                  </label>
                  <select
                    value={statusDraft}
                    onChange={(e) => setStatusDraft(e.target.value as ProjectStatus)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="New">New</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Quoted">Quoted</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Ready">Ready</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Engineer Notes / Status Update (Visible to Student)
                  </label>
                  <textarea
                    rows={3}
                    value={noteDraft}
                    onChange={(e) => setNoteDraft(e.target.value)}
                    placeholder="e.g. Breadboard circuit assembly completed. Running 100-cycle clock stress test."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedReq(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveStatus}
                  className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  Save Pipeline Status
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
