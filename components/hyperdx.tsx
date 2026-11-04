"use client"

import HyperDX from "@hyperdx/browser"
import { useEffect } from "react"

import { useCurrentUser } from "@/hooks/use-auth"

const url = process.env.NEXT_PUBLIC_HYPERDX_URL
const apiKey = process.env.NEXT_PUBLIC_HYPERDX_API_KEY
const enabled = process.env.NODE_ENV === "production" && !!url && !!apiKey

let initialized = false

export function HyperDXProvider() {
  const { data: currentUser } = useCurrentUser()

  useEffect(() => {
    if (!enabled || initialized) return
    HyperDX.init({
      url,
      apiKey: apiKey!,
      service: "weeb-front",
      consoleCapture: true,
      maskAllInputs: true,
    })
    initialized = true
  }, [])

  useEffect(() => {
    if (!enabled || !currentUser) return
    HyperDX.setGlobalAttributes({
      userId: String(currentUser.id),
      userEmail: currentUser.email,
      userName: `${currentUser.first_name} ${currentUser.last_name}`,
    })
  }, [currentUser])

  return null
}
