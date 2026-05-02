import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    num: '01',
    title: 'Residência Alto do Mirante',
    category: 'Residencial · Alto Padrão',
    location: 'Uberaba, MG',
    area: '680 m²',
    year: '2023',
    image: null,
    gradient: 'from-[#1a2540] to-[#2d4a7a]',
    // ↓ SUBSTITUA: <img src="/images/proj-mirante.jpg" alt="Residência Alto do Mirante" />
  },
  {
    num: '02',
    title: 'Edifício Corporativo Central',
    category: 'Comercial · Escritórios',
    location: 'Uberaba, MG',
    area: '4.200 m²',
    year: '2023',
    image: null,
    gradient: 'from-[#1e3a2f] to-[#2d5a44]',
    // ↓ SUBSTITUA: <img src="/images/proj-corporativo.jpg" alt="Edifício Corporativo Central" />
  },
  {
    num: '03',
    title: 'Condomínio Villa Serrana',
    category: 'Residencial · Condomínio',
    location: 'Uberaba, MG',
    area: '12.000 m²',
    year: '2022',
    image: null,
    gradient: 'from-[#3a1e2a] to-[#5a2d44]',
    // ↓ SUBSTITUA: <img src="/images/proj-villa.jpg" alt="Condomínio Villa Serrana" />
  },
  {
    num: '04',
    title: 'Clínica Saúde & Vida',
    category: 'Comercial · Saúde',
    location: 'Uberlândia, MG',
    area: '1.800 m²',
    year: '2022',
    image: null,
    gradient: 'from-[#1a3040] to-[#2a4d63]',
    // ↓ SUBSTITUA: <img src="/images/proj-clinica.jpg" alt="Clínica Saúde & Vida" />
  },
  {
    num: '05',
    title: 'Mansão Jardim das Acácias',
    category: 'Residencial · Luxo',
    location: 'Uberaba, MG',
    area: '920 m²',
    year: '2021',
    image: null,
    gradient: 'from-[#2a1f10] to-[#4d3820]',
    // ↓ SUBSTITUA: <img src="/images/proj-mansao.jpg" alt="Mansão Jardim das Acácias" />
  },
  {
    num: '06',
    title: 'Galpão Logístico BR-050',
    category: 'Industrial · Logística',
    location: 'Uberaba, MG',
    area: '8.500 m²',
    year: '2021',
    image: null,
    gradient: 'from-[#1a2020] to-[#2d3535]',
    // ↓ SUBSTITUA: <img src="/images/proj-galpao.jpg" alt="Galpão Logístico BR-050" />
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const cardsRef   = useRef([])

  // ── Scroll: body muda de cor ao entrar/sair ─────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter:      () => gsap.to(document.body, { backgroundColor: '#080F1C', duration: 0.9, ease: 'power2.inOut' }),
        onLeave:      () => gsap.to(document.body, { backgroundColor: '#F7F6F2', duration: 0.9, ease: 'power2.inOut' }),
        onEnterBack:  () => gsap.to(document.body, { backgroundColor: '#080F1C', duration: 0.9, ease: 'power2.inOut' }),
        onLeaveBack:  () => gsap.to(document.body, { backgroundColor: '#F7F6F2', duration: 0.9, ease: 'power2.inOut' }),
      })
    })
    return () => ctx.revert()
  }, [])

  // ── Animações de entrada ─────────────────────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: 40, opacity: 0, duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from(cardsRef.current, {
        y: 60, opacity: 0, stagger: 0.1, duration: 1.0, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projetos" ref={sectionRef}
             className="relative py-32 overflow-hidden">

      {/* Grade sutil (aparece no bg escuro) */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
           style={{
             backgroundImage: 'linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)',
             backgroundSize: '80px 80px',
           }} />

      <div className="max-w-7xl mx-auto px-8">

        {/* Header */}
        <div ref={headerRef} className="flex items-end justify-between flex-wrap gap-8 mb-16">
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-brand-gold" />
              <span className="text-[10px] font-sans font-medium text-brand-gold/70 uppercase tracking-[0.35em]">
                Portfólio
              </span>
            </div>
            <h2 className="font-display font-black text-white leading-none"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 4.5rem)' }}>
              Projetos
              <br />
              <span className="italic text-gradient-gold">Realizados</span>
            </h2>
          </div>
          <p className="max-w-sm text-white/35 text-[14px] leading-[1.9] font-sans font-light">
            Obras que expressam nossa filosofia: técnica rigorosa, estética apurada
            e comprometimento total com cada cliente.
          </p>
        </div>

        {/* Grid de projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
          {PROJECTS.map((proj, i) => (
            <div key={proj.num}
                 ref={(el) => (cardsRef.current[i] = el)}
                 className="group relative bg-brand-navy overflow-hidden cursor-pointer">

              {/* Imagem / Placeholder */}
              <div className={`aspect-[4/3] bg-gradient-to-br ${proj.gradient} relative overflow-hidden`}>
                {proj.image ? (
                  <img src={proj.image} alt={proj.title}
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  /* ↑ Substitua o bloco <div> acima por <img> quando tiver a foto */
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display font-black text-white/10 text-6xl">{proj.num}</span>
                  </div>
                )}

                {/* Overlay hover */}
                <div className="absolute inset-0 bg-brand-navy/80 opacity-0
                                group-hover:opacity-100 transition-opacity duration-500
                                flex items-center justify-center">
                  <div className="w-12 h-12 border border-brand-gold flex items-center justify-center">
                    <ArrowUpRight size={20} className="text-brand-gold" />
                  </div>
                </div>

                {/* Categoria badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-brand-navy/80 backdrop-blur-sm">
                  <span className="text-[9px] text-white/60 uppercase tracking-[0.2em] font-sans">
                    {proj.category}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 border-t border-white/[0.06]">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] text-brand-gold/60 uppercase tracking-[0.2em] font-mono mb-2">
                      {proj.num}
                    </p>
                    <h3 className="font-display font-black text-white text-base leading-tight
                                   group-hover:text-brand-gold transition-colors duration-300 mb-3">
                      {proj.title}
                    </h3>
                    <div className="flex items-center gap-3 text-[10px] text-white/30 font-sans">
                      <span>{proj.location}</span>
                      <span className="w-px h-3 bg-white/15" />
                      <span>{proj.area}</span>
                      <span className="w-px h-3 bg-white/15" />
                      <span>{proj.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA ver mais */}
        <div className="mt-14 text-center">
          <a href="#contato"
             onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }) }}
             className="group inline-flex items-center gap-4 text-white/40
                        hover:text-brand-gold transition-colors duration-300
                        text-[11px] font-sans uppercase tracking-[0.25em]">
            <span className="w-12 h-px bg-current group-hover:w-20 transition-all duration-500" />
            Ver Todos os Projetos
            <span className="w-12 h-px bg-current group-hover:w-20 transition-all duration-500" />
          </a>
        </div>
      </div>
    </section>
  )
}
