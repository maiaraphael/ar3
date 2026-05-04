import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, X, ChevronLeft, ChevronRight, Images } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    num: '01',
    title: 'Residência Dhama III',
    category: 'Residencial · Alto Padrão',
    location: 'Uberaba, MG',
    area: '340 m²',
    year: '2025',
    gradient: 'from-[#1a2540] to-[#2d4a7a]',
    // ↓ URL da foto de capa do cartão (aparece no scroll)
    cover: '/images/casa01/foto_01.png',
    // ↓ URLs das fotos do projeto (aparecem no lightbox ao clicar)
    //   Adicione quantas quiser, ex: ['/images/proj-01-a.jpg', '/images/proj-01-b.jpg']
    gallery: ['/images/casa01/foto_01.png', '/images/casa01/foto_02.png'],
  },
  {
    num: '02',
    title: 'Residência Dhama I',
    category: 'Residencial · Alto Padrão',
    location: 'Uberaba, MG',
    area: '320 m²',
    year: '2025',
    gradient: 'from-[#1e3a2f] to-[#2d5a44]',
    // ↓ URL da foto de capa
    cover: '/images/casa02/foto01.png',
    // ↓ URLs das fotos do projeto
    gallery: ['/images/casa02/foto02.jpeg'],
  },
  {
    num: '03',
    title: 'Condomínio Villa Serrana',
    category: 'Residencial · Condomínio',
    location: 'Uberaba, MG',
    area: '12.000 m²',
    year: '2022',
    gradient: 'from-[#3a1e2a] to-[#5a2d44]',
    // ↓ URL da foto de capa
    cover: null,
    // ↓ URLs das fotos do projeto
    gallery: [],
  },
  {
    num: '04',
    title: 'Clínica Saúde & Vida',
    category: 'Comercial · Saúde',
    location: 'Uberlândia, MG',
    area: '1.800 m²',
    year: '2022',
    gradient: 'from-[#1a3040] to-[#2a4d63]',
    // ↓ URL da foto de capa
    cover: null,
    // ↓ URLs das fotos do projeto
    gallery: [],
  },
  {
    num: '05',
    title: 'Mansão Jardim das Acácias',
    category: 'Residencial · Luxo',
    location: 'Uberaba, MG',
    area: '920 m²',
    year: '2021',
    gradient: 'from-[#2a1f10] to-[#4d3820]',
    // ↓ URL da foto de capa
    cover: null,
    // ↓ URLs das fotos do projeto
    gallery: [],
  },
  {
    num: '06',
    title: 'Galpão Logístico BR-050',
    category: 'Industrial · Logística',
    location: 'Uberaba, MG',
    area: '8.500 m²',
    year: '2021',
    gradient: 'from-[#1a2020] to-[#2d3535]',
    // ↓ URL da foto de capa
    cover: null,
    // ↓ URLs das fotos do projeto
    gallery: [],
  },
]

