"use client"

import { useEffect, useState } from "react"
import { CVList } from "@/components/cv-list"
import { CreateCVButton } from "@/components/create-cv-button"
import { getStoredCVs } from "@/lib/cv-utils"
import type { StoredCV } from "@/lib/cv-utils"

export default function DashboardPage() {
  const [cvs, setCVs] = useState<StoredCV[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load CVs from localStorage
    const stored = getStoredCVs()
    setCVs(stored)
    setIsLoading(false)
  }, [])

  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold font-[var(--font-display)]">
              Mes CVs
            </h1>
            <p className="text-muted-foreground mt-1">
              Créez et gérez vos CVs professionnels
            </p>
          </div>
          <CreateCVButton onCVCreated={() => {
            const stored = getStoredCVs()
            setCVs(stored)
          }} />
        </div>

        {/* CV List */}
        {!isLoading && <CVList cvs={cvs} />}
      </div>
    </div>
  )
}
