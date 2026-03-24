"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Plus, Loader2 } from "lucide-react"
import { createNewCV, saveStoredCV } from "@/lib/cv-utils"

interface CreateCVButtonProps {
  onCVCreated?: () => void
}

export function CreateCVButton({ onCVCreated }: CreateCVButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  function handleCreate() {
    setIsLoading(true)

    try {
      const newCV = createNewCV()
      saveStoredCV(newCV)

      toast.success("CV créé !")
      router.push(`/app/builder/${newCV.id}`)
      
      onCVCreated?.()
    } catch (error) {
      console.error("Error creating CV:", error)
      toast.error("Erreur lors de la création du CV")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button onClick={handleCreate} disabled={isLoading}>
      {isLoading ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Plus className="mr-2 h-4 w-4" />
      )}
      Créer un CV
    </Button>
  )
}
