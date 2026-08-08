# Orbita y zoom (control de camara)

**ID:** `orbita-zoom` · **Categoria:** escena_spline · **Tipo:** referencia_remota · **Estado:** ACTIVO

Escena oficial de Spline con comportamiento de camara orbita + zoom configurado en la exportacion. Base para visores de producto 360 y exhibiciones interactivas de catalogo.

![preview](preview.webp)

## Datos clave

| Campo | Valor |
|-------|-------|
| Fuente | Spline (escena oficial de la documentacion, via skill web-3d) |
| Autor | Spline, Inc. |
| Licencia | [Uso libre (escena oficial publicada por Spline para embed directo)](https://docs.spline.design/) |
| Uso comercial | si |
| Atribucion requerida | no |
| Peso | 0.3 KB |
| Triangulos | n/a |
| Vertices | n/a |
| Texturas | n/a |
| Animaciones | n/a |
| Transparencia | n/a |
| Nivel de rendimiento | n/a (escena remota) |
| Mobile | si |
| Optimizacion | remota_no_aplica |
| Preview | TEMPORAL |

## Comportamientos compatibles

- `orbita_zoom`

> Los comportamientos NO se guardan en el elemento: se aplican al integrarlo
> usando los patrones de la skill `.claude/skills/web-3d/SKILL.md`.

## Uso rapido

```html
<script type="module" src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"></script>
<spline-viewer url="https://prod.spline.design/U9O6K7fXziMEU7Wu/scene.splinecode"></spline-viewer>
```

La URL publica esta en `escena.json`. Integracion Next.js: ver skill `web-3d`.

## Observaciones

La escena vive en el CDN de Spline; el repo solo guarda la URL publica en escena.json (no se copia el .splinecode). Es una `referencia_remota`, no un asset redistribuible. Escena oficial de la documentacion de Spline (licencia verificable). Las condiciones de embed/uso estan en `escena.json` (campo `condiciones_embed`). Metricas geometricas no aplican. Preview placeholder generada.
