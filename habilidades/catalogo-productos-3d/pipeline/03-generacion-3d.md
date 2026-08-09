# Pipeline 03 — Generación 3D

## Objetivo

Obtener el modelo 3D del producto según la estrategia decidida en el paso 02.

## Estado

**Sin implementar.** Este documento define los caminos futuros y los puntos
de integración. No se ha seleccionado motor definitivo.

## Caminos de generación

### CASO A — Modelo existente

- Descargar modelo (GLB, GLTF, OBJ, FBX, etc.)
- Validar integridad del archivo
- Si no es GLB, convertir
- Registrar fuente y licencia

### CASO B — Modelo equivalente

- Buscar en repositorios de modelos 3D (CC0, comerciales)
- Comparar forma/categoría con el producto del cliente
- Si hay coincidencia suficiente:
  - Descargar modelo equivalente
  - Adaptar materiales y texturas al producto real
  - Registrar fuente y licencia del modelo base

### CASO C — Reconstrucción multi-imagen

- Recibir ≥4 fotos del producto (frente, atrás, izquierda, derecha, arriba)
- Aplicar técnica de reconstrucción 3D
- Generar malla + texturas
- Opciones técnicas futuras (pendiente decisión):
  - Fotogrametría (COLMAP, Meshroom)
  - Modelos de reconstrucción por IA (TRELLIS, Hunyuan 3D, Stable Fast 3D)
  - ComfyUI workflows

### CASO D — Image-to-3D (una foto)

- Recibir foto única del producto
- Generar modelo 3D por inferencia
- Marcar `calidad_estimada`:
  - **alta**: producto simétrico, fondo limpio, buena iluminación
  - **media**: producto parcialmente visible, algo de ruido
  - **baja**: producto parcialmente oculto, fondo desordenado
- Opciones técnicas futuras (pendiente decisión):
  - TRELLIS
  - Hunyuan 3D
  - Stable Fast 3D
  - Otros modelos image-to-3D

### CASO E — Solicitar fotos

- Generar solicitud al cliente usando el template `prompts/solicitar-fotos.md`
- Esperar respuesta
- Re-evaluar con las nuevas imágenes (volver a CASO C o D)

## Puntos de integración futuros

| Componente | Estado | Notas |
|------------|--------|-------|
| TRELLIS | pendiente | Evaluar calidad vs costo |
| Hunyuan 3D | pendiente | Evalurar calidad vs costo |
| Stable Fast 3D | pendiente | Evaluar calidad vs costo |
| Fotogrametría | pendiente | COLMAP, Meshroom |
| ComfyUI workflows | pendiente | Pipelines de generación |
| Infraestructura GPU | pendiente | Local, cloud, API |
| Conversores de formato | pendiente | OBJ/FBX→GLB |

## Output

Modelo 3D crudo (antes de optimización) + metadatos de origen.

## Pendiente

- Seleccionar motor(es) de generación
- Definir infraestructura (GPU local vs cloud vs API)
- Implementar convertidores de formato
- Crear benchmarks de calidad por motor
