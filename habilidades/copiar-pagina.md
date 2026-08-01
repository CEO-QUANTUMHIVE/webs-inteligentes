---
name: copiar-pagina
description: Copia una página web de referencia y genera una página Next.js + Tailwind de alta fidelidad, aplicando la paleta del nicho del cliente.
---

# Copiar Página Web — Skill Avanzada

> **Versión:** 2.0 — Con análisis visual profundo, mapeo de componentes y generación de código de alta fidelidad.

---

## Objetivo

Replicar una página web de referencia con **alta fidelidad visual** usando Next.js + Tailwind CSS, aplicando la paleta de colores del nicho del cliente y generando código production-ready.

---

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| Framework | Next.js 16+ (React 19) |
| Estilos | Tailwind CSS 4 |
| Componentes | shadcn/ui + Vengeance UI |
| Animaciones | CSS Animations + Framer Motion |
| Análisis | WebFetch + WebSearch |
| Build | `npm run build` → `out/` |
| Deploy | Netlify (drag & drop de `out/`) |

---

## Inputs Requeridos

| Input | Requerido | Descripción | Ejemplo |
|-------|-----------|-------------|---------|
| `url-referencia` | Sí | URL de la página a copiar | `https://ejemplo.com` |
| `nombre-cliente` | Sí | Nombre del negocio | `Café Aroma` |
| `nicho` | Sí | Tipo de negocio | `gastronomia` |
| `paleta-personalizada` | No | Colores específicos | `{primary: "#ff6b35"}` |
| `secciones` | No | Qué secciones copiar | `["hero", "servicios"]` |
| `nivel-fidelidad` | No | `alta`, `media`, `baja` | Default: `alta` |

---

## Flujo de Trabajo Detallado

### FASE 0: Preparación (2 min)

```bash
# 1. Verificar que estamos en el directorio correcto
ls package.json

# 2. Verificar que node_modules existe
ls node_modules/.package-lock.json

# 3. Verificar next.config.ts
cat next.config.ts  # Debe tener output: "export"
```

**Si falta algo, corregir ANTES de continuar.**

---

### FASE 1: Análisis Visual Profundo (10 min)

#### Paso 1.1: Obtener el HTML

```bash
# Usar WebFetch para obtener el contenido
webfetch → url: [url-referencia], format: "html"
```

#### Paso 1.2: Analizar estructura

```javascript
// Extraer estructura del documento
const analisis = {
  // 1. Estructura general
  estructura: {
    header: !!document.querySelector('header, nav, [class*="nav"]'),
    hero: !!document.querySelector('[class*="hero"], section:first-of-type'),
    sections: document.querySelectorAll('section').length,
    footer: !!document.querySelector('footer'),
    forms: document.querySelectorAll('form').length,
  },

  // 2. Secciones principales
  secciones: [...document.querySelectorAll('section')].map((s, i) => ({
    indice: i,
    id: s.id || `seccion-${i}`,
    clases: s.className,
    tieneH1: !!s.querySelector('h1'),
    tieneH2: !!s.querySelector('h2'),
    tieneForm: !!s.querySelector('form'),
    tieneGrid: !!s.querySelector('[class*="grid"]'),
    tieneCards: !!s.querySelector('[class*="card"]'),
    tieneImg: !!s.querySelector('img'),
    tieneVideo: !!s.querySelector('video'),
    numChildren: s.children.length,
  })),

  // 3. Navegación
  nav: {
    items: [...document.querySelectorAll('nav a, header a')].map(a => ({
      texto: a.textContent.trim(),
      href: a.getAttribute('href'),
    })),
    tieneCta: !!document.querySelector('nav button, header a[class*="btn"]'),
  },

  // 4. Contenido
  contenido: {
    titulares: [...document.querySelectorAll('h1, h2, h3')].map(h => ({
      tag: h.tagName,
      texto: h.textContent.trim().substring(0, 100),
    })),
    imagenes: [...document.querySelectorAll('img')].map(img => ({
      src: img.src,
      alt: img.alt,
      width: img.naturalWidth,
      height: img.naturalHeight,
    })),
    videos: [...document.querySelectorAll('video')].length,
  },
};
```

