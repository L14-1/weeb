import { useLogout } from "@/hooks/use-auth"
import { authApi, IAuthTokens, IUser } from "@/lib/api/auth"
import { tokenStore } from "@/lib/api/auth-storage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CircleUserRound, Loader } from "lucide-react"

import { ApiError } from "@/lib/api/client"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Field, FieldDescription, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

export default function LoginButton({
  full,
  currentUser,
  isLoading,
}: {
  full: boolean
  currentUser: IUser | undefined
  isLoading: boolean
}) {
  const queryClient = useQueryClient()
  const logout = useLogout()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [open, setOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState("")

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (tokens: IAuthTokens) => {
      tokenStore.set(tokens.access, tokens.refresh)
      await queryClient.fetchQuery({ queryKey: ["me"] })
      setOpen(false)
    },
    onError: (e: ApiError) => {
      toast.error("Impossible de se connecter", {
        description: "Identifiant et/ou mot de passe invalide.",
      })
    },
  })

  const resetMutation = useMutation({
    mutationFn: authApi.passwordResetRequest,
    onSuccess: () => {
      setResetOpen(false)
      setResetEmail("")
      toast.success("Email envoyé", {
        description:
          "Si un compte existe pour cet email, vous allez recevoir un lien pour réinitialiser votre mot de passe.",
      })
    },
    onError: () => {
      toast.error("Échec de l'envoi", {
        description: "Veuillez réessayer.",
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ username, password })
  }

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    resetMutation.mutate({ email: resetEmail.trim() })
  }

  return isLoading ? (
    <div className="flex items-center">
      <Loader className="h-4 w-4 spin-in" />
    </div>
  ) : currentUser ? (
    <Dialog open={logoutOpen} onOpenChange={setLogoutOpen}>
      <DialogTrigger asChild>
        <Button
          variant={full ? "outline" : "ghost"}
          className={full ? "w-full" : ""}
        >
          <CircleUserRound className="h-4 w-4" />
          <p>{currentUser.first_name + " " + currentUser.last_name}</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Se déconnecter</DialogTitle>
          <DialogDescription>
            Êtes-vous sûr de vouloir vous déconnecter de votre compte ?
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setLogoutOpen(false)}>
            Annuler
          </Button>
          <Button
            onClick={() => {
              logout()
              setLogoutOpen(false)
            }}
          >
            Se déconnecter
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  ) : (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={full ? "outline" : "ghost"}
            className={full ? "w-full" : ""}
          >
            Se connecter
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Se connecter à votre compte</DialogTitle>
            <DialogDescription>
              Entrez votre email et mot de passe ci dessous pour vous connecter
              à votre compte.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="exemple@mail.com"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false)
                      setResetOpen(true)
                    }}
                    className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              <Field>
                <Button type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Connexion…" : "Se connecter"}
                </Button>
                <FieldDescription className="text-center">
                  Vous n’avez pas encore de compte ?{" "}
                  <a href="#">Nous rejoindre</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Réinitialiser votre mot de passe</DialogTitle>
            <DialogDescription>
              Entrez votre email, nous vous enverrons un lien pour réinitialiser
              votre mot de passe.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="reset_email">Email</FieldLabel>
                <Input
                  id="reset_email"
                  type="email"
                  placeholder="exemple@mail.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </Field>
              <Field>
                <Button
                  type="submit"
                  disabled={resetMutation.isPending || !resetEmail.trim()}
                >
                  {resetMutation.isPending ? "Envoi…" : "Envoyer le lien"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
