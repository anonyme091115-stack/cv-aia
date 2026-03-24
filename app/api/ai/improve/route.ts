import { generateText, Output } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const suggestionsSchema = z.object({
  suggestions: z.array(z.object({
    text: z.string(),
    explanation: z.string(),
  })).length(3),
})

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { text, context } = await req.json()

    if (!text) {
      return Response.json({ error: "Text required" }, { status: 400 })
    }

    const { output } = await generateText({
      model: "anthropic/claude-sonnet-4-20250514",
      output: Output.object({ schema: suggestionsSchema }),
      messages: [
        {
          role: "system",
          content: `Tu es un expert RH senior spécialisé dans l'optimisation de CV. Tu dois proposer 3 reformulations percutantes d'un texte de CV.

Règles pour les reformulations:
- QUANTIFIE les résultats quand c'est possible (%, chiffres, montants, délais)
- Utilise des VERBES D'ACTION forts (Piloté, Déployé, Optimisé, Coordonné, Développé)
- Mets en avant l'IMPACT et les RÉSULTATS
- Reste CONCIS (max 2 lignes par bullet point)
- Adapte au marché français

Exemples de transformations:
- "Géré des projets" → "Piloté 4 projets clients représentant un budget de 120k€, livrés dans les délais à 100%"
- "Amélioré les ventes" → "Augmenté le chiffre d'affaires de 25% en 6 mois via l'optimisation du tunnel de conversion"
- "Travaillé en équipe" → "Coordonné une équipe de 5 développeurs dans un environnement agile Scrum"`
        },
        {
          role: "user",
          content: `Propose 3 reformulations améliorées pour ce texte de CV:\n\n"${text}"${context ? `\n\nContexte: ${context}` : ""}`
        }
      ],
    })

    return Response.json({ suggestions: output.suggestions })
  } catch (error) {
    console.error("AI Improve Error:", error)
    return Response.json(
      { error: "Failed to improve text" },
      { status: 500 }
    )
  }
}
