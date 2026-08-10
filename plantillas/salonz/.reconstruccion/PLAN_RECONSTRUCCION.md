# PLAN RECONSTRUCCION — SALONZ

## Resumen Ejecutivo

Clonar https://salonz-nx.webflow.io/ (plantilla Webflow de barbershop/grooming) a Next.js 16 + React 19 + GSAP + ScrollTrigger, manteniendo fidelidad visual y de animaciones.

## Stack Tecnologico

| Capa | Original | Reconstruccion |
|------|----------|----------------|
| Framework | Webflow | Next.js 16.2.12 |
| UI | jQuery + Webflow IX2 | React 19 + CSS Modules |
| Animaciones | Webflow IX2 (78 interacciones) | GSAP + ScrollTrigger |
| Tipografia | WebFont.js (Prata, Josefin Sans, Montserrat) | next/font (Google Fonts) |
| Iconos | Material Icons + imagenes .webp | Material Icons + SVG propios |
| QA | manual | Playwright + lint |

## Parametros

- **proyecto_destino**: `web-factory/plantillas/salonz`
- **nombre_plantilla**: salonz
- **rubro**: Barberia / Grooming masculino
- **tipo_sitio**: Landing multi-seccion (one-page con anclas)
- **objetivo_recreacion**: pagina_completa
- **modo_adaptacion**: conservar_estilo
- **complejidad_tecnica**: Interaccion Avanzada
- **extraer_elementos**: true
- **capturar_mobile**: true

## Fase 1: Scaffold (30 min)

1. Copiar `plantillas/base-premium` a `web-factory/plantillas/salonz`
2. Instalar dependencias: `gsap`, `@gsap/react`, `playwright`
3. Configurar `globals.css` con tokens de color, tipografia, reset
4. Configurar fuentes con `next/font` (Prata, Josefin Sans, Montserrat)
5. Crear estructura de componentes en `src/components/`

## Fase 2: Componentes Shared (15 min)

- `ButtonHover` — boton con texto flip vertical + fill dorado que sube
- `SectionTitle` — kicker uppercase + divider + H2 con mask reveal
- `RevealMask` — wrapper overflow hidden para animaciones de texto

## Fase 3: Secciones (6-8 horas)

### 3.1 Navbar
- Nav sticky fondo secondary, logo central, 2 menus, dropdown, hamburguesa
- CSS: z-index 101, position sticky, top 0
- Mobile: hamburguesa con 3 lineas animadas a X

### 3.2 Hero
- Fondo foto con overlay 50% negro + attachment fixed (parallax)
- Logo icono, kicker con dividers, H1 54px, parrafo, boton CTA
- 3 info-cards: direccion, telefonos, emails
- Animaciones: intro stagger con GSAP (logo, kicker, H1, parrafo, boton, info-block)

### 3.3 Partners Marquee
- 11 logos SVG en grid flex
- Wrapper 200vw con translate(-100vw) ligado a PAGE_SCROLL
- Overlays degradado blanco en bordes

### 3.4 About
- 2 columnas: imagen cuadrada + texto
- Border-draw: 4 bordes dorados que se dibujan secuencialmente
- Open-on-scroll: overlay blanco que se abre revelando texto
- GSAP ScrollTrigger con scrub para ambos efectos

### 3.5 Counters
- 4 contadores con efecto odometro
- Columnas de digitos 0-9 trasladadas verticalmente
- Wrapper-left sube, wrapper-reverse baja (efecto mecanico)
- Sufijo (e.g., "+") y titulo debajo

### 3.6 Services
- Grid 3x2 con imagen central (max 420px)
- 6 service-cards: titulo uppercase, texto, icono
- Hover: service-image-wrapper visible + black overlay
- Stagger reveal con GSAP

### 3.7 Pricing
- Fondo oscuro (with-bg), titulo blanco, boton See Pricing
- 3 columnas de listas de precios
- Header secondary, filas nombre/precio con borde dashed

### 3.8 Team + Video
- Grid 3x2 de team-cards: foto 440px, bottom-overlay, nombre, rol, iconos sociales
- Background video: autoplay loop muted playsinline (Pexels 3998457)

### 3.9 FAQ
- 5 acordeones: border tertiary, icono plus -> minus, contenido expande
- Imagen lateral 560px con card flotante "Still Have Questions?"
- useState para toggle, CSS transition para expandir

### 3.10 Testimonials
- 5 avatares circulares (tabs menu) con borde dashed primary
- Paneles: foto grande 320px, nombre, rol, parrafo
- Tab switch con fade/slide

### 3.11 Blog
- Grid 3 blog-cards: thumbnail 3/2 con zoom hover, categoria, autor, H3
- Divider vertical secondary, resumen, read-more con divider animado
- Datos estaticos (no CMS)

### 3.12 Footer
- Fondo imagen + gradiente negro
- Newsletter: logo + titulo + form email
- 4 bloques: logo+parrafo+contacto / links / links / horarios
- Copyright con link Webflow

## Fase 4: QA (1-2 horas)

1. `npm run lint` — verificar sin errores
2. `npm run build` — verificar build exitoso
3. Capturas Playwright desktop (1440px): 12 checkpoints de scroll
4. Capturas Playwright mobile (390px): 12 checkpoints de scroll
5. Verificar: sin errores de consola, recursos fallidos
6. Verificar: reduced motion funciona
7. Verificar: responsive funciona en todos los breakpoints

## Fase 5: Extraccion de Elementos (30 min)

- Analizar componentes candidatos para catalogo interno
- Registrar en CANDIDATO_CATALOGO/ con fichas tecnicas
- Clasificar: reutilizacion directa, adaptacion o reconstruccion

## Fallbacks

- **Video fondo**: si falla, usar imagen estática con overlay
- **Contadores**: si falla GSAP ScrollTrigger, usar IntersectionObserver + CSS transitions
- **Marquee**: si falla, usar CSS animation @keyframes en vez de scrub por scroll
- **Border-draw**: si falla, usar clip-path o SVG stroke-dashoffset

## Estimacion Total

- Scaffold + shared: 45 min
- Secciones: 6-8 horas
- QA: 1-2 horas
- Extraccion: 30 min
- **Total estimado: 8-11 horas**

## Checkpoints de Revisión

1. Scaffold + tokens (verificar que el proyecto compila)
2. Hero + Navbar (primera impresion visual)
3. About + Counters (animaciones complejas)
4. Services + Pricing (grid layouts)
5. Team + FAQ + Testimonials (interactividad)
6. Blog + Footer (cierre de pagina)
7. QA completo (ready for review)
