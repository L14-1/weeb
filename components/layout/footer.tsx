import Link from "next/link"

import { Separator } from "@/components/ui/separator"

const footerSections = [
  {
    title: "Ressources",
    links: [{ title: "Blog", href: "/articles" }],
  },
  {
    title: "La société",
    links: [{ title: "Nous contacter", href: "/contact" }],
  },
]

const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-(--breakpoint-xl)">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 px-6 py-12 md:grid-cols-4 xl:px-0">
          <div className="col-span-full md:col-span-2">
            <h5 className="text-2xl font-bold">weeb</h5>

            <p className="mt-4 text-muted-foreground">
              Explorez le web sous toutes ses facettes.
            </p>
          </div>

          {footerSections.map(({ title, links }) => (
            <div key={title}>
              <h6 className="font-medium">{title}</h6>
              <ul className="mt-6 space-y-4">
                {links.map(({ title, href }) => (
                  <li key={title}>
                    <Link
                      href={href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator />
        <div className="flex items-center justify-center px-6 py-8 xl:px-0">
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()} <Link href="/">Weeb, Inc</Link>.
            Tout droits réservés.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
