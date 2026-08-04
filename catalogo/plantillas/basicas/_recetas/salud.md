# Receta cruda — Salud

## Fuente 1: ui-ux-pro-max
Query: `medical clinic appointment health` (--design-system)

```
PATTERN: Social Proof-Focused (Hero, Features, CTA) — generico, se usa el
  concepto (confianza, turnos visibles).

STYLE: Neumorphism — DESCARTADO POR ACCESIBILIDAD. La propia ficha de la
  herramienta lo marca "Accessibility: ⚠ Low contrast", lo cual choca
  directo con la regla de contraste 4.5:1 minimo del brief. No se usa como
  estilo dominante.

COLORS (descartados): Primary #2563EB / Secondary #3B82F6 / CTA #F97316

TYPOGRAPHY: Figtree / Noto Sans   ← SE USA (medical, clean, accessible,
  professional, healthcare, trustworthy)

KEY EFFECTS (descartados junto con Neumorphism):
  Soft box-shadow doble, presion suave, sombra interna sutil

AVOID: Bright neon colors + Motion-heavy animations + AI purple/pink gradients
```

## Fuente 2: paleta — NO EXISTIA, se creó en esta tarea

`habilidades/paletas-por-nicho/salud.md` (nueva). Contrastes calculados con
la fórmula de luminancia relativa WCAG (no estimados):

- Primario: Teal médico `#2dd4bf` (9.20:1 sobre fondo)
- Secundario: Teal oscuro `#115e59` (7.58:1 como bloque sólido con texto blanco)
- Acento: Verde salud `#4ade80` (9.83:1 sobre fondo)
- Fondo: Teal casi negro `#0a1f1c`
- Superficie: `#123531`
- Texto: Blanco `#ffffff` (17.13:1)
- Texto suave: `#9fc2bc` (8.91:1)
- Borde: `#0f766e` (3.13:1, cumple el mínimo de 3:1 para bordes)
- Texto dentro de botones primario/acento: `#0a1f1c` (oscuro — blanco sobre
  teal primario da 1.86:1, no cumple)

## Decisión final para la ficha

- **Paleta**: la nueva de `salud.md`, con la misma regla de texto oscuro en
  botones que ya se usó en barbería.
- **Tipografía**: Figtree (display) + Noto Sans (body) — de ui-ux-pro-max.
- **Estilo**: Clínico y calmo, sin Neumorphism (accesibilidad).
- **Secciones**: hero, especialidades, equipo médico, turnos, contacto.
