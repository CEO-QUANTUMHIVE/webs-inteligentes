---
name: clonar-plantilla-premium-minimalista
description: >
  Pipeline EXACTO para clonar el molde de plantilla web PREMIUM 2 (Minimalismo
  Extremo) a un nuevo rubro dentro del catálogo de Web Factory. Se activa cuando
  piden "crear/clonar plantilla minimalista de <rubro>", "sumar rubro al catálogo
  minimalista" o "replicar el molde minimalista en <rubro>". Pensado para que un
  modelo económico lo ejecute paso a paso SIN inventar nada.
---

# Clonar plantilla PREMIUM 2 (Minimalismo Extremo) a un rubro nuevo

> **Regla de oro: NO INVENTAR.** El diseño ya está probado en `gastronomia/p2/`.
> Este pipeline solo transplanta el molde y cambia: paleta, tipografía, fotos,
> textos y secciones propias del rubro. Si dudás, **copiá de `gastronomia/p2/`**
> y cambiá los valores. No rediseñes.

## Qué produce
Una landing minimalista navegable en producción, en
`clientes/quantum-hive/src/app/catalogo/plantillas/basicas/<id>/p2/`, con:
hero tipográfico gigante, full-bleed intercalado, grilla para galería, motion
sutil (reveal al scroll), fotos reales de stock, secciones del rubro y la firma
de Quantum Hive. Todo data-driven.

## Estilo de este molde
**Minimalismo Extremo**: fondo blanco, Inter de pesos variables (sin serif),
espacio negativo protagonista, full-bleed intercalado, acento monocromático
del nicho (10% de presencia), tipografía gigante, motion sutil.

## Diferencias clave con Premium 1

| Aspecto | Premium 1 (Editorial) | Premium 2 (Minimalismo) |
|---|---|---|
| Fondo | Oscuro cálido | Blanco #FAFAFA |
| Tipografía | Serif con carácter | Inter sans, peso variable |
| Hero | Foto + ken-burns | Tipografía gigante + espacio |
| Color | Paleta cálida por nicho | Monocromático + 1 acento mínimo |
| Layout | Bentos, multiplicidad | Columna única, aire |
| Motion | Contadores, parallax | Reveal sutil, fade-in |

## PIEZAS COMPARTIDAS (ya existen — NO recrear)

| Import | Archivo | Uso |
|---|---|---|
| `@/components/premium/reveal` | `reveal.tsx` | Aparición al scroll |
| `@/components/premium/contador` | `contador.tsx` | Número que cuenta |
| `@/components/premium/hero-parallax` | `hero-parallax.tsx` | Hero con ken-burns |
| `@/components/premium/nav-scroll-flag` | `nav-scroll-flag.tsx` | Marca scroll |
| `@/components/marca/firma-quantumhive` | `firma-quantumhive.tsx` | Firma de marca |

## INPUTS que definís antes de empezar
- `<id>`: slug del rubro (ej. `barberia`, `wellness`).
- `<Nombre ficticio>`: nombre del negocio de demo.
- Color de acento: del doc de paleta del nicho (se usa al 10% en la UI).

## PASO 1 — Verificar fotos de stock (~8)
Fotos de Unsplash (stock libre). Necesitás: 1 hero + 1 full-bleed + 6 galería.

**Probar que existen:**
```bash
test_url() { code=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 15 "https://images.unsplash.com/${1}?w=400&q=60&auto=format&fit=crop"); echo "$code  $1"; }
for id in photo-XXXX photo-YYYY ... ; do test_url "$id"; done
```

## PASO 2 — Crear estructura de archivos
```
clientes/quantum-hive/src/app/catalogo/plantillas/basicas/<id>/p2/
├── layout.tsx          # Inter (variable + body mismo font, pesos distintos)
├── p2.module.css       # Tokens minimalistas (copiar de gastronomia/p2/)
└── page.tsx            # Contenido data-driven (copiar de gastronomia/p2/)
```

## PASO 3 — layout.tsx
Usar Inter para display Y body (diferenciar por peso, no por familia).

```tsx
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--t-font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const interBody = Inter({
  variable: "--t-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export default function LayoutP2({
  children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return <div className={`${inter.variable} ${interBody.variable}`}>{children}</div>;
}
```

## PASO 4 — p2.module.css (copiar molde, cambiar tokens)
**Copiar TODO** `basicas/gastronomia/p2/p2.module.css` (es el molde completo).
Cambiar SOLO:
1. `--m-accent`: el color de acento del rubro (al 10% de uso).
2. `--m-bg` y `--m-fg`: si el rubro pide invertir (rara vez).
3. `--m-spacing`: mantener el clamp(4rem, 12vw, 10rem).
4. `--m-radius`: mantener 2px (bordes mínimos).

No cambiar estructura, tamaños base, ni motion. Ya funcionan.

## PASO 5 — page.tsx (copiar molde, cambiar datos)
Copiar `basicas/gastronomia/p2/page.tsx`. Cambiar SOLO:
- `metadata` (título + descripción del rubro).
- Arrays de datos: MENU/PRODUCTOS/CLASES/SERVICIOS, GALERIA, EQUIPO, TESTIMONIOS.
- Textos del hero, nombre de marca, CTAs, secciones propias del rubro.
- Fotos verificadas del Paso 1.

**Errores conocidos — evitalos:**
- **NUNCA** `&amp;` en texto JSX.
- **Reveal NO acepta prop `style`** — envolver en `<div style={{...}}>` si necesitás.
- Imágenes: `<img>` plano con `width`/`height` + `loading="lazy"`.
- Dejar comentario `{/* eslint-disable-next-line @next/next/no-img-element */}` arriba de cada img.
- `React.JSX.Element` como tipo de retorno, nunca `JSX.Element`.

## PASO 6 — Build (no commitear roto)
```bash
cd clientes/quantum-hive && npm run build
```
Debe listar la ruta `/catalogo/plantillas/basicas/<id>/p2`. Si falla, arreglar ANTES de seguir.

## PASO 7 — Verificar con píxeles
```bash
python -m http.server 8099 --directory clientes/quantum-hive/out
# abrir: http://localhost:8099/catalogo/plantillas/basicas/<id>/p2.html
```

## PASO 8 — Actualizar ficha e índice
- Crear/actualizar `ficha.json` en `catalogo/plantillas/basicas/<id>/` con `nivel: "premium-minimalista"`.
- Agregar entrada al `indice.json` con `estiloPremium: "Premium 2 — Minimalismo Extremo"`.

## PASO 9 — Cerrar
- Commit: `feat(catalogo): Premium 2 minimalista <id>` y push.

---

## Checklist de terminado (por plantilla)
- [ ] 8 fotos verificadas (200)
- [ ] layout.tsx con Inter (variable + body)
- [ ] p2.module.css copiado del molde, solo accent cambiado
- [ ] page.tsx copiado del molde, solo datos cambiados
- [ ] Sin `&amp;` en JSX; tipos `React.JSX.Element`
- [ ] Sin prop `style` en `<Reveal>`
- [ ] `npm run build` verde y ruta listada
- [ ] Verificado con píxeles
- [ ] ficha.json + indice.json actualizados
- [ ] Firma de Quantum Hive presente
- [ ] Commit + push

## Referencias vivas (copiar de acá)
- Molde completo: `basicas/gastronomia/p2/`
- Componentes: `src/components/premium/` y `src/components/marca/`
- Premium 1 (referencia opuesta): `basicas/gastronomia/`