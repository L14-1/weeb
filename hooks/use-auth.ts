"use client"
import { authApi } from "@/lib/api/auth"
import { tokenStore } from "@/lib/api/auth-storage"
import { useQuery, useQueryClient } from "@tanstack/react-query"

export function useCurrentUser() {
  return useQuery({
    queryKey: ["me"],
    queryFn: authApi.me,
    enabled: typeof window !== "undefined" && !!tokenStore.getAccess(),
    retry: false,
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  return () => {
    tokenStore.clear()
    queryClient.clear()
  }
}
