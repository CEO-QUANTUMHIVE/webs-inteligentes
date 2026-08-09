# Magnetic Hover

## Qué hace

Un elemento interactivo se desplaza ligeramente hacia el cursor al pasar por encima, como si fuera atraído por un imán. Al salir, vuelve a su posición original con elasticidad sutil.

## Cuándo usarlo

- Botones principales, cards o íconos en landings premium.
- Para dar sensación de tacto y respuesta sin exagerar.
- En interfaces donde el cursor es protagonista (desktop).

## Estructura visual

- Elemento con `position: relative`.
- Movimiento limitado: 5px - 15px de desplazamiento máximo.
- Easing suave de retorno (`ease-out` o spring ligero).

## Comportamiento

- Solo en hover; no requiere scroll.
- El desplazamiento se calcula desde el centro del elemento hacia el cursor.
- No bloquear el clic ni interferir con el layout.

## Técnica sugerida

- CSS `transform: translate(x, y)` actualizado con JS en `mousemove`.
- Throttle o `requestAnimationFrame` para no saturar.
- Alternativa con GSAP: `gsap.quickTo()` para suavidad.

## Costo de performance

- Medio. Requiere listeners de mousemove.
- En listas grandes, aplicar solo al elemento bajo hover, no a todos.
- Desactivar en touch y reduced-motion.

## Mobile fallback

- Desactivar en touch; no hay hover natural.
- Reemplazar por `:active` scale sutil al tocar.

## Referencias

- Común en portfolios y studios creativos. Documentar cada nueva aparición.
