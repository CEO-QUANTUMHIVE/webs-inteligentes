---
name: poblar-plantillas
description: Flujo de 4 sub-agentes para copiar una plantilla de referencia (en inglés), traducirla al español, reemplazar imágenes con assets QH y registrarla en el catálogo de Web Factory.
---

# Poblar Plantillas

Pipeline de 4 sub-agentes. Input: URL en inglés de un sitio de referencia. Output: plantilla en español con identidad Quantum Hive, lista para servir y registrada en el catálogo.

## Qué se copia y qué no

| Se replica | No se copia nunca |
|-----------|-------------------|
| Estructura del layout | Imágenes originales |
| Movimientos y animaciones | Copy textual |
| Efectos (parallax, scroll, partículas, etc.) | Logo/nombre del sitio referenciado |
| Paleta de colores | Tipografías de pago |
| Escala tipográfica | APIs o scripts de terceros sin clave |

---

## Inputs

| Input | Requerido | Ejemplo |
|-------|-----------|---------|
| `url` | Sí | `https://ejemplo.com` |
| `nicho` | Sí | `Gastronomía / Restaurante` |
| `slug` | No | se infiere del nombre de la plantilla |

---

## Cómo invocar

```
/poblar-plantillas url="https://..." nicho="Gastronomía"
```

O en el chat:
> "Quiero agregar esta plantilla: [URL]. Es para el nicho de [nicho]."

---

## AGENTE 1 — SCOUT

**Tipo:** `Explore` (solo lectura, usa browser)

**Objetivo:** Analizar la URL y producir un JSON brief estructurado.

**Instrucción al agente:**
```
Abrí esta URL en el navegador: [url]

Usando los scripts de la skill copiar-pagina.md (FASE 1), extraé:
- Paleta real (colores más usados + variables CSS del tema)
- Escala tipográfica (familias, tamaños, pesos)
- Secciones del layout (en orden, con altura aproximada)
- Animaciones visibles (scroll, hover, partículas, video, cursor, etc.)
- Nombre de marca original, tagline, tipo de negocio

Después proponé en español:
- slug: kebab-case del nombre QH para esta plantilla (ej: "casa-verde")
- nombre: nombre para mostrar en el catálogo (ej: "CASA VERDE — Restaurante")
- nicho: [nicho indicado por el usuario]
- estilo: una palabra (Minimalista / Editorial / Cinemático / Neón / Clásico / Urbano)
- features: lista de 4-6 características del diseño (en español)
- preview: uno de minimal | bold | gradient | dark | clean | creative
- secciones_es: nombres de las secciones traducidos al español rioplatense

Devolvé JSON.
```

**Output esperado:**
```json
{
  "slug": "selva-menu",
  "nombre": "SELVA — Restaurante",
  "nicho": "Gastronomía / Restaurante",
  "estilo": "Orgánico",
  "paleta": {
    "primario": "#2d6a4f",
    "secundario": "#40916c",
    "acento": "#d8f3dc",
    "fondo": "#0d1b0f"
  },
  "fuentes_originales": "Playfair Display + Inter",
  "secciones_originales": ["Hero", "Menu", "Reservations", "About", "Contact"],
  "secciones_es": ["Inicio", "Menú", "Reservas", "Nosotros", "Contacto"],
  "features": ["Hero con video de fondo", "Menú animado por categorías", "Formulario de reservas", "Galería de platos", "Parallax en scroll"],
  "preview": "dark",
  "animaciones": "parallax suave en hero, fade-in de secciones al hacer scroll"
}
```

---

## AGENTE 2 — BUILDER

**Tipo:** `general-purpose` (escribe archivos)

**Objetivo:** Construir el `index.html` auto-contenido con estructura y animaciones del original, todo en español y con identidad QH.

**Directorio de destino:**
```
clientes/quantum-hive/public/plantillas/[slug]/index.html
```

**Instrucción al agente:**
```
Con este brief: [JSON del SCOUT]

Construí el archivo index.html para la plantilla "[nombre]" en:
clientes/quantum-hive/public/plantillas/[slug]/index.html

═══════════════════════════════════════
REGLAS DE CONSTRUCCIÓN
═══════════════════════════════════════

### IDIOMA — OBLIGATORIO
- TODO el texto visible en español rioplatense (Argentina):
  - "Contact" → "Contacto", "About" → "Nosotros", "Book" → "Reservar"
  - Usar vos/ustedes, no tú/vosotros
  - Copy de ejemplo genérico del nicho, no del sitio original
  - Títulos en mayúsculas si el diseño original los usa así

### IMÁGENES — OBLIGATORIO
Nunca usar imágenes del sitio de referencia. Reemplazar así:
- Imagen de hero → background CSS con gradiente QH, o una textura de marca:
  background-image: url('/marca/textura-panal.webp')
- Fondos de sección → /marca/panal-ui.webp o /marca/panal-circuito.webp (con overlay oscuro)
- Videos del original → reemplazar por fondo animado CSS o canvas de partículas
- Fotos de producto o personas → pedirlas al cliente. NO hay placeholders genéricos:
  los que había eran feos y se borraron.

### BADGE QH — OBLIGATORIO
Incluir al final del <body>, antes de </body>:

<a href="https://quantumhive.com.ar"
   target="_blank" rel="noopener"
   title="Web creada por Quantum Hive"
   style="position:fixed;bottom:20px;right:20px;z-index:9999;display:flex;align-items:center;gap:8px;
          padding:8px 14px;background:rgba(5,5,16,.85);border:1px solid rgba(212,175,55,.4);
          font:600 11px/1 system-ui,sans-serif;color:#d4af37;text-decoration:none;backdrop-filter:blur(8px)"
>
  <span style="font-size:13px">⬢</span> Powered by Quantum Hive
</a>

### VARIABLES CSS QH — incluir en :root
La identidad es negro + ORO. El cyan es secundario, no el acento principal.
:root {
  --qh-oro: #d4af37;
  --qh-oro-claro: #ffd700;
  --qh-cyan: #00d4ff;
  --qh-green: #00ff88;
  --qh-purple: #8b5cf6;
  --qh-dark: #050510;
}

### ESTRUCTURA — replicar del original
- Layout, secciones y jerarquía visual: igual al brief
- Animaciones: implementar con CSS @keyframes + JS vanilla
- Sin CDN externos excepto Google Fonts
- HTML auto-contenido: funciona con file:// sin servidor

### TÉCNICO
- html { overflow-x: hidden } Y body { overflow-x: hidden } — siempre los dos
- Responsive: breakpoint a 768px mínimo
- Sin dependencias externas excepto Google Fonts

Verificá que el archivo abre en browser sin errores antes de reportar listo.
```

