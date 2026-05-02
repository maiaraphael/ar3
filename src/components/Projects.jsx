import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, MapPin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ─── Dados dos projetos ─────────────────────────────────────────────────────
// ➤ Para cada projeto, substitua o campo `image` pelo caminho real da imagem.
//   Exemplo: image: '/images/projetos/residencia-premium.jpg'
//   Sugestão: fotos profissionais de fachada ou interior das obras entregues.
const PROJECTS = [
  {
    id: 1,
    number: '#01',
    title: 'Residência Premium Leblon',
    category: 'Residencial',
    location: 'Uberaba – MG',
    year: '2024',
    area: '480 m²',
    // ↓ SUBSTITUA pelo caminho da imagem real do projeto
    image: null,
    // Cor de fallback enquanto a imagem não é inserida
    color: 'from-brand-blue to-brand-navy',
    description: 'Casa alto padrão com acabamentos importados, piscina com borda infinita e home theater integrado.',
  },
  {
    id: 2,
    number: '#02',
    title: 'Edifício Corporativo Centro',
    category: 'Comercial',
    location: 'Uberaba – MG',
    year: '2023',
    area: '3.200 m²',
    // ↓ SUBSTITUA pelo caminho da imagem real do projeto
    image: null,
    color: 'from-brand-sky to-brand-blue',
    description: 'Torre corporativa de 8 andares com fachada em vidro estrutural e automação predial completa.',
  },
  {
    id: 3,
    number: '#03',
    title: 'Condomínio Reserva Verde',
    category: 'Residencial',
    location: 'Uberaba – MG',
    year: '2023',
    area: '12.000 m²',
    // ↓ SUBSTITUA pelo caminho da imagem real do projeto
    image: null,
    color: 'from-[#1D4E3F] to-brand-navy',
    description: 'Condomínio fechado com 24 unidades, área de lazer completa e paisagismo premiado.',
  },
  {
    id: 4,
    number: '#04',
    title: 'Chácara Residencial Horizonte',
    category: 'Residencial Rural',
    location: 'Uberaba – MG',
    year: '2022',
    area: '720 m²',
    // ↓ SUBSTITUA pelo caminho da imagem real do projeto
    image: null,
    color: 'from-brand-orange/70 to-brand-navy',
    description: 'Casa de campo com arquitetura contemporânea, varanda gourmet e vista panorâmica de 360°.',
  },
  {
    id: 5,
    number: '#05',
    title: 'Clínica Medicina Avançada',
    category: 'Saúde',
    location: 'Uberaba – MG',
    year: '2022',
    area: '1.800 m²',
    // ↓ SUBSTITUA pelo caminho da imagem real do projeto
    image: null,
    color: 'from-[#1B3B6F] to-brand-navy',
    description: 'Complexo médico com salas cirúrgicas de última geração e ambientes bioclimaticamente controlados.',
  },
  {
    id: 6,
    number: '#06',
    title: 'Loja Flagship Concept Store',
    category: 'Comercial',
    location: 'Uberaba – MG',
    year: '2021',
    area: '950 m²',
    // ↓ SUBSTITUA pelo caminho da imagem real do projeto
    image: null,
    color: 'from-brand-sky/80 to-brand-navy',
    description: 'Espaço de varejo luxuoso com estrutura metálica exposta, mezzanino e iluminação cenográfica.',
  },
]

