# Elementos — Efectos de Cursor

Catálogo de efectos de cursor/mouse para plantillas premium. Todos en **vanilla JS + canvas/CSS**, sin dependencias, copiables a cualquier plantilla HTML o Next.js.

## Formato de ficha

Cada efecto vive en `catalogo/elementos/cursor/<id>/` con tres archivos:

```
<id>/
├── ficha.json    # metadatos (formato abajo)
├── README.md     # qué hace, cuándo usarlo, integración, fallback
└── demo.html     # standalone, abrible con doble clic, sin build
```

### ficha.json

Análogo a `catalogo/plantillas/basicas/<id>/ficha.json`, adaptado a elementos:

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | string | Identificador único, prefijo `cur-`. |
| `nombre` | string | Nombre legible en español. |
| `categoria` | string | Siempre `cursor` en esta carpeta. |
| `subcategoria` | string | `seguidor` \| `iluminacion` \| `particulas` \| `interaccion`. |
| `version` | string | SemVer. |
| `descripcion` | string | Una línea, qué hace. |
| `tecnica` | string | `dom-transform` \| `canvas-2d` \| `css-only`. |
| `dependencias` | string[] | Vacío = vanilla puro. |
| `costoRendimiento` | string | `bajo` \| `medio` \| `alto`. |
| `compatibleMovil` | bool | Si tiene fallback táctil usable. |
| `respetaReducedMotion` | bool | Obligatorio `true` para publicar. |
| `estilosPremium` | string[] | Estilos donde encaja (`Premium 3 — Neon`, etc). |
| `nichosSugeridos` | string[] | Nichos donde tiene sentido. |
| `ruta` | string | Ruta del elemento en el repo. |
| `estado` | string | `piloto` \| `publicada`. |
| `creada` | string | ISO date. |
| `fuenteInvestigacion` | string | Registros consultados + licencia. Implementación propia. |

## Reglas

- **Cero dependencias.** Nada de GSAP, three ni framer para efectos de cursor.
- **Sólo `transform` y `opacity`.** Nunca animar layout properties.
- **`requestAnimationFrame` siempre.** Nunca escribir estilos directo en `mousemove`.
- **`prefers-reduced-motion` obligatorio.** Sin excepción.
- **Desactivar en touch.** `(hover: none)` no debe cargar el efecto.
- **`pointer-events: none`** en todo overlay para no romper clics.
- **1 efecto de cursor por página.** No se combinan salvo que sean de capas distintas.
- **`destroy()` obligatorio.** Todo efecto debe poder limpiarse (listeners + rAF).

## Investigación previa

Registros consultados antes de implementar. **No se copió código**; se estudiaron los patrones y se reimplementaron en vanilla:

| Fuente | Licencia | Aporte |
|---|---|---|
| [tholman/cursor-effects](https://github.com/tholman/cursor-effects) | MIT | Patrón de trail y following-dot en canvas. |
| [tgomilar/mouse-animations](https://github.com/tgomilar/mouse-animations) | MIT | Taxonomía de efectos (trail, spotlight, magnetic, invert). |
| [ReactBits](https://reactbits.dev) — BlobCursor / SplashCursor | MIT | Inercia y lag diferencial. Descartada su base React+GSAP. |
| [lumojs/lumojslib](https://github.com/lumojs/lumojslib) | MIT | API de configuración y estados de hover. |
| Vengeance UI (`image-trail`, `cursor-card`, `highlight-grid`) | MIT | Ya presente en `sistema-de-diseno/efectos/effects-stack.json`. |

Se implementó propio en vez de instalar porque las plantillas p3/p6/p8 son HTML plano sin bundler, y los paquetes existentes exigen React, GSAP o npm.

## Índice

Ver `indice.json`.
