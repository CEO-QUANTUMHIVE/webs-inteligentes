# Pipeline 04 — Optimización Web

## Objetivo

Convertir el modelo 3D crudo en un GLB optimizado para carga rápida en web,
con preview y metadatos.

## Estado

**Sin implementar.** Plan técnico futuro.

## Pasos de optimización

### 1. Conversión a GLB

- Formato objetivo: GLB (glTF 2.0 binario)
- Único archivo autocontenido (modelo + texturas + materiales)

### 2. Reducción de peso

- Draco compression para geometría
- KTX2/ETC2 para texturas (si aplica)
- Objetivo: **< 4 MB** por modelo (orientativo, ajustar según caso)
- Si excede el límite y no se puede optimizar, rechazar o solicitar modelo alternativo

### 3. Generación de preview

- Render del modelo desde ángulo frontal
- Formato: WebP
- Tamaño: 512×512 (orientativo)
- Fondo neutro

### 4. Metadatos

Generar `ficha.json` según `schemas/producto-3d.schema.json`:

```json
{
  "product_id": "...",
  "nombre": "...",
  "fuente_3d": "...",
  "modelo_original": "ruta o URL",
  "modelo_web": "producto/modelo.glb",
  "preview": "producto/preview.webp",
  "formato": "glb",
  "calidad_estimada": "alta|media|baja",
  "peso_mb": 0.0,
  "poligonos": 0,
  "texturas": 0,
  "licencia": "...",
  "fuente": "...",
  "fecha_generacion": "YYYY-MM-DD",
  "estado": "listo"
}
```

### 5. Estructura de output

```
producto/
├── modelo.glb          # optimizado para web
├── preview.webp        # render de referencia
└── ficha.json          # metadatos completos
```

## Objetivos de rendimiento futuro

- Carga rápida (< 2s en 4G para modelo < 4 MB)
- Materiales correctos (PBR cuando aplique)
- Interacción fluida (60fps en desktop, 30fps en mobile)
- Mobile fallback (imagen estática si WebGL no disponible)
- Lazy loading (cargar solo cuando el modelo entra en viewport)

## Pendiente

- Implementar pipeline de optimización (Draco, KTX2)
- Renderer headless para previews
- Validador de peso y polígonos
- Integración con sistema de lazy loading
