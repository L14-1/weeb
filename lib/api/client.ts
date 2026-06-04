import { tokenStore } from "./auth-storage"

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export class ApiError extends Error {
  constructor(
    public status: number,
    public body: any
  ) {
    super(`API error ${status}`)
    this.name = "ApiError"
  }
}

let refreshPromise: Promise<string> | null = null

async function refreshAccessToken(): Promise<string> {
  const refresh = tokenStore.getRefresh()
  if (!refresh) {
    tokenStore.clear()
    throw new ApiError(401, { detail: "No refresh token" })
  }

  const res = await fetch(`${BASE_URL}auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  })

  if (!res.ok) {
    tokenStore.clear()
    throw new ApiError(401, { detail: "Session expired" })
  }

  const data = await res.json()
  tokenStore.set(data.access, data.refresh)
  return data.access
}

function getFreshAccessToken(): Promise<string> {
  if (!refreshPromise) {
    refreshPromise = refreshAccessToken().finally(() => {
      refreshPromise = null
    })
  }
  return refreshPromise
}

export async function request<T>(
  path: string,
  options: RequestInit = {},
  isRetry = false
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

  if (
    res.status === 401 &&
    !isRetry &&
    !path.includes("auth/token/refresh") &&
    typeof window !== "undefined"
  ) {
    await getFreshAccessToken()
    return request<T>(path, options, true)
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new ApiError(res.status, body)
  }

  return res.status === 204 ? (null as T) : res.json()
}
