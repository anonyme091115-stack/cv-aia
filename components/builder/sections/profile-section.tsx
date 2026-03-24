"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Profile } from "@/types/cv"
import { User, Mail, Phone, MapPin, Linkedin } from "lucide-react"

interface ProfileSectionProps {
  profile: Profile
  onChange: (profile: Profile) => void
}

export function ProfileSection({ profile, onChange }: ProfileSectionProps) {
  const updateField = (field: keyof Profile, value: string) => {
    onChange({ ...profile, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Profil</h2>
        <p className="text-sm text-muted-foreground">
          Vos informations personnelles et de contact
        </p>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nom complet</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              placeholder="Jean Dupont"
              value={profile.name}
              onChange={(e) => updateField("name", e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Titre professionnel</Label>
          <Input
            id="title"
            placeholder="Développeur Full Stack"
            value={profile.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="jean@exemple.com"
                value={profile.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="06 12 34 56 78"
                value={profile.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location">Localisation</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="location"
                placeholder="Paris, France"
                value={profile.location}
                onChange={(e) => updateField("location", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <div className="relative">
              <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="linkedin"
                placeholder="linkedin.com/in/jeandupont"
                value={profile.linkedin}
                onChange={(e) => updateField("linkedin", e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Résumé professionnel</Label>
          <Textarea
            id="summary"
            placeholder="Décrivez votre parcours et vos objectifs professionnels en quelques phrases..."
            value={profile.summary}
            onChange={(e) => updateField("summary", e.target.value)}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">
            Un bon résumé fait 2-3 phrases et met en avant vos compétences clés.
          </p>
        </div>
      </div>
    </div>
  )
}
