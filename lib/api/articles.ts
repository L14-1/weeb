import { request } from "./client"

export interface IArticleOwner {
  id: number
  first_name: string
  last_name: string
  email: string
  role: string
  is_active: boolean
}

export interface IArticle {
  id: number
  title: string
  content: string
  owner: IArticleOwner
  created_at: string
  updated_at: string
}

export interface IArticleInput {
  title: string
  content: string
}

export const articlesApi = {
  list: () => request<IArticle[]>("articles/"),

  getById: (id: number) => request<IArticle>(`articles/${id}/`),

  create: (data: IArticleInput) =>
    request<IArticle>("articles/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: Partial<IArticleInput>) =>
    request<IArticle>(`articles/${id}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  remove: (id: number) =>
    request<null>(`articles/${id}/`, {
      method: "DELETE",
    }),
}
