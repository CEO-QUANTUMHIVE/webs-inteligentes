# Plantilla básica — Gastronomía ("Ceniza — Parrilla & Bodegón")

Plantilla básica #1 del catálogo, nicho gastronomía (parrilla / bodegón).
Nombre de negocio, menú, precios, dirección y teléfono son **ficticios**
(placeholder) — cualquier parecido con un negocio real es coincidencia.

## Dónde vive el código

Esta carpeta (`catalogo/plantillas/basicas/gastronomia/`) guarda la ficha y
la documentación. **El código real de la página vive dentro del proyecto
Next.js**, porque solo así se compila y despliega:

```
clientes/quantum-hive/src/app/catalogo/plantillas/basicas/gastronomia/
├── layout.tsx              # carga Playfair Display + Karla, aisladas del resto del sitio
├── gastronomia.module.css  # paleta y estilos, con variables --t-* propias
└── page.tsx                # las 5 secciones: hero, menu, galeria, reservas, contacto
```

Ruta en producción: `/catalogo/plantillas/basicas/gastronomia`.

No se duplica el código acá para evitar que las dos copias diverjan — esta
carpeta es la fuente de verdad del **catálogo** (ficha + decisiones), no del
código.

## Decisiones de diseño

- **Paleta**: la oficial de [`habilidades/paletas-por-nicho/gastronomia.md`](../../../../../habilidades/paletas-por-nicho/gastronomia.md)
  (naranja cálido `#ff6b35` sobre fondo oscuro elegante `#1a1a2e`), ya
  verificada en ese documento. La consulta a `ui-ux-pro-max` con
  `"restaurant menu food ordering" --design-system` devolvió un patrón
  "Enterprise Gateway" y colores genéricos que no encajaban con un
  restaurante — se descartaron (ver `_recetas/gastronomia.md` para el
  detalle). Sí se usó la tipografía que sugirió: **Playfair Display / Karla**,
  coherente con "elegante, culinario".
- **Sin Vengeance UI ni componentes importados de `components/ui/`**: regla
  2 de `CLAUDE.md` pide CSS puro en páginas de producción, no solo de
  catálogo/demo. Los ids `wf-hero-glass` y `wf-seccion-contacto` del
  `elementos` de la ficha son **referencia conceptual** al registry (hero
  con estética glass, sección de contacto con formulario) — la
  implementación es CSS propio, no un import literal de un componente que
  no existe como archivo.
- **Sin imágenes reales**: la galería usa tiles con gradiente y texto en vez
  de fotos, para no usar fotos de un negocio ajeno ni arriesgar 404 en el
  build estático.
- **Sin JS de cliente**: la página es un server component puro (sin
  `"use client"`), sin `localStorage`/`sessionStorage`. El formulario de
  reservas es HTML nativo (envío real pendiente de integrarse con un backend
  cuando haya cliente).
- **Tipografía aislada por ruta**: `layout.tsx` anidado carga las fuentes de
  Google con `next/font/google` y las expone como variables CSS solo dentro
  de esa subárbol — no toca `src/app/layout.tsx` ni las fuentes globales del
  sitio (Orbitron/Space Grotesk/Inter).

## Dependencias nuevas

Ninguna. Usa Tailwind (ya en el proyecto) solo indirectamente vía
`globals.css`; el layout de la plantilla en sí es CSS Modules puro.

## QA

- `npm run build` verde, ruta listada en el output.
- Mobile 360×640 sin desborde horizontal (grid con `minmax`/`clamp`, sin
  anchos fijos).
- Contraste: texto blanco sobre fondo `#1a1a2e` y naranja `#ff6b35` sobre
  blanco en botones — ambos superan 4.5:1 (verificado en la propia paleta
  oficial).
- Links internos: nav ancla a las 4 secciones + botón "Reservar mesa" +
  enlace de vuelta al catálogo (`/catalogo-plantillas`).
