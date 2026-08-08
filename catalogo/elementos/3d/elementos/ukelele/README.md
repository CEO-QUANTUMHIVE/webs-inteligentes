# Ukelele

**ID:** `ukelele` · **Categoria:** producto · **Tipo:** modelo_glb · **Estado:** ACTIVO

Ukelele fotorealista (scan PBR 1k, 3 texturas). Producto para tiendas de musica, escuelas y marcas lifestyle.

![preview](preview.webp)

## Datos clave

| Campo | Valor |
|-------|-------|
| Fuente | Poly Haven |
| Autor | Joseph Burgan |
| Licencia | [CC0-1.0](https://polyhaven.com/license) |
| Uso comercial | si |
| Atribucion requerida | no |
| Peso | 787.4 KB |
| Triangulos | 8912 |
| Vertices | 8235 |
| Texturas | 3 |
| Animaciones | 0 |
| Transparencia | no |
| Nivel de rendimiento | medio |
| Mobile | si |
| Optimizacion | empaquetado_glb |
| Preview | OK |

## Comportamientos compatibles

- `arrastrar_rotar`
- `orbita_zoom`
- `estatico`

> Los comportamientos NO se guardan en el elemento: se aplican al integrarlo
> usando los patrones de la skill `.claude/skills/web-3d/SKILL.md`.

## Uso rapido

```tsx
'use client';

import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';

export function Modelo() {
  const gltf = useLoader(GLTFLoader, '/ruta-al-catalogo/elementos/ukelele/modelo.glb');
  return <primitive object={gltf.scene} />;
}
```

El comportamiento (mirar_mouse, arrastrar_rotar, etc.) se aplica por fuera del
modelo con los patrones de la skill `web-3d`.

## Observaciones

glTF 1k empaquetado a GLB unico. Preview: render oficial de Poly Haven (CC0).
