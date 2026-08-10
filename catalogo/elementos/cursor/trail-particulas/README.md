# Estela de Partículas

## Qué hace

El cursor emite partículas que se desvanecen mientras derivan hacia abajo. La cantidad emitida depende de la velocidad del mouse: quieto no emite nada, rápido deja una estela densa.

## Cuándo usarlo

- Heroes de estilo neón, canvas interactivo o cristal.
- Secciones puntuales donde querés un momento de asombro.
- Nichos con carga sensorial: gastronomía (brasas), wellness (polvo), retail (destellos).

## Cuándo NO usarlo

- Páginas completas. Acotalo al hero o a una sección.
- Sitios con contenido denso: distrae.
- Junto a otro efecto de cursor.

## Estructura

- Un `<canvas>` fijo con `pointer-events: none`.
- Pool de partículas de tamaño fijo. Se reciclan, no se crean.
- Cada partícula: posición, velocidad, vida, tamaño.

## Técnica

- Emisión proporcional a la distancia recorrida entre frames.
- `globalCompositeOperation = 'lighter'` para el glow aditivo.
- El bucle se pausa solo cuando no quedan partículas vivas y el mouse está quieto.
- Canvas redimensionado con `devicePixelRatio`, capado a 2 para no reventar en pantallas 4K.

## Costo de performance

Medio. Es el único de la tanda que pinta canvas cada frame.

Mitigaciones aplicadas:
- Pool fijo (default 120). Nunca crece.
- Auto-pausa en reposo: sin movimiento y sin partículas vivas, no hay rAF.
- DPR capado a 2.
- Sin sombras de canvas (`shadowBlur` es carísimo); el glow se logra con `lighter`.

## Mobile fallback

No se inicializa en táctil. Si querés algo en mobile, usá partículas ambientales sin cursor, que es otro efecto.

## Reduced motion

No se inicializa.

## Integración

```html
<canvas class="qh-trail"></canvas>
<script>
  const trail = iniciarTrail({
    colores: ['#00e5ff', '#b14aed'],
    maxParticulas: 120,
  });
</script>
```

Acotado a una sección:

```js
iniciarTrail({ contenedor: document.querySelector('#hero') });
```

## Opciones

| Opción | Default | Descripción |
|---|---|---|
| `colores` | `['#00e5ff','#b14aed']` | Paleta. Se elige al azar por partícula. |
| `maxParticulas` | `120` | Tamaño del pool. |
| `tamanoMin` / `tamanoMax` | `1` / `3.5` | Radio en px. |
| `vida` | `55` | Frames que dura una partícula. |
| `gravedad` | `0.045` | Caída por frame. |
| `emisionPorPx` | `0.25` | Partículas por px recorrido. |
| `contenedor` | `document.body` | Dónde se monta el canvas. |
