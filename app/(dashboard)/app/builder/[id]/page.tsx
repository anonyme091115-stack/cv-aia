"use client"

import { notFound } from "next/navigation"
import { useEffect, useState } from "react"
import { CVEditor } from "@/components/builder/cv-editor"
import { getStoredCV } from "@/lib/cv-utils"
import type { StoredCV } from "@/lib/cv-utils"

interface BuilderPageProps {
  params: Promise<{ id: string }>
}

export default function BuilderPage({ params }: BuilderPageProps) {
  const [cv, setCV] = useState<StoredCV | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const { id } = await params
      const storedCV = getStoredCV(id)
      
      if (!storedCV) {
        notFound()
      }
      
      setCV(storedCV)
      setLoading(false)
    })()
  }, [params])

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Chargement...</div>
  }

  if (!cv) {
    notFound()
  }

  return <CVEditor initialCV={cv} />
}
