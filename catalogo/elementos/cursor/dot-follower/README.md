# Punto Seguidor con Anillo

## Qué hace

Reemplaza el cursor nativo por dos capas: un punto sólido que sigue la posición exacta del mouse sin retardo, y un anillo exterior que lo persigue con interpolación suave. El desfase entre ambos crea la sensación de peso y elasticidad.

Sobre elementos interactivos (`a`, `button`, `[data-cursor]`) el anillo se agranda y el punto se encoge.

## Cuándo usarlo

- Landings premium donde el cursor es parte de la identidad.
- Sitios con pocos elementos interactivos, donde el cambio de estado se nota.
- Estilos minimalistas, neón o luxury.

## Cuándo NO usarlo

- Sitios con formularios largos: el cursor custom molesta al escribir.
- Páginas con mucha densidad de links.
- Dashboards o herramientas de uso intensivo.

## Estructura

- Dos `div` en `position: fixed`, `pointer-events: none`, `z-index` alto.
- El punto usa la posición cruda del mouse.
- El anillo interpola con `lerp` hacia esa posición.

## Técnica

- `transform: translate3d(x, y, 0)` para ambas capas.
- Bucle `requestAnimationFrame` único.
- Interpolación lineal: `actual += (objetivo - actual) * factor`.
- `factor` de 0.15 da un retardo natural. Más bajo = más lento.

## Costo de performance

Bajo. Un solo rAF, dos elementos, sólo `transform`. Sin repintado de layout.

## Mobile fallback

No se inicializa si `(hover: none)` o si el dispositivo es táctil. El cursor nativo queda intacto.

## Reduced motion

Con `prefers-reduced-motion: reduce` el anillo deja de interpolar y se pega al punto, o el efecto no se activa según configuración.

## Integración

```html
<script src="cursor-dot-follower.js"></script>
<script>
  const cursor = iniciarDotFollower({
    colorPunto: '#00e5ff',
    colorAnillo: 'rgba(0, 229, 255, 0.5)',
    suavidad: 0.15,
  });
  // cursor.destroy() para limpiar
</script>
```

Para marcar elementos que activan el estado hover:

```html
<div data-cursor="hover">Se agranda el anillo</div>
```

## Opciones

| Opción | Default | Descripción |
|---|---|---|
| `colorPunto` | `#00e5ff` | Color del punto interior. |
| `colorAnillo` | `rgba(0,229,255,0.5)` | Color del borde del anillo. |
| `tamanoPunto` | `8` | Diámetro del punto en px. |
| `tamanoAnillo` | `36` | Diámetro del anillo en px. |
| `suavidad` | `0.15` | 0-1. Menor = más retardo. |
| `escalaHover` | `1.6` | Multiplicador del anillo en hover. |
| `selectorHover` | `a, button, [data-cursor]` | Qué dispara el estado hover. |
| `ocultarNativo` | `true` | Oculta el cursor del sistema. |
