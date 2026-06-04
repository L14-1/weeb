import { request } from "./client"

export interface IContactPayload {
  first_name: string
  last_name: string
  email: string
  message: string
}

export const contactApi = {
  send: (data: IContactPayload) =>
    request<{ detail: string }>("contact/", {
      method: "POST",
      body: JSON.stringify(data),
    }),
}
