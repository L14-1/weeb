"use client"
import { authApi } from "@/lib/api/auth"
import { tokenStore } from "@/lib/api/auth-storage"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useSyncExternalStore } from "react"

const noopSubscribe = () => () => {}

function useIsClient() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  )
}

export function useCurrentUser() {
  const isClient = useIsClient()
  const query = useQuery({
    queryKey: ["me"],
    queryFn: authApi.me,
    enabled: isClient && !!tokenStore.getAccess(),
    retry: false,
  })
  return { ...query, isLoading: !isClient || query.isLoading }
}

export function useLogout() {
  const queryClient = useQueryClient()
  return () => {
    tokenStore.clear()
    queryClient.setQueryData(["me"], null)
    queryClient.clear()
  }
}
