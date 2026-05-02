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
    gradient: 'from-[#1a2540] to-[#2d4a7a]',
    // ↓ SUBSTITUA: image: '/images/proj-mirante.jpg'
  },
  {
    num: '02',
    title: 'Edifício Corporativo Central',
    category: 'Comercial · Escritórios',
    location: 'Uberaba, MG',
    area: '4.200 m²',
    year: '2023',
    gradient: 'from-[#1e3a2f] to-[#2d5a44]',
    // ↓ SUBSTITUA: image: '/images/proj-corporativo.jpg'
  },
  {
    num: '03',
    title: 'Condomínio Villa Serrana',
    category: 'Residencial · Condomínio',
    location: 'Uberaba, MG',
    area: '12.000 m²',
    year: '2022',
    gradient: 'from-[#3a1e2a] to-[#5a2d44]',
    // ↓ SUBSTITUA: image: '/images/proj-villa.jpg'
  },
  {
    num: '04',
    title: 'Clínica Saúde & Vida',
    category: 'Comercial · Saúde',
    location: 'Uberlândia, MG',
    area: '1.800 m²',
    year: '2022',
    gradient: 'from-[#1a3040] to-[#2a4d63]',
    // ↓ SUBSTITUA: image: '/images/proj-clinica.jpg'
  },
  {
    num: '05',
    title: 'Mansão Jardim das Acácias',
    category: 'Residencial · Luxo',
    location: 'Uberaba, MG',
    area: '920 m²',
    year: '2021',
    gradient: 'from-[#2a1f10] to-[#4d3820]',
    // ↓ SUBSTITUA: image: '/images/proj-mansao.jpg'
  },
  {
    num: '06',
    title: 'Galpão Logístico BR-050',
    category: 'Industrial · Logística',
    location: 'Uberaba, MG',
    area: '8.500 m²',
    year: '2021',
    gradient: 'from-[#1a2020] to-[#2d3535]',
    // ↓ SUBSTITUA: image: '/images/proj-galpao.jpg'
  },
]

// Largura de cada card (vw) — ajuste aqui se quiser cards maiores/menores
const CARD_VW = 38

