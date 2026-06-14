export interface Personal {
  name: string
  title: string
  tagline: string
  location: string
  email: string
  avatarUrl: string
  resumeUrl: string
  availabilityStatus: 'open' | 'limited' | 'closed'
  roles: string[]
  bio: string[]
  quickFacts: QuickFact[]
  milestones: Milestone[]
}

export interface QuickFact {
  icon: string
  label: string
}

export interface Milestone {
  year: string
  title: string
  subtitle: string
}

export interface Social {
  github: string
  linkedin: string
  twitter?: string
  email: string
}

export interface Skill {
  name: string
  category: SkillCategory
  proficiency: number
}

export type SkillCategory = 'Frontend' | 'Backend' | 'ML / AI' | 'Databases' | 'DevOps & Cloud' | 'Blockchain'

export interface Project {
  id: string
  number: string
  title: string
  tagline: string
  problem: string
  solution: string
  challenges?: string[]
  description: string
  longDescription: string[]
  stack: string[]
  highlights: string[]
  metrics: [string, string][]
  badges: string[]
  links: { github: string; live: string }
  featured: boolean
  status: string
  year: string
  illustration?: string
  images?: string[]
}

export interface Experience {
  company: string
  role: string
  period: string
  type: string
  location: string
  summary: string
  metrics: [string, string][]
  responsibilities: string[]
  tech: string[]
  highlights?: string[]
  clients?: ClientProject[]
  subtitle?: string
}

export interface ClientProject {
  name: string
  meta: string
  description: string
  stack: string
  illustration?: string
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  credentialId?: string
  credentialUrl?: string
  image: string
  category: CertificateCategory
  tags: string[]
}

export type CertificateCategory = 'AI & Machine Learning' | 'Cloud & DevOps' | 'Web Development' | 'Data Science' | 'Programming' | 'Design'

export interface Achievement {
  id: string
  icon: string
  title: string
  org: string
  year: string
  description: string
  tags: string[]
  highlight?: boolean
  image?: string
}

export interface TerminalCommand {
  command: string
  description: string
  output: string
}

export interface Portfolio {
  personal: Personal
  social: Social
  skills: Skill[]
  projects: Project[]
  experience: Experience[]
  achievements: Achievement[]
  certificates: Certificate[]
  contact: ContactSection
}

export interface ContactSection {
  email: string
  socials: { label: string; href: string }[]
  footer: string
}
