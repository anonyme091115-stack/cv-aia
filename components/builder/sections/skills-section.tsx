"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { SkillGroup } from "@/types/cv"
import { Plus, Trash2, X } from "lucide-react"
import { useState } from "react"

interface SkillsSectionProps {
  skills: SkillGroup[]
  onChange: (skills: SkillGroup[]) => void
}

export function SkillsSection({ skills, onChange }: SkillsSectionProps) {
  const [newSkillInputs, setNewSkillInputs] = useState<Record<number, string>>({})

  const addGroup = () => {
    const newGroup: SkillGroup = {
      id: crypto.randomUUID(),
      name: "",
      skills: [],
    }
    onChange([...skills, newGroup])
  }

  const updateGroup = (index: number, field: keyof SkillGroup, value: unknown) => {
    const updated = [...skills]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const removeGroup = (index: number) => {
    onChange(skills.filter((_, i) => i !== index))
  }

  const addSkill = (groupIndex: number, skill: string) => {
    if (!skill.trim()) return
    const updated = [...skills]
    updated[groupIndex] = {
      ...updated[groupIndex],
      skills: [...updated[groupIndex].skills, skill.trim()],
    }
    onChange(updated)
    setNewSkillInputs({ ...newSkillInputs, [groupIndex]: "" })
  }

  const removeSkill = (groupIndex: number, skillIndex: number) => {
    const updated = [...skills]
    updated[groupIndex] = {
      ...updated[groupIndex],
      skills: updated[groupIndex].skills.filter((_, i) => i !== skillIndex),
    }
    onChange(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">Compétences</h2>
          <p className="text-sm text-muted-foreground">
            Regroupez vos compétences par catégorie
          </p>
        </div>
        <Button onClick={addGroup} size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Ajouter un groupe
        </Button>
      </div>

      {skills.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground mb-4">
              Aucune compétence ajoutée
            </p>
            <Button onClick={addGroup} variant="outline" size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Ajouter un groupe de compétences
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {skills.map((group, index) => (
            <Card key={group.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    {group.name || `Groupe ${index + 1}`}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeGroup(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nom du groupe</Label>
                  <Input
                    placeholder="Langages, Frameworks, Outils..."
                    value={group.name}
                    onChange={(e) => updateGroup(index, "name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Compétences</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {group.skills.map((skill, skillIndex) => (
                      <Badge
                        key={skillIndex}
                        variant="secondary"
                        className="gap-1 pr-1"
                      >
                        {skill}
                        <button
                          onClick={() => removeSkill(index, skillIndex)}
                          className="ml-1 hover:bg-muted rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Nouvelle compétence..."
                      value={newSkillInputs[index] || ""}
                      onChange={(e) =>
                        setNewSkillInputs({ ...newSkillInputs, [index]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addSkill(index, newSkillInputs[index] || "")
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addSkill(index, newSkillInputs[index] || "")}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Appuyez sur Entrée ou cliquez + pour ajouter
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
