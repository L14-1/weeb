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
  uuid: string
  title: string
  content: string
  owner: IArticleOwner
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface IArticleInput {
  title: string
  content: string
}

export const articlesApi = {
  list: () => request<IArticle[]>("articles/"),

  getById: (uuid: string) => request<IArticle>(`articles/${uuid}/`),

  create: (data: IArticleInput) =>
    request<IArticle>("articles/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (uuid: string, data: Partial<IArticleInput>) =>
    request<IArticle>(`articles/${uuid}/`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  remove: (uuid: string) =>
    request<null>(`articles/${uuid}/`, {
      method: "DELETE",
    }),
}
