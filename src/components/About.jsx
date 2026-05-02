import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Award, Users, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PILLARS = [
  { Icon: Award,       title: 'Excelência Técnica',  text: 'Engenheiros e mestres de obra certificados, utilizando as melhores práticas e materiais do mercado.' },
  { Icon: CheckCircle, title: 'Entrega no Prazo',     text: 'Gestão de cronograma rigorosa com tecnologia BIM, garantindo transparência em cada etapa da obra.' },
  { Icon: Users,       title: 'Time Especializado',   text: 'Equipe própria, treinada e comprometida — do projeto ao acabamento final, sem terceirizações críticas.' },
]

export default function About() {
  const sectionRef = useRef(null)
  const tagRef     = useRef(null)
  const headRef    = useRef(null)
  const textRef    = useRef(null)
  const pillarsRef = useRef([])
  const imgRef     = useRef(null)
  const wmarkRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: sectionRef.current, start: 'top 75%' }

      gsap.from(wmarkRef.current, {
        x: 60, opacity: 0, duration: 1.6, ease: 'expo.out',
        scrollTrigger: st,
      })
      gsap.from([tagRef.current, headRef.current, textRef.current], {
        y: 40, opacity: 0, stagger: 0.15, duration: 1.1, ease: 'expo.out',
        scrollTrigger: st,
      })
      gsap.from(pillarsRef.current, {
        y: 30, opacity: 0, stagger: 0.12, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      })
      gsap.from(imgRef.current, {
        x: 60, opacity: 0, duration: 1.3, ease: 'expo.out',
        scrollTrigger: st,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="sobre" ref={sectionRef}
             className="relative py-32 bg-brand-offwhite overflow-hidden">

      {/* Marca-d'água editorial */}
      <div ref={wmarkRef}
           className="absolute right-0 top-1/2 -translate-y-1/2 font-display font-black
                      text-brand-navy/[0.03] select-none pointer-events-none leading-none"
           style={{ fontSize: 'clamp(10rem, 20vw, 18rem)' }}>
        1809
      </div>

      {/* Linha laranja lateral */}
      <div className="absolute left-0 top-0 bottom-0 w-px
                      bg-gradient-to-b from-transparent via-brand-orange/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* ── Coluna esquerda ──────────────────────────────────────── */}
          <div>
            {/* Tag */}
            <div ref={tagRef} className="flex items-center gap-4 mb-8">
              <div className="w-px h-10 bg-brand-orange" />
              <span className="text-[10px] font-sans font-medium text-brand-orange uppercase tracking-[0.35em]">
                Quem somos
              </span>
            </div>

            {/* Headline */}
            <h2 ref={headRef}
                className="font-display font-black text-brand-navy leading-[0.95] mb-10"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 4.2rem)' }}>
              Construindo o
              <br />
              <span className="italic text-gradient-brand">Triângulo Mineiro</span>
              <br />
              desde 2009
            </h2>

            {/* Texto */}
            <div ref={textRef} className="space-y-5 mb-14">
              <p className="text-brand-navy/55 text-[15px] leading-[1.9] font-sans font-light">
                A AR3 Construtora nasceu da visão de profissionais que acreditam que uma obra
                bem feita vai além de paredes e lajes — ela representa o futuro de famílias
                e negócios. Com sede em Uberaba/MG, atuamos em todo o Triângulo Mineiro.
              </p>
              <p className="text-brand-navy/55 text-[15px] leading-[1.9] font-sans font-light">
                Nossa abordagem une rigor técnico, estética refinada e gestão transparente.
                Cada projeto recebe atenção personalizada, do primeiro croqui às chaves entregues.
              </p>
            </div>

            {/* Pilares */}
            <div className="space-y-6">
              {PILLARS.map((p, i) => (
                <div key={p.title}
                     ref={(el) => (pillarsRef.current[i] = el)}
                     className="flex gap-5 group">
                  <div className="shrink-0 w-10 h-10 border border-brand-navy/15 flex items-center justify-center
                                  group-hover:border-brand-orange group-hover:bg-brand-orange/5
                                  transition-all duration-400">
                    <p.Icon size={16} className="text-brand-navy/40 group-hover:text-brand-orange transition-colors duration-300" />
                  </div>
                  <div>
                    <h4 className="text-brand-navy font-sans font-semibold text-sm uppercase tracking-[0.12em] mb-1.5">
                      {p.title}
                    </h4>
                    <p className="text-brand-navy/45 text-[13px] leading-[1.8] font-sans font-light">
                      {p.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Coluna direita – imagem ───────────────────────────────── */}
          <div ref={imgRef} className="relative">
            {/* Moldura decorativa deslocada */}
            <div className="absolute -top-4 -right-4 w-full h-full border border-brand-gold/20 z-0" />

            {/* Bloco da imagem */}
            <div className="relative z-10 aspect-[4/5] bg-brand-navy/8 overflow-hidden">
              {/*
                ↓ SUBSTITUA pelo src real:
                   <img src="/images/equipe-ar3.jpg" alt="Equipe AR3 Construtora"
                        className="w-full h-full object-cover" />
              */}
              <div className="w-full h-full flex items-center justify-center
                              bg-gradient-to-br from-brand-navy/10 to-brand-navy/30">
                <div className="text-center px-8">
                  <div className="w-16 h-16 border border-brand-navy/20 flex items-center justify-center mx-auto mb-4">
                    <span className="font-display font-black text-brand-navy/20 text-xl">AR3</span>
                  </div>
                  <p className="text-brand-navy/25 text-xs font-sans uppercase tracking-[0.2em]">
                    Foto da equipe AR3
                  </p>
                  {/* ↑ Insira aqui uma foto da equipe AR3 Construtora */}
                </div>
              </div>
            </div>

            {/* Badge flutuante */}
            <div className="absolute -bottom-6 -left-6 bg-brand-navy px-6 py-4 z-20">
              <p className="text-[10px] text-brand-gold/70 uppercase tracking-[0.25em] font-sans mb-1">
                Fundada em
              </p>
              <p className="font-display font-black text-white text-3xl leading-none">2009</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
