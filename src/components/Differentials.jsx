import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Gem, MessageSquare, Users, TrendingUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ─── Diferenciais da AR3 ────────────────────────────────────────────────────
const DIFFERENTIALS = [
  {
    icon: Gem,
    title: 'Os Detalhes',
    subtitle: 'Acabamento de luxo',
    points: [
      'Acabamentos de altíssimo padrão',
      'Atenção meticulosa a cada detalhe',
      'A sua obra é a nossa obra',
    ],
    color: 'text-brand-orange',
    border: 'border-brand-orange',
  },
  {
    icon: MessageSquare,
    title: 'Comunicação Aberta',
    subtitle: 'Transparência total',
    points: [
      'Atualizações contínuas e diárias',
      'Plataforma de acompanhamento online',
      'Relatórios mensais de evolução',
    ],
    color: 'text-brand-sky',
    border: 'border-brand-sky',
  },
  {
    icon: Users,
    title: 'Equipe Qualificada',
    subtitle: 'Profissionais de excelência',
    points: [
      'Engenheiros e arquitetos próprios',
      'Fornecedores parceiros certificados',
      'Treinamento contínuo da equipe',
    ],
    color: 'text-brand-orange',
    border: 'border-brand-orange',
  },
  {
    icon: TrendingUp,
    title: 'Superando Expectativas',
    subtitle: 'Resultados acima do esperado',
    points: [
      'Buscamos a perfeição em cada etapa',
      'Seguimos cada compromisso até o fim',
      'Entregamos além do combinado',
    ],
    color: 'text-brand-sky',
    border: 'border-brand-sky',
  },
]

export default function Differentials() {
  const sectionRef = useRef(null)
  const labelRef   = useRef(null)
  const titleRef   = useRef(null)
  const textRef    = useRef(null)
  const cardsRef   = useRef([])
  const imageRef   = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.from(labelRef.current, {
        x: -40, opacity: 0, duration: 0.8, ease: 'expo.out',
        scrollTrigger: { trigger: labelRef.current, start: 'top 85%' },
      })

      gsap.from(titleRef.current.children, {
        y: 60, opacity: 0, stagger: 0.12, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
      })

      gsap.from(textRef.current, {
        y: 30, opacity: 0, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: textRef.current, start: 'top 87%' },
      })

      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          y: 60, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'expo.out',
          delay: i * 0.12,
          scrollTrigger: { trigger: card, start: 'top 90%' },
        })
      })

      gsap.from(imageRef.current, {
        x: 80, opacity: 0, duration: 1.2, ease: 'expo.out',
        scrollTrigger: { trigger: imageRef.current, start: 'top 80%' },
      })

    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="diferenciais"
      ref={sectionRef}
      className="relative py-32 bg-brand-navy overflow-hidden"
    >
      {/* Número decorativo */}
      <div className="absolute top-10 right-8 text-[10rem] font-display font-black
                      leading-none select-none pointer-events-none text-white/[0.03]">
        05
      </div>

      {/* Grade de fundo sutil */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 80px,
            rgba(255,255,255,0.5) 80px, rgba(255,255,255,0.5) 81px
          ),
          repeating-linear-gradient(
            90deg, transparent, transparent 80px,
            rgba(255,255,255,0.5) 80px, rgba(255,255,255,0.5) 81px
          )`,
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* ── Coluna esquerda ─────────────────────────────────────── */}
          <div>
            <div ref={labelRef} className="flex items-center gap-3 mb-6">
              <span className="inline-block w-8 h-px bg-brand-orange" />
              <span className="text-xs font-sans font-semibold text-brand-orange uppercase tracking-[0.3em]">
                Diferenciais
              </span>
            </div>

            <div ref={titleRef} className="overflow-hidden mb-8">
              <h2 className="font-display font-black text-white leading-tight"
                  style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
                <span className="block">No que somos</span>
                <span className="block italic text-brand-orange">especialistas.</span>
              </h2>
            </div>

            <p ref={textRef} className="text-white/60 text-base leading-relaxed mb-12 max-w-md">
              A paixão da AR3 é construir obras incríveis. Desde a fundação, estrutura e detalhes
              externos até os acabamentos de luxo nos pisos, marcenarias e elétrica — nossa atenção
              meticulosa e atitude de "vamos conseguir" garantem que construir ou reformar com a AR3
              será inesquecível por todos os motivos certos.
            </p>

            {/* Cards de diferenciais */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {DIFFERENTIALS.map((diff, i) => {
                const Icon = diff.icon
                return (
                  <div
                    key={diff.title}
                    ref={(el) => (cardsRef.current[i] = el)}
                    className={`group p-6 border ${diff.border} border-opacity-20 rounded-sm
                                 hover:border-opacity-60 transition-all duration-400
                                 hover:bg-white/5 bg-white/[0.02]`}
                  >
                    <Icon size={28} className={`${diff.color} mb-4`} strokeWidth={1.5} />
                    <h3 className="font-display font-bold text-white text-lg mb-1">{diff.title}</h3>
                    <p className="text-white/40 text-xs mb-4 uppercase tracking-wider">{diff.subtitle}</p>
                    <ul className="space-y-2">
                      {diff.points.map((pt) => (
                        <li key={pt} className="text-xs text-white/60 flex items-start gap-2">
                          <span className={`w-1 h-1 rounded-full mt-1.5 flex-shrink-0 ${diff.color} bg-current`} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>

          {/* ── Coluna direita – imagem "excelência em" ──────────────── */}
          <div ref={imageRef} className="lg:sticky lg:top-32">

            {/*
              ──────────────────────────────────────────────────────────────
              IMAGEM DE DESTAQUE – SEÇÃO DIFERENCIAIS
              ➤ Substitua o bloco abaixo por uma imagem de alto padrão:
                 <img
                   src="/images/diferenciais-obra.jpg"
                   alt="Detalhe de acabamento AR3"
                   className="w-full h-full object-cover rounded-sm"
                 />
              ➤ Sugestão: foto em close de acabamento premium —
                 mármore, esquadria, detalhe de fachada, etc.
              ──────────────────────────────────────────────────────────────
            */}
            <div className="relative overflow-hidden rounded-sm"
                 style={{ height: 'clamp(380px, 50vw, 560px)' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-navy to-brand-orange/20
                              flex items-center justify-center">
                <p className="text-white/20 text-xs uppercase tracking-widest text-center px-8">
                  {/* ↓ Remova ao inserir a imagem de detalhe construtivo */}
                  Foto de detalhe construtivo premium<br />(mármore, fachada, esquadria, etc.)
                </p>
              </div>

              {/* Overlay com texto sobreposto */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent" />

              {/* Texto flutuante sobre a imagem */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-display font-black text-4xl text-white leading-none mb-2">
                  "Se você consegue<br />
                  <span className="text-brand-orange italic">sonhar</span>, nós<br />
                  conseguimos construir."
                </p>
                <p className="text-white/50 text-sm mt-4">— AR3 Construtora</p>
              </div>
            </div>

            {/* Card CTA abaixo da imagem */}
            <div className="mt-6 p-6 bg-brand-orange/10 border border-brand-orange/30 rounded-sm">
              <p className="text-white/80 text-sm mb-4">
                Pronto para começar o seu projeto dos sonhos?
              </p>
              <a
                href="#contato"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="inline-flex items-center gap-2 text-brand-orange text-sm font-semibold
                           uppercase tracking-widest hover:gap-4 transition-all duration-300"
              >
                Falar com a equipe →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
