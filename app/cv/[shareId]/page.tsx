"use client"

import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import type { StoredCV } from "@/lib/cv-utils"
import { getStoredCVs } from "@/lib/cv-utils"
import { MinimalTemplate } from "@/components/templates/minimal-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
import { CorporateTemplate } from "@/components/templates/corporate-template"
import { PremiumTemplate } from "@/components/templates/premium-template"
import Link from "next/link"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PublicCVPageProps {
  params: Promise<{ shareId: string }>
}

export default function PublicCVPage({ params }: PublicCVPageProps) {
  const [cv, setCV] = useState<StoredCV | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const { shareId } = await params
      const allCVs = getStoredCVs()
      const foundCV = allCVs.find(c => c.shareId === shareId)
      
      if (!foundCV) {
        notFound()
      }
      
      setCV(foundCV)
      setLoading(false)
    })()
  }, [params])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Chargement...
      </div>
    )
  }

  if (!cv) {
    notFound()
  }

  const renderTemplate = () => {
    switch (cv.template) {
      case "minimal":
        return <MinimalTemplate sections={cv.sections} />
      case "creative":
        return <CreativeTemplate sections={cv.sections} />
      case "corporate":
        return <CorporateTemplate sections={cv.sections} />
      case "premium":
        return <PremiumTemplate sections={cv.sections} />
      default:
        return <MinimalTemplate sections={cv.sections} />
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-background border-b border-border py-3 px-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-bold">CV.AI</span>
          </Link>
          <Button size="sm" asChild>
            <Link href="/app/builder/new">
              Créer mon CV gratuitement
            </Link>
          </Button>
        </div>
      </header>

      {/* CV Content */}
      <main className="py-8 px-4">
        <div className="max-w-[210mm] mx-auto">
          <div className="bg-white shadow-xl rounded-sm overflow-hidden">
            {renderTemplate()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>
          CV créé avec{" "}
          <Link href="/" className="text-primary hover:underline">
            CV.AI
          </Link>
          {" "}— Créateur de CV intelligent propulsé par l&apos;IA
        </p>
      </footer>
    </div>
  )
}
