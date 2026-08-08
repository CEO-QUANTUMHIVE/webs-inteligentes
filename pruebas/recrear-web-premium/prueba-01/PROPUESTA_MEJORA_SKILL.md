# PROPUESTA_MEJORA_SKILL.md — Mejoras para `recrear-web-premium` (SKILL.md)

- **Prueba de origen:** `pruebas/recrear-web-premium/prueba-01`
- **Skill objetivo:** `.claude/skills/recrear-web-premium/SKILL.md`
- **Acción:** Esta es una **propuesta**. **No se modifica** el SKILL.md original todavía.
- **Stack verificado del repo:** Next.js 16.2.12, React 19.2.4, Tailwind 4.3.3, framer-motion 12, three 0.185, gsap 3.15. **AUSENTES:** Lenis, @react-three/fiber, lottie.

---

## 1. Cambios propuestos para SKILL.md

### 1.1 Reglas nuevas

1. **R-N01 — Origen de rangos:** `MAPA_ESTRUCTURA.json` debe poblar `top_px`, `bottom_px` y `rango_scroll` **exclusivamente** desde `raw_inspection.json` (`rect.top`, `rect.height`). Prohibido apilar alturas contiguamente.
2. **R-N02 — Reconciliación de totales:** El análisis debe cerrar el presupuesto vertical total (`Σ rangos ≈ document_height ± 2 px`). Toda discrepancia debe explicitarse como `hueco_no_explicado` o `diferencia_explicada`. Nunca cuadre artificial.
3. **R-N03 — No `<main>` como sección:** `<main>`, `<body>`, `<html>` y wrappers `div[data-body]` se listan en `contenedores_estructurales`, jamás en `secciones_visuales`.
4. **R-N04 — Header fijo:** El header fixed se lista en `elementos_fuera_de_flujo`, no se cuenta dos veces.
5. **R-N05 — Sticky descompuesto:** Toda sección pinned/sticky debe declarar `altura_visible_px`, `altura_wrapper_px`, `altura_tecnica_scroll_px`, `pin_pasos[]` (con `trigger_inicio_px` por paso), `pinning: bool`, `sticky: bool`.
6. **R-N06 — Footer hermano:** El footer hermano de `main` se lista como sección visual con rango `main.bottom -> footer.bottom` (con delta documentado si difiere de `document_height`).
7. **R-N07 — Inputs con origen:** Cada input formal lleva `origen: “declarado_usuario” | “inferido_visiblemente” | “inferido_tecnologicamente”`.
8. **R-N08 — Trackers excluidos:** Todo tracker script debe clasificarse con `accion_reconstruccion: EXCLUIR`. La categoría `tracker_o_analytics` es disjunta de `tecnologia_visual`.
9. **R-N09 — Licencia de assets:** Ningún asset externo puede quedar `estado: “reutilizacion_directa”` sin atribución verificada; las URLs Prismic/externas se marcan `recurso_observado_visualmente`.
10. **R-N10 — Catálogo verificado:** Ningún componente puede quedar `NO_VERIFICADO` al cierre del análisis. Búsqueda obligatoria por archivo + export + función visual.
11. **R-N11 — Lenguaje prohibido:** Quedan prohibidos los términos `evasión`, `bypass`, `checkpoint绕过`, “100% de paridad”. En caso de bloqueo, registrar y detenerse.
12. **R-N12 — Cobertura vertical obligatoria:** El análisis debe generar `MAPA_COBERTURA_VERTICAL.json` con `tipos` por rango: `seccion_visual` / `contenedor_estructural` / `espacio_scroll_tecnico` / `margen_o_padding` / `contenido_fuera_de_main` / `overlay_sin_flujo` / `hueco_no_explicado`.

### 1.2 Campos obligatorios (por artefacto)

