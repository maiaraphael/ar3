import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * Preloader AR3 Construtora
 * ─────────────────────────
 * Exibe uma animação de "casa sendo construída" SVG enquanto o
 * contador progride de 0 → 100. Ao chegar em 100 faz um curtain
 * reveal para o site.
 *
 * Props:
 *   onComplete – callback chamado quando a saída termina,
 *                deve setar o estado que remove o preloader do DOM.
 */
export default function Preloader({ onComplete }) {
  const overlayRef   = useRef(null)
  const curtainRef   = useRef(null)
  const counterRef   = useRef(null)
  const labelRef     = useRef(null)
  const logoRef      = useRef(null)
  const progressRef  = useRef(null)      // barra de progresso
  const houseRef     = useRef(null)
  const particleRefs = useRef([])

  // ── Partes da casa (SVG) ──────────────────────────────────────────
  const foundationRef = useRef(null)
  const wallLRef      = useRef(null)
  const wallRRef      = useRef(null)
  const wallFRef      = useRef(null)
  const roofRef       = useRef(null)
  const doorRef       = useRef(null)
  const windowLRef    = useRef(null)
  const windowRRef    = useRef(null)
  const chimneyRef    = useRef(null)
  const sparkleRefs   = useRef([])

  const [count, setCount] = useState(0)

  useEffect(() => {
    // Bloqueia scroll enquanto o preloader está ativo
    document.body.style.overflow = 'hidden'

    const ctx = gsap.context(() => {

      /* ── 1. Entrada do logo e label ─────────────────────────────── */
      const entryTl = gsap.timeline()

      entryTl
        .from(logoRef.current, {
          y: -40, opacity: 0, duration: 0.9, ease: 'expo.out',
        })
        .from(labelRef.current, {
          y: 20, opacity: 0, duration: 0.7, ease: 'expo.out',
        }, '-=0.4')

      /* ── 2. Construção da casa (stagger de partes) ──────────────── */
      const houseTl = gsap.timeline({ delay: 0.5 })

      // Fundação surge do chão
      houseTl.from(foundationRef.current, {
        scaleY: 0, transformOrigin: 'bottom', duration: 0.5, ease: 'power3.out',
      })
      // Paredes aparecem da base para cima
      .from([wallLRef.current, wallRRef.current, wallFRef.current], {
        scaleY: 0, transformOrigin: 'bottom', duration: 0.5,
        stagger: 0.12, ease: 'power3.out',
      }, '-=0.15')
      // Chaminé
      .from(chimneyRef.current, {
        scaleY: 0, transformOrigin: 'bottom', duration: 0.35, ease: 'power3.out',
      }, '-=0.2')
      // Telhado cai de cima
      .from(roofRef.current, {
        y: -60, opacity: 0, duration: 0.55, ease: 'bounce.out',
      }, '-=0.1')
      // Porta e janelas "aparecem" com scale
      .from([doorRef.current, windowLRef.current, windowRRef.current], {
        scale: 0, transformOrigin: 'center', opacity: 0,
        stagger: 0.1, duration: 0.4, ease: 'back.out(2)',
      }, '-=0.1')
      // Faíscas de construção
      .from(sparkleRefs.current, {
        scale: 0, opacity: 0, stagger: 0.06,
        duration: 0.3, ease: 'back.out(3)',
      }, '-=0.2')
      // Faíscas pulsam continuamente
      .to(sparkleRefs.current, {
        scale: 1.4, opacity: 0.5, stagger: 0.08,
        duration: 0.6, ease: 'sine.inOut',
        repeat: -1, yoyo: true,
      })

      /* ── 3. Contador 0 → 100 ────────────────────────────────────── */
      const counterObj = { val: 0 }
      gsap.to(counterObj, {
        val: 100,
        duration: 3.2,
        delay: 0.6,
        ease: 'power1.inOut',
        onUpdate() {
          const v = Math.round(counterObj.val)
          setCount(v)
          // Atualiza largura da barra de progresso
          if (progressRef.current) {
            progressRef.current.style.width = v + '%'
          }
        },
        onComplete() {
          /* ── 4. Saída – curtain wipe ──────────────────────────────── */
          const exitTl = gsap.timeline({
            onComplete() {
              document.body.style.overflow = ''
              onComplete()
            },
          })

          exitTl
            // Casa encolhe
            .to(houseRef.current, {
              scale: 0.85, opacity: 0, duration: 0.4, ease: 'power3.in',
            })
            // Logo some
            .to([logoRef.current, labelRef.current, counterRef.current, progressRef.current?.parentElement], {
              opacity: 0, y: -30, stagger: 0.06, duration: 0.4, ease: 'power3.in',
            }, '-=0.3')
            // Cortina laranja cobre a tela (slide de baixo para cima)
            .fromTo(curtainRef.current,
              { yPercent: 100 },
              { yPercent: 0, duration: 0.65, ease: 'power4.inOut' },
              '-=0.15'
            )
            // Cortina sai para cima revelando o site
            .to(curtainRef.current, {
              yPercent: -100, duration: 0.65, ease: 'power4.inOut',
            })
        },
      })

    }, overlayRef)

    return () => {
      ctx.revert()
      document.body.style.overflow = ''
    }
  }, [onComplete])

  return (
    <>
      {/* ── Overlay principal do preloader ──────────────────────────── */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center
                   bg-brand-navy overflow-hidden select-none"
      >
        {/* Grade arquitetônica de fundo */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              repeating-linear-gradient(0deg, transparent, transparent 40px,
                rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px),
              repeating-linear-gradient(90deg, transparent, transparent 40px,
                rgba(255,255,255,0.5) 40px, rgba(255,255,255,0.5) 41px)
            `,
          }}
        />

        {/* Gradiente radial laranja suave ao centro */}
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 55%, rgba(242,101,34,0.08) 0%, transparent 70%)' }} />

        {/* ── Logo ──────────────────────────────────────────────────── */}
        <div ref={logoRef} className="mb-3 flex items-baseline gap-2">
          <span className="font-display font-black text-white leading-none"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
            AR<span className="text-brand-orange">3</span>
          </span>
          <span className="text-white/40 font-sans font-light text-sm uppercase tracking-[0.3em]">
            Construtora
          </span>
        </div>

        {/* Subtítulo de localização */}
        <p ref={labelRef} className="text-white/30 text-xs uppercase tracking-[0.4em] font-sans mb-12">
          Uberaba — Minas Gerais
        </p>

        {/* ── Ilustração SVG: casa sendo construída ─────────────────── */}
        <div ref={houseRef} className="mb-10" style={{ width: 'clamp(160px, 25vw, 220px)' }}>
          <svg
            viewBox="0 0 220 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
          >
            {/* ── Chaminé ─────────────────────────────────────────── */}
            <rect
              ref={chimneyRef}
              x="148" y="38" width="18" height="36" rx="2"
              fill="#1B3B6F" stroke="#1D6FA4" strokeWidth="1.5"
            />
            {/* fumaça pontilhada */}
            <circle cx="157" cy="30" r="4" fill="#1D6FA4" opacity="0.3" />
            <circle cx="160" cy="22" r="3" fill="#1D6FA4" opacity="0.2" />
            <circle cx="155" cy="15" r="2" fill="#1D6FA4" opacity="0.1" />

            {/* ── Telhado ──────────────────────────────────────────── */}
            <path
              ref={roofRef}
              d="M20 90 L110 28 L200 90 Z"
              fill="#1B3B6F" stroke="#F26522" strokeWidth="2.5" strokeLinejoin="round"
            />
            {/* detalhe de ripas do telhado */}
            <path d="M65 59 L155 59" stroke="#F26522" strokeWidth="1" opacity="0.4" strokeDasharray="4 4" />
            <path d="M44 74 L176 74" stroke="#F26522" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />

            {/* ── Parede frontal ───────────────────────────────────── */}
            <rect
              ref={wallFRef}
              x="32" y="88" width="156" height="78" rx="2"
              fill="#0A1628" stroke="#1D6FA4" strokeWidth="1.5"
            />

            {/* ── Parede esquerda (perspectiva) ─────────────────────── */}
            <path
              ref={wallLRef}
              d="M20 90 L32 88 L32 166 L20 164 Z"
              fill="#07101E" stroke="#1D6FA4" strokeWidth="1"
            />

            {/* ── Parede direita (perspectiva) ─────────────────────── */}
            <path
              ref={wallRRef}
              d="M188 88 L200 90 L200 164 L188 166 Z"
              fill="#07101E" stroke="#1D6FA4" strokeWidth="1"
            />

            {/* ── Fundação ──────────────────────────────────────────── */}
            <rect
              ref={foundationRef}
              x="18" y="162" width="184" height="12" rx="2"
              fill="#1B3B6F" stroke="#F26522" strokeWidth="1.5"
            />

            {/* ── Porta ─────────────────────────────────────────────── */}
            <rect
              ref={doorRef}
              x="92" y="124" width="36" height="42" rx="3"
              fill="#1B3B6F" stroke="#F26522" strokeWidth="1.5"
            />
            {/* maçaneta */}
            <circle cx="122" cy="147" r="3" fill="#F26522" />
            {/* detalhe moldura */}
            <rect x="97" y="129" width="26" height="32" rx="2"
                  fill="none" stroke="#1D6FA4" strokeWidth="0.8" opacity="0.6" />

            {/* ── Janela esquerda ───────────────────────────────────── */}
            <rect
              ref={windowLRef}
              x="48" y="104" width="32" height="28" rx="3"
              fill="#1B3B6F" stroke="#1D6FA4" strokeWidth="1.5"
            />
            {/* cruz da janela */}
            <line x1="64" y1="104" x2="64" y2="132" stroke="#1D6FA4" strokeWidth="0.8" opacity="0.7" />
            <line x1="48" y1="118" x2="80" y2="118" stroke="#1D6FA4" strokeWidth="0.8" opacity="0.7" />
            {/* brilho */}
            <rect x="52" y="108" width="8" height="6" rx="1" fill="#1D6FA4" opacity="0.3" />

            {/* ── Janela direita ─────────────────────────────────────── */}
            <rect
              ref={windowRRef}
              x="140" y="104" width="32" height="28" rx="3"
              fill="#1B3B6F" stroke="#1D6FA4" strokeWidth="1.5"
            />
            <line x1="156" y1="104" x2="156" y2="132" stroke="#1D6FA4" strokeWidth="0.8" opacity="0.7" />
            <line x1="140" y1="118" x2="172" y2="118" stroke="#1D6FA4" strokeWidth="0.8" opacity="0.7" />
            <rect x="144" y="108" width="8" height="6" rx="1" fill="#1D6FA4" opacity="0.3" />

            {/* ── Faíscas / partículas de construção ─────────────────── */}
            {/* canto superior direito do telhado */}
            <g ref={(el) => (sparkleRefs.current[0] = el)}>
              <line x1="196" y1="76" x2="204" y2="68" stroke="#F26522" strokeWidth="2" strokeLinecap="round" />
              <line x1="200" y1="68" x2="208" y2="72" stroke="#F26522" strokeWidth="2" strokeLinecap="round" />
            </g>
            {/* canto superior esquerdo */}
            <g ref={(el) => (sparkleRefs.current[1] = el)}>
              <line x1="24" y1="76" x2="16" y2="68" stroke="#F26522" strokeWidth="2" strokeLinecap="round" />
              <line x1="20" y1="68" x2="12" y2="72" stroke="#F26522" strokeWidth="2" strokeLinecap="round" />
            </g>
            {/* no topo */}
            <g ref={(el) => (sparkleRefs.current[2] = el)}>
              <line x1="110" y1="22" x2="110" y2="12" stroke="#FF8C42" strokeWidth="2" strokeLinecap="round" />
              <line x1="105" y1="17" x2="115" y2="17" stroke="#FF8C42" strokeWidth="2" strokeLinecap="round" />
              <circle cx="110" cy="17" r="2.5" fill="#FF8C42" opacity="0.6" />
            </g>
            {/* direita extra */}
            <g ref={(el) => (sparkleRefs.current[3] = el)}>
              <circle cx="210" cy="110" r="3" fill="#F26522" opacity="0.5" />
              <circle cx="216" cy="102" r="2" fill="#F26522" opacity="0.3" />
            </g>
            {/* esquerda extra */}
            <g ref={(el) => (sparkleRefs.current[4] = el)}>
              <circle cx="10" cy="110" r="3" fill="#F26522" opacity="0.5" />
              <circle cx="4" cy="102" r="2" fill="#F26522" opacity="0.3" />
            </g>
          </svg>
        </div>

        {/* ── Contador + barra de progresso ─────────────────────────── */}
        <div className="w-full max-w-xs px-8 flex flex-col items-center gap-3">
          {/* Número */}
          <div ref={counterRef} className="flex items-end gap-1">
            <span className="font-display font-black text-white leading-none"
                  style={{ fontSize: 'clamp(2rem, 5vw, 2.8rem)' }}>
              {count}
            </span>
            <span className="text-brand-orange font-display font-black text-2xl mb-0.5">%</span>
          </div>

          {/* Barra de progresso */}
          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-brand-orange to-brand-sky rounded-full transition-none"
              style={{ width: '0%' }}
            />
          </div>

          {/* Label dinâmica baseada no progresso */}
          <p className="text-white/30 text-[10px] uppercase tracking-[0.35em] font-sans">
            {count < 30  ? 'Preparando fundação...'   :
             count < 55  ? 'Erguendo as paredes...'   :
             count < 75  ? 'Instalando o telhado...'  :
             count < 95  ? 'Finalizando detalhes...'  :
                           'Pronto para morar!'}
          </p>
        </div>
      </div>

      {/* ── Cortina de saída (laranja → sai para cima) ────────────── */}
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[10001] bg-brand-orange pointer-events-none"
        style={{ transform: 'translateY(100%)' }}
      />
    </>
  )
}
