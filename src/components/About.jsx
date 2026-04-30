import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Pontos de destaque da empresa ─────────────────────────────────────────
const HIGHLIGHTS = [
  'Construções residenciais de alto padrão',
  'Edifícios corporativos e comerciais',
  'Acompanhamento transparente da obra',
  'Equipe própria de engenharia e arquitetura',
  'Materiais certificados e fornecedores parceiros',
  'Prazo e orçamento sempre cumpridos',
]

export default function About() {
  const sectionRef  = useRef(null)
  const labelRef    = useRef(null)
  const titleRef    = useRef(null)
  const bodyRef     = useRef(null)
  const listRef     = useRef(null)
  const imageRef    = useRef(null)
  const accentRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      // ── Label da seção ──────────────────────────────────────────────
      gsap.from(labelRef.current, {
        x: -40, opacity: 0, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%' },
      })

      // ── Título ─────────────────────────────────────────────────────
      gsap.from(titleRef.current.children, {
        y: 60, opacity: 0, stagger: 0.12, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 82%' },
      })

      // ── Parágrafo ──────────────────────────────────────────────────
      gsap.from(bodyRef.current, {
        y: 30, opacity: 0, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: bodyRef.current, start: 'top 85%' },
      })

      // ── Lista de destaques ─────────────────────────────────────────
      gsap.from(listRef.current.children, {
        x: -30, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'expo.out',
        scrollTrigger: { trigger: listRef.current, start: 'top 85%' },
      })

      // ── Imagem / bloco visual ──────────────────────────────────────
      gsap.from(imageRef.current, {
        x: 80, opacity: 0, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: imageRef.current, start: 'top 80%' },
      })

      // ── Parallax suave na imagem ao rolar ──────────────────────────
      gsap.to(imageRef.current, {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end:   'bottom top',
          scrub: 2,
        },
      })

      // ── Acento laranja ─────────────────────────────────────────────
      gsap.from(accentRef.current, {
        scaleY: 0, transformOrigin: 'top', duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: accentRef.current, start: 'top 80%' },
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative py-32 bg-brand-offwhite overflow-hidden"
    >
      {/* Número decorativo de fundo */}
      <div className="absolute top-10 right-8 text-[10rem] font-display font-black
                      leading-none select-none pointer-events-none text-brand-navy/[0.04]">
        02
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">

        {/* ── Coluna de texto ─────────────────────────────────────────── */}
        <div>
          {/* Label */}
          <div ref={labelRef} className="flex items-center gap-3 mb-6">
            <span className="inline-block w-8 h-px bg-brand-orange" />
            <span className="text-xs font-sans font-semibold text-brand-orange uppercase tracking-[0.3em]">
              Sobre a AR3
            </span>
          </div>

          {/* Título */}
          <div ref={titleRef} className="overflow-hidden mb-8">
            <h2 className="font-display font-black text-brand-navy leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
              <span className="block">Dedicação, experiência</span>
              <span className="block italic text-brand-sky">e paixão pela</span>
              <span className="block">perfeição.</span>
            </h2>
          </div>

          {/* Corpo */}
          <div ref={bodyRef} className="space-y-4 text-brand-dark/70 leading-relaxed font-sans mb-10">
            <p>
              Na AR3 Construtora, nosso foco é em <strong className="text-brand-navy font-semibold">você</strong> e
              no que você deseja conquistar. Nos orgulhamos de construir relações sólidas e duradouras,
              que nos permitem crescer junto com nossos clientes ao longo do tempo.
            </p>
            <p>
              Nossa vontade de trabalhar em parceria com quem compartilha dos mesmos valores é o que faz
              com que muitos dos nossos clientes possuam um histórico de múltiplos projetos conosco.
              Superar expectativas resultou em negócios recorrentes em toda a região do Triângulo Mineiro.
            </p>
            <p>
              Acreditamos firmemente: <em className="text-brand-sky">se você consegue sonhar, nós conseguimos construir.</em>
            </p>
          </div>

          {/* Lista de destaques */}
          <ul ref={listRef} className="space-y-3 mb-10">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-brand-dark/80 font-sans">
                <CheckCircle size={18} className="text-brand-orange flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>

          {/* CTA interno */}
          <a
            href="#contato"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-3 text-sm font-semibold text-brand-navy
                       uppercase tracking-widest group"
          >
            <span>Fale com nossos especialistas</span>
            <span className="inline-block w-8 h-px bg-brand-navy group-hover:w-16
                             group-hover:bg-brand-orange transition-all duration-500" />
          </a>
        </div>

        {/* ── Coluna visual ─────────────────────────────────────────────── */}
        <div className="relative">
          {/* Acento laranja vertical */}
          <div
            ref={accentRef}
            className="absolute -left-6 top-12 bottom-12 w-1 bg-brand-orange rounded-full"
          />

          {/*
            ──────────────────────────────────────────────────────────────
            IMAGEM SOBRE A EMPRESA
            ➤ Substitua o bloco abaixo pela imagem real:
               <img
                 src="/images/sobre-ar3.jpg"
                 alt="Equipe AR3 Construtora"
                 className="w-full h-full object-cover"
               />
            ➤ Sugestão: foto da equipe, escritório ou de uma obra
               em andamento de alto padrão.
            ──────────────────────────────────────────────────────────────
          */}
          <div
            ref={imageRef}
            className="relative overflow-hidden rounded-sm shadow-2xl"
            style={{ height: 'clamp(400px, 50vw, 620px)' }}
          >
            {/* Placeholder visual até inserir a imagem real */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-sky to-brand-navy
                            flex flex-col items-center justify-center">
              <p className="text-white/30 text-xs uppercase tracking-widest text-center px-8">
                {/* ↓ Texto guia – remova ao inserir a imagem */}
                Insira aqui uma foto da equipe AR3<br />ou de uma obra de destaque
              </p>
            </div>

            {/* Overlay gradiente decorativo */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />

            {/* Badge sobre a imagem */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-sm p-4">
                <p className="text-white text-sm font-semibold">AR3 Construtora</p>
                <p className="text-white/60 text-xs mt-1">Uberaba – MG | Desde 2009</p>
              </div>
            </div>
          </div>

          {/*
            ── CARD FLUTUANTE com uma mini-foto secundária ───────────────
            ➤ Substitua o placeholder abaixo por uma imagem de detalhe
               construtivo (acabamento, estrutura, etc.):
               <img src="/images/detalhe-construtivo.jpg" ... />
          */}
          <div className="absolute -bottom-8 -right-6 w-48 h-32 rounded-sm shadow-xl overflow-hidden
                          border-4 border-white">
            <div className="w-full h-full bg-brand-orange/80 flex items-center justify-center">
              <p className="text-white text-[10px] text-center uppercase tracking-widest px-3">
                {/* ↓ Mini-foto de detalhe construtivo */}
                Foto detalhe<br />construtivo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