- **`MAPA_ESTRUCTURA.json`**: `fuente_medicion`, `document_height_px`, `main_top_px/main_bottom_px/main_height_px`, `secciones_visuales[]` (id, nombre, selector, orden, top_px, bottom_px, altura_visual_px, altura_en_flujo_px, rango_scroll, proposito, evidencia), `contenedores_estructurales[]`, `elementos_fuera_de_flujo[]`, `huecos_no_secciones[]`.
- **`MAPA_SCROLL.json`**: por transición: `inicio_scroll`, `fin_scroll`, `duracion_scroll`, `altura_visible`, `altura_wrapper`, `altura_tecnica`, `pinning`, `sticky`, `transformaciones[]`, `pasos[]`, `evidencia`. Bloque global `diferencias_explicadas[]` reconciliando `document_height` vs `main` vs suma de secciones vs scroll máximo.
- **`MAPA_TECNOLOGIAS.json`**: por script: `categoria` (`runtime` / `tracker` / `framework` / `estilo`), `accion_reconstruccion` (`INCLUIR` / `ADAPTAR` / `EXCLUIR`), `evidencia_script_url` o `evidencia_window_var` o `estado: “hipótesis”`.
- **`CAPTURA_BASE.json`**: 13 metadatos obligatorios por captura (no defaults). Inputs formales con `origen`. Bloque `bloqueo` con `reportado: bool`, `tecnicas_evasion: false`.
- **`PLAN_COMPONENTES.json`**: por componente: `queries_busqueda[]`, `rutas_encontradas[]`, `archivo_inspeccionado`, `export_verificado`, `dependencias[]`, `compatibilidad_react`, `compatibilidad_next`, `compatibilidad_tailwind`, `resultado` (5 valores permitidos), `clasificacion` (4 valores permitidos).
- **`MAPA_COBERTURA_VERTICAL.json`**: ver schema abajo.
- **`SOLICITUD_ASSETS.json`**: cada asset externo con `estado` y `dominio`. `dominos_propios = []` si aún no se define marca reemplazante.

### 1.3 Checkpoints

- **CHK-01** (post paso 6): Validar `MAPA_ESTRUCTURA` y `raw_inspection` consistentes (top_px por sección = rect.top).
- **CHK-02** (post paso 7): Validar `MAPA_SCROLL` no contradice `MAPA_ESTRUCTURA`.
- **CHK-03** (post paso 10): Validar `PLAN_COMPONENTES` sin `NO_VERIFICADO`.
- **CHK-04** (post paso 11): Validar `MAPA_COBERTURA_VERTICAL` suma ≈ `document_height ± 2 px`; `huecos_no_explicados` aceptados sólo si tienen `hipotesis` y `accion_requerida`.
- **CHK-05** (post paso 11): Validar ausencia de `evasión`, `bypass`, `100% paridad`, `cookies`, `tokens` en artefactos.
- **CHK-06** previo al paso 12: Checkpoint humano con `estado: APROBABLE / REQUIERE_CORRECCIONES / BLOQUEADO`.

### 1.4 Evidencia mínima

- **Tecnología**: `script_url` + comprobación en `raw_inspection.scripts`.
- **Sección**: `rect.top` + `rect.height` de `raw_inspection`, `selector` único en DOM.
- **Componente**: lectura del archivo + export verificado + dependencias declaradas.
- **Asset**: URL + `estado` + `dominio`; verificación de licencia para `reutilizacion_directa`.

### 1.5 Niveles de confianza

- **ALTO**: evidencia directa (script cargado, archivo abierto, rect medido).
- **MEDIO**: inferencia razonable con evidencia indirecta (clases Tailwind, textSample, posición relativa).
- **BAJO**: hipótesis sin evidencia (debe marcarse `estado: hipótesis` y prohibirse como base para plan).

### 1.6 Gestión de bloqueos

- Si Vercel/Cloudflare/类似 bloquea al headless: registrar `bloqueo=true`, `tecnicas_evasion=false`, usar evidencia existente (capturas parciales, headers públicos, og:tags del metaTags array), marcar todos los campos no verificables con `estado: NO_VERIFICABLE_POR_BLOQUEO`, detener el flujo y exigir checkpoint humano.
- No reintentar con proxies, user-agents derivados, ni stealth plugins.

### 1.7 Gestión de assets

- Toda URL externa se captura como evidencia técnica en `MAPA_ASSETS.json` (con `categoria: url_confirmada|url_aproximada|recurso_observado_visualmente|recurso_no_capturado`).
- Toda asset de la referencia que lleve al proyecto final debe pasar por `SOLICITUD_ASSETS.json` con propuesta de sustitución (gen IA, asset libre marca neutra) cuando aplique.

### 1.8 Verificación del catálogo interno

- Búsqueda por `nombre de archivo`, `export`, `palabras asociadas` y `función visual`.
- El inspector debe enumerar `clientes/quantum-hive/src/components/**/*.tsx` ignorando `node_modules/.next`.
- Resultado final en `PLAN_COMPONENTES.json` sólo puede ser `VERIFICADO_REUTILIZABLE` / `VERIFICADO_REQUIERE_ADAPTACION` / `VERIFICADO_SOLO_REFERENCIA` / `NO_ENCONTRADO` / `INCOMPATIBLE`. `NO_VERIFICADO` se prohíbe.

