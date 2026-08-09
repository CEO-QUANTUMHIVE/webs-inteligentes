# Pipeline 02 — Resolver Fuente 3D

## Objetivo

Para cada producto normalizado, decidir la estrategia de obtención del modelo
3D por el camino **más barato y simple**.

## Árbol de decisión

```
producto
    │
    ├── ¿Tiene modelo 3D existente? (URL .glb, .gltf, .obj, .fbx)
    │   └── YES → CASO A: importar y optimizar
    │
    ├── ¿Es producto genérico? (zapatilla, silla, botella, herramienta,
    │   electrodoméstico estándar)
    │   └── YES → CASO B: buscar modelo equivalente reutilizable
    │       ├── ¿Existe equivalente legal? (CC0, licencia comercial)
    │       │   └── YES → adaptar materiales/texturas → optimizar
    │       │   └── NO → continuar
    │       └── NO → continuar
    │
    ├── ¿Tiene varias imágenes? (≥4 ángulos: frente, atrás, lados, arriba)
    │   └── YES → CASO C: reconstrucción multi-imagen
    │       └── continuar a generación
    │
    ├── ¿Tiene al menos una imagen?
    │   └── YES → CASO D: image-to-3D
    │       └── marcar calidad_estimada según visibilidad
    │
    └── ¿Las fotos disponibles son de mala calidad?
        └── YES → CASO E: solicitar nuevas fotos al cliente
```

## Criterios de clasificación

### Producto genérico

Un producto es genérico si:
- Es un objeto estándar con forma conocida
- Existen modelos 3D equivalentes en repositorios públicos
- No requiere personalización específica del diseño del cliente

Ejemplos: silla de oficina genérica, botella de vino estándar, martillo.

Contraejemplos: silla de diseño exclusivo del cliente, botella con forma
patentada, herramienta con diseño propietario.

### Calidad de imágenes disponibles

| Calidad | Criterio |
|---------|----------|
| Buena | ≥4 ángulos, fondo limpio, buena iluminación |
| Aceptable | 2-3 ángulos, algo de ruido |
| Mala | 1 ángulo, fondo desordenado, iluminación deficiente |

## Output

Cada producto recibe:

```json
{
  "producto_id": "...",
  "fuente_3d": "existente|modelo_equivalente|multiimagen|imagen_unica|manual",
  "calidad_estimada": "alta|media|baja",
  "estado": "pendiente|buscando_modelo|necesita_fotos|generando|optimizando|listo|rechazado",
  "justificacion": "string"
}
```

## Pendiente

- Detector automático de producto genérico (ML o reglas)
- Buscador de modelos equivalentes (repositorios CC0, comerciales)
- Evaluador automático de calidad de imágenes
- Integración con catálogo de modelos equivalentes
