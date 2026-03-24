"use client"

import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { CVData, Template } from "@/types/cv"
import {
  ArrowLeft,
  Loader2,
  Check,
  Download,
  Share2,
  Sparkles,
  Wand2,
  Target
} from "lucide-react"

interface CVEditorHeaderProps {
  cv: CVData
  isSaving: boolean
  lastSaved: Date | null
  onTitleChange: (title: string) => void
  onTemplateChange: (template: Template) => void
}

const templates: { value: Template; label: string }[] = [
  { value: "minimal", label: "Minimal" },
  { value: "creative", label: "Créatif" },
  { value: "corporate", label: "Corporate" },
  { value: "premium", label: "Premium" },
]

export function CVEditorHeader({
  cv,
  isSaving,
  lastSaved,
  onTitleChange,
  onTemplateChange,
}: CVEditorHeaderProps) {
  return (
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-4 shrink-0">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/app">
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only">Retour</span>
          </Link>
        </Button>

        <div className="flex items-center gap-3">
          <Input
            value={cv.title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="h-8 w-48 text-sm font-medium bg-transparent border-transparent hover:border-border focus:border-primary"
          />

          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {isSaving ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Sauvegarde...</span>
              </>
            ) : lastSaved ? (
              <>
                <Check className="h-3.5 w-3.5 text-green-500" />
                <span>
                  Sauvegardé {formatDistanceToNow(lastSaved, { addSuffix: true, locale: fr })}
                </span>
              </>
            ) : null}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Select value={cv.template} onValueChange={(value) => onTemplateChange(value as Template)}>
          <SelectTrigger className="h-8 w-32 text-sm">
            <SelectValue placeholder="Template" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((template) => (
              <SelectItem key={template.value} value={template.value}>
                {template.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="h-4 w-px bg-border mx-1" />

        <Button variant="outline" size="sm" className="gap-1.5">
          <Target className="h-4 w-4" />
          Score ATS
        </Button>

        <Button variant="outline" size="sm" className="gap-1.5">
          <Wand2 className="h-4 w-4" />
          Améliorer
        </Button>

        <div className="h-4 w-px bg-border mx-1" />

        <Button variant="outline" size="sm" className="gap-1.5">
          <Share2 className="h-4 w-4" />
          Partager
        </Button>

        <Button variant="outline" size="sm" className="gap-1.5">
          <Download className="h-4 w-4" />
          Exporter
        </Button>
      </div>
    </header>
  )
}