### 1.9 Cobertura vertical

- Generar `MAPA_COBERTURA_VERTICAL.json` antes del cierre del análisis.
- La cobertura debe justificar 0→document_height px; los huecos se explicitan como `hueco_no_explicado` con hipótesis y acción requerida.

### 1.10 Cierre de rangos

- `Σ(rangos) = document_height ± 2 px` (tolerancia redondeo).
- Toda suma que no cierra debe declarar `hueco_no_explicado` con auditoría o `diferencia_explicada` con causa.
- Prohibido: inventar sección, contar wrapper como visual, duplicar header, modificar valores para cerrar.

---

## 2. Schemas propuestos (JSON Schema 2020-12)

A generar **sólo como propuesta** aquí. La creación de los archivos `.schema.json` reales se prohíbe en esta tarea (deben quedar fuera de `pruebas/recrear-web-premium/prueba-01/`). A continuación se incluyen referencia de campos clave.

### 2.1 CAPTURA_BASE.schema.json (campos)

```
{
  "$id": "CAPTURA_BASE.schema.json",
  "type": "object",
  "required": ["url_referencia", "proyecto_destino", "nombre_plantilla", "rubro", "tipo_sitio", "objetivo_recreacion", "modo_adaptacion", "extraer_elementos", "capturar_mobile", "secciones_incluidas", "fecha_analisis", "metodo_inspeccion", "estado_inspeccion", "titulo_sitio", "capturas"],
  "properties": {
    "inputs_formales": { "type": "object", "additionalProperties": { "type": "object", "required": ["valor", "origen"], "properties": { "valor": {}, "origen": { "enum": ["declarado_usuario", "inferido_visiblemente", "inferido_tecnologicamente"] } } } },
    "bloqueo": { "type": "object", "required": ["reportado", "tecnicas_evasion"], "properties": { "reportado": { "type": "boolean" }, "tecnicas_evasion": { "type": "boolean", "const": false }, "detalle": { "type": "string" } } },
    "capturas": { "type": "object", "required": ["desktop", "mobile"], "properties": { "desktop": { "type": "array", "items": { "$ref": "#/$defs/captura" } }, "mobile": { "type": "array", "items": { "$ref": "#/$defs/captura" } } } },
    "$defs": { "captura": { "type": "object", "required": ["archivo", "viewport", "devicePixelRatio", "navegador", "version_navegador", "user_agent", "fecha_iso", "scroll_y_px", "document_width", "document_height", "estado_carga", "errores_consola", "recursos_fallidos"] } }
  }
}
```

### 2.2 MAPA_TECNOLOGIAS.schema.json

- Cada tecnología: `nombre`, `categoria` (enum `runtime|tracker|framework|estilo|cdn`), `accion_reconstruccion` (enum `INCLUIR|ADAPTAR|EXCLUIR`), `evidencia_script_url` | `evidencia_window_var` | `estado: “hipótesis”`.

### 2.3 MAPA_ESTRUCTURA.schema.json

- `secciones_visuales[]` con campos obligatorios: id, nombre, selector, orden, top_px, bottom_px, altura_visual_px, altura_en_flujo_px, rango_scroll, proposito, evidencia. Si sticky/pinned: `altura_wrapper_px`, `altura_tecnica_scroll_px`, `pin_pasos[]`.
- `contenedores_estructurales[]`: id, nombre, selector, top_px, bottom_px, height_px.
- `elementos_fuera_de_flujo[]`: id, selector, position (must be `fixed` o `absolute`), top_px, bottom_px, height_px.
- `huecos_no_secciones[]`: id, rango_px, altura_px, estado.
- `assert(total_secciones_visuales_declarado == len(secciones_visuales))`.

### 2.4 MAPA_SCROLL.schema.json

- Por transición: `seccion`, `tipo` (enum), `inicio_scroll`, `fin_scroll`, `duracion_scroll`, `altura_visible`, `altura_wrapper`, `altura_tecnica`, `pinning`, `sticky`, `transformaciones[]`, `pasos[]`, `evidencia`.
- Global: `diferencias_explicadas[]` reconciliando `document_height` / `main_height` / suma-secciones / `scroll_max`.

### 2.5 MAPA_MOUSE.schema.json

- Por efecto: `elemento`, `evento`, `area_activa`, `movimiento`, `intensidad`, `easing`, `duracion`, `fallback_tactil`, `evidencia`.

### 2.6 MAPA_ASSETS.schema.json

