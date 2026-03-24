"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Certification } from "@/types/cv"
import { Plus, Trash2, GripVertical, ExternalLink } from "lucide-react"

interface CertificationsSectionProps {
  certifications: Certification[]
  onChange: (certifications: Certification[]) => void
}

export function CertificationsSection({ certifications, onChange }: CertificationsSectionProps) {
  const addCertification = () => {
    const newCert: Certification = {
      id: crypto.randomUUID(),
      name: "",
      issuer: "",
      date: "",
      url: null,
      credentialId: null,
    }
    onChange([...certifications, newCert])
  }

  const updateCertification = (index: number, field: keyof Certification, value: unknown) => {
    const updated = [...certifications]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const removeCertification = (index: number) => {
    onChange(certifications.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">Certifications</h2>
          <p className="text-sm text-muted-foreground">
            Vos certifications professionnelles
          </p>
        </div>
        <Button onClick={addCertification} size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Ajouter
        </Button>
      </div>

      {certifications.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground mb-4">
              Aucune certification ajoutée
            </p>
            <Button onClick={addCertification} variant="outline" size="sm">
              <Plus className="mr-1.5 h-4 w-4" />
              Ajouter une certification
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <Card key={cert.id}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                    <CardTitle className="text-base">
                      {cert.name || `Certification ${index + 1}`}
                    </CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeCertification(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Nom de la certification</Label>
                    <Input
                      placeholder="AWS Solutions Architect"
                      value={cert.name}
                      onChange={(e) => updateCertification(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Organisme</Label>
                    <Input
                      placeholder="Amazon Web Services"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(index, "issuer", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Date d&apos;obtention</Label>
                    <Input
                      type="month"
                      value={cert.date}
                      onChange={(e) => updateCertification(index, "date", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>ID de certification (optionnel)</Label>
                    <Input
                      placeholder="ABC123XYZ"
                      value={cert.credentialId || ""}
                      onChange={(e) => updateCertification(index, "credentialId", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>URL de vérification (optionnel)</Label>
                  <div className="relative">
                    <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="https://..."
                      value={cert.url || ""}
                      onChange={(e) => updateCertification(index, "url", e.target.value)}
                      className="pl-10"
                    />
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
