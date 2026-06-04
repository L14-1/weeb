import { ArticlesList } from "@/components/articles/articles-list"

export default function Page() {
  return (
    <main className="mx-auto flex w-5xl max-w-full flex-col gap-12 pb-30">
      <ArticlesList />
    </main>
  )
}
