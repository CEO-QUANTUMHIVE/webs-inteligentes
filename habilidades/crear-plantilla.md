---
name: crear-plantilla
description: Crea y adapta plantillas web premium. Copia el estilo de sitios de referencia desde el browser, cambia textos/imagenes, y genera código Next.js + Tailwind listo para deploy.
---

# Crear y Adaptar Plantillas

> **Versión:** 2.0 — Copia el estilo visual de cualquier sitio web, adaptalo al nicho del cliente con textos/imagenes propias, y generá una web lista para deploy.

---

## ¿Qué es getdesign?

**getdesign** es una herramienta que extrae sistemas de diseño de sitios web públicos:
- Paleta de colores (tokens exactos)
- Tipografía (fuentes, tamaños, jerarquía)
- Espaciado y layout
- Componentes (botones, cards, navs)
- Movimiento (animaciones, transiciones)
- Responsive behavior

**Catálogo disponible:** [getdesign.md/design-md](https://getdesign.md/design-md) — 328+ sitios premium (Stripe, Linear, Vercel, Notion, etc.)

---

## Flujo de Trabajo

### OPCIÓN A: Usando getdesign (recomendada)

#### Paso 1: Extraer DESIGN.md del sitio de referencia

```bash
# Instalar getdesign (una vez)
npm install -g getdesign

# Listar plantillas disponibles
npx getdesign list

# Extraer diseño de un sitio específico
npx getdesign add [slug] --out ./design-referencia.md
```

**Slugs populares:**
| Slug | Sitio | Estilo |
|------|-------|--------|
| `stripe` | Stripe | Fintech, gradientes, limpio |
| `linear` | Linear | SaaS oscuro, minimalista |
| `vercel` | Vercel | Tech, negro + blanco |
| `notion` | Notion | Productividad, clean |
| `raycast` | Raycast | Developer, oscuro |
| `framer` | Framer | Creativo, animado |
| `tailwind-ui` | Tailwind UI | Componentes, profesional |
| `supabase` | Supabase | Open source, tech |

#### Paso 2: Analizar el DESIGN.md

```markdown
# Lo que encontrás en un DESIGN.md:

## Visual Theme
- Warm minimalism / Dark tech / Bold & colorful

## Palette
- Primary: #hex
- Secondary: #hex
- Accent: #hex
- Background: #hex
- Foreground: #hex

## Typography
- Display: Font Name
- Body: Font Name
- Mono: Font Name

## Spacing & Layout
- Grid: 12 columns
- Gutters: 16px / 24px
- Container: max-w-7xl

## Component Patterns
- Buttons: rounded-lg, bg-primary
- Cards: glass morphism, subtle border
- Nav: sticky, backdrop-blur

## Motion
- Duration: 200ms / 300ms
- Easing: ease-out
- Hover: scale(1.02)

## Responsive
- Mobile: stack vertically
- Tablet: 2 columns
- Desktop: 3-4 columns
```

#### Paso 3: Mapear a nuestro stack

```typescript
// Traducir tokens de getdesign a nuestro proyecto
const mapeo = {
  // Colores
  "primary": "var(--color-primary)",
  "secondary": "var(--color-secondary)",
  "background": "var(--color-bg)",

  // Tipografía
  "display": "font-['Orbitron']",  // Nuestro heading
  "body": "font-['Space_Grotesk']", // Nuestro body

  // Componentes
  "card": "rounded-2xl border border-white/10 bg-white/[0.02]",
  "button": "px-6 py-3 rounded-lg font-semibold transition-all",
  "nav": "sticky top-0 z-50 backdrop-blur-xl border-b border-white/10",
};
```

#### Paso 4: Generar la plantilla

```bash
# Crear estructura
mkdir -p clientes/plantillas/[nombre-plantilla]/src/app
mkdir -p clientes/plantillas/[nombre-plantilla]/src/components/ui

# Generar archivos base
# 1. layout.tsx (con fonts del DESIGN.md)
# 2. globals.css (con tokens de color)
# 3. page.tsx (con estructura del sitio)
# 4. next.config.ts (con output: "export")
```

---

### OPCIÓN B: Análisis visual manual (sin getdesign)

Cuando no se puede usar getdesign, hacer análisis manual:

#### Paso 1: Capturar el sitio

```
1. Abrir la URL en el navegador
2. Tomar screenshot completo (desktop)
3. Tomar screenshot móvil
4. Abrir DevTools → Elements
```

#### Paso 2: Extraer estilos

```javascript
// Ejecutar en consola del navegador
const extraccion = {
  colores: (() => {
    const cols = new Set();
    document.querySelectorAll('*').forEach(el => {
      const s = getComputedStyle(el);
      ['color', 'backgroundColor'].forEach(p => {
        const v = s[p];
        if (v && !v.includes('rgba(0, 0, 0, 0)')) cols.add(v);
      });
    });
    return [...cols].slice(0, 10);
  })(),

  fuentes: (() => {
    const fonts = new Set();
    document.querySelectorAll('*').forEach(el => {
      fonts.add(getComputedStyle(el).fontFamily.split(',')[0].trim());
    });
    return [...fonts];
  })(),

  layout: {
    maxWidth: getComputedStyle(document.querySelector('main, [class*="container"]') || document.body).maxWidth,
    padding: getComputedStyle(document.querySelector('main, section') || document.body).padding,
  },
};
console.log(JSON.stringify(extraccion, null, 2));
```

#### Paso 3: Crear DESIGN.md manual

```markdown
# Design System — [Nombre del Sitio]

## Visual Theme
[Describir el estilo general]

## Palette
- Primary: #[hex]
- Secondary: #[hex]
- Accent: #[hex]
- Background: #[hex]
- Text: #[hex]

## Typography
- Heading: [Fuente]
- Body: [Fuente]

## Layout
- Max width: [valor]
- Padding: [valor]
- Grid: [columnas]

## Components
- [Describir componentes clave]
```

#### Paso 4: Seguir el mismo flujo que Opción A

---

## OPCIÓN C: Adaptar desde el Browser (la más rápida)

> **Copia el look & feel de CUALQUIER sitio web directamente desde el navegador, cambia textos/imágenes, y tenés tu web lista en minutos.**

### ¿Cuándo usar esta opción?

- El cliente te mostró una web que le gusta y dice "quiero algo así"
- Encontraste un diseño perfecto en internet
- Querés rapido algo probado visualmente

### Flujo Paso a Paso

#### Paso 1: Abrir el sitio de referencia en el navegador

```
1. Copiar la URL del sitio que al cliente le gusta
2. Abrirla en Chrome/Edge
3. Dejarla abierta (la vamos a usar como referencia visual)
```

#### Paso 2: Extraer el estilo con DevTools

```
1. F12 → pestaña "Elements"
2. click derecho en el body → "Inspect"
3. Pestaña "Computed" → ver colores, fonts, spacing
4. Pestaña "Styles" → ver todas las reglas CSS
```

**Atajos útiles:**
```
Ctrl+Shift+C → Selector de elemento (click para inspeccionar)
Ctrl+Shift+I → Abrir DevTools
Ctrl+Shift+P → Command palette de DevTools
```

#### Paso 3: Extraer colores rápidos

```javascript
// Pegar en la consola de DevTools
(() => {
  const cols = {};
  document.querySelectorAll('h1, h2, h3, a, button, [class*="hero"], header, nav').forEach(el => {
    const s = getComputedStyle(el);
    if (s.color && !s.color.includes('rgba(0, 0, 0, 0)')) cols['text-' + el.tagName] = s.color;
    if (s.backgroundColor && !s.backgroundColor.includes('rgba(0, 0, 0, 0)')) cols['bg-' + el.tagName] = s.backgroundColor;
  });
  console.table(cols);
})();
```

#### Paso 4: Extraer tipografía

```javascript
// Pegar en la consola
(() => {
  const fonts = {};
  document.querySelectorAll('h1, h2, h3, p, a, button').forEach(el => {
    const s = getComputedStyle(el);
    fonts[el.tagName + '.' + el.className.split(' ')[0]] = {
      font: s.fontFamily.split(',')[0].trim(),
      size: s.fontSize,
      weight: s.fontWeight,
      lineHeight: s.lineHeight,
    };
  });
  console.table(fonts);
})();
```

#### Paso 5: Screenshot de referencia

```
1. Ctrl+Shift+P → "Capture full size screenshot"
2. Guardar como referencia visual
3. También capturar secciones individuales
```

#### Paso 6: Crear la web con nuestro stack

```
1. Usar la paleta de colores extraída → globals.css
2. Usar las fonts extraídas → layout.tsx (Google Fonts equivalent)
3. Copiar la estructura de secciones → page.tsx
4. Reemplazar contenido:
   - Textos → textos del cliente
   - Imágenes → imágenes del cliente
   - Links → links del cliente
   - Logo → logo del cliente
```

#### Paso 7: Adaptar al nicho

```typescript
// Ejemplo: adaptar una landing de SaaS a una de restaurante
const adaptaciones = {
  // Cambiar colores
  primary: "#2563eb → #ff6b35",     // Azul tech → Naranja gastronomía
  bg: "#0a0a0a → #1a1a2e",         // Negro → Oscuro cálido

  // Cambiar contenido
  hero: {
    title: "Scale your business → "El mejor sabor de la ciudad"",
    subtitle: "AI-powered platform → "Cocina con pasión, serví con amor"",
    cta: "Start free trial → "Reservá tu mesa"",
  },

  // Cambiar secciones
  features: "SaaS features → Menú, Reservas, Galería",
  pricing: "Monthly plans → Platos y precios",
  testimonials: "Customer reviews → Reseñas de clientes",
};
```

#### Paso 8: Verificar y deployar

```
1. npm run build
2. Abrir out/index.html en navegador
3. Comparar lado a lado con el original
4. Ajustar detalles
5. Deploy a Netlify
```

### Referencia Rápida: Qué copiar y qué cambiar

| Qué copiar del original | Qué cambiar para el cliente |
|--------------------------|----------------------------|
| Layout general | Textos |
| Estructura de secciones | Imágenes |
| Colores (adaptados al nicho) | Logo |
| Tipografía (misma o similar) | Links |
| Espaciado y proportions | Colores (si no coinciden) |
| Animaciones y hover effects | Contenido de cada sección |
| Responsive behavior | Información de contacto |
| Efectos visuales | Call to action |

---

## FASES DE CREACIÓN

### Fase 1: Investigación (10 min)

```
1. Definir nicho del cliente
2. Buscar 3-5 sitios de referencia del mismo nicho
3. Extraer DESIGN.md de cada uno (o análisis manual)
4. Seleccionar el mejor estilo base
5. Crear paleta híbrida (combinando lo mejor de cada referencia)
```

### Fase 2: Estructura (5 min)

```
1. Crear carpetas del proyecto
2. Configurar next.config.ts
3. Configurar package.json
4. Configurar tsconfig.json
5. Verificar que todo compila
```

### Fase 3: Tokens de Diseño (10 min)

```
1. Crear globals.css con variables CSS
2. Definir colores (primary, secondary, accent, bg, text)
3. Definir tipografía (heading, body, mono)
4. Definir espaciado (section-padding, card-padding, gaps)
5. Definir bordes (radius, shadows, borders)
```

### Fase 4: Layout Base (15 min)

```
1. layout.tsx con fonts importados
2. Header/Nav
3. Hero section
4. Footer
5. Verificar build
```

### Fase 5: Secciones (20 min)

```
1. Sección de servicios/features
2. Sección de pricing (si aplica)
3. Sección de testimonios
4. Sección de CTA
5. Verificar build después de cada sección
```

### Fase 6: Pulido (15 min)

```
1. Animaciones hover
2. Responsive design
3. Transiciones suaves
4. Consistencia visual
5. QA final
```

### Fase 7: Documentación (5 min)

```
1. Crear README.md con instrucciones
2. Documentar tokens de diseño
3. Documentar personalización
4. Guardar en carpeta de plantillas
```

---

## PLANTILLAS BASE PRE-CREADAS

### Landing Page Simple
```
Estructura: Hero → Servicios → CTA → Footer
Ideal para: Negocios locales, servicios simples
Tiempo: ~30 min
```

### Landing Page Completa
```
Estructura: Hero → Features → Proceso → Pricing → Testimonios → CTA → Footer
Ideal para: SaaS, agencias, consultores
Tiempo: ~45 min
```

### E-commerce
```
Estructura: Hero → Categorías → Productos → Carrito → Checkout
Ideal para: Tiendas online, retail
Tiempo: ~60 min
```

### Portfolio
```
Estructura: Hero → Proyectos → Sobre mí → Skills → Contacto
Ideal para: Freelancers, creativos
Tiempo: ~30 min
```

### Multi-página
```
Estructura: Home + Sobre + Servicios + Blog + Contacto
Ideal para: Empresas, corporativos
Tiempo: ~60 min
```

---

## SITIOS DE REFERENCIA POR NICHO

### Gastronomía
| Sitio | Estilo | URL |
|-------|--------|-----|
| The Infatuation | Editorial, fotos grandes | theinfatuation.com |
| Eater | Clean, editorial | eater.com |
| Bon Appétit | Moderno, colorido | bonappetit.com |

### Servicios Profesionales
| Sitio | Estilo | URL |
|-------|--------|-----|
| Stripe | Limpio, gradientes | stripe.com |
| Linear | Oscuro, minimalista | linear.app |
| Notion | Clean, productividad | notion.so |

### Tech / SaaS
| Sitio | Estilo | URL |
|-------|--------|-----|
| Vercel | Negro + blanco, tech | vercel.com |
| Supabase | Open source, tech | supabase.com |
| PlanetScale | Database, tech | planetscale.com |

### Wellness / Spa
| Sitio | Estilo | URL |
|-------|--------|-----|
| Headspace | Calm, colores suaves | headspace.com |
| Calm | Natural, relajante | calm.com |
| Alo Yoga | Premium, minimalista | alo.yoga |

### E-commerce / Retail
| Sitio | Estilo | URL |
|-------|--------|-----|
| Apple | Minimalista, premium | apple.com |
| Nike | Bold, dinámico | nike.com |
| Allbirds | Natural, sustentable | allbirds.com |

---

## CHECKLIST DE PLANTILLA

### Estructura
- [ ] Layout con fonts correctos
- [ ] Header/Nav funcional
- [ ] Hero section impactante
- [ ] Secciones de contenido
- [ ] CTA claro
- [ ] Footer completo

### Diseño
- [ ] Tokens de color aplicados
- [ ] Tipografía consistente
- [ ] Espaciado uniforme
- [ ] Bordes y sombras correctos
- [ ] Responsive en todos los breakpoints

### Funcionalidad
- [ ] Links internos funcionan
- [ ] Animaciones smooth
- [ ] Hover effects activos
- [ ] Build exitoso
- [ ] Performance aceptable

### Documentación
- [ ] README.md creado
- [ ] Tokens documentados
- [ ] Instrucciones de personalización
- [ ] Ejemplo de uso incluido

---

## COMANDOS ÚTILES

```bash
# Extraer diseño de getdesign
npx getdesign add [slug] --out ./design.md

# Listar todas las plantillas disponibles
npx getdesign list

# Crear estructura de plantilla
mkdir -p clientes/plantillas/[nombre]/src/{app,components/ui}

# Build de plantilla
cd clientes/plantillas/[nombre] && npm run build

# Deploy de plantilla
netlify deploy --prod --dir=out
```
