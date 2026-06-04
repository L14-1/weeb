"use client"

import { useQuery } from "@tanstack/react-query"
import Link from "next/link"

import { CreateArticleDialog } from "@/components/articles/create-article-dialog"
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useCurrentUser } from "@/hooks/use-auth"
import { articlesApi } from "@/lib/api/articles"

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

export function ArticlesList() {
  const {
    data: articles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: articlesApi.list,
  })
  const { data: currentUser } = useCurrentUser()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Le blog</h1>
        <CreateArticleDialog disabled={!currentUser} />
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[4.5rem] w-full" />
          ))}
        </div>
      ) : isError ? (
        <p className="text-muted-foreground">
          Impossible de charger les articles.
        </p>
      ) : articles && articles.length > 0 ? (
        <div className="flex flex-col gap-3">
          {articles.map((article) => (
            <Link key={article.id} href={`/articles/${article.id}`}>
              <Card
                size="sm"
                className="hover:bg-accent/50 transition-colors"
              >
                <CardHeader>
                  <CardTitle className="truncate">{article.title}</CardTitle>
                  <CardAction className="text-muted-foreground self-start text-xs whitespace-nowrap">
                    {article.owner.first_name} {article.owner.last_name} ·{" "}
                    {formatDate(article.created_at)}
                  </CardAction>
                  <CardDescription className="truncate">
                    {article.content}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">Aucun article pour le moment.</p>
      )}
    </div>
  )
}
