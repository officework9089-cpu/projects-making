export type ServiceCategory = 
  | 'Assignments'
  | 'Handwritten Work'
  | 'Coding Projects'
  | 'Hardware Projects'
  | 'DLD Projects'
  | 'Multisim'
  | 'Presentations'
  | 'Reports & Documentation'
  | 'Final Year Projects'
  | 'Internship Projects';

export type ProjectStatus = 
  | 'New'
  | 'Reviewing'
  | 'Quoted'
  | 'In Progress'
  | 'Ready'
  | 'Completed';

export interface ProjectItem {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  subject: string;
  summary: string;
  description: string;
  image: string;
  gallery: string[];
  technologies: string[];
  features: string[];
  deliverables: string[];
  clientUniversity?: string;
  completionTime?: string;
  type: 'Hardware' | 'Software' | 'Simulation' | 'Documentation' | 'Handwritten';
  demoAvailable: boolean;
  featured: boolean;
  date: string;
}

export interface ServiceItem {
  id: string;
  category: ServiceCategory;
  title: string;
  subtitle: string;
  description: string;
  subItems: string[];
  technologies: string[];
  accentColor: string;
  deliveryEstimate: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  initials: string;
  university: string;
  department: string;
  service: ServiceCategory;
  rating: number;
  review: string;
  date: string;
  status: 'Approved' | 'Pending' | 'Rejected';
  isDemo?: boolean;
}

export interface ProjectRequest {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  university: string;
  department: string;
  semester: string;
  subject: string;
  serviceType: ServiceCategory;
  projectTitle: string;
  requirements: string;
  deadline: string;
  preferredFormat: string;
  budget?: string;
  files: { name: string; size: string }[];
  status: ProjectStatus;
  createdAt: string;
  adminNotes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  options?: string[];
}
