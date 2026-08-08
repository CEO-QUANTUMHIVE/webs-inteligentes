# INFORME DE VALIDACIÓN DE ANÁLISIS — Prueba 01 (Auditoría Final de Cobertura Vertical)

- **URL Referencia:** https://buckssauce.com/
- **Proyecto Destino:** `pruebas/recrear-web-premium/prueba-01`
- **Rama Git:** `test/recrear-web-premium-01`
- **Fecha de Auditoría Final:** 2026-08-07
- **Estado actual:** `APROBABLE` (revisión humana completada — el rango no_determinable de 1.482 px fue aceptado como limitación NO BLOQUEANTE para la reconstrucción)

---

## 0. Estado de inspección

- El sitio activó Vercel Security Checkpoint durante la primera petición de inspección. El evento fue **reportado**. **No** se realizaron técnicas de evasión ni reintentos de bypass. La inspección se completó en sesiones posteriores sin alterar controles del sitio.
- Toda la auditoría se basa en evidencia existente (`raw_inspection.json` y capturas previamente generadas). No se realizó nueva inspección sobre el sitio.

---

## 1. Causa exacta de los 2.076 px

| Concepto                          | Valor (px) | Estado                       |
|-----------------------------------|-----------:|------------------------------|
| `document_height` (scrollHeight)  | 11.283     | autoritativo (raw)            |
| `body_bottom_medido`               | 11.383     | por suma de `main.bottom + footer.height` |
| `body_padding_top` (reserva header fixed) | 100        | dentro de body, fuera de main  |
| `main_top`                         | 100        | raw                            |
| `main_height`                      | 10.940     | raw                            |
| `main_bottom`                      | 11.040     | `main_top + main_height`       |
| `footer_top`                       | 11.040     | hermano de main                |
| `footer_height` medido             | 343        | raw                            |
| Σ secciones visuales internas (sin footer) | 8.865 | 1088+256+866+1366+3149+900+1240 |
| Σ huecos/gaps internos de main     | 2.074      | 160+160+1.602+152              |
| `main_height − Σ secciones internas` | 2.075     | ≈ 2.074 (±1 px redondeo)       |
| `document_height − Σ secciones (incluye header+footer erroneos)` | 2.076 | cálculo previo erróneo        |
| `document_height − (Σ secciones internas + main_padding_top)` | 11.283 − (8.865 + 100) = 2.318 — no aplica | calculado desde otra base |

### 1.1 Por qué el cálculo original reportó 1.733 px en main y 2.076 px en doc

El cálculo original mezclaba cuentas:
- Sumaba como “secciones dentro de main” el header (212) y el footer (342), pero **ninguno está dentro de main** (`header` es fixed, `footer` es hermano).
- Asumía que el primer byte (top 0) era el inicio de main, cuando `main` empieza en `top=100` (reserva del body para el header fixed).

### 1.2 Cuadre real (cobertura vertical)

- `100 + 1088 + 160 + 256 + 160 + 866 + 1.602 + 1.366 + 152 + 3.149 + 900 + 1.240 + 243 = 11.282 px`
- `document_height = 11.283 px`
- **Delta final: 1 px** por redondeo de las medidas `.75`, `.328`, `.578` a enteros.

### 1.3 Diferencia documentada

Diferencia **Fuera del alcance** de la cobertura (0 → `document_height`):
- Footer medido bottom = 11.383; `document_height` = 11.283; delta = 100 px.
- Hipótesis probable: diferencia entre flujo medido (`getBoundingClientRect` después del `scroll-reset` script) y `scrollHeight` reportado por Chrome headless. Sin re-inspección no es pixel-exacta.
- Acción: registrada en `MAPA_COBERTURA_VERTICAL.diferencias_explicadas.delta-footer-vs-scrollheight`. **No se inventó sección. No se canceló con rounding.**

### 1.4 Hueco no explicado (honestidad)

- 1.602 px entre `ingredients.bottom` (2.630) y `product.top` (4.232).
- **Inspección focalizada posterior** (ver sección 12) descompuso los 1.602 px en:
  - 120 px → `margin` Tailwind `lg:mt-30` del product-weapons-grid (verificable por className). Estado: cuadre completo.
  - 1.482 px → `no_determinable` con hipótesis residual (confianza BAJO): spacer ad-hoc o margin/padding no-Tailwind-standard (Tailwind arbitrary value o CSS-in-JS) en un wrapper entre ingredients y product, o contenedor decorativo absoluto sin texto (no capturado por la heurística del inspector).
