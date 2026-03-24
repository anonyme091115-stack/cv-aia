"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Project } from "@/types/cv"
import { Plus, Trash2, GripVertical, X, ExternalLink } from "lucide-react"
import { useState } from "react"

interface ProjectsSectionProps {
  projects: Project[]
  onChange: (projects: Project[]) => void
}

export function ProjectsSection({ projects, onChange }: ProjectsSectionProps) {
  const [newTechInputs, setNewTechInputs] = useState<Record<number, string>>({})

  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      technologies: [],
      url: null,
      startDate: "",
      endDate: null,
    }
    onChange([...projects, newProject])
  }

  const updateProject = (index: number, field: keyof Project, value: unknown) => {
    const updated = [...projects]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const removeProject = (index: number) => {
    onChange(projects.filter((_, i) => i !== index))
  }

  const addTech = (projectIndex: number, tech: string) => {
    if (!tech.trim()) return
    const updated = [...projects]
    updated[projectIndex] = {
      ...updated[projectIndex],
      technologies: [...updated[projectIndex].technologies, tech.trim()],
    }
    onChange(updated)
    setNewTechInputs({ ...newTechInputs, [projectIndex]: "" })
  }

  const removeTech = (projectIndex: number, techIndex: number) => {
    const updated = [...projects]
    updated[projectIndex] = {
      ...updated[projectIndex],
      technologies: updated[projectIndex].technologies.filter((_, i) => i !== techIndex),
    }
    onChange(updated)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">Projets</h2>
          <p className="text-sm text-muted-foreground">
            Vos projets personnels et professionnels
          </p>
        </div>
        <Button onClick={addProject} size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground mb-4">
              Aucun projet ajouté
            </p>
            <Button onClick={addProject} variant="outline" size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Ajouter un projet
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <Card key={project.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <CardTitle className="text-base">
                      {project.name || `Projet ${index + 1}`}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeProject(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Nom du projet</Label>
                  <Input
                    placeholder="Mon super projet"
                    value={project.name}
                    onChange={(e) => updateProject(index, "name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    placeholder="Décrivez votre projet..."
                    value={project.description}
                    onChange={(e) => updateProject(index, "description", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label>URL (optionnel)</Label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="https://..."
                      value={project.url || ""}
                      onChange={(e) => updateProject(index, "url", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date de début</Label>
                    <Input
                      type="month"
                      value={project.startDate}
                      onChange={(e) => updateProject(index, "startDate", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Date de fin (optionnel)</Label>
                    <Input
                      type="month"
                      value={project.endDate || ""}
                      onChange={(e) => updateProject(index, "endDate", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Technologies utilisées</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="gap-1 pr-1"
                      >
                        {tech}
                        <button
                          onClick={() => removeTech(index, techIndex)}
                          className="ml-1 hover:bg-muted rounded-full p-0.5"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="React, Node.js..."
                      value={newTechInputs[index] || ""}
                      onChange={(e) =>
                        setNewTechInputs({ ...newTechInputs, [index]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addTech(index, newTechInputs[index] || "")
                        }
                      }}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addTech(index, newTechInputs[index] || "")}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
