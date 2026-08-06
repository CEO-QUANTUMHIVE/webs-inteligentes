---
name: clonar-plantilla-premium-brutalismo
description: >
  Pipeline EXACTO para clonar el molde PREMIUM 4 (Brutalismo/Geometrico) a un rubro nuevo.
  Se activa cuando piden "clonar brutalismo a <rubro>", "sumar rubro al catalogo brutalismo".
  Pensado para que un modelo economico lo ejecute sin inventar nada.
---

# Clonar plantilla PREMIUM 4 (Brutalismo/Geometrico) a un rubro nuevo

> Regla de oro: NO INVENTAR. Copiar de gastronomia/p4 y cambiar solo lo necesario.

## Molde base
`basicas/gastronomia/p4/`

## PASO 1 — Inputs
- `<id>`: slug del rubro
- `<nombre_ficticio>`: nombre del negocio demo
- Color acento: `#ff3e00` por defecto, o del doc de paleta del nicho

## PASO 2 — Estructura de archivos
```
basicas/<id>/p4/
├── layout.tsx        # JetBrains Mono + Space Grotesk (igual para todos)
├── p4-full.css       # Copiar de gastronomia/p4, ajustar --p4-accent si aplica
├── page.tsx          # Copiar estructura, cambiar contenido
└── p4-client.tsx     # "use client" — toda la interactividad
```

## PASO 3 — Layout
Copiar `gastronomia/p4/layout.tsx` tal cual. No cambia entre rubros.

## PASO 4 — p4-full.css
Copiar de gastronomia/p4. Ajustar solo:
- `--p4-accent`: color principal del rubro (default: #ff3e00)
- Mantener todos los efectos (bordes gruesos, grid estricto, colores planos)

## PASO 5 — page.tsx
Copiar estructura de gastronomia/p4. Cambiar:
- `metadata` (titulo + descripcion)
- Contenido: nombre de marca, textos, servicios, equipo, testimonios
- Fotos de stock verificadas

Errores conocidos:
- NO export metadata desde client component
- Reveal NO acepta prop `style`
- Sin `&amp;` en JSX

## PASO 6 — p4-client.tsx
Copiar de gastronomia/p4. Cambiar:
- Contenido del rubro (nombre, textos, servicios, galeria)
- Fotos de stock verificadas

## PASO 7 — Build
```bash
cd clientes/quantum-hive && npm run build
```
Verificar ruta `/catalogo/plantillas/basicas/<id>/p4`

## PASO 8 — QA visual
```bash
python -m http.server 8099 --directory clientes/quantum-hive/out
```

## PASO 9 — Actualizar indice.json
Agregar entrada con:
- `nivel: "premium-brutalismo"`
- `estiloPremium: "Premium 4 — Brutalismo / Geometrico"`
- `ruta: "/catalogo/plantillas/basicas/<id>/p4"`

## PASO 10 — Commit & push
`feat(catalogo): Premium 4 brutalismo <id>`

## Colores sugeridos por rubro
| Rubro | Acento |
|---|---|
| Gastronomia | `#ff3e00` naranja |
| Barberia | `#d97706` dorado |
| Wellness | `#8b5cf6` púrpura |
| Servicios Pro | `#2563eb` azul |
| Retail | `#ec4899` rosa |
| Educacion | `#059669` verde |
| Salud | `#2dd4bf` teal |
| Inmobiliaria | `#c9a227` oro |

## Checklist
- [ ] layout.tsx (JetBrains Mono + Space Grotesk)
- [ ] p4-full.css (bordes gruesos, grid estricto, colores planos)
- [ ] page.tsx (contenido del rubro)
- [ ] p4-client.tsx (estructura brutalista)
- [ ] Sin metadata en client component
- [ ] Build verde
- [ ] QA visual
- [ ] indice.json actualizado
- [ ] Firma Quantum Hive presente
