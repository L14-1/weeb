"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ArrowLeft, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

import { EditArticleDialog } from "@/components/articles/edit-article-dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { BlurFade } from "@/components/ui/blur-fade"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { TextAnimate } from "@/components/ui/text-animate"
import { useCurrentUser } from "@/hooks/use-auth"
import { articlesApi } from "@/lib/api/articles"

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function ArticleDetail({ id }: { id: number }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: currentUser } = useCurrentUser()

  const {
    data: article,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles", id],
    queryFn: () => articlesApi.getById(id),
  })

  const deleteMutation = useMutation({
    mutationFn: () => articlesApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] })
      queryClient.removeQueries({ queryKey: ["articles", id] })
      toast.success("Article supprimé")
      router.push("/articles")
    },
    onError: () => {
      toast.error("Impossible de supprimer l'article", {
        description: "Veuillez réessayer.",
      })
    },
  })

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

  if (isError || !article) {
    return (
      <div className="flex flex-col gap-4">
        <p className="text-muted-foreground">Cet article est introuvable.</p>
        <Button variant="outline" asChild className="w-fit">
          <Link href="/articles">
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>
        </Button>
      </div>
    )
  }

  const isAuthor = currentUser?.id === article.owner.id

  return (
    <article className="flex flex-col gap-6">
      <Button variant="ghost" asChild className="w-fit">
        <Link href="/articles">
          <ArrowLeft className="h-4 w-4" />
          Retour au blog
        </Link>
      </Button>

      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <TextAnimate
            as="h1"
            animation="slideUp"
            className="text-4xl font-bold"
            startOnView={false}
          >
            {article.title}
          </TextAnimate>
          {isAuthor && (
            <div className="flex gap-2">
              <EditArticleDialog article={article} />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline">
                    <Trash2 className="h-4 w-4" />
                    Supprimer
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Supprimer l’article ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Cette action est irréversible. L’article sera
                      définitivement supprimé.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={(e) => {
                        e.preventDefault()
                        deleteMutation.mutate()
                      }}
                      disabled={deleteMutation.isPending}
                    >
                      {deleteMutation.isPending ? "Suppression…" : "Supprimer"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>

        <BlurFade delay={0.2}>
          <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
            <span>
              {article.owner.first_name} {article.owner.last_name}
            </span>
            <Badge variant="secondary">{article.owner.role}</Badge>
            <span>·</span>
            <span>Publié le {formatDate(article.created_at)}</span>
            {article.updated_at !== article.created_at && (
              <>
                <span>·</span>
                <span>Modifié le {formatDate(article.updated_at)}</span>
              </>
            )}
          </div>
        </BlurFade>
      </div>

      <Separator />

      <BlurFade delay={0.4} blur="8px">
        <p className="leading-relaxed whitespace-pre-wrap">{article.content}</p>
      </BlurFade>
    </article>
  )
}
