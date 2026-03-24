import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Sparkles, 
  Zap, 
  FileText, 
  Target, 
  Bot, 
  Download,
  ArrowRight,
  CheckCircle2,
  Star
} from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Génération IA instantanée",
    description: "Décrivez votre parcours, l'IA génère votre CV complet en quelques secondes."
  },
  {
    icon: Target,
    title: "Optimisation ATS",
    description: "Score ATS en temps réel et suggestions d'amélioration pour passer les filtres automatiques."
  },
  {
    icon: Bot,
    title: "Agent IA personnel",
    description: "Un assistant expert RH qui adapte votre CV à chaque offre d'emploi."
  },
  {
    icon: FileText,
    title: "Templates professionnels",
    description: "4 designs modernes et ATS-friendly adaptés au marché français."
  },
  {
    icon: Download,
    title: "Export PDF & Word",
    description: "Téléchargez votre CV en haute qualité, prêt à envoyer aux recruteurs."
  },
  {
    icon: Star,
    title: "100% Gratuit",
    description: "Toutes les fonctionnalités sont accessibles gratuitement, sans limite."
  }
]

const benefits = [
  "Génération complète du CV en langage naturel",
  "Amélioration automatique des bullet points",
  "Adaptation intelligente aux offres d'emploi",
  "Score ATS avec recommandations",
  "Génération de lettres de motivation",
  "Import et modernisation de vieux CV"
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-7 w-7 text-primary" />
              <span className="text-xl font-bold font-[var(--font-display)]">CV.AI</span>
            </Link>
            <div className="flex items-center gap-4">
              <Button asChild>
                <Link href="/app/builder/new">
                  Créer mon CV
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            Propulsé par l&apos;IA Claude
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-[var(--font-display)] leading-tight text-balance">
            Créez un CV qui{" "}
            <span className="text-primary">décroche des entretiens</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            L&apos;IA génère, optimise et adapte votre CV en temps réel. 
            100% gratuit, conçu pour les étudiants et jeunes actifs français.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-lg px-8 h-12" asChild>
              <Link href="/app/builder/new">
                Créer mon CV gratuitement
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 h-12" asChild>
              <Link href="#features">
                Découvrir les fonctionnalités
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-display)]">
              Tout ce qu&apos;il faut pour décrocher le job
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Des outils puissants propulsés par l&apos;IA pour créer un CV professionnel en quelques minutes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-display)] mb-6">
                L&apos;IA qui comprend votre carrière
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Notre agent IA analyse votre parcours, comprend vos objectifs, 
                et génère un CV parfaitement adapté à chaque opportunité.
              </p>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="mt-8" asChild>
                <Link href="/app/builder/new">
                  Essayer maintenant
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent border border-border/50 flex items-center justify-center">
                <div className="text-center p-8">
                  <Bot className="h-24 w-24 text-primary mx-auto mb-6" />
                  <p className="text-xl font-semibold mb-2">CareerAgent</p>
                  <p className="text-muted-foreground">
                    Votre expert RH personnel disponible 24/7
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary/5">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold font-[var(--font-display)] mb-6">
            Prêt à booster votre carrière ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Rejoignez des milliers d&apos;étudiants et jeunes actifs qui ont créé leur CV avec CV.AI.
          </p>
          <Button size="lg" className="text-lg px-8 h-12" asChild>
            <Link href="/app/builder/new">
              Créer mon CV gratuitement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/40">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-semibold">CV.AI</span>
          </div>
          <p className="text-sm text-muted-foreground">
            2024 CV.AI. Créé avec passion pour les jeunes talents français.
          </p>
        </div>
      </footer>
    </div>
  )
}