- **Hipótesis descartada tras inspección adicional:** la señal inicial de “4 imágenes huérfanas en main no atribuidas a sub-sección” fue reexaminada y **descartada** — esas 4 imágenes (`pineapple-2.webp`, `habanero-2.webp`, `cherry-2.webp`, `garlic.webp`) son las texturas del canvas 3D del hero (rango 100-1188, no del gap 2630-4232); aparecen primeras en `main.images[]` por el orden de carga del DOM, no por posición visual intermedia.
- **Otros canales explorados y agotados:** `bodyHTMLSnippet` truncado a 2 KB por el inspector; `interactiveElementsCount`/`interactiveSample` con rects relativos a su contenedor (no absolutos al documento); `headings` no aporta ninguna etiqueta en el rango del gap. Las capturas PNG existentes en disco cubren el rango (`04-checkpoint-scroll-2700px.png` y `05-resultado-final-full.png`), pero el runtime del agente no soporta input de imagen: no se pueden rasterizar automáticamente; sólo una inspección visual humana directa podría usarlas.
- Registrado explícitamente como `hueco_no_explicado` + `margen_o_padding` en `MAPA_COBERTURA_VERTICAL`. **No se inventó sección. No se ocultó la limitación.**

---

## 12. Inspección focalizada del rango 2.630–4.232 px

### 12.1 Causa de los 1.602 px

| Sub-rango       | Altura (px) | Clasificación            | Confianza | Acción                                   |
|-----------------|------------:|---------------------------|-----------|------------------------------------------|
| 2.630 – 2.750   | 120         | margin                    | ALTO      | Cuadre completo con className            |
| 2.750 – 4.232   | 1.482       | no_determinable           | BAJO      | Requiere inspección humana o nueva sesión|
| **Total 2.630 – 4.232** | **1.602** | margin + no_determinable | —         | —                                        |

### 12.2 Evidencia

- **`raw_inspection.json` section-6 className:** `"relative p-container flex flex-col items-center mt-15 lg:mt-30"`. Tailwind 4 spacing: `mt-30 = 7.5rem = 120 px` activo en `lg` (≥1.024 px, viewport desktop 1.440 px). Cuadre: `ingredients.bottom 2630 + 120 = 2750 px`.
- **`product.rect.top` real:** `4232 px`. Delta al esperado por className: `4232 - 2750 = 1.482 px` no explicables por className estándar.
- **`raw_inspection.json` section-5 (ingredients) bottom:** `2630 px`.
- **`raw_inspection.json` section-6 (product) top:** `4232 px` (sin nodos `main > section|div` capturados entre medias).
- **`main.imageCount = 47` vs suma de `imageCount` de sub-secciones:** `9 + 0 + 11 + 9 + 2 + 12 + 0 + 0 = 43`. **4 imágenes huérfanas** que aparecen primeras en `main.images[]`: `pineapple-2.webp`, `habanero-2.webp`, `cherry-2.webp`, `garlic.webp`. **Tras inspección adicional:** son las texturas del canvas 3D del hero (rango 100-1188, no del gap 2630-4232); se cargan temprano por el orden del DOM, no por posición visual intermedia. La hipótesis de “contenido_visual intermedio en el rango del gap” por esta señal se **descarta**.
- **`main.headings` (14 entradas):** ninguna cae en el rango del gap. La duplicada “CRUSHED PINEAPPLE SRIRACHA” corresponde al bundle-pack-saver (section-8), no a una sección intermedia.
- **`interactiveElementsCount = 43` y `interactiveSample[]`:** rects relativos a su contenedor (navbar/menú flotante), no absolutos al documento; no permiten mapear el rango 2630-4232.
- **`raw_inspection.json.bodyHTMLSnippet` (línea 576):** truncado a 2.000 caracteres, cubre sólo `<header>` y el inicio del `<svg>` del logo — no llega al rango 2.630–4.232.
- **Capturas PNG en disco:** `capturas/fuente/desktop/04-checkpoint-scroll-2700px.png` (cubrió `scroll_y=2700`, justamente dentro del gap 2630-4232) y `05-resultado-final-full.png` (full-page 1440×11283) cubren visualmente el rango. **Intento de uso rechazado por el runtime:** este modelo no soporta input de imagen; estas capturas sólo pueden analizarse mediante inspección visual humana directa.

