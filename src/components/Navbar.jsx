import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'

// ─── Link items da navegação principal ─────────────────────────────────────
const NAV_LINKS = [
  { label: 'Sobre',     href: '#sobre'       },
  { label: 'Projetos',  href: '#projetos'    },
  { label: 'Serviços',  href: '#servicos'    },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Contato',   href: '#contato'     },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const navRef    = useRef(null)
  const logoRef   = useRef(null)
  const linksRef  = useRef([])
  const mobileRef = useRef(null)

  // ── Detect scroll para trocar fundo da navbar ──────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Entrada da navbar com GSAP ao montar ──────────────────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, {
        y: -30, opacity: 0, duration: 1, ease: 'expo.out', delay: 0.3,
      })
      gsap.from(linksRef.current, {
        y: -20, opacity: 0, stagger: 0.08, duration: 0.8,
        ease: 'expo.out', delay: 0.5,
      })
    }, navRef)
    return () => ctx.revert()
  }, [])

  // ── Animação do menu mobile ────────────────────────────────────────────
  useEffect(() => {
    if (!mobileRef.current) return
    if (menuOpen) {
      gsap.to(mobileRef.current, {
        height: 'auto', opacity: 1, duration: 0.5, ease: 'expo.out',
      })
    } else {
      gsap.to(mobileRef.current, {
        height: 0, opacity: 0, duration: 0.35, ease: 'expo.in',
      })
    }
  }, [menuOpen])

  // ── Scroll suave ao clicar nos links ──────────────────────────────────
  const handleLinkClick = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-brand-navy/95 backdrop-blur-md shadow-xl shadow-black/20 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* ── Logo ──────────────────────────────────────────────────── */}
        <a
          ref={logoRef}
          href="#"
          onClick={(e) => handleLinkClick(e, '#hero')}
          className="flex items-center gap-2 group"
        >
          <span className="text-2xl font-display font-black tracking-tight text-white">
            AR<span className="text-brand-orange">3</span>
          </span>
          <span className="hidden sm:block text-xs font-sans font-light text-white/60 uppercase tracking-[0.2em] leading-none">
            Construtora
          </span>
        </a>

        {/* ── Links desktop ─────────────────────────────────────────── */}
        <nav className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => (linksRef.current[i] = el)}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="relative text-sm font-medium text-white/75 hover:text-white transition-colors duration-300
                         after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-brand-orange
                         after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* ── CTA desktop ───────────────────────────────────────────── */}
        <a
          href="#contato"
          onClick={(e) => handleLinkClick(e, '#contato')}
          className="hidden lg:inline-flex items-center gap-2 px-6 py-2.5 rounded-sm
                     bg-brand-orange text-white text-sm font-semibold uppercase tracking-widest
                     hover:bg-brand-amber transition-all duration-300 shadow-lg shadow-brand-orange/30"
        >
          Fale Conosco
        </a>

        {/* ── Botão hamburger mobile ────────────────────────────────── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ── Menu mobile (dropdown) ────────────────────────────────────── */}
      <div
        ref={mobileRef}
        className="lg:hidden overflow-hidden h-0 opacity-0 bg-brand-navy/98 border-t border-white/10"
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="py-3 text-white/80 hover:text-brand-orange text-base font-medium
                         border-b border-white/10 last:border-none transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={(e) => handleLinkClick(e, '#contato')}
            className="mt-4 py-3 text-center bg-brand-orange text-white font-semibold rounded-sm
                       uppercase tracking-widest text-sm"
          >
            Fale Conosco
          </a>
        </nav>
      </div>
    </header>
  )
}
