# Receta cruda — Inmobiliaria

## Fuente 1: ui-ux-pro-max
Query: `real estate property listing` (--design-system)

```
PATTERN: Real-Time / Operations Landing — NO APLICA (pensado para productos
  de ops/seguridad/IoT, no inmobiliarias). Se descarta.

STYLE: Exaggerated Minimalism — SE USA. Bold minimalism, oversized
  typography, high contrast, negative space. Marcado ademas como
  Accessibility: ✓ WCAG AA por la propia herramienta.

COLORS (descartados, se crea paleta nueva): Primary #2563EB / Secondary
  #3B82F6 / CTA #F97316

TYPOGRAPHY: Cinzel / Josefin Sans   ← SE USA TAL CUAL (real estate, luxury,
  elegant, sophisticated, property, premium — encaja directo)

KEY EFFECTS: font-size clamp(3rem, 10vw, 12rem), font-weight 900,
  letter-spacing -0.05em, whitespace generoso — SE USA el concepto de
  tipografia grande en el hero.

AVOID: Poor photos + No virtual tours
```

## Fuente 2: paleta — NO EXISTIA, se creó en esta tarea

`habilidades/paletas-por-nicho/inmobiliaria.md` (nueva). Contrastes
calculados con la fórmula de luminancia relativa WCAG:

- Primario: Oro envejecido `#c9a227` (7.78:1 sobre fondo)
- Secundario: Bronce oscuro `#5c4a2e` (7.73:1 como bloque sólido con texto claro)
- Acento: Piedra/hueso `#e8dcc8` (13.89:1 sobre fondo)
- Fondo: Casi negro cálido `#14110d`
- Superficie: `#221c15`
- Texto: Blanco cálido `#f7f4ee` (17.15:1)
- Texto suave: `#a89a82` (6.82:1)
- Borde: `#786040` (3.18:1 — el primer intento, `#6b5636`, daba 2.70:1 y no cumplía)
- Texto dentro de botón primario: `#14110d` (oscuro — claro sobre oro da 2.20:1, no cumple)

## Decisión final para la ficha

- **Paleta**: la nueva de `inmobiliaria.md`.
- **Tipografía**: Cinzel (display) + Josefin Sans (body) — de ui-ux-pro-max, sin cambios.
- **Estilo**: Minimalismo exagerado — tipografía grande en el hero, mucho espacio en blanco/negro.
- **Secciones**: hero, propiedades destacadas, búsqueda por zona/tipo, contacto.
