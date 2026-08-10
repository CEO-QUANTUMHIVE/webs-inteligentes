# Hover Magnético

Implementación del patrón documentado en `habilidades/web-premium/patrones/motion/magnetic-hover.md`.

## Qué hace

Cuando el cursor entra en el radio de atracción de un elemento, este se desplaza hacia él. Al salir, vuelve a su posición con retorno elástico. Opcionalmente el contenido interno se desplaza más que el contenedor, generando profundidad.

## Cuándo usarlo

- CTAs principales. Uno o dos por página.
- Íconos sociales, links de navegación.
- Interfaces donde el cursor es protagonista.

## Cuándo NO usarlo

- Listas largas de botones: se vuelve ruido.
- Elementos dentro de áreas con scroll horizontal.
- Formularios.

## Estructura

- Contenedor con `position: relative`.
- Desplazamiento máximo 5-15px. Más que eso se siente roto.
- Retorno con `cubic-bezier` de rebote suave.

## Técnica

- Un solo listener en `window`, no uno por elemento. Con muchos botones esto importa.
- Distancia calculada desde el centro del elemento al cursor.
- Atracción proporcional: fuerte cerca del centro, nula en el borde del radio.
- `transform: translate3d()`, nunca `left`/`top`.
- Elementos fuera del radio no se tocan: si ya están en reposo, se saltean.

## Costo de performance

Bajo. Un rAF compartido y un listener global. `getBoundingClientRect` se cachea y sólo se recalcula en resize/scroll.

## Mobile fallback

No se inicializa en táctil. Se reemplaza por `:active { transform: scale(.97) }` vía CSS, que ya está en la demo.

## Reduced motion

No se inicializa. Los elementos quedan estáticos con sus estados `:hover` de CSS.

## Integración

```html
<a href="#" class="qh-magnetico" data-fuerza="0.35">
  <span class="qh-magnetico-int">Reservar</span>
</a>

<script>
  const mag = iniciarMagnetico('.qh-magnetico', { radio: 90, fuerza: 0.35 });
</script>
```

## Opciones

| Opción | Default | Descripción |
|---|---|---|
| `radio` | `90` | Radio de atracción en px desde el borde. |
| `fuerza` | `0.35` | 0-1. Cuánto del desplazamiento se aplica. |
| `maxDesplazamiento` | `14` | Tope en px. |
| `fuerzaInterna` | `0.55` | Multiplicador del contenido interno. |
| `suavidad` | `0.2` | Interpolación por frame. |
| `selectorInterno` | `.qh-magnetico-int` | Hijo con desplazamiento diferencial. |

`data-fuerza` en el elemento pisa la config global.
