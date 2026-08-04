# Plantilla básica — Barbería ("La Navaja — Barbería Clásica")

Placeholder ficticio (nombre, barberos, precios, dirección) — no representa
ningún negocio real.

## Dónde vive el código

```
clientes/quantum-hive/src/app/catalogo/plantillas/basicas/barberia/
├── layout.tsx             # carga Bebas Neue + Inter
├── barberia.module.css    # paleta y estilos, variables --t-*
└── page.tsx                # hero, servicios, galeria, turnos, equipo, contacto
```

Ruta en producción: `/catalogo/plantillas/basicas/barberia`.

## Decisiones de diseño

- **Paleta y tipografía**: las oficiales de
  [`habilidades/paletas-por-nicho/barberias.md`](../../../../../habilidades/paletas-por-nicho/barberias.md),
  no las de `ui-ux-pro-max`. El propio doc de paleta advierte que la
  herramienta clasifica "barbería" como *Beauty/Spa/Wellness* y devuelve
  rosa/lavanda — no sirve para este nicho. Ver `_recetas/barberia.md`.
- **Regla de contraste crítica que se respetó**: el texto dentro del botón
  primario (`.btnPrimario`, `.navCta`) usa `--t-primary-foreground: #1c1917`
  (oscuro), **no blanco** — blanco sobre ámbar da 3.19:1 y no cumple WCAG AA.
  Esto está documentado como "Nota 1" en el doc de paleta y se implementó
  literal en el CSS.
- **El marrón secundario no se usó como borde de texto fino**: sobre el fondo
  da 2.47:1 (no cumple). Se usa como bloque sólido (avatares del equipo) o
  se reserva `#b45309` para bordes, tal como indica el doc ("Nota 2").
- **Secciones distintas a gastronomía a propósito**: barbería necesita
  servicios+precios, galería de cortes, turnos y equipo/barberos — no un
  menú de comida. El "mismo formato" entre plantillas es el patrón técnico
  (ruta Next.js, layout con fuentes propias, CSS module con `--t-*`), no la
  estructura de contenido.
- **Sin Vengeance UI, sin imágenes reales, sin JS de cliente** — mismas
  reglas que gastronomía (CSS puro, regla 2 de `CLAUDE.md`; sin fotos de un
  negocio ajeno; server component puro sin `localStorage`).

## Dependencias nuevas

Ninguna.

## QA

- `npm run build` verde, ruta listada en el output.
- Mobile 360×640 sin desborde horizontal.
- Contraste verificado contra los ratios ya medidos en `barberias.md` (no
  se re-midieron a mano, se confía en el doc porque documenta la fórmula).
- Links internos: nav ancla a las 4 secciones + CTA a turnos + vuelta al
  catálogo.
