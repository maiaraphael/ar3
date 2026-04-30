# AR3 Construtora — Website Oficial

Site institucional de alto padrão da **AR3 Construtora**, empresa de construção civil de Uberaba – MG.

## 🛠 Stack

| Tecnologia | Uso |
|---|---|
| **React 18 + Vite** | Framework UI + build tool |
| **Tailwind CSS** | Estilização utility-first |
| **GSAP + ScrollTrigger** | Animações e efeitos de scroll |
| **Lucide React** | Ícones |

## 🎨 Paleta de Cores

| Token | Hex | Uso |
|---|---|---|
| `brand-navy` | `#0A1628` | Hero bg, footer, textos escuros |
| `brand-blue` | `#1B3B6F` | Seções de fundo azul médio |
| `brand-sky` | `#1D6FA4` | Acentos, links, ícones |
| `brand-orange` | `#F26522` | CTAs, destaques, acentos primários |
| `brand-amber` | `#FF8C42` | Hover states |
| `brand-offwhite` | `#F5F5F0` | Seções de fundo claro |

## 🚀 Como rodar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Build de produção
npm run build
```

## 📁 Onde inserir imagens e vídeos

Todos os pontos de inserção de mídia estão comentados com `➤` no código.

### Hero
- `src/components/Hero.jsx` → fundo: substitua o gradiente pela imagem/vídeo real
- Vídeo: descomente a tag `<video>` e aponte para `/public/videos/hero-obra.mp4`

### Sobre
- `src/components/About.jsx` → troque o div placeholder pela tag `<img src="/images/sobre-ar3.jpg" />`
- Mini-card: `/images/detalhe-construtivo.jpg`

### Projetos
- `src/components/Projects.jsx` → campo `image` em cada objeto do array `PROJECTS`
- Caminhos sugeridos: `/images/projetos/residencia-premium.jpg`, etc.

### Diferenciais
- `src/components/Differentials.jsx` → foto de detalhe construtivo premium

### Depoimentos
- `src/components/Testimonials.jsx` → campo `photo` em cada objeto `TESTIMONIALS`

### Estrutura de pastas recomendada para as mídias:
```
public/
├── images/
│   ├── hero-bg.jpg
│   ├── sobre-ar3.jpg
│   ├── detalhe-construtivo.jpg
│   ├── diferenciais-obra.jpg
│   ├── projetos/
│   │   ├── residencia-premium.jpg
│   │   ├── edificio-corporativo.jpg
│   │   ├── condominio-reserva-verde.jpg
│   │   ├── chacara-horizonte.jpg
│   │   ├── clinica-medicina-avancada.jpg
│   │   └── loja-flagship.jpg
│   └── clientes/
│       ├── joao-marcia.jpg
│       ├── ricardo-almeida.jpg
│       ├── familia-monteiro.jpg
│       └── ana-ferreira.jpg
└── videos/
    └── hero-obra.mp4
```

## ✅ Informações a atualizar

- [ ] `src/components/Contact.jsx` → Telefone, e-mail e endereço reais
- [ ] `src/components/Contact.jsx` → Links das redes sociais
- [ ] `src/components/Footer.jsx` → Links das redes sociais
- [ ] Integrar formulário com EmailJS/Formspree (ver TODO no Contact.jsx)
