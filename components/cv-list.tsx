import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { StoredCV } from "@/lib/cv-utils"
import {
  FileText,
  Clock,
  Edit,
  Trash2,
  Share2,
  MoreVertical,
  Target
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DeleteCVDialog } from "@/components/delete-cv-dialog"
import { useState } from "react"
import { CreateCVButton } from "@/components/create-cv-button"

interface CVListProps {
  cvs: StoredCV[]
}

const templateLabels: Record<string, string> = {
  minimal: "Minimal",
  creative: "Créatif",
  corporate: "Corporate",
  premium: "Premium",
}

export function CVList({ cvs }: CVListProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedCV, setSelectedCV] = useState<StoredCV | null>(null)

  if (cvs.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <FileText className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Aucun CV créé</h3>
          <p className="text-muted-foreground text-center mb-6 max-w-sm">
            Créez votre premier CV professionnel en quelques minutes avec l&apos;aide de l&apos;IA.
          </p>
          <CreateCVButton />
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cvs.map((cv) => (
          <Card key={cv.id} className="group hover:border-primary/50 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg truncate">{cv.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {templateLabels[cv.template] || cv.template}
                    </Badge>
                    {cv.atsScore && (
                      <Badge variant="outline" className="text-xs gap-1">
                        <Target className="h-3 w-3" />
                        {cv.atsScore}%
                      </Badge>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/app/builder/${cv.id}`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Modifier
                      </Link>
                    </DropdownMenuItem>
                    {cv.shareId && (
                      <DropdownMenuItem asChild>
                        <Link href={`/cv/${cv.shareId}`} target="_blank">
                          <Share2 className="mr-2 h-4 w-4" />
                          Voir le lien public
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={() => {
                        setSelectedCV(cv)
                        setDeleteDialogOpen(true)
                      }}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  <span>
                    Modifié {formatDistanceToNow(new Date(cv.updatedAt), { 
                      addSuffix: true, 
                      locale: fr 
                    })}
                  </span>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link href={`/app/builder/${cv.id}`}>
                    <Edit className="mr-1.5 h-3.5 w-3.5" />
                    Éditer
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeleteCVDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        cv={selectedCV}
        onDeleted={() => {
          // Refresh the list by reloading the page
          window.location.reload()
        }}
      />
    </>
  )
}
