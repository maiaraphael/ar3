import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ─── Depoimentos de clientes ────────────────────────────────────────────────
// ➤ Substitua os dados abaixo pelos depoimentos reais dos clientes da AR3.
//   Para cada cliente, você pode adicionar também um campo `photo`:
//   photo: '/images/clientes/joao-silva.jpg'
const TESTIMONIALS = [
  {
    id: 1,
    name: 'João e Márcia Silva',
    role: 'Proprietários – Residência Premium',
    stars: 5,
    text: 'A AR3 superou todas as nossas expectativas. Do projeto à entrega, cada detalhe foi tratado com um cuidado que raramente vemos no mercado. Nossa casa é exatamente como sonhamos, e o processo foi transparente do início ao fim.',
    // photo: '/images/clientes/joao-marcia.jpg' // ← Adicione a foto do cliente
  },
  {
    id: 2,
    name: 'Dr. Ricardo Almeida',
    role: 'Diretor – Clínica Medicina Avançada',
    stars: 5,
    text: 'Construir nossa clínica com a AR3 foi uma decisão acertada. Prazo cumprido, orçamento respeitado e uma qualidade de acabamento impecável. A comunicação durante toda a obra foi exemplar.',
    // photo: '/images/clientes/ricardo-almeida.jpg' // ← Adicione a foto do cliente
  },
  {
    id: 3,
    name: 'Família Monteiro',
    role: 'Proprietários – Condomínio Reserva Verde',
    stars: 5,
    text: 'Investimos no Reserva Verde e foi a melhor decisão que tomamos. A AR3 entregou um empreendimento que valorizou muito acima do esperado. A qualidade construtiva é visível em cada centímetro.',
    // photo: '/images/clientes/familia-monteiro.jpg' // ← Adicione a foto do cliente
  },
  {
    id: 4,
    name: 'Ana Paula Ferreira',
    role: 'CEO – Grupo Comercial Uberaba',
    stars: 5,
    text: 'Nosso edifício corporativo ficou além do que imaginávamos. A AR3 tem uma equipe técnica diferenciada e uma capacidade de resolver desafios construtivos que impressiona. Recomendo de olhos fechados.',
    // photo: '/images/clientes/ana-ferreira.jpg' // ← Adicione a foto do cliente
  },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const labelRef   = useRef(null)
  const titleRef   = useRef(null)
  const contentRef = useRef(null)
  const [current, setCurrent] = useState(0)

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
      gsap.from(contentRef.current, {
        y: 50, opacity: 0, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // ── Transição entre depoimentos ───────────────────────────────────────
  const goTo = (index) => {
    gsap.to(contentRef.current, {
      opacity: 0, y: 20, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setCurrent(index)
        gsap.to(contentRef.current, {
          opacity: 1, y: 0, duration: 0.5, ease: 'expo.out',
        })
      },
    })
  }

  const prev = () => goTo((current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => goTo((current + 1) % TESTIMONIALS.length)

  const t = TESTIMONIALS[current]

  return (
    <section
      ref={sectionRef}
      className="relative py-32 bg-brand-offwhite overflow-hidden"
    >
      {/* Número decorativo */}
      <div className="absolute top-10 right-8 text-[10rem] font-display font-black
                      leading-none select-none pointer-events-none text-brand-navy/[0.04]">
        06
      </div>

      <div className="max-w-7xl mx-auto px-6">

        {/* ── Cabeçalho ───────────────────────────────────────────── */}
        <div className="mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div>
            <div ref={labelRef} className="flex items-center gap-3 mb-6">
              <span className="inline-block w-8 h-px bg-brand-orange" />
              <span className="text-xs font-sans font-semibold text-brand-orange uppercase tracking-[0.3em]">
                Depoimentos
              </span>
            </div>

            <div ref={titleRef} className="overflow-hidden">
              <h2 className="font-display font-black text-brand-navy leading-tight"
                  style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
                <span className="block">O que nossos</span>
                <span className="block italic text-brand-sky">clientes dizem.</span>
              </h2>
            </div>
          </div>

          {/* Controles de navegação */}
          <div className="flex items-center gap-4">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-brand-navy/30 flex items-center justify-center
                         hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm text-brand-dark/40 font-sans">
              {String(current + 1).padStart(2, '0')} / {String(TESTIMONIALS.length).padStart(2, '0')}
            </span>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-brand-navy/30 flex items-center justify-center
                         hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ── Card do depoimento atual ─────────────────────────────── */}
        <div
          ref={contentRef}
          className="relative bg-white rounded-sm shadow-xl shadow-brand-navy/5 p-10 lg:p-16
                     border-l-4 border-brand-orange max-w-4xl"
        >
          {/* Aspas decorativas */}
          <Quote size={64} className="absolute top-8 right-8 text-brand-orange/10" fill="currentColor" />

          {/* Estrelas */}
          <div className="flex gap-1 mb-8">
            {[...Array(t.stars)].map((_, i) => (
              <Star key={i} size={18} className="text-brand-orange" fill="currentColor" />
            ))}
          </div>

          {/* Texto do depoimento */}
          <blockquote className="font-display text-2xl lg:text-3xl text-brand-navy leading-relaxed
                                  font-normal italic mb-10"
                       style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.8rem)' }}>
            "{t.text}"
          </blockquote>

          {/* Autor */}
          <div className="flex items-center gap-5">
            {/*
              ── FOTO DO CLIENTE ──────────────────────────────────────────
              ➤ Quando tiver a foto, substitua o div abaixo por:
                 <img
                   src={t.photo}
                   alt={t.name}
                   className="w-14 h-14 rounded-full object-cover border-2 border-brand-orange/30"
                 />
            */}
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-orange to-brand-sky
                            flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">
                {/* ↓ Iniciais do cliente – substituir pela foto real */}
                {t.name.charAt(0)}
              </span>
            </div>

            <div>
              <p className="font-sans font-semibold text-brand-navy">{t.name}</p>
              <p className="text-brand-dark/50 text-sm">{t.role}</p>
            </div>
          </div>
        </div>

        {/* ── Indicadores de paginação ─────────────────────────────── */}
        <div className="flex gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-8 h-2 bg-brand-orange'
                  : 'w-2 h-2 bg-brand-navy/20 hover:bg-brand-orange/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
