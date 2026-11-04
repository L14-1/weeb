import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { tokenStore } from "./auth-storage"
import { ApiError, request } from "./client"

const fetchMock = vi.fn()

function json(status: number, body?: unknown) {
  return new Response(body === undefined ? null : JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  })
}

beforeEach(() => {
  vi.stubGlobal("fetch", fetchMock)
  localStorage.clear()
})

afterEach(() => {
  fetchMock.mockReset()
  vi.unstubAllGlobals()
})

describe("request", () => {
  it("sends the access token as a bearer header", async () => {
    tokenStore.set("access-1", "refresh-1")
    fetchMock.mockResolvedValueOnce(json(200, { ok: true }))

    await expect(request("articles/")).resolves.toEqual({ ok: true })

    const headers = fetchMock.mock.calls[0][1].headers
    expect(headers.Authorization).toBe("Bearer access-1")
  })

  it("refreshes the token on 401 and retries once", async () => {
    tokenStore.set("expired", "refresh-1")
    fetchMock
      .mockResolvedValueOnce(json(401))
      .mockResolvedValueOnce(
        json(200, { access: "access-2", refresh: "refresh-2" })
      )
      .mockResolvedValueOnce(json(200, { ok: true }))

    await expect(request("articles/")).resolves.toEqual({ ok: true })

    expect(fetchMock.mock.calls[1][0]).toContain("auth/token/refresh/")
    expect(fetchMock.mock.calls[2][1].headers.Authorization).toBe(
      "Bearer access-2"
    )
    expect(tokenStore.getRefresh()).toBe("refresh-2")
  })

  it("shares a single refresh between concurrent 401s", async () => {
    tokenStore.set("expired", "refresh-1")
    fetchMock.mockImplementation(async (url: string, init: RequestInit) => {
      if (url.includes("auth/token/refresh/")) {
        return json(200, { access: "access-2", refresh: "refresh-2" })
      }
      const auth = (init.headers as Record<string, string>).Authorization
      return auth === "Bearer access-2" ? json(200, { ok: true }) : json(401)
    })

    await Promise.all([request("a/"), request("b/"), request("c/")])

    const refreshCalls = fetchMock.mock.calls.filter(([url]) =>
      url.includes("auth/token/refresh/")
    )
    expect(refreshCalls).toHaveLength(1)
  })

  it("clears the tokens when the refresh fails", async () => {
    tokenStore.set("expired", "refresh-1")
    fetchMock.mockResolvedValueOnce(json(401)).mockResolvedValueOnce(json(401))

    await expect(request("articles/")).rejects.toMatchObject({ status: 401 })
    expect(tokenStore.getAccess()).toBeNull()
    expect(tokenStore.getRefresh()).toBeNull()
  })

  it("throws an ApiError with the response body", async () => {
    fetchMock.mockResolvedValueOnce(
      json(400, { title: ["Le titre est requis"] })
    )

    const error = await request("articles/").catch((e) => e)
    expect(error).toBeInstanceOf(ApiError)
    expect(error).toMatchObject({
      status: 400,
      body: { title: ["Le titre est requis"] },
    })
  })

  it("returns null on 204", async () => {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 204 }))

    await expect(
      request("articles/x/", { method: "DELETE" })
    ).resolves.toBeNull()
  })
})
