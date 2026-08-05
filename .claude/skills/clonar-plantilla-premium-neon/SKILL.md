---
name: clonar-plantilla-premium-neon
description: >
  Pipeline EXACTO para clonar el molde PREMIUM 3 (Neon/Tech) a un rubro nuevo.
  Se activa cuando piden "clonar neon a <rubro>", "sumar rubro al catalogo neon".
  Pensado para que un modelo economico lo ejecute sin inventar nada.
---

# Clonar plantilla PREMIUM 3 (Neon/Tech) a un rubro nuevo

> Regla de oro: NO INVENTAR. Copiar de gastronomia/p3 y cambiar solo lo necesario.

## Molde base
`basicas/gastronomia/p3/`

## PASO 1 — Inputs
- `<id>`: slug del rubro
- `<nombre_ficticio>`: nombre del negocio demo
- Color neon: `#00f0ff` por defecto, o del doc de paleta del nicho

## PASO 2 — Estructura de archivos
```
basicas/<id>/p3/
├── layout.tsx        # Orbitron + Space_Grotesk (igual para todos)
├── p3.module.css     # Copiar de gastronomia/p3, ajustar --p3-neon si aplica
├── page.tsx          # Copiar estructura, cambiar contenido
└── particles.tsx     # Reutilizar igual (cliente component)
```

## PASO 3 — Layout
Copiar `gastronomia/p3/layout.tsx` tal cual. No cambia entre rubros.

## PASO 4 — p3.module.css
Copiar de gastronomia/p3. Ajustar solo:
- `--p3-neon`: color principal neón del rubro
- Mantener todos los efectos (glow, glitch, scanlines, particles)

## PASO 5 — page.tsx
Copiar estructura de gastronomia/p3. Cambiar:
- `metadata` (titulo + descripcion)
- Contenido: nombre de marca, textos, servicios, equipo, testimonios
- Fotos de stock verificadas

Errores conocidos:
- NO export metadata desde client component
- Particles debe ser archivo separado ("use client")
- Reveal NO acepta prop `style`
- Sin `&amp;` en JSX

## PASO 6 — particles.tsx
Reutilizar `gastronomia/p3/particles.tsx` sin cambios.

## PASO 7 — Build
```bash
cd clientes/quantum-hive && npm run build
```
Verificar ruta `/catalogo/plantillas/basicas/<id>/p3`

## PASO 8 — QA visual
```bash
python -m http.server 8099 --directory clientes/quantum-hive/out
```

## PASO 9 — Actualizar indice.json
Agregar entrada con:
- `nivel: "premium-neon"`
- `estiloPremium: "Premium 3 — Neon/Tech"`
- `ruta: "/catalogo/plantillas/basicas/<id>/p3"`

## PASO 10 — Commit & push
`feat(catalogo): Premium 3 neon <id>`

## Colores neon sugeridos por rubro
| Rubro | Neon principal |
|---|---|
| Gastronomia | `#00f0ff` cyan |
| Barberia | `#ff6b00` naranja |
| Wellness | `#a855f7` purpura |
| Servicios Pro | `#3b82f6` azul |
| Retail | `#ec4899` rosa |
| Educacion | `#10b981` verde |
| Salud | `#22d3ee` teal |
| Inmobiliaria | `#eab308` oro |

## Checklist
- [ ] Fotos verificadas (200)
- [ ] layout.tsx (Orbitron + Space_Grotesk)
- [ ] p3.module.css (efectos intactos, color ajustado)
- [ ] page.tsx (contenido del rubro)
- [ ] particles.tsx (cliente component)
- [ ] Sin metadata en client component
- [ ] Build verde
- [ ] QA visual
- [ ] indice.json actualizado
- [ ] Firma Quantum Hive presente