#### Paso 1.3: Extraer estilos computados

```javascript
// Para cada sección principal, extraer estilos clave
const estilos = {
  body: {
    bgColor: getComputedStyle(document.body).backgroundColor,
    textColor: getComputedStyle(document.body).color,
    fontFamily: getComputedStyle(document.body).fontFamily,
  },
  header: (() => {
    const h = document.querySelector('header, nav');
    if (!h) return null;
    return {
      bgColor: getComputedStyle(h).backgroundColor,
      backdropFilter: getComputedStyle(h).backdropFilter,
      borderBottom: getComputedStyle(h).borderBottom,
      padding: getComputedStyle(h).padding,
    };
  })(),
  hero: (() => {
    const hero = document.querySelector('[class*="hero"], section:first-of-type');
    if (!hero) return null;
    return {
      bgColor: getComputedStyle(hero).backgroundColor,
      background: getComputedStyle(hero).background,
      minHeight: getComputedStyle(hero).minHeight,
      padding: getComputedStyle(hero).padding,
    };
  })(),
  cards: (() => {
    const card = document.querySelector('[class*="card"], [class*="Card"]');
    if (!card) return null;
    return {
      bgColor: getComputedStyle(card).backgroundColor,
      borderRadius: getComputedStyle(card).borderRadius,
      boxShadow: getComputedStyle(card).boxShadow,
      border: getComputedStyle(card).border,
      padding: getComputedStyle(card).padding,
    };
  })(),
};
```

#### Paso 1.4: Identificar colores

```javascript
// Extraer paleta de colores completa
const paleta = new Set();

// De estilos inline
document.querySelectorAll('*').forEach(el => {
  const style = getComputedStyle(el);
  ['color', 'backgroundColor', 'borderColor'].forEach(prop => {
    const val = style[prop];
    if (val && val !== 'rgba(0, 0, 0, 0)' && val !== 'transparent') {
      paleta.add(val);
    }
  });
});

// De CSS custom properties
const rootStyles = getComputedStyle(document.documentElement);
const customProps = {};
for (const sheet of document.styleSheets) {
  try {
    for (const rule of sheet.cssRules) {
      if (rule.selectorText === ':root' || rule.selectorText === ':root, :host') {
        for (const prop of rule.style) {
          if (prop.startsWith('--') && !prop.startsWith('--tw')) {
            customProps[prop] = rule.style.getPropertyValue(prop);
          }
        }
      }
    }
  } catch(e) {}
}
```

---

### FASE 2: Mapeo de Componentes (5 min)

Mapear cada elemento visual a un componente concreto:

| Elemento Visual | Componente Tailwind | Componente Vengeance UI |
|----------------|--------------------|-----------------------|
| Header sticky | `sticky top-0 z-50 backdrop-blur-xl` | `spotlight-navbar` |
| Hero con fondo animado | Gradientes CSS + blur | `animated-rays` |
| Texto animado rotativo | `useState` + `setInterval` | `morph-text` o `flip-fade-text` |
| Tarjetas con brillo | `border hover:shadow-[glow]` | `glow-border-card` |
| Botón CTA | `bg-cyan-400 rounded-lg hover:scale` | `radial-glow-button` |
| Grid de features | `grid grid-cols-3 gap-6` | `agent-bento-grid` |
| Dock de navegación | `fixed bottom-6 flex gap-2` | `glass-dock` |
| Footer | `border-t py-12` | Componente simple |
| Sección de pricing | `grid grid-cols-3 gap-8` | Tarjetas con `glow-border-card` |
| Testimonios | `grid grid-cols-2 gap-6` | Cards con avatar |
| Formulario | `form` + `input` + `button` | shadcn/ui form |

---

### FASE 3: Generación de Código (20 min)

#### Paso 3.1: Estructura del proyecto

