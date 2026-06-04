import { cn } from "@/lib/utils"
import { ArrowRight02Icon } from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"
import { BlurFade } from "../ui/blur-fade"
import { Button } from "../ui/button"
import { TextAnimate } from "../ui/text-animate"

export type ImageRessourceProps = {
  headtitle: string
  title: React.ReactNode
  description: string
  linkTitle: string
  imageUrl: string
  orientation?: "reverse" | "normal"
  imageSize?: string

  className?: string
}

export default function ImageRessource({
  headtitle,
  title,
  description,
  linkTitle,
  imageUrl,
  orientation = "normal",
  imageSize = "w-1/2",
}: ImageRessourceProps) {
  return (
    <section
      className={
        orientation === "normal"
          ? "flex flex-col items-center gap-12 pt-32 md:flex-row"
          : "flex flex-col items-center gap-12 pt-32 md:flex-row-reverse"
      }
    >
      <div className="flex flex-1 flex-col gap-9">
        <div className="text-xs tracking-wider uppercase md:text-sm">
          <TextAnimate animation="blurIn" delay={0.5}>
            {headtitle}
          </TextAnimate>
        </div>
        <div>{title}</div>
        <div className="text-xs md:text-sm">
          <TextAnimate animation="blurIn" delay={0.5}>
            {description}
          </TextAnimate>
        </div>
        <div>
          <Button variant={"link"} className="pl-0">
            {linkTitle}{" "}
            <HugeiconsIcon
              height={20}
              icon={ArrowRight02Icon}
              className="md:-translate-y-0.5"
            />
          </Button>
        </div>
      </div>
      <BlurFade
        className={cn(imageSize, "max-w-10/12")}
        inView={true}
        blur="18px"
        delay={0.3}
        duration={0.7}
      >
        <img src={imageUrl} alt="" />
      </BlurFade>
    </section>
  )
}
