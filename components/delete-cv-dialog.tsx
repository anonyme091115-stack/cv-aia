"use client"

import { useState } from "react"
import { deleteStoredCV } from "@/lib/cv-utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import type { StoredCV } from "@/lib/cv-utils"

interface DeleteCVDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cv: StoredCV | null
  onDeleted?: () => void
}

export function DeleteCVDialog({ open, onOpenChange, cv, onDeleted }: DeleteCVDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  function handleDelete() {
    if (!cv) return

    setIsDeleting(true)

    try {
      deleteStoredCV(cv.id)
      
      toast.success("CV supprimé")
      onOpenChange(false)
      onDeleted?.()
    } catch (error) {
      console.error("Error deleting CV:", error)
      toast.error("Erreur lors de la suppression")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Supprimer ce CV ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Le CV &quot;{cv?.title}&quot; sera définitivement supprimé.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Annuler</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Suppression...
              </>
            ) : (
              "Supprimer"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
