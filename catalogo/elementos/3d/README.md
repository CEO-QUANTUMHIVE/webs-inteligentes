# Elementos 3D

Biblioteca de elementos 3D reutilizables para las webs inteligentes de
QuantumHive. Cada elemento es un **asset autocontenido** (modelo GLB o
referencia a escena Spline) con su ficha técnica, licencia verificable y
preview uniforme.

> Principio rector: **el modelo y el comportamiento viven separados.** Acá se
> guardan únicamente los modelos/escenas. Los comportamientos
> (`seguir_cursor`, `mirar_mouse`, `arrastrar_rotar`, `transformar_scroll`,
> `orbita_zoom`, `estatico`) se aplican al integrar el elemento, con los
> patrones de la skill `.claude/skills/web-3d/SKILL.md`. La ficha solo declara
> con cuáles es compatible. Esto permite aplicar y combinar comportamientos a
> posteriori sin tocar el asset.

## Estructura

```
catalogo/elementos/3d/
├── README.md               # este archivo
├── indice.json             # listado de los 12 elementos (vista rápida)
├── ficha-3d.schema.json    # contrato que debe cumplir toda ficha.json
└── elementos/
    └── <id>/
        ├── ficha.json      # metadatos + licencia + métricas (ver schema)
        ├── README.md       # descripción, datos clave y uso rápido
        ├── preview.webp    # 512×512, fondo neutro, nombre legible
        ├── modelo.glb      # tipo modelo_glb (asset redistribuible)
        └── escena.json    # tipo referencia_remota (solo URL pública + condiciones de embed)
```

Las rutas `ruta_asset` y `ruta_preview` de las fichas son **relativas a esta
carpeta** (`catalogo/elementos/3d/`).

> **`referencia_remota`** versus `modelo_glb`: las escenas Spline son
> `referencia_remota` — el repo guarda solo la URL pública y las condiciones de
> embed en `escena.json`; **no es un asset redistribuible** y el `.splinecode`
> no se copia ni se rehostea. Los `modelo_glb` sí son assets redistribuibles.

## Fuentes admitidas

Prioridad de fuentes (todas CC0 o permisivas verificables):

| Fuente | Licencia | Verificación |
|--------|----------|--------------|
| `pmndrs/assets` (GitHub) | CC0-1.0 | `LICENSE` en el repo |
| Spline — escenas oficiales de la documentación | Uso libre para embed | Publicadas por Spline en docs.spline.design |
| Kenney (repos `KenneyNL/*` en GitHub) | MIT | API de GitHub `/license` (repo del archivo descargado) |
| Quaternius | CC0 | Declarado en quaternius.com (FAQ y cada pack) |
| Poly Haven | CC0-1.0 | polyhaven.com/license + API pública |

**Prohibido:** assets propietarios, sin licencia verificable, Non-Commercial,
No-Derivatives, recursos extraídos de webs ajenas, escenas Spline que no sean
oficiales/Community con licencia clara, y Sketchfab (etapa 1).

Notas de la etapa 1:

- **Spline Community no etiqueta licencias** por escena. Para garantizar
  licencia verificable se usaron **escenas oficiales de la documentación de
  Spline** (las mismas registradas en la skill `web-3d`). El repo guarda solo
  la URL pública en `escena.json`; el `.splinecode` vive en el CDN de Spline
  y no se copia.
- **Quaternius quedó descartado en este lote**: sus packs se distribuyen solo
  en FBX/OBJ/Blend y convertirlos a GLB exige herramientas que no están
  instaladas. La política es no instalar herramientas sin informar antes.

## Política de licencias

1. Sin licencia verificable en fuente oficial, **no entra**.
2. Toda ficha registra `licencia`, `licencia_url`, `atribucion_requerida`,
   `redistribucion_permitida`, `uso_comercial` y `modificacion_permitida`.
3. CC0 y MIT son las licencias de referencia del lote 1.
4. Las escenas Spline se **enlazan, no se redistribuyen**
   (`tipo: referencia_remota`, `redistribucion_permitida: false`).

## Límites de peso

- Máximo recomendado por GLB final: **4 MB**.
- Tamaño total del lote: **máximo 40 MB**.
- Solo se guarda el **GLB final**. Nada de Blend/FBX/OBJ/glTF suelto en el
  repo.
- Si un modelo supera el límite y no puede optimizarse con las herramientas
  existentes, se marca `RECHAZADO_POR_PESO` y se elige otro.

Registro del lote 1 (rechazados por peso, antes de descargar):