```bash
# Crear estructura (si no existe)
mkdir -p src/app/[nombre-pagina]
mkdir -p src/components/ui
```

#### Paso 3.2: Layout base

```tsx
// src/app/layout.tsx
import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, Inter } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "[Nombre del Cliente] — Webs Inteligentes",
  description: "[Descripción del negocio]",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${orbitron.variable} ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
```

#### Paso 3.3: Globals CSS con tokens

```css
/* src/app/globals.css */
@import "tailwindcss";
@import "tw-animate-css";
@import "shadcn/tailwind.css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --font-heading: var(--font-orbitron);
  --font-sans: var(--font-space-grotesk);
  --font-body: var(--font-inter);

  /* Colores extraídos del análisis */
  --color-primary: #[color-primario];
  --color-secondary: #[color-secundario];
  --color-accent: #[color-acento];
  --color-bg: #[color-fondo];
}

:root {
  --background: #[color-fondo];
  --foreground: #[color-texto];
}

body {
  background-color: var(--background);
  color: var(--foreground);
  font-family: var(--font-sans), sans-serif;
}

/* Utilidades reutilizables */
.gradient-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass {
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.glow {
  box-shadow: 0 0 20px rgba(var(--color-primary-rgb, 0, 212, 255), 0.3);
}
```

#### Paso 3.4: Generar page.tsx por secciones

**REGLA:** Generar UNA sección a la vez. Verificar que compila antes de continuar.

```tsx
// src/app/[nombre-pagina]/page.tsx
"use client";

export default function NombrePagina() {
  return (
    <div className="min-h-screen bg-[#[color-fondo]] text-white">
      <Header />
      <Hero />
      <Servicios />
      <CTA />
      <Footer />
    </div>
  );
}

// Generar cada componente como función separada
function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#[color-fondo]]/80 backdrop-blur-xl">
      {/* Contenido del header */}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center px-4 overflow-hidden">
      {/* Background effects */}
      {/* Contenido del hero */}
    </section>
  );
}

// ... etc
```

---

### FASE 4: Personalización por Nicho (10 min)

1. **Aplicar paleta de colores**
   ```bash
   # Leer paleta del nicho
   cat habilidades/paletas-por-nicho/[nicho].md
   ```

2. **Reemplazar contenido dummy**
   - Nombre del cliente → nombre real
   - Servicios genéricos → servicios reales
   - Textos placeholder → textos reales
   - Imágenes placeholder → URLs reales o `/placeholder.svg`

3. **Ajustar copy según nicho**
   - Gastronomía: "Menú", "Reservas", "Horarios"
   - Servicios: "Cotización", "Presupuesto", "Consulta"
   - Retail: "Productos", "Ofertas", "Carrito"
   - Wellness: "Clases", "Turnos", "Bienestar"

---

### FASE 5: QA Visual (10 min)

#### Paso 5.1: Build

```bash
npm run build
```

**Verificar:**
- [ ] Build exitoso sin errores
- [ ] Todas las rutas aparecen en el output
- [ ] La carpeta `out/` se genera

#### Paso 5.2: Verificación manual

```bash
# Abrir en navegador (usar live-server o similar)
npx serve out
```

**Verificar CADA página:**
- [ ] Header visible y funcional
- [ ] Hero se ve correcto
- [ ] Contenido legible
- [ ] Colores correctos
- [ ] Responsive (mobile/tablet/desktop)
- [ ] Animaciones smooth
- [ ] Links funcionales
- [ ] Formularios funcionales

#### Paso 5.3: Comparar con original

```
1. Abrir original en una pestaña
2. Abrir copia en otra pestaña
3. Comparar:
   - Layout general
   - Colores y contrastes
   - Tipografía
   - Espaciado
   - Animaciones
   - Responsive
```

---

### FASE 6: Deploy (5 min)

```bash
# 1. Build final
npm run build

# 2. Verificar out/
ls out/

# 3. Deploy a Netlify
# Opción A: Drag & drop de out/
# Opción B: netlify deploy --prod --dir=out

# 4. Verificar en producción
# Abrir URL de Netlify y verificar
```

