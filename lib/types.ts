export type Experience = {
  role: string;
  company: string;
  location: string;
  dates: string;
  problem: string;
  action: string;
  impact: string;
  tools: string[];
};

export type Project = {
  slug: string;
  name: string;
  dates: string;
  category: "Backend" | "AI" | "Full-stack";
  overview: string;
  responsibilities: string[];
  techStack: string[];
  challenges: string[];
  results: string[];
  architecture: string[];
  features: string[];
  contributions: string[];
};

export type SkillGroup = {
  title: string;
  skills: string[];
  proof: string;
};

export type Education = {
  school: string;
  location: string;
  dates: string;
  degree: string;
  gpa?: string;
};

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatar?: string;
};

export type Achievement = {
  title: string;
  description: string;
  date: string;
  icon?: string;
  category: "certification" | "award" | "hackathon" | "other";
};

export type RecentAiTraining = {
  title: string;
  description: string;
  date: string;
  modelType?: string;
  metrics?: string;
};

export type SiteContent = {
  name: string;
  role: string;
  summary: string;
  recruiterIntro: string;
  impactMetrics: {
    label: string;
    value: number;
    suffix?: string;
  }[];
  skillProficiencies: {
    name: string;
    value: number;
  }[];
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
  };
  education: Education;
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  testimonials?: Testimonial[];
  achievements?: Achievement[];
  recentAiTraining?: RecentAiTraining;
};
