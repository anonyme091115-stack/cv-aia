"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Experience } from "@/types/cv"
import { Plus, Trash2, GripVertical, Wand2 } from "lucide-react"

interface ExperienceSectionProps {
  experiences: Experience[]
  onChange: (experiences: Experience[]) => void
}

export function ExperienceSection({ experiences, onChange }: ExperienceSectionProps) {
  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      location: "",
      startDate: "",
      endDate: null,
      current: false,
      description: "",
      highlights: [],
    }
    onChange([...experiences, newExp])
  }

  const updateExperience = (index: number, field: keyof Experience, value: unknown) => {
    const updated = [...experiences]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const removeExperience = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index))
  }

  const updateHighlight = (expIndex: number, hlIndex: number, value: string) => {
    const updated = [...experiences]
    const highlights = [...updated[expIndex].highlights]
    highlights[hlIndex] = value
    updated[expIndex] = { ...updated[expIndex], highlights }
    onChange(updated)
  }

  const addHighlight = (expIndex: number) => {
    const updated = [...experiences]
    updated[expIndex] = {
      ...updated[expIndex],
      highlights: [...updated[expIndex].highlights, ""],
    }
    onChange(updated)
  }

  const removeHighlight = (expIndex: number, hlIndex: number) => {
    const updated = [...experiences]
    updated[expIndex] = {
      ...updated[expIndex],
      highlights: updated[expIndex].highlights.filter((_, i) => i !== hlIndex),
    }
    onChange(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">Expériences professionnelles</h2>
          <p className="text-sm text-muted-foreground">
            Vos postes et réalisations
          </p>
        </div>
        <Button onClick={addExperience} size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {experiences.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground mb-4">
              Aucune expérience ajoutée
            </p>
            <Button onClick={addExperience} variant="outline" size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Ajouter une expérience
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <Card key={exp.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <CardTitle className="text-base">
                      {exp.position || exp.company || `Expérience ${index + 1}`}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Entreprise</Label>
                    <Input
                      placeholder="Nom de l'entreprise"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, "company", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Poste</Label>
                    <Input
                      placeholder="Titre du poste"
                      value={exp.position}
                      onChange={(e) => updateExperience(index, "position", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Localisation</Label>
                  <Input
                    placeholder="Paris, France"
                    value={exp.location}
                    onChange={(e) => updateExperience(index, "location", e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date de début</Label>
                    <Input
                      type="month"
                      value={exp.startDate}
                      onChange={(e) => updateExperience(index, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date de fin</Label>
                    <Input
                      type="month"
                      value={exp.endDate || ""}
                      onChange={(e) => updateExperience(index, "endDate", e.target.value)}
                      disabled={exp.current}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={exp.current}
                    onCheckedChange={(checked) => {
                      updateExperience(index, "current", checked)
                      if (checked) updateExperience(index, "endDate", null)
                    }}
                  />
                  <Label className="text-sm font-normal">Poste actuel</Label>
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Décrivez vos responsabilités..."
                    value={exp.description}
                    onChange={(e) => updateExperience(index, "description", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Points clés / Réalisations</Label>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => addHighlight(index)}
                    >
                      <Plus className="mr-1 h-3.5 w-3.5" />
                      Ajouter
                    </Button>
                  </div>
                  {exp.highlights.map((hl, hlIndex) => (
                    <div key={hlIndex} className="flex items-center gap-2">
                      <Input
                        placeholder="Réalisation ou responsabilité clé..."
                        value={hl}
                        onChange={(e) => updateHighlight(index, hlIndex, e.target.value)}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => removeHighlight(index, hlIndex)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
