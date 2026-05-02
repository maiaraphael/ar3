import { useState, useCallback } from 'react'
import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import About         from './components/About'
import Projects      from './components/Projects'
import Services      from './components/Services'
import Stats         from './components/Stats'
import Differentials from './components/Differentials'
import Testimonials  from './components/Testimonials'
import Contact       from './components/Contact'
import Footer        from './components/Footer'
import Preloader     from './components/Preloader'

export default function App() {
  // Controla se o preloader ainda está montado no DOM
  const [loading, setLoading] = useState(true)

  // Chamado pelo Preloader quando a animação de saída termina
  const handlePreloaderComplete = useCallback(() => {
    setLoading(false)
  }, [])

  return (
    <>
      {/* ── Preloader: casa sendo construída 0→100% ────────────────── */}
      {loading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Barra de navegação fixa */}
      <Navbar />

      {/* ── Seções da página ────────────────────────────────────────── */}
      <main>
        {/* 01 – Hero fullscreen */}
        <Hero />

        {/* 02 – Sobre a empresa */}
        <About />

        {/* 03 – Portfólio de projetos */}
        <Projects />

        {/* 04 – Serviços oferecidos */}
        <Services />

        {/* 05 – Diferenciais */}
        <Differentials />

        {/* 06 – Contador de resultados (fundo laranja) */}
        <Stats />

        {/* 07 – Depoimentos de clientes */}
        <Testimonials />

        {/* 08 – Formulário de contato */}
        <Contact />
      </main>

      {/* Rodapé */}
      <Footer />
    </>
  )
}
