"use client"

import type { CVData } from "@/types/cv"
import { MinimalTemplate } from "@/components/templates/minimal-template"
import { CreativeTemplate } from "@/components/templates/creative-template"
import { CorporateTemplate } from "@/components/templates/corporate-template"
import { PremiumTemplate } from "@/components/templates/premium-template"

interface CVPreviewProps {
  cv: CVData
}

export function CVPreview({ cv }: CVPreviewProps) {
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
    <div className="flex justify-center">
      <div 
        className="bg-white shadow-xl rounded-sm overflow-hidden"
        style={{ 
          width: "210mm", 
          minHeight: "297mm",
          transform: "scale(0.6)",
          transformOrigin: "top center"
        }}
      >
        {renderTemplate()}
      </div>
    </div>
  )
}
