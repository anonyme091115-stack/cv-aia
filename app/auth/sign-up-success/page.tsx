import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Sparkles, ArrowLeft } from "lucide-react"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold text-primary">
            <Sparkles className="h-8 w-8" />
            <span className="font-[var(--font-display)]">CV.AI</span>
          </Link>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Vérifiez votre email</CardTitle>
            <CardDescription className="text-base">
              Nous vous avons envoyé un lien de confirmation. Cliquez sur le lien dans l&apos;email pour activer votre compte.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground text-center">
              L&apos;email peut prendre quelques minutes à arriver. Pensez à vérifier votre dossier spam.
            </div>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/auth/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour à la connexion
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