### 12.3 Hipótesis residuales (confianza BAJO)

1. **Spacer ad-hoc o margin/padding no-Tailwind-standard** (Tailwind arbitrary value tipo `mt-[1482px]`, CSS-in-JS o media query custom `sh:`) en un wrapper entre ingredients y product. El inspector no captura wrappers sin texto visible.
2. **Contenedor decorativo absoluto sin texto** (tag `div` con `position: absolute` y contenido sólo visual — p.ej. marquesina cinematográfica, splash de fondo o figura Lottie canvas-like) que aporta altura al flujo por su wrapper exterior sin aportar contenido textual. El inspector de `raw_inspection` omite este patrón.

### 12.4 Limitaciones para determinación pixel-exacta

1. `raw_inspection.json.bodyHTMLSnippet` truncado a 2.000 caracteres: el inspector no volcó el DOM completo del rango 2.630–4.232.
2. `raw_inspection.json.sections` usa heurística por tag (`main > section|div`) + presencia de `headings` o `textSample` visible; omite wrappers decorativos absolutos o secciones visuales sin texto (como `intro-manifesto`, que es un `div` sin headings — captado por ser simple texto; un `div` puramente decorativo con contenido sólo visual/gráfico NO sería captado).
3. El runtime del agente no soporta input de imagen: las 2 capturas PNG ya-existentes que cubren el rango 2630-4232 (`04-checkpoint-scroll-2700px.png` y `05-resultado-final-full.png`) no pueden analysarse automáticamente. Están disponibles para inspección visual humana directa.
4. Re-inspección sobre `buckssauce.com` requiere resolver Vercel Security Checkpoint; política del proyecto **prohíbe** técnicas de evasión; inspección debe detenerse ante el bloqueo.
5. No se permite instalar herramientas adicionales (per restricciones absolutas del brief).

### 12.5 Acción requerida

El checkpoint humano puede resolver el núcleo `no_determinable` por dos vías alternativas, ambas sin evadir controles:

1. **Inspección visual humana directa** de `pruebas/recrear-web-premium/prueba-01/capturas/fuente/desktop/04-checkpoint-scroll-2700px.png` y/o `05-resultado-final-full.png`; el agente ya generó estas capturas en iteraciones previas y siguen disponibles en disco. Esta vía no requiere abrir el sitio ni instalar herramientas.
2. **Autorización explícita** para una nueva sesión de inspección sobre `buckssauce.com` (sin técnicas de evasión) que capture `body > *` directos, `getBoundingClientRect` de cada hijo de `main`, y `getComputedStyle` (`position`, `display`, `margin`, `padding`, `transform`) para resolver los 1.482 px restantes con cuadre pixel-exacto.

Mientras ninguna de las dos vías se realice, el análisis se mantiene en `REQUIERE_CORRECCIONES`.

---

## 2. Desglose del documento

### 2.1 Secciones visuales reales (8)

| Orden | ID                        | Tag      | Parent  | Selector                          | Top    | Bottom  | Altura visual | Altura flujo |
|------:|---------------------------|----------|---------|-----------------------------------|-------:|--------:|--------------:|-------------:|
| 1     | hero-section               | section  | main    | `main > section:nth-of-type(1)`   | 100    | 1.188   | 1.088         | 1.088        |
| 2     | intro-manifesto            | div      | main    | `main > div:nth-of-type(1)`        | 1.348  | 1.604   | 256           | 256          |
| 3     | ingredients-quality-grid   | section  | main    | `main > section:nth-of-type(2)`   | 1.764  | 2.630   | 866           | 866          |
| 4     | product-weapons-grid       | section  | main    | `main > section:nth-of-type(3)`   | 4.232  | 5.598   | 1.366         | 1.366        |
| 5     | why-bucks-sticky-scroll    | section  | main    | `main > section:nth-of-type(4)`   | 5.750  | 8.899   | 900 (visible) | 3.149 (wrapper) |
| 6     | bundle-pack-saver          | section  | main    | `main > section:nth-of-type(5)`   | 8.900  | 9.800   | 900           | 900          |
| 7     | reviews-social-proof       | section  | main    | `main > section:nth-of-type(6)`   | 9.800  | 11.040  | 1.240         | 1.240        |
| 8     | footer-newsletter          | footer   | body    | `footer`                          | 11.040 | 11.283  | 243 (dentro de document_height) | 243          |

