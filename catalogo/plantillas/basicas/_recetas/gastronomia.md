# Receta cruda — Gastronomía

## Fuente 1: ui-ux-pro-max
Query: `restaurant menu food ordering` (--design-system)

```
TARGET: RESTAURANT MENU FOOD ORDERING - RECOMMENDED DESIGN SYSTEM

PATTERN: Enterprise Gateway (NO APLICA — descartado, no encaja con gastronomía;
  la herramienta devolvió un patrón B2B genérico)

STYLE: Vibrant & Block-based
  Keywords: Bold, energetic, playful, block layout, geometric shapes, high color
  contrast, duotone, modern, energetic
  Best For: Startups, creative agencies, gaming, social media, youth-focused,
  entertainment, consumer
  (NO APLICA directamente — se adapta a "Flat Design + Elegancia editorial" para
  que combine con la paleta oscura ya vetada)

COLORS (descartados — se usa la paleta existente de habilidades/paletas-por-nicho/gastronomia.md):
  Primary:    #2563EB
  Secondary:  #3B82F6
  CTA:        #F97316
  Background: #F8FAFC
  Text:       #1E293B

TYPOGRAPHY: Playfair Display SC / Karla   ← SE USA (coherente con "elegante, culinario")
  Mood: restaurant, menu, culinary, elegant, foodie, hospitality
  Google Fonts: Karla:wght@300;400;500;600;700 | Playfair+Display+SC:wght@400;700

KEY EFFECTS:
  Large sections (48px+ gaps), animated patterns, bold hover (color shift),
  scroll-snap, large type (32px+), 200-300ms

AVOID (Anti-patterns):
  Low-quality imagery + Outdated hours

PRE-DELIVERY CHECKLIST:
  [ ] No emojis como iconos (usar SVG: Heroicons/Lucide)
  [ ] cursor-pointer en todos los elementos clicables
  [ ] Hover states con transiciones suaves (150-300ms)
  [ ] Contraste de texto 4.5:1 mínimo
  [ ] Focus states visibles para navegación por teclado
  [ ] prefers-reduced-motion respetado
  [ ] Responsive: 375px, 768px, 1024px, 1440px
```

## Fuente 2: habilidades/paletas-por-nicho/gastronomia.md (paleta oficial, ya vetada — manda sobre la de arriba)

- Primario: Naranja Cálido `#ff6b35`
- Secundario: Azul Profundo `#004e89`
- Acento: Dorado `#ffd166`
- Fondo: Oscuro Elegante `#1a1a2e`
- Texto: Blanco `#ffffff`
- Texto secundario: Gris claro `#a0aec0`

## Decisión final para la ficha

- **Paleta**: la oficial de `gastronomia.md` (dark elegante, ya verificada WCAG AA en el propio doc).
- **Tipografía**: Playfair Display SC (display) + Karla (body) — de ui-ux-pro-max, coherente con "elegante/culinario".
- **Estilo**: Flat Design + Minimalismo editorial (adaptación del "Vibrant & Block-based" a la paleta oscura ya vetada, evitando el choque con negocio real de comida).
- **Secciones obligatorias**: hero, menú, galería, reservas, contacto.
