import { Geist_Mono, Roboto } from "next/font/google"

import Footer from "@/components/layout/footer"
import { Header } from "@/components/layout/header"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { Spotlight } from "@/components/ui/spotlight-new"
import { cn } from "@/lib/utils"
import { Metadata } from "next"
import Script from "next/script"
import { getQueryClient } from "./get-query-client"
import "./globals.css"
import { Providers } from "./providers"

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Weeb - Explorez le web sous toutes ses facettes.",
  description:
    "Le monde du web évolue constamment, et nous sommes là pour vous guider à travers ses tendances, technologies et meilleures pratiques. Que vous soyez développeur, designer ou passionné du digital, notre blog vous offre du contenu de qualité pour rester à la pointe.",
  metadataBase: new URL("https://weeb.nicolasmaitre.dev"),
  openGraph: {
    title: "Weeb - Explorez le web sous toutes ses facettes.",
    description:
      "Le monde du web évolue constamment, et nous sommes là pour vous guider à travers ses tendances, technologies et meilleures pratiques. Que vous soyez développeur, designer ou passionné du digital, notre blog vous offre du contenu de qualité pour rester à la pointe.",
    url: "https://weeb.nicolasmaitre.dev",
    siteName: "weeb.nicolasmaitre.dev",
    locale: "fr_FR",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const queryClient = getQueryClient()
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        "scroll-smooth",
        roboto.variable
      )}
    >
      <head>
        <Script
          defer
          src="https://umami.nicolasmaitre.dev/script.js"
          data-website-id="eef5f71a-6afc-4d91-99ae-bf2a4629f077"
          strategy="afterInteractive"
        />
      </head>
      <body className="overflow-x-hidden">
        <Providers>
          <ThemeProvider>
            <Header />
            <main className="px-4 pt-30 lg:px-0">{children}</main>
            <Footer />
            <Spotlight />
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
