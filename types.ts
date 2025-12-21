
export interface ServicePackage {
  name: string;
  category: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
  badge?: string; // Added for specific labels like "Kernkompetenz"
}

export interface Testimonial {
  quote: string; // The review text
  author: string; // Name + Location
  role: string; // Date
  service?: string; // The service performed
  id?: number;
  company?: string;
  avatar?: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}

export interface ProcessStep {
  step: string;
  title: string;
  desc: string;
  icon: any; 
}

export interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  category: string;
}