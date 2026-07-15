export type ProjectCategory = "AI" | "Full Stack" | "Backend" | "Machine Learning";

export interface Project {
  slug: string;
  title: string;
  subtitle?: string;
  category: ProjectCategory[];
  shortDescription: string;
  description: string;
  problem: string;
  solution: string;
  architecture?: string;
  challenges?: string[];
  results: string[];
  tech: string[];
  github?: string | null;
  liveDemo?: string | null;
  featured?: boolean;
  status?: string;
  image: string;
}

export interface SkillCategory {
  name: string;
  color: string;
  skills: string[];
}

export interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  period: string;
  description: string[];
  type: "education" | "experience" | "project";
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  placeholder: boolean;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
