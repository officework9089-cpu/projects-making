import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/hero/HeroSection';
import { TrustStats } from './components/home/TrustStats';
import { ServicesSection } from './components/home/ServicesSection';
import { PortfolioSection } from './components/home/PortfolioSection';
import { HardwareShowcase } from './components/home/HardwareShowcase';
import { HandwrittenShowcase } from './components/home/HandwrittenShowcase';
import { HowItWorks } from './components/home/HowItWorks';
import { ReviewsSection } from './components/home/ReviewsSection';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { FaqSection } from './components/home/FaqSection';
import { AboutSection } from './components/home/AboutSection';
import { ContactSection } from './components/home/ContactSection';
import { RequestProjectModal } from './components/modals/RequestProjectModal';
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { SubmitReviewModal } from './components/modals/SubmitReviewModal';
import { FloatingChat } from './components/chat/FloatingChat';
import { StudentDashboard } from './components/dashboard/StudentDashboard';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { 
  INITIAL_PROJECTS, 
  INITIAL_SERVICES, 
  INITIAL_REVIEWS, 
  INITIAL_REQUESTS 
} from './data/mockData';
import { ProjectItem, ServiceCategory, ReviewItem, ProjectRequest, ProjectStatus } from './types';

export default function App() {
  // Navigation / View State
  const [currentView, setCurrentView] = useState<'home' | 'student-portal' | 'admin-portal'>('home');

  // Application Data States
  const [projects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);
  const [requests, setRequests] = useState<ProjectRequest[]>(INITIAL_REQUESTS);

  // Modal States
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedServiceForRequest, setSelectedServiceForRequest] = useState<ServiceCategory | undefined>(undefined);
  const [selectedProjectForModal, setSelectedProjectForModal] = useState<ProjectItem | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // Handlers
  const handleOpenRequestModal = (service?: ServiceCategory) => {
    setSelectedServiceForRequest(service);
    setIsRequestModalOpen(true);
  };

  const handleSelectProjectBySlug = (slug: string) => {
    const found = projects.find((p) => p.slug === slug);
    if (found) {
      setSelectedProjectForModal(found);
    }
  };

  const handleCreateRequest = (newReqData: Omit<ProjectRequest, 'id' | 'status' | 'createdAt'>) => {
    const newRequest: ProjectRequest = {
      ...newReqData,
      id: `REQ-${new Date().getFullYear()}-${String(requests.length + 82).padStart(3, '0')}`,
      status: 'New',
      createdAt: new Date().toISOString().split('T')[0],
      adminNotes: 'Inbound submission received. Under initial syllabus review.',
    };
    setRequests((prev) => [newRequest, ...prev]);
  };

  const handleCreateReview = (reviewData: Omit<ReviewItem, 'id' | 'date' | 'status'>) => {
    const newReview: ReviewItem = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      status: 'Pending', // Needs admin approval!
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleUpdateStatus = (id: string, newStatus: ProjectStatus, notes?: string) => {
    setRequests((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: newStatus, adminNotes: notes || r.adminNotes } : r
      )
    );
  };

  const handleApproveReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Approved' } : r))
    );
  };

  const handleRejectReview = (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Rejected' } : r))
    );
  };

  const handleQuickContactSubmit = (data: { name: string; whatsapp: string; need: string; message: string }) => {
    const newRequest: ProjectRequest = {
      id: `REQ-${new Date().getFullYear()}-${String(requests.length + 82).padStart(3, '0')}`,
      name: data.name,
      whatsapp: data.whatsapp,
      email: `${data.name.toLowerCase().replace(/\s+/g, '')}@student.edu`,
      university: 'Inquiry Lead',
      department: 'Engineering / CS',
      semester: 'Current',
      subject: data.need,
      serviceType: 'Hardware Projects',
      projectTitle: data.need,
      requirements: data.message || 'Direct Quick Request submission from homepage contact block.',
      deadline: 'Urgent',
      preferredFormat: 'Digital & Physical',
      files: [],
      status: 'New',
      createdAt: new Date().toISOString().split('T')[0],
      adminNotes: 'Quick Inquiry via Homepage Contact form.',
    };
    setRequests((prev) => [newRequest, ...prev]);
  };

  const handleScrollToNav = (href: string) => {
    if (currentView !== 'home') {
      setCurrentView('home');
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
    <div className="min-h-screen bg-[#050816] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Sticky Header Navbar */}
      <Navbar
        onRequestClick={() => handleOpenRequestModal()}
        onPortalClick={() => {
          if (currentView === 'home') setCurrentView('student-portal');
          else if (currentView === 'student-portal') setCurrentView('admin-portal');
          else setCurrentView('home');
        }}
        currentView={currentView}
        onViewChange={(v) => setCurrentView(v)}
      />

      {/* Main View Router */}
      {currentView === 'home' && (
        <main>
          {/* Interactive 3D Hero */}
          <HeroSection
            onViewWorkClick={() => handleScrollToNav('#our-work')}
            onRequestClick={() => handleOpenRequestModal()}
            onChatClick={() => handleScrollToNav('#contact')}
          />

          {/* Trust & Quick Stats */}
          <TrustStats />

          {/* 10 Services Bento Grid */}
          <ServicesSection
            onSelectService={(cat) => handleOpenRequestModal(cat)}
          />

          {/* Major Featured Work / Portfolio */}
          <PortfolioSection
            projects={projects}
            onSelectProject={(project) => setSelectedProjectForModal(project)}
          />

          {/* DLD & Hardware Lab Horizontal Showcase */}
          <HardwareShowcase
            onSelectProjectBySlug={handleSelectProjectBySlug}
            onRequestHardware={() => handleOpenRequestModal('DLD Projects')}
          />

          {/* Handwritten Work Showcase */}
          <HandwrittenShowcase
            onRequestHandwritten={() => handleOpenRequestModal('Handwritten Work')}
          />

          {/* How It Works 4-Step Animated Timeline */}
          <HowItWorks
            onRequestClick={() => handleOpenRequestModal()}
          />

          {/* Verified Student Reviews */}
          <ReviewsSection
            reviews={reviews}
            onOpenSubmitModal={() => setIsReviewModalOpen(true)}
          />

          {/* Why University Students Choose Us */}
          <WhyChooseUs />

          {/* About The Studio Narrative */}
          <AboutSection />

          {/* Interactive FAQ Accordion */}
          <FaqSection />

          {/* Channels & Direct Quick Request */}
          <ContactSection
            onQuickSubmit={handleQuickContactSubmit}
          />
        </main>
      )}

      {currentView === 'student-portal' && (
        <StudentDashboard
          requests={requests}
          onBackToHome={() => setCurrentView('home')}
          onNewRequestClick={() => handleOpenRequestModal()}
        />
      )}

      {currentView === 'admin-portal' && (
        <AdminDashboard
          requests={requests}
          reviews={reviews}
          onBackToHome={() => setCurrentView('home')}
          onUpdateStatus={handleUpdateStatus}
          onApproveReview={handleApproveReview}
          onRejectReview={handleRejectReview}
        />
      )}

      {/* Global Quiet Footer */}
      <Footer
        onNavClick={handleScrollToNav}
        onRequestClick={() => handleOpenRequestModal()}
      />

      {/* Persistent Floating Chat Widget */}
      <FloatingChat
        onStartProjectRequest={(service) => handleOpenRequestModal(service)}
      />

      {/* Multi-Step Request A Project Stepper Modal */}
      <RequestProjectModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        defaultService={selectedServiceForRequest}
        onSubmitRequest={handleCreateRequest}
      />

      {/* Detailed Project / Case Study Modal */}
      <ProjectDetailModal
        project={selectedProjectForModal}
        onClose={() => setSelectedProjectForModal(null)}
        onRequestSimilar={(p) => {
          setSelectedProjectForModal(null);
          handleOpenRequestModal(p.category);
        }}
      />

      {/* Submit Student Review Modal */}
      <SubmitReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSubmitReview={handleCreateReview}
      />
    </div>
  );
}
