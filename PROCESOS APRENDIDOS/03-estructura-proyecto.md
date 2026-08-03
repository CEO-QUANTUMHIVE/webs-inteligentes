# 03 — ESTRUCTURA DE PROYECTO CORRECTA

> Estructura de carpetas y archivos para un proyecto Web Factory.

---

## ESTRUCTURA RECOMENDADA

```
web-factory/
├── AGENTS.md                          # Instrucciones para agentes
├── CONTEXTO/
│   └── CONTEXTO_1.md                  # Contexto del proyecto
├── documentacion/
│   ├── product-brief.md
│   ├── pipeline.md
│   └── commercial-offer.md
├── sistema-de-diseno/
│   ├── tokens/
│   │   ├── tokens.ts                  # Tokens JS
│   │   └── tokens.css                 # Tokens CSS
│   ├── efectos/
│   │   ├── effects.ts                 # Efectos disponibles
│   │   └── effects-stack.json         # Stack de efectos
│   ├── componentes/
│   │   └── registry.ts               # Registro de componentes
│   └── plantillas/
│       └── templates.ts              # Plantillas
├── habilidades/
│   ├── copiar-pagina.md              # Skill: clonar páginas
│   ├── construir-demo-web.md         # Skill: construir demo
│   ├── armar-demo-web/
│   │   └── SKILL.md                  # Skill: armar demo
│   ├── paletas-por-nicho/
│   │   ├── gastronomia.md
│   │   ├── servicios-profesionales.md
│   │   ├── retail-moderno.md
│   │   ├── wellness-yoga.md
│   │   ├── barbearias.md
│   │   └── educacion.md
│   └── biblioteca-referencias/
│       ├── hero-impactantes.md
│       ├── landing-ecosystem.md
│       ├── ecommerce-premium.md
│       └── servicios-profesionales.md
├── plantillas/
│   ├── servicios-con-turnos/
│   ├── ecommerce/
│   ├── catalogo-efectos/
│   └── funnel-diagnostico/
├── motor-agentes/
│   ├── widget-web/
│   ├── conocimiento/
│   ├── captura-leads/
│   └── enrutador-proveedores/
├── evaluaciones/
│   ├── visual/
│   ├── factual/
│   └── conversacional/
├── clientes/
│   ├── pilotos/
│   └── [nombre-cliente]/              # ← Proyecto del cliente
│       ├── package.json
│       ├── next.config.ts
│       ├── tsconfig.json
│       ├── components.json
│       ├── postcss.config.mjs
│       ├── public/
│       ├── out/                        # Build estático
│       └── src/
│           ├── app/
│           │   ├── layout.tsx
│           │   ├── globals.css
│           │   ├── page.tsx            # Home
│           │   ├── page.module.css
│           │   ├── [pagina-1]/
│           │   │   └── page.tsx
│           │   └── [pagina-2]/
│           │       └── page.tsx
│           ├── components/
│           │   └── ui/
│           │       ├── button.tsx
│           │       └── [componentes-vengence].tsx
│           └── lib/
│               └── utils.ts
└── PROCESOS APRENDIDOS/               # ← Esta carpeta
    ├── 00-RESUMEN-EJECUTIVO.md
    ├── 01-errores-corregidos.md
    └── ...
```

---

## ARCHIVOS CRÍTICOS

### `next.config.ts`
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",  // ← CRÍTICO para Netlify
};

export default nextConfig;
```

### `src/app/layout.tsx`
```tsx
import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, Inter } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "[Nombre del Cliente] — Webs Inteligentes",
  description: "[Descripción breve]",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${orbitron.variable} ${spaceGrotesk.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### `src/app/globals.css` (estructura mínima)
```css
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-heading: var(--font-orbitron);
  --font-sans: var(--font-space-grotesk);
  --font-body: var(--font-inter);

  /* Colores del cliente */
  --color-qh-cyan: #00d4ff;
  --color-qh-green: #00ff88;
  --color-qh-dark: #050510;
}

/* Utilidades */
.qh-gradient-text {
  background: linear-gradient(135deg, #050510, #00ff88, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.qh-glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}
```

---

## REGLAS

1. **UN solo proyecto por cliente** — no duplicar carpetas
2. **Trabajar siempre en `web-factory/clientes/[nombre]/`**
3. **`out/` se genera con `npm run build`** — nunca editar manualmente
4. **Los componentes Vengeance UI van en `src/components/ui/`**
5. **Cada página nueva = nueva carpeta en `src/app/`**
