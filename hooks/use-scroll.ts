"use client"
import { useCallback, useSyncExternalStore } from "react"

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true })
  return () => window.removeEventListener("scroll", onChange)
}

export function useScroll(threshold: number) {
  const getSnapshot = useCallback(() => window.scrollY > threshold, [threshold])
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}
