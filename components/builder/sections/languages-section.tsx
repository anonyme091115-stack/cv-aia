"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Language, LanguageLevel } from "@/types/cv"
import { Plus, Trash2 } from "lucide-react"

interface LanguagesSectionProps {
  languages: Language[]
  onChange: (languages: Language[]) => void
}

const levels: { value: LanguageLevel; label: string }[] = [
  { value: "native", label: "Langue maternelle" },
  { value: "fluent", label: "Courant (C1-C2)" },
  { value: "advanced", label: "Avancé (B2)" },
  { value: "intermediate", label: "Intermédiaire (B1)" },
  { value: "basic", label: "Basique (A1-A2)" },
]

export function LanguagesSection({ languages, onChange }: LanguagesSectionProps) {
  const addLanguage = () => {
    const newLang: Language = {
      id: crypto.randomUUID(),
      name: "",
      level: "intermediate",
    }
    onChange([...languages, newLang])
  }

  const updateLanguage = (index: number, field: keyof Language, value: unknown) => {
    const updated = [...languages]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const removeLanguage = (index: number) => {
    onChange(languages.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">Langues</h2>
          <p className="text-sm text-muted-foreground">
            Vos compétences linguistiques
          </p>
        </div>
        <Button onClick={addLanguage} size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {languages.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground mb-4">
              Aucune langue ajoutée
            </p>
            <Button onClick={addLanguage} variant="outline" size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Ajouter une langue
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {languages.map((lang, index) => (
            <Card key={lang.id}>
              <CardContent className="pt-4">
                <div className="flex items-end gap-4">
                  <div className="flex-1 space-y-2">
                    <Label>Langue</Label>
                    <Input
                      placeholder="Anglais, Espagnol..."
                      value={lang.name}
                      onChange={(e) => updateLanguage(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label>Niveau</Label>
                    <Select
                      value={lang.level}
                      onValueChange={(value) => updateLanguage(index, "level", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner..." />
                      </SelectTrigger>
                      <SelectContent>
                        {levels.map((level) => (
                          <SelectItem key={level.value} value={level.value}>
                            {level.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 shrink-0 text-muted-foreground hover:text-destructive"
                    onClick={() => removeLanguage(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
