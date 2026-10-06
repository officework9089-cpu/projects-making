import React, { useState } from 'react';
import { 
  FolderKanban, 
  Clock, 
  CheckCircle, 
  FileText, 
  Download, 
  MessageCircle, 
  ArrowLeft, 
  Plus, 
  AlertCircle 
} from 'lucide-react';
import { ProjectRequest, ProjectStatus } from '../../types';

interface StudentDashboardProps {
  requests: ProjectRequest[];
  onBackToHome: () => void;
  onNewRequestClick: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  requests,
  onBackToHome,
  onNewRequestClick,
}) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'files' | 'messages'>('requests');
  const [selectedReq, setSelectedReq] = useState<ProjectRequest | null>(null);

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'New':
        return <span className="text-cyan-400 font-mono text-xs">New Inbound</span>;
      case 'Reviewing':
        return <span className="text-purple-400 font-mono text-xs">Reviewing Rubric</span>;
      case 'Quoted':
        return <span className="text-amber-400 font-mono text-xs">Quoted</span>;
      case 'In Progress':
        return <span className="text-blue-400 font-mono text-xs">Assembling & Coding</span>;
      case 'Ready':
        return <span className="text-emerald-400 font-mono text-xs">Ready for Delivery</span>;
      case 'Completed':
        return <span className="text-slate-400 font-mono text-xs">Completed & Graded</span>;
      default:
        return <span className="text-slate-400 font-mono text-xs">{status}</span>;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 bg-[#050816] text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-4">
          <div>
            <button
              onClick={onBackToHome}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 mb-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Public Website</span>
            </button>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              Student Project Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Track project milestones, view breadboard test reports, and download final source code.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onNewRequestClick}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20"
            >
              <Plus className="w-4 h-4 text-slate-950" />
              <span>Submit New Project</span>
            </button>
          </div>
        </div>

        {/* Dashboard Metric Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-panel p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-slate-500 uppercase">Active Requests</span>
            <div className="text-2xl font-bold text-white mt-1 tabular-nums">
              {requests.filter((r) => r.status !== 'Completed').length}
            </div>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-slate-500 uppercase">In Assembly</span>
            <div className="text-2xl font-bold text-cyan-400 mt-1 tabular-nums">
              {requests.filter((r) => r.status === 'In Progress').length}
            </div>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-slate-500 uppercase">Ready Files</span>
            <div className="text-2xl font-bold text-emerald-400 mt-1 tabular-nums">
              {requests.filter((r) => r.status === 'Ready').length}
            </div>
          </div>
          <div className="glass-panel p-4 rounded-xl border border-slate-800">
            <span className="text-[11px] font-mono text-slate-500 uppercase">Total Completed</span>
            <div className="text-2xl font-bold text-purple-400 mt-1 tabular-nums">
              {requests.filter((r) => r.status === 'Completed').length + 12}
            </div>
          </div>
        </div>

        {/* Requests Table */}
        <div className="rounded-2xl glass-panel-elevated border border-slate-800 overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-bold text-white">
              My University Submissions
            </h3>
            <span className="text-xs font-mono text-slate-400">
              {requests.length} Projects Recorded
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-900/60 text-xs text-slate-400 font-mono uppercase tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-3.5">ID & Project Title</th>
                  <th className="px-6 py-3.5">Service</th>
                  <th className="px-6 py-3.5">University / Subject</th>
                  <th className="px-6 py-3.5">Deadline</th>
                  <th className="px-6 py-3.5">Current Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-white">{req.projectTitle}</div>
                      <div className="text-xs font-mono text-slate-500">{req.id}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-cyan-300">
                      {req.serviceType}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-300">
                      <div>{req.subject}</div>
                      <div className="text-slate-500">{req.university}</div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-300">
                      {req.deadline}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(req.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedReq(req)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium text-cyan-400 hover:text-cyan-300"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Request Modal / Drawer */}
        {selectedReq && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="relative w-full max-w-xl rounded-2xl glass-panel-elevated p-6 sm:p-8 border border-cyan-500/30 text-left">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <div>
                  <span className="text-xs font-mono text-cyan-400">{selectedReq.id}</span>
                  <h3 className="text-xl font-bold text-white">{selectedReq.projectTitle}</h3>
                </div>
                <button
                  onClick={() => setSelectedReq(null)}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <div><span className="text-slate-500 block">Service:</span> {selectedReq.serviceType}</div>
                  <div><span className="text-slate-500 block">Status:</span> {selectedReq.status}</div>
                  <div><span className="text-slate-500 block">Deadline:</span> {selectedReq.deadline}</div>
                  <div><span className="text-slate-500 block">Deliverable:</span> {selectedReq.preferredFormat}</div>
                </div>

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Submitted Requirements:</span>
                  <p className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-200 leading-relaxed">
                    {selectedReq.requirements}
                  </p>
                </div>

                {selectedReq.adminNotes && (
                  <div>
                    <span className="text-cyan-400 font-semibold block mb-1">Engineer Lab Note:</span>
                    <p className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-cyan-200">
                      {selectedReq.adminNotes}
                    </p>
                  </div>
                )}

                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Attached Rubrics:</span>
                  <div className="space-y-1.5">
                    {selectedReq.files.map((f, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800">
                        <span className="truncate">{f.name} ({f.size})</span>
                        <span className="text-cyan-400 font-mono text-[11px]">Securely Stored</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800 mt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedReq(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <a
                  href={`https://wa.me/923000000000?text=${encodeURIComponent(
                    `Hello Project In The Making, checking update on request ${selectedReq.id} (${selectedReq.projectTitle})`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Chat with Assigned Engineer</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