export default function Projects() {
  const sectionRef  = useRef(null)
  const pinWrapRef  = useRef(null)
  const trackRef    = useRef(null)
  const headerRef   = useRef(null)

  // ── Scroll horizontal pinado ──────────────────────────────────────────
  useEffect(() => {
    // Aguarda o próximo frame para ter dimensões corretas
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const totalWidth = track.scrollWidth
      const viewWidth  = track.offsetWidth

      // Distância que precisa ser arrastada horizontalmente
      const distance = totalWidth - viewWidth

      // Muda cor do body ao entrar na seção
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter:      () => gsap.to(document.body, { backgroundColor: '#080F1C', duration: 0.9, ease: 'power2.inOut' }),
        onLeave:      () => gsap.to(document.body, { backgroundColor: '#F7F6F2', duration: 0.9, ease: 'power2.inOut' }),
        onEnterBack:  () => gsap.to(document.body, { backgroundColor: '#080F1C', duration: 0.9, ease: 'power2.inOut' }),
        onLeaveBack:  () => gsap.to(document.body, { backgroundColor: '#F7F6F2', duration: 0.9, ease: 'power2.inOut' }),
      })

      // Efeito horizontal pinado
      gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: pinWrapRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          // "end" proporcional: quanto mais cards, mais scroll necessário
          end: () => `+=${distance}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })

      // Animação de entrada do header
      gsap.from(headerRef.current, {
        y: 40, opacity: 0, duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="projetos" ref={sectionRef} className="relative bg-brand-navy overflow-hidden">

      {/* Grade sutil de fundo */}
      <div className="absolute inset-0 opacity-[0.035] pointer-events-none"
           style={{
             backgroundImage: 'linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)',
             backgroundSize: '80px 80px',
           }} />

      {/* Wrapper que será pinado */}
      <div ref={pinWrapRef} className="relative w-full h-screen flex flex-col">

        {/* Header */}
        <div ref={headerRef} className="flex items-end justify-between flex-wrap gap-6 px-12 pt-16 pb-8 shrink-0">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-px bg-brand-gold" />
              <span className="text-[10px] font-sans font-medium text-brand-gold/70 uppercase tracking-[0.35em]">
                Portfólio
              </span>
            </div>
            <h2 className="font-display font-black text-white leading-none"
                style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)' }}>
              Projetos{' '}
              <span className="italic text-gradient-gold">Realizados</span>
            </h2>
          </div>
          <p className="max-w-xs text-white/35 text-[13px] leading-[1.9] font-sans font-light">
            Role para ver todos os projetos →
          </p>
        </div>

        {/* Trilho horizontal dos cards */}
        <div className="flex-1 overflow-hidden flex items-stretch px-12 pb-12">
          <div ref={trackRef} className="flex gap-6 items-stretch will-change-transform">
            {PROJECTS.map((proj) => (
              <div key={proj.num}
                   className="group relative shrink-0 rounded-sm overflow-hidden cursor-pointer"
                   style={{ width: `${CARD_VW}vw` }}>

                {/* Imagem / Placeholder */}
                <div className={`w-full h-full bg-gradient-to-br ${proj.gradient} relative`}>
                  {proj.image ? (
                    <img src={proj.image} alt={proj.title}
                         className="absolute inset-0 w-full h-full object-cover
                                    group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display font-black text-white/10"
                            style={{ fontSize: 'clamp(5rem, 10vw, 8rem)' }}>
                        {proj.num}
                      </span>
                    </div>
                  )}

                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-brand-navy/75 opacity-0
                                  group-hover:opacity-100 transition-opacity duration-500
                                  flex items-center justify-center">
                    <div className="w-14 h-14 border border-brand-gold flex items-center justify-center">
                      <ArrowUpRight size={22} className="text-brand-gold" />
                    </div>
                  </div>

                  {/* Badge categoria */}
                  <div className="absolute top-5 left-5 px-3 py-1.5 bg-brand-navy/80 backdrop-blur-sm">
                    <span className="text-[9px] text-white/60 uppercase tracking-[0.2em] font-sans">
                      {proj.category}
                    </span>
                  </div>
                </div>

                {/* Info bar */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-5
                                bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-[9px] text-brand-gold/60 uppercase tracking-[0.2em] font-mono mb-1.5">
                    {proj.num}
                  </p>
                  <h3 className="font-display font-black text-white text-lg leading-tight
                                 group-hover:text-brand-gold transition-colors duration-300 mb-2">
                    {proj.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] text-white/40 font-sans">
                    <span>{proj.location}</span>
                    <span className="w-px h-3 bg-white/20" />
                    <span>{proj.area}</span>
                    <span className="w-px h-3 bg-white/20" />
                    <span>{proj.year}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* Card final — CTA */}
            <div className="shrink-0 flex items-center justify-center border border-white/10
                            hover:border-brand-gold transition-colors duration-500 cursor-pointer"
                 style={{ width: `${CARD_VW * 0.6}vw` }}>
              <a href="#contato"
                 onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }) }}
                 className="flex flex-col items-center gap-4 text-center p-8">
                <div className="w-14 h-14 border border-brand-gold flex items-center justify-center">
                  <ArrowUpRight size={20} className="text-brand-gold" />
                </div>
                <p className="text-white font-display font-black text-xl">
                  Seu projeto<br />aqui
                </p>
                <p className="text-white/30 text-[11px] uppercase tracking-[0.2em] font-sans">
                  Fale Conosco
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* Barra de progresso */}
        <ProgressBar trackRef={trackRef} />
      </div>
    </section>
  )
}

// Barra de progresso do scroll horizontal
function ProgressBar({ trackRef }) {
  const barRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: trackRef.current,
        start: 'top top',
        end: () => `+=${trackRef.current.scrollWidth - trackRef.current.offsetWidth}`,
        scrub: true,
        onUpdate: (self) => {
          if (barRef.current) {
            barRef.current.style.width = `${self.progress * 100}%`
          }
        },
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10">
      <div ref={barRef} className="h-full bg-brand-gold transition-none" style={{ width: '0%' }} />
    </div>
  )
}
