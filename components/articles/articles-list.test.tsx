import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import type { ReactNode } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { ArticlesList } from "./articles-list"
import { articlesApi, type IArticle } from "@/lib/api/articles"

vi.mock("@/lib/api/articles", () => ({ articlesApi: { list: vi.fn() } }))
vi.mock("@/hooks/use-auth", () => ({
  useCurrentUser: () => ({ data: undefined }),
}))
vi.mock("@/components/articles/create-article-dialog", () => ({
  CreateArticleDialog: () => null,
}))
vi.mock("@/components/ui/blur-fade", () => ({
  BlurFade: ({ children }: { children: ReactNode }) => children,
}))
vi.mock("@/components/ui/text-animate", () => ({
  TextAnimate: ({ children }: { children: ReactNode }) => children,
}))

const listMock = vi.mocked(articlesApi.list)

function article(n: number): IArticle {
  return {
    uuid: `uuid-${n}`,
    title: `Article ${n}`,
    content: `Contenu ${n}`,
    owner: {
      id: 1,
      first_name: "Jane",
      last_name: "Doe",
      email: "jane@example.com",
      role: "user",
      is_active: true,
    },
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
    deleted_at: null,
  }
}

function renderList() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  render(
    <QueryClientProvider client={client}>
      <ArticlesList />
    </QueryClientProvider>
  )
}

afterEach(() => {
  cleanup()
  listMock.mockReset()
})

describe("ArticlesList", () => {
  it("renders the paginated results and links them by uuid", async () => {
    listMock.mockResolvedValueOnce({
      count: 1,
      next: null,
      previous: null,
      results: [article(1)],
    })

    renderList()

    const link = await screen.findByRole("link", { name: /Article 1/ })
    expect(link.getAttribute("href")).toBe("/articles/uuid-1")
    expect(screen.queryByRole("button", { name: /Voir plus/ })).toBeNull()
  })

  it("loads the next page on demand", async () => {
    listMock
      .mockResolvedValueOnce({
        count: 2,
        next: "http://api/articles/?page=2",
        previous: null,
        results: [article(1)],
      })
      .mockResolvedValueOnce({
        count: 2,
        next: null,
        previous: "http://api/articles/?page=1",
        results: [article(2)],
      })

    renderList()

    fireEvent.click(await screen.findByRole("button", { name: /Voir plus/ }))

    expect(await screen.findByText("Article 2")).toBeTruthy()
    expect(screen.getByText("Article 1")).toBeTruthy()
    expect(listMock).toHaveBeenLastCalledWith(2)
    expect(screen.queryByRole("button", { name: /Voir plus/ })).toBeNull()
  })

  it("shows the empty state", async () => {
    listMock.mockResolvedValueOnce({
      count: 0,
      next: null,
      previous: null,
      results: [],
    })

    renderList()

    expect(
      await screen.findByText("Aucun article pour le moment.")
    ).toBeTruthy()
  })
})
