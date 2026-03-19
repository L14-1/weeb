import { Cta } from "@/components/home/cta"
import ImageRessource from "@/components/home/image-ressource"
import { TrustedBy } from "@/components/home/trustedBy"
import { BlurFade } from "@/components/ui/blur-fade"
import { Button } from "@/components/ui/button"
import { ContainerScroll } from "@/components/ui/container-scroll-animation"
import { Highlighter } from "@/components/ui/highlighter"

export default function Page() {
  return (
    <main className="mx-auto w-5xl max-w-full pb-30">
      <ContainerScroll titleComponent={<Cta />}>
        <BlurFade blur="8px" delay={0.3} duration={0.5}>
          <img src={"./images/preview.png"} alt="preview" />
        </BlurFade>
      </ContainerScroll>
      <TrustedBy />
      <ImageRessource
        headtitle="Des ressources pour tous les niveaux"
        description="Que vous débutiez en développement web ou que vous soyez un expert cherchant à approfondir vos connaissances, nous vous proposons des tutoriels, guides et bonnes pratiques pour apprendre efficacement."
        linkTitle="Explorez les ressources"
        title={
          <h4 className="text-4xl font-bold md:text-5xl">
            <Highlighter action="highlight" color="#C084FC" isView={true}>
              Apprenez
            </Highlighter>{" "}
            et{" "}
            <Highlighter action="highlight" color="#C084FC" isView={true}>
              progressez
            </Highlighter>
          </h4>
        }
        imageUrl={"./images/preview.png"}
        imageSize="md:w-13/24"
      />
      <ImageRessource
        headtitle="Le web, un écosystème en constante évolution"
        description="Chaque semaine, nous analysons les nouveautés du web : frameworks émergents, bonnes pratiques SEO, accessibilité, et bien plus encore. Ne manquez aucune actualité du digital !"
        linkTitle="Lire les articles récents"
        orientation="reverse"
        title={
          <h4 className="text-4xl font-bold md:text-5xl">
            Restez informé des dernières{" "}
            <Highlighter action="highlight" color="#C084FC" isView={true}>
              tendances
            </Highlighter>
          </h4>
        }
        imageUrl={"./images/shapes.png"}
        imageSize="md:w-4/12"
      />
    </main>
  )
}
