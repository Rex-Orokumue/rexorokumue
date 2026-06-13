// app/data/profileData.ts
// Single source of truth for identity, experience, skills, education.
// REAL content only — no fabrication. TODO markers note facts to confirm.

export interface ExperienceItem {
  company: string;
  role: string;
  period: string;        // TODO: set exact start months with Rex
  summary: string;
  points: string[];
  url?: string;
  current?: boolean;
}

export interface SkillGroup {
  label: string;
  items: string[];
}

export interface EducationItem {
  title: string;
  org: string;
  note?: string;
}

export const profile = {
  name: 'Rex Orokumue',
  title: 'Full-stack developer — Next.js, Flutter & Supabase. Founder of Zolarux.',
  availability: 'Open to remote roles · relocation welcome (incl. abroad) · freelance',
  location: 'Nigeria · remote-ready',
  email: 'gorokumue@gmail.com',
  socials: {
    github: 'https://github.com/Rex-Orokumue',
    linkedin: 'https://www.linkedin.com/in/rexorokumue/',
    x: 'https://x.com/iamrexorokumue',
    youtube: 'https://www.youtube.com/@TheTechSerial',
    zolarux: 'https://zolarux.com.ng',
  },
};

export const experience: ExperienceItem[] = [
  {
    company: 'Spiexer',
    role: 'Software Engineer',
    period: 'Present', // TODO: start month
    summary:
      'Owning the full mobile build — frontend and backend — for Skuully, an early-stage school-management platform.',
    points: [
      'Building Skuully’s mobile app end-to-end: UI, state, and backend integration.',
      'Sole owner of the mobile build from the ground up.',
    ],
    current: true,
  },
  {
    company: 'EasySpend',
    role: 'Mobile Engineer',
    period: 'Present', // TODO: start month
    summary:
      'Contributing to a live fintech mobile app — shipping bug fixes and feature tasks across the production codebase.',
    points: [
      'Resolve assigned mobile tasks (bug fixes and feature work) in a production fintech app.',
      'Work within an existing, shipped mobile codebase.',
    ],
    current: true,
  },
  {
    company: 'E-technix',
    role: 'Instructor & Platform Developer',
    period: 'Present', // TODO: dates
    summary:
      'Teach data analytics, web, and mobile development; built the entire E-technix training platform from scratch.',
    points: [
      'Built the full training platform: marketing site + student hub with authentication and dashboards.',
      'Instruct students in data analytics, web development, and mobile development.',
    ],
    url: 'https://e-technix.com',
    current: true,
  },
];

export const skills: SkillGroup[] = [
  { label: 'Mobile', items: ['Flutter', 'Dart', 'React Native'] },
  { label: 'Web', items: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'CSS'] },
  { label: 'Backend & Data', items: ['Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Firebase'] },
];

export const education: EducationItem[] = [
  {
    title: 'BSc, Business Management',
    org: 'Miva Open University',
    note: 'In progress',
  },
  {
    title: 'Senior School Certificate (SSCE)',
    org: '',
  },
  {
    title: 'Self-taught Software Engineer',
    org: 'Shipping real products since day one',
  },
];
