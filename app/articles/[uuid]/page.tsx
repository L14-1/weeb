import { ArticleDetail } from "@/components/articles/article-detail"

export default async function Page({
  params,
}: {
  params: Promise<{ uuid: string }>
}) {
  const { uuid } = await params

  return (
    <main className="mx-auto flex w-5xl max-w-full flex-col gap-12 pb-30">
      <ArticleDetail uuid={uuid} />
    </main>
  )
}