- Por asset: `url`, `dominio`, `categoria` (enum `url_confirmada|url_aproximada|recurso_observado_visualmente|recurso_no_capturado`), `estado` (enum `reutilizacion_directa|adaptacion|sustitucion|excluir`). `reutilizacion_directa` requiere `atribucion_verificada: true`.
- `resumen_cuantitativo`: total_requests_assets, total_imagenes, total_svg, total_fuentes, total_json_animacion, total_canvas_o_modelos, total_no_identificados.

### 2.7 MAPA_COBERTURA_VERTICAL.schema.json

```
{
  "required": ["url_referencia", "viewport_analizado", "document_height_px", "body_height_px", "main_top_px", "main_bottom_px", "main_height_px", "rangos", "resumen", "diferencias_explicadas", "huecos_no_explicados"],
  "properties": {
    "rangos": { "type": "array", "items": { "type": "object", "required": ["tipo", "top_px", "bottom_px", "height_px"], "properties": { "tipo": { "enum": ["seccion_visual", "contenedor_estructural", "espacio_scroll_tecnico", "margen_o_padding", "contenido_fuera_de_main", "overlay_sin_flujo", "hueco_no_explicado"] } } } },
    "resumen": { "required": ["total_secciones_visuales", "total_contenedores", "total_espacios_scroll_tecnico", "total_margenes_y_padding_px", "total_elementos_fuera_de_flujo", "total_cubierto_en_flujo_px", "total_huecos_px", "cobertura_porcentual"] }
  }
}
```

### 2.8 PLAN_COMPONENTES.schema.json

- `componentes_reconstruccion[]` con `resultado` enum `VERIFICADO_REUTILIZABLE|VERIFICADO_REQUIERE_ADAPTACION|VERIFICADO_SOLO_REFERENCIA|NO_ENCONTRADO|INCOMPATIBLE` y `clasificacion` enum `reutilizacion_directa|adaptacion|referencia_interna|reconstruccion_nueva`. Restricción: si `resultado=VERIFICADO_REUTILIZABLE` → `clasificacion=reutilizacion_directa`; `VERIFICADO_REQUIERE_ADAPTACION` → `adaptacion`; `VERIFICADO_SOLO_REFERENCIA` → `referencia_interna`; `NO_ENCONTRADO|INCOMPATIBLE` → `reconstruccion_nueva`.
- `resumen_verificacion` con no `no_verificados_restantes`>0.

### 2.9 SOLICITUD_ASSETS.schema.json

- Cada solicitud: `id_original`, `categoria_original`, `descripcion`, `accion` (enum `sustituir_gen_ia|sustituir_asset_libre|sustituir_neutro|excluir|mantener`), `estado_licencia`.

---

## 3. Validador propuesto

### 3.1 Lenguaje

**Preferencia inicial: TypeScript.** Justificación: el repositorio Web Factory usa Next.js 16 + React 19 + Tailwind 4 — todo toolchain TypeScript. Verificación: `web-factory/clientes/quantum-hive/package.json` declara dependencias y el proyecto incluye `@types/three`. Confirmado antes de proponer.

### 3.2 Dependencias sugeridas

- `ajv` (JSON Schema 2020-12) — compilación de schemas.
- `zod` (validación estructural con tipos derivados) — opcional para reglas cruzadas (ej.: `Σ rangos ≈ document_height`).
- `fast-glob` + `ts-morph` — verificar exports de componentes reales (para `PLAN_COMPONENTES`).
- `tsx` (runtime TS para CLI).

### 3.3 Ubicación

 `_external` no permitido en la raíz del repo (per restricciones). El validador sería:
- Plan de ubicación (cuando se habilite): `pruebas/recrear-web-premium/validador/` (dentro del directorio de la skill de pruebas) o `motor-agentes/recrear-web-premium-validator/` (si se promueve). En esta etapa, no se crea.

### 3.4 Cobertura del validador

