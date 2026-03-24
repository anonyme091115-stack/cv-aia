import { streamText, tool, convertToModelMessages } from "ai"
import { z } from "zod"
import { createClient } from "@/lib/supabase/server"

const updateCVTool = tool({
  description: "Met à jour une section spécifique du CV de l'utilisateur",
  inputSchema: z.object({
    section: z.enum(["profile", "experiences", "education", "skills", "languages", "projects", "certifications"]),
    action: z.enum(["update", "add", "remove"]),
    data: z.any().describe("Les données à modifier selon la section"),
  }),
  execute: async ({ section, action, data }) => {
    return { success: true, section, action, data }
  },
})

const suggestImprovementsTool = tool({
  description: "Suggère des améliorations pour une partie du CV",
  inputSchema: z.object({
    target: z.string().describe("La partie du CV à améliorer"),
    currentContent: z.string().describe("Le contenu actuel"),
  }),
  execute: async ({ target, currentContent }) => {
    return { 
      target, 
      suggestions: [
        "Quantifier les résultats avec des chiffres précis",
        "Utiliser des verbes d'action plus percutants",
        "Ajouter des mots-clés du secteur"
      ]
    }
  },
})

const analyzeJobOfferTool = tool({
  description: "Analyse une offre d'emploi pour identifier les compétences clés",
  inputSchema: z.object({
    jobOffer: z.string().describe("Le texte de l'offre d'emploi"),
  }),
  execute: async ({ jobOffer }) => {
    return {
      analyzed: true,
      keySkills: ["Compétences extraites de l'offre"],
      requirements: ["Exigences identifiées"],
    }
  },
})

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { messages, cv } = await req.json()

    const result = streamText({
      model: "anthropic/claude-sonnet-4-20250514",
      system: `Tu es CareerAgent, un expert RH senior avec 15 ans d'expérience dans le recrutement en France. Tu as accès au CV complet de l'utilisateur et tu peux le modifier, l'améliorer et l'adapter de manière proactive.

CV ACTUEL DE L'UTILISATEUR:
${JSON.stringify(cv, null, 2)}

TON RÔLE:
- Tu AGIS, tu ne te contentes pas de conseiller
- Tu poses des questions ciblées pour comprendre les objectifs de carrière
- Tu proposes des modifications concrètes et les appliques quand l'utilisateur est d'accord
- Tu adaptes le CV à différentes offres d'emploi
- Tu optimises pour les systèmes ATS
- Tu reformules les bullet points pour plus d'impact

STYLE DE COMMUNICATION:
- Tutoie l'utilisateur (on est entre professionnels)
- Sois direct et concret
- Donne des exemples précis
- Quantifie quand c'est possible

À chaque interaction, demande-toi: "Comment puis-je améliorer activement ce CV?"`,
      messages: await convertToModelMessages(messages),
      tools: {
        updateCV: updateCVTool,
        suggestImprovements: suggestImprovementsTool,
        analyzeJobOffer: analyzeJobOfferTool,
      },
      maxSteps: 5,
    })

    return result.toUIMessageStreamResponse()
  } catch (error) {
    console.error("AI Agent Error:", error)
    return Response.json(
      { error: "Agent error" },
      { status: 500 }
    )
  }
}
