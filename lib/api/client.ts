import { ApiError } from "next/dist/server/api-utils"
import { tokenStore } from "./auth-storage"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const access = typeof window !== "undefined" ? tokenStore.getAccess() : null

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(access ? { Authorization: `Bearer ${access}` } : {}),
      ...options.headers,
    },
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new ApiError(res.status, body)
  }

  return res.status === 204 ? (null as T) : res.json()
}