| Candidato | Fuente | Peso 1k estimado | Motivo |
|-----------|--------|------------------|--------|
| `coast_rocks_01` | Poly Haven | 20.7 MB | > 4 MB, sin optimizador disponible |
| `fir_tree_01` | Poly Haven | 464.8 MB | > 4 MB (texturas gigantes) |
| `boulder_01` | Poly Haven | 5.5 MB | > 4 MB |

`placa-circuito` quedó en **3.95 MiB**: dentro del límite pero sin margen;
candidato a reoptimización (Draco/KTX2) en el lote 2.

## Proceso para agregar un elemento

1. Elegir el asset en una fuente admitida y **verificar la licencia en la
   fuente oficial** (guardar la URL exacta).
2. Descargar **solo el elemento elegido** (nunca el pack completo).
3. Dejar el GLB final bajo 4 MB. Si la fuente entrega glTF suelto
   (Poly Haven), empaquetar a GLB único; si excede y no hay optimizador,
   rechazar por peso.
4. Crear `elementos/<id>/` con `modelo.glb` (o `escena.json`), `preview.webp`
   (512×512, fondo neutro, nombre legible), `ficha.json` (validar contra
   `ficha-3d.schema.json`) y `README.md`.
5. Completar métricas reales (triángulos, vértices, texturas, etc.) leyendo
   el GLB final, no la ficha del sitio de origen.
6. Agregar la entrada en `indice.json`.
7. Validar: JSON válido, rutas existentes, licencia registrada, sin
   duplicados, sin archivos propietarios.

Previews: el lote 1 usa renders oficiales CC0 (Poly Haven) compuestos sobre
fondo neutro, y placeholders marcados `preview_estado: TEMPORAL` donde no hay
render autorizado. Pendiente: renderer propio de previews (three.js headless)
para reemplazar las temporales.

## Proceso futuro de remix

Los elementos son piezas neutras: el remix consiste en **combinar modelo +
comportamiento + material** al integrar, no en duplicar assets.

1. Elegir `<id>` del `indice.json` filtrando por `comportamientos_compatibles`.
2. Aplicar el comportamiento con los patrones de la skill `web-3d`
   (cursor, scroll, órbita) envolviendo el modelo, sin modificarlo.
3. Sobreescribir materiales en runtime (varios modelos CC0 vienen sin
   texturas a propósito, p. ej. `conejo-stanford`, `suzi`).
4. Para variantes persistentes (material distinto, decimación), crear un
   **elemento derivado** con `id` nuevo que referencie al origen en
   `observaciones`; nunca sobrescribir el original.
5. La composición de varios elementos en una escena (p. ej. `plaza-fuente` +
   `helecho` + `moneda`) se documenta como receta en la plantilla que la use,
   no como elemento nuevo del catálogo.

## Lote 1 — 12 elementos

| # | id | Categoría | Fuente | Licencia | Peso |
|---|----|-----------|--------|----------|------|
| 1 | `conejo-stanford` | abstracto | pmndrs/assets | CC0-1.0 | 133 KB |
| 2 | `suzi` | abstracto | pmndrs/assets | CC0-1.0 | 346 KB |
| 3 | `forma-pmndrs` | tecnologia | pmndrs/assets | CC0-1.0 | 179 KB |
| 4 | `placa-circuito` | tecnologia | Poly Haven | CC0-1.0 | 3.95 MB |
| 5 | `camara-clasica` | producto | Poly Haven | CC0-1.0 | 2.32 MB |
| 6 | `caja-registradora` | comercio | Poly Haven | CC0-1.0 | 0.99 MB |
| 7 | `ukelele` | producto | Poly Haven | CC0-1.0 | 0.77 MB |
| 8 | `moneda` | comercio | Kenney | MIT | 22 KB |
| 9 | `plaza-fuente` | entorno | Kenney | MIT | 14 KB |
| 10 | `helecho` | entorno | Poly Haven | CC0-1.0 | 1.09 MB |
| 11 | `voluta-scroll` | escena_spline | Spline (oficial) | Uso libre (embed) | remota |
| 12 | `orbita-zoom` | escena_spline | Spline (oficial) | Uso libre (embed) | remota |

Total de assets locales: **~9.8 MB** (límite: 40 MB).

## Cómo consumir un elemento

Cada elemento del catálogo es independiente. Para usarlo:

1. Elegir de `indice.json` por categoría, peso o comportamiento compatible.
2. Copiar `modelo.glb` al proyecto (o enlazar vía `escena.json` para Spline).
3. Cargar con three.js (`GLTFLoader`) o embedar con `<spline-viewer>`.

