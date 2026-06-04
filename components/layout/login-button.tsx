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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({ username, password })
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
            Entrez votre email et mot de passe ci dessous pour vous connecter à
            votre compte.
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
                <a
                  href="#"
                  className="ml-auto inline-block text-xs underline-offset-4 hover:underline"
                >
                  Mot de passe oublié ?
                </a>
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
                Vous n'avez pas encore de compte ?{" "}
                <a href="#">Nous rejoindre</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
