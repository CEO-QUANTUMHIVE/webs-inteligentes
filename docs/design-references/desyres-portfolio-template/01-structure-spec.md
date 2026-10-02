# Especificación estructural — Desyres para QuantumHive

## Regla principal

La landing final reutiliza el documento Webflow extraído. No se reconstruye la
maquetación con JSX ni se renombran clases. Deben conservarse `data-wf-page`,
`data-wf-site`, `data-w-id`, la jerarquía del DOM y el orden de los scripts.

## Recorrido

1. Navegación y portada de gran formato.
2. Declaración del problema que resuelve QuantumHive.
3. Catálogo y ejemplos visuales.
4. Proceso de seis pasos: catálogo, base, información, demo, remix y agente.
5. Personalización: base visual, scroll, mouse/canvas y remix.
6. Integración del agente conversacional.
7. Llamado final hacia catálogo y fábrica.

## Rutas reales

- Catálogo: `/catalogo-plantillas`
- Efectos: `/catalogo-efectos`
- Fábrica: `/fabrica-web`
- Información: anclas dentro de la misma landing.

## Integración

La copia raw permanece en
`public/templates/desyres-quantum/raw/`. La versión adaptada se genera en
`public/templates/desyres-quantum/site/` y se muestra en `/` y
`/webs-inteligentes` mediante un contenedor mínimo, sin reimplementar Webflow.

