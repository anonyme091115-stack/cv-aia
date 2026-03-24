"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Education } from "@/types/cv"
import { Plus, Trash2, GripVertical } from "lucide-react"

interface EducationSectionProps {
  education: Education[]
  onChange: (education: Education[]) => void
}

export function EducationSection({ education, onChange }: EducationSectionProps) {
  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      field: "",
      location: "",
      startDate: "",
      endDate: null,
      description: "",
      gpa: null,
    }
    onChange([...education, newEdu])
  }

  const updateEducation = (index: number, field: keyof Education, value: unknown) => {
    const updated = [...education]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const removeEducation = (index: number) => {
    onChange(education.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">Formation</h2>
          <p className="text-sm text-muted-foreground">
            Vos diplômes et parcours académique
          </p>
        </div>
        <Button onClick={addEducation} size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {education.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground mb-4">
              Aucune formation ajoutée
            </p>
            <Button onClick={addEducation} variant="outline" size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Ajouter une formation
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <Card key={edu.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <CardTitle className="text-base">
                      {edu.degree || edu.institution || `Formation ${index + 1}`}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Établissement</Label>
                    <Input
                      placeholder="Université / École"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, "institution", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Localisation</Label>
                    <Input
                      placeholder="Paris, France"
                      value={edu.location}
                      onChange={(e) => updateEducation(index, "location", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Diplôme</Label>
                    <Input
                      placeholder="Master, Licence, BTS..."
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, "degree", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Domaine d&apos;études</Label>
                    <Input
                      placeholder="Informatique, Commerce..."
                      value={edu.field}
                      onChange={(e) => updateEducation(index, "field", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date de début</Label>
                    <Input
                      type="month"
                      value={edu.startDate}
                      onChange={(e) => updateEducation(index, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date de fin</Label>
                    <Input
                      type="month"
                      value={edu.endDate || ""}
                      onChange={(e) => updateEducation(index, "endDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Mention / GPA (optionnel)</Label>
                  <Input
                    placeholder="Mention Bien, 15/20..."
                    value={edu.gpa || ""}
                    onChange={(e) => updateEducation(index, "gpa", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description (optionnel)</Label>
                  <Textarea
                    placeholder="Cours majeurs, projets académiques..."
                    value={edu.description}
                    onChange={(e) => updateEducation(index, "description", e.target.value)}
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
