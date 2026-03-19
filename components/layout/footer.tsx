import { Separator } from '@/components/ui/separator'
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  YoutubeIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

const footerSections = [
  {
    title: 'Produit',
    links: [
      {
        title: 'Prix',
        href: '#',
      },
      {
        title: "Vue d'ensemble",
        href: '#',
      },
      {
        title: 'Naviguer',
        href: '#',
      },
      {
        title: 'Accessibilité',
        href: '#',
      },
    ],
  },
  {
    title: 'Solutions',
    links: [
      {
        title: 'Brainstorming',
        href: '#',
      },
      {
        title: 'Réflexion',
        href: '#',
      },
      {
        title: 'Wireframing',
        href: '#',
      },
      {
        title: 'Recherche',
        href: '#',
      },
    ],
  },
  {
    title: 'Resources',
    links: [
      {
        title: "Centre d'aide",
        href: '#',
      },
      {
        title: 'Blog',
        href: '#',
      },
      {
        title: 'Tutoriels',
        href: '#',
      },
    ],
  },
  {
    title: 'La société',
    links: [
      {
        title: 'A propos',
        href: '#',
      },
      {
        title: 'Presse',
        href: '#',
      },
      {
        title: 'Evénements',
        href: '#',
      },
      {
        title: 'Emplois',
        href: '#',
      },
    ],
  },
]

const Footer = () => {
  return (
    <footer className="border-t bg-card">
      <div className="max-w-(--breakpoint-xl) mx-auto">
        <div className="py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 xl:grid-cols-7 gap-x-8 gap-y-10 px-6 xl:px-0">
          <div className="col-span-full xl:col-span-2">
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
                    <a
                      href={href}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator />
        <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
          {/* Copyright */}
          <span className="text-muted-foreground">
            &copy; {new Date().getFullYear()}{' '}
            <a href="/" target="_blank">
              Weeb, Inc
            </a>
            . Tout droits réservés.
          </span>

          <div className="flex items-center gap-5 text-muted-foreground">
            <a href="#" target="_blank">
              <HugeiconsIcon
                icon={YoutubeIcon}
                className="h-5 w-5 hover:text-white cursor-pointer"
              />
            </a>
            <a href="#" target="_blank">
              <HugeiconsIcon
                icon={Facebook}
                className="h-5 w-5 hover:text-white cursor-pointer"
              />
            </a>
            <a href="#" target="_blank">
              <HugeiconsIcon
                icon={Twitter}
                className="h-5 w-5 hover:text-white cursor-pointer"
              />
            </a>
            <a href="#" target="_blank">
              <HugeiconsIcon
                icon={Instagram}
                className="h-5 w-5 hover:text-white cursor-pointer"
              />
            </a>
            <a href="#" target="_blank">
              <HugeiconsIcon
                icon={Linkedin}
                className="h-5 w-5 hover:text-white cursor-pointer"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
