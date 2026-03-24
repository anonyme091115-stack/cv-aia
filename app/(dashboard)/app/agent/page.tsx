"use client"

import { useEffect, useState } from "react"
import { AgentChat } from "@/components/agent/agent-chat"
import { getStoredCVs } from "@/lib/cv-utils"
import type { StoredCV } from "@/lib/cv-utils"

export default function AgentPage() {
  const [currentCV, setCurrentCV] = useState<StoredCV | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const cvs = getStoredCVs()
    // Get the most recently updated CV
    const latest = cvs.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )[0]
    
    setCurrentCV(latest)
    setIsLoading(false)
  }, [])

  return (
    <div className="h-[calc(100vh-0px)] flex flex-col">
      {!isLoading && <AgentChat initialCV={currentCV} />}
    </div>
  )
}
