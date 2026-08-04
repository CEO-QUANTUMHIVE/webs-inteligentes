# Paleta: Inmobiliaria

Elegante y premium, para inmobiliarias, desarrollos y venta/alquiler de
propiedades.

> **Contrastes medidos, no estimados** (mismo estándar que `barberias.md` y
> `salud.md`). Creada para el catálogo de plantillas básicas — no existía
> antes.

## Tokens

```css
--marca-primario:      #c9a227;  /* oro envejecido */
--marca-secundario:    #5c4a2e;  /* bronce oscuro, bloque solido */
--marca-acento:        #e8dcc8;  /* piedra / hueso */
--marca-fondo:         #14110d;  /* casi negro calido */
--marca-superficie:    #221c15;  /* tarjetas sobre el fondo */
--marca-texto:         #f7f4ee;  /* blanco calido */
--marca-texto-suave:   #a89a82;
--marca-borde:         #786040;
--marca-sobre-primario:  #14110d; /* texto DENTRO de botones con fondo primario */
```

## Contrastes verificados

| Combinación | Ratio | Mínimo | |
|---|---|---|---|
| Texto sobre fondo | 17.15:1 | 4.5 | ✓ |
| Texto sobre superficie | 15.37:1 | 4.5 | ✓ |
| Oro primario sobre fondo (texto) | 7.78:1 | 4.5 | ✓ |
| Piedra acento sobre fondo (texto) | 13.89:1 | 4.5 | ✓ |
| Texto suave sobre fondo | 6.82:1 | 4.5 | ✓ |
| Texto sobre secundario (bloque sólido) | 7.73:1 | 4.5 | ✓ |
| Borde sobre fondo | 3.18:1 | 3.0 | ✓ |
| Fondo oscuro sobre primario (texto en botón) | 7.78:1 | 4.5 | ✓ |

### Nota — el texto dentro del botón primario va oscuro

Blanco/hueso sobre el oro primario (`#c9a227`) da **2.20:1** y no cumple.
El texto dentro de botones con fondo primario usa `--marca-sobre-primario`
(`#14110d`), nunca el color de texto claro. Mismo patrón que en
`barberias.md` y `salud.md`.

## Tipografía

- **Títulos:** Cinzel
- **Cuerpo:** Josefin Sans

Ambas de `ui-ux-pro-max` (query `real estate property listing`):
"real estate, luxury, elegant, sophisticated, property, premium" — la
combinación encajó directo, sin necesidad de reemplazo.

## Qué evitar en este nicho

- El primer intento de borde (`#6b5636`) daba 2.70:1 — no llega al mínimo
  de 3:1. Se ajustó a `#786040` (3.18:1). Ejemplo de por qué conviene medir
  y no solo mezclar colores "que se ven bien".
- Blanco puro (`#ffffff`) para el fondo — el nicho de lujo/premium pide
  tonos cálidos, no fríos; se usó `#f7f4ee` para el texto en vez de blanco
  puro.
- Dorado brillante/neón — se usa un oro envejecido (`#c9a227`), no un
  amarillo saturado, para mantener la sensación premium.

## Referencias del rubro

Arquitectura, interiores minimalistas, luz natural, materiales nobles
(madera, piedra, metal cepillado). Tipografía grande y espaciado generoso
("Exaggerated Minimalism" — el patrón que sugirió `ui-ux-pro-max` para este
nicho, con buena accesibilidad marcada por la propia herramienta).
