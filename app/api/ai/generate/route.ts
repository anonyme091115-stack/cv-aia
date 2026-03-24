import { generateText, Output } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const cvSectionsSchema = z.object({
  profile: z.object({
    name: z.string(),
    title: z.string(),
    email: z.string(),
    phone: z.string(),
    location: z.string(),
    linkedin: z.string(),
    summary: z.string(),
  }),
  experiences: z.array(z.object({
    id: z.string(),
    company: z.string(),
    position: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string().nullable(),
    current: z.boolean(),
    description: z.string(),
    highlights: z.array(z.string()),
  })),
  education: z.array(z.object({
    id: z.string(),
    institution: z.string(),
    degree: z.string(),
    field: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string().nullable(),
    description: z.string(),
    gpa: z.string().nullable(),
  })),
  skills: z.array(z.object({
    id: z.string(),
    name: z.string(),
    skills: z.array(z.string()),
  })),
  languages: z.array(z.object({
    id: z.string(),
    name: z.string(),
    level: z.enum(["native", "fluent", "advanced", "intermediate", "basic"]),
  })),
  projects: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    technologies: z.array(z.string()),
    url: z.string().nullable(),
    startDate: z.string(),
    endDate: z.string().nullable(),
  })),
  certifications: z.array(z.object({
    id: z.string(),
    name: z.string(),
    issuer: z.string(),
    date: z.string(),
    url: z.string().nullable(),
    credentialId: z.string().nullable(),
  })),
})

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { description } = await req.json()

    if (!description) {
      return Response.json({ error: "Description required" }, { status: 400 })
    }

    const { output } = await generateText({
      model: "anthropic/claude-sonnet-4-20250514",
      output: Output.object({ schema: cvSectionsSchema }),
      messages: [
        {
          role: "system",
          content: `Tu es un expert en rédaction de CV professionnel français. À partir de la description fournie par l'utilisateur, génère un CV complet et professionnel en JSON.

Règles importantes:
- Génère des IDs uniques (format: exp_1, edu_1, skill_1, etc.)
- Utilise des dates au format YYYY-MM (ex: 2023-01)
- Pour les bullet points (highlights), quantifie les réalisations quand possible
- Le résumé professionnel doit faire 2-3 phrases percutantes
- Classe les compétences par catégories logiques (Langages, Frameworks, Outils, etc.)
- Pour les langues, utilise les niveaux: native, fluent, advanced, intermediate, basic
- Sois concis mais impactant

Le CV doit être adapté au marché français et mettre en valeur le parcours de la personne.`
        },
        {
          role: "user",
          content: `Génère un CV complet à partir de cette description:\n\n${description}`
        }
      ],
    })

    return Response.json({ sections: output })
  } catch (error) {
    console.error("AI Generate Error:", error)
    return Response.json(
      { error: "Failed to generate CV" },
      { status: 500 }
    )
  }
}
