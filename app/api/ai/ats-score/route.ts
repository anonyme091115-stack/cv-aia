import { generateText, Output } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const atsScoreSchema = z.object({
  score: z.number().min(0).max(100),
  breakdown: z.object({
    format: z.number().min(0).max(100),
    keywords: z.number().min(0).max(100),
    experience: z.number().min(0).max(100),
    education: z.number().min(0).max(100),
    skills: z.number().min(0).max(100),
  }),
  issues: z.array(z.object({
    severity: z.enum(["high", "medium", "low"]),
    category: z.string(),
    description: z.string(),
    suggestion: z.string(),
  })),
  strengths: z.array(z.string()),
})

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { cv, targetJob } = await req.json()

    if (!cv) {
      return Response.json({ error: "CV required" }, { status: 400 })
    }

    const { output } = await generateText({
      model: "anthropic/claude-sonnet-4-20250514",
      output: Output.object({ schema: atsScoreSchema }),
      messages: [
        {
          role: "system",
          content: `Tu es un expert en systèmes ATS (Applicant Tracking System). Analyse ce CV et fournis un score ATS détaillé.

Critères d'évaluation:
1. FORMAT (20%): Structure claire, sections standard, pas de graphiques/tableaux complexes
2. MOTS-CLÉS (25%): Présence de termes techniques et compétences recherchées
3. EXPÉRIENCE (25%): Descriptions quantifiées, verbes d'action, pertinence
4. FORMATION (15%): Diplômes clairement mentionnés, dates, institutions
5. COMPÉTENCES (15%): Liste structurée, catégorisée, termes standardisés

Règles d'analyse:
- Un bon CV ATS doit scorer > 75
- Identifie les problèmes par ordre de priorité
- Propose des corrections actionables
- Sois précis et constructif dans les suggestions`
        },
        {
          role: "user",
          content: `Analyse ce CV et calcule son score ATS:\n\n${JSON.stringify(cv, null, 2)}${targetJob ? `\n\nPoste ciblé: ${targetJob}` : ""}`
        }
      ],
    })

    return Response.json(output)
  } catch (error) {
    console.error("AI ATS Score Error:", error)
    return Response.json(
      { error: "Failed to calculate ATS score" },
      { status: 500 }
    )
  }
}
