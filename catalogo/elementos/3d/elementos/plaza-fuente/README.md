# Plaza con fuente

**ID:** `plaza-fuente` · **Categoria:** entorno · **Tipo:** modelo_glb · **Estado:** ACTIVO

Modulo de pavimento con fuente low-poly del Starter Kit City Builder de Kenney. Pieza de entorno urbano para escenas de ciudad, mapas de sucursales y fondos de hero.

![preview](preview.webp)

## Datos clave

| Campo | Valor |
|-------|-------|
| Fuente | KenneyNL/Starter-Kit-City-Builder (GitHub) |
| Autor | Kenney (kenney.nl) |
| Licencia | [MIT](https://github.com/KenneyNL/Starter-Kit-City-Builder/blob/main/LICENSE) |
| Uso comercial | si |
| Atribucion requerida | no |
| Peso | 13.7 KB |
| Triangulos | 152 |
| Vertices | 248 |
| Texturas | 1 |
| Animaciones | 0 |
| Transparencia | no |
| Nivel de rendimiento | liviano |
| Mobile | si |
| Optimizacion | original |
| Preview | TEMPORAL |

## Comportamientos compatibles

- `estatico`
- `orbita_zoom`

> Los comportamientos NO se guardan en el elemento: se aplican al integrarlo
> usando los patrones de la skill `.claude/skills/web-3d/SKILL.md`.

## Uso rapido

```tsx
'use client';

import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';

export function Modelo() {
  const gltf = useLoader(GLTFLoader, '/ruta-al-catalogo/elementos/plaza-fuente/modelo.glb');
  return <primitive object={gltf.scene} />;
}
```

El comportamiento (mirar_mouse, arrastrar_rotar, etc.) se aplica por fuera del
modelo con los patrones de la skill `web-3d`.

## Observaciones

Repo GitHub bajo MIT (verificado via API de GitHub). Preview placeholder generada.
