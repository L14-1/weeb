import { authApi } from "@/lib/api/auth"
import { useMutation } from "@tanstack/react-query"

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
import { Field, FieldGroup, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

export default function RegisterButton({ full }: { full: boolean }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [open, setOpen] = useState(false)

  const mutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      setOpen(false)
      toast.success("Compte créé", {
        description:
          "Votre compte a bien été créé, un administrateur l'activera dans les plus bref délais",
      })
    },
    onError: (e: ApiError) => {
      const messages = e.body
        ? Object.values(e.body as Record<string, string | string[]>)
            .flat()
            .filter(Boolean)
        : []
      toast.error("Impossible de créer le compte", {
        description:
          messages.length > 0
            ? messages.join(" ")
            : "Vérifiez vos informations et réessayez.",
      })
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      email,
      first_name: firstName,
      last_name: lastName,
      password,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className={full ? "w-full" : ""}>Nous rejoindre</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer un compte</DialogTitle>
          <DialogDescription>
            Renseignez vos informations ci dessous pour créer votre compte.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <Field orientation="responsive">
              <Field>
                <FieldLabel htmlFor="first_name">Prénom</FieldLabel>
                <Input
                  id="first_name"
                  type="text"
                  placeholder="Jean"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="last_name">Nom</FieldLabel>
                <Input
                  id="last_name"
                  type="text"
                  placeholder="Dupont"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Field>
            </Field>
            <Field>
              <FieldLabel htmlFor="register_email">Email</FieldLabel>
              <Input
                id="register_email"
                type="email"
                placeholder="exemple@mail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="register_password">Mot de passe</FieldLabel>
              <Input
                id="register_password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field>
            <Field>
              <Button type="submit" disabled={mutation.isPending}>
                {mutation.isPending ? "Création…" : "Créer mon compte"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
