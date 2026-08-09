# Pipeline 01 — Ingesta de Catálogo

## Objetivo

Leer el catálogo de productos del cliente y normalizarlo a una estructura
común que el pipeline pueda procesar.

## Fuentes soportadas (futuro)

| Fuente | Método | Notas |
|--------|--------|-------|
| URL ecommerce | scraping estructurado | Shopify, WooCommerce, Tienda Nube |
| CSV | parseo directo | columnas: id, nombre, descripción, imágenes, variantes |
| JSON | parseo directo | API responses, exportaciones |
| API REST | HTTP + auth | endpoints del ecommerce del cliente |
| PDF | extracción de texto/imágenes | catálogos impresos digitalizados |
| Imágenes sueltas | carga manual | fotos del producto sin metadatos |
| Supabase | query directa | tabla de productos del cliente |
| Carga manual | formulario | entrada producto por producto |

## Normalización

Todo se convierte a:

```json
{
  "product_id": "string",
  "nombre": "string",
  "descripcion": "string",
  "categoria": "string",
  "imagenes_origen": ["url_o_path", "..."],
  "variantes": [
    { "sku": "string", "color": "string", "material": "string" }
  ],
  "precio": "number|null",
  "fuente": "string"
}
```

## Validación mínima

- `product_id` único y no vacío
- `nombre` no vacío
- Al menos una imagen en `imagenes_origen` (ideal)
- Si no hay imágenes, marcar como `necesita_fotos`

## Pendiente

- Implementar conectores para cada fuente
- Normalizador de variantes (colores, tamaños → productos separados o variantes del mismo modelo)
- Detección automática del tipo de fuente
- Rate limiting y respeto a robots.txt
