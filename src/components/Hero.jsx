import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const ROTATING_WORDS = ['Residências', 'Edifícios', 'Patrimônios', 'Legados']

export default function Hero() {
  const sectionRef  = useRef(null)
  const bgRef       = useRef(null)
  const tagRef      = useRef(null)
  const line1Ref    = useRef(null)
  const line2Ref    = useRef(null)
  const wordRef     = useRef(null)
  const subRef      = useRef(null)
  const ctaRef      = useRef(null)
  const scrollRef   = useRef(null)
  const lineHRef    = useRef(null)
  const yearRef     = useRef(null)
  const numRef      = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(bgRef.current, { opacity: 1 })
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' }, delay: 0.1 })
      tl
        .from(lineHRef.current, { scaleX: 0, transformOrigin: 'left', duration: 1.4 })
        .from(tagRef.current, { y: 16, opacity: 0, duration: 0.8 }, '-=0.9')
        .from(line1Ref.current.querySelectorAll('.wd'), {
          y: 100, opacity: 0, stagger: 0.1, duration: 1.2,
        }, '-=0.6')
        .from(line2Ref.current, { y: 60, opacity: 0, duration: 1.1 }, '-=0.9')
        .from(subRef.current, { y: 20, opacity: 0, duration: 0.9 }, '-=0.7')
        .from(ctaRef.current.children, { y: 18, opacity: 0, stagger: 0.12, duration: 0.8 }, '-=0.5')
        .from(yearRef.current, { opacity: 0, duration: 0.8 }, '-=0.4')
        .from(scrollRef.current, { y: 16, opacity: 0, duration: 0.7 }, '-=0.3')
        .from(numRef.current, { opacity: 0, duration: 1.2 }, '-=0.8')
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 25, ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top', end: 'bottom top', scrub: 1.8,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    let idx = 0
    const timer = setInterval(() => {
      if (!wordRef.current) return
      idx = (idx + 1) % ROTATING_WORDS.length
      gsap.to(wordRef.current, {
        y: -24, opacity: 0, duration: 0.32, ease: 'power2.in',
        onComplete: () => {
          wordRef.current.textContent = ROTATING_WORDS[idx]
          gsap.fromTo(wordRef.current,
            { y: 32, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.48, ease: 'expo.out' }
          )
        },
      })
    }, 2600)
    return () => clearInterval(timer)
  }, [])

  const scrollDown = () =>
    document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-brand-navy"
    >
      {/* FUNDO - substitua o gradiente por imagem/video real */}
      <div ref={bgRef} className="absolute inset-0"
           style={{ background: 'linear-gradient(160deg, #080F1C 0%, #0E2140 45%, #080F1C 100%)' }}>
        {/*
          VIDEO BACKGROUND - descomente para usar video:
          <video autoPlay muted loop playsInline
                 className="absolute inset-0 w-full h-full object-cover opacity-25">
            <source src="/videos/hero-obra.mp4" type="video/mp4" />
          </video>
        */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/40 via-transparent to-brand-navy/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/60 via-transparent to-transparent" />
        {/* Grade arquitetonica sutil */}
        <div className="absolute inset-0 opacity-[0.035]"
             style={{
               backgroundImage: 'linear-gradient(rgba(201,168,76,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.6) 1px, transparent 1px)',
               backgroundSize: '80px 80px',
             }} />
      </div>

      {/* Numero grande de fundo */}
      <div ref={numRef}
           className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-black select-none pointer-events-none leading-none text-white/[0.025] translate-x-8"
           style={{ fontSize: 'clamp(16rem, 30vw, 28rem)' }}>
        AR3
      </div>

      {/* Linha horizontal dourada */}
      <div ref={lineHRef}
           className="absolute top-[28%] left-0 right-0 h-px bg-gradient-to-r from-brand-gold/0 via-brand-gold/20 to-brand-gold/0 pointer-events-none" />

      {/* Sidebar vertical - Est. 2009 */}
      <div ref={yearRef}
           className="absolute right-8 top-1/2 -translate-y-1/2 lg:flex flex-col items-center gap-6 hidden pointer-events-none">
        <span className="text-[9px] text-white/25 uppercase tracking-[0.35em] font-sans [writing-mode:vertical-lr] rotate-180">
          Est. 2009 · Uberaba · MG
        </span>
        <div className="w-px h-16 bg-gradient-to-b from-brand-gold/30 to-transparent" />
      </div>

      {/* Conteudo principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-40 pb-28">

        {/* Tag de localizacao */}
        <div ref={tagRef} className="flex items-center gap-4 mb-10">
          <div className="w-8 h-px bg-brand-gold" />
          <span className="text-[10px] font-sans font-medium text-brand-gold/80 uppercase tracking-[0.35em]">
            Uberaba — Minas Gerais
          </span>
          <div className="w-1.5 h-1.5 bg-brand-orange rounded-full" />
          <span className="text-[10px] font-sans font-light text-white/30 uppercase tracking-[0.25em]">
            Construção de Alto Padrão
          </span>
        </div>

        {/* Headline linha 1 */}
        <div ref={line1Ref}
             className="overflow-hidden mb-3 flex flex-wrap"
             style={{ lineHeight: 1 }}>
          {['Nós', 'Construímos'].map((w, i) => (
            <span key={i}
                  className="wd inline-block mr-[0.22em] font-display font-black text-white"
                  style={{ fontSize: 'clamp(3.5rem, 9.5vw, 9rem)' }}>
              {w}
            </span>
          ))}
        </div>

        {/* Headline linha 2 - italic + palavra rotativa */}
        <div ref={line2Ref}
             className="flex flex-wrap items-baseline gap-x-5 mb-12"
             style={{ lineHeight: 1 }}>
          <span className="font-display font-black italic text-gradient-gold"
                style={{ fontSize: 'clamp(3.5rem, 9.5vw, 9rem)' }}>
            Grandes
          </span>
          <span ref={wordRef}
                className="font-display font-black text-white/85"
                style={{ fontSize: 'clamp(3.5rem, 9.5vw, 9rem)' }}>
            {ROTATING_WORDS[0]}
          </span>
        </div>

        {/* Linha separadora */}
        <div className="w-20 h-px bg-gradient-to-r from-brand-gold to-transparent mb-10" />

        {/* Subtitulo */}
        <p ref={subRef}
           className="max-w-lg text-[15px] text-white/50 leading-[1.85] font-sans font-light tracking-wide mb-14">
          Dedicação, experiência e uma paixão inabalável pela perfeição.
          Mais de 15 anos transformando projetos em obras que resistem ao tempo
          no Triângulo Mineiro e além.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-5 items-center">
          <a href="#projetos"
             onClick={(e) => { e.preventDefault(); document.querySelector('#projetos')?.scrollIntoView({ behavior: 'smooth' }) }}
             className="relative overflow-hidden btn-shimmer group inline-flex items-center gap-3 px-9 py-4 bg-brand-orange text-white text-[11px] font-semibold uppercase tracking-[0.22em] hover:bg-brand-amber shadow-xl shadow-brand-orange/25 transition-all duration-400 hover:shadow-brand-orange/50 hover:-translate-y-0.5">
            Ver Projetos
            <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform duration-300" />
          </a>

          <a href="#sobre"
             onClick={(e) => { e.preventDefault(); document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' }) }}
             className="group inline-flex items-center gap-3 text-[11px] font-sans font-medium text-white/50 uppercase tracking-[0.2em] hover:text-white transition-colors duration-300">
            Conheça a AR3
            <span className="inline-block w-8 h-px bg-current group-hover:w-14 transition-all duration-500" />
          </a>
        </div>

        {/* Mini-badges */}
        <div className="mt-20 pt-8 border-t border-white/[0.07] flex flex-wrap gap-10">
          {[
            { v: '15+',  l: 'Anos'              },
            { v: '200+', l: 'Obras entregues'   },
            { v: '98%',  l: 'Satisfação'         },
          ].map(({ v, l }) => (
            <div key={l} className="flex items-baseline gap-2">
              <span className="font-display font-black text-white text-2xl">{v}</span>
              <span className="text-[10px] text-white/30 uppercase tracking-[0.2em]">{l}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={scrollRef} onClick={scrollDown}
           className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10">
        <span className="text-[9px] text-white/25 uppercase tracking-[0.35em] font-sans">Scroll</span>
        <div className="relative w-px h-14 bg-white/10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-gold animate-[scroll-line_1.8s_ease-in-out_infinite]" />
        </div>
      </div>
    </section>
  )
}
