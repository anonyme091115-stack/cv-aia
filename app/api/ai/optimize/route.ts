import { generateText, Output } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const optimizationSchema = z.object({
  analysis: z.object({
    jobTitle: z.string(),
    company: z.string(),
    keyRequirements: z.array(z.string()),
    missingKeywords: z.array(z.string()),
    matchScore: z.number().min(0).max(100),
  }),
  modifications: z.array(z.object({
    section: z.string(),
    original: z.string(),
    improved: z.string(),
    reason: z.string(),
  })),
  recommendations: z.array(z.string()),
})

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { cv, jobOffer } = await req.json()

    if (!cv || !jobOffer) {
      return Response.json({ error: "CV and job offer required" }, { status: 400 })
    }

    const { output } = await generateText({
      model: "anthropic/claude-sonnet-4-20250514",
      output: Output.object({ schema: optimizationSchema }),
      messages: [
        {
          role: "system",
          content: `Tu es un expert en recrutement et en optimisation de CV. Ton rôle est d'analyser une offre d'emploi et d'adapter un CV pour maximiser les chances du candidat.

Processus d'analyse:
1. IDENTIFIE les compétences clés, soft skills et mots-clés de l'offre
2. COMPARE avec le CV actuel pour trouver les gaps
3. PROPOSE des modifications concrètes pour chaque section pertinente
4. QUANTIFIE le score de matching avant/après

Règles:
- Ne modifie pas les faits (entreprises, dates, diplômes)
- Reformule et enrichis le contenu existant
- Intègre naturellement les mots-clés manquants
- Priorise les modifications par impact
- Adapte le vocabulaire au secteur ciblé`
        },
        {
          role: "user",
          content: `Analyse cette offre d'emploi et optimise le CV pour matcher:\n\n--- OFFRE D'EMPLOI ---\n${jobOffer}\n\n--- CV ACTUEL ---\n${JSON.stringify(cv, null, 2)}`
        }
      ],
    })

    return Response.json(output)
  } catch (error) {
    console.error("AI Optimize Error:", error)
    return Response.json(
      { error: "Failed to optimize CV" },
      { status: 500 }
    )
  }
}
