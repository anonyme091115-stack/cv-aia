import { generateText } from "ai"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { cv, jobOffer, tone } = await req.json()

    if (!cv || !jobOffer) {
      return Response.json({ error: "CV and job offer required" }, { status: 400 })
    }

    const toneInstructions = {
      formal: "Utilise un ton formel et professionnel, vouvoiement systématique.",
      friendly: "Utilise un ton professionnel mais chaleureux, reste formel mais accessible.",
      dynamic: "Utilise un ton dynamique et enthousiaste, montre ta motivation avec énergie.",
    }

    const { text } = await generateText({
      model: "anthropic/claude-sonnet-4-20250514",
      messages: [
        {
          role: "system",
          content: `Tu es un expert en rédaction de lettres de motivation pour le marché français. Tu dois rédiger une lettre percutante et personnalisée.

Structure de la lettre (3 paragraphes):
1. ACCROCHE: Commence par une phrase d'accroche originale qui montre que tu connais l'entreprise et le poste. Mentionne comment tu as découvert l'offre.

2. ARGUMENTAIRE: Mets en avant 2-3 expériences/compétences clés du CV qui correspondent parfaitement au poste. Quantifie tes réalisations. Montre ta valeur ajoutée pour l'entreprise.

3. CONCLUSION: Exprime ta motivation pour un entretien, propose ta disponibilité, termine par une formule de politesse appropriée.

${toneInstructions[tone as keyof typeof toneInstructions] || toneInstructions.formal}

Règles:
- Maximum 300 mots
- Pas de phrases génériques type "Je suis motivé"
- Personnalise vraiment selon l'entreprise et le poste
- Mentionne des éléments concrets du CV
- Termine par "Je vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées."`
        },
        {
          role: "user",
          content: `Rédige une lettre de motivation basée sur ces éléments:\n\n--- CV ---\n${JSON.stringify(cv, null, 2)}\n\n--- OFFRE D'EMPLOI ---\n${jobOffer}`
        }
      ],
    })

    return Response.json({ coverLetter: text })
  } catch (error) {
    console.error("AI Cover Letter Error:", error)
    return Response.json(
      { error: "Failed to generate cover letter" },
      { status: 500 }
    )
  }
}