Detectar:
- **conteos inconsistentes** (`total_secciones_visuales_declarado != len(secciones_visuales)`).
- **rangos superpuestos** (dos rangos con `top/bottom` cruzados).
- **huecos** (entre `main.top` y `main.bottom` no cubiertos por secciones+margin+huecos_explicados).
- **evidencia faltante** (sección sin `rect.top` en `raw_inspection.json`).
- **tecnologías sin prueba** (entrada con `estado != hipótesis` y sin `evidencia_script_url`).
- **rutas inexistentes** (`PLAN_COMPONENTES` con `ruta` no resuelta en filesystem).
- **exports inexistentes** (`export_verificado` no encontrado en el archivo inspeccionado via ts-morph).
- **assets sin estado** (`MAPA_ASSETS` con entrada carente de `estado`).
- **trackers incluidos** (`MAPA_TECNOLOGIAS` con `accion_reconstruccion=INCLUIR` y `categoria=tracker`).
- **metadata incompleta** (`CAPTURA_BASE` sin los 13 metadatos por captura).
- **inputs inferidos no marcados** (input formal sin `origen`).
- **secretos** (regex de `(?i)(token|bearer|api[_-]?key|password|client[_-]?secret|jwt|sk-|pk_live_|Authorization:)` en artefactos; advertir cualquier `cookie` o `Set-Cookie`).
- **checkpoint omitido** (`PLAN_RECONSTRUCCION` sin `CHECKPOINT HUMANO` explícito).
- **lenguaje prohibido** (`evasión`, `bypass`, “100% de paridad”).
- **clases no resueltas** (`MAPA ESTRUCTURA` menciona `lg:mt-*` sin coincidencia con Tailwind 4 spacing scale).
- **cobertura vertical** (cuadre 0→document_height ±2 px).

### 3.5 Salida del validador

- `validador/reportes/<prueba-id>/<timestamp>.json` con: `errores[]`, `advertencias[]`, `info[]`, `resumen` (`ok: bool`).
- `estado` global: `OK` / `FALLIDO_CRITICO` / `FALLIDO_PARCIAL`.

---

## 4. Niveles de análisis por categoría

No todas las referencias deben exigir el mismo nivel de inspección. Propuesta:

### 4.1 Diseño de Autor
- Inspección: 1 captura desktop + 1 mobile; metadatos mínimos (8 de 13).
- MAPA_SCROLL: opcional.
- MAPA_MOUSE: opcional.
- Captura DOM (raw_inspection): head + body outline, sin profundizar.
- Validación: cobertura vertical nivel 1 (sólo secciones visuales, sin explicar huecos).
- Tolerancia layout: ≥ 16 px.

### 4.2 Interacción Avanzada
- Inspección: 3-5 capturas desktop + 2 mobile; 13 metadatos completos.
- MAPA_SCROLL: obligatorio, sin descomposición pinned detallada.
- MAPA_MOUSE: obligatorio para hover principal.
- raw_inspection: con `interactiveElementsCount`.
- Validación: cobertura vertical nivel 2 (secciones + márgenes; huecos aceptados como `margen_o_padding` justificado por Tailwind class).
- Tolerancia layout: ≥ 8 px.

### 4.3 Experiencia Inmersiva
- Todo lo anterior + descomposición pinned + `altura_visible`/`wrapper`/`tecnica`.
- raw_inspection: profundizar por hijos directos de `main`.
- Cobertura vertical: nivel 3 (secciones + márgenes + técnica + fuera-de-flujo; huecos aceptados sólo con hipótesis documentada).
- Tolerancia layout: ≥ 6 px.

### 4.4 Experiencia Canvas
- Todo lo anterior + captureShaderUniforms (si Three.js) o `readPixels` en canvas. Validar capas (lámina 3D, máscara, post-proceso).
- raw_inspection: incluye `hasCanvas: true`, lectura de instancias `WebGLRenderer`.
- Cobertura vertical: debe incluir traslapes de canvas (no se suman al flujo).
- Fallback permitido: si el shader es opaco o el asset protegido, registrar la limitación y pedir **decisión humana** (per skill original).

### 4.5 Experiencia Tridimensional
- Todo lo anterior + extracción de modelos (si `.glb/.gltf` accesibles) o declaración de geometría primitiva.
- Recordatorio del SKILL original: si falla la extracción, **detenerse y solicitar decisión humana**.
- Cobertura vertical: nivel 4 (sólo el elemento 3D visible se cuenta; el timeline de scroll técnico se descompone con detalle).

### 4.6 Fusión Total
- Máximo nivel. Cobertura vertical nivel 5 (cuadre 0→document_height ±1 px). Todos los huecos deben estar resueltos o marcados `REQUIERE_INSPECCION_PROFUNDA`. Niveles de confianza ALTO en >90% de secciones. Validador sin warnings.

---

## 5. Roadmap sugerido (futuro, no ejecutar ahora)

1. Iterar esta propuesta con el equipo QuantumHive.
2. Modificar `.claude/skills/recrear-web-premium/SKILL.md` con las reglas aprobadas (sin modificarlo en esta tarea).
3. Crear `pruebas/recrear-web-premium/schemas/*.schema.json`.
4. Implementar el validador TypeScript en `pruebas/recrear-web-premium/validador/`.
5. Aplicar la prueba-02 con el flujo nuevo y comparar regresiones.