export default function Projects() {
  const sectionRef    = useRef(null)
  const labelRef      = useRef(null)
  const titleRef      = useRef(null)
  const cardsRef      = useRef([])
  const [hovered, setHovered] = useState(null)

  // ── Animações de entrada + transição de fundo da página ────────────────
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

      // Cards entram em stagger
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          y: 80, opacity: 0, duration: 1, ease: 'expo.out',
          delay: (i % 3) * 0.12,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
          },
        })
      })

      // ── Transição de cor de fundo da página ao entrar/sair da seção ────
      // Ao entrar: body fica azul-escuro (brand-navy).
      // Ao sair para baixo ou voltar para cima: body volta ao offwhite.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',   // começa quando o topo da seção atinge 60% da viewport
        end:   'bottom 40%', // termina quando o rodapé da seção passa de 40% da viewport
        onEnter:     () => gsap.to(document.body, { backgroundColor: '#0A1628', duration: 0.85, ease: 'power2.inOut', overwrite: 'auto' }),
        onLeave:     () => gsap.to(document.body, { backgroundColor: '#F5F5F0', duration: 0.85, ease: 'power2.inOut', overwrite: 'auto' }),
        onEnterBack: () => gsap.to(document.body, { backgroundColor: '#0A1628', duration: 0.85, ease: 'power2.inOut', overwrite: 'auto' }),
        onLeaveBack: () => gsap.to(document.body, { backgroundColor: '#F5F5F0', duration: 0.85, ease: 'power2.inOut', overwrite: 'auto' }),
      })

    }, sectionRef)
    return () => {
      // Garante que o body volta ao offwhite ao desmontar
      gsap.set(document.body, { backgroundColor: '#F5F5F0' })
      ctx.revert()
    }
  }, [])

  return (
    <section
      id="projetos"
      ref={sectionRef}
      // Sem bg próprio — a cor de fundo é controlada pelo GSAP no body
      className="relative py-32 overflow-hidden"
    >
      {/* Número decorativo */}
      <div className="absolute top-10 right-8 text-[10rem] font-display font-black
                      leading-none select-none pointer-events-none text-white/[0.03]">
        03
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* ── Cabeçalho ─────────────────────────────────────────────── */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <div ref={labelRef} className="flex items-center gap-3 mb-6">
              <span className="inline-block w-8 h-px bg-brand-orange" />
              <span className="text-xs font-sans font-semibold text-brand-orange uppercase tracking-[0.3em]">
                Portfólio
              </span>
            </div>

            <div ref={titleRef} className="overflow-hidden">
              <h2 className="font-display font-black text-white leading-tight"
                  style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
                <span className="block">Nossos</span>
                <span className="block italic text-brand-orange">Projetos.</span>
              </h2>
            </div>
          </div>

          <a
            href="#contato"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="group flex items-center gap-3 text-sm text-white/60 hover:text-white
                       transition-colors duration-300 whitespace-nowrap"
          >
            Ver todos os projetos
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform duration-300" />
          </a>
        </div>

        {/* ── Grid de Projetos ─────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[i] = el)}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative overflow-hidden rounded-sm cursor-pointer
                         transition-all duration-500 hover:shadow-2xl hover:shadow-brand-orange/20"
              style={{ height: i === 0 || i === 4 ? '520px' : '380px' }}
            >
              {/*
                ────────────────────────────────────────────────────────────
                IMAGEM DO PROJETO
                ➤ Quando tiver a foto real, adicione:
                   <img
                     src={project.image}
                     alt={project.title}
                     className="absolute inset-0 w-full h-full object-cover
                                transition-transform duration-700 group-hover:scale-110"
                   />
                ➤ Remova o div de placeholder logo abaixo.
                ────────────────────────────────────────────────────────────
              */}

              {/* Placeholder de cor até inserir a foto */}
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color}
                               transition-transform duration-700 group-hover:scale-110`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white/20 text-xs uppercase tracking-widest text-center px-4">
                    {/* ↓ Texto guia – remova ao inserir a imagem do projeto */}
                    Foto do projeto:<br />{project.title}
                  </p>
                </div>
              </div>

              {/* Overlay gradiente sempre presente */}
              <div className={`absolute inset-0 bg-gradient-to-t
                from-brand-navy/90 via-brand-navy/30 to-transparent
                transition-opacity duration-500
                ${hovered === project.id ? 'opacity-100' : 'opacity-80'}`} />

              {/* Número do projeto */}
              <div className="absolute top-5 right-5 text-4xl font-display font-black
                               text-white/20 leading-none select-none">
                {project.number}
              </div>

              {/* Badge de categoria */}
              <div className="absolute top-5 left-5">
                <span className="inline-block px-3 py-1 bg-brand-orange/90 backdrop-blur-sm
                                 text-white text-[10px] font-semibold uppercase tracking-widest
                                 rounded-sm">
                  {project.category}
                </span>
              </div>

              {/* Conteúdo inferior */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className={`transition-all duration-500 ${
                  hovered === project.id ? 'translate-y-0' : 'translate-y-2'
                }`}>
                  <h3 className="font-display font-bold text-white text-xl mb-2 leading-tight">
                    {project.title}
                  </h3>

                  {/* Descrição – aparece no hover */}
                  <p className={`text-white/70 text-sm leading-relaxed mb-4 overflow-hidden
                                 transition-all duration-500 ${
                    hovered === project.id ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white/50 text-xs">
                      <MapPin size={12} />
                      <span>{project.location}</span>
                      <span className="mx-1">·</span>
                      <span>{project.area}</span>
                      <span className="mx-1">·</span>
                      <span>{project.year}</span>
                    </div>

                    <div className={`flex items-center gap-2 text-brand-orange text-xs font-semibold
                                     transition-all duration-300 ${
                      hovered === project.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                    }`}>
                      Ver projeto
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA rodapé da seção ──────────────────────────────────── */}
        <div className="mt-16 text-center">
          <a
            href="#contato"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contato')?.scrollIntoView({ behavior: 'smooth' }) }}
            className="inline-flex items-center gap-3 px-10 py-4 border border-white/20
                       text-white text-sm font-semibold uppercase tracking-widest rounded-sm
                       hover:border-brand-orange hover:text-brand-orange
                       transition-all duration-300"
          >
            Discutir Seu Projeto
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
