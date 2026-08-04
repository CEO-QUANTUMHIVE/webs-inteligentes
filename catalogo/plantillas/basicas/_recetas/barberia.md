# Receta cruda — Barbería

## Fuente 1: ui-ux-pro-max
Query: `booking appointment salon` (--design-system)

```
PATTERN: Conversion + Feature-Rich (Hero, Features, CTA) — generico, no aporta
  estructura especifica de barberia.

STYLE: Minimalism & Swiss Style (NO APLICA — la propia paleta oficial de
  barberias.md advierte que ui-ux-pro-max clasifica este nicho como
  Beauty/Spa/Wellness y devuelve tonos rosa/lavanda, que no sirven para
  barberia. Se descarta el estilo y los colores sugeridos.)

COLORS (descartados):
  Primary: #2563EB / Secondary: #3B82F6 / CTA: #F97316 / Background: #F8FAFC

TYPOGRAPHY: Inter / Inter (descartada — muy neutra para el rubro)

PRE-DELIVERY CHECKLIST: (se mantiene, es agnostico de nicho)
  [ ] No emojis, cursor-pointer, hover 150-300ms, contraste 4.5:1,
      focus visible, prefers-reduced-motion, responsive 375/768/1024/1440
```

## Fuente 2: habilidades/paletas-por-nicho/barberias.md (paleta oficial — manda)

Contrastes ya medidos y documentados en el propio archivo (no estimados):

- Primario: Ámbar clásico `#d97706` (5.49:1 sobre fondo)
- Secundario: Marrón `#92400e` (solo como bloque de fondo con texto blanco, 7.09:1 — NO como texto sobre fondo, da 2.47:1)
- Acento: Dorado `#fbbf24` (10.48:1)
- Fondo: Stone oscuro `#1c1917`
- Superficie (tarjetas): `#292524`
- Texto: Blanco cálido `#fafaf9` (16.74:1)
- Texto suave: `#a8a29e`
- Borde: `#b45309` (3.48:1 — el marrón NO sirve de borde, da 2.47:1)
- **Texto DENTRO de botones primarios: `#1c1917`, nunca blanco** (blanco sobre ámbar da 3.19:1, no cumple)

Tipografía sugerida por el propio doc (más específica que la de ui-ux-pro-max):
- Display: Bebas Neue, Oswald o Archivo Black
- Cuerpo: Inter o Source Sans 3

## Decisión final para la ficha

- **Paleta**: la oficial de `barberias.md`, tal cual, incluida la regla del texto oscuro dentro del botón primario.
- **Tipografía**: Bebas Neue (display) + Inter (body).
- **Estilo**: Clásico oscuro — madera/cuero/metal envejecido, sin glassmorphism (el propio doc lo desaconseja).
- **Secciones**: hero, servicios y precios, galería de cortes, turnos, equipo, contacto.
