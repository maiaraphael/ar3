import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

/**
 * CustomCursor – substitui o cursor padrão do browser por um cursor
 * circular animado com os cores da marca.
 * Desabilita-se automaticamente em dispositivos touch.
 */
export default function CustomCursor() {
  const cursorRef  = useRef(null)
  const dotRef     = useRef(null)
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    // Não renderiza em touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const cursor = cursorRef.current
    const dot    = dotRef.current
    if (!cursor || !dot) return

    // Posição suavizada com GSAP ticker
    let mouseX = window.innerWidth  / 2
    let mouseY = window.innerHeight / 2
    let curX   = mouseX
    let curY   = mouseY

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      // Ponto pequeno: segue diretamente
      gsap.set(dot, { x: mouseX - 4, y: mouseY - 4 })
    }
    window.addEventListener('mousemove', onMouseMove)

    // Anel grande: segue com delay (lerp)
    const tick = () => {
      curX += (mouseX - curX) * 0.12
      curY += (mouseY - curY) * 0.12
      gsap.set(cursor, { x: curX - 20, y: curY - 20 })
    }
    gsap.ticker.add(tick)

    // Reações a links e botões
    const addHover = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor="hover"]')
      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHover(true))
        el.addEventListener('mouseleave', () => setIsHover(false))
      })
    }
    addHover()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      gsap.ticker.remove(tick)
    }
  }, [])

  return (
    <>
      {/* Anel grande – segue com delay */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border
                    transition-all duration-200 mix-blend-difference
                    ${isHover
                      ? 'w-14 h-14 border-brand-orange border-2 bg-brand-orange/10'
                      : 'w-10 h-10 border-white border'
                    }`}
        style={{ transform: 'translate(-9999px, -9999px)' }}
      />

      {/* Ponto central – segue direto */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] rounded-full
                    transition-all duration-150
                    ${isHover ? 'w-2 h-2 bg-brand-orange' : 'w-2 h-2 bg-white'}`}
        style={{ transform: 'translate(-9999px, -9999px)' }}
      />
    </>
  )
}