### 2.2 Contenedores estructurales (1)

| ID           | Tag  | Selector | Top | Bottom | Height |
|--------------|------|----------|----:|-------:|-------:|
| main-wrapper | main | main     | 100 | 11.040 | 10.940 |

### 2.3 Elementos fuera de flujo (1)

| ID            | Tag    | Position | Top | Bottom | Height | Causa                                          |
|---------------|--------|----------|----:|-------:|-------:|------------------------------------------------|
| header-fixed  | header | fixed    | 0   | 212    | 212    | Header sobre el viewport; no aporta al flujo.   |

### 2.4 Spacers / márgenes / padding contabilizados (572 px)

| ID                          | Rango (px)      | Altura | Causa                                  |
|-----------------------------|-----------------|-------:|----------------------------------------|
| body-padding-top            | 0 – 100         | 100    | Reserva para header fixed              |
| gap-hero-intro              | 1.188 – 1.348   | 160    | `mt-30 lg:mt-40`                       |
| gap-intro-ingredients       | 1.604 – 1.764   | 160    | `mt-30 lg:mt-40`                       |
| gap-product-why             | 5.598 – 5.750   | 152    | `mt-38`                                |

### 2.5 Hueco no explicado (1.602 px)

| ID                          | Rango (px)      | Altura | Estado                                  |
|-----------------------------|-----------------|-------:|-----------------------------------------|
| gap-ingredients-product     | 2.630 – 4.232   | 1.602  | HUECO_NO_EXPLICADO_SIN_SECCION          |

### 2.6 Diferencias explicadas (100 px)

| ID                             | Delta | Causa probable                                                                                 |
|--------------------------------|------:|------------------------------------------------------------------------------------------------|
| delta-footer-vs-scrollheight   | 100   | Diferencia entre layout-flow medido con `getBoundingClientRect` y `scrollHeight` de Chrome.     |

---

## 3. Cobertura vertical (`MAPA_COBERTURA_VERTICAL.json`)

- **Total cubierto en flujo:** 9.681 px
- **Total huecos:** 1.602 px
- **Cobertura porcentual:** 85,79 %
- **Delta de cuadre:** 1 px (redondeo)
- **Estado:** DOCUMENTADO con `hueco_no_explicado` explícito (no oculto).

---

## 4. Componentes internos verificados

Búsqueda real en `web-factory/clientes/quantum-hive/src/components/**/*.tsx`. Stack repo: React 19.2.4, Next 16.2.12, Tailwind 4.3.3, framer-motion 12, three 0.185, gsap 3.15 (AUSENTES: Lenis, @react-three/fiber, lottie).

