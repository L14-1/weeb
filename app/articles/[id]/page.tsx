import { ArticleDetail } from "@/components/articles/article-detail"

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <main className="mx-auto flex w-5xl max-w-full flex-col gap-12 pb-30">
      <ArticleDetail id={Number(id)} />
    </main>
  )
}
