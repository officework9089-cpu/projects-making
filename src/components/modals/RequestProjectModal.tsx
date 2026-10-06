import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  UploadCloud, 
  FileText, 
  Trash2, 
  ShieldCheck, 
  Sparkles,
  MessageCircle
} from 'lucide-react';
import { ServiceCategory, ProjectRequest } from '../../types';

interface RequestProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: ServiceCategory;
  onSubmitRequest: (req: Omit<ProjectRequest, 'id' | 'status' | 'createdAt'>) => void;
}

export const RequestProjectModal: React.FC<RequestProjectModalProps> = ({
  isOpen,
  onClose,
  defaultService,
  onSubmitRequest,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');

  const [university, setUniversity] = useState('');
  const [department, setDepartment] = useState('');
  const [semester, setSemester] = useState('4th Semester');
  const [subject, setSubject] = useState('');

  const [serviceType, setServiceType] = useState<ServiceCategory>(defaultService || 'DLD Projects');
  const [projectTitle, setProjectTitle] = useState('');
  const [requirements, setRequirements] = useState('');
  const [deadline, setDeadline] = useState('');
  const [preferredFormat, setPreferredFormat] = useState('Digital Files + Documentation');

  const [files, setFiles] = useState<{ name: string; size: string }[]>([]);
  const [budget, setBudget] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultService) {
      setServiceType(defaultService);
    }
  }, [defaultService]);

  if (!isOpen) return null;

  const validateStep = (step: number) => {
    if (step === 1) {
      if (!name.trim() || !whatsapp.trim() || !email.trim()) {
        setError('Please provide your name, WhatsApp number, and email.');
        return false;
      }
    }
    if (step === 2) {
      if (!university.trim() || !subject.trim()) {
        setError('Please enter your university and subject name.');
        return false;
      }
    }
    if (step === 3) {
      if (!projectTitle.trim() || !requirements.trim() || !deadline) {
        setError('Please enter the project title, requirements summary, and deadline date.');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setError('');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((f) => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
      }));
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) {
      setCurrentStep(3);
      return;
    }

    onSubmitRequest({
      name,
      whatsapp,
      email,
      university,
      department: department || 'Engineering / Computing',
      semester,
      subject,
      serviceType,
      projectTitle,
      requirements,
      deadline,
      preferredFormat,
      budget: budget || 'Standard Student Rate',
      files: files.length > 0 ? files : [{ name: 'Project_Requirements_Prompt.pdf', size: '1.1 MB' }],
    });

    setIsSubmitted(true);
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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl glass-panel-elevated p-6 sm:p-9 border border-cyan-500/30 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-10 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white font-display">
              Request Received Successfully!
            </h3>
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              We have received your requirements for <span className="text-cyan-300 font-semibold">{projectTitle || 'your project'}</span>. Our academic lead is reviewing your specifications and will message you on WhatsApp ({whatsapp}) within 15–30 minutes.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/923000000000?text=${encodeURIComponent(
                  `Hi Project In The Making! I just submitted request for ${projectTitle} (${serviceType}).`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <MessageCircle className="w-4 h-4 fill-slate-950" />
                <span>Message Us on WhatsApp Now</span>
              </a>
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="mb-6 text-left">
              <div className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Start Requirement Discussion</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
                Have a Project in Mind?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Send us your requirements and we'll discuss the next steps, milestones, and quote.
              </p>
            </div>

            {/* Stepper Progress Bar (01 → 02 → 03 → 04 → 05) */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
              {[1, 2, 3, 4, 5].map((step) => {
                const stepNames = ['Personal', 'Academic', 'Work Details', 'Uploads', 'Review'];
                const isCurrent = currentStep === step;
                const isDone = currentStep > step;
                return (
                  <div key={step} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                        isCurrent
                          ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/20 shadow-md shadow-amber-500/30'
                          : isDone
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-900 text-slate-500 border border-slate-700'
                      }`}
                    >
                      {isDone ? '✓' : `0${step}`}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mt-1 hidden sm:block truncate max-w-[70px]">
                      {stepNames[step - 1]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-300 text-left">
                {error}
              </div>
            )}

            {/* Step Form Screens */}
            <form onSubmit={handleFinalSubmit} className="space-y-4 text-left">
              {/* STEP 1: Personal Details */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <span className="text-amber-400 font-mono">Step 1:</span> Your Contact Information
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Ali Raza"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        WhatsApp Number * (For fast direct updates)
                      </label>
                      <input
                        type="tel"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        placeholder="+92 300 1234567"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@university.edu"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Academic Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <span className="text-amber-400 font-mono">Step 2:</span> University & Course Information
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        University *
                      </label>
                      <input
                        type="text"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder="e.g. NUST / UET / FAST"
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
                        placeholder="e.g. Electrical / CS / Software"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Semester
                      </label>
                      <select
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                      >
                        <option>1st Semester</option>
                        <option>2nd Semester</option>
                        <option>3rd Semester</option>
                        <option>4th Semester</option>
                        <option>5th Semester</option>
                        <option>6th Semester</option>
                        <option>7th Semester</option>
                        <option>8th Semester (Final Year)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Subject / Course Name *
                      </label>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Digital Logic Design (DLD)"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Work Details */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <span className="text-amber-400 font-mono">Step 3:</span> Project Requirements & Scope
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Service Category
                      </label>
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value as ServiceCategory)}
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
                        Project Title *
                      </label>
                      <input
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                        placeholder="e.g. MOD-10 Counter on Breadboard"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Detailed Instructions / Requirements *
                    </label>
                    <textarea
                      rows={3}
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="Paste instructions, IC requirements, preferred programming languages, constraints..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Submission Deadline Date *
                      </label>
                      <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Preferred Deliverable Format
                      </label>
                      <input
                        type="text"
                        value={preferredFormat}
                        onChange={(e) => setPreferredFormat(e.target.value)}
                        placeholder="e.g. Physical Circuit + PDF Report"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Upload Files */}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <span className="text-amber-400 font-mono">Step 4:</span> Upload Assignment Rubric / Reference Files
                  </h4>

                  {/* Drag and Drop Zone */}
                  <label className="border-2 border-dashed border-slate-700 hover:border-cyan-400/60 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer bg-slate-900/50 transition-colors">
                    <UploadCloud className="w-10 h-10 text-cyan-400 mb-2" />
                    <span className="text-sm font-semibold text-white">
                      Click to browse or drop project files
                    </span>
                    <span className="text-xs text-slate-400 mt-1">
                      PDF, DOCX, ZIP, PNG, Multisim .ms14 (Max 50MB)
                    </span>
                    <input
                      type="file"
                      multiple
                      onChange={handleSimulatedFileUpload}
                      className="hidden"
                    />
                  </label>

                  {/* Attached Files List */}
                  {files.length > 0 && (
                    <div className="space-y-2 mt-3">
                      <div className="text-xs font-semibold text-slate-300">
                        Attached Files ({files.length}):
                      </div>
                      {files.map((file, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200"
                        >
                          <div className="flex items-center gap-2 truncate">
                            <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                            <span className="truncate">{file.name}</span>
                            <span className="text-slate-500 font-mono">({file.size})</span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile(idx)}
                            className="p-1 text-slate-400 hover:text-red-400"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>All uploaded documents are encrypted and strictly confidential.</span>
                  </div>
                </div>
              )}

              {/* STEP 5: Budget & Confirmation */}
              {currentStep === 5 && (
                <div className="space-y-5">
                  <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                    <span className="text-amber-400 font-mono">Step 5:</span> Budget & Final Confirmation
                  </h4>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Estimated Budget Range (Optional)
                    </label>
                    <input
                      type="text"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      placeholder="e.g. $40 - $70 (or leave blank for standard quote)"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700 space-y-2 text-xs">
                    <div className="text-white font-bold pb-2 border-b border-slate-800 flex items-center justify-between">
                      <span>Requirement Summary</span>
                      <span className="text-cyan-400 font-mono">{serviceType}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-slate-300">
                      <div><span className="text-slate-500">Student:</span> {name}</div>
                      <div><span className="text-slate-500">WhatsApp:</span> {whatsapp}</div>
                      <div><span className="text-slate-500">University:</span> {university}</div>
                      <div><span className="text-slate-500">Deadline:</span> {deadline || 'Urgent'}</div>
                    </div>
                    <div className="pt-2 text-slate-300">
                      <span className="text-slate-500">Project:</span> {projectTitle}
                    </div>
                  </div>
                </div>
              )}

              {/* Stepper Navigation Buttons */}
              <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                  >
                    <span>Next Step</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-7 py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 text-xs font-bold flex items-center gap-2 shadow-xl shadow-amber-500/30 cursor-pointer"
                  >
                    <span>Submit Requirements</span>
                    <ArrowRight className="w-4 h-4 text-slate-950" />
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
