# Catálogo 3D de Productos

> Sistema independiente de `web-3d`. Transforma productos reales de un cliente
> en modelos 3D interactivos integrables en webs y ecommerces.

## Diferencia clave

| `web-3d` | `catalogo-productos-3d` |
|----------|-------------------------|
| Efectos visuales decorativos | Productos reales del negocio |
| Esferas, volutas, formas abstractas | Zapatillas, sillas, botellas, herramientas |
| Modelos genéricos CC0 | Modelos específicos del producto del cliente |
| Diseño de páginas | Catálogo comercial interactivo |

## Idea del producto

Un cliente tiene un catálogo (ecommerce, PDF, fotos, Tienda Nube, Shopify,
Supabase, catálogo propio, etc.). Web Factory importa ese catálogo y para
cada producto intenta obtener un modelo 3D interactivo que el usuario pueda
rotar, hacer zoom e inspeccionar desde distintos ángulos.

## Pipeline

```
CATÁLOGO CLIENTE
        ↓
extraer productos
        ↓
por cada producto
        ↓
¿modelo 3D existente?
    YES → importar
    NO
        ↓
¿producto genérico?
    YES → buscar equivalente
    NO
        ↓
¿varias imágenes?
    YES → reconstrucción multiimagen
    NO
        ↓
image-to-3D
        ↓
evaluación
        ↓
si calidad insuficiente → pedir más fotos
        ↓
optimizar → GLB → preview → catálogo 3D
```

## Estrategia de resolución (orden de preferencia)

1. **Modelo existente** — el producto ya tiene modelo 3D. Importar y optimizar.
2. **Modelo equivalente** — producto genérico (zapatilla, silla, botella). Buscar
   equivalente legalmente reutilizable, adaptar materiales/texturas.
3. **Multi-imagen** — el cliente tiene varias fotos (frente, atrás, lados, arriba).
   Reconstrucción 3D + texturizado.
4. **Imagen única** — image-to-3D con calidad estimada (alta/media/baja).
5. **Fotos insuficientes** — solicitar nuevas imágenes al cliente.

## Estructura

```
habilidades/catalogo-productos-3d/
├── README.md                      # este archivo
├── pipeline/
│   ├── 01-ingesta-catalogo.md     # cómo leer y normalizar catálogos
│   ├── 02-resolver-fuente-3d.md   # árbol de decisión por producto
│   ├── 03-generacion-3d.md        # caminos de generación (pendiente motor)
│   ├── 04-optimizacion-web.md     # GLB, peso, preview, lazy loading
│   └── 05-control-calidad.md      # validación geométrica y visual
├── schemas/
│   └── producto-3d.schema.json    # contrato de cada ficha de producto
└── prompts/
    ├── solicitar-fotos.md         # template para pedir fotos al cliente
    └── analizar-producto.md       # template para clasificar tipo de producto
```

## Estado

**Esqueleto y plan técnico.** Sin código de producción, sin motores 3D, sin
infraestructura GPU, sin demos. Las decisiones de motor (TRELLIS, Hunyuan,
Stable Fast 3D, fotogrametría, ComfyUI) quedan como puntos de integración
futuros.
