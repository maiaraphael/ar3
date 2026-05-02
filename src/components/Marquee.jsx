const ITEMS = [
  'PRECISÃO', 'COMPROMISSO', 'ALTO PADRÃO', 'EXCELÊNCIA',
  'QUALIDADE', 'INOVAÇÃO', 'DEDICAÇÃO', 'CONFIANÇA',
]

// Duplica para loop contínuo
const TRACK = [...ITEMS, ...ITEMS, ...ITEMS]

export default function Marquee() {
  return (
    <div className="relative overflow-hidden bg-brand-orange py-4 select-none z-10">
      {/* Faixa animada */}
      <div
        className="flex whitespace-nowrap"
        style={{ animation: 'marquee-scroll 28s linear infinite' }}
      >
        {TRACK.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-5 mx-5">
            <span className="text-white font-sans font-black text-sm uppercase tracking-[0.22em]">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 shrink-0" />
          </span>
        ))}
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  )
}
