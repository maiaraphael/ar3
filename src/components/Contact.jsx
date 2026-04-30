import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Linkedin } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ─── Informações de contato da AR3 ─────────────────────────────────────────
// ➤ Atualize os dados abaixo com as informações reais da empresa:
const CONTACT_INFO = [
  {
    icon: Phone,
    label: 'Telefone / WhatsApp',
    value: '+55 (34) 9 9999-9999', // ← Substitua pelo telefone real
    href:  'https://wa.me/5534999999999',
  },
  {
    icon: Mail,
    label: 'E-mail',
    value: 'contato@ar3construtora.com.br', // ← Substitua pelo e-mail real
    href:  'mailto:contato@ar3construtora.com.br',
  },
  {
    icon: MapPin,
    label: 'Endereço',
    value: 'Uberaba – MG, Brasil', // ← Substitua pelo endereço completo
    href:  'https://maps.google.com/?q=Uberaba+MG',
  },
]

export default function Contact() {
  const sectionRef  = useRef(null)
  const leftRef     = useRef(null)
  const rightRef    = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', service: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftRef.current.children, {
        x: -60, opacity: 0, stagger: 0.12, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
      gsap.from(rightRef.current, {
        x: 60, opacity: 0, duration: 1.1, ease: 'expo.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  // ── Handler de submit do formulário ───────────────────────────────────
  // ➤ Conecte aqui ao seu backend, Formspree, EmailJS, etc.
  //   Exemplo com EmailJS:
  //   import emailjs from '@emailjs/browser'
  //   emailjs.send('SERVICE_ID', 'TEMPLATE_ID', form, 'PUBLIC_KEY')
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Integrar com serviço de e-mail real (EmailJS, Formspree, etc.)
    console.log('Form data:', form)
    setSent(true)
    setTimeout(() => setSent(false), 5000)
    setForm({ name: '', email: '', phone: '', message: '', service: '' })
  }

  return (
    <section
      id="contato"
      ref={sectionRef}
      className="relative py-32 bg-brand-navy overflow-hidden"
    >
      {/* Número decorativo */}
      <div className="absolute top-10 right-8 text-[10rem] font-display font-black
                      leading-none select-none pointer-events-none text-white/[0.03]">
        07
      </div>

      {/* Linha decorativa laranja esquerda */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-brand-orange to-transparent opacity-40" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-start">

        {/* ── Coluna esquerda – info ───────────────────────────────── */}
        <div ref={leftRef} className="space-y-8">
          {/* Label */}
          <div className="flex items-center gap-3">
            <span className="inline-block w-8 h-px bg-brand-orange" />
            <span className="text-xs font-sans font-semibold text-brand-orange uppercase tracking-[0.3em]">
              Contato
            </span>
          </div>

          {/* Headline */}
          <div>
            <h2 className="font-display font-black text-white leading-tight"
                style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)' }}>
              Você tem um projeto<br />
              <span className="italic text-brand-orange">para discutir?</span>
            </h2>
          </div>

          {/* Subtexto */}
          <p className="text-white/60 text-base leading-relaxed max-w-md">
            Nossa equipe está pronta para ouvir sua ideia e transformá-la em realidade.
            Preencha o formulário ou entre em contato diretamente pelos canais abaixo.
          </p>

          {/* Cards de contato */}
          <div className="space-y-4">
            {CONTACT_INFO.map((info) => {
              const Icon = info.icon
              return (
                <a
                  key={info.label}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-5 p-4 border border-white/10 rounded-sm
                             hover:border-brand-orange/50 hover:bg-white/5
                             transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-sm bg-brand-orange/10 flex items-center justify-center
                                  group-hover:bg-brand-orange transition-colors duration-300">
                    <Icon size={18} className="text-brand-orange group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-0.5">{info.label}</p>
                    <p className="text-white text-sm font-medium">{info.value}</p>
                  </div>
                </a>
              )
            })}
          </div>

          {/* Redes sociais */}
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Redes Sociais</p>
            <div className="flex gap-4">
              {/* ↓ Atualize os hrefs com os links reais das redes sociais da AR3 */}
              <a href="https://instagram.com/ar3construtora" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center
                            text-white/50 hover:border-brand-orange hover:text-brand-orange transition-all duration-300">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com/ar3construtora" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center
                            text-white/50 hover:border-brand-orange hover:text-brand-orange transition-all duration-300">
                <Facebook size={16} />
              </a>
              <a href="https://linkedin.com/company/ar3construtora" target="_blank" rel="noopener noreferrer"
                 className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center
                            text-white/50 hover:border-brand-orange hover:text-brand-orange transition-all duration-300">
                <Linkedin size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* ── Coluna direita – formulário ──────────────────────────── */}
        <div ref={rightRef}>
          <form
            onSubmit={handleSubmit}
            className="bg-white/5 border border-white/10 rounded-sm p-8 lg:p-10 space-y-6"
          >
            <h3 className="font-display font-bold text-white text-xl mb-6">
              Envie uma mensagem
            </h3>

            {/* Nome */}
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">
                Nome completo *
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Seu nome"
                className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-3
                           text-white placeholder-white/30 text-sm
                           focus:outline-none focus:border-brand-orange transition-colors duration-300"
              />
            </div>

            {/* E-mail + Telefone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="seu@email.com"
                  className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-3
                             text-white placeholder-white/30 text-sm
                             focus:outline-none focus:border-brand-orange transition-colors duration-300"
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="(34) 9 9999-9999"
                  className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-3
                             text-white placeholder-white/30 text-sm
                             focus:outline-none focus:border-brand-orange transition-colors duration-300"
                />
              </div>
            </div>

            {/* Tipo de serviço */}
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">
                Tipo de projeto
              </label>
              <select
                name="service"
                value={form.service}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-3
                           text-white text-sm appearance-none
                           focus:outline-none focus:border-brand-orange transition-colors duration-300"
              >
                <option value="" className="bg-brand-navy">Selecione uma opção</option>
                <option value="residencial" className="bg-brand-navy">Construção Residencial</option>
                <option value="comercial"   className="bg-brand-navy">Obra Comercial</option>
                <option value="reforma"     className="bg-brand-navy">Reforma / Renovação</option>
                <option value="incorporacao" className="bg-brand-navy">Incorporação Imobiliária</option>
                <option value="outro"       className="bg-brand-navy">Outro</option>
              </select>
            </div>

            {/* Mensagem */}
            <div>
              <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">
                Mensagem *
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Descreva seu projeto..."
                className="w-full bg-white/5 border border-white/20 rounded-sm px-4 py-3
                           text-white placeholder-white/30 text-sm resize-none
                           focus:outline-none focus:border-brand-orange transition-colors duration-300"
              />
            </div>

            {/* Botão de envio */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 py-4 bg-brand-orange
                         text-white font-semibold uppercase tracking-widest text-sm rounded-sm
                         hover:bg-brand-amber shadow-lg shadow-brand-orange/30
                         transition-all duration-300 hover:shadow-brand-orange/50"
            >
              {sent ? 'Mensagem enviada! ✓' : (
                <>
                  Enviar mensagem
                  <Send size={16} />
                </>
              )}
            </button>

            {sent && (
              <p className="text-center text-brand-orange text-sm">
                Obrigado! Entraremos em contato em breve.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
