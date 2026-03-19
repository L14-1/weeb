import { BlurFade } from '../ui/blur-fade'
import { Button } from '../ui/button'
import ColourAnimatedText from '../ui/colourful-text'
import { TextAnimate } from '../ui/text-animate'

export function Cta() {
  return (
    <div className="flex flex-col gap-20">
      <h2 className="text-4xl md:text-7xl text-center font-extrabold">
        Explorez le <ColourAnimatedText text="web" /> sous toutes ses{' '}
        <div className="inline-block relative">
          facettes
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-1/12 top-1/1 w-10/12"
            viewBox="0 0 69.24294 15.80886"
          >
            <path
              d="M.72389,3.45029c17.61435-.50658,35.2287-1.01317,52.84305-1.51975,4.98519-.14337,9.97039-.28675,14.95558-.43012V.00042c-8.83186,1.05581-17.60382,2.57091-26.27205,4.56741-2.14332,.49366-4.28,1.01594-6.40953,1.56607-1.05269,.27195-2.3153,.4399-3.31391,.88073-.47489,.20964-.80211,.47908-.87434,1.02-.22804,1.70781,2.20153,1.4773,3.2296,1.62674,2.13816,.31081,4.23336,.83088,6.28557,1.50243v-1.44642c-.84494,.27522-1.68989,.55043-2.53483,.82565-.7163,.23331-1.57267,.40129-2.17822,.87126-.8292,.64353-1.1137,1.77347-.7637,2.75392,.48969,1.37179,1.74578,1.58515,3.03827,1.63982,.96521,.04083,.96329-1.45925,0-1.5-.75909-.03211-2.2427-.31661-1.57179-1.47157,.2364-.40695,.83243-.50768,1.24556-.64225,1.05449-.34347,2.10898-.68694,3.16347-1.03041,.71208-.23194,.71158-1.21357,0-1.44642-1.76105-.57628-3.55254-1.04253-5.37931-1.35788-.74353-.12835-1.49145-.23301-2.24113-.31823-.22714-.02681-.45459-.05069-.68236-.07164-.00609,.352,.11775,.45162,.37153,.29887,.31074,.05651,.85683-.23004,1.18326-.31646,3.6997-.97938,7.42191-1.87372,11.16291-2.68113,7.45025-1.60796,14.97319-2.8658,22.541-3.77049,.93069-.11126,.98999-1.52847,0-1.5C50.90816,.50701,33.29381,1.01359,15.67947,1.52018c-4.98519,.14337-9.97039,.28675-14.95558,.43012-.96319,.0277-.96718,1.52782,0,1.5H.72389Z"
              fill="#C084FC"
              origin="undraw"
            />
          </svg>
        </div>
      </h2>
      <p className="text-center mx-auto max-w-11/12 text-sm md:text-base">
        <TextAnimate animation="blurIn">
          Le monde du web évolue constamment, et nous sommes là pour vous guider
          à travers ses tendances, technologies et meilleures pratiques. Que
          vous soyez développeur, designer ou passionné du digital, notre blog
          vous offre du contenu de qualité pour rester à la pointe.
        </TextAnimate>
      </p>
      <BlurFade blur="16px" delay={0.8} duration={0.7}>
        <div className="flex justify-center flex-col gap-4 md:flex-row">
          <Button size="lg" variant="outline">
            Découvrir les articles
          </Button>
          <Button size="lg">S'abonner à la newsletter</Button>
        </div>
      </BlurFade>
    </div>
  )
}
