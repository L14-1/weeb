"use client"

import { MobileNav } from "@/components/layout/mobile-nav"
import { Button, buttonVariants } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/use-auth"
import { useScroll } from "@/hooks/use-scroll"
import { cn } from "@/lib/utils"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import LoginButton from "./login-button"

export const navLinks = [
  {
    label: "Nous contacter",
    href: "/contact",
  },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-4 w-4 dark:hidden" />
      <Moon className="hidden h-4 w-4 dark:block" />
    </Button>
  )
}

export function Header() {
  const scrolled = useScroll(10)
  const { data: currentUser, isLoading: userLoading } = useCurrentUser()

  return (
    <header
      className={cn(
        "sticky top-0 z-50 mx-auto mt-4 w-full max-w-7xl border-b border-transparent md:rounded-md md:border md:p-2.5 md:transition-all md:ease-out",
        {
          "border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:top-6 md:w-23/24 md:max-w-6xl md:shadow":
            scrolled,
        }
      )}
    >
      <nav
        className={cn(
          "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
          {
            "md:px-2": scrolled,
          }
        )}
      >
        <Link href="/">
          <h1 className="text-4xl font-bold">weeb</h1>
        </Link>
        <div className="ml-8 hidden flex-1 items-center justify-between gap-1 md:flex">
          <div className="flex gap-1">
            {navLinks.map((link, i) => (
              <Link
                className={buttonVariants({ variant: "ghost" })}
                href={link.href}
                key={i}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex gap-1">
            <LoginButton
              full={false}
              currentUser={currentUser}
              isLoading={userLoading}
            />
            {!currentUser && !userLoading && <Button>Nous rejoindre</Button>}
            <ThemeToggle />
          </div>
        </div>
        <MobileNav />
      </nav>
    </header>
  )
}
