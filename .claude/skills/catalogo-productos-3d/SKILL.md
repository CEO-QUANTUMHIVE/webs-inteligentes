# Skill: catalogo-productos-3d

## Qué es

Sistema para transformar los **productos reales de un cliente** en modelos 3D
interactivos (GLB) que pueden rotarse, inspeccionarse e integrarse en webs y
ecommerces.

## Qué NO es

NO es `web-3d`. Esa skill maneja efectos/objetos visuales decorativos para
diseño de páginas (esferas, volutas, formas abstractas). Esta skill trabaja
con **productos concretos del negocio**: zapatillas, sillas, botellas,
herramientas, electrodomésticos, etc.

## Principio rector

Resolver siempre por el camino **más barato y simple**:

```
modelo existente → modelo equivalente reutilizable → varias fotos → una foto → intervención manual
```

No asumir que todo necesita generación IA.

## Pipeline

1. **Ingesta** — leer catálogo del cliente (URL, CSV, JSON, PDF, manual, Supabase)
2. **Resolver fuente 3D** — decidir estrategia por producto
3. **Generación 3D** — importar, buscar equivalente, reconstruir multi-imagen, image-to-3D
4. **Optimización web** — convertir a GLB, reducir peso, generar preview
5. **Control de calidad** — validar geometría, texturas, peso, interacción

## Flujo de decisión por producto

```
¿modelo 3D existente? → importar y optimizar
¿producto genérico?   → buscar equivalente legal, adaptar materiales
¿varias imágenes?     → reconstrucción multi-imagen
¿una imagen?          → image-to-3D (marcar calidad estimada)
¿foto mala?           → solicitar nuevas fotos al cliente
```

## Output por producto

```
producto/
├── modelo.glb          # optimizado para web
├── preview.webp        # render de referencia
└── ficha.json          # metadatos, calidad, licencia, métricas
```

## Agente futuro: 3D Product Catalog Agent

Responsabilidades: leer catálogo, detectar productos, decidir estrategia 3D,
buscar modelos equivalentes, solicitar fotos si faltan, lanzar generación 3D,
evaluar calidad, optimizar, registrar resultado.

## Estado actual

**Sólo esqueleto y plan técnico.** No hay código de producción, motores 3D,
infraestructura GPU ni demos implementados. Las decisiones de motor
(TRELLIS, Hunyuan, Stable Fast 3D, fotogrametría, ComfyUI) quedan como
puntos de integración futuros.
