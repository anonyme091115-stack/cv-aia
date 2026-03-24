"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useDebouncedCallback } from "@/hooks/use-debounced-callback"
import { saveStoredCV } from "@/lib/cv-utils"
import type { CVSections, Template } from "@/types/cv"
import type { StoredCV } from "@/lib/cv-utils"

// Components
import { CVEditorHeader } from "./cv-editor-header"
import { CVEditorSidebar } from "./cv-editor-sidebar"
import { CVPreview } from "./cv-preview"
import { ProfileSection } from "./sections/profile-section"
import { ExperienceSection } from "./sections/experience-section"
import { EducationSection } from "./sections/education-section"
import { SkillsSection } from "./sections/skills-section"
import { LanguagesSection } from "./sections/languages-section"
import { ProjectsSection } from "./sections/projects-section"
import { CertificationsSection } from "./sections/certifications-section"

interface CVEditorProps {
  initialCV: StoredCV
}

export type ActiveSection = 
  | "profile" 
  | "experiences" 
  | "education" 
  | "skills" 
  | "languages" 
  | "projects" 
  | "certifications"

export function CVEditor({ initialCV }: CVEditorProps) {
  const [cv, setCV] = useState<StoredCV>(initialCV)
  const [activeSection, setActiveSection] = useState<ActiveSection>("profile")
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const router = useRouter()

  // Auto-save with debounce
  const saveCV = useDebouncedCallback((cvData: StoredCV) => {
    setIsSaving(true)
    try {
      saveStoredCV(cvData)
      setLastSaved(new Date())
    } catch (error) {
      console.error("Error saving CV:", error)
      toast.error("Erreur lors de la sauvegarde")
    } finally {
      setIsSaving(false)
    }
  }, 1000)

  // Trigger save on CV changes
  useEffect(() => {
    if (cv !== initialCV) {
      saveCV(cv)
    }
  }, [cv, initialCV, saveCV])

  const updateSections = useCallback((sections: Partial<CVSections>) => {
    setCV((prev) => ({
      ...prev,
      sections: {
        ...prev.sections,
        ...sections,
      },
    }))
  }, [])

  const updateTitle = useCallback((title: string) => {
    setCV((prev) => ({ ...prev, title }))
  }, [])

  const updateTemplate = useCallback((template: Template) => {
    setCV((prev) => ({ ...prev, template }))
  }, [])

  const renderActiveSection = () => {
    switch (activeSection) {
      case "profile":
        return (
          <ProfileSection
            profile={cv.sections.profile}
            onChange={(profile) => updateSections({ profile })}
          />
        )
      case "experiences":
        return (
          <ExperienceSection
            experiences={cv.sections.experiences}
            onChange={(experiences) => updateSections({ experiences })}
          />
        )
      case "education":
        return (
          <EducationSection
            education={cv.sections.education}
            onChange={(education) => updateSections({ education })}
          />
        )
      case "skills":
        return (
          <SkillsSection
            skills={cv.sections.skills}
            onChange={(skills) => updateSections({ skills })}
          />
        )
      case "languages":
        return (
          <LanguagesSection
            languages={cv.sections.languages}
            onChange={(languages) => updateSections({ languages })}
          />
        )
      case "projects":
        return (
          <ProjectsSection
            projects={cv.sections.projects}
            onChange={(projects) => updateSections({ projects })}
          />
        )
      case "certifications":
        return (
          <CertificationsSection
            certifications={cv.sections.certifications}
            onChange={(certifications) => updateSections({ certifications })}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      <CVEditorHeader
        cv={cv}
        isSaving={isSaving}
        lastSaved={lastSaved}
        onTitleChange={updateTitle}
        onTemplateChange={updateTemplate}
      />

      <div className="flex-1 flex overflow-hidden">
        {/* Left sidebar - Section navigation */}
        <CVEditorSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {/* Center - Form editor */}
        <div className="flex-1 overflow-auto p-6 border-r border-border">
          <div className="max-w-2xl mx-auto">
            {renderActiveSection()}
          </div>
        </div>

        {/* Right - Live preview */}
        <div className="w-[45%] overflow-auto bg-muted/30 p-6">
          <CVPreview cv={cv} />
        </div>
      </div>
    </div>
  )
}
