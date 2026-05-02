import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 15,   suffix: '+', label: 'Anos de Experiência',     sub: 'Construindo desde 2009'            },
  { value: 200,  suffix: '+', label: 'Obras Entregues',         sub: 'Triângulo Mineiro e região'        },
  { value: 98,   suffix: '%', label: 'Satisfação dos Clientes', sub: 'Pesquisa pós-obra'                 },
  { value: 1200, suffix: '',  label: 'Empregos Gerados',        sub: 'Diretos e indiretos'               },
]

export default function Stats() {
  const sectionRef  = useRef(null)
  const numbersRef  = useRef([])
  const labelsRef   = useRef([])
  const hasAnimated = useRef(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(labelsRef.current, {
        y: 50, opacity: 0, stagger: 0.15, duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 75%',
        onEnter: () => {
          if (hasAnimated.current) return
          hasAnimated.current = true
          numbersRef.current.forEach((el, i) => {
            if (!el) return
            const { value, suffix } = STATS[i]
            gsap.fromTo(
              { val: 0 },
              {
                val: value, duration: 2.8, ease: 'power3.out',
                onUpdate: function () {
                  el.textContent = Math.round(this.targets()[0].val) + suffix
                },
              }
            )
          })
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-32 bg-brand-navy overflow-hidden">
      {/* Grade sutil */}
      <div className="absolute inset-0 opacity-[0.04]"
           style={{
             backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
             backgroundSize: '60px 60px',
           }} />

      {/* Linha dourada topo */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-8">
        {/* Header editorial */}
        <div className="flex items-center gap-6 mb-20">
          <div className="w-px h-12 bg-brand-gold/60" />
          <div>
            <p className="text-[10px] text-brand-gold/70 uppercase tracking-[0.35em] font-sans mb-1">
              Números que comprovam
            </p>
            <h2 className="text-white font-display font-black text-3xl tracking-tight">
              Nossa Trajetória
            </h2>
          </div>
        </div>

        {/* Grid de stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <div key={stat.label}
                 ref={(el) => (labelsRef.current[i] = el)}
                 className="relative py-12 px-8 border-t border-white/[0.08]
                            lg:border-t-0 lg:border-l lg:first:border-l-0
                            group hover:bg-white/[0.02] transition-colors duration-500">
              {/* Número */}
              <div className="mb-4">
                <span ref={(el) => (numbersRef.current[i] = el)}
                      className="font-display font-black leading-none text-white
                                 group-hover:text-brand-gold transition-colors duration-500"
                      style={{ fontSize: 'clamp(3.5rem, 5.5vw, 5.5rem)' }}>
                  0{stat.suffix}
                </span>
              </div>
              {/* Label */}
              <p className="text-white/80 font-sans font-medium text-sm uppercase tracking-[0.12em] mb-1.5">
                {stat.label}
              </p>
              {/* Sublabel */}
              <p className="text-white/25 font-sans font-light text-xs tracking-wide">
                {stat.sub}
              </p>
              {/* Acento dourado no hover */}
              <div className="absolute bottom-0 left-8 w-0 h-px bg-brand-gold
                              group-hover:w-12 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      {/* Linha dourada base */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent" />
    </section>
  )
}