export default function Projects() {
  const containerRef = useRef(null)  // div externa — tem a altura extra para criar scroll
  const stickyRef    = useRef(null)  // div interna — fica sticky enquanto rola
  const trackRef     = useRef(null)  // trilho horizontal que se move
  const progressRef  = useRef(null)  // barra de progresso

  // Estado do lightbox: qual projeto está aberto e qual foto está ativa
  const [lightbox, setLightbox] = useState(null) // { project, photoIndex }

  const openLightbox = useCallback((project) => {
    if (project.gallery.length === 0 && !project.cover) return
    const photos = project.cover
      ? [project.cover, ...project.gallery]
      : project.gallery
    setLightbox({ project, photos, photoIndex: 0 })
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox(null)
    document.body.style.overflow = ''
  }, [])

  const prevPhoto = useCallback(() => {
    setLightbox(prev => ({
      ...prev,
      photoIndex: (prev.photoIndex - 1 + prev.photos.length) % prev.photos.length,
    }))
  }, [])

  const nextPhoto = useCallback(() => {
    setLightbox(prev => ({
      ...prev,
      photoIndex: (prev.photoIndex + 1) % prev.photos.length,
    }))
  }, [])

  // Navega com teclado quando o lightbox está aberto
  useEffect(() => {
    if (!lightbox) return
    const onKey = (e) => {
      if (e.key === 'Escape')     closeLightbox()
      if (e.key === 'ArrowLeft')  prevPhoto()
      if (e.key === 'ArrowRight') nextPhoto()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, closeLightbox, prevPhoto, nextPhoto])

  // IntersectionObserver: muda cor do body quando Projects entra/sai da tela
  useEffect(() => {
    const el = containerRef.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(document.body, { backgroundColor: '#080F1C', duration: 0.7, ease: 'power2.inOut' })
        } else {
          gsap.to(document.body, { backgroundColor: '#F7F6F2', duration: 0.7, ease: 'power2.inOut' })
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    // Calcula quanto precisa mover
    const getDistance = () =>
      trackRef.current.scrollWidth - stickyRef.current.offsetWidth

    // Define a altura do container para que o scroll vertical
    // equivalha ao scroll horizontal necessário
    const setContainerHeight = () => {
      containerRef.current.style.height =
        `${stickyRef.current.offsetHeight + getDistance()}px`
    }

    setContainerHeight()
    window.addEventListener('resize', setContainerHeight)

    // ScrollTrigger que move o trilho horizontalmente
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: () => `+=${getDistance()}`,
      pin: stickyRef.current,
      anticipatePin: 1,
      scrub: 1.2,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (progressRef.current) {
          progressRef.current.style.width = `${self.progress * 100}%`
        }
        gsap.set(trackRef.current, {
          x: -(getDistance() * self.progress),
          overwrite: 'auto',
        })
      },
    })

    return () => {
      st.kill()
      window.removeEventListener('resize', setContainerHeight)
    }
  }, [])

  return (
    <>
    <section id="projetos" ref={containerRef} className="relative bg-brand-navy">

      {/* Grade sutil */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{
             backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
             backgroundSize: '80px 80px',
           }} />

      {/* Painel sticky — ocupa 100vh, fica fixo enquanto rola */}
      <div ref={stickyRef}
           className="w-full overflow-hidden flex flex-col"
           style={{ height: '100vh' }}>

        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-4 px-12 pt-16 pb-8 shrink-0">
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
          <p className="text-white/30 text-[12px] uppercase tracking-[0.2em] font-sans">
            Role para ver todos →
          </p>
        </div>

        {/* Trilho horizontal */}
        <div className="flex-1 flex items-stretch px-12 pb-12 overflow-visible">
          <div ref={trackRef}
               className="flex gap-5 items-stretch"
               style={{ willChange: 'transform' }}>
            {PROJECTS.map((proj) => (
              <div key={proj.num}
                   className="group relative shrink-0 overflow-hidden cursor-pointer"
                   style={{ width: 'clamp(260px, 78vw, 36vw)' }}
                   onClick={() => openLightbox(proj)}>

                {/* Fundo / Imagem de capa */}
                <div className={`absolute inset-0 bg-gradient-to-br ${proj.gradient}`}>
                  {/* ↓ A foto de capa aparece aqui quando proj.cover tiver uma URL */}
                  {proj.cover && (
                    // cover: 'https://...' — URL da foto de capa definida no array PROJECTS acima
                    <img
                      src={proj.cover}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  {/* Número decorativo — some quando tiver foto */}
                  {!proj.cover && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-display font-black text-white/10 select-none"
                            style={{ fontSize: 'clamp(6rem, 12vw, 10rem)' }}>
                        {proj.num}
                      </span>
                    </div>
                  )}
                </div>

                {/* Overlay hover */}
                <div className="absolute inset-0 bg-brand-navy/75 opacity-0
                                group-hover:opacity-100 transition-opacity duration-500
                                flex items-center justify-center z-10">
                  <div className="w-14 h-14 border border-brand-gold flex items-center justify-center">
                    {(proj.gallery.length > 0 || proj.cover)
                      ? <Images size={20} className="text-brand-gold" />
                      : <ArrowUpRight size={22} className="text-brand-gold" />}
                  </div>
                </div>

                {/* Badge */}
                <div className="absolute top-5 left-5 px-3 py-1.5 bg-black/50 backdrop-blur-sm z-10">
                  <span className="text-[9px] text-white/60 uppercase tracking-[0.18em] font-sans">
                    {proj.category}
                  </span>
                </div>

                {/* Info bottom */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-5 z-10
                                bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-[9px] text-brand-gold/60 font-mono uppercase tracking-[0.2em] mb-1">
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

            {/* Card CTA final */}
            <div className="shrink-0 flex items-center justify-center border border-white/10
                            hover:border-brand-gold/60 transition-colors duration-500 cursor-pointer"
                 style={{ width: '22vw' }}>
              <a href="#contato"
                 onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }) }}
                 className="flex flex-col items-center gap-5 p-8 text-center">
                <div className="w-12 h-12 border border-brand-gold flex items-center justify-center">
                  <ArrowUpRight size={18} className="text-brand-gold" />
                </div>
                <p className="font-display font-black text-white text-xl leading-tight">
                  Seu projeto<br />aqui
                </p>
                <p className="text-white/30 text-[10px] uppercase tracking-[0.22em] font-sans">
                  Fale Conosco
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* Barra de progresso */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10">
          <div ref={progressRef} className="h-full bg-brand-gold" style={{ width: '0%' }} />
        </div>
      </div>
    </section>

      {/* ── Lightbox ───────────────────────────────────────────── */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex flex-col"
          onClick={closeLightbox}>

          {/* Cabeçalho */}
          <div className="flex items-center justify-between px-6 py-4 shrink-0 border-b border-white/10"
               onClick={(e) => e.stopPropagation()}>
            <div>
              <p className="text-[9px] text-brand-gold/60 font-mono uppercase tracking-[0.2em] mb-0.5">
                {lightbox.project.num} · {lightbox.project.category}
              </p>
              <h3 className="font-display font-black text-white text-lg">
                {lightbox.project.title}
              </h3>
            </div>
            <div className="flex items-center gap-4">
              {/* Contador de fotos */}
              <span className="text-white/30 text-[11px] font-mono">
                {lightbox.photoIndex + 1} / {lightbox.photos.length}
              </span>
              {/* Botão fechar */}
              <button
                onClick={closeLightbox}
                className="w-10 h-10 border border-white/20 flex items-center justify-center
                           hover:border-brand-gold hover:text-brand-gold text-white/50
                           transition-colors duration-200">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Imagem principal */}
          <div className="flex-1 flex items-center justify-center relative px-16 py-4 min-h-0"
               onClick={(e) => e.stopPropagation()}>
            {/* src: URL da foto atual do lightbox (gallery[photoIndex]) */}
            <img
              key={lightbox.photoIndex}
              src={lightbox.photos[lightbox.photoIndex]}
              alt={`${lightbox.project.title} — foto ${lightbox.photoIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              style={{ animation: 'lightbox-fade 0.25s ease' }}
            />

            {/* Seta esquerda */}
            {lightbox.photos.length > 1 && (
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20
                           flex items-center justify-center text-white/50 hover:border-brand-gold
                           hover:text-brand-gold transition-colors duration-200">
                <ChevronLeft size={22} />
              </button>
            )}

            {/* Seta direita */}
            {lightbox.photos.length > 1 && (
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border border-white/20
                           flex items-center justify-center text-white/50 hover:border-brand-gold
                           hover:text-brand-gold transition-colors duration-200">
                <ChevronRight size={22} />
              </button>
            )}
          </div>

          {/* Miniaturas (thumbnails) */}
          {lightbox.photos.length > 1 && (
            <div className="shrink-0 flex gap-2 justify-center px-6 pb-6 flex-wrap"
                 onClick={(e) => e.stopPropagation()}>
              {lightbox.photos.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(prev => ({ ...prev, photoIndex: i }))}
                  className={`w-20 h-20 sm:w-14 sm:h-14 overflow-hidden border-2 transition-colors duration-200 shrink-0
                              ${ i === lightbox.photoIndex
                                  ? 'border-brand-gold'
                                  : 'border-white/10 hover:border-white/40' }`}>
                  {/* src = gallery[i] — URL de cada miniatura */}
                  <img
                    src={src}
                    alt={`miniatura ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Animação de fade para as fotos */}
      <style>{`
        @keyframes lightbox-fade {
          from { opacity: 0; transform: scale(0.97); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  )
}
