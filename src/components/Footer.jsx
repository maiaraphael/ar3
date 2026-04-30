import { Instagram, Facebook, Linkedin, ArrowUp } from 'lucide-react'

// ─── Links do footer ────────────────────────────────────────────────────────
const FOOTER_LINKS = {
  empresa: [
    { label: 'Sobre',         href: '#sobre'        },
    { label: 'Projetos',      href: '#projetos'     },
    { label: 'Serviços',      href: '#servicos'     },
    { label: 'Diferenciais',  href: '#diferenciais' },
    { label: 'Contato',       href: '#contato'      },
  ],
  servicos: [
    { label: 'Construção Residencial',  href: '#servicos' },
    { label: 'Obras Comerciais',        href: '#servicos' },
    { label: 'Reformas e Renovações',   href: '#servicos' },
    { label: 'Design & Interiores',     href: '#servicos' },
    { label: 'Incorporação Imobiliária',href: '#servicos' },
  ],
}

const handleLinkClick = (e, href) => {
  e.preventDefault()
  const target = document.querySelector(href)
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Footer() {
  return (
    <footer className="bg-brand-navy border-t border-white/10">

      {/* ── CTA grande pré-footer ──────────────────────────────────── */}
      <div className="relative overflow-hidden bg-brand-blue py-20 text-center">
        {/* Textura */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg, transparent, transparent 20px,
              rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 21px
            )`,
          }}
        />

        <div className="relative z-10 max-w-2xl mx-auto px-6">
          <p className="text-brand-orange text-xs font-semibold uppercase tracking-[0.3em] mb-4">
            Pronto para começar?
          </p>
          <h2 className="font-display font-black text-white mb-6 leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
            Vamos construir algo<br />
            <span className="italic text-brand-orange">extraordinário juntos.</span>
          </h2>
          <p className="text-white/60 mb-10 text-base leading-relaxed">
            Entre em contato e descubra como a AR3 pode transformar seu projeto em realidade.
          </p>
          <a
            href="#contato"
            onClick={(e) => handleLinkClick(e, '#contato')}
            className="inline-flex items-center gap-3 px-10 py-4 bg-brand-orange text-white
                       font-semibold uppercase tracking-widest text-sm rounded-sm
                       hover:bg-brand-amber shadow-xl shadow-brand-orange/40
                       transition-all duration-300 hover:scale-[1.03]"
          >
            Iniciar Conversa →
          </a>
        </div>
      </div>

      {/* ── Corpo do footer ───────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Coluna 1 – Marca */}
          <div className="lg:col-span-2">
            <a href="#" onClick={(e) => handleLinkClick(e, '#hero')}
               className="inline-flex items-center gap-2 mb-6 group">
              <span className="text-3xl font-display font-black tracking-tight text-white">
                AR<span className="text-brand-orange">3</span>
              </span>
              <span className="text-xs font-sans font-light text-white/50 uppercase tracking-[0.2em] leading-none">
                Construtora
              </span>
            </a>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs mb-8">
              Dedicação, experiência e uma paixão pela perfeição. Construindo sonhos
              em Uberaba e toda a região do Triângulo Mineiro desde 2009.
            </p>

            {/* Redes sociais */}
            <div className="flex gap-3">
              {/* ↓ Atualize os hrefs com os links reais */}
              <a href="https://instagram.com/ar3construtora" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center
                            text-white/40 hover:border-brand-orange hover:text-brand-orange transition-all duration-300">
                <Instagram size={14} />
              </a>
              <a href="https://facebook.com/ar3construtora" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center
                            text-white/40 hover:border-brand-orange hover:text-brand-orange transition-all duration-300">
                <Facebook size={14} />
              </a>
              <a href="https://linkedin.com/company/ar3construtora" target="_blank" rel="noopener noreferrer"
                 className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center
                            text-white/40 hover:border-brand-orange hover:text-brand-orange transition-all duration-300">
                <Linkedin size={14} />
              </a>
            </div>
          </div>

          {/* Coluna 2 – Empresa */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-6">
              Empresa
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.empresa.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-white/50 text-sm hover:text-brand-orange transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 3 – Serviços */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-6">
              Serviços
            </h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.servicos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-white/50 text-sm hover:text-brand-orange transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Barra inferior ────────────────────────────────────────── */}
      <div className="border-t border-white/10 max-w-7xl mx-auto px-6 py-6
                      flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-white/30 text-xs">
          © {new Date().getFullYear()} AR3 Construtora. Todos os direitos reservados.
          {' '}
          <span className="text-white/20">Uberaba – MG, Brasil</span>
        </p>

        {/* Volta ao topo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="group flex items-center gap-2 text-white/30 text-xs hover:text-brand-orange
                     transition-colors duration-300"
        >
          Voltar ao topo
          <div className="w-7 h-7 rounded-full border border-current flex items-center justify-center
                           group-hover:border-brand-orange transition-colors duration-300">
            <ArrowUp size={12} />
          </div>
        </button>
      </div>
    </footer>
  )
}
