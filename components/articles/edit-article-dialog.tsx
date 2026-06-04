"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { articlesApi, IArticle } from "@/lib/api/articles"

export function EditArticleDialog({
  article,
  disabled,
}: {
  article: IArticle
  disabled?: boolean
}) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState(article.title)
  const [content, setContent] = useState(article.content)

  const mutation = useMutation({
    mutationFn: (data: { title: string; content: string }) =>
      articlesApi.update(article.id, data),
    onSuccess: (updated) => {
      queryClient.setQueryData(["articles", article.id], updated)
      queryClient.invalidateQueries({ queryKey: ["articles"] })
      setOpen(false)
      toast.success("Article modifié")
    },
    onError: () => {
      toast.error("Impossible de modifier l'article", {
        description: "Veuillez réessayer.",
      })
    },
  })

  const handleOpenChange = (next: boolean) => {
    // Reset fields to the current article values when (re)opening.
    if (next) {
      setTitle(article.title)
      setContent(article.content)
    }
    setOpen(next)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ title: title.trim(), content: content.trim() })
  }

  const canSubmit = title.trim().length > 0 && content.trim().length > 0

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          <Pencil className="h-4 w-4" />
          Modifier
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier l’article</DialogTitle>
          <DialogDescription>
            Mettez à jour le titre et le contenu de votre article.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="edit_article_title">Titre</FieldLabel>
              <Input
                id="edit_article_title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="edit_article_content">Contenu</FieldLabel>
              <Textarea
                id="edit_article_content"
                value={content}
                rows={8}
                className="resize-none"
                onChange={(e) => setContent(e.target.value)}
              />
            </Field>
            <Field>
              <Button type="submit" disabled={!canSubmit || mutation.isPending}>
                {mutation.isPending ? "Enregistrement…" : "Enregistrer"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
