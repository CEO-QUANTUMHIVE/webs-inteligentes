# Pipeline 05 — Control de Calidad

## Objetivo

Validar que cada modelo 3D generado cumple los estándares mínimos antes de
integrarse al catálogo del cliente.

## Estado

**Sin implementar.** Criterios definidos, sin automatización.

## Criterios de validación

### Geometría

| Criterio | Umbral | Acción |
|----------|--------|--------|
| Polígonos | < 100K (orientativo) | Rechazar si excede y no se puede optimizar |
| Malla cerrada | sin agujeros visibles | Marcar si hay defectos |
| Normales consistentes | todas hacia afuera | Auto-corregir si es posible |
| Escala correcta | proporciones realistas | Ajustar si hay referencia |

### Texturas y materiales

| Criterio | Umbral | Acción |
|----------|--------|--------|
| Resolución texturas | ≤ 2K (orientativo) | Reducir si excede |
| PBR correcto | materiales coherentes | Marcar si hay anomalías |
| UV mapping | sin solapamientos obvios | Marcar si hay defectos |

### Peso y rendimiento

| Criterio | Umbral | Acción |
|----------|--------|--------|
| Peso GLB | < 4 MB (orientativo) | Rechazar si excede |
| Carga en mobile | < 2s en 4G (objetivo) | Optimizar más si falla |
| FPS desktop | 60fps | Aceptar |
| FPS mobile | 30fps mínimo | Aceptar o fallback a imagen |

### Calidad visual

| Criterio | Evaluación |
|----------|------------|
| Fidelidad al producto | ¿Se parece al producto real? |
| Partes inferidas | ¿Las caras no visibles son razonables? |
| Iluminación | ¿El render se ve profesional? |

### Estados posibles

| Estado | Significado |
|--------|-------------|
| `listo` | Pasa todos los criterios |
| `rechazado` | No pasa criterios críticos |
| `necesita_ajuste` | Pasa la mayoría pero requiere retoques |
| `necesita_fotos` | Calidad insuficiente, pedir más fotos |

## Automatización futura

- Validador automático de geometría (mesh integrity, normals, UVs)
- Medidor automático de peso y polígonos
- Comparador visual modelo vs foto original (similitud)
- Test de rendimiento en viewport (FPS)

## Pendiente

- Implementar validador automático
- Definir umbrales exactos por categoría de producto
- Crear dashboard de calidad del catálogo
- Establecer proceso de revisión humana para casos borderline
