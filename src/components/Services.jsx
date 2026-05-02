import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Home, Building2, Wrench, Palette, Layers, Plus, Minus } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    num: '01',
    Icon: Home,
    title: 'Construção Residencial',
    description: 'Casas e mansões de alto padrão com arquitetura contemporânea, acabamentos premium e total personalização. Cada detalhe planejado para superar expectativas.',
    items: ['Projetos exclusivos', 'Acabamentos importados', 'Smart home integrado', 'Gerenciamento completo de obra'],
  },
  {
    num: '02',
    Icon: Building2,
    title: 'Obras Comerciais',
    description: 'Edifícios corporativos, shoppings, clínicas e galpões logísticos com engenharia de ponta, entrega no prazo e controle rigoroso de custos.',
    items: ['Estruturas metálicas e concreto', 'Fachadas em vidro e ACM', 'Automação predial', 'Certificações LEED e ABNT'],
  },
  {
    num: '03',
    Icon: Wrench,
    title: 'Reformas e Renovações',
    description: 'Transformação completa de espaços residenciais e comerciais. Respeitamos a estrutura existente enquanto modernizamos cada detalhe com expertise.',
    items: ['Diagnóstico estrutural', 'Projetos de interiores', 'Retrofit elétrico e hidráulico', 'Prazo e orçamento garantidos'],
  },
  {
    num: '04',
    Icon: Palette,
    title: 'Design de Interiores',
    description: 'Projetos de interiores exclusivos que harmonizam estética e funcionalidade, criando ambientes únicos que refletem a personalidade de cada cliente.',
    items: ['Conceituação e moodboard', 'Mobiliário sob medida', 'Iluminação técnica e cenográfica', 'Acompanhamento de execução'],
  },
  {
    num: '05',
    Icon: Layers,
    title: 'Incorporação Imobiliária',
    description: 'Desenvolvimento completo de empreendimentos imobiliários — da aquisição do terreno ao habite-se — com inteligência de mercado e rigor construtivo.',
    items: ['Estudos de viabilidade', 'Aprovação de projetos', 'Gestão de vendas', 'Pós-obra e garantia'],
  },
]

export default function Services() {
  const sectionRef  = useRef(null)
  const headerRef   = useRef(null)
  const itemsRef    = useRef([])
  const [open, setOpen] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40, opacity: 0, duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from(itemsRef.current, {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="servicos" ref={sectionRef}
             className="relative py-32 bg-brand-offwhite overflow-hidden">

      {/* Acento vertical laranja */}
      <div className="absolute left-0 top-0 bottom-0 w-px
                      bg-gradient-to-b from-transparent via-brand-orange/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-8">

        {/* Header */}
        <div ref={headerRef} className="grid lg:grid-cols-2 gap-8 items-end mb-20">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-brand-orange" />
              <span className="text-[10px] font-sans font-medium text-brand-orange uppercase tracking-[0.35em]">
                O que fazemos
              </span>
            </div>
            <h2 className="font-display font-black text-brand-navy leading-none"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
              Serviços
              <br />
              <span className="italic text-gradient-brand">Especializados</span>
            </h2>
          </div>
          <p className="text-brand-navy/50 text-[15px] leading-[1.9] font-sans font-light lg:mb-1">
            Da concepção ao acabamento final, cada obra AR3 é tratada com o cuidado
            e a precisão que seu projeto merece. Excelência em cada etapa.
          </p>
        </div>

        {/* Accordion de serviços */}
        <div className="border-t border-brand-navy/10">
          {SERVICES.map((svc, i) => {
            const isOpen = open === i
            return (
              <div key={svc.num}
                   ref={(el) => (itemsRef.current[i] = el)}
                   className="border-b border-brand-navy/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-6 py-7 text-left group
                             hover:bg-brand-navy/[0.02] transition-colors duration-300 px-2">
                  {/* Número */}
                  <span className={`font-mono text-xs font-medium tracking-[0.15em] transition-colors duration-300 w-8 shrink-0 ${isOpen ? 'text-brand-orange' : 'text-brand-navy/25'}`}>
                    {svc.num}
                  </span>
                  {/* Ícone */}
                  <span className={`w-8 h-8 shrink-0 flex items-center justify-center border transition-all duration-300 ${isOpen ? 'border-brand-orange bg-brand-orange text-white' : 'border-brand-navy/20 text-brand-navy/40 group-hover:border-brand-orange/50 group-hover:text-brand-orange'}`}>
                    <svc.Icon size={15} />
                  </span>
                  {/* Título */}
                  <span className={`flex-1 font-display font-black transition-colors duration-300 ${isOpen ? 'text-brand-orange' : 'text-brand-navy group-hover:text-brand-orange'}`}
                        style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>
                    {svc.title}
                  </span>
                  {/* Toggle */}
                  <span className={`shrink-0 w-7 h-7 flex items-center justify-center border transition-all duration-300 ${isOpen ? 'border-brand-orange bg-brand-orange text-white' : 'border-brand-navy/20 text-brand-navy/40'}`}>
                    {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                  </span>
                </button>

                {/* Conteúdo expandido */}
                <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-80 pb-8' : 'max-h-0'}`}>
                  <div className="grid lg:grid-cols-2 gap-10 pl-[5.5rem] pr-2">
                    <p className="text-brand-navy/55 text-[14px] leading-[1.9] font-sans font-light">
                      {svc.description}
                    </p>
                    <ul className="space-y-3">
                      {svc.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-[13px] text-brand-navy/60 font-sans">
                          <span className="w-1 h-1 rounded-full bg-brand-gold shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 flex items-center justify-between flex-wrap gap-6">
          <p className="text-brand-navy/40 text-sm font-sans font-light">
            Não encontrou o que procura? Fale diretamente com nossa equipe.
          </p>
          <a href="#contato"
             onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }) }}
             className="group inline-flex items-center gap-3 px-8 py-3.5 border border-brand-navy/20
                        text-brand-navy text-[11px] font-semibold uppercase tracking-[0.2em]
                        hover:border-brand-orange hover:text-brand-orange
                        transition-all duration-300">
            Solicitar Orçamento
            <span className="w-6 h-px bg-current group-hover:w-10 transition-all duration-400" />
          </a>
        </div>
      </div>
    </section>
  )
}
