import type { CVSections, CV } from "@/types/cv"

export function getDefaultSections(): CVSections {
  return {
    profile: {
      name: "",
      title: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      summary: "",
    },
    experiences: [],
    education: [],
    skills: [],
    languages: [],
    projects: [],
    certifications: [],
  }
}

export function generateShareId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < 10; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

export function formatDateRange(startDate: string, endDate?: string | null, current?: boolean): string {
  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString("fr-FR", { month: "short", year: "numeric" })
  }

  const start = formatDate(startDate)
  
  if (current) {
    return `${start} - Présent`
  }
  
  if (endDate) {
    return `${start} - ${formatDate(endDate)}`
  }
  
  return start
}

export function getATSScoreColor(score: number): string {
  if (score >= 80) return "text-green-500"
  if (score >= 60) return "text-yellow-500"
  return "text-red-500"
}

export function getATSScoreBadgeVariant(score: number): "default" | "secondary" | "destructive" {
  if (score >= 80) return "default"
  if (score >= 60) return "secondary"
  return "destructive"
}

// LocalStorage utilities for CV data persistence
const CV_STORAGE_KEY = "cvs_data"

export interface StoredCV {
  id: string
  title: string
  template: string
  sections: CVSections
  shareId?: string
  atsScore?: number
  createdAt: string
  updatedAt: string
}

export function getStoredCVs(): StoredCV[] {
  if (typeof window === "undefined") return []
  
  try {
    const stored = localStorage.getItem(CV_STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

export function getStoredCV(id: string): StoredCV | null {
  const cvs = getStoredCVs()
  return cvs.find(cv => cv.id === id) || null
}

export function saveStoredCV(cv: StoredCV): void {
  if (typeof window === "undefined") return
  
  try {
    const cvs = getStoredCVs()
    const existingIndex = cvs.findIndex(c => c.id === cv.id)
    
    if (existingIndex >= 0) {
      cvs[existingIndex] = {
        ...cv,
        updatedAt: new Date().toISOString()
      }
    } else {
      cvs.push({
        ...cv,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
    }
    
    localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(cvs))
  } catch (error) {
    console.error("Error saving CV to localStorage:", error)
  }
}

export function deleteStoredCV(id: string): void {
  if (typeof window === "undefined") return
  
  try {
    const cvs = getStoredCVs()
    const filtered = cvs.filter(cv => cv.id !== id)
    localStorage.setItem(CV_STORAGE_KEY, JSON.stringify(filtered))
  } catch (error) {
    console.error("Error deleting CV from localStorage:", error)
  }
}

export function createNewCV(): StoredCV {
  return {
    id: generateShareId(),
    title: "Mon CV",
    template: "minimal",
    sections: getDefaultSections(),
    shareId: generateShareId(),
    atsScore: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
}
