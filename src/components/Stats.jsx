import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Dados dos contadores ───────────────────────────────────────────────────
const STATS = [
  { value: 15,   suffix: '+', label: 'Anos de Experiência',    description: 'Construindo sonhos desde 2009'         },
  { value: 200,  suffix: '+', label: 'Obras Entregues',        description: 'Em toda a região do Triângulo Mineiro' },
  { value: 98,   suffix: '%', label: 'Satisfação dos Clientes', description: 'Medido via pesquisa pós-obra'          },
  { value: 1200, suffix: '',  label: 'Empregos Gerados',       description: 'Diretos e indiretos na região'         },
]

export default function Stats() {
  const sectionRef  = useRef(null)
  const labelsRef   = useRef([])
  const numbersRef  = useRef([])
  const hasAnimated = useRef(false)

  // ── Animação de contagem dos números ──────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Animação de entrada das labels
      gsap.from(labelsRef.current, {
        y: 40, opacity: 0, stagger: 0.15, duration: 0.9, ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })

      // Contagem numérica animada
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
              { val: value, duration: 2.5, ease: 'power2.out',
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
    <section
      ref={sectionRef}
      className="relative py-24 bg-brand-orange overflow-hidden"
    >
      {/* Textura de fundo sutil */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg, transparent, transparent 20px,
            rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px
          )`,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-0 lg:divide-x lg:divide-white/30">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              ref={(el) => (labelsRef.current[i] = el)}
              className="flex flex-col items-center lg:items-start text-center lg:text-left lg:px-10 first:lg:pl-0 last:lg:pr-0"
            >
              {/* Número animado */}
              <div className="flex items-end gap-1 mb-2">
                <span
                  ref={(el) => (numbersRef.current[i] = el)}
                  className="font-display font-black text-white leading-none"
                  style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)' }}
                >
                  0{stat.suffix}
                </span>
              </div>

              {/* Label */}
              <p className="text-white font-semibold text-sm uppercase tracking-wider mb-1">
                {stat.label}
              </p>

              {/* Descrição */}
              <p className="text-white/60 text-xs leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
