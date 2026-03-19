import { cn } from '@/lib/utils'
import { ArrowRight02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { BlurFade } from '../ui/blur-fade'
import { Button } from '../ui/button'
import { TextAnimate } from '../ui/text-animate'

export type ImageRessourceProps = {
  headtitle: string
  title: React.ReactNode
  description: string
  linkTitle: string
  imageUrl: string
  orientation?: 'reverse' | 'normal'
  imageSize?: string

  className?: string
}

export default function ImageRessource({
  headtitle,
  title,
  description,
  linkTitle,
  imageUrl,
  orientation = 'normal',
  imageSize = 'w-1/2',
}: ImageRessourceProps) {
  return (
    <section
      className={
        orientation === 'normal'
          ? 'flex gap-12 items-center pt-32 flex-col md:flex-row'
          : 'flex gap-12 items-center pt-32 flex-col md:flex-row-reverse'
      }
    >
      <div className="flex flex-col gap-9 flex-1">
        <p className="uppercase text-xs md:text-sm tracking-wider ">
          <TextAnimate animation="blurIn" delay={0.5}>
            {headtitle}
          </TextAnimate>
        </p>
        <h4>{title}</h4>
        <p className="text-xs md:text-sm">
          <TextAnimate animation="blurIn" delay={0.5}>
            {description}
          </TextAnimate>
        </p>
        <div>
          <Button variant={'link'} className="pl-0">
            {linkTitle}{' '}
            <HugeiconsIcon
              height={20}
              icon={ArrowRight02Icon}
              className="md:-translate-y-0.5"
            />
          </Button>
        </div>
      </div>
      <BlurFade
        className={cn(imageSize, 'max-w-10/12')}
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
