"use client"

import { cn } from "@/lib/utils"
import type { ActiveSection } from "./cv-editor"
import {
  User,
  Briefcase,
  GraduationCap,
  Wrench,
  Languages,
  FolderKanban,
  Award
} from "lucide-react"

interface CVEditorSidebarProps {
  activeSection: ActiveSection
  onSectionChange: (section: ActiveSection) => void
}

const sections: { id: ActiveSection; label: string; icon: React.ElementType }[] = [
  { id: "profile", label: "Profil", icon: User },
  { id: "experiences", label: "Expériences", icon: Briefcase },
  { id: "education", label: "Formation", icon: GraduationCap },
  { id: "skills", label: "Compétences", icon: Wrench },
  { id: "languages", label: "Langues", icon: Languages },
  { id: "projects", label: "Projets", icon: FolderKanban },
  { id: "certifications", label: "Certifications", icon: Award },
]

export function CVEditorSidebar({ activeSection, onSectionChange }: CVEditorSidebarProps) {
  return (
    <aside className="w-48 border-r border-border bg-muted/20 p-3 shrink-0">
      <nav className="space-y-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left",
              activeSection === section.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <section.icon className="h-4 w-4" />
            {section.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