```tsx
// React/Next.js — carga lazy de un GLB
'use client';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';

function Modelo({ url }: { url: string }) {
  const gltf = useLoader(GLTFLoader, url);
  return <primitive object={gltf.scene} />;
}

export function Seccion3D() {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ powerPreference: 'low-power' }}>
      <Suspense fallback={null}>
        <Modelo url="/elementos/camara-clasica/modelo.glb" />
      </Suspense>
    </Canvas>
  );
}
```

Para escenas Spline, usar el web component (sin npm):
```html
<script type="module" src="https://unpkg.com/@splinetool/viewer/build/spline-viewer.js"></script>
<spline-viewer url="https://prod.spline.design/.../scene.splinecode"></spline-viewer>
```

## Cómo asociar un comportamiento

Los comportamientos se aplican **por fuera** del modelo, con los patrones de
la skill `.claude/skills/web-3d/SKILL.md`. Cada `ficha.json` declara con
cuáles es compatible en `comportamientos_compatibles`.

| Comportamiento | Patrón (resumen) |
|----------------|------------------|
| `seguir_cursor` | PointerMove → lerp posición del objeto hacia cursor |
| `mirar_mouse` | PointerMove → lerp rotación del objeto hacia cursor |
| `arrastrar_rotar` | PointerDown/Move/Up → rotación con inercia |
| `transformar_scroll` | Scroll event → progreso 0-1 → rotación/escala |
| `orbita_zoom` | Wheel/pinch → distancia cámara con clamp |
| `estatico` | Sin interacción; modelo estático |

Comportamientos se pueden **combinar** en el mismo objeto (p. ej.
`seguir_cursor` + `transformar_scroll`). Se aplican al integrar, no se
modifican los modelos del catálogo.

## Requisitos mínimos

- **three.js** ≥ 0.160 (GLTFLoader desde `examples/jsm/`), o `<spline-viewer>`
  vía CDN para escenas Spline.
- **WebGL** disponible. Sin WebGL, usar `preview.webp` como fallback.
- Sin dependencias adicionales para GLBs: solo `three` + `three-stdlib` (o el
  loader incluido).

## Reglas de performance

Reglas comprobadas en la demo de validación (`catalogo/elementos/3d/demo/`):

| Regla | Implementación |
|-------|----------------|
| Lazy loading de modelos | IntersectionObserver por sección; el GLB solo se carga al entrar al viewport |
| Canvas dinámico | `next/dynamic` con `ssr: false` en Next.js; import dinámico de three en vanilla |
| DPR limitado | `Math.min(devicePixelRatio, 1.5)` — en móvil forzar 1 |
| Render on-demand | Sin `requestAnimationFrame` perpetuo; solo cuando hay interacción o inercia activa |
| Pausar cuando oculto | `document.visibilitychange` → cancelar rAF; reanudar al volver |
| prefers-reduced-motion | Un solo frame estático; sin loops ni seguimiento de cursor |
| Fallback WebGL | Si `getContext('webgl')` falla → `preview.webp` + mensaje; un fallo no rompe otros |
| Mobile táctil | Desactivar `seguir_cursor` / `mirar_mouse` (no hay cursor); mantener drag y pinch-zoom |
| Material override | Sobre-escribir material en runtime si el GLB viene sin textura embebida (ver `moneda`) |
| Sin loops inútiles | El render loop se detiene cuando la inercia/lerp converge a epsilon |

## Validación (demo de prueba)

La demo en `catalogo/elementos/3d/demo/index.html` verifica:

- **5 comportamientos**: seguir_cursor, mirar_mouse, arrastrar_rotar,
  transformar_scroll, orbita_zoom (autotest automatizado via CDP).
- **3 escenarios**: desktop 1440×900, mobile 360×640 táctil, sin WebGL (fallback).
- **0 errores** de consola en los 3 escenarios.
- **Carga inicial**: ~1.24 MB frío (three.js + 3 GLBs), ~282 KB caliente.
- **Fluidez**: 26 fps bajo interacción continua en SwiftShader (CPU, sin GPU
  dedicada). En GPU real (cualquier iGPU moderna) se espera 60 fps.
- **Fallback**: sin WebGL → 3 secciones con `preview.webp`, 21 KB totales,
  sin errores JS.

## Hallazgos de la validación

- Los GLBs de Kenney (`moneda`, `plaza-fuente`) referencian una textura
  externa (`Textures/colormap.png`) no embebida en el GLB. Se resolvió en
  la demo con material override en runtime. **Pendiente**: re-empaquetar
  estos GLBs con la textura embebida en una revisión futura del catálogo.

## Demo

Ver `catalogo/elementos/3d/demo/` para la demo de validación. Para ejecutar
localmente:

```bash
cd catalogo/elementos/3d
python -m http.server 8321
# Abrir http://localhost:8321/demo/
```
