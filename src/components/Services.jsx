import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Home, Building2, Wrench, Palette, Layers, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ─── Serviços oferecidos ────────────────────────────────────────────────────
const SERVICES = [
  {
    icon: Home,
    title: 'Construção Residencial',
    description:
      'Casas e mansões de alto padrão com arquitetura contemporânea, acabamentos premium e total personalização conforme o desejo do cliente.',
    items: ['Projetos exclusivos', 'Acabamentos importados', 'Smart home integrado'],
    accent: 'bg-brand-orange',
  },
  {
    icon: Building2,
    title: 'Obras Comerciais',
    description:
      'Edifícios corporativos, shoppings, clínicas e galpões logísticos com engenharia de ponta e entrega dentro do prazo e orçamento.',
    items: ['Estruturas metálicas', 'Fachadas em vidro', 'Automação predial'],
    accent: 'bg-brand-sky',
  },
  {
    icon: Wrench,
    title: 'Reformas e Renovações',
    description:
      'Transformação completa de ambientes residenciais e comerciais, respeitando a estrutura existente e modernizando cada detalhe.',
    items: ['Projetos de reforma', 'Ampliações', 'Retrofit de fachadas'],
    accent: 'bg-brand-orange',
  },
  {
    icon: Palette,
    title: 'Design & Interiores',
    description:
      'Acompanhamento de design de interiores parceiro para ambientes que refletem a identidade do cliente com sofisticação e funcionalidade.',
    items: ['Marcenaria sob medida', 'Iluminação cenográfica', 'Revestimentos exclusivos'],
    accent: 'bg-brand-sky',
  },
  {
    icon: Layers,
    title: 'Incorporação Imobiliária',
    description:
      'Desenvolvimento de empreendimentos residenciais e mistos — do terreno à entrega das chaves — com valorização garantida.',
    items: ['Lançamentos', 'Condomínios fechados', 'Loteamentos premium'],
    accent: 'bg-brand-orange',
  },
]

// ─── Marquee de palavras decorativas no ticker ─────────────────────────────
const TICKER_WORDS = [
  'Excelência', '·', 'Qualidade', '·', 'Inovação', '·',
  'Precisão', '·', 'Compromisso', '·', 'Alto Padrão', '·',
  'Excelência', '·', 'Qualidade', '·', 'Inovação', '·',
  'Precisão', '·', 'Compromisso', '·', 'Alto Padrão', '·',
]

export default function Services() {
  const sectionRef  = useRef(null)
  const labelRef    = useRef(null)
  const titleRef    = useRef(null)
  const cardsRef    = useRef([])
  const [active, setActive] = useState(0)

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
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          y: 60, opacity: 0, duration: 0.9, ease: 'expo.out',
          delay: i * 0.1,
          scrollTrigger: { trigger: card, start: 'top 90%' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="relative bg-brand-offwhite overflow-hidden"
    >
      {/* ── Ticker / Marquee decorativo ─────────────────────────────── */}
      <div className="bg-brand-orange py-4 overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          {TICKER_WORDS.map((word, i) => (
            <span
              key={i}
              className="mx-6 text-white text-sm font-semibold uppercase tracking-widest"
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      <div className="py-32 max-w-7xl mx-auto px-6">
        {/* Número decorativo */}
        <div className="absolute right-8 text-[10rem] font-display font-black
                        leading-none select-none pointer-events-none text-brand-navy/[0.04]">
          04
        </div>

        {/* ── Cabeçalho ───────────────────────────────────────────── */}
        <div className="mb-16">
          <div ref={labelRef} className="flex items-center gap-3 mb-6">
            <span className="inline-block w-8 h-px bg-brand-orange" />
            <span className="text-xs font-sans font-semibold text-brand-orange uppercase tracking-[0.3em]">
              O Que Fazemos
            </span>
          </div>

          <div ref={titleRef} className="overflow-hidden">
            <h2 className="font-display font-black text-brand-navy leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
              <span className="block">Excelência em cada</span>
              <span className="block italic text-brand-sky">detalhe da obra.</span>
            </h2>
          </div>
        </div>

        {/* ── Cards de serviços ────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                ref={(el) => (cardsRef.current[i] = el)}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                className={`group relative p-8 rounded-sm transition-all duration-500 cursor-default
                             overflow-hidden
                             ${active === i
                               ? 'bg-brand-navy text-white shadow-2xl shadow-brand-navy/30 -translate-y-2'
                               : 'bg-white text-brand-dark hover:shadow-xl'
                             }`}
              >
                {/* Acento colorido no topo */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${service.accent}
                                  transition-opacity duration-300 ${active === i ? 'opacity-100' : 'opacity-40'}`} />

                {/* Número decorativo de fundo */}
                <div className={`absolute bottom-4 right-4 text-7xl font-display font-black
                                  select-none pointer-events-none leading-none
                                  transition-colors duration-300
                                  ${active === i ? 'text-white/[0.05]' : 'text-brand-navy/[0.05]'}`}>
                  {String(i + 1).padStart(2, '0')}
                </div>

                {/* Ícone */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-sm mb-6
                                  transition-all duration-300
                                  ${active === i
                                    ? 'bg-brand-orange text-white'
                                    : 'bg-brand-offwhite text-brand-orange'
                                  }`}>
                  <Icon size={22} strokeWidth={1.5} />
                </div>

                {/* Conteúdo */}
                <h3 className={`font-display font-bold text-xl mb-3 leading-tight
                                  transition-colors duration-300
                                  ${active === i ? 'text-white' : 'text-brand-navy'}`}>
                  {service.title}
                </h3>

                <p className={`text-sm leading-relaxed mb-6 transition-colors duration-300
                                ${active === i ? 'text-white/70' : 'text-brand-dark/60'}`}>
                  {service.description}
                </p>

                {/* Lista de itens */}
                <ul className="space-y-2 mb-6">
                  {service.items.map((item) => (
                    <li key={item} className={`flex items-center gap-2 text-xs uppercase tracking-wider
                                              transition-colors duration-300
                                              ${active === i ? 'text-white/60' : 'text-brand-dark/50'}`}>
                      <span className={`w-1 h-1 rounded-full flex-shrink-0 ${service.accent}`} />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Link */}
                <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-widest
                                  transition-all duration-300 group-hover:gap-4
                                  ${active === i ? 'text-brand-orange' : 'text-brand-sky'}`}>
                  Saiba mais <ArrowRight size={14} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
