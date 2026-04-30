import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, Play } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ─── Palavras que fazem o "typewriter" rotativo no headline ─────────────────
const ROTATING_WORDS = ['Residências', 'Edifícios', 'Patrimônios', 'Legados']

export default function Hero() {
  const sectionRef   = useRef(null)
  const bgRef        = useRef(null)
  const taglineRef   = useRef(null)
  const headline1Ref = useRef(null)
  const headline2Ref = useRef(null)
  const wordRef      = useRef(null)
  const subRef       = useRef(null)
  const ctaRef       = useRef(null)
  const scrollRef    = useRef(null)
  const particlesRef = useRef([])
  const wordIndexRef = useRef(0)

  // ── Animação de entrada principal ──────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

      // Overlay de abertura (curtain reveal)
      tl.from(bgRef.current, {
        scaleY: 0, transformOrigin: 'top', duration: 0, // começa escondido
      })
      .to(bgRef.current, { opacity: 1, duration: 0.01 })

      // Tag de localização
      .from(taglineRef.current, {
        y: 30, opacity: 0, duration: 0.8, delay: 0.3,
      })

      // Linha 1 do headline – letras sobem
      .from(headline1Ref.current.querySelectorAll('.word'), {
        y: 110, opacity: 0, stagger: 0.12, duration: 1.1, ease: 'expo.out',
      }, '-=0.4')

      // Linha 2 (palavra rotativa) – entra junto
      .from(headline2Ref.current, {
        y: 50, opacity: 0, duration: 0.9,
      }, '-=0.7')

      // Subtítulo
      .from(subRef.current, {
        y: 20, opacity: 0, duration: 0.8,
      }, '-=0.5')

      // CTAs
      .from(ctaRef.current.children, {
        y: 20, opacity: 0, stagger: 0.15, duration: 0.7,
      }, '-=0.4')

      // Indicador de scroll
      .from(scrollRef.current, {
        y: 20, opacity: 0, duration: 0.6,
      }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // ── Efeito parallax no fundo ao rolar ─────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // ── Rotação de palavras no headline ───────────────────────────────────
  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      if (!wordRef.current) return
      index = (index + 1) % ROTATING_WORDS.length
      gsap.to(wordRef.current, {
        y: -20, opacity: 0, duration: 0.35, ease: 'power2.in',
        onComplete: () => {
          wordRef.current.textContent = ROTATING_WORDS[index]
          gsap.fromTo(wordRef.current,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45, ease: 'expo.out' }
          )
        },
      })
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  // ── Partículas flutuantes animadas ────────────────────────────────────
  useEffect(() => {
    particlesRef.current.forEach((p, i) => {
      if (!p) return
      gsap.to(p, {
        y: `random(-40, 40)`,
        x: `random(-30, 30)`,
        rotation: `random(-15, 15)`,
        duration: `random(4, 8)`,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: i * 0.3,
      })
    })
  }, [])

  const scrollDown = () => {
    document.querySelector('#sobre')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-brand-navy"
    >
      {/* ──────────────────────────────────────────────────────────────────
          FUNDO – IMAGEM/VÍDEO DO HERO
          ➤ SUBSTITUA o gradiente abaixo por uma imagem ou vídeo real:
             • Para imagem: adicione src/assets/hero-bg.jpg e use
               style={{ backgroundImage: "url('/src/assets/hero-bg.jpg')" }}
               com className "bg-cover bg-center"
             • Para vídeo: descomente a tag <video> abaixo e ajuste o src.
      ─────────────────────────────────────────────────────────────────── */}
      <div
        ref={bgRef}
        className="absolute inset-0 opacity-0"
        style={{
          background: `
            linear-gradient(135deg,
              #0A1628 0%,
              #1B3B6F 40%,
              #0D2145 70%,
              #0A1628 100%
            )
          `,
        }}
      >
        {/*
          ── VIDEO BACKGROUND (descomente quando tiver o vídeo) ──────────
          <video
            autoPlay muted loop playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          >
            <source src="/videos/hero-obra.mp4" type="video/mp4" />
            {/* ↑ Insira aqui o vídeo aéreo/timelapse da obra * /}
          </video>
        */}

        {/* Overlay gradiente sobre imagem/vídeo para legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/20 to-brand-navy/80" />

        {/* Textura sutil de construção */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              0deg, transparent, transparent 60px,
              rgba(255,255,255,0.03) 60px, rgba(255,255,255,0.03) 61px
            ),
            repeating-linear-gradient(
              90deg, transparent, transparent 60px,
              rgba(255,255,255,0.03) 60px, rgba(255,255,255,0.03) 61px
            )`,
          }}
        />
      </div>

      {/* ── Partículas decorativas flutuantes ──────────────────────────── */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (particlesRef.current[i] = el)}
          className="absolute rounded-full pointer-events-none"
          style={{
            width:  `${[80, 50, 120, 40, 90, 60][i]}px`,
            height: `${[80, 50, 120, 40, 90, 60][i]}px`,
            top:    `${[15, 70, 30, 80, 20, 60][i]}%`,
            left:   `${[10, 80, 60, 20, 85, 45][i]}%`,
            background: i % 2 === 0
              ? 'radial-gradient(circle, rgba(242,101,34,0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(29,111,164,0.15) 0%, transparent 70%)',
          }}
        />
      ))}

      {/* ── Linha decorativa laranja – esquerda ────────────────────────── */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-brand-orange to-transparent opacity-60" />

      {/* ── Conteúdo principal ─────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">

        {/* Tag de localização */}
        <div ref={taglineRef} className="flex items-center gap-3 mb-8">
          <span className="inline-block w-8 h-px bg-brand-orange" />
          <span className="text-xs font-sans font-medium text-brand-orange uppercase tracking-[0.3em]">
            Uberaba — Minas Gerais
          </span>
        </div>

        {/* Headline principal */}
        <div className="overflow-hidden mb-4">
          <h1
            ref={headline1Ref}
            className="font-display font-black leading-none text-white"
            style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)' }}
          >
            {'Nós Construímos'.split(' ').map((w, i) => (
              <span key={i} className="word inline-block mr-[0.25em] overflow-hidden">
                {w}
              </span>
            ))}
          </h1>
        </div>

        {/* Linha 2 com palavra rotativa */}
        <div ref={headline2Ref} className="flex flex-wrap items-baseline gap-x-4 mb-10">
          <span
            className="font-display font-black italic text-brand-orange leading-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)' }}
          >
            Grandes
          </span>
          <span
            ref={wordRef}
            className="font-display font-black leading-none text-white/90 transition-all"
            style={{ fontSize: 'clamp(3rem, 8vw, 7.5rem)' }}
          >
            {ROTATING_WORDS[0]}
          </span>
        </div>

        {/* Subtítulo */}
        <p
          ref={subRef}
          className="max-w-xl text-base md:text-lg text-white/60 leading-relaxed font-sans font-light mb-12"
        >
          Dedicação, experiência e uma paixão pela perfeição. Mais de 15 anos transformando
          sonhos em estruturas sólidas e duradouras no Triângulo Mineiro.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} className="flex flex-wrap gap-4 items-center">
          <a
            href="#projetos"
            onClick={(e) => { e.preventDefault(); document.querySelector('#projetos')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-orange text-white
                       font-semibold uppercase tracking-widest text-sm rounded-sm
                       hover:bg-brand-amber shadow-xl shadow-brand-orange/40
                       transition-all duration-300 hover:shadow-brand-orange/60 hover:scale-[1.03]"
          >
            Ver Projetos
            <ArrowDown size={16} className="group-hover:translate-y-1 transition-transform duration-300" />
          </a>

          {/*
            ── BOTÃO "VER SHOWREEL" ─────────────────────────────────────
            Ao adicionar o vídeo showreel da empresa, este botão abrirá
            um modal/lightbox. Por enquanto leva para a seção de projetos.
          */}
          <button
            className="group inline-flex items-center gap-3 px-8 py-4 border border-white/30
                       text-white font-medium text-sm rounded-sm hover:border-brand-orange
                       hover:text-brand-orange transition-all duration-300"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-current
                             group-hover:bg-brand-orange group-hover:border-brand-orange transition-all duration-300">
              <Play size={12} fill="currentColor" />
            </span>
            Ver Showreel {/* ↑ Botão para vídeo institucional da AR3 */}
          </button>
        </div>

        {/* Badges de credibilidade */}
        <div className="mt-16 flex flex-wrap items-center gap-8">
          {[
            { value: '15+', label: 'Anos de Experiência' },
            { value: '200+', label: 'Obras Entregues'     },
            { value: '100%', label: 'Satisfação Garantida' },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <span className="text-2xl font-display font-black text-brand-orange">{stat.value}</span>
              <span className="text-xs text-white/50 uppercase tracking-wider leading-tight max-w-[80px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Indicador de scroll ────────────────────────────────────────── */}
      <div
        ref={scrollRef}
        onClick={scrollDown}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center
                   gap-2 cursor-pointer group z-10"
      >
        <span className="text-[10px] text-white/40 uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-px h-14 bg-gradient-to-b from-white/40 to-transparent
                        group-hover:from-brand-orange transition-colors duration-300" />
      </div>

      {/* ── Número da seção decorativo ─────────────────────────────────── */}
      <div
        className="absolute bottom-10 right-8 text-[8rem] font-display font-black
                   leading-none select-none pointer-events-none
                   text-white/[0.03]"
      >
        01
      </div>
    </section>
  )
}
