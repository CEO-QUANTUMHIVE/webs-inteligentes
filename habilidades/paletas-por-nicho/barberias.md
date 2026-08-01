# Paleta: Barberías

Cálida y clásica, para barberías, peluquerías masculinas y grooming.

> **Contrastes medidos, no estimados.** La versión anterior afirmaba "contraste
> perfecto" sin verificarlo y tenía dos combinaciones que no cumplían WCAG AA.
> Los ratios de abajo están calculados.

## Tokens

```css
--marca-primario:     #d97706;  /* ámbar clásico */
--marca-secundario:   #92400e;  /* marrón */
--marca-acento:       #fbbf24;  /* dorado */
--marca-fondo:        #1c1917;  /* stone oscuro */
--marca-superficie:   #292524;  /* tarjetas sobre el fondo */
--marca-texto:        #fafaf9;  /* blanco cálido */
--marca-texto-suave:  #a8a29e;
--marca-borde:        #b45309;  /* ámbar oscuro — ver nota 2 */
--marca-sobre-primario: #1c1917; /* texto DENTRO del botón — ver nota 1 */
```

## Contrastes verificados

| Combinación | Ratio | Mínimo | |
|---|---|---|---|
| Blanco cálido sobre fondo | 16.74:1 | 4.5 | ✓ |
| Ámbar sobre fondo (texto) | 5.49:1 | 4.5 | ✓ |
| Dorado sobre fondo | 10.48:1 | 4.5 | ✓ |
| Blanco sobre marrón (header) | 7.09:1 | 4.5 | ✓ |
| Negro cálido sobre ámbar | 5.49:1 | 4.5 | ✓ |

### Nota 1 — el error que traía la paleta vieja

**El texto del botón principal va en `#1c1917`, no en blanco.**

Blanco sobre ámbar da **3.19:1** y no cumple. Es el CTA, el elemento más
clickeado de la web: ahí el contraste no es un detalle.

```html
<!-- mal -->
<a class="bg-[#d97706] text-white">Reservar turno</a>
<!-- bien -->
<a class="bg-[#d97706] text-[#1c1917] font-semibold">Reservar turno</a>
```

### Nota 2 — el marrón no sirve de borde

`#92400e` sobre el fondo da **2.47:1**, por debajo del 3:1 que necesitan bordes
y separadores. Como bloque de fondo con texto blanco encima sí funciona (7.09:1).

Para bordes finos usar `#b45309` (3.48:1).

## Tipografía

Display con carácter, cuerpo neutro. El rubro tolera —y pide— una display con
personalidad, pero el cuerpo tiene que leerse.

- **Títulos:** Bebas Neue, Oswald o Archivo Black
- **Cuerpo:** Inter o Source Sans 3

## Qué evitar en este nicho

- Rosa, lavanda y pasteles. El dataset de `ui-ux-pro-max` clasifica barbería
  dentro de *Beauty/Spa/Wellness* y devuelve rosa con lavanda: es un spa
  femenino, no una barbería. **Ese resultado no sirve acá.**
- Fondo claro por defecto. El nicho vive en oscuro.
- Glassmorphism como estilo dominante: no encaja con lo clásico y además pide
  cuidado extra de contraste.

## Referencias del rubro

Madera, cuero, metal envejecido, tipografía de cartel antiguo, rayas de poste de
barbero. Fotografía en blanco y negro con un solo acento cálido rinde muy bien.
