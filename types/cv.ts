export interface Profile {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  summary: string
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate: string | null
  current: boolean
  description: string
  highlights: string[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  location: string
  startDate: string
  endDate: string | null
  description: string
  gpa: string | null
}

export interface SkillGroup {
  id: string
  name: string
  skills: string[]
}

export type LanguageLevel = 'native' | 'fluent' | 'advanced' | 'intermediate' | 'basic'

export interface Language {
  id: string
  name: string
  level: LanguageLevel
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  url: string | null
  startDate: string
  endDate: string | null
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  url: string | null
  credentialId: string | null
}

export type CVTemplate = 'minimal' | 'creative' | 'corporate' | 'premium'
export type Template = CVTemplate

export interface CVSections {
  profile: Profile
  experiences: Experience[]
  education: Education[]
  skills: SkillGroup[]
  languages: Language[]
  projects: Project[]
  certifications: Certification[]
}

export interface CVData {
  id: string
  user_id: string
  title: string
  template: CVTemplate
  sections: CVSections
  share_id: string | null
  ats_score: number | null
  created_at: string
  updated_at: string
}

export interface AgentMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export const defaultCVSections: CVSections = {
  profile: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    summary: ''
  },
  experiences: [],
  education: [],
  skills: [],
  languages: [],
  projects: [],
  certifications: []
}
