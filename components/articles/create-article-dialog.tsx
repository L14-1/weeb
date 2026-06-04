"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Plus } from "lucide-react"
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
import { articlesApi } from "@/lib/api/articles"

export function CreateArticleDialog({ disabled }: { disabled?: boolean }) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const mutation = useMutation({
    mutationFn: articlesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] })
      setOpen(false)
      setTitle("")
      setContent("")
      toast.success("Article créé")
    },
    onError: () => {
      toast.error("Impossible de créer l'article", {
        description: "Veuillez réessayer.",
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ title: title.trim(), content: content.trim() })
  }

  const canSubmit = title.trim().length > 0 && content.trim().length > 0

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled}>
          <Plus className="h-4 w-4" />
          Nouvel article
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nouvel article</DialogTitle>
          <DialogDescription>
            Rédigez votre article ci dessous puis publiez-le.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="article_title">Titre</FieldLabel>
              <Input
                id="article_title"
                value={title}
                placeholder="Titre de l'article"
                onChange={(e) => setTitle(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="article_content">Contenu</FieldLabel>
              <Textarea
                id="article_content"
                value={content}
                placeholder="Contenu de l'article…"
                rows={8}
                className="resize-none"
                onChange={(e) => setContent(e.target.value)}
              />
            </Field>
            <Field>
              <Button type="submit" disabled={!canSubmit || mutation.isPending}>
                {mutation.isPending ? "Publication…" : "Publier"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
