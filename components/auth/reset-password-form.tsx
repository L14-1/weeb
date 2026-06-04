"use client"

import { useMutation } from "@tanstack/react-query"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authApi } from "@/lib/api/auth"

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const uid = searchParams.get("uid")
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")

  const mutation = useMutation({
    mutationFn: authApi.passwordResetConfirm,
    onSuccess: () => {
      toast.success("Mot de passe réinitialisé", {
        description:
          "Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
      })
      router.push("/")
    },
    onError: () => {
      toast.error("Impossible de réinitialiser le mot de passe", {
        description: "Le lien est peut-être invalide ou expiré.",
      })
    },
  })

  if (!uid || !token) {
    return (
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>Lien invalide</CardTitle>
          <CardDescription>
            Ce lien de réinitialisation est invalide ou incomplet.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  const passwordsMatch = password === confirm
  const canSubmit =
    password.length > 0 && confirm.length > 0 && passwordsMatch

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSubmit) return
    mutation.mutate({ uid, token, password })
  }

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle>Réinitialiser votre mot de passe</CardTitle>
        <CardDescription>
          Choisissez un nouveau mot de passe pour votre compte.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="new_password">
                Nouveau mot de passe
              </FieldLabel>
              <Input
                id="new_password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <Field data-invalid={confirm.length > 0 && !passwordsMatch}>
              <FieldLabel htmlFor="confirm_password">
                Confirmer le mot de passe
              </FieldLabel>
              <Input
                id="confirm_password"
                type="password"
                value={confirm}
                aria-invalid={confirm.length > 0 && !passwordsMatch}
                onChange={(e) => setConfirm(e.target.value)}
              />
              {confirm.length > 0 && !passwordsMatch && (
                <FieldError>Les mots de passe ne correspondent pas.</FieldError>
              )}
            </Field>
            <Field>
              <Button
                type="submit"
                disabled={!canSubmit || mutation.isPending}
              >
                {mutation.isPending ? "Réinitialisation…" : "Réinitialiser"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
