import { authApi, IAuthTokens, IUser } from "@/lib/api/auth"
import { tokenStore } from "@/lib/api/auth-storage"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CircleUserRound, Loader } from "lucide-react"
import { useState } from "react"
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
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [open, setOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (tokens: IAuthTokens) => {
      tokenStore.set(tokens.access, tokens.refresh)
      await queryClient.refetchQueries({ queryKey: ["me"] })
      setOpen(false)
    },
    onError: (e: any) => {
      console.log(e)
      // Toast error.
      // fields error.
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
    <Button
      variant={full ? "outline" : "ghost"}
      className={full ? "w-full" : ""}
    >
      <CircleUserRound className="h-4 w-4" />
      <p>{currentUser.first_name + " " + currentUser.last_name}</p>
    </Button>
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