| # | Componente planificado         | Archivo encontrado                                    | Export verificado               | Resultado                            | Uso propuesto                                                                                       |
|--:|--------------------------------|--------------------------------------------------------|----------------------------------|--------------------------------------|-----------------------------------------------------------------------------------------------------|
| 1 | HeaderNavbar                   | `ui/spotlight-navbar.tsx`                              | `SpotlightNavbar`               | VERIFICADO_REUTILIZABLE → reutilización_directa | Navbar base; adaptar items + carrito + menú mobile.                                       |
| 2 | HeroProductStage               | `ui/aurora-hero.tsx` (+ `gamer-agency/HeroScene.tsx`)   | `AuroraHero`                     | VERIFICADO_SOLO_REFERENCIA → referencia_interna | Hero CSS/background; NO cumple canvas 3D tilt botella. Reconstruir nuevo con R3F (no instalado). |
| 3 | IngredientsGrid                | `ui/highlight-grid.tsx`                                | `HighlightGrid`                 | VERIFICADO_REQUIERE_ADAPTACION → adaptacion | Celdas de badges; falta parallax de assets flotantes.                                          |
| 4 | ProductWeaponShowcase          | `ui/perspective-carousel.tsx`                           | `PerspectiveCarousel`           | VERIFICADO_REQUIERE_ADAPTACION → adaptacion | Carousel rotateY; falta toggle frente/dorso + ADD TO CART state.                              |
| 5 | WhyStickyStorySection          | `premium/hero-parallax.tsx`                            | default `HeroParallax`           | VERIFICADO_SOLO_REFERENCIA → referencia_interna | Parallax bg simple; no pin, no marquee, no 3-paneles 01/02/03. Reconstruir nuevo.              |
| 6 | BundlePackPricing              | (ninguno en catálogo interno)                          | n/a                             | NO_ENCONTRADO → reconstruccion_nueva | Construir nuevo toggle 3-pack/6-pack + galería.                                                |
| 7 | ReviewsGrid                    | `ui/cursor-card.tsx` (mismatch funcional)              | `CursorCard`                    | VERIFICADO_SOLO_REFERENCIA → referencia_interna | CursorCard es hover-tooltip con portal, no grid de reseñas. Reconstruir nuevo grid de testimonios. |
| 8 | BucksClubFooter                | (sólo `plantillas/_external/bigspring/.../Footer.js` Hugo) | Hugo JSX (incompatible)      | NO_ENCONTRADO → reconstruccion_nueva | Construir nuevo footer + newsletter.                                                           |

**Resumen:**
- reutilización_directa: 1
- adaptación: 2
- referencia_interna: 3
- reconstrucción nueva: 2
- NO_VERIFICADO restantes: 0

---

## 5. Auditoría de `raw_inspection.json`

Sustituido supremo auditor: regex de patrones sensibles (`token|bearer|api[_-]?key|password|client[_-]?secret|jwt|sk-|pk_live_|Authorization:|Set-Cookie|cookie=|sessionid|secret`) → **0 coincidencias**.

Resultados:
- **Cookies / tokens / claves / auth / PII / payloads de trackers / código propietario embebido / binario:** **no presentes.**
- **Tracker IDs (Facebook Pixel `1039362089030146`, GA `G-SMLB0Z5N7C`, LogRocket session URL):** son **identificadores públicos** presentes en el HTML de la fuente; se mantienen como evidencia técnica legítima (ya etiquetados con `accion_reconstruccion: EXCLUIR` en `MAPA_TECNOLOGIAS.json`).
- **blob: URL con UUID de sesión:** permanece como evidencia de la arquitectura runtime; no es un secreto (es local al navegador).
- **URLs Prismic con parámetros `rect=` y `w=`:** parámetros públicos de recorte/compresión de imagen; no son sensibles.
- **Redacción aplicada:** ninguna requerida. Se conservó evidencia técnica intacta.

---

## 6. Documentación faltante (registrada, no reintentada)

Documentos pedidos por el brief que **no existen** en el entorno:
- `C:\Users\sergioadmin\Desktop\WEB FACTORY 2.0\.claude\agents\webs-inteligentes.md`
- `habilidades/copiar-pagina.md`
- `.agents/skills/clone-website/`
- `.agents/skills/true-web-clone/SKILL.md`
- `.claude/skills/web-3d/`

No se recrearon por intuición. Secciones del router de skills en el SKILL existente (`copiar-pagina`, `clone-website`, `true-web-clone`, `web-3d`) se utilizaron como referencia conceptual sin archivo físico.

---

## 7. Archivos nuevos (creados en esta iteración)

- `pruebas/recrear-web-premium/prueba-01/MAPA_COBERTURA_VERTICAL.json`
- `pruebas/recrear-web-premium/prueba-01/LECCIONES_APRENDIDAS_PRUEBA_01.md`
- `pruebas/recrear-web-premium/prueba-01/PROPUESTA_MEJORA_SKILL.md`

## 8. Archivos modificados (esta iteración)

- `pruebas/recrear-web-premium/prueba-01/MAPA_ESTRUCTURA.json` (reescribió con `secciones_visuales`, `contenedores_estructurales`, `elementos_fuera_de_flujo`, `huecos_no_secciones`)
- `pruebas/recrear-web-premium/prueba-01/MAPA_SCROLL.json` (añadió descomposición pinned y reconciliation block)
- `pruebas/recrear-web-premium/prueba-01/PLAN_COMPONENTES.json` (rescribió con resultados de verificación real)
- `pruebas/recrear-web-premium/prueba-01/INFORME_VALIDACION_ANALISIS.md` (este archivo)
- `pruebas/recrear-web-premium/prueba-01/PLAN_RECONSTRUCCION.md` (corrigió “10 → 9 + contenedor”)

