import { request } from "./client"

export interface IAuthTokens {
  access: string
  refresh: string
}
export interface IUser {
  id: number
  first_name: string
  last_name: string
  email: string
}

export const authApi = {
  login: (data: { username: string; password: string }) =>
    request<IAuthTokens>("auth/login/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  register: (data: {
    email: string
    first_name: string
    last_name: string
    password: string
  }) =>
    request<IAuthTokens>("auth/signup/", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  me: () => request<IUser>("auth/me/"),
}