**Output:** path del archivo creado.

---

## AGENTE 3 — QA

**Tipo:** `general-purpose` (browser + lectura)

**Objetivo:** Validar calidad antes de registrar.

**Instrucción al agente:**
```
Validá la plantilla en:
clientes/quantum-hive/public/plantillas/[slug]/index.html

Checklist:
1. Abrir en browser
2. read_console_messages {onlyErrors: true} → debe dar vacío
3. Verificar overflow:
   javascript_tool: (() => { const de = document.documentElement; return { desborda: de.scrollWidth > de.clientWidth }; })()
   → desborda debe ser false
4. resize_window a 360x640 → repetir overflow check
5. Confirmar que el badge de Quantum Hive aparece (esquina inferior derecha)
6. Confirmar que no hay texto en inglés visible
7. Screenshot desktop y mobile

Criterios de aprobación:
✓ Sin errores de consola
✓ Sin overflow horizontal en desktop ni mobile
✓ Badge QH visible
✓ Todo el texto en español
✓ Al menos 3 secciones visibles

Si falla alguno: reportar qué falla. El orquestador vuelve al BUILDER.
Si pasa todo: reportar APROBADO + adjuntar el JSON del SCOUT para el REGISTRADOR.
```

---

## AGENTE 4 — REGISTRADOR

**Tipo:** `general-purpose` (escribe archivos)

**Solo se lanza si QA devolvió APROBADO.**

**Objetivo:** Registrar la plantilla en Supabase y en `catalogo.ts`.

**Instrucción al agente:**
```
La plantilla [nombre] fue aprobada. Brief: [JSON del SCOUT]

Hacé tres cosas:

### 1. SQL — supabase/seed/000X_[slug].sql
(X = número siguiente a los archivos existentes en supabase/seed/)

INSERT INTO plantillas (
  id, nombre, nicho, descripcion, paleta, fuentes,
  paginas, caracteristicas, estilo, vista_previa,
  popular, url_demo, publicado
) VALUES (
  '[slug]',
  '[nombre]',
  '[nicho]',
  '[descripción de 1 oración en español]',
  '{"primario":"[p]","secundario":"[s]","acento":"[a]","fondo":"[f]"}',
  '{"familias": "[fuentes]"}',
  ARRAY[secciones_es como strings],
  ARRAY[features como strings],
  '[estilo]',
  '[preview]',
  false,
  '/plantillas/[slug]/',
  true
)
ON CONFLICT (id) DO UPDATE SET
  nombre = EXCLUDED.nombre,
  publicado = EXCLUDED.publicado;

### 2. Constante en catalogo.ts
Archivo: clientes/quantum-hive/src/lib/catalogo.ts

Agregar ANTES de `const PLANTILLAS_PUBLICADAS`:

const PLANTILLA_[SLUG_MAYUS]: Plantilla = {
  id: "[slug]",
  name: "[nombre]",
  description: "[descripcion]",
  niche: "[nicho]",
  style: "[estilo]",
  pages: [secciones_es],
  colors: {
    primary: "[primario]",
    secondary: "[secundario]",
    accent: "[acento]",
    bg: "[fondo]",
  },
  font: "[fuentes_originales]",
  features: [features],
  preview: "[preview]",
  popular: false,
  urlDemo: "/plantillas/[slug]/",
};

### 3. Agregar al array PLANTILLAS_PUBLICADAS
Agregar PLANTILLA_[SLUG_MAYUS] al array existente.

Reportar los 3 archivos modificados.
```

---

## Flujo completo

```
Usuario da URL (en inglés)
         ↓
    SCOUT analiza
    extrae estructura + paleta + animaciones
    propone nombres en español
         ↓
    BUILDER construye
    HTML en español · imágenes → placeholders QH · badge fijo
         ↓
    QA valida
    overflow · errores · badge · idioma
         ↑ (loop si falla)
         ↓ aprobado
    REGISTRADOR registra
    SQL + catalogo.ts
         ↓
    Listo para deploy
```

---

## Deploy después de agregar una plantilla

```bash
cd clientes/quantum-hive
npm run build
gcloud run deploy webs-inteligentes --source . --region us-central1 --project bubbly-stone-502214-u7
```

Ejecutar el `.sql` en Supabase → SQL Editor → Run.

---

## Referencias

- Book de imágenes completo: `habilidades/book-imagenes-qh.md`
- Assets de marca: `public/marca/` (WebP optimizados)
- Skill de análisis visual: `habilidades/copiar-pagina.md`
- Schema de Supabase: `supabase/migrations/0001_esquema_inicial.sql`