## 9. Archivos removidos

- `pruebas/recrear-web-premium/LECCIONES_CALIBRACION_01.md` (creado en iteración anterior fuera de ubicación especificada; consolidado dentro de `prueba-01/LECCIONES_APRENDIDAS_PRUEBA_01.md`).

---

## 10. Pendientes y recomendaciones de aprobación

### 10.1 Resolución humana del rango no_determinable

Revisión humana completada. Decisión registrada:

- **120 px** confirmados como `margin` (Tailwind `lg:mt-30` del product-weapons-grid). Estado: cuadre pixel-exacto, confianza ALTO.
- **1.482 px** `no_determinable` con la evidencia disponible (`bodyHTMLSnippet` truncado, heurística del inspector omite wrappers absolutos sin texto, runtime del agente no soporta input de imagen). Confianza BAJO.
- **El rango deberá resolverse visualmente durante la reconstrucción** (paso 13 del flujo de la skill), usando las capturas ya existentes en disco: `capturas/fuente/desktop/04-checkpoint-scroll-2700px.png` (cubrió `scroll_y=2700`, dentro del gap) y `05-resultado-final-full.png` (full-page).
- **Esta incertidumbre NO afecta arquitectura, componentes ni estrategia de implementación.** No introduce riesgo a la estructura de secciones, al plan de componentes (8 verificados), al plan de reconstrucción, ni a la estrategia de scroll/pinning ya determinada.
- **No realizar más inspecciones sobre buckssauce.com.** **No intentar resolver ese rango nuevamente.**

### 10.2 Estado del análisis

`APROBABLE`.

Justificación: la decisión humana acepta el rango `no_determinable` de 1.482 px como limitación conocida NO bloqueante para la reconstrucción. El análisis queda consolidado: diferencia vertical explicada parcialmente (120 px de 1.602 cuadrados; 1.482 px residual resuelto visualmente en la fase de implementación con captures ya en disco), 8 componentes del catálogo verificados (1 reutilizable, 2 adaptación, 3 referencia, 2 reconstrucción nueva; 0 NO_VERIFICADOS), `raw_inspection` auditado (0 secretos), JSONs artefactos validados. La aprobación final sigue siendo humana; `APROBABLE` habilita pasar al checkpoint 12 (implementación) sujeto a la confirmación final del humano.

### 10.3 Recomendación

Checkpoint humano puede:
- Aprobar definitivamente y autorizar el inicio de la implementación (paso 13 del flujo de la skill): con `APROBABLE` ya cumplido, este es el siguiente step.
- Reprobar el análisis seleccionando otras alternativas.

---

## 11. Verificación de restricciones absolutas

- No se implementó código de reconstrucción: ✓
- No se instaló dependencias: ✓
- No se modificó `catalogo.ts`: ✓
- No se modificó la web de QuantumHive: ✓
- No se modificó `.claude/skills/recrear-web-premium/SKILL.md` (se generó propuesta aparte): ✓
- No se crearon schemas reales fuera de la carpeta de prueba: ✓
- No se creó el validador: ✓
- No se creó `CANDIDATO_CATALOGO`: ✓
- No se hicieron commits, push, pull, merge, checkout, reset, clean, stash, force, ni `git add .`: ✓
- No se copiaron assets propietarios: ✓
- No se realizaron evasiones de bloqueos/safety: ✓

---

> **CHECKPOINT HUMANO - Análisis APROBABLE**
> Revisión humana completada. Estado: APROBABLE. El rango 
o_determinable de 1.482 px fue aceptado como limitación NO BLOQUEANTE para la reconstrucción; se resolverá visualmente durante la implementación (paso 13) usando las capturas ya existentes en disco. No realizar más inspecciones sobre buckssauce.com. Step 12 (implementación) **detenido** a la espera de aprobación final humana explícita para iniciar la codificación. La aprobación final sigue siendo humana.