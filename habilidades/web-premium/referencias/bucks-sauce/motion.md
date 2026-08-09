# Motion en Bucks Sauce

## Entrada del hero

- Producto entra con fade + scale desde 0.9 a 1.
- Copy aparece con stagger de 0.08s - 0.12s.
- Easing: `ease-out-expo` o similar.

## Scroll

- ScrollTrigger pinnea secciones clave.
- Scrub suave (valor 1) para que el usuario sienta control.
- Transiciones de fondo con crossfade sutil.

## Microinteracciones

- Hover sobre botones: scale 1.02 + sombra.
- Hover sobre producto: tilt sutil según cursor.
- Cursor personalizado opcional.

## Timing

- Entradas: 600ms - 900ms.
- Microinteracciones: 150ms - 250ms.
- Stagger: 50ms - 100ms entre elementos.

## Reduced motion

- En `prefers-reduced-motion`, desactivar parallax y pinning.
- Mantener fade simples y eliminar tilt.