---

## Paletas por Nicho

### Gastronomía
```css
--primary: #ff6b35;    /* Naranja cálido */
--secondary: #004e89;  /* Azul profundo */
--accent: #ffd166;     /* Dorado */
--background: #1a1a2e; /* Oscuro elegante */
```

### Servicios Profesionales
```css
--primary: #2563eb;    /* Azul profesional */
--secondary: #1e40af;  /* Azul oscuro */
--accent: #10b981;     /* Verde éxito */
--background: #0f172a; /* Slate oscuro */
```

### Retail Moderno
```css
--primary: #ec4899;    /* Rosa moderno */
--secondary: #8b5cf6;  /* Púrpura */
--accent: #06b6d4;     /* Cyan */
--background: #18181b; /* Zinc oscuro */
```

### Wellness/Yoga
```css
--primary: #10b981;    /* Verde salud */
--secondary: #059669;  /* Verde oscuro */
--accent: #f59e0b;     /* Dorado natural */
--background: #0a1628; /* Azul muy oscuro */
```

### Barberías
```css
--primary: #dc2626;    /* Rojo clásico */
--secondary: #991b1b;  /* Rojo oscuro */
--accent: #f5f5f4;     /* Blanco cálido */
--background: #1c1917; /* Negro cálido */
```

### Educación
```css
--primary: #3b82f6;    /* Azul conocimiento */
--secondary: #1d4ed8;  /* Azul profundo */
--accent: #22c55e;     /* Verde éxito */
--background: #0f172a; /* Oscuro neutro */
```

---

## Errores Comunes y Soluciones

| Error | Causa | Solución |
|-------|-------|----------|
| Build falla con `JSX` | React 19 no tiene namespace JSX | Usar `React.JSX.Element` |
| Colores no se ven | Variables CSS no definidas | Verificar `globals.css` tiene las variables |
| Tipografía incorrecta | Font no importada | Verificar `layout.tsx` tiene `next/font/google` |
| Responsive roto | Falta `md:` o `lg:` | Agregar breakpoints de Tailwind |
| Animaciones lentas | Demasiados elementos animados | Máximo 2-3 animaciones por sección |
| Imágenes no cargan | Rutas incorrectas | Usar `/placeholder.svg` o URLs absolutas |
| Links rotos | href incorrecto | Verificar rutas relativas (`/pagina`) |
| CSS no aplica | Tailwind no config | Verificar `postcss.config.mjs` y `globals.css` |
| Build lento | node_modules corrupto | `rm -rf node_modules && npm install` |
| Netlify 404 | `output: "export"` faltante | Agregar a `next.config.ts` |

---

## Checklist de Fidelidad

### Estructura (40%)
- [ ] Mismas secciones que el original
- [ ] Mismo orden de secciones
- [ ] Mismo layout (grid, flex, etc.)
- [ ] Mismas proporciones aproximadas

### Visual (40%)
- [ ] Colores equivalentes (no idénticos)
- [ ] Tipografía similar
- [ ] Espaciado consistente
- [ ] Bordes y sombras similares
- [ ] Contraste adecuado

### Funcionalidad (20%)
- [ ] Links internos funcionan
- [ ] Formularios envían (o simulan)
- [ ] Animaciones suaves
- [ ] Responsive funciona
- [ ] Performance aceptable

---

## Métricas de Éxito

| Métrica | Objetivo |
|---------|----------|
| Tiempo de análisis | < 10 min |
| Tiempo de generación | < 25 min |
| Fidelidad visual | > 85% |
| Build exitoso | 100% |
| Responsive | 100% |
| Tiempo de carga | < 3s |

---

## Integración con Pipeline

```
1. copiar-pagina → Generar web de alta fidelidad
2. qa-web-cliente → Verificar calidad
3. personalizar → Agregar info real del cliente
4. agente-conversacional → Integrar chatbot
5. deploy → Netlify
6. propuesta → Enviar al cliente
```
