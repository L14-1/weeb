import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { Field, FieldDescription, FieldGroup, FieldLabel } from '../ui/field'
import { Input } from '../ui/input'

export default function LoginButton({ full }: { full: boolean }) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button
          variant={full ? 'outline' : 'ghost'}
          className={full ? 'w-full' : ''}
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
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="exemple@mail.com" />
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
              <Input id="password" type="password" />
            </Field>
            <Field>
              <Button type="submit">Se connecter</Button>
              <FieldDescription className="text-center">
                Vous n'avez pas encore de compte ?{' '}
                <a href="#">Nous rejoindre</a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  )
}
