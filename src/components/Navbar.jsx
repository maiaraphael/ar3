import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Sobre',        href: '#sobre'        },
  { label: 'Projetos',     href: '#projetos'     },
  { label: 'Servicos',     href: '#servicos'     },
  { label: 'Diferenciais', href: '#diferenciais' },
  { label: 'Contato',      href: '#contato'      },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef    = useRef(null)
  const logoRef   = useRef(null)
  const linksRef  = useRef([])
  const ctaRef    = useRef(null)
  const mobileRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(logoRef.current, { y: -24, opacity: 0, duration: 1.1, ease: 'expo.out', delay: 0.4 })
      gsap.from(linksRef.current, { y: -16, opacity: 0, stagger: 0.07, duration: 0.9, ease: 'expo.out', delay: 0.55 })
      gsap.from(ctaRef.current,   { y: -16, opacity: 0, duration: 0.9, ease: 'expo.out', delay: 0.9 })
    }, navRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!mobileRef.current) return
    if (menuOpen) {
      gsap.to(mobileRef.current, { height: 'auto', opacity: 1, duration: 0.5, ease: 'expo.out' })
    } else {
      gsap.to(mobileRef.current, { height: 0, opacity: 0, duration: 0.35, ease: 'expo.in' })
    }
  }, [menuOpen])

  const go = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-brand-navy/95 backdrop-blur-xl border-b border-white/[0.06] ${
        scrolled ? 'py-3 shadow-2xl shadow-black/30' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">

        {/* Logo */}
        <a ref={logoRef} href="#" onClick={(e) => go(e, '#hero')}
           className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 border border-white/20 flex items-center justify-center
                          group-hover:border-brand-gold transition-colors duration-500">
            <span className="font-display font-black text-white text-sm leading-none tracking-tight">
              AR<span className="text-brand-orange">3</span>
            </span>
            <span className="absolute -top-px -right-px w-2 h-2 bg-brand-gold" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-sans font-semibold text-xs tracking-[0.18em] uppercase">
              Construtora
            </span>
            <span className="text-white/35 font-sans font-light text-[9px] tracking-[0.3em] uppercase mt-0.5">
              Uberaba - MG
            </span>
          </div>
        </a>

        {/* Links desktop */}
        <nav className="hidden lg:flex items-center gap-9">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              ref={(el) => (linksRef.current[i] = el)}
              href={link.href}
              onClick={(e) => go(e, link.href)}
              className="relative text-[11px] font-sans font-medium text-white/55 hover:text-white
                         uppercase tracking-[0.18em] transition-colors duration-300
                         after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-px
                         after:bg-brand-gold after:transition-all after:duration-400
                         hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <a
          ref={ctaRef}
          href="#contato"
          onClick={(e) => go(e, '#contato')}
          className="hidden lg:inline-flex items-center gap-2.5 px-6 py-2.5
                     relative overflow-hidden btn-shimmer
                     border border-brand-orange/80 text-white text-[11px]
                     font-semibold uppercase tracking-[0.2em] rounded-none
                     hover:bg-brand-orange transition-all duration-400
                     group"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-gold group-hover:bg-white transition-colors duration-300" />
          Fale Conosco
        </a>

        {/* Hamburger mobile */}
        <button onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden text-white p-2" aria-label="Toggle menu">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Menu mobile */}
      <div ref={mobileRef}
           className="lg:hidden overflow-hidden h-0 opacity-0 bg-brand-navy/98 border-t border-white/[0.07]">
        <nav className="flex flex-col px-8 py-5 gap-0.5">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={(e) => go(e, link.href)}
               className="py-3.5 text-white/60 hover:text-brand-gold text-xs font-medium
                          uppercase tracking-[0.2em] border-b border-white/[0.07]
                          last:border-none transition-colors duration-200">
              {link.label}
            </a>
          ))}
          <a href="#contato" onClick={(e) => go(e, '#contato')}
             className="mt-5 py-3 text-center border border-brand-orange text-white
                        font-semibold text-xs uppercase tracking-[0.2em]">
            Fale Conosco
          </a>
        </nav>
      </div>

      {/* Linha dourada quando rolado */}
      {scrolled && (
        <div className="absolute bottom-0 left-0 right-0 h-px
                        bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      )}
    </header>
  )
